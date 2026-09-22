import type { Metadata } from "next";
import { Bebas_Neue, Inter, Caveat } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-script",
  weight: ["600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Travel Stories — Cinematic Travel Video Editor & Colorist",
  description:
    "I help creators, brands and businesses turn raw footage into cinematic, engaging stories for Instagram, YouTube and social media. Travel video editing, color grading and social media editing.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${inter.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
