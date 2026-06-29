import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata = {
  title: "@DevX — Web Development, SEO & Growth Marketing",
  description: "Web development, SEO, Google Ads, and content — engineered like infrastructure, monitored like one too.",
  icons: {
    icon: "/icon.png",
    shortcut: "/devxlogo.ico",
    apple: "/devxlogo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body bg-ink text-paper antialiased">{children}</body>
    </html>
  );
}