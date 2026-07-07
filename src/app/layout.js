import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";

/* Load Inter with all needed weights */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Creative Attempt — Meme Collecting Platform",
    template: "%s | Creative Attempt",
  },
  description:
    "A place to display your creativity. Post, collect and sell your artwork on Creative Attempt.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
