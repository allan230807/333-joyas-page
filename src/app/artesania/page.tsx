import { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import CraftTimeline from "@/components/artesania/CraftTimeline";
import { CRAFT_STEPS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Artesania",
  description: "Conoce el proceso artesanal detras de cada una de nuestras piezas de alta joyeria.",
};

export default function ArtesaniaPage() {
  return (
    <div className="pb-page-padding">
      <div className="bg-primary text-white py-24 mb-16">
        <Container>
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: "Artesania", href: "/artesania" },
              ]}
              light
            />
          </div>
          <div className="max-w-3xl">
            <h1 className="text-h2 font-heading mb-6">El arte detras de cada pieza</h1>
            <p className="text-body text-border">
              Nuestra joyeria es el resultado de un proceso minucioso, donde la tradicion se encuentra con el diseno contemporaneo.
              Cada creacion cuenta una historia de dedicacion, paciencia y pasion por el detalle.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <CraftTimeline steps={CRAFT_STEPS} />
        
        <div className="mt-24 text-center">
          <h2 className="text-h3 font-heading text-primary mb-6">Descubre el resultado de nuestra pasion</h2>
          <Button href="/catalogo" variant="primary" size="lg">
            Explorar el catalogo
          </Button>
        </div>
      </Container>
    </div>
  );
}
