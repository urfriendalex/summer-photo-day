"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  type RefObject,
} from "react";

import { layoutWidthForMeasure, measureVisualLines } from "@/lib/visual-line-wrap";

/**
 * Splits `text` into visual lines matching normal HTML/CSS wrapping on `ref`
 * (width, typography, `pre-line` for `\n`), for line-by-line reveals.
 */
export function useVisualLines<T extends HTMLElement>(
  text: string,
  ref: RefObject<T | null>,
  active = true,
): string[] | null {
  const [lines, setLines] = useState<string[] | null>(null);

  const relayout = useCallback(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    if (layoutWidthForMeasure(el) <= 0) {
      return;
    }

    setLines(measureVisualLines(text, el));
  }, [text, ref]);

  const scheduleLayout = useCallback(() => {
    const tick = () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      if (layoutWidthForMeasure(el) <= 0) {
        requestAnimationFrame(tick);
        return;
      }
      relayout();
    };
    tick();
  }, [relayout, ref]);

  useLayoutEffect(() => {
    if (!active) {
      return;
    }

    if (typeof document === "undefined" || !document.fonts) {
      scheduleLayout();
      return;
    }
    void document.fonts.ready.then(scheduleLayout);
  }, [active, scheduleLayout]);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }
    const ro = new ResizeObserver(() => {
      scheduleLayout();
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
    };
  }, [scheduleLayout, ref]);

  return lines;
}
