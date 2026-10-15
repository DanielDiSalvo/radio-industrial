import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import RadioProvider from "./components/RadioProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Radio Industrial | El sonido del underground",
  description:
    "Una señal independiente desde Buenos Aires. Industrial, EBM, dark electro, martial industrial, power electronics y noise.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} antialiased`}
    >
      <body>
        <RadioProvider>{children}</RadioProvider>
      </body>
    </html>
  );
}
