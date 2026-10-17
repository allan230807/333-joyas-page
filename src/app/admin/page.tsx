import type { Metadata } from 'next';
import ControlAcceso from './ControlAcceso';

export const metadata: Metadata = {
  title: 'Panel',
  robots: { index: false, follow: false },
};

export default function PaginaAdmin() {
  return <ControlAcceso />;
}
