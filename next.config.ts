import type { NextConfig } from "next";

const tdmHeaders = [
  { key: "X-TDM-Reservation", value: "reserved" },
  { key: "X-Licence", value: "CC-BY-NC-4.0" },
  {
    key: "Link",
    value: '<https://creativecommons.org/licenses/by-nc/4.0/>; rel="license"',
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
];

const legacyRedirects = [
  { source: "/index.html", destination: "/" },
  { source: "/index.asp", destination: "/" },
  { source: "/index_old.asp", destination: "/" },
  { source: "/default.asp", destination: "/" },
  { source: "/contacts.htm", destination: "/contact" },
  { source: "/licenses.htm", destination: "/open-database/licence" },
  { source: "/open-database/licence/full", destination: "https://creativecommons.org/licenses/by-nc/4.0/legalcode" },
  { source: "/sitemap.htm", destination: "/" },
  { source: "/links.htm", destination: "/about" },
  { source: "/about/:path+", destination: "/about" },
  { source: "/downloads/:path+", destination: "/releases" },
  { source: "/downloads", destination: "/releases" },
  { source: "/modular/:path+", destination: "/projects" },
  { source: "/modular", destination: "/projects" },
  { source: "/guest/:path+", destination: "/about" },
  { source: "/guest", destination: "/about" },
  { source: "/articles/:path+", destination: "/archive" },
  { source: "/articles", destination: "/archive" },
  { source: "/events/:path+", destination: "/archive" },
  { source: "/events", destination: "/archive" },
  { source: "/database/:path+", destination: "/open-database" },
  { source: "/database", destination: "/open-database" },
  { source: "/stream/:path+", destination: "/open-database" },
  { source: "/mp3/:path+", destination: "/open-database" },
  { source: "/tracks/:path+", destination: "/open-database" },
  { source: "/cgi-bin/:path+", destination: "/" },
  { source: "/public/:path+", destination: "/" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/dataset.json", headers: tdmHeaders },
      { source: "/dataset.csv", headers: tdmHeaders },
      { source: "/audio/:path+", headers: tdmHeaders },
    ];
  },
  async redirects() {
    return legacyRedirects.map((redirect) => ({
      ...redirect,
      permanent: true,
    }));
  },
};

export default nextConfig;
