import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-940ccf6255b54fa799a9b01050e6c227.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.graphassets.com',
      },
      {
        protocol: 'https',
        hostname: 'media.graphassets.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/product",
        destination: "/inquiry-to-quote",
        permanent: true,
      },
      {
        source: "/platform",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pricinglandingpage",
        destination: "/demo",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/demo",
        permanent: true,
      },
      {
        source: "/blog/category/:slug",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/post/attributes-successful-cpos",
        destination: "/blog/post/attributes-successful-chief-procurement-officers",
        permanent: true,
      },
      {
        source: "/blog/post/procurement-software-supplier-management-benefits",
        destination: "/blog/post/procurement-software-strategic-supplier-relationship-management-benefits",
        permanent: true,
      },
      {
        source: "/blog/post/procurement-assist-supplier-diversity",
        destination: "/blog/post/procurement-and-supplier-diversity-programme",
        permanent: true,
      },
      {
        source: "/blog/post/what-is-direct-spend-for-which-companies-does-direct-spend-matter",
        destination: "/blog/post/exploring-direct-spend-impact-direct-materials-procurement-software",
        permanent: true,
      },
      {
        source: "/blog/post/Microsoft%20%E2%80%93%20Cloud,%20Computers,%20Apps%20&%20Gaming",
        destination: "https://www.microsoft.com",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
