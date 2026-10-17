import Destacadas from '@/components/inicio/Destacadas';
import GaleriaTejidos from '@/components/inicio/GaleriaTejidos';
import NosotrosBreve from '@/components/inicio/NosotrosBreve';
import Portada from '@/components/inicio/Portada';
import Preguntas from '@/components/inicio/Preguntas';
import Sello18k from '@/components/inicio/Sello18k';
import { elegirDestacadas, obtenerJoyas, obtenerNosotros } from '@/lib/catalogo';

// La página se genera y se cachea; el panel la regenera al guardar cambios
// (/api/revalidar) y, por si acaso, se renueva cada 10 minutos.
export const revalidate = 600;

export default async function Inicio() {
  const [joyas, nosotros] = await Promise.all([obtenerJoyas(), obtenerNosotros()]);

  return (
    <>
      <Portada />
      <Destacadas joyas={elegirDestacadas(joyas, 8)} />
      <GaleriaTejidos />
      <Sello18k />
      <NosotrosBreve nosotros={nosotros} />
      <Preguntas />
    </>
  );
}
