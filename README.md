<p align="center">

<img src="https://img.shields.io/badge/✨-333%20JOYAS-gold?style=for-the-badge" />

</p>

<h1 align="center">💎 333 Joyas 💎</h1>

<p align="center">
  <strong>La joyería artesanal de un amigo.</strong><br />
  Mi primera página web — donde el lujo se encuentra con el código.
</p>

<p align="center">
  <a href="#-demostración">Demo</a> •
  <a href="#-características">Características</a> •
  <a href="#-tecnologías">Tecnologías</a> •
  <a href="#-cómo-empezar">Cómo empezar</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer%20Motion-FF0055?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

---

## 🌟 ¿Qué es 333 Joyas?

Una landing page elegante para la **joyería artesanal de un amigo**. No es solo una vitrina — es una experiencia visual cuidada al detalle. Cada pieza es única, hecha a mano, y el sitio transmite exactamente eso: **arte, confianza y perdurabilidad**.

> *"Piezas únicas creadas para perdurar"*

---

## 🌟 Demostración

| Sección | Qué incluye |
|---------|-------------|
| 🏠 **Home** | Hero cinematográfico, colecciones destacadas, proceso artesanal, testimonios, FAQ |
| 📦 **Catálogo** | Grid de productos con filtros por categoría |
| 🔍 **Detalle** | Galería, materiales, dimensiones, peso, SKU y CTA de WhatsApp |
| 🛠️ **Artesanía** | Timeline: Diseño → Selección → Fundición → Engaste → Pulido |
| 📄 **Legales** | Privacidad (RGPD) y Términos |

---

## ✨ Características

| Característica | Detalle |
|----------------|---------|
| 🎭 **Animaciones** | Framer Motion — scroll reveals, stagger, fade-ins |
| 📱 **Responsive** | Mobile-first con menú hamburguesa |
| 🔍 **SEO completo** | Metadata, OpenGraph, JSON-LD, sitemap, robots.txt |
| 🛡️ **Rate limiting** | API de contacto protegida |
| 🖼️ **Optimización** | Next.js Image, lazy loading |
| ♿ **Accesible** | HTML semántico, navegación por teclado |
| ⚡ **Rendimiento** | SSR/SSG con Next.js 14 |

---

## 🚀 Tecnologías

| Tecnología | Uso |
|------------|-----|
| **Next.js 14** | Framework — App Router, SSR/SSG |
| **React 18 + TypeScript** | UI con tipado estático |
| **Tailwind CSS 3.4** | Estilos utility-first |
| **Framer Motion 11** | Animaciones fluidas |
| **Supabase** | Backend (datos mock activos) |
| **Vercel** | Deploy automático |

---

## 🎨 Sistema de Diseño

| Color | Hex | Uso |
|:------|:----|:----|
| `primary` | `#1a1a2e` | Fondos oscuros, texto principal |
| `accent` | `#c9a96e` | **Dorado** — acentos y precios |
| `surface` | `#f8f6f3` | Fondo claro cálido |
| `muted` | `#6b7280` | Texto secundario |

**Tipografías:** Playfair Display (títulos) + Inter (body)

---

## 🏗️ Estructura del Proyecto

```
src/
├── app/                  # Páginas (App Router)
│   ├── page.tsx          # 🏠 Home
│   ├── catalogo/         # 📦 Catálogo + detalle [slug]
│   ├── artesania/        # 🛠️ Proceso artesanal
│   └── legal/            # 📄 Privacidad y Términos
├── components/
│   ├── home/             # Hero, Collections, Testimonials, FAQ
│   ├── catalog/          # ProductCard, Grid, Filters
│   ├── product/          # Gallery, Info, Schema
│   └── ui/               # Button, Badge, Accordion
├── lib/                  # constants, supabase, rate-limit
└── styles/globals.css
```

---

## 🛠️ Cómo Empezar

```bash
# Clonar
git clone https://github.com/tu-usuario/333-joyas-page.git

# Instalar
npm install

# Variables de entorno
cp .env.local.example .env.local

# Desarrollo
npm run dev

# Build producción
npm run build
```

---

<p align="center">
  Hecho con 💛, mucho ☕ y horas frente al editor.
</p>
