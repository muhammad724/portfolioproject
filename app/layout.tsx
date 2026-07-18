import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Maviya - Full Stack Developer",
  description:
    "Premium Full Stack Developer Portfolio showcasing MERN stack expertise, projects, and certifications.",
  keywords: [
    "Full Stack Developer",
    "MERN Stack",
    "React",
    "Next.js",
    "Node.js",
    "Portfolio",
  ],
  authors: [{ name: "Maviya", url: "https://maviya.dev" }],
  creator: "Maviya",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://maviya.dev",
    title: "M.Maviya - Full Stack Developer",
    description:
      "Premium Full Stack Developer Portfolio showcasing MERN stack expertise",
    siteName: "M.Maviya Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
      </head>
      <body className="h-full antialiased bg-white text-gray-900 dark:bg-primary-bg dark:text-primary-light transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
