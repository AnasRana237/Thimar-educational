import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------- Scroll reveal ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  x = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/* ---------- Section shell ---------- */
export function Section({
  id,
  children,
  className,
  tone = "light",
  pad = "md",
}: {
  id: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "cream" | "navy";
  pad?: "sm" | "md" | "lg";
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden",
        pad === "sm" && "section-pad-sm",
        pad === "md" && "section-pad",
        pad === "lg" && "section-pad-lg",
        tone === "cream" && "surface-cream",
        tone === "navy" && "bg-gradient-navy text-primary-foreground",
        className,
      )}
    >
      {/*
       * Light sections are never flat white. A single warm wash anchored to
       * the top edge gives the page the same lit quality as the dark half,
       * and keeps consecutive pale sections from reading as one slab.
       */}
      {tone !== "navy" ? (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(70%_100%_at_50%_0%,color-mix(in_oklab,var(--gold)_9%,transparent),transparent_72%)]"
          aria-hidden="true"
        />
      ) : null}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

/* ---------- Eyebrow ---------- */
/*
 * A hairline rule rather than a filled pill: it reads as editorial labelling
 * instead of a badge, and stays quiet when repeated down the page.
 * `tracking` is cleared in RTL — letter-spacing breaks joined Arabic forms.
 */
export function Eyebrow({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow-rule inline-flex items-center gap-3 text-xs font-semibold tracking-[0.16em] uppercase rtl:tracking-normal",
        tone === "dark" ? "text-gold-ink" : "text-gold",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "dark",
  size = "md",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  tone?: "dark" | "light";
  size?: "md" | "lg" | "xl";
}) {
  return (
    <div
      className={cn(align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-start")}
    >
      <Reveal>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.07}>
        {/*
         * Three registers, deliberately far apart. A body that only ever
         * steps between 2.6rem and 3.25rem has no hierarchy at all — `xl`
         * exists so the major chapters can carry real weight against the
         * hero, and `md` can then sit genuinely quiet beneath them.
         */}
        <h2
          className={cn(
            "mt-5 text-balance",
            size === "xl" && "text-[clamp(2.1rem,5.2vw,4.25rem)] leading-[1.05] rtl:leading-[1.2]",
            size === "lg" && "text-[2rem] leading-[1.12] sm:text-[2.6rem] lg:text-[3.25rem]",
            size === "md" && "text-[1.75rem] leading-[1.18] sm:text-4xl lg:text-[2.6rem]",
            tone === "dark" ? "text-primary" : "text-primary-foreground",
          )}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.13}>
          <p
            className={cn(
              "mt-4 text-pretty leading-relaxed",
              align === "center" && "mx-auto max-w-2xl",
              tone === "dark" ? "text-muted-foreground" : "text-primary-foreground/70",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/* ---------- Buttons ---------- */
const base =
  "group inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold transition-[transform,box-shadow,background-color,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]";

export function GoldButton({
  children,
  className,
  ...props
}: React.ComponentProps<"a"> & { children: ReactNode }) {
  return (
    <a
      {...props}
      className={cn(
        base,
        "bg-gold text-gold-foreground shadow-[var(--shadow-gold)] hover:-translate-y-0.5 hover:bg-gold-soft hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      {children}
    </a>
  );
}

export function NavyButton({
  children,
  className,
  ...props
}: React.ComponentProps<"a"> & { children: ReactNode }) {
  return (
    <a
      {...props}
      className={cn(
        base,
        "bg-primary text-primary-foreground shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:bg-navy-deep hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      {children}
    </a>
  );
}

export function GhostButton({
  children,
  className,
  ...props
}: React.ComponentProps<"a"> & { children: ReactNode }) {
  return (
    <a
      {...props}
      className={cn(
        base,
        "border border-primary/20 bg-background text-primary hover:-translate-y-0.5 hover:border-primary/45 hover:bg-secondary",
        className,
      )}
    >
      {children}
    </a>
  );
}

/* ---------- Count up ---------- */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduced]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
