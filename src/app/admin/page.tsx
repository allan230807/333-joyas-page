'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  currency: string;
  category_name: string;
  featured: number;
  in_stock: number;
  images: string;
  sku: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

type Tab = 'productos' | 'nosotros';

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('productos');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    short_description: '',
    price: '',
    currency: 'USD',
    category_id: '',
    materials: '',
    featured: false,
    in_stock: true,
    sku: '',
    weight_grams: '',
    dimensions: '',
  });
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/session');
      const data = await res.json();

      if (!data.user) {
        setLoading(false);
        return;
      }

      setUser(data.user);
      await Promise.all([fetchProducts(), fetchCategories()]);
    } catch {
      // No session
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const openNewProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      short_description: '',
      price: '',
      currency: 'USD',
      category_id: '',
      materials: '',
      featured: false,
      in_stock: true,
      sku: '',
      weight_grams: '',
      dimensions: '',
    });
    setImages([]);
    setShowForm(true);
  };

  const openEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      description: '',
      short_description: '',
      price: product.price.toString(),
      currency: product.currency || 'USD',
      category_id: '',
      materials: '',
      featured: product.featured === 1,
      in_stock: product.in_stock === 1,
      sku: product.sku || '',
      weight_grams: '',
      dimensions: '',
    });
    try {
      setImages(JSON.parse(product.images || '[]'));
    } catch {
      setImages([]);
    }
    setShowForm(true);
  };

  const handleUploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setImages((prev) => [...prev, ...data.urls]);
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        category_id: formData.category_id ? parseInt(formData.category_id) : null,
        materials: formData.materials ? formData.materials.split(',').map((m) => m.trim()) : [],
        images,
      };

      const url = editingProduct
        ? `/api/admin/products/${editingProduct.id}`
        : '/api/admin/products';

      const res = await fetch(url, {
        method: editingProduct ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowForm(false);
        await fetchProducts();
      }
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este producto?')) return;

    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await fetchProducts();
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const generateSlug = () => {
    const slug = formData.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData((prev) => ({ ...prev, slug }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d4af37]" />
      </div>
    );
  }

  // Show login prompt if not authenticated (NO REDIRECT)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a14]">
        <div className="text-center">
          <h2 className="text-white text-2xl font-heading mb-4">Acceso restringido</h2>
          <p className="text-white/60 mb-8">Debes iniciar sesión para acceder al panel de administración.</p>
          <Link
            href="/login"
            className="bg-[#d4af37] text-[#0a0a14] px-8 py-3 font-medium uppercase tracking-widest hover:bg-[#d4af37]/90 transition-colors"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#0a0a14] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-heading text-xl">333 Joyas</Link>
          <span className="text-white/50 text-sm">/ Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/70 text-sm">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="text-sm text-white/70 hover:text-[#d4af37] transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('productos')}
            className={`pb-4 px-2 text-sm uppercase tracking-widest transition-colors ${
              activeTab === 'productos'
                ? 'text-[#d4af37] border-b-2 border-[#d4af37]'
                : 'text-muted hover:text-primary'
            }`}
          >
            Productos
          </button>
          <button
            onClick={() => setActiveTab('nosotros')}
            className={`pb-4 px-2 text-sm uppercase tracking-widest transition-colors ${
              activeTab === 'nosotros'
                ? 'text-[#d4af37] border-b-2 border-[#d4af37]'
                : 'text-muted hover:text-primary'
            }`}
          >
            Nosotros
          </button>
        </div>

        {activeTab === 'productos' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 border border-white/10 p-6">
                <p className="text-white/50 text-sm">Total Productos</p>
                <p className="text-3xl font-heading text-white">{products.length}</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6">
                <p className="text-white/50 text-sm">Destacados</p>
                <p className="text-3xl font-heading text-white">
                  {products.filter((p) => p.featured === 1).length}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6">
                <p className="text-white/50 text-sm">Categorías</p>
                <p className="text-3xl font-heading text-white">{categories.length}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl text-primary">Productos</h2>
              <button
                onClick={openNewProduct}
                className="bg-[#d4af37] text-[#0a0a14] px-6 py-2 text-sm uppercase tracking-widest hover:bg-[#d4af37]/90 transition-colors"
              >
                + Nuevo Producto
              </button>
            </div>

            {/* Products Table */}
            <div className="bg-white/5 border border-white/10 overflow-hidden">
              {products.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-muted">No hay productos todavía.</p>
                  <p className="text-sm text-muted/60 mt-2">Agrega tu primer producto con el botón de arriba.</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted">Producto</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted">Categoría</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted">Precio</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted">Estado</th>
                      <th className="text-right px-6 py-4 text-sm font-medium text-muted">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/10 overflow-hidden">
                              {(() => {
                                try {
                                  const imgs = JSON.parse(product.images || '[]');
                                  if (imgs[0]) {
                                    return (
                                      // eslint-disable-next-line @next/next/no-img-element
                                      <img src={imgs[0]} alt={product.name} className="w-full h-full object-cover" />
                                    );
                                  }
                                } catch {}
                                return null;
                              })()}
                            </div>
                            <div>
                              <p className="font-medium text-white">{product.name}</p>
                              <p className="text-sm text-white/50">{product.sku}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/60">{product.category_name || '-'}</td>
                        <td className="px-6 py-4 text-sm text-white font-medium">
                          ${product.price.toLocaleString()} {product.currency}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-2 py-1 text-xs rounded ${
                            product.in_stock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {product.in_stock ? 'En stock' : 'Agotado'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => openEditProduct(product)}
                            className="text-[#d4af37] hover:text-[#d4af37]/80 text-sm mr-3"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}

        {activeTab === 'nosotros' && (
          <div className="bg-white p-8 shadow-sm text-center">
            <h2 className="font-heading text-2xl text-primary mb-4">Editar Sección "Nosotros"</h2>
            <p className="text-muted mb-6">
              Edita el título, descripción, características y sección de inversión de la página principal.
            </p>
            <Link
              href="/admin/nosotros"
              className="inline-block bg-[#d4af37] text-[#0a0a14] px-8 py-3 text-sm uppercase tracking-widest hover:bg-[#d4af37]/90 transition-colors"
            >
              Ir al Editor de Nosotros
            </Link>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0f1528] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-heading text-2xl text-white mb-6">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Nombre</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Slug</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
                        className="flex-1 px-3 py-2 border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#d4af37]"
                      />
                      <button
                        type="button"
                        onClick={generateSlug}
                        className="px-3 py-2 bg-white/10 text-sm text-white hover:bg-white/20"
                      >
                        Generar
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Descripción corta</label>
                  <input
                    type="text"
                    value={formData.short_description}
                    onChange={(e) => setFormData((p) => ({ ...p, short_description: e.target.value }))}
                    className="w-full px-3 py-2 border border-border focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">Descripción</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Precio (USD)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData((p) => ({ ...p, price: e.target.value }))}
                      className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">SKU</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData((p) => ({ ...p, sku: e.target.value }))}
                      className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">Categoría</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData((p) => ({ ...p, category_id: e.target.value }))}
                    className="w-full px-3 py-2 border border-white/10 bg-[#0f1528] text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="">Seleccionar categoría...</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-1">Tipo de tejido / Material</label>
                  <input
                    type="text"
                    value={formData.materials}
                    onChange={(e) => setFormData((p) => ({ ...p, materials: e.target.value }))}
                    placeholder="Oro 18k, Cadena venezolana, etc."
                    className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Peso (gramos)</label>
                    <input
                      type="number"
                      value={formData.weight_grams}
                      onChange={(e) => setFormData((p) => ({ ...p, weight_grams: e.target.value }))}
                      className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Dimensiones</label>
                    <input
                      type="text"
                      value={formData.dimensions}
                      onChange={(e) => setFormData((p) => ({ ...p, dimensions: e.target.value }))}
                      className="w-full px-3 py-2 border border-white/10 bg-white/5 text-white focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Imágenes</label>
                  <div className="border-2 border-dashed border-white/20 p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleUploadImages}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer text-[#d4af37] hover:text-[#d4af37]/80 text-sm"
                    >
                      {uploading ? 'Subiendo...' : 'Click para subir imágenes'}
                    </label>
                  </div>
                  {images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {images.map((url, i) => (
                        <div key={i} className="relative w-20 h-20">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={url} alt="" className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData((p) => ({ ...p, featured: e.target.checked }))}
                    />
                    <span className="text-sm text-primary">Destacado</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.in_stock}
                      onChange={(e) => setFormData((p) => ({ ...p, in_stock: e.target.checked }))}
                    />
                    <span className="text-sm text-primary">En stock</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border border-border text-primary hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2 bg-[#d4af37] text-[#0a0a14] hover:bg-[#d4af37]/90 disabled:opacity-50"
                >
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
