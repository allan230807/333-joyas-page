import { Metadata } from "next";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import FAQ from "@/components/home/FAQ";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Oro de Inversión en Caracas`,
  description: SITE_DESCRIPTION,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <FeaturedCollections />
      <FAQ />
    </>
  );
}
