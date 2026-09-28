import { Metadata } from "next";
import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import FAQ from "@/components/home/FAQ";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types";

export const metadata: Metadata = {
  title: `${SITE_NAME} | Oro de Inversión en Caracas`,
  description: SITE_DESCRIPTION,
};

export default async function HomePage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select(`
      *,
      category:categories(*),
      images:product_images(*)
    `);

  // Shuffle and pick 3 products randomly
  const randomProducts = products
    ? (products as Product[]).sort(() => 0.5 - Math.random()).slice(0, 3)
    : [];

  return (
    <>
      <Hero />
      <AboutSection />
      <FeaturedCollections products={randomProducts} />
      <FAQ />
    </>
  );
}
