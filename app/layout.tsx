import type { Metadata } from "next";
// Import Poppins
import { Poppins } from "next/font/google";
// Jika Anda masih ingin menggunakan Geist untuk font mono, biarkan saja
import { Geist_Mono } from "next/font/google"; 
import "./globals.css";

// 1. Definisikan Poppins sebagai font utama (sans-serif)
const poppins = Poppins({
  variable: "--font-poppins", // Menggunakan nama variabel baru
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'], // Pilih bobot yang Anda gunakan
});

// Anda bisa menghapus Geist jika tidak lagi membutuhkannya.
// const geistSans = Geist({ ... });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PDAM-Monitoring", // Diubah agar lebih relevan
  description: "Aplikasi Manajemen PDAM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        // 2. Terapkan Poppins sebagai font utama dan pertahankan font mono
        // Ganti geistSans.variable dengan poppins.variable
        className={`${poppins.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}