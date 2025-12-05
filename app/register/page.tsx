'use client'; 

import React, { useState } from 'react';
import { UserPlus, Mail, Phone, ArrowRight, Loader2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // State untuk form
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [telepon, setTelepon] = useState('');


  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // --- SIMULASI LOGIC PENDAFTARAN ---
    setTimeout(() => {
      setIsLoading(false);
      
      // Biasanya di sini ada validasi dan API call
      alert(`Pendaftaran Awal Sukses! Kami akan memproses data ${nama}.`); 
      
      // Arahkan kembali ke halaman login atau utama
      router.push('/login'); 
      
    }, 2000); // Waktu delay simulasi
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      
      {/* Container Register Card */}
      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 w-full max-w-md overflow-hidden">
        
        {/* Header Biru */}
        <div className="bg-blue-600 p-6 text-center relative">
          <Link href="/" className="absolute top-4 left-4 text-blue-100 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-xl font-bold text-white mt-1 flex items-center justify-center gap-2">
            <UserPlus className="w-5 h-5" /> PENDAFTARAN BARU
          </h2>
        </div>

        {/* Form Section */}
        <div className="p-6">
          <form onSubmit={handleRegister} className="space-y-5">
            
            {/* Input Nama Lengkap */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 block">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <UserPlus className="w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Nama Lengkap Anda"
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>

            {/* Input Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 block">Email</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@contoh.com"
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>

            {/* Input No. Telepon */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 block">Nomor Telepon</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input 
                  type="tel" 
                  required
                  value={telepon}
                  onChange={(e) => setTelepon(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>


            {/* Tombol Register */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm disabled:bg-green-400 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Mengirim Data...
                </>
              ) : (
                <>
                  Daftar Sekarang
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Card */}
          <div className="mt-6 text-center pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Sudah memiliki akun?{' '}
              <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}