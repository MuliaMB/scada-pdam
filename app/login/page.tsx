'use client'; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Menggunakan icons yang sama agar konsisten
import { User, Mail, Lock, LogIn, Loader2, ChevronLeft, ArrowRight } from 'lucide-react'; 
// Asumsi Anda menggunakan `useEffect` di komponen OtpResendTimer jika diletakkan di sini.
// Karena komponen timer tidak digunakan di Login, kita hanya impor React dan useState.

// --- KOMPONEN LOGIN UTAMA ---
export default function LoginPage() {
    const router = useRouter(); 
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    // State untuk form login
    const [identifier, setIdentifier] = useState(''); // Email atau Username
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        
        // Validasi dasar
        if (!identifier || !password) {
            setErrorMessage("Email/Username dan Kata Sandi harus diisi.");
            return;
        }
        
        setIsLoading(true);

        try {
            // --- GANTI INI DENGAN PANGGILAN API ASLI KE /api/login ---
            // Saat ini menggunakan simulasi setTimeout (seperti di RegisterPage)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // SIMULASI RESPONSE API
            const responseStatus = 200; // Ganti dengan hasil fetch(response.status)
            const data = { username: 'AdminPDAM' }; // Ganti dengan hasil fetch(data)

            if (responseStatus === 200) {
                alert(`Selamat datang, ${data.username}!`);
                router.push('/dashboard'); // Arahkan ke halaman dashboard
            } else {
                setErrorMessage('Login gagal. Cek kembali kredensial Anda.');
            }

        } catch (err) {
            setErrorMessage('Jaringan error. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };
    
    // --- TAMPILAN UTAMA (LAYOUT) ---
    return (
        // Latar Belakang dan Styling Container Luar yang sama
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-50 to-blue-100 flex items-center justify-center p-4 font-poppins">
            {/* Lebar Kontainer (max-w-md agar sama persis dengan RegisterPage) */}
            <div className="relative z-10 bg-white/50 backdrop-blur-lg border border-white/80 rounded-3xl shadow-2xl shadow-blue-200/50 w-full max-w-md overflow-hidden">
                
                {/* Header Biru yang sama */}
                <div className="bg-blue-600 p-8 text-center relative">
                    <Link href="/" className="absolute top-4 left-4 text-blue-100 hover:text-white transition-colors">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <h2 className="text-2xl font-extrabold text-white mt-1 flex items-center justify-center gap-2">
                        Login
                    </h2>
                    <p className="text-sm text-blue-100 mt-1">Sistem SCADA PDAM Tirta Jaya</p>
                </div>

                {/* Form Section */}
                <div className="p-8">
                    {errorMessage && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    
                    <form onSubmit={handleLogin} className="space-y-6"> 
                        
                        {/* Input Email/Username */}
                        <InputGroup 
                            label="Email atau Username" 
                            type="text" 
                            value={identifier} 
                            onChange={setIdentifier} 
                            placeholder="Masukkan Email atau Username Anda" 
                            Icon={Mail} 
                        />
                        
                        {/* Input Password */}
                        <InputGroup 
                            label="Kata Sandi" 
                            type="password" 
                            value={password} 
                            onChange={setPassword} 
                            placeholder="Kata Sandi Anda" 
                            Icon={Lock} 
                        />

                        {/* Link Lupa Sandi */}
                        <div className="flex justify-end text-sm">
                            <Link 
                                href="/forgot-password" 
                                className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                Lupa Kata Sandi?
                            </Link>
                        </div>

                        {/* Tombol Login */}
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-300/70 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-base disabled:bg-blue-400 disabled:shadow-none disabled:cursor-not-allowed mt-8"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    Masuk 
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer Card: Register Link */}
                    <div className="mt-8 text-center pt-6 border-t border-white/50">
                        <p className="text-sm text-gray-600">
                            Belum punya akun?{' '}
                            <Link href="/register" className="text-green-600 font-bold hover:text-green-700 transition-colors">
                                Daftar Akun Baru
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- KOMPONEN BANTU: INPUT GROUP REUSABLE (DITEMPATKAN DI BAWAH) ---
// Perlu ditempatkan di file login.page.tsx ini atau dipindahkan ke komponen terpisah
interface InputGroupProps {
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    Icon: React.ElementType;
    inputClassName?: string;
    maxLength?: number;
}
const InputGroup: React.FC<InputGroupProps> = ({ label, type, value, onChange, placeholder, Icon, inputClassName = '', maxLength }) => (
    <div className="space-y-1.5">
        <label className="text-sm font-semibold text-gray-700 block">{label}</label>
        <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon className="w-5 h-5" />
            </div>
            <input 
                type={type} 
                required
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                maxLength={maxLength}
                className={`w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all text-sm shadow-inner text-gray-900 ${inputClassName}`}
            />
        </div>
    </div>
);