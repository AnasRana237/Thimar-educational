/*
 * Motion primitives.
 *
 * Reusable, composable motion behaviours. Two rules hold throughout:
 *
 *  1. Every effect degrades. `useReducedMotion` is honoured in each
 *     component — the content always arrives, it just stops moving.
 *  2. Pointer-driven effects are mouse-only. Tilt and magnetism on a
 *     touchscreen fire on tap and feel like lag, so they are skipped.
 */
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { EASE_OUT, SPRING_POINTER, VIEWPORT } from "@/lib/motion";

/* ------------------------------------------------------------------ *
 * Split-word headline reveal
 * ------------------------------------------------------------------ */

export type WordSegment = {
  text: string;
  className?: string;
  /** Wipes a gold marker in behind the words of this segment. */
  marker?: boolean;
};

/**
 * Reveals a headline word by word, each word rising out of its own
 * clipping box.
 *
 * The words are emitted with real spaces between them rather than as
 * styled blocks, so the headline stays a single selectable, crawlable,
 * screen-reader-friendly phrase. The clip box carries a little bottom
 * padding pulled back by an equal negative margin — without it the box
 * shears the descenders off `g`, `y` and Arabic sub-baseline forms.
 */
export function SplitWords({
  segments,
  delay = 0,
  stagger = 0.055,
  duration = 0.75,
  markerFrom = "start",
}: {
  segments: WordSegment[];
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Side the gold marker grows from. Pass "end" in RTL. */
  markerFrom?: "start" | "end";
}) {
  const reduced = useReducedMotion();

  const words = segments.flatMap((seg, s) =>
    seg.text
      .split(/\s+/)
      .filter(Boolean)
      .map((text, w) => ({ text, className: seg.className, marker: seg.marker, key: `${s}-${w}` })),
  );

  return (
    <>
      {words.map((word, i) => {
        const at = delay + i * stagger;
        return (
          <Fragment key={word.key}>
            <span className="inline-flex overflow-hidden pb-[0.14em] align-bottom [margin-block-end:-0.14em]">
              <motion.span
                className={cn("inline-block", word.marker && "marker-gold", word.className)}
                initial={
                  reduced
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        y: "108%",
                        ...(word.marker ? { backgroundSize: "0% 100%" } : null),
                      }
                }
                animate={{
                  opacity: 1,
                  y: "0%",
                  ...(word.marker ? { backgroundSize: "100% 100%" } : null),
                }}
                style={
                  word.marker
                    ? { backgroundPosition: markerFrom === "end" ? "right bottom" : "left bottom" }
                    : {}
                }
                transition={{
                  duration,
                  ease: EASE_OUT,
                  delay: at,
                  // The marker trails its word so you read the word, then
                  // see it underlined — not both at once.
                  backgroundSize: { duration: 0.5, ease: EASE_OUT, delay: at + 0.3 },
                }}
              >
                {word.text}
              </motion.span>
            </span>{" "}
          </Fragment>
        );
      })}
    </>
  );
}

/**
 * A headline phrase that cycles. Words roll up and out while the next
 * set rolls up into place, so the line reads as one continuous upward
 * movement rather than a crossfade.
 *
 * Three things make this safe to put in an `h1`:
 *
 *  - **No reflow.** Every phrase is rendered invisibly into the same CSS
 *    grid cell, so the box is already as tall and wide as the longest
 *    one. Nothing below the headline shifts when the text swaps.
 *  - **Stable accessible text.** The moving copy is `aria-hidden`; a
 *    visually-hidden span carries the canonical first phrase. Assistive
 *    tech and crawlers see one unchanging headline instead of text that
 *    rewrites itself every few seconds.
 *  - **It stops.** Reduced motion pins it to the first phrase, and
 *    hovering pauses it — auto-advancing text with no way to halt it is
 *    a WCAG 2.2.2 problem.
 */
export function RotatingWords({
  phrases,
  interval = 2800,
  startDelay = 0,
  className,
  wordClassName,
}: {
  phrases: string[];
  interval?: number;
  startDelay?: number;
  className?: string;
  wordClassName?: string;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (reduced || paused || phrases.length < 2) return;
    const id = setTimeout(() => {
      started.current = true;
      setIndex((v) => (v + 1) % phrases.length);
    }, interval);
    return () => clearTimeout(id);
  }, [index, paused, reduced, interval, phrases.length]);

  const first = phrases[0] ?? "";
  const active = phrases[index] ?? first;

  if (reduced || phrases.length < 2) {
    return <span className={cn("block", className)}>{first}</span>;
  }

  // Only the very first appearance waits for the rest of the hero.
  const enterDelay = started.current ? 0 : startDelay;

  return (
    <span
      className={cn("grid", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Sizing ghosts — every phrase, stacked in one cell, so the grid
          track is as large as the largest phrase at any viewport. */}
      {phrases.map((p) => (
        <span key={p} aria-hidden="true" className="invisible [grid-area:1/1] block">
          {p}
        </span>
      ))}

      <span className="sr-only">{first}</span>

      <span aria-hidden="true" className="[grid-area:1/1] block">
        <AnimatePresence initial={false}>
          <motion.span
            key={index}
            className="block [grid-area:1/1]"
            initial="enter"
            animate="center"
            exit="exit"
            variants={{
              center: { transition: { staggerChildren: 0.05, delayChildren: enterDelay } },
              exit: { transition: { staggerChildren: 0.035 } },
            }}
          >
            {active
              .split(/\s+/)
              .filter(Boolean)
              .map((word, w) => (
                <Fragment key={`${word}-${w}`}>
                  <span className="inline-flex overflow-hidden pb-[0.14em] align-bottom [margin-block-end:-0.14em]">
                    <motion.span
                      className={cn("inline-block", wordClassName)}
                      variants={{
                        enter: { y: "115%", opacity: 0 },
                        center: {
                          y: "0%",
                          opacity: 1,
                          transition: { duration: 0.6, ease: EASE_OUT },
                        },
                        exit: {
                          y: "-115%",
                          opacity: 0,
                          transition: { duration: 0.45, ease: EASE_OUT },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>{" "}
                </Fragment>
              ))}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Pointer-driven
 * ------------------------------------------------------------------ */

/**
 * Pulls its child a short distance toward the cursor. Used only on the
 * two hero CTAs — magnetism everywhere reads as a broken page.
 */
export function Magnetic({
  children,
  strength = 0.22,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, SPRING_POINTER);
  const y = useSpring(my, SPRING_POINTER);

  const onMove = useCallback(
    (e: PointerEvent<HTMLSpanElement>) => {
      if (e.pointerType !== "mouse") return;
      const r = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - (r.left + r.width / 2)) * strength);
      my.set((e.clientY - (r.top + r.height / 2)) * strength);
    },
    [mx, my, strength],
  );

  const reset = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  if (reduced) return <span className={cn("inline-flex", className)}>{children}</span>;

  return (
    <motion.span
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.span>
  );
}

/** Tips its child in 3D toward the cursor. */
export function Tilt({
  children,
  className,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduced = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, SPRING_POINTER);
  const rotateY = useSpring(ry, SPRING_POINTER);

  const onMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "mouse") return;
      const r = e.currentTarget.getBoundingClientRect();
      ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
      rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
    },
    [rx, ry, max],
  );

  const reset = useCallback(() => {
    rx.set(0);
    ry.set(0);
  }, [rx, ry]);

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn("[perspective:1100px]", className)}
    >
      <motion.div style={{ rotateX, rotateY }} className="h-full">
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Wraps content with a soft light that follows the cursor. The glow is a
 * separate painted layer at `rounded-[inherit]`, so it picks up whatever
 * radius the caller sets without being told about it.
 */
export function Spotlight({
  children,
  className,
  radius = 340,
  tint = "var(--gold)",
  strength = 14,
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
  tint?: string;
  strength?: number;
}) {
  const reduced = useReducedMotion();
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${x}px ${y}px, color-mix(in oklab, ${tint} ${strength}%, transparent), transparent 70%)`;

  const onMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== "mouse") return;
      const r = e.currentTarget.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    },
    [x, y],
  );

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div onPointerMove={onMove} className={cn("group/spot relative", className)}>
      {children}
      {/*
       * Painted after the content, not behind it: the cards this wraps have
       * opaque backgrounds, so a glow underneath them would never be seen.
       * `strength` is kept low for that reason — it tints the card warm
       * without lifting a veil over the text.
       */}
      <motion.span
        aria-hidden="true"
        style={{ background }}
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
      />
    </div>
  );
}

/**
 * Normalised cursor position as a pair of springs, each in the range
 * -0.5…0.5. Consumers multiply by a depth to move layers by different
 * amounts, which is what produces the parallax illusion.
 *
 * One listener serves every layer, rather than one per layer.
 */
export function useMouseDepth() {
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, SPRING_POINTER);
  const y = useSpring(my, SPRING_POINTER);

  useEffect(() => {
    if (reduced) return;
    // Fine pointers only. A touchscreen has no hover position to follow,
    // so the layers would lurch on every tap instead of drifting.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: globalThis.PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my, reduced]);

  return { x, y };
}

/* ------------------------------------------------------------------ *
 * Scroll-driven
 * ------------------------------------------------------------------ */

function ScrubWord({
  children,
  progress,
  start,
  end,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}

/**
 * A statement that lights up word by word as it crosses the viewport —
 * the reader's scroll position literally sets the reading pace.
 *
 * Words are emitted with real spaces between them so the paragraph stays
 * one selectable, crawlable sentence.
 */
export function ScrubWords({ text, className }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end center"] });
  const words = text.split(/\s+/).filter(Boolean);

  if (reduced) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <ScrubWord
            progress={scrollYProgress}
            start={i / words.length}
            end={(i + 1) / words.length}
          >
            {word}
          </ScrubWord>{" "}
        </Fragment>
      ))}
    </p>
  );
}

/**
 * Moves its child against the scroll. `distance` is the total travel
 * across the whole time the element is on screen, split either side of
 * centre so the element sits in its laid-out position mid-viewport.
 */
export function Parallax({
  children,
  distance = 60,
  className,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance / 2, -distance / 2]);

  return (
    <motion.div ref={ref} style={reduced ? {} : { y }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Uncovers an image with a vertical wipe while the photo itself settles
 * back from a slight overscale — the two together read as a camera
 * finding its frame.
 *
 * The wipe is vertical on purpose: a horizontal one would have to flip
 * for RTL, and a direction-neutral reveal is one less thing to get
 * wrong.
 */
export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  duration = 1.05,
  delay = 0,
  loading = "lazy",
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  duration?: number;
  delay?: number;
  /* Spelled out rather than spread from ComponentProps<"img">: framer's
     own drag handlers clash with React's on a motion.img. */
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={reduced ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={reduced ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={VIEWPORT}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      <motion.img
        src={src}
        alt={alt}
        initial={reduced ? {} : { scale: 1.2 }}
        whileInView={reduced ? {} : { scale: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: duration * 1.5, delay, ease: EASE_OUT }}
        className={cn("h-full w-full object-cover", imgClassName)}
        loading={loading}
        width={width}
        height={height}
      />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ *
 * Ambient
 * ------------------------------------------------------------------ */

/**
 * Seamless infinite ticker. The track holds the content twice and
 * travels exactly -50%, so the second copy is pixel-aligned with where
 * the first started — no snap at the wrap. The duplicate is hidden from
 * assistive tech so the list isn't announced twice.
 */
export function Marquee({
  children,
  duration = 34,
  reverse = false,
  className,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={cn("flex overflow-hidden", className)}>
        <div className="flex min-w-max items-center">{children}</div>
      </div>
    );
  }

  return (
    // dir=ltr pins the track geometry: the -50% travel must not flip with
    // the document, while the items inside still shape per their own text.
    <div dir="ltr" className={cn("mask-fade-x flex overflow-hidden", className)}>
      <motion.div
        className="flex min-w-max items-center"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/** Gentle idle bob. Used on the hero's floating cards. */
export function Floating({
  children,
  className,
  amplitude = 7,
  duration = 6,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      animate={{ y: [-amplitude, amplitude, -amplitude] }}
      transition={{ duration, delay, ease: "easeInOut", repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}

/**
 * The hero's ambient wash: three slow-drifting colour fields over a dot
 * grid. Blur is large and opacity low, so it reads as light in the room
 * rather than as shapes on the page.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="bg-dots mask-fade-y absolute inset-0 opacity-50" />
      <div className="animate-drift-a absolute -top-40 -start-32 size-[36rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_34%,transparent),transparent_68%)] blur-3xl" />
      <div className="animate-drift-b absolute -top-24 end-[-14rem] size-[40rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_22%,transparent),transparent_68%)] blur-3xl" />
      <div className="animate-drift-c absolute -bottom-56 start-1/3 size-[32rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold-soft)_30%,transparent),transparent_70%)] blur-3xl" />
      <div className="bg-grain absolute inset-0 opacity-[0.045] mix-blend-multiply" />
    </div>
  );
}
