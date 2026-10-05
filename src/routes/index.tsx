import { createFileRoute } from "@tanstack/react-router";
import { I18nProvider } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Hero } from "@/components/sections/Hero";
import { DailyRhythm } from "@/components/sections/DailyRhythm";
import {
  About,
  Contact,
  CtaBand,
  Faq,
  FloatingActions,
  Footer,
  Gallery,
  How,
  PhotoBreak,
  Pricing,
  Programs,
  Stats,
  Testimonials,
  Why,
} from "@/components/sections/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ثمار التعليمية | Thimar Educational" },
      {
        name: "description",
        content:
          "Thimar Educational: personalised programs, expert tutors and small groups that help every student grow.",
      },
      { property: "og:title", content: "ثمار التعليمية | Thimar Educational" },
      {
        property: "og:description",
        content:
          "Personalised programs, expert tutors and small groups that help every student grow.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <I18nProvider>
      <Header />
      {/*
       * The page opens on a sustained dark run — hero, the numbers, then
       * the daily-schedule dial — and only breaks into light at About,
       * where the statement lands. After that, cream and white alternate
       * with navy returning for the two moments that need weight: the
       * four-step timeline and the closing call to action.
       */}
      <main>
        <Hero />
        <Stats />
        <DailyRhythm />
        <About />
        <PhotoBreak />
        <Programs />
        <Why />
        <How />
        <Pricing />
        <Testimonials />
        <Gallery />
        <Faq />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </I18nProvider>
  );
}
