'use client';

import { useState } from 'react';
import Revelar from '@/components/movimiento/Revelar';
import { IconoMas } from '@/components/iconos';
import JsonLd from '@/components/seo/JsonLd';
import { QUILATES } from '@/lib/marca';

const PREGUNTAS = [
  {
    pregunta: '¿Qué oro venden?',
    respuesta: `Únicamente oro de ${QUILATES} quilates (750 milésimas). Cada pieza incluye su certificado de autenticidad y garantía de pureza.`,
  },
  {
    pregunta: '¿Cómo sé cuánto pesa mi pieza?',
    respuesta: 'Cada joya del catálogo indica su peso en gramos en su ficha.',
  },
  {
    pregunta: '¿Hacen delivery?',
    respuesta: 'Sí, realizamos delivery personal en Caracas y zonas aledañas. El envío es gratuito para compras superiores a $500. También enviamos a todo el país mediante encomienda asegurada.',
  },
  {
    pregunta: '¿Cómo puedo pagar?',
    respuesta: 'Aceptamos transferencias bancarias, Zelle, PayPal y efectivo. Para delivery en Caracas, el pago puede realizarse contra entrega.',
  },
  {
    pregunta: '¿Puedo ver la pieza antes de comprar?',
    respuesta: 'Por supuesto. Coordinamos citas en nuestro punto de venta en San Antonio de los Altos. También enviamos fotos y videos por WhatsApp.',
  },
];

// Acordeón con la técnica de grid-template-rows 0fr -> 1fr: anima la altura
// sin medir el contenido en JavaScript.
export default function Preguntas() {
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <section className="seccion">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: PREGUNTAS.map((p) => ({
            '@type': 'Question',
            name: p.pregunta,
            acceptedAnswer: { '@type': 'Answer', text: p.respuesta },
          })),
        }}
      />
      <div className="contenedor grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <Revelar>
          <p className="rotulo">Preguntas</p>
          <h2 className="titulo mt-3">Lo que suelen preguntarnos</h2>
        </Revelar>

        <Revelar retraso={0.1} className="border-t border-linea">
          {PREGUNTAS.map((p, i) => {
            const activa = abierta === i;
            return (
              <div key={p.pregunta} className="border-b border-linea">
                <button
                  type="button"
                  onClick={() => setAbierta(activa ? null : i)}
                  aria-expanded={activa}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-serif text-xl font-light sm:text-2xl">{p.pregunta}</span>
                  <IconoMas
                    tamano={18}
                    className={`shrink-0 text-oro transition-transform duration-500 ease-suave ${activa ? 'rotate-45' : ''}`}
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-suave ${
                    activa ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <p className="overflow-hidden pr-10 text-[0.95rem] leading-relaxed text-niebla">
                    <span className="block pb-6">{p.respuesta}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </Revelar>
      </div>
    </section>
  );
}
