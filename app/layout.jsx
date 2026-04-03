import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  metadataBase: new URL("https://piyushraval.com"),
  title: {
    default: "Piyush Raval | Full Stack Developer & AI Enthusiast",
    template: "%s | Piyush Raval"
  },
  description: "Official portfolio of Piyush Raval, a Full Stack Developer specializing in React, Next.js, and AI-driven web applications. Discover cutting-edge projects and insights on modern web development.",
  keywords: ["Piyush Raval", "piyushraval", "piyushrava", "Piyushraval Mernstack Developer", "Full Stack Developer", "Software Engineer", "React Developer India"],
  authors: [{ name: "Piyush Raval", url: "https://github.com/PiyushRaval247" }],
  creator: "Piyush Raval",
  publisher: "Piyush Raval",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://piyushraval.com",
    siteName: "Piyush Raval Portfolio",
    title: "Piyush Raval | Full Stack Developer",
    description: "Explore the technical expertise and creative projects of Piyush Raval, a passionate full stack developer building the future of the web.",
    images: [
      {
        url: "/og-image.png", // Ensure this exists in public/ or is a valid URL
        width: 1200,
        height: 630,
        alt: "Piyush Raval Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Piyush Raval | Full Stack Developer",
    description: "Building modern, high-performance web applications with React and Next.js.",
    creator: "@PiyushRaval", // Update if you have a handle
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Piyush Raval",
  "url": "https://piyushraval.com",
  "image": "https://piyushraval.com/og-image.png",
  "sameAs": [
    "https://github.com/PiyushRaval247",
    "https://linkedin.com/in/piyush-raval",
  ],
  "jobTitle": "Full Stack Developer",
  "description": "Full Stack Developer specializing in React, Next.js, and modern web architectures.",
  "knowsAbout": [
    "Web Development",
    "JavaScript",
    "React",
    "Next.js",
    "Supabase",
    "AI Integration",
    "Tailwind CSS"
  ]
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
      <body className="antialiased font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
