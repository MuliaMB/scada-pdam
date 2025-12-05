import React from 'react';
import { Droplets, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function PDAMWelcomeSmallerGlass() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white flex items-center justify-center p-4">
      {/* Background gradient untuk kesan mendalam */}
      
      {/* --- Outer Container with Glass Effect & Smaller Oval Shape --- */}
      <div className="relative z-10 
                      bg-white/30 backdrop-blur-lg border border-white/50 
                      
                      /* CLASS BARU UNTUK UKURAN LEBIH KECIL */
                      rounded-[3rem] md:rounded-[4rem] lg:rounded-[5rem] /* Kebulatan dikurangi */
                      p-8 md:p-10 lg:p-12 /* Padding dikurangi */
                      max-w-4xl w-full mx-auto /* Lebar Maksimum dikurangi dari 7xl ke 4xl */
                      
                      shadow-2xl shadow-blue-300/60 
                      overflow-hidden">
          
        {/* Main Content Area (Split Left & Right) */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* Left Section: Image / Illustration */}
          <div className="relative hidden md:flex items-center justify-center p-4"> 
            <Image
              src="/logo-pdam.png"
              alt="Ilustrasi SCADA PDAM"
              width={600} 
              height={600} 
              priority
              className="object-contain max-h-[70vh] w-auto h-auto"
            />
          </div>

          {/* Right Section: Text Content & CTA */}
          <div className="flex flex-col justify-center items-center text-center md:text-left">
            <div className="max-w-sm w-full"> {/* Gunakan max-w-sm agar konten teks lebih ringkas */}
              {/* Logo */}
              <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold tracking-tight text-gray-900">
                  PDAM <span className="text-blue-600">Tirta Jaya</span>
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
              </div>
            </div>
          </div>
        </main>

        {/* --- FOOTER (dalam Glassmorphism card) --- */}
        <footer className="mt-8 pt-4 border-t border-white/50 text-center text-xs text-gray-600">
          © 2024 PDAM Tirta Jaya. Hak Cipta Dilindungi.
        </footer>

      </div> {/* End of Glass Effect Oval Container */}

    </div>
  );
}