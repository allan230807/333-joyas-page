import { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import CraftSection from "@/components/home/CraftSection";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Joyeria Artesanal de Alta Gama`,
  description: SITE_DESCRIPTION,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <CraftSection />
      <Testimonials />
      <FAQ />
    </>
  );
}
