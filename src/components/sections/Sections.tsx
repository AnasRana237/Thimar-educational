import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  Twitter,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useI18n } from "@/lib/i18n";
import {
  CountUp,
  Eyebrow,
  GhostButton,
  GoldButton,
  Reveal,
  Section,
  SectionHeading,
} from "@/components/primitives";
import {
  Floating,
  ImageReveal,
  Magnetic,
  Parallax,
  ScrubWords,
  Spotlight,
} from "@/components/motion";
import { DynamicIcon, TikTok } from "@/components/icons";
import { EASE_OUT, SPRING_SNAP, STAGGER, VIEWPORT } from "@/lib/motion";
import { site, whatsappLink } from "@/content/site";
import { cn } from "@/lib/utils";
import aboutImg from "@/assets/about-classroom.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import heroImg from "@/assets/hero-students.jpg";
import logo from "@/assets/thimar-logo.png";

const galleryImgs = [g1, g2, g3, g4, g5, heroImg];

/*
 * Stats continue the hero's dark run rather than interrupting it with a
 * white card. At this size the numerals are the graphic — no icons, no
 * boxes, just four facts set large enough to read as a headline.
 */
export function Stats() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 sm:py-20">
      <div className="bg-grain absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-5 sm:px-8 lg:grid-cols-4">
        {t.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="group relative px-2 text-center">
            <span
              className="pointer-events-none absolute start-1/2 top-4 -z-10 size-28 -translate-x-1/2 rounded-full bg-gold/20 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              aria-hidden="true"
            />
            <div className="font-display text-5xl font-bold text-primary-foreground sm:text-6xl lg:text-7xl">
              <CountUp value={s.value} suffix={s.suffix} />
            </div>
            <motion.span
              className="mx-auto mt-5 block h-0.5 w-8 rounded-full bg-gold"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={VIEWPORT}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: EASE_OUT }}
            />
            <div className="mt-4 text-sm text-primary-foreground/65">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function About() {
  const { t } = useI18n();
  return (
    <Section id="about" pad="lg">
      {/*
       * The page opens out of the dark with its one big editorial moment:
       * the programme described in type set large, lit word by word by the
       * reader's own scrolling. Nothing competes with it — no image, no
       * card, full measure, centred.
       */}
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <Eyebrow>{t.about.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.07}>
          <h2 className="mt-5 text-balance text-[clamp(2.1rem,5.2vw,4.25rem)] leading-[1.05] text-primary rtl:leading-[1.2]">
            {t.about.title}
          </h2>
        </Reveal>
        <ScrubWords
          text={t.about.body}
          className="mx-auto mt-9 max-w-3xl text-pretty text-lg leading-[1.75] font-medium text-foreground sm:text-xl lg:text-[1.6rem] lg:leading-[1.6]"
        />
      </div>

      <div className="mt-20 grid items-center gap-12 lg:mt-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Parallax distance={44}>
          <div className="relative">
            <div
              className="pointer-events-none absolute -bottom-5 -end-5 -z-10 h-full w-full rounded-4xl bg-cream"
              aria-hidden="true"
            />
            <ImageReveal
              src={aboutImg}
              alt={t.about.title}
              className="aspect-4/5 w-full rounded-4xl shadow-[var(--shadow-lift)]"
            />
          </div>
        </Parallax>

        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[t.about.mission, t.about.vision].map((m, i) => (
              <Reveal key={m.title} delay={0.15 + i * 0.08}>
                <Spotlight className="card-quiet h-full" radius={260} strength={16}>
                  <div className="p-5">
                    <h3 className="text-base text-primary">{m.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                  </div>
                </Spotlight>
              </Reveal>
            ))}
          </div>

          <ul className="mt-8 space-y-3.5 border-t border-border pt-8">
            {t.about.features.map((f, i) => (
              <Reveal
                as="li"
                key={f}
                delay={0.2 + i * STAGGER}
                className="flex items-start gap-3 text-sm leading-relaxed text-foreground"
              >
                {/* The tick springs in a beat after its row, so the list
                    reads as checking itself off. */}
                <motion.span
                  className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-ink"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={VIEWPORT}
                  transition={{ ...SPRING_SNAP, delay: 0.3 + i * STAGGER }}
                >
                  <Check className="size-3" strokeWidth={3} />
                </motion.span>
                {f}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/*
 * The page's one full-bleed moment.
 *
 * Everything else lives inside the same 7xl container at the same padding,
 * which is comfortable but monotonous — the eye never gets a break from
 * the measure. This section breaks the container entirely: edge-to-edge
 * photograph, parallaxed against the scroll, with three short lines set
 * at display size on top. It is deliberately the only place that does
 * this, which is what makes it land.
 */
export function PhotoBreak() {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[32rem] items-center overflow-hidden bg-navy-deep py-28 lg:min-h-[38rem]"
    >
      {/* Oversized so the parallax travel never exposes an edge. framer
          writes `transform` inline, so the scale has to live there too. */}
      <motion.img
        src={g5}
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={reduced ? { scale: 1.25 } : { y, scale: 1.25 }}
        className="photo-mono absolute inset-0 -z-10 size-full object-cover opacity-40"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-deep via-navy-deep/70 to-navy-deep"
        aria-hidden="true"
      />
      <div className="vignette-navy absolute inset-0 -z-10" aria-hidden="true" />
      <div className="bg-grain absolute inset-0 -z-10 opacity-[0.07]" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-8">
        {t.statement.lines.map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.12em] [margin-block-end:-0.12em]">
            <motion.span
              className={cn(
                "block font-display text-[clamp(1.8rem,5.5vw,4.25rem)] leading-[1.12] font-bold",
                // The last line is the payoff, so it carries the gold.
                i === t.statement.lines.length - 1 ? "text-gold" : "text-cream",
              )}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: "105%" }}
              whileInView={{ opacity: 1, y: "0%" }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 0.85, delay: i * 0.13, ease: EASE_OUT }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </div>
    </section>
  );
}

/*
 * An editorial index rather than a row of cards.
 *
 * Four equal tiles give four items equal weight and no reading order. Set
 * as full-width rows with a large index numeral and a headline at display
 * size, the same four items gain hierarchy, scan top-to-bottom, and stop
 * looking like every other pricing-page feature grid. The cream wipe on
 * hover is why this section sits on white and Why sits on cream.
 */
export function Programs() {
  const { t } = useI18n();
  return (
    <Section id="programs" pad="lg">
      <SectionHeading
        eyebrow={t.programs.eyebrow}
        title={t.programs.title}
        subtitle={t.programs.subtitle}
        size="xl"
        align="start"
      />
      <ul className="mt-14 border-t border-border lg:mt-16">
        {t.programs.items.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 0.06} className="border-b border-border">
            <a
              href="#contact"
              className="group relative isolate flex flex-col gap-4 overflow-hidden py-7 lg:grid lg:grid-cols-[3.5rem_1.1fr_1.4fr_auto] lg:items-center lg:gap-10 lg:py-9"
            >
              {/* Warm wipe that fills the row from the reading edge. */}
              <span
                className="absolute inset-x-[-1.5rem] inset-y-0 -z-10 origin-left scale-x-0 rounded-xl bg-cream transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 rtl:origin-right"
                aria-hidden="true"
              />

              <span className="flex items-center gap-4 lg:block">
                <span className="font-display text-sm font-bold text-gold-ink tabular-nums">
                  0{i + 1}
                </span>
                <span className="inline-flex size-10 items-center justify-center rounded-lg bg-secondary text-primary transition-colors duration-300 group-hover:bg-gold group-hover:text-gold-foreground lg:hidden">
                  <DynamicIcon name={p.icon} className="size-5" />
                </span>
              </span>

              <h3 className="text-[clamp(1.35rem,2.4vw,2rem)] leading-tight text-primary transition-colors duration-300 group-hover:text-gold-ink">
                {p.title}
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>

              <span className="flex items-center gap-2 text-xs font-medium">
                <span className="rounded-md bg-gold/15 px-2.5 py-1 whitespace-nowrap text-gold-ink">
                  {p.age}
                </span>
                <span className="rounded-md bg-secondary px-2.5 py-1 whitespace-nowrap text-primary">
                  {p.duration}
                </span>
                <ArrowRight
                  className="ms-1 size-4 shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </a>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

/*
 * A bento, not a 3×2. Six identical tiles state six facts at one volume;
 * varying the spans lets the grid carry emphasis, and dropping a photo
 * tile and a price tile into the same grid means the section closes on
 * the number the reader is actually weighing.
 *
 * The spans are authored so each row sums to exactly four columns:
 *   2+1+1 · 2+1+1 · 2+2
 */
const WHY_SPAN = ["lg:col-span-2", "", "", "", "", "lg:col-span-2"];

export function Why() {
  const { t } = useI18n();
  const items = t.why.items;

  const tile = (i: number) => {
    const w = items[i];
    if (!w) return null;
    return (
      <Reveal key={w.title} delay={i * 0.05} className={cn("h-full", WHY_SPAN[i])}>
        <Spotlight className="card-quiet h-full" radius={300} strength={16}>
          <div className="group flex h-full flex-col p-7">
            <span className="inline-flex size-10 items-center justify-center rounded-lg bg-gold/15 text-gold-ink transition-colors duration-300 group-hover:bg-gold group-hover:text-gold-foreground">
              <DynamicIcon
                name={w.icon}
                className="size-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
              />
            </span>
            <h3 className="mt-5 text-lg text-primary">{w.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
          </div>
        </Spotlight>
      </Reveal>
    );
  };

  return (
    <Section id="why" tone="cream" pad="lg">
      <SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} align="start" size="xl" />

      <div className="mt-14 grid auto-rows-[minmax(12rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tile(0)}
        {tile(1)}
        {tile(2)}

        {/* Photo tile — texture in the grid, and a break from six boxes of type. */}
        <Reveal delay={0.1} className="sm:col-span-2">
          <div className="group relative h-full min-h-48 overflow-hidden rounded-2xl bg-navy-deep">
            <img
              src={g5}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="photo-mono size-full object-cover opacity-45 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="font-display text-lg font-bold text-cream">{t.brand.tagline}</span>
            </div>
          </div>
        </Reveal>

        {tile(3)}
        {tile(4)}
        {tile(5)}

        {/* The section closes on the price, not on another feature. */}
        <Reveal delay={0.15} className="sm:col-span-2">
          <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-navy p-7">
            <div className="bg-grain absolute inset-0 opacity-[0.07]" aria-hidden="true" />
            <div className="relative">
              <span className="text-xs font-semibold tracking-[0.16em] text-gold uppercase rtl:tracking-normal">
                {t.pricing.eyebrow}
              </span>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold text-cream sm:text-5xl">
                  {t.pricing.plans[0]?.price}
                </span>
                <span className="text-sm text-cream/60">{t.pricing.perMonth}</span>
              </p>
            </div>
            <a
              href="#pricing"
              className="group relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold"
            >
              {t.pricing.cta}
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/*
 * The four steps as a timeline. Each step owns the rail segment below it and
 * fills that segment in gold as it scrolls into view, so the line appears to
 * draw itself down the page. Doing it per-segment rather than with one
 * scroll-linked bar keeps the geometry inside the grid, which means it
 * mirrors correctly in RTL for free.
 */
export function How() {
  const { t } = useI18n();
  const steps = t.how.steps;

  return (
    <Section id="how" tone="navy" pad="lg">
      <div className="bg-dots-light mask-fade-y absolute inset-0 opacity-30" aria-hidden="true" />
      <SectionHeading eyebrow={t.how.eyebrow} title={t.how.title} tone="light" size="xl" />

      <ol className="relative mx-auto mt-16 max-w-5xl">
        {steps.map((s, i) => {
          const isLast = i === steps.length - 1;
          const onEnd = i % 2 === 1;
          return (
            <li
              key={s.title}
              className="grid grid-cols-[2.75rem_1fr] gap-x-4 sm:gap-x-6 lg:grid-cols-[1fr_2.75rem_1fr] lg:gap-x-10"
            >
              {/* Rail column */}
              <div className="relative flex justify-center lg:col-start-2 lg:row-start-1">
                {!isLast && (
                  <>
                    <span
                      className="absolute top-11 bottom-0 w-px bg-primary-foreground/15"
                      aria-hidden="true"
                    />
                    <motion.span
                      className="absolute top-11 bottom-0 w-px origin-top bg-gold"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "-25% 0px -25% 0px" }}
                      transition={{ duration: 0.9, ease: "linear" }}
                      aria-hidden="true"
                    />
                  </>
                )}
                <motion.span
                  className="relative mt-1 flex size-9 items-center justify-center rounded-full border border-gold/40 bg-navy-deep font-display text-xs font-bold text-gold"
                  initial={{ scale: 0.3, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={VIEWPORT}
                  transition={{ ...SPRING_SNAP, delay: 0.05 }}
                >
                  0{i + 1}
                </motion.span>
              </div>

              {/* Content column — alternates sides from the large breakpoint up */}
              <div
                className={cn(
                  "pb-12 lg:row-start-1 lg:pb-16",
                  onEnd ? "lg:col-start-3" : "lg:col-start-1",
                )}
              >
                <Reveal>
                  <div className="card-inset w-full p-6 sm:p-7">
                    <h3 className="text-lg text-primary-foreground">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

export function Pricing() {
  const { t } = useI18n();
  return (
    <Section id="pricing" tone="cream" pad="lg">
      <SectionHeading
        eyebrow={t.pricing.eyebrow}
        title={t.pricing.title}
        subtitle={t.pricing.subtitle}
        size="xl"
      />
      <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
        {t.pricing.plans.map((p, i) => {
          const pop = i === 1;
          return (
            <Reveal key={p.name} delay={i * 0.09} className="h-full">
              <Spotlight
                className={cn(
                  "h-full rounded-3xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5",
                  // The travelling gold ring is used exactly once on the page.
                  pop && "conic-ring shadow-[var(--shadow-lift)] lg:-my-4",
                )}
                radius={360}
                strength={pop ? 16 : 12}
                tint={pop ? "var(--gold)" : "var(--primary)"}
              >
                <div
                  className={cn(
                    "relative flex h-full flex-col rounded-3xl p-8",
                    pop
                      ? "bg-gradient-navy text-primary-foreground lg:py-12"
                      : "border border-border bg-card shadow-[var(--shadow-xs)]",
                  )}
                >
                  {pop && (
                    <span className="absolute inset-x-0 -top-3 mx-auto w-fit rounded-md bg-gold px-3 py-1 text-xs font-bold text-gold-foreground shadow-[var(--shadow-gold)]">
                      {t.pricing.popular}
                    </span>
                  )}
                  <h3 className={cn("text-xl", pop ? "text-primary-foreground" : "text-primary")}>
                    {p.name}
                  </h3>
                  <p
                    className={cn(
                      "mt-1.5 text-sm leading-relaxed",
                      pop ? "text-primary-foreground/70" : "text-muted-foreground",
                    )}
                  >
                    {p.description}
                  </p>
                  <div
                    className={cn(
                      "mt-6 flex items-baseline gap-1.5 border-t pt-6",
                      pop ? "border-primary-foreground/15" : "border-border",
                    )}
                  >
                    <span
                      className={cn(
                        "font-display text-4xl font-bold",
                        pop ? "text-gold" : "text-primary",
                      )}
                    >
                      {p.price}
                    </span>
                    <span
                      className={cn(
                        "text-sm",
                        pop ? "text-primary-foreground/60" : "text-muted-foreground",
                      )}
                    >
                      {t.pricing.perMonth}
                    </span>
                  </div>
                  <ul className="mt-6 flex-1 space-y-3 text-sm">
                    {p.features.map((f, k) => (
                      <Reveal
                        as="li"
                        key={f}
                        delay={0.1 + k * 0.05}
                        y={10}
                        className="flex items-start gap-2.5 leading-relaxed"
                      >
                        <Check
                          className={cn(
                            "mt-0.5 size-4 shrink-0",
                            pop ? "text-gold" : "text-gold-ink",
                          )}
                          strokeWidth={3}
                        />
                        {f}
                      </Reveal>
                    ))}
                  </ul>
                  <GoldButton href="#contact" className="sheen mt-8 w-full">
                    {t.pricing.cta}
                  </GoldButton>
                </div>
              </Spotlight>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

export function Testimonials() {
  const { t, isRTL } = useI18n();
  const reduced = useReducedMotion();
  const items = t.testimonials.items;
  const n = items.length;
  const DWELL = 6500;

  // `dir` carries which way the next card should travel, so manual
  // navigation animates toward the side the reader asked for.
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (step: number) => {
      setState(([i]) => [(i + step + n) % n, step]);
    },
    [n],
  );

  // Auto-advance restarts on every index change, so a manual tap always
  // gets a full dwell before the next slide. Reduced motion opts out of
  // auto-advance entirely rather than just animating less.
  useEffect(() => {
    if (reduced || paused) return;
    const id = setTimeout(() => go(1), DWELL);
    return () => clearTimeout(id);
  }, [index, paused, reduced, go]);

  const item = items[index] ?? items[0]!;
  const Prev = isRTL ? ChevronRight : ChevronLeft;
  const Next = isRTL ? ChevronLeft : ChevronRight;
  const flip = isRTL ? -1 : 1;

  return (
    <Section id="testimonials">
      <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />
      <div
        className="relative mx-auto mt-12 max-w-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <div className="relative min-h-60 overflow-hidden rounded-3xl border border-border bg-cream px-8 py-10 text-center sm:px-14 sm:py-12">
          <img
            src={logo}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -end-6 -bottom-6 size-40 opacity-[0.05]"
          />
          <Quote className="relative mx-auto size-8 text-gold" aria-hidden="true" />
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.blockquote
              key={index}
              custom={dir}
              drag={reduced ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.16}
              onDragEnd={(_, info) => {
                if (info.offset.x * flip < -60) go(1);
                else if (info.offset.x * flip > 60) go(-1);
              }}
              initial={{ opacity: 0, x: dir * 44 * flip }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -44 * flip }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className={cn("relative", !reduced && "cursor-grab active:cursor-grabbing")}
            >
              <p className="mt-6 text-lg leading-[1.8] text-foreground sm:text-xl">{item.quote}</p>
              <footer className="mt-7">
                <p className="font-semibold text-primary">{item.name}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{item.role}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            aria-label={t.testimonials.prev}
            onClick={() => go(-1)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-primary transition-colors hover:border-primary/40 hover:bg-secondary"
          >
            <Prev className="size-5" aria-hidden="true" />
          </button>
          <div className="flex items-center gap-2">
            {items.map((_, k) => (
              <button
                key={k}
                aria-label={`${k + 1}`}
                aria-current={k === index}
                onClick={() => go(k - index || 0)}
                className={cn(
                  "relative h-1.5 overflow-hidden rounded-full transition-all duration-300",
                  k === index ? "w-7 bg-primary/15" : "w-1.5 bg-primary/20 hover:bg-primary/40",
                )}
              >
                {/* The active pip doubles as the dwell timer. */}
                {k === index && !reduced && (
                  <motion.span
                    key={`${index}-${paused}`}
                    className="absolute inset-y-0 start-0 rounded-full bg-gold-ink"
                    initial={{ width: "0%" }}
                    animate={{ width: paused ? "0%" : "100%" }}
                    transition={{ duration: paused ? 0 : DWELL / 1000, ease: "linear" }}
                  />
                )}
                {k === index && reduced && (
                  <span className="absolute inset-0 rounded-full bg-gold-ink" />
                )}
              </button>
            ))}
          </div>
          <button
            aria-label={t.testimonials.next}
            onClick={() => go(1)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-primary transition-colors hover:border-primary/40 hover:bg-secondary"
          >
            <Next className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </Section>
  );
}

export function Gallery() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const n = galleryImgs.length;
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  const step = useCallback(
    (d: number) => {
      setDir(d);
      setOpen((v) => (v === null ? v : (v + d + n) % n));
    },
    [n],
  );

  // Lightbox plumbing: lock the page behind the overlay, move focus in,
  // keep Tab inside it, and hand focus back to the thumbnail on close.
  useEffect(() => {
    if (open === null) return;
    restoreTo.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusables?.length) return;
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      restoreTo.current?.focus();
    };
  }, [open, step]);

  return (
    <Section id="gallery" tone="cream" pad="lg">
      <SectionHeading
        eyebrow={t.gallery.eyebrow}
        title={t.gallery.title}
        subtitle={t.gallery.subtitle}
      />
      {/* Bento grid: the lead image carries weight instead of six equal tiles. */}
      <div className="mt-14 grid auto-rows-[11rem] grid-cols-2 gap-4 sm:auto-rows-[13rem] lg:grid-cols-4">
        {galleryImgs.map((src, k) => (
          <Reveal key={k} delay={k * 0.05} className={cn(k === 0 && "col-span-2 row-span-2")}>
            <button
              onClick={() => {
                setDir(1);
                setOpen(k);
              }}
              aria-haspopup="dialog"
              className="group relative block size-full overflow-hidden rounded-2xl bg-muted transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-[0.98]"
            >
              {/* Art-directed at rest, alive on hover: the tiles sit as a
                  monochrome set so the grid reads as one composition, and
                  the photograph returns to full colour under the cursor. */}
              <img
                src={src}
                alt={t.gallery.captions[k]}
                loading="lazy"
                className="size-full object-cover grayscale transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:grayscale-0"
              />
              <span className="absolute inset-0 bg-navy-deep/40 transition-opacity duration-500 group-hover:opacity-0" />
              <span className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/10 to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
              <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-start text-sm font-medium text-primary-foreground opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
                {t.gallery.captions[k]}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            key="lightbox"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={t.gallery.title}
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-70 flex items-center justify-center bg-navy-deep/92 p-4 backdrop-blur-md outline-none"
            onClick={() => setOpen(null)}
          >
            <button
              aria-label={t.gallery.close}
              onClick={() => setOpen(null)}
              className="absolute top-4 end-4 z-10 inline-flex size-11 items-center justify-center rounded-xl bg-background text-primary transition-transform hover:scale-105"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            <button
              aria-label={t.gallery.prev}
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute start-4 z-10 inline-flex size-11 items-center justify-center rounded-xl bg-background text-primary transition-transform hover:scale-105"
            >
              <ArrowLeft className="size-5 rtl:rotate-180" aria-hidden="true" />
            </button>

            <figure className="relative flex max-h-full flex-col items-center gap-4">
              {/*
               * Keyed, but deliberately NOT wrapped in its own
               * AnimatePresence. A nested presence inside a subtree that is
               * itself exiting can leave the parent's exit uncompleted, which
               * strands this fixed overlay in the DOM at opacity 0 — an
               * invisible sheet over the whole page that eats every click.
               * Remounting on key change gives the same enter animation
               * without that risk.
               */}
              <motion.img
                key={open}
                src={galleryImgs[open]}
                alt={t.gallery.captions[open]}
                initial={{ opacity: 0, scale: 0.94, x: dir * 36 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.32, ease: EASE_OUT }}
                className="max-h-[78vh] max-w-full rounded-2xl shadow-[var(--shadow-lift)]"
                onClick={(e) => e.stopPropagation()}
              />
              <figcaption className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <span className="font-display text-xs font-bold text-gold" dir="ltr">
                  {open + 1} / {n}
                </span>
                {t.gallery.captions[open]}
              </figcaption>
            </figure>

            <button
              aria-label={t.gallery.next}
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute end-4 z-10 inline-flex size-11 items-center justify-center rounded-xl bg-background text-primary transition-transform hover:scale-105"
            >
              <ArrowRight className="size-5 rtl:rotate-180" aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

export function Faq() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} align="start" />
          <Reveal delay={0.15}>
            <GhostButton href="#contact" className="mt-8">
              {t.faq.cta}
            </GhostButton>
          </Reveal>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {t.faq.items.map((f, k) => {
            const isOpen = open === k;
            return (
              <Reveal key={f.q} delay={k * 0.04}>
                <div className="relative">
                  {/* A gold bar marks the open row from the start edge. */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.span
                        key="bar"
                        className="absolute inset-y-0 -start-4 w-0.5 rounded-full bg-gold"
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 1 }}
                        exit={{ scaleY: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE_OUT }}
                        aria-hidden="true"
                      />
                    )}
                  </AnimatePresence>
                  <h3>
                    <button
                      onClick={() => setOpen(isOpen ? null : k)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 py-5 text-start font-semibold text-primary transition-colors hover:text-gold-ink"
                    >
                      {f.q}
                      <ChevronDown
                        className={cn(
                          "size-5 shrink-0 text-gold-ink transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                          isOpen && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pe-10 text-sm leading-[1.8] text-muted-foreground">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

export function CtaBand() {
  const { t } = useI18n();
  return (
    <Section id="cta" tone="navy" pad="lg">
      <div className="bg-grain absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div
        className="animate-drift-a pointer-events-none absolute -top-40 start-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_26%,transparent),transparent_68%)] blur-3xl"
        aria-hidden="true"
      />
      <Spotlight className="relative mx-auto max-w-2xl text-center" radius={480} strength={14}>
        <Reveal>
          <Eyebrow tone="light" className="justify-center">
            {t.cta.eyebrow}
          </Eyebrow>
        </Reveal>
        <Reveal delay={0.07}>
          <h2 className="mt-4 text-[2rem] leading-[1.15] text-primary-foreground sm:text-[2.6rem] lg:text-[3.25rem]">
            {t.cta.title}
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-4 text-pretty leading-relaxed text-primary-foreground/70">
            {t.cta.subtitle}
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-9 flex flex-wrap justify-center gap-3">
          <Magnetic>
            <GoldButton
              href={whatsappLink(t.cta.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="sheen"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {t.cta.primary}
            </GoldButton>
          </Magnetic>
          <Magnetic strength={0.14}>
            <GhostButton
              href={`tel:+${site.whatsappNumber}`}
              className="border-primary-foreground/25 bg-transparent text-primary-foreground hover:border-primary-foreground/50 hover:bg-primary-foreground/10"
            >
              {t.cta.secondary}
            </GhostButton>
          </Magnetic>
        </Reveal>
      </Spotlight>
    </Section>
  );
}

export function Contact() {
  const { t } = useI18n();
  const f = t.contact.form;
  const [errors, setErrors] = useState<
    Partial<Record<"name" | "phone" | "email" | "message", string>>
  >({});
  const [ok, setOk] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const v = (k: string) => String(d.get(k) ?? "").trim();
    const errs: Partial<Record<"name" | "phone" | "email" | "message", string>> = {};
    if (v("name").length < 2 || v("name").length > 100) errs.name = f.errors.name;
    if (!/^\+?[0-9\s-]{7,20}$/.test(v("phone"))) errs.phone = f.errors.phone;
    if (v("email") && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) errs.email = f.errors.email;
    if (v("message").length < 3 || v("message").length > 1000) errs.message = f.errors.message;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    const text = `${f.name}: ${v("name")}\n${f.phone}: ${v("phone")}\n${v("email") ? `${f.email}: ${v("email")}\n` : ""}${f.program}: ${v("program")}\n${f.message}: ${v("message")}`;
    setOk(true);
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  };

  const input =
    "mt-2 w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground transition-[border-color,box-shadow] duration-300 outline-none placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-4 focus:ring-gold/20";
  const info = [
    {
      icon: MessageCircle,
      label: t.contact.info.whatsapp,
      value: site.whatsappDisplay,
      href: whatsappLink(""),
    },
    { icon: Mail, label: t.contact.info.email, value: site.email, href: `mailto:${site.email}` },
    {
      icon: Phone,
      label: t.contact.info.phone,
      value: site.phoneDisplay,
      href: `tel:+${site.whatsappNumber}`,
    },
    { icon: MapPin, label: t.contact.info.address, value: t.contact.info.addressValue },
    { icon: Clock, label: t.contact.info.hours, value: t.contact.info.hoursValue },
  ];
  const Err = ({ k }: { k: "name" | "phone" | "email" | "message" }) =>
    errors[k] ? (
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: EASE_OUT }}
        className="mt-1.5 text-xs font-medium text-destructive"
      >
        {errors[k]}
      </motion.p>
    ) : null;

  return (
    <Section id="contact" tone="cream" pad="lg">
      <SectionHeading
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        subtitle={t.contact.subtitle}
        size="xl"
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <Reveal>
          <form
            onSubmit={onSubmit}
            noValidate
            className="grid gap-5 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:grid-cols-2 sm:p-9"
          >
            <label className="text-sm font-medium text-primary">
              {f.name}
              <input
                name="name"
                maxLength={100}
                placeholder={f.namePlaceholder}
                className={input}
              />
              <Err k="name" />
            </label>
            <label className="text-sm font-medium text-primary">
              {f.phone}
              <input
                name="phone"
                type="tel"
                dir="ltr"
                maxLength={20}
                placeholder={f.phonePlaceholder}
                className={input}
              />
              <Err k="phone" />
            </label>
            <label className="text-sm font-medium text-primary">
              {f.email}
              <input
                name="email"
                type="email"
                dir="ltr"
                maxLength={255}
                placeholder={f.emailPlaceholder}
                className={input}
              />
              <Err k="email" />
            </label>
            <label className="text-sm font-medium text-primary">
              {f.program}
              <select name="program" className={input} defaultValue="">
                <option value="" disabled>
                  {f.programPlaceholder}
                </option>
                {t.programs.items.map((p) => (
                  <option key={p.title}>{p.title}</option>
                ))}
              </select>
            </label>
            <label className="text-sm font-medium text-primary sm:col-span-2">
              {f.message}
              <textarea
                name="message"
                rows={4}
                maxLength={1000}
                placeholder={f.messagePlaceholder}
                className={cn(input, "resize-y")}
              />
              <Err k="message" />
            </label>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="sheen inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground shadow-[var(--shadow-gold)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-soft hover:shadow-[var(--shadow-lift)] active:scale-[0.98]"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                {f.submit}
              </button>
              {ok && (
                <motion.p
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="mt-3 text-center text-sm font-medium text-primary"
                >
                  {f.success}
                </motion.p>
              )}
            </div>
          </form>
        </Reveal>

        <div className="grid content-start gap-3">
          {info.map(({ icon: Icon, label, value, href }, i) => {
            const body = (
              <>
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary transition-colors duration-300 group-hover:bg-gold group-hover:text-gold-foreground">
                  <Icon className="size-4.5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-muted-foreground">{label}</span>
                  <span
                    className="block truncate font-semibold text-primary"
                    dir={href ? "ltr" : undefined}
                  >
                    {value}
                  </span>
                </span>
              </>
            );
            return (
              <Reveal key={label} delay={0.1 + i * 0.05}>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="card-quiet group flex items-center gap-4 p-4"
                  >
                    {body}
                  </a>
                ) : (
                  <div className="card-quiet group flex items-center gap-4 p-4">{body}</div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/*
 * Social links are only rendered once a real profile URL is configured in
 * content/site.ts — the defaults are bare domains, and shipping a footer
 * icon that lands on instagram.com's home page is worse than no icon.
 */
const socialLinks = [
  { label: "Instagram", href: site.social.instagram, Icon: Instagram },
  { label: "X", href: site.social.twitter, Icon: Twitter },
  { label: "TikTok", href: site.social.tiktok, Icon: TikTok },
].filter(({ href }) => {
  try {
    return new URL(href).pathname.replace(/\/+$/, "").length > 0;
  } catch {
    return false;
  }
});

export function Footer() {
  const { t } = useI18n();
  const links = ["about", "programs", "pricing", "faq", "contact"] as const;
  return (
    <footer className="relative overflow-hidden bg-gradient-navy text-primary-foreground">
      <div className="bg-grain absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      {/* A gold hairline that fades out at both ends, capping the page. */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt={t.brand.name}
              width={44}
              height={44}
              className="size-11 rounded-lg bg-background object-contain p-1.5"
            />
            <span className="font-display text-lg font-bold">{t.brand.name}</span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-primary-foreground/70">
            {t.footer.about}
          </p>
          {socialLinks.length > 0 && (
            <div className="mt-6 flex items-center gap-2.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-10 items-center justify-center rounded-lg border border-primary-foreground/20 text-primary-foreground/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-gold-foreground"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h3 className="text-xs font-semibold tracking-[0.16em] text-gold uppercase rtl:tracking-normal">
            {t.footer.quickLinks}
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {links.map((l) => (
              <li key={l}>
                <a
                  href={`#${l}`}
                  className="inline-block text-primary-foreground/70 transition-all duration-300 hover:text-gold hover:ps-1"
                >
                  {t.nav[l]}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-semibold tracking-[0.16em] text-gold uppercase rtl:tracking-normal">
            {t.footer.contact}
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-primary-foreground/70">
            <li dir="ltr" className="text-start">
              <a href={`tel:+${site.whatsappNumber}`} className="transition-colors hover:text-gold">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold">
                {site.email}
              </a>
            </li>
            <li>{t.contact.info.addressValue}</li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-6 text-xs text-primary-foreground/55 sm:px-8">
          <span>
            © {new Date().getFullYear()} {t.brand.name}. {t.footer.rights}
          </span>
          <a
            href="#home"
            aria-label={t.footer.backToTop}
            className="group inline-flex size-9 items-center justify-center rounded-lg border border-primary-foreground/20 transition-colors hover:border-gold hover:bg-gold hover:text-gold-foreground"
          >
            <ArrowUp
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

/*
 * Floating actions. WhatsApp is always present; "back to top" joins it only
 * once the reader is deep enough in the page for it to be useful.
 */
export function FloatingActions() {
  const { t } = useI18n();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 end-5 z-40 flex flex-col items-center gap-3">
      <AnimatePresence>
        {showTop && (
          <motion.a
            key="to-top"
            href="#home"
            aria-label={t.footer.backToTop}
            initial={{ opacity: 0, scale: 0.7, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 12 }}
            transition={SPRING_SNAP}
            className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-background/90 text-primary shadow-[var(--shadow-soft)] backdrop-blur-md transition-colors hover:border-primary/40 hover:bg-secondary"
          >
            <ArrowUp className="size-5" aria-hidden="true" />
          </motion.a>
        )}
      </AnimatePresence>

      <Floating amplitude={4} duration={5}>
        <a
          href={whatsappLink("")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.a11y.whatsappFloat}
          className="group relative inline-flex size-14 items-center justify-center rounded-2xl bg-gold text-gold-foreground shadow-[var(--shadow-gold)] transition-transform duration-300 hover:scale-105"
        >
          {/* A slow pulse so the action reads as live without nagging. */}
          <span
            className="animate-halo absolute inset-0 rounded-2xl bg-gold/40"
            aria-hidden="true"
          />
          <MessageCircle className="relative size-6" aria-hidden="true" />
        </a>
      </Floating>
    </div>
  );
}
