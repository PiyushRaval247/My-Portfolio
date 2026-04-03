import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  metadataBase: new URL("https://piyushraval.com"),
  title: {
    default: "Piyush Raval | MERN Stack Developer & Full Stack Engineer",
    template: "%s | Piyush Raval"
  },
  description: "Explore the professional portfolio of Piyush Raval, an elite MERN Stack Developer specializing in React, Next.js, and high-performance technical architectures. Delivering world-class web applications with surgical precision.",
  keywords: [
    "Piyush Raval", 
    "piyushraval", 
    "Piyush Raval MERN Stack Developer", 
    "MERN Stack Developer India", 
    "Next.js Expert Portfolio", 
    "Full Stack Engineer", 
    "Software Engineer Portfolio",
    "Piyush Press Technical Blog"
  ],
  verification: {
    google: "76hffN_oOq1K8iF4VViIcTGEaCJZIBcicaVYgrXKdrE",
  },
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
    title: "Piyush Raval | MERN Stack Developer",
    description: "Explore the technical expertise and elite projects of Piyush Raval, a passionate full-stack engineer and MERN specialist.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Piyush Raval Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Piyush Raval | MERN Stack Developer",
    description: "Building high-performance, architecturally sound web applications with React and Next.js.",
    creator: "@PiyushRaval",
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
  "jobTitle": "MERN Stack Developer & Full Stack Engineer",
  "description": "Professional Full Stack Developer specializing in MERN stack architectures, Next.js, and high-performance technical engineering.",
  "knowsAbout": [
    "MERN Stack",
    "React.js",
    "Next.js Architecture",
    "Technical Writing",
    "Supabase",
    "Surgical UI Design",
    "Full Stack Development"
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
