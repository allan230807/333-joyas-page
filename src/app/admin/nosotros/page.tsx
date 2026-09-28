'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface AboutContent {
  title: string;
  description: string;
  image: string;
  features: Feature[];
  investmentTitle: string;
  investmentDescription: string;
}

export default function AdminNosotrosPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<AboutContent>({
    title: '',
    description: '',
    image: '',
    features: [],
    investmentTitle: '',
    investmentDescription: '',
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/session');
      const data = await res.json();

      if (!data.user) {
        router.push('/login');
        return;
      }

      setUser(data.user);
      await fetchContent();
    } catch {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchContent = async () => {
    const res = await fetch('/api/admin/about');
    const data = await res.json();
    if (data.content) {
      setContent(data.content);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        alert('Contenido actualizado exitosamente');
      }
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setSaving(false);
    }
  };

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    const newFeatures = [...content.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setContent({ ...content, features: newFeatures });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      {/* Header */}
      <header className="bg-[#0a0a14] border-b border-white/10 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-heading text-xl">333 Joyas</Link>
          <Link href="/admin" className="text-white/50 text-sm hover:text-accent">/ Admin</Link>
          <span className="text-white/50 text-sm">/ Nosotros</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/70 text-sm">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-white/70 hover:text-accent transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-2xl text-white">Editar Sección "Nosotros"</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#d4af37] text-[#0a0a14] px-6 py-2 text-sm uppercase tracking-widest hover:bg-[#d4af37]/90 transition-colors disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>

        <div className="space-y-8">
          {/* Main content */}
          <div className="bg-white/5 border border-white/10 p-6">
            <h2 className="font-heading text-lg text-white mb-4">Contenido Principal</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Título</label>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => setContent({ ...content, title: e.target.value })}
                  className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">Descripción</label>
                <textarea
                  value={content.description}
                  onChange={(e) => setContent({ ...content, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">URL de imagen de fondo</label>
                <input
                  type="url"
                  value={content.image}
                  onChange={(e) => setContent({ ...content, image: e.target.value })}
                  className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#d4af37]"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white/5 border border-white/10 p-6">
            <h2 className="font-heading text-lg text-white mb-4">Características (4 cards)</h2>

            <div className="space-y-6">
              {content.features.map((feature, index) => (
                <div key={index} className="border border-white/10 p-4">
                  <h3 className="font-medium text-white mb-3">Card {index + 1}</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-white/60 mb-1">Icono (emoji)</label>
                      <input
                        type="text"
                        value={feature.icon}
                        onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                        className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-white/60 mb-1">Título</label>
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) => updateFeature(index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <label className="block text-xs text-white/60 mb-1">Descripción</label>
                    <textarea
                      value={feature.description}
                      onChange={(e) => updateFeature(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Investment section */}
          <div className="bg-white/5 border border-white/10 p-6">
            <h2 className="font-heading text-lg text-white mb-4">Sección de Inversión</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Título</label>
                <input
                  type="text"
                  value={content.investmentTitle}
                  onChange={(e) => setContent({ ...content, investmentTitle: e.target.value })}
                  className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-1">Descripción</label>
                <textarea
                  value={content.investmentDescription}
                  onChange={(e) => setContent({ ...content, investmentDescription: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>
          </div>

          {/* Save button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#d4af37] text-[#0a0a14] px-8 py-3 font-medium uppercase tracking-widest hover:bg-[#d4af37]/90 transition-colors disabled:opacity-50"
            >
              {saving ? 'Guardando...' : 'Guardar Todos los Cambios'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
