interface JsonLdProps {
  data: Record<string, unknown>;
}

// Escapa "<" para que un texto como "</script>" en un nombre de joya no pueda
// cerrar la etiqueta e inyectar código.
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
