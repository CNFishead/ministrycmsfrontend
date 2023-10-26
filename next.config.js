/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: `https://api.shepherdcms.org/api/v1`,
    ENV: "production",
    // ENV: "development",
  },
  //Redirect / to /dash
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/home',
        permanent: true,
      },
    ];
  },
  images: {
    // localhost:5000
    domains: ["localhost", "api.shepherdcms.org"],
  },

}

module.exports = nextConfig
