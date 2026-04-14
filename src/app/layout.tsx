import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Classificados de imóveis, carros e motos | Chaves na Mão",
  description: "Chaves na Mão: o único buscador especializado em imóveis e veículos do Brasil. Acesse e surpreenda-se com milhões de anúncios.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${urbanist.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        {modal}
      </body>
    </html>
  );
}
