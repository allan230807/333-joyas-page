import { Metadata } from "next";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Terminos y Condiciones",
  description: "Terminos y condiciones de uso y compra en 333 Joyas.",
};

export default function TermsConditionsPage() {
  return (
    <div className="py-page-padding">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: "Terminos y Condiciones", href: "/legal/terminos" },
              ]}
            />
          </div>
          
          <h1 className="text-h2 font-heading text-primary mb-12">Terminos y Condiciones</h1>
          
          <div className="space-y-8 text-body text-muted">
            <section>
              <h2 className="text-h3 font-heading text-primary mb-4">Objeto</h2>
              <p>
                Las presentes Condiciones Generales regulan el uso de este sitio web y la compra
                de los productos ofrecidos por 333 Joyas a traves de la misma. Todo usuario que
                acceda y realice una compra acepta someterse a estas condiciones.
              </p>
            </section>
            
            <section>
              <h2 className="text-h3 font-heading text-primary mb-4">Productos</h2>
              <p>
                Todos los productos estan sujetos a disponibilidad. Tratandose de joyeria artesanal,
                es posible que las piezas presenten ligeras variaciones con respecto a las imagenes
                mostradas, lo cual es prueba de su caracter unico y artesanal.
              </p>
            </section>
            
            <section>
              <h2 className="text-h3 font-heading text-primary mb-4">Precios</h2>
              <p>
                Los precios de los productos estan indicados en Euros e incluyen los impuestos
                aplicables. No incluyen los gastos de envio, que seran anadidos al importe total
                durante el proceso de compra antes de finalizar el pedido.
              </p>
            </section>
            
            <section>
              <h2 className="text-h3 font-heading text-primary mb-4">Proceso de compra</h2>
              <p>
                Para realizar una compra, el usuario debera anadir los productos al carrito y seguir
                los pasos indicados. Al finalizar, el cliente recibira un correo electronico confirmando
                la recepcion de su pedido. Nos reservamos el derecho a cancelar cualquier pedido en 
                caso de error evidente en el precio o falta de disponibilidad.
              </p>
            </section>
            
            <section>
              <h2 className="text-h3 font-heading text-primary mb-4">Envios</h2>
              <p>
                Realizamos envios nacionales e internacionales. Los plazos de entrega varian en funcion
                del destino y del producto, ya que algunas piezas se elaboran bajo pedido. En todo caso, 
                le mantendremos informado sobre el estado de su envio.
              </p>
            </section>
            
            <section>
              <h2 className="text-h3 font-heading text-primary mb-4">Devoluciones</h2>
              <p>
                Dispone de un plazo de 14 dias naturales desde la recepcion del producto para ejercer
                su derecho de desistimiento. El producto debera ser devuelto en perfectas condiciones 
                y en su embalaje original. Las piezas personalizadas o hechas a medida no admiten devolucion.
              </p>
            </section>
            
            <section>
              <h2 className="text-h3 font-heading text-primary mb-4">Garantia</h2>
              <p>
                Todas nuestras joyas cuentan con una garantia legal contra defectos de fabricacion. 
                Esta garantia no cubre danos causados por uso indebido, desgaste natural, accidentes 
                o manipulaciones realizadas por terceros.
              </p>
            </section>
            
            <section>
              <h2 className="text-h3 font-heading text-primary mb-4">Propiedad intelectual</h2>
              <p>
                Todos los disenos de las joyas, imagenes, textos y contenidos del sitio web son propiedad
                exclusiva de 333 Joyas y estan protegidos por los derechos de propiedad intelectual e
                industrial correspondientes.
              </p>
            </section>
            
            <section>
              <h2 className="text-h3 font-heading text-primary mb-4">Legislacion aplicable</h2>
              <p>
                Las presentes condiciones se rigen por la legislacion vigente. Cualquier controversia 
                surgida en relacion con la interpretacion o ejecucion de estas condiciones se sometera
                a la jurisdiccion de los tribunales competentes.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </div>
  );
}
