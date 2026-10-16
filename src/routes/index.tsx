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
  Place,
  Pricing,
  Programs,
  Stats,
  Testimonials,
  Why,
} from "@/components/sections/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Study English in the Philippines | Thimar Educational · Clark" },
      {
        name: "description",
        content:
          "Thimar Educational is a full-immersion English program in Clark, Philippines, beside Angeles City, with campus life, meals, a gym, a pool, and daily classes.",
      },
      { property: "og:title", content: "Study English in the Philippines | Thimar · Clark" },
      {
        property: "og:description",
        content:
          "Full-immersion English in Clark, Philippines: live on campus, with meals, a gym, a pool, and the city of Angeles around the academy.",
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
        <Place />
        <About />
        <PhotoBreak />
        <Why />
        <DailyRhythm />
        <Programs />
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
