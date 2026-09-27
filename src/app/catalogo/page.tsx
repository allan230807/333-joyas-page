import { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CatalogoContent from "./CatalogoContent";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Catalogo",
  description: "Explora nuestra coleccion completa de joyeria artesanal. Piezas unicas forjadas con metales preciosos y pasion.",
};

export default function CatalogoPage() {
  return (
    <div className="py-page-padding">
      <Container>
        <div className="mb-8">
          <Breadcrumbs 
            items={[
              { label: "Inicio", href: "/" },
              { label: "Catalogo", href: "/catalogo" }
            ]} 
          />
        </div>
        <h1 className="text-h2 font-heading text-primary mb-8">Nuestro Catalogo</h1>
        <CatalogoContent />
      </Container>
    </div>
  );
}
