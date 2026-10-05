import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";
import g1 from "@/assets/gallery-1.jpg";
import g4 from "@/assets/gallery-4.jpg";
import heroImg from "@/assets/hero-students.jpg";
import { useI18n } from "@/lib/i18n";
import { EASE_OUT } from "@/lib/motion";
import { Magnetic, Marquee, RotatingWords, SplitWords, useMouseDepth } from "@/components/motion";
import { cn } from "@/lib/utils";

/*
 * The hero is a stack of translucent layers over one photograph:
 *
 *   navy base → desaturated photo → navy wash → gold aurora →
 *   gold grid → vignette → grain → content
 *
 * Each layer tracks the cursor by a different amount, which is what
 * gives a flat page apparent depth. The photo moves *against* the
 * cursor and the foreground cards move *with* it, exaggerating the
 * separation. All of it collapses to a static composition under
 * reduced motion, and the pointer listener never attaches on touch.
 */
export function Hero() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { x: mx, y: my } = useMouseDepth();

  // Pointer depth. Negative values move the layer opposite the cursor.
  const photoX = useTransform(mx, (v) => v * -34);
  const photoY = useTransform(my, (v) => v * -34);
  const auroraX = useTransform(mx, (v) => v * 46);
  const auroraY = useTransform(my, (v) => v * 46);
  const gridX = useTransform(mx, (v) => v * 18);
  const gridY = useTransform(my, (v) => v * 18);
  const cardAX = useTransform(mx, (v) => v * 62);
  const cardAY = useTransform(my, (v) => v * 62);
  const cardBX = useTransform(mx, (v) => v * -52);
  const cardBY = useTransform(my, (v) => v * -52);

  // Scroll depth, keyed to the hero leaving the viewport.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoScrollY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 130]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 70]);
  const contentFade = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0]);

  const startWords = t.hero.titleStart.split(/\s+/).filter(Boolean).length;

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-navy-deep"
    >
      {/* ---- Layer 1: the photograph, recoloured ---- */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduced ? {} : { x: photoX, y: photoY }}
        aria-hidden="true"
      >
        <motion.img
          src={heroImg}
          alt=""
          /* Oversized so parallax travel never exposes an edge. */
          className="photo-mono absolute inset-0 size-full scale-[1.15] object-cover opacity-55"
          style={reduced ? {} : { y: photoScrollY }}
          initial={reduced ? {} : { scale: 1.3, opacity: 0 }}
          animate={reduced ? {} : { scale: 1.15, opacity: 0.55 }}
          transition={{ duration: 1.8, ease: EASE_OUT }}
        />
      </motion.div>

      {/*
       * ---- Layer 2: navy wash ----
       * Deliberately lighter through the middle than it used to be. The
       * photograph is the only real texture up here, and burying it under
       * a flat scrim left the hero looking empty. Contrast for the type is
       * handled by the focused scrim below instead, which darkens only
       * where the words actually sit.
       */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-deep/85 via-primary/30 to-navy-deep/95"
        aria-hidden="true"
      />

      {/* ---- Layer 3: gold aurora ---- */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={reduced ? {} : { x: auroraX, y: auroraY }}
        aria-hidden="true"
      >
        <div className="animate-drift-a absolute -top-48 -start-24 size-[42rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_40%,transparent),transparent_66%)] blur-3xl" />
        <div className="animate-drift-b absolute -bottom-56 end-[-10rem] size-[46rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--navy-soft)_70%,transparent),transparent_68%)] blur-3xl" />
        <div className="animate-drift-c absolute top-1/3 start-1/2 size-[30rem] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_22%,transparent),transparent_70%)] blur-3xl" />
      </motion.div>

      {/* ---- Layer 4: gold grid ---- */}
      <motion.div
        className="bg-grid-gold mask-fade-y pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={reduced ? {} : { x: gridX, y: gridY }}
        aria-hidden="true"
      />

      {/* ---- Layers 5–7: vignette, type scrim, grain ----
             The vignette darkens the frame edges; the scrim is a soft pool
             sitting directly behind the centred headline. Together they let
             the photograph stay visible around the outside while keeping the
             words on a dark, even field. ---- */}
      <div
        className="vignette-navy pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(56%_46%_at_50%_48%,color-mix(in_oklab,var(--navy-deep)_80%,transparent)_0%,transparent_72%)]"
        aria-hidden="true"
      />
      <div
        className="bg-grain pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        aria-hidden="true"
      />

      {/* ---- Floating photo cards. Large screens only: on a phone they
             crowd the headline rather than framing it. ---- */}
      <motion.div
        className="pointer-events-none absolute top-[18%] start-[4%] -z-10 hidden w-44 xl:block"
        style={reduced ? {} : { x: cardAX, y: cardAY }}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40, rotate: -10 }}
        animate={{ opacity: 1, y: 0, rotate: -7 }}
        transition={{ delay: 0.9, duration: 1, ease: EASE_OUT }}
        aria-hidden="true"
      >
        <div className="overflow-hidden rounded-2xl border border-gold/25 shadow-[var(--shadow-lift)]">
          <img src={g1} alt="" className="photo-mono h-56 w-full object-cover opacity-80" />
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-[22%] end-[5%] -z-10 hidden w-40 xl:block"
        style={reduced ? {} : { x: cardBX, y: cardBY }}
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 40, rotate: 10 }}
        animate={{ opacity: 1, y: 0, rotate: 6 }}
        transition={{ delay: 1.05, duration: 1, ease: EASE_OUT }}
        aria-hidden="true"
      >
        <div className="overflow-hidden rounded-2xl border border-gold/25 shadow-[var(--shadow-lift)]">
          <img src={g4} alt="" className="photo-mono h-48 w-full object-cover opacity-80" />
        </div>
      </motion.div>

      {/* ---- Content ---- */}
      <motion.div
        style={{ y: contentY, opacity: contentFade }}
        className="relative mx-auto w-full max-w-5xl px-5 pt-28 pb-40 text-center sm:px-8 lg:pb-44"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="glass-dark inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-semibold text-cream"
        >
          <span className="relative flex size-1.5 items-center justify-center">
            <span className="animate-halo absolute size-2.5 rounded-full bg-gold/60" />
            <span className="relative size-1.5 rounded-full bg-gold" />
          </span>
          {t.hero.badge}
        </motion.span>

        {/*
         * Two block lines rather than one wrapping phrase, so the break
         * is a design decision instead of a function of viewport width.
         * The stagger continues across the break.
         */}
        <h1 className="mt-7 font-display text-[clamp(2.6rem,8.5vw,6.25rem)] leading-[1.02] font-bold text-cream rtl:leading-[1.18]">
          <span className="block">
            <SplitWords segments={[{ text: t.hero.titleStart }]} delay={0.2} />
          </span>
          <RotatingWords
            phrases={t.hero.titleRotating}
            startDelay={0.2 + startWords * 0.055}
            wordClassName="text-shimmer-gold"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7, ease: EASE_OUT }}
          className="mx-auto mt-8 max-w-2xl text-pretty text-base leading-[1.8] text-cream/70 sm:text-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.92, duration: 0.6, ease: EASE_OUT }}
          className="mt-11 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic>
            <a
              href="#contact"
              className="sheen group inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-8 py-4 text-sm font-semibold text-gold-foreground shadow-[var(--shadow-gold)] transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {t.hero.primaryCta}
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </Magnetic>
          <Magnetic strength={0.14}>
            <a
              href="#about"
              className="glass-dark inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold text-cream transition-colors duration-300 hover:border-gold/40 hover:bg-gold/10"
            >
              {t.hero.secondaryCta}
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* ---- Bottom rail: what the price actually includes, on a loop ---- */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: EASE_OUT }}
        className="glass-dark absolute inset-x-0 bottom-0 border-x-0 border-b-0 py-4"
      >
        <Marquee duration={44}>
          {t.why.items.concat(t.why.items).map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6 text-xs font-semibold tracking-[0.1em] whitespace-nowrap text-cream/75 uppercase rtl:tracking-normal">
                {item.title}
              </span>
              <Sparkles className="size-3 shrink-0 text-gold/70" aria-hidden="true" />
            </span>
          ))}
        </Marquee>
      </motion.div>

      {/* ---- Scroll cue ---- */}
      <a
        href="#rhythm"
        aria-label={t.hero.scroll}
        className={cn(
          "group absolute bottom-20 start-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex",
          "text-[10px] font-semibold tracking-[0.2em] text-cream/50 uppercase transition-colors hover:text-cream rtl:tracking-normal",
        )}
      >
        {t.hero.scroll}
        <span className="relative flex h-10 w-px justify-center overflow-hidden bg-cream/20">
          <span className="animate-cue-fall absolute h-4 w-px bg-gold" />
        </span>
      </a>
    </section>
  );
}
