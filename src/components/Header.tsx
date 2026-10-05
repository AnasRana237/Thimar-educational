import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Languages, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/thimar-logo.png";
import { useI18n } from "@/lib/i18n";
import { whatsappLink } from "@/content/site";
import { EASE_OUT, SPRING_SNAP } from "@/lib/motion";
import { cn } from "@/lib/utils";

const links = ["home", "about", "programs", "why", "pricing", "gallery", "faq", "contact"] as const;

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-60 h-0.5 origin-[0%] bg-gold rtl:origin-[100%]"
      aria-hidden="true"
    />
  );
}

/* Highlights the section currently in view so the nav reports position. */
function useActiveSection() {
  const [active, setActive] = useState<string>("home");
  useEffect(() => {
    const sections = links
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return active;
}

/*
 * A detached glass pill rather than a full-width bar.
 *
 * It is dark at every scroll position, which is the point: the hero
 * behind it is dark and the rest of the page is light, so a bar that
 * inverted partway down would have to know which section it was over.
 * Staying dark keeps one set of contrast rules for the whole page.
 */
export function Header() {
  const { t, lang, toggleLang, isRTL } = useI18n();
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <ScrollProgress />
      <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-5">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border px-3 py-2.5 transition-[background-color,box-shadow,border-color] duration-500 sm:px-4",
            scrolled
              ? "border-primary-foreground/15 bg-navy-deep/90 shadow-[var(--shadow-lift)] backdrop-blur-xl"
              : "border-primary-foreground/10 bg-navy-deep/40 backdrop-blur-md",
          )}
        >
          <a href="#home" className="flex min-w-0 items-center gap-2.5">
            {/* The mark is navy-and-gold, so it needs a light chip to sit
                on — on the dark pill its navy half would vanish. */}
            <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-cream p-1.5">
              <img
                src={logo}
                alt={t.brand.name}
                width={36}
                height={36}
                className="size-8 object-contain"
              />
            </span>
            <span className="min-w-0 truncate font-display text-sm font-bold text-cream sm:text-[0.95rem]">
              {t.brand.name}
            </span>
          </a>

          <nav className="hidden items-center gap-0.5 xl:flex">
            {links.map((key) => (
              <a
                key={key}
                href={`#${key}`}
                aria-current={active === key ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                  active === key ? "text-cream" : "text-cream/60 hover:text-cream",
                )}
              >
                {/* One shared pill slides between items, so the nav tracks
                    the reader's position as a single movement. */}
                {active === key && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={reduced ? { duration: 0 } : SPRING_SNAP}
                    className="absolute inset-0 -z-10 rounded-full bg-primary-foreground/12"
                  />
                )}
                <span className="relative">{t.nav[key]}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              aria-label={t.a11y.language}
              className="hidden items-center gap-1.5 rounded-full border border-primary-foreground/15 px-3 py-2 text-xs font-bold text-cream transition-colors hover:border-gold/50 hover:bg-primary-foreground/10 sm:inline-flex"
            >
              <Languages className="size-4" aria-hidden="true" />
              {lang === "ar" ? "EN" : "AR"}
            </button>
            <a
              href={whatsappLink(`${t.brand.name}: ${t.nav.book}`)}
              target="_blank"
              rel="noopener noreferrer"
              className="sheen hidden rounded-full bg-gold px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-gold-foreground shadow-[var(--shadow-gold)] transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
            >
              {t.nav.book}
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label={t.a11y.menu}
              aria-expanded={open}
              className="inline-flex size-10 items-center justify-center rounded-full border border-primary-foreground/15 text-cream transition-colors hover:bg-primary-foreground/10 xl:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-70 xl:hidden"
          >
            <div
              className="absolute inset-0 bg-navy-deep/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            {/*
             * The drawer enters from the `end` edge, which is the side the
             * menu button sits on — so in RTL it comes from the left, and
             * the travel direction has to be signed to match.
             */}
            <motion.aside
              initial={{ x: isRTL ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? "-100%" : "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              className="absolute inset-y-0 end-0 flex w-[86%] max-w-sm flex-col border-s border-primary-foreground/10 bg-navy-deep p-6 shadow-[var(--shadow-lift)]"
            >
              <div className="bg-grain absolute inset-0 opacity-[0.06]" aria-hidden="true" />
              <div className="relative flex items-center justify-between">
                <span className="inline-flex items-center justify-center rounded-full bg-cream p-1.5">
                  <img
                    src={logo}
                    alt={t.brand.name}
                    width={36}
                    height={36}
                    className="size-8 object-contain"
                  />
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label={t.a11y.closeMenu}
                  className="inline-flex size-10 items-center justify-center rounded-full border border-primary-foreground/15 text-cream transition-colors hover:bg-primary-foreground/10"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
              <nav className="relative mt-8 flex flex-col gap-0.5">
                {links.map((key, i) => (
                  <motion.a
                    key={key}
                    href={`#${key}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: isRTL ? -14 : 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.035, duration: 0.4, ease: EASE_OUT }}
                    className={cn(
                      "rounded-xl px-4 py-3 text-base font-medium transition-colors",
                      active === key
                        ? "bg-primary-foreground/12 text-cream"
                        : "text-cream/70 hover:bg-primary-foreground/8 hover:text-cream",
                    )}
                  >
                    {t.nav[key]}
                  </motion.a>
                ))}
              </nav>
              <div className="relative mt-auto flex flex-col gap-3 border-t border-primary-foreground/15 pt-6">
                <button
                  onClick={() => {
                    toggleLang();
                    setOpen(false);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary-foreground/15 px-4 py-3 text-sm font-bold text-cream transition-colors hover:bg-primary-foreground/10"
                >
                  <Languages className="size-4" aria-hidden="true" />
                  {lang === "ar" ? "English" : "العربية"}
                </button>
                <a
                  href={whatsappLink(`${t.brand.name}: ${t.nav.book}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sheen inline-flex items-center justify-center rounded-xl bg-gold px-5 py-3 text-sm font-semibold text-gold-foreground shadow-[var(--shadow-gold)]"
                >
                  {t.nav.book}
                </a>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
