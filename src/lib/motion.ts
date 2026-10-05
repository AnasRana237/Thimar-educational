/*
 * Motion tokens.
 *
 * One curve and one duration scale for the whole page. The page should
 * feel like it was animated by a single hand, which only happens if
 * components stop inventing their own easings.
 *
 * EASE_OUT is the default: fast departure, long settle. It reads as
 * "confident", and is the curve already used by the CSS shadow and card
 * transitions (--ease-out-soft), so JS and CSS motion stay in sync.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;

/** Nav indicator, menu panels — anything that should arrive crisply. */
export const SPRING_SNAP = { type: "spring", stiffness: 380, damping: 32 } as const;

/** Scroll-linked values. Heavily damped so scrubbing never jitters. */
export const SPRING_SCROLL = {
  type: "spring",
  stiffness: 90,
  damping: 28,
  restDelta: 0.001,
} as const;

/** Pointer-following motion (magnet, tilt). Light mass, quick recovery. */
export const SPRING_POINTER = {
  type: "spring",
  stiffness: 240,
  damping: 20,
  mass: 0.35,
} as const;

/**
 * Stagger step for lists. Deliberately small: anything above ~0.08s and a
 * six-item grid takes longer to arrive than the reader takes to scan it.
 */
export const STAGGER = 0.06;

/** Viewport config shared by every scroll reveal, so they all trigger alike. */
export const VIEWPORT = { once: true, margin: "-70px" } as const;
