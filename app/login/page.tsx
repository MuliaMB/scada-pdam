'use client'; 

import React, { useState } from 'react';
import { User, Lock, ArrowRight, Loader2, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // --- SIMULASI LOGIC LOGIN ---
    setTimeout(() => {
      setIsLoading(false);
      
      if (username === 'pdam' && password === '12345') {
        alert("Login Sukses!"); 
        // Arahkan ke halaman Dashboard
        router.push('/dashboard'); 
      } else {
         alert("Login Gagal! Username/Password salah. (Gunakan pdam/12345)");
      }
    }, 1500); // Waktu delay simulasi
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      
      {/* Container Login Card (Sederhana dan Fokus) */}
      <div className="bg-white rounded-xl shadow-2xl border border-gray-100 w-full max-w-sm overflow-hidden">
        
        {/* Header Biru */}
        <div className="bg-blue-600 p-6 text-center relative">
          <Link href="/" className="absolute top-4 left-4 text-blue-100 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-xl font-bold text-white mt-1">MASUK</h2>
        </div>

        {/* Form Section */}
        <div className="p-6">
          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Input Username */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 block">ID Pelanggan / Username</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <User className="w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="ID Anda"
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                 <label className="text-sm font-medium text-gray-700 block">Kata Sandi</label>
                 <a href="#" className="text-xs text-blue-600 hover:underline">Lupa sandi?</a>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                />
              </div>
            </div>

            {/* Tombol Login */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  Masuk 
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer Card */}
          <div className="mt-6 text-center pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Belum punya akun?{' '}
              <Link href="#" className="text-blue-600 font-semibold hover:underline">
                Daftar Pasang Baru
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}