import { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Politica de Privacidad",
  description: "Politica de privacidad y proteccion de datos de 333 Joyas.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-page-padding">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: "Politica de Privacidad", href: "/legal/privacidad" },
              ]}
            />
          </div>
          
          <h1 className="text-h2 font-heading text-primary mb-12">Politica de Privacidad</h1>
          
          <div className="space-y-8 text-body text-muted">
            <section>
              <h2 className="text-h3 font-heading text-primary mb-4">Responsable del tratamiento</h2>
              <p>
                333 Joyas es el responsable del tratamiento de los datos personales del Usuario 
                y le informa que estos datos seran tratados de conformidad con lo dispuesto en las 
                normativas vigentes en proteccion de datos personales.
              </p>
            </section>
            
            <section>
              <h2 className="text-h3 font-heading text-primary mb-4">Datos que recopilamos</h2>
              <p>
                Recopilamos informacion personal que usted nos proporciona voluntariamente, como su nombre,
                direccion de correo electronico, direccion postal, numero de telefono e informacion de pago
                cuando realiza una compra, se suscribe a nuestro boletin o se pone en contacto con nosotros.
              </p>
            </section>
            
            <section>
              <h2 className="text-h3 font-heading text-primary mb-4">Finalidad del tratamiento</h2>
              <p>
                Sus datos personales se utilizan para procesar y gestionar sus pedidos, enviarle
                informacion relacionada con su compra, responder a sus consultas, mejorar nuestros 
                productos y servicios, y enviarle comunicaciones comerciales si ha dado su consentimiento.
              </p>
            </section>
            
            <section>
              <h2 className="text-h3 font-heading text-primary mb-4">Base legal</h2>
              <p>
                El tratamiento de sus datos se basa en su consentimiento, la ejecucion del contrato de 
                compraventa cuando adquiere un producto, y nuestro interes legitimo en mejorar nuestros
                servicios y comunicarnos de forma efectiva con usted.
              </p>
            </section>
            
            <section>
              <h2 className="text-h3 font-heading text-primary mb-4">Destinatarios</h2>
              <p>
                Sus datos no se comunicaran a terceros, excepto por obligacion legal o cuando sea 
                estrictamente necesario para el cumplimiento de las finalidades del tratamiento 
                (empresas de transporte, proveedores de servicios de pago).
              </p>
            </section>
            
            <section>
              <h2 className="text-h3 font-heading text-primary mb-4">Derechos del usuario</h2>
              <p>
                Usted tiene derecho a acceder a sus datos personales, rectificar los datos inexactos,
                solicitar su supresion, oponerse al tratamiento, solicitar la limitacion del mismo y 
                la portabilidad de sus datos. Puede ejercer estos derechos contactando con nosotros.
              </p>
            </section>
            
            <section>
              <h2 className="text-h3 font-heading text-primary mb-4">Cookies</h2>
              <p>
                Utilizamos cookies propias y de terceros para mejorar nuestros servicios y mostrarle
                publicidad relacionada con sus preferencias mediante el analisis de sus habitos de 
                navegacion.
              </p>
            </section>
            
            <section>
              <h2 className="text-h3 font-heading text-primary mb-4">Contacto</h2>
              <p>
                Si tiene alguna pregunta sobre esta Politica de Privacidad o sobre el tratamiento de
                sus datos personales, no dude en contactarnos a traves de nuestro formulario de contacto
                o enviando un correo electronico.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
