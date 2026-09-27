'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type Tab = 'productos' | 'nosotros';

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
        router.push('/login');
        return;
      }

      setUser(data.user);
      await Promise.all([fetchProducts(), fetchCategories()]);
    } catch {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    const res = await fetch('/api/admin/products');
    const data = await res.json();
    setProducts(data.products || []);
  };

  const fetchCategories = async () => {
    const res = await fetch('/api/admin/categories');
    const data = await res.json();
    setCategories(data.categories || []);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-heading text-xl">333 Joyas</Link>
          <span className="text-white/50 text-sm">/ Admin</span>
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

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('productos')}
            className={`pb-4 px-2 text-sm uppercase tracking-widest transition-colors ${
              activeTab === 'productos'
                ? 'text-accent border-b-2 border-accent'
                : 'text-muted hover:text-primary'
            }`}
          >
            Productos
          </button>
          <button
            onClick={() => setActiveTab('nosotros')}
            className={`pb-4 px-2 text-sm uppercase tracking-widest transition-colors ${
              activeTab === 'nosotros'
                ? 'text-accent border-b-2 border-accent'
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
              <div className="bg-white p-6 shadow-sm">
                <p className="text-muted text-sm">Total Productos</p>
                <p className="text-3xl font-heading text-primary">{products.length}</p>
              </div>
              <div className="bg-white p-6 shadow-sm">
                <p className="text-muted text-sm">Destacados</p>
                <p className="text-3xl font-heading text-primary">
                  {products.filter((p) => p.featured === 1).length}
                </p>
              </div>
              <div className="bg-white p-6 shadow-sm">
                <p className="text-muted text-sm">Categorías</p>
                <p className="text-3xl font-heading text-primary">{categories.length}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-2xl text-primary">Productos</h2>
              <button
                onClick={openNewProduct}
                className="bg-accent text-white px-6 py-2 text-sm uppercase tracking-widest hover:bg-accent/90 transition-colors"
              >
                + Nuevo Producto
              </button>
            </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl text-primary">Productos</h2>
          <button
            onClick={openNewProduct}
            className="bg-accent text-white px-6 py-2 text-sm uppercase tracking-widest hover:bg-accent/90 transition-colors"
          >
            + Nuevo Producto
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white shadow-sm overflow-hidden">
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
                <tr key={product.id} className="border-b border-border hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 overflow-hidden">
                        {JSON.parse(product.images || '[]')[0] && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={JSON.parse(product.images)[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-primary">{product.name}</p>
                        <p className="text-sm text-muted">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted">{product.category_name || '-'}</td>
                  <td className="px-6 py-4 text-sm text-primary font-medium">
                    ${product.price.toLocaleString()} {product.currency}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2 py-1 text-xs rounded ${
                      product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.in_stock ? 'En stock' : 'Agotado'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => openEditProduct(product)}
                      className="text-accent hover:text-accent/80 text-sm mr-3"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
              className="inline-block bg-accent text-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-accent/90 transition-colors"
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
              className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-heading text-2xl text-primary mb-6">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Nombre</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-border focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Slug</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
                        className="flex-1 px-3 py-2 border border-border focus:outline-none focus:border-accent"
                      />
                      <button
                        type="button"
                        onClick={generateSlug}
                        className="px-3 py-2 bg-gray-100 text-sm hover:bg-gray-200"
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
                    className="w-full px-3 py-2 border border-border focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-1">Descripción</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-border focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Precio (USD)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData((p) => ({ ...p, price: e.target.value }))}
                      className="w-full px-3 py-2 border border-border focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">SKU</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData((p) => ({ ...p, sku: e.target.value }))}
                      className="w-full px-3 py-2 border border-border focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Categoría</label>
                    <select
                      value={formData.category_id}
                      onChange={(e) => setFormData((p) => ({ ...p, category_id: e.target.value }))}
                      className="w-full px-3 py-2 border border-border focus:outline-none focus:border-accent"
                    >
                      <option value="">Seleccionar...</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Materiales (separados por coma)</label>
                    <input
                      type="text"
                      value={formData.materials}
                      onChange={(e) => setFormData((p) => ({ ...p, materials: e.target.value }))}
                      placeholder="Oro 18k, Diamantes"
                      className="w-full px-3 py-2 border border-border focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Peso (gramos)</label>
                    <input
                      type="number"
                      value={formData.weight_grams}
                      onChange={(e) => setFormData((p) => ({ ...p, weight_grams: e.target.value }))}
                      className="w-full px-3 py-2 border border-border focus:outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Dimensiones</label>
                    <input
                      type="text"
                      value={formData.dimensions}
                      onChange={(e) => setFormData((p) => ({ ...p, dimensions: e.target.value }))}
                      className="w-full px-3 py-2 border border-border focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Imágenes</label>
                  <div className="border-2 border-dashed border-border p-4 text-center">
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
                      className="cursor-pointer text-accent hover:text-accent/80 text-sm"
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
                  className="px-6 py-2 bg-accent text-white hover:bg-accent/90 disabled:opacity-50"
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
