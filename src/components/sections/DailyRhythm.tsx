import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { CountUp, Eyebrow, Reveal, Section } from "@/components/primitives";
import { EASE_OUT, SPRING_SNAP, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * The programme's single most persuasive fact is its daily schedule:
 * six classes, four of them one-to-one. A row of cards states that; a
 * dial *shows* it. Each node is one class, colour-coded by kind, so the
 * 4 + 2 split is legible before a word is read.
 *
 * Geometry is computed rather than hand-placed so the ring stays exact,
 * and the whole figure is marked aria-hidden with the same information
 * given as text in the legend beside it — an SVG diagram is not
 * something a screen reader should be asked to narrate.
 */
const BOX = 400;
const CENTRE = BOX / 2;
const RADIUS = 150;
const TOTAL = 6;
const SOLO = 4;

const nodes = Array.from({ length: TOTAL }, (_, i) => {
  // Start at twelve o'clock and run clockwise.
  const angle = ((-90 + i * (360 / TOTAL)) * Math.PI) / 180;
  return {
    i,
    x: CENTRE + RADIUS * Math.cos(angle),
    y: CENTRE + RADIUS * Math.sin(angle),
    solo: i < SOLO,
  };
});

export function DailyRhythm() {
  const { t } = useI18n();
  const reduced = useReducedMotion();

  return (
    <Section id="rhythm" tone="navy" pad="lg">
      <div className="bg-grid-gold mask-fade-y absolute inset-0 opacity-25" aria-hidden="true" />
      <div className="bg-grain absolute inset-0 opacity-[0.06]" aria-hidden="true" />

      <div className="relative grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        {/* ---------- Copy ---------- */}
        <div>
          <Reveal>
            <Eyebrow tone="light">{t.rhythm.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.07}>
            <h2 className="mt-4 text-balance text-[2rem] leading-[1.12] text-primary-foreground sm:text-[2.6rem] lg:text-[3.1rem]">
              {t.rhythm.title}
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-xl text-pretty leading-[1.85] text-primary-foreground/70">
              {t.rhythm.subtitle}
            </p>
          </Reveal>

          {/* Legend — the dial's key, and its text equivalent. */}
          <div className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
            {[
              { label: t.rhythm.oneToOne, count: SOLO, solo: true },
              { label: t.rhythm.group, count: TOTAL - SOLO, solo: false },
            ].map((row, i) => (
              <Reveal key={row.label} delay={0.2 + i * 0.08}>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "size-3 shrink-0 rounded-full",
                      row.solo
                        ? "bg-gold shadow-[0_0_14px_color-mix(in_oklab,var(--gold)_75%,transparent)]"
                        : "border-2 border-primary-foreground/50 bg-transparent",
                    )}
                    aria-hidden="true"
                  />
                  <span className="font-display text-2xl font-bold text-primary-foreground">
                    {row.count}
                  </span>
                  <span className="text-sm text-primary-foreground/70">{row.label}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.34}>
            <p className="mt-8 border-t border-primary-foreground/15 pt-6 text-sm leading-relaxed text-primary-foreground/60">
              {t.rhythm.note}
            </p>
          </Reveal>
        </div>

        {/* ---------- Dial ---------- */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto w-full max-w-md">
            {/* Gold bloom behind the figure, so it reads as lit. */}
            <div
              className="pointer-events-none absolute inset-[18%] rounded-full bg-gold/15 blur-3xl"
              aria-hidden="true"
            />

            <svg viewBox={`0 0 ${BOX} ${BOX}`} className="relative w-full" aria-hidden="true">
              {/* Spokes */}
              {nodes.map((n) => (
                <motion.line
                  key={`spoke-${n.i}`}
                  x1={CENTRE}
                  y1={CENTRE}
                  x2={n.x}
                  y2={n.y}
                  stroke="currentColor"
                  strokeWidth={1}
                  className="text-primary-foreground/12"
                  initial={reduced ? {} : { pathLength: 0 }}
                  whileInView={reduced ? {} : { pathLength: 1 }}
                  viewport={VIEWPORT}
                  transition={{ duration: 0.7, delay: 0.5 + n.i * 0.07, ease: EASE_OUT }}
                />
              ))}

              {/* The track the nodes sit on */}
              <circle
                cx={CENTRE}
                cy={CENTRE}
                r={RADIUS}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="text-primary-foreground/15"
              />

              {/* Gold progress ring, drawing itself on arrival */}
              <motion.circle
                cx={CENTRE}
                cy={CENTRE}
                r={RADIUS}
                fill="none"
                stroke="var(--gold)"
                strokeWidth={2.5}
                strokeLinecap="round"
                /* Rotated so the stroke begins at twelve o'clock. */
                transform={`rotate(-90 ${CENTRE} ${CENTRE})`}
                initial={reduced ? { pathLength: SOLO / TOTAL } : { pathLength: 0 }}
                whileInView={{ pathLength: SOLO / TOTAL }}
                viewport={VIEWPORT}
                transition={{ duration: 1.5, ease: EASE_OUT, delay: 0.3 }}
              />

              {/* A short arc that sweeps the dial continuously. Decorative
                  only — it carries no data. */}
              <g
                className="animate-spin-slow"
                style={{ transformOrigin: `${CENTRE}px ${CENTRE}px` }}
              >
                <circle
                  cx={CENTRE}
                  cy={CENTRE}
                  r={RADIUS + 16}
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth={1}
                  strokeLinecap="round"
                  strokeDasharray="60 880"
                  opacity={0.55}
                />
              </g>
              <g
                className="animate-spin-slow-reverse"
                style={{ transformOrigin: `${CENTRE}px ${CENTRE}px` }}
              >
                <circle
                  cx={CENTRE}
                  cy={CENTRE}
                  r={RADIUS + 30}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeDasharray="22 940"
                  className="text-primary-foreground/35"
                />
              </g>

              {/* Class nodes */}
              {nodes.map((n) => (
                <motion.g
                  key={`node-${n.i}`}
                  initial={reduced ? {} : { scale: 0, opacity: 0 }}
                  whileInView={reduced ? {} : { scale: 1, opacity: 1 }}
                  viewport={VIEWPORT}
                  transition={{ ...SPRING_SNAP, delay: 0.75 + n.i * 0.09 }}
                  style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                >
                  {n.solo && <circle cx={n.x} cy={n.y} r={26} fill="var(--gold)" opacity={0.18} />}
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={18}
                    fill={n.solo ? "var(--gold)" : "var(--navy-deep)"}
                    stroke={n.solo ? "var(--gold)" : "currentColor"}
                    strokeWidth={2}
                    className={n.solo ? "" : "text-primary-foreground/50"}
                  />
                  <text
                    x={n.x}
                    y={n.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={15}
                    fontWeight={700}
                    fill={n.solo ? "var(--navy-deep)" : "var(--cream)"}
                  >
                    {n.i + 1}
                  </text>
                </motion.g>
              ))}
            </svg>

            {/* Centre read-out, in HTML so the type inherits the page's
                fonts and shaping — including Arabic. */}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-6xl font-bold text-primary-foreground sm:text-7xl">
                <CountUp value={TOTAL} />
              </span>
              <span className="mt-1 text-xs font-semibold tracking-[0.16em] text-gold uppercase rtl:tracking-normal">
                {t.rhythm.centerLabel}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
