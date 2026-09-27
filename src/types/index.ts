export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: number;
  currency: string;
  category_id: string;
  category?: Category;
  materials: string[];
  featured: boolean;
  in_stock: boolean;
  sku: string;
  weight_grams: number | null;
  dimensions: string | null;
  images: ProductImage[];
  created_at: string;
  updated_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  url: string;
  alt: string;
  position: number;
  is_primary: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  product_interest?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

export interface CraftStep {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

