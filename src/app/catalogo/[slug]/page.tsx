import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MOCK_PRODUCTS, SITE_URL } from "@/lib/constants";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Container from "@/components/ui/Container";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import JsonLd from "@/components/seo/JsonLd";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = MOCK_PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  return {
    title: product.name,
    description: product.short_description,
    openGraph: {
      title: product.name,
      description: product.short_description,
      images: product.images.map((img) => img.url),
      url: `${SITE_URL}/catalogo/${product.slug}`,
      type: "website",
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = MOCK_PRODUCTS.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images.map((img) => img.url),
    description: product.short_description,
    sku: product.id,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/catalogo/${product.slug}`,
      priceCurrency: "EUR",
      price: product.price,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <div className="py-page-padding">
      <JsonLd data={productSchema} />
      <Container>
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Inicio", href: "/" },
              { label: "Catalogo", href: "/catalogo" },
              { label: product.name, href: `/catalogo/${product.slug}` },
            ]}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} productName={product.name} />
          </div>
          <div className="lg:col-span-5">
            <ProductInfo product={product} />
          </div>
        </div>
      </Container>
    </div>
  );
}
