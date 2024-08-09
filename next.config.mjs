/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "flowbite.s3.amazonaws.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.istockphoto.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "image.png",
        port: "",
      },
    ],
    domains: ["s3-alpha-sig.figma.com", "img.freepik.com"],
  },
};

export default nextConfig;
