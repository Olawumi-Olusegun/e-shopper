/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    DB_URL: 'mongodb://localhost:27017/buyit',
    API_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: 'KJSDBKJBSKJDBKSBJDK',

    STRIPE_PUBLIC_KEY: "pk_test_51Kzz4mBSyohQ7ttbTspbenL6d9AoDdjdRlqbT9bFRe7mTPllaqiBD9HjgrGhWRVst2pD13F9aizC58y2bYzcXixO00JLrLw5N9",
    STRIPE_PRIVATE_KEY: "sk_test_51Kzz4mBSyohQ7ttboR1bDzNHyQ168aa2VLrSYUuCcdZ4gHeYzsX05RkTW4iiQTYupP9DQF8yqxNnoFOFZ4fiGnnf00yMRnRuRj",
    STRIPE_WEBHOOK_SECRET: "whsec_c469ebeaa230cc07e4a1a3fdb9968ae98c6cb609f9f64fad44a827f2dc83338d",

    CLOUD_NAME: "ds4j2xrix",
    CLOUDINARY_API_KEY: "663418297923966",
    CLOUDINARY_API_SECRET: "ST04qz_jxLHmLam0daR4vV7QW5M",
  },
  images: {
    domains: ['res.cloudinary.com']
  }
}

module.exports = nextConfig
