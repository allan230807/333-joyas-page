import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

function DiamondIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
      <path d="M2 9h20" />
      <path d="M12 21V9" />
      <path d="M6 3l6 6" />
      <path d="M18 3l-6 6" />
    </svg>
  );
}

export default function NotFound() {
  return (
    <Container>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <DiamondIcon className="text-accent w-16 h-16 mb-6" />
        <h1 className="text-h2 font-heading text-primary">Pagina no encontrada</h1>
        <p className="text-muted text-body mt-4">
          La pagina que buscas no existe o ha sido movida.
        </p>
        <div className="mt-8">
          <Button href="/catalogo" variant="secondary" size="lg">
            Volver al catalogo
          </Button>
        </div>
      </div>
    </Container>
  );
}
