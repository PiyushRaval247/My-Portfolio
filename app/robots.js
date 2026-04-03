export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin", 
          "/admin/",
          "/login",
          "/api/"
        ],
      },
    ],
    sitemap: "https://piyushraval.com/sitemap.xml",
  };
}
