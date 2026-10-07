"use client";

import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { memo, useCallback, useLayoutEffect, useRef, useState } from "react";

gsap.registerPlugin(Flip);

const TITLE_INTRO_FROM = {
  opacity: 0,
  scale: 0.94,
  z: -28,
  transformOrigin: "50% 50%",
  force3D: true,
} as const;

const OVERLINE_INTRO_FROM = {
  opacity: 0,
  force3D: true,
} as const;

/** Stagger opacity ahead of depth without filter surfaces that clip script swashes. */
function animateTitleIntro(track: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    gsap
      .timeline({
        defaults: { force3D: true, transformOrigin: "50% 50%" },
        onComplete: resolve,
      })
      .to(track, { opacity: 1, duration: 0.52, ease: "power2.out" }, 0)
      .to(track, { scale: 1, z: 0, duration: 0.9, ease: "power3.out" }, 0);
  });
}

type ExperienceTitleProps = {
  label: string;
  overlineLabel: string;
  onClick: () => void;
  /** When true, run the intro: centered reveal, then Flip to header after window load. */
  preloader?: boolean;
  /** Fired once the Flip-to-header animation finishes. */
  onPreloaderComplete?: () => void;
};

/**
 * Binary-search font size so the nowrap track fits the bleed.
 * Measure the inner `.experience__title-reveal-track`, not the outer control — width
 * reporting on replaced/form controls is unreliable across browsers.
 */
function fitTitleFontSize(
  titleRoot: HTMLElement,
  track: HTMLElement,
  targetWidthPx: number,
): number {
  let lo = 6;
  // Let ultra-wide layouts fit naturally by width. A fixed pixel cap makes the
  // short “Wild Grace” wordmark stall halfway across huge screens.
  let hi = Math.max(720, targetWidthPx);
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    titleRoot.style.fontSize = `${mid}px`;
    const w = track.scrollWidth;
    if (w <= targetWidthPx) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  let px = Math.floor(lo * 1000) / 1000;
  titleRoot.style.fontSize = `${px}px`;
  while (px > 6 && track.scrollWidth > targetWidthPx) {
    px = Math.floor((px - 0.25) * 1000) / 1000;
    titleRoot.style.fontSize = `${px}px`;
  }
  return px;
}

function waitForWindowLoad(): Promise<void> {
  if (typeof document === "undefined" || document.readyState === "complete") {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

/** Keep the title inside the visible viewport, including Safari's shifted visual viewport. */
function getBleedFrame(bleed: HTMLElement) {
  const rect = bleed.getBoundingClientRect();
  const layoutWidth =
    typeof document !== "undefined"
      ? document.documentElement.clientWidth
      : rect.width;
  const layoutHeight =
    typeof document !== "undefined"
      ? document.documentElement.clientHeight
      : rect.height;
  const visualViewport =
    typeof window !== "undefined" ? window.visualViewport : undefined;
  const viewportLeft = visualViewport?.offsetLeft ?? 0;
  const viewportTop = visualViewport?.offsetTop ?? 0;
  const viewportWidth = visualViewport?.width ?? layoutWidth;
  const viewportHeight = visualViewport?.height ?? layoutHeight;
  const left = Math.max(0, rect.left, viewportLeft);
  const right = Math.min(
    rect.right,
    layoutWidth,
    viewportLeft + viewportWidth,
  );
  const top = Math.max(0, viewportTop);
  const bottom = Math.min(layoutHeight, viewportTop + viewportHeight);

  return {
    left,
    top,
    width: Math.max(0, right - left),
    height: Math.max(0, bottom - top),
  };
}

function getTitleFitWidth(bleed: HTMLElement, paddingX: number): number {
  const frame = getBleedFrame(bleed);
  return Math.max(
    32,
    (Math.min(bleed.clientWidth, frame.width) - paddingX) * 0.998,
  );
}

function ExperienceTitleComponent({
  label,
  overlineLabel,
  onClick,
  preloader = false,
  onPreloaderComplete,
}: ExperienceTitleProps) {
  const bleedRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const syncIntroLayoutRef = useRef<(() => void) | null>(null);
  const introStartedRef = useRef(false);
  const introFinishedRef = useRef(false);
  /** Declarative “surface visible” so CSS opacity survives parent re-renders during the intro. */
  const [introSurface, setIntroSurface] = useState(false);
  const scheduleIntroSurface = useCallback((visible: boolean) => {
    queueMicrotask(() => {
      setIntroSurface((current) => (current === visible ? current : visible));
    });
  }, []);

  const applyFit = useCallback(() => {
    const bleed = bleedRef.current;
    const titleRoot = titleRef.current;
    const track = titleRoot?.querySelector<HTMLElement>(
      ".experience__title-reveal-track",
    );
    if (!bleed || !titleRoot || !track) {
      return;
    }
    const styles = window.getComputedStyle(titleRoot);
    const paddingX =
      Number.parseFloat(styles.paddingLeft) +
      Number.parseFloat(styles.paddingRight);
    const target = getTitleFitWidth(bleed, paddingX);
    if (target < 32) {
      return;
    }
    fitTitleFontSize(titleRoot, track, target);
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick();
      }
    },
    [onClick],
  );

  useLayoutEffect(() => {
    const run = () => {
      applyFit();
    };
    if (typeof document === "undefined" || !document.fonts) {
      run();
      return;
    }
    void document.fonts.ready.then(() => {
      requestAnimationFrame(run);
    });
  }, [applyFit, label]);

  useLayoutEffect(() => {
    const bleed = bleedRef.current;
    if (!bleed) {
      return;
    }
    const scheduleFit = () => {
      requestAnimationFrame(() => applyFit());
    };
    const scheduleViewportSync = () => {
      requestAnimationFrame(() => {
        applyFit();
        syncIntroLayoutRef.current?.();
      });
    };
    const ro = new ResizeObserver(scheduleFit);
    ro.observe(bleed);
    window.addEventListener("resize", scheduleViewportSync);
    window.addEventListener("orientationchange", scheduleViewportSync);
    window.visualViewport?.addEventListener("resize", scheduleViewportSync);
    window.visualViewport?.addEventListener("scroll", scheduleViewportSync);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", scheduleViewportSync);
      window.removeEventListener("orientationchange", scheduleViewportSync);
      window.visualViewport?.removeEventListener("resize", scheduleViewportSync);
      window.visualViewport?.removeEventListener("scroll", scheduleViewportSync);
    };
  }, [applyFit]);

  useLayoutEffect(() => {
    if (!preloader) {
      scheduleIntroSurface(false);
      const titleRoot = titleRef.current;
      const track = titleRoot?.querySelector<HTMLElement>(
        ".experience__title-reveal-track",
      );
      const overline = titleRoot?.querySelector<HTMLElement>(
        ".experience__title-overline",
      );
      const clip = titleRoot?.querySelector<HTMLElement>(
        ".experience__title-reveal-clip",
      );
      if (titleRoot) {
        gsap.killTweensOf(titleRoot);
        gsap.set(titleRoot, { clearProps: "opacity,visibility" });
      }
      if (clip) {
        gsap.set(clip, { clearProps: "perspective" });
      }
      if (track) {
        gsap.killTweensOf(track);
        gsap.set(track, {
          clearProps: "opacity,transform,filter,transformOrigin",
        });
      }
      if (overline) {
        gsap.killTweensOf(overline);
        gsap.set(overline, { clearProps: "opacity,filter" });
      }
      introStartedRef.current = false;
      introFinishedRef.current = false;
      return;
    }
    if (introStartedRef.current) {
      return;
    }

    const bleed = bleedRef.current;
    const titleRoot = titleRef.current;
    const track = titleRoot?.querySelector<HTMLElement>(
      ".experience__title-reveal-track",
    );
    const overline = titleRoot?.querySelector<HTMLElement>(
      ".experience__title-overline",
    );
    const clip = titleRoot?.querySelector<HTMLElement>(
      ".experience__title-reveal-clip",
    );
    if (!bleed || !titleRoot || !track || !overline || !clip) {
      return;
    }

    scheduleIntroSurface(false);

    /* Before any await (fonts.load etc.): hide title so first paint cannot show header slot. */
    gsap.set(titleRoot, { opacity: 0 });

    introStartedRef.current = true;
    let cancelled = false;

    const ctx = gsap.context(() => {
      const reduceMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const runIntro = async () => {
        // Do not reveal or size the script against a fallback face: its advance
        // width can differ enough to crop the title before the web font swaps in.
        if (document.fonts) {
          const fontStyles = window.getComputedStyle(titleRoot);
          // Safari can serialize `getComputedStyle(...).font` as an empty string
          // for this variable-backed font. `FontFaceSet.load("")` throws before
          // `.catch()` can run, leaving the intro title hidden forever. Build the
          // shorthand from its computed longhands instead.
          const font = [
            fontStyles.fontStyle,
            fontStyles.fontWeight,
            fontStyles.fontSize,
            fontStyles.fontFamily,
          ].join(" ");
          try {
            await document.fonts.load(font, label);
          } catch {
            // `document.fonts.ready` below still allows a gracefully loaded
            // fallback on browsers that reject a particular font shorthand.
          }
          await document.fonts.ready;
        }
        applyFit();
        if (cancelled) {
          return;
        }
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        );
        if (cancelled) {
          return;
        }

        bleed.classList.add("experience__title-bleed--preloader-slot");

        /* Depth reveal: scale toward camera (center origin), no xy translate. */
        if (reduceMotion) {
          gsap.set(clip, { clearProps: "perspective" });
          gsap.set(track, { opacity: 1, scale: 1, z: 0 });
          gsap.set(overline, { opacity: 0 });
        } else {
          gsap.set(clip, { perspective: 1100 });
          gsap.set(track, TITLE_INTRO_FROM);
          gsap.set(overline, OVERLINE_INTRO_FROM);
        }

        // Queue React state instead of forcing a nested commit from a layout
        // effect; inline GSAP opacity/z-index make the current frame visible.
        scheduleIntroSurface(true);

        const syncIntroLayout = () => {
          const frame = getBleedFrame(bleed);
          const centerY = frame.top + frame.height / 2;
          gsap.set(titleRoot, {
            position: "fixed",
            left: frame.left,
            top: centerY,
            yPercent: -50,
            width: frame.width,
            height: "auto",
            textAlign: "left",
            boxSizing: "border-box",
            opacity: 1,
            zIndex: 10050,
          });

          /* Center the rendered script ink, not the outer control box. The
             italic swashes and clip offset make those centers diverge. */
          const introTrackRect = track.getBoundingClientRect();
          gsap.set(titleRoot, {
            y: centerY - (introTrackRect.top + introTrackRect.bottom) / 2,
          });
        };
        syncIntroLayoutRef.current = syncIntroLayout;
        syncIntroLayout();

        if (cancelled) {
          return;
        }

        if (!reduceMotion) {
          await animateTitleIntro(track);
          gsap.set(track, { clearProps: "transform,transformOrigin" });
          gsap.set(clip, { clearProps: "perspective" });
        }
        if (cancelled) {
          return;
        }

        await waitForWindowLoad();
        if (cancelled) {
          return;
        }

        applyFit();
        if (cancelled) {
          return;
        }

        const bleedFrameBeforeFlip = getBleedFrame(bleed);
        gsap.set(titleRoot, {
          left: bleedFrameBeforeFlip.left,
          width: bleedFrameBeforeFlip.width,
        });

        /** Record fixed intro layout, then snap to natural header in the DOM; Flip animates into place. */
        const state = Flip.getState(titleRoot);

        bleed.classList.remove("experience__title-bleed--preloader-slot");
        syncIntroLayoutRef.current = null;
        gsap.set(titleRoot, {
          clearProps:
            "position,left,top,width,height,textAlign,boxSizing,zIndex,xPercent,yPercent,transform",
        });
        gsap.set(titleRoot, { opacity: 1 });

        Flip.from(state, {
          duration: reduceMotion ? 0.05 : 0.75,
          ease: "power3.inOut",
          absolute: true,
          simple: true,
          onComplete: () => {
            introFinishedRef.current = true;
            gsap.set(titleRoot, {
              clearProps:
                "transform,x,y,xPercent,yPercent,left,top,width,height,textAlign",
            });
            gsap.set(titleRoot, { opacity: 1 });
            gsap.set(track, { clearProps: "opacity,transform,filter" });
            gsap.set(overline, { clearProps: "opacity,filter" });
            onPreloaderComplete?.();
          },
        });
      };

      void runIntro();
    }, titleRoot);

    return () => {
      cancelled = true;
      syncIntroLayoutRef.current = null;
      if (!introFinishedRef.current) {
        ctx.revert();
      }
      introStartedRef.current = false;
    };
  }, [preloader, label, applyFit, onPreloaderComplete, scheduleIntroSurface]);

  return (
    <div className="experience__title-bleed" ref={bleedRef}>
      <div
        ref={titleRef}
        role="button"
        tabIndex={0}
        className={`experience__title${
          introSurface ? " experience__title--intro-surface" : ""
        }`}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        aria-label={label}
      >
        <span className="experience__title-reveal-clip">
          <span className="experience__title-reveal-track">{label}</span>
        </span>
        <span className="experience__title-overline" aria-hidden="true">
          {overlineLabel}
        </span>
      </div>
    </div>
  );
}

export const ExperienceTitle = memo(ExperienceTitleComponent);
