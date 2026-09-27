# Plan: Sistema de Login + Admin con SQLite

## Objetivo
Crear un sistema de autenticación con SQLite para que el administrador (ararciahurtado@gmail.com) pueda subir imágenes y editar precios directamente desde la página.

## Estructura de Base de Datos

### Tabla: `users`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | INTEGER PK | Autoincremental |
| email | TEXT UNIQUE | Correo del usuario |
| password_hash | TEXT | Hash bcrypt de la contraseña |
| role | TEXT | 'admin' o 'user' |
| created_at | TEXT | Fecha de creación |

### Tabla: `products`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | INTEGER PK | Autoincremental |
| name | TEXT | Nombre del producto |
| slug | TEXT UNIQUE | URL amigable |
| description | TEXT | Descripción detallada |
| short_description | TEXT | Descripción corta |
| price | REAL | Precio en USD |
| currency | TEXT | 'USD' |
| category_id | INTEGER FK | Categoría |
| materials | TEXT (JSON) | Array de materiales |
| featured | INTEGER (0/1) | Destacado |
| in_stock | INTEGER (0/1) | Disponibilidad |
| sku | TEXT | Código único |
| weight_grams | REAL | Peso en gramos |
| dimensions | TEXT | Dimensiones |
| images | TEXT (JSON) | Array de URLs de imágenes |
| created_at | TEXT | Fecha de creación |
| updated_at | TEXT | Fecha de actualización |

### Tabla: `categories`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| id | INTEGER PK | Autoincremental |
| name | TEXT | Nombre de la categoría |
| slug | TEXT UNIQUE | URL amigable |
| description | TEXT | Descripción |

## Archivos a Crear

### 1. Base de Datos
- `src/lib/db.ts` - Conexión y helpers de SQLite
- `src/lib/db-schema.ts` - Script de inicialización (tablas + seed data)

### 2. Autenticación
- `src/lib/auth.ts` - Funciones de login/logout/session
- `src/app/api/auth/login/route.ts` - API de login
- `src/app/api/auth/logout/route.ts` - API de logout
- `src/app/api/auth/session/route.ts` - API para verificar sesión

### 3. APIs de Admin
- `src/app/api/admin/products/route.ts` - CRUD de productos
- `src/app/api/admin/upload/route.ts` - Subida de imágenes
- `src/app/api/admin/categories/route.ts` - CRUD de categorías

### 4. Páginas
- `src/app/login/page.tsx` - Página de login
- `src/app/admin/page.tsx` - Panel de administración
- `src/app/admin/productos/[id]/page.tsx` - Editar producto

### 5. Componentes
- `src/components/auth/LoginForm.tsx` - Formulario de login
- `src/components/admin/ProductManager.tsx` - Gestor de productos
- `src/components/admin/ProductForm.tsx` - Formulario de producto
- `src/components/admin/ImageUploader.tsx` - Subida de imágenes

### 6. Middleware
- `src/middleware.ts` - Protección de rutas /admin

## Flujo de Autenticación

1. Usuario ingresa a `/login`
2. Formulario valida email + password
3. Se llama a `POST /api/auth/login`
4. API verifica credenciales contra SQLite
5. Se crea cookie httpOnly con session token
6. Usuario es redirigido a `/admin`
7. Middleware protege todas las rutas `/admin/*`

## Flujo de Admin

1. Admin ve lista de productos
2. Puede crear nuevo producto
3. Puede editar producto existente
4. Puede subir imágenes (múltiples)
5. Puede eliminar imágenes
6. Puededitar precios
7. Cambios se guardan en SQLite

## Datos Iniciales

### Usuario Admin
- Email: ararciahurtado@gmail.com
- Password: Akira100*
- Role: admin

### Categorías
- Anillos
- Collares
- Pendientes
- Pulseras

### Productos (migrados de mock)
- 6 productos existentes con datos actualizados

## Seguridad
- Passwords con hash bcrypt (10 salt rounds)
- Cookies httpOnly, secure en producción
- CSRF protection via SameSite cookies
- Rate limiting en login (5 intentos por minuto)
- Validación de tipos en inputs
