// Las fotos se sirven desde Supabase Storage. Si la URL del proyecto está
// definida, solo se permite ese dominio; si no, cualquier proyecto *.supabase.co.
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL) : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF/WebP: hasta ~50 % menos peso que JPEG en datos móviles.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 828, 1080, 1440, 1920],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        // http solo aplica a Supabase local (supabase start en 127.0.0.1:54321).
        protocol: supabase ? supabase.protocol.replace(':', '') : 'https',
        hostname: supabase ? supabase.hostname : '*.supabase.co',
        port: supabase?.port || '',
        pathname: '/storage/v1/object/public/joyas/**',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  async redirects() {
    return [
      { source: '/artesania', destination: '/nosotros', permanent: true },
    ];
  },
};

module.exports = nextConfig;
