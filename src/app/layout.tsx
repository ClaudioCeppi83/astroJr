import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "AstroJr - Explorador Cósmico para Niños",
  description: "Aprende sobre el sistema solar de forma interactiva y divertida.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${nunito.variable} font-sans antialiased bg-slate-950 text-white selection:bg-cyan-500/30 overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
