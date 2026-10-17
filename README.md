<div align="center">

<h1>333 Joyas</h1>

<p><em><strong>God First</strong></em></p>

<p>La joyería en oro 18k de un amigo. Mi primera página web, donde el oro se encuentra con el código.</p>

<img src="https://img.shields.io/badge/Oro-18k-c9a45c?style=for-the-badge" />
<img src="https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/React-18-149ECA?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/Supabase-Postgres%20%2B%20Storage-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
<img src="https://img.shields.io/badge/Framer%20Motion-11-FF0055?style=for-the-badge&logo=framer&logoColor=white" />

</div>

---

## ✨ Qué tiene

| | |
|---|---|
| **Lema "God First"** | Portada con el lema en letras que aparecen una a una y una cadena dorada que se dibuja al pie. |
| **Solo oro 18k** | No existe otro quilataje en la base ni en el sitio: cada ficha dice *Oro 18k · 750 milésimas*. |
| **Fotos de las joyas** | Se suben desde el teléfono en `/admin`, se comprimen solas y se guardan en Supabase Storage. |
| **Animación del tejido** | 10 tejidos (rolo, cubano, franco, gucci, fígaro, cordón, espiga, singapur, bizantino, veneciana) dibujados en líneas finas que se revelan y derivan en bucle. |
| **Peso en gramos** | Obligatorio en cada joya y visible en el catálogo, la ficha y el pedido por WhatsApp. |
| **Pensada para teléfonos** | Carruseles con desplazamiento nativo, botón de WhatsApp fijo en la ficha, imágenes AVIF/WebP, animaciones que se pausan fuera de pantalla y respetan "reducir movimiento". |
| **Mi selección** | El cliente arma una lista de piezas y la envía por WhatsApp con nombre, peso y enlace. |

## 🧱 Cómo está hecha

| Pieza | Dónde |
|---|---|
| Esquema de la base (tablas, seguridad RLS, bucket de fotos) | [`supabase/migrations/20261017000000_joyas_18k.sql`](supabase/migrations/20261017000000_joyas_18k.sql) |
| Tejidos (nombres y dibujos) | [`src/lib/tejidos.ts`](src/lib/tejidos.ts), [`src/components/tejidos/`](src/components/tejidos) |
| Marca, lema, contacto, 18k | [`src/lib/marca.ts`](src/lib/marca.ts) |
| Lectura del catálogo | [`src/lib/catalogo.ts`](src/lib/catalogo.ts) |
| Panel y subida de fotos | [`src/app/admin/`](src/app/admin) |

**Base de datos (Supabase):** `categorias`, `joyas` (tejido, peso, largo, ancho, precio opcional), `joya_fotos` (ruta en Storage, ancho, alto, orden) y `nosotros`. El público solo puede **leer** lo publicado; **escribir y subir fotos** solo puede un usuario registrado en `administradores`. Esto lo verifica la base de datos, no el navegador.

---

## 🛠️ Puesta en marcha

### 1. Supabase (una sola vez)

1. Crea un proyecto en [supabase.com](https://supabase.com) (el plan gratis alcanza).
2. **SQL Editor → New query**: pega el contenido de `supabase/migrations/20261017000000_joyas_18k.sql` y pulsa **Run**. Crea las tablas, la seguridad y el bucket `joyas` para las fotos. Se puede volver a ejecutar sin problema.
3. **Authentication → Users → Add user**: crea el usuario del administrador con una contraseña **nueva**.
4. De vuelta en el SQL Editor, dale permisos (con tu correo):
   ```sql
   insert into public.administradores (user_id)
   select id from auth.users where email = 'tu-correo@ejemplo.com';
   ```
5. **Project Settings → API**: copia la *Project URL* y la clave *anon public*.

### 2. Variables de entorno

```bash
cp .env.local.example .env.local   # y pega ahí la URL y la clave anon
```

En **Vercel → Settings → Environment Variables** agrega las mismas tres variables y vuelve a desplegar.

> La clave `anon` es pública por diseño. La seguridad la dan las reglas RLS de la base. **Nunca** pongas la clave `service_role` en el proyecto.

### 3. Correr el sitio

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
```

### 4. Subir joyas

Entra a **`/admin`** desde el teléfono con el usuario del paso 1.3 → **Nueva joya** → fotos, nombre, tejido, peso → **Crear joya**. El sitio se actualiza al instante.

---

<div align="center">
<sub>Hecho con 🤍 · <em>God First</em></sub>
</div>
