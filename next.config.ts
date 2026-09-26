import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      { source: '/customised-tours', destination: '/plan-your-journey', permanent: true },
      { source: '/group-travel', destination: '/travel-services/group-travel', permanent: true },
      { source: '/college-trips', destination: '/travel-services/college-trips', permanent: true },
      { source: '/family-travel', destination: '/travel-services/family-travel', permanent: true },
      { source: '/function-travel', destination: '/travel-services/function-travel', permanent: true },
      { source: '/tours/madurai-meenakshi-amman-temple', destination: '/tours/madurai', permanent: true },
      { source: '/tours/thanjavur-big-temple', destination: '/tours/thanjavur', permanent: true },
      { source: '/travel-guide/college-industrial-visit-planning-guide', destination: '/travel-guide/how-to-plan-college-industrial-visit-trip', permanent: true },
      { source: '/travel-guide/temple-tour-etiquette-and-darshan-tips', destination: '/travel-guide/weekend-getaways-from-madurai', permanent: true },
      { source: '/travel-guide/choosing-between-van-and-sedan-for-group-travel', destination: '/travel-guide/rameswaram-dhanushkodi-day-trip-guide', permanent: true },
      { source: '/travel-guide/rameshwaram-dhanushkodi-1-day-trip-guide', destination: '/travel-guide/madurai-to-kodaikanal-one-day-trip-plan', permanent: true },
      { source: '/travel-guide/south-india-hill-station-packing-checklist', destination: '/travel-guide/madurai-to-tiruchendur-rameshwaram-temple-tour-guide', permanent: true },
      { source: '/travel-guide/monsoon-travel-tips-western-ghats', destination: '/travel-guide/madurai-airport-ixm-outstation-cab-travel-guide', permanent: true },
      { source: '/travel-guide/madurai-sightseeing-food-culture-guide', destination: '/travel-guide/wedding-guest-transportation-madurai-marriage-halls', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
