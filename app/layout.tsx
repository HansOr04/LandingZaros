import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Zaros Latam – Programa Intensivo Internacional",
  description:
    "El programa de liderazgo estratégico femenino más transformador de América Latina. Método 3C validado con +200 mujeres. Plazas limitadas.",
  keywords:
    "liderazgo femenino, programa intensivo, método 3C, Zaros Latam, América Latina",
  openGraph: {
    title: "Zaros Latam – Programa Intensivo Internacional",
    description: "No es un curso. Es transformación estructurada.",
    url: "https://zaros-latam.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${cormorant.variable} ${dmSans.variable}`}>
        {children}
      </body>
    </html>
  );
}
