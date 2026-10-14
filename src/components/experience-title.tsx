"use client";

import { gsap } from "gsap";
import { memo, useCallback, useLayoutEffect, useRef } from "react";

import { WORDMARK_PATH, WORDMARK_VIEWBOX } from "@/lib/wordmark";

type ExperienceTitleProps = {
  label: string;
  overlineLabel: string;
  onClick: () => void;
  /** When true, run the intro: centered reveal, then glide into the header after window load. */
  preloader?: boolean;
  /** Fired once the title has settled in the header. */
  onPreloaderComplete?: () => void;
};

/** Resolve on window load, but never hold the intro longer than `maxMs` on slow networks. */
function waitForWindowLoad(maxMs: number): Promise<void> {
  if (typeof document === "undefined" || document.readyState === "complete") {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const timer = window.setTimeout(resolve, maxMs);
    window.addEventListener(
      "load",
      () => {
        window.clearTimeout(timer);
        resolve();
      },
      { once: true },
    );
  });
}

/** Vertical offset that moves the wordmark's center to the visible viewport's center. */
function getCenterOffset(wordmark: Element, currentY: number): number {
  const rect = wordmark.getBoundingClientRect();
  const viewport = window.visualViewport;
  const top = viewport?.offsetTop ?? 0;
  const height = viewport?.height ?? window.innerHeight;
  const restingCenter = rect.top + rect.height / 2 - currentY;
  return top + height / 2 - restingCenter;
}

function ExperienceTitleComponent({
  label,
  overlineLabel,
  onClick,
  preloader = false,
  onPreloaderComplete,
}: ExperienceTitleProps) {
  const titleRef = useRef<HTMLDivElement>(null);
  const introStartedRef = useRef(false);

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
    const titleRoot = titleRef.current;
    const wordmark = titleRoot?.querySelector<SVGSVGElement>(
      ".experience__wordmark",
    );
    const overline = titleRoot?.querySelector<HTMLElement>(
      ".experience__title-overline",
    );
    if (!titleRoot || !wordmark || !overline) {
      return;
    }

    if (!preloader) {
      gsap.killTweensOf([titleRoot, wordmark, overline]);
      gsap.set([titleRoot, wordmark, overline], {
        clearProps: "opacity,transform",
      });
      introStartedRef.current = false;
      return;
    }
    if (introStartedRef.current) {
      return;
    }
    introStartedRef.current = true;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let cancelled = false;
    let centered = true;

    /*
     * The title never leaves its header slot: only transforms move it, so layout
     * (and therefore the page below) stays stable through the whole intro, and the
     * SVG's box always contains every stroke of the script.
     */
    const centerTitle = () => {
      if (!centered) {
        return;
      }
      const currentY = Number(gsap.getProperty(titleRoot, "y")) || 0;
      gsap.set(titleRoot, { y: getCenterOffset(wordmark, currentY) });
    };

    gsap.set(titleRoot, { opacity: 1, y: 0 });
    gsap.set(overline, { opacity: 0 });
    centerTitle();
    gsap.set(
      wordmark,
      reduceMotion
        ? { opacity: 1 }
        : { opacity: 0, scale: 0.965, transformOrigin: "50% 50%" },
    );

    const viewport = window.visualViewport;
    window.addEventListener("resize", centerTitle);
    viewport?.addEventListener("resize", centerTitle);

    const run = async () => {
      if (!reduceMotion) {
        await gsap.to(wordmark, {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power3.out",
        });
      }
      await waitForWindowLoad(2200);
      if (cancelled) {
        return;
      }

      centered = false;
      await gsap.to(titleRoot, {
        y: 0,
        duration: reduceMotion ? 0 : 0.85,
        ease: "power3.inOut",
      });
      if (cancelled) {
        return;
      }
      gsap.set([titleRoot, wordmark], { clearProps: "transform" });
      gsap.to(overline, {
        opacity: 1,
        duration: reduceMotion ? 0 : 0.6,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(overline, { clearProps: "opacity" });
        },
      });
      onPreloaderComplete?.();
    };

    void run();

    return () => {
      cancelled = true;
      window.removeEventListener("resize", centerTitle);
      viewport?.removeEventListener("resize", centerTitle);
      gsap.killTweensOf([titleRoot, wordmark, overline]);
      introStartedRef.current = false;
    };
  }, [preloader, onPreloaderComplete]);

  return (
    <div className="experience__title-bleed">
      <div
        ref={titleRef}
        role="button"
        tabIndex={0}
        className="experience__title"
        onClick={onClick}
        onKeyDown={handleKeyDown}
        aria-label={label}
      >
        <span className="experience__wordmark-frame">
          <svg
            className="experience__wordmark"
            viewBox={WORDMARK_VIEWBOX}
            aria-hidden="true"
            focusable="false"
          >
            <path d={WORDMARK_PATH} />
          </svg>
          <span className="experience__title-overline" aria-hidden="true">
            {overlineLabel}
          </span>
        </span>
      </div>
    </div>
  );
}

export const ExperienceTitle = memo(ExperienceTitleComponent);
