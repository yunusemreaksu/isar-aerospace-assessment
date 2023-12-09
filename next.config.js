/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/assignment-a",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
