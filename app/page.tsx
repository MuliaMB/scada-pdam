'use client'; 

import React, { useEffect } from 'react'; 
import { Droplets, FileText, UserPlus } from 'lucide-react'; 
import Link from 'next/link';
import Image from 'next/image'; // Komponen ini sudah diimpor
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

export default function PDAMWelcomeSmallerGlass() {
  
  // --- INISIALISASI AOS ---
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true, 
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white flex items-center justify-center p-4">
      
      {/* --- Outer Container with Glass Effect --- */}
      <div 
        className="relative z-10 
                   bg-white/30 backdrop-blur-lg border border-white/50 
                   rounded-[3rem] md:rounded-[4rem] lg:rounded-[5rem] 
                   p-8 md:p-10 lg:p-12 max-w-4xl w-full mx-auto 
                   shadow-2xl shadow-blue-300/60 overflow-hidden"
        data-aos="fade-up" 
      >
          
        {/* Main Content Area (Split Left & Right) */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Left Section: Image / Illustration (fade-right) */}
          <div 
            className="relative hidden md:flex items-center justify-center p-4" 
            data-aos="fade-right" 
            data-aos-delay="200"
          > 
             {/* Blok Kode yang Diperbaiki (Menggunakan Next.js <Image>) */}
             {/* Baris 44 berada di sekitar sini */}
            <div className="p-8 bg-blue-100/50 rounded-full">
              <Image 
                src="/logo-pdam.png" // Path ke logo Anda di folder /public
                alt="Logo PDAM"
                width={500} // Tentukan lebar yang wajar untuk logo di sini
                height={500} // Tentukan tinggi yang wajar untuk logo di sini
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right Section: Text Content & CTA (fade-left) */}
          <div 
            className="flex flex-col justify-center items-center text-center md:text-left"
            data-aos="fade-left" 
            data-aos-delay="400"
          >
            <div className="max-w-sm w-full"> 
              
              {/* Logo */}
              <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900">
                  PDAM <span className="text-blue-600">Tirta Musi</span>
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                Air Bersih, <br />
                Untuk <span className="text-blue-600">Setiap Keluarga</span>
              </h1>
              
              {/* Sub-headline */}
              <p className="text-base text-gray-700 mb-8 leading-relaxed">
                Nikmati kemudahan layanan air bersih dengan sistem manajemen modern dan transparan.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <Link 
                  href="/login"
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-200 flex items-center justify-center gap-2 text-sm"
                >
                  <FileText className="w-4 h-4" />
                  Login
                </Link>
                {/* Tambahkan tombol Daftar Baru agar konsisten */}
                <Link 
                  href="/register"
                  className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-300 text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-md shadow-gray-200 flex items-center justify-center gap-2 text-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  Daftar Baru
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* --- FOOTER (dalam Glassmorphism card) --- */}
        <footer 
          className="mt-8 pt-4 border-t border-white/50 text-center text-xs text-gray-600"
          data-aos="fade-up"
          data-aos-delay="1200"
        >
          © 2024 PDAM Tirta Jaya. Hak Cipta Dilindungi.
        </footer>

      </div> {/* End of Glass Effect Oval Container */}

    </div>
  );
}