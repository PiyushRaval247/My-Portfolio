import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Piyush Raval - Full Stack Developer Portfolio",
  description: "Welcome to the portfolio of Piyush Raval, a passionate full stack web developer specializing in React, Tailwind CSS, JavaScript, and modern web technologies.",
  keywords: "Piyush Raval, Full Stack Developer, Frontend Developer, Web Developer, React, JavaScript, Tailwind CSS, Portfolio, Developer Portfolio",
  authors: [{ name: "Piyush Raval" }],
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  alternates: {
    canonical: "https://piyush-raval.vercel.app",
  },
  openGraph: {
    title: "Piyush Raval - Full Stack Developer Portfolio",
    description: "Explore the projects and skills of Piyush Raval, a passionate full stack developer skilled in React, Tailwind CSS, and JavaScript.",
    type: "website",
    url: "https://piyush-raval.vercel.app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Piyush",
  "jobTitle": "Full Stack Developer",
  "worksFor": {
    "@type": "Organization",
    "name": "Freelance"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
