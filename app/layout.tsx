import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

// Main color: #627dff

export const metadata: Metadata = {
  icons: "/dollar.png",
  title: "Prestamón | Web App",
  description: "Aplicación web para hacer prestamos a las personas.",
};

const montserrat = Montserrat({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased bg-zinc-100 relative mt-12`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
