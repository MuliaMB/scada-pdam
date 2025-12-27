'use client'; 

import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, ArrowRight, Loader2, ChevronLeft, Send, CheckCircle } from 'lucide-react'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- Komponen Client untuk Inisialisasi AOS ---
const AOSInitializer: React.FC = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('aos').then((AOS) => {
                AOS.init({
                    duration: 800, 
                    once: true,    
                });
            });
        }
    }, []);
    return null;
};
// ----------------------------------------------

// --- KOMPONEN BANTU: INPUT GROUP REUSABLE (TIDAK BERUBAH) ---
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

// --- KOMPONEN BANTU: TIMER KIRIM ULANG OTP (TIDAK BERUBAH) ---
interface OtpResendTimerProps {
    otpSentTime: number | null;
    timeoutSeconds: number;
    onResend: () => void;
    isResending: boolean;
}
const OtpResendTimer: React.FC<OtpResendTimerProps> = ({ otpSentTime, timeoutSeconds, onResend, isResending }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const isReadyToResend = timeLeft === 0;

    useEffect(() => {
        if (!otpSentTime) return;

        const interval = setInterval(() => {
            const elapsedTime = (Date.now() - otpSentTime) / 1000;
            const remaining = Math.max(0, timeoutSeconds - Math.round(elapsedTime));
            setTimeLeft(remaining);

            if (remaining === 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [otpSentTime, timeoutSeconds]);

    return (
        <div className="text-center mt-4">
            {isReadyToResend ? (
                <button 
                    type="button"
                    onClick={onResend}
                    disabled={isResending}
                    className="text-blue-600 font-semibold hover:underline flex items-center justify-center gap-1 mx-auto text-sm disabled:text-gray-400 disabled:cursor-not-allowed"
                >
                    {isResending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    {isResending ? 'Mengirim Ulang...' : 'Kirim Ulang Kode OTP'}
                </button>
            ) : (
                <p className="text-sm text-gray-500">
                    Kirim ulang dalam: <span className="font-bold text-blue-600">{timeLeft}</span> detik
                </p>
            )}
        </div>
    );
};


// --- KOMPONEN REGISTER UTAMA (MULTI-STEP) ---
export default function RegisterPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1); 
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    // State untuk Data Akun 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // State untuk OTP
    const [otpCode, setOtpCode] = useState('');
    const [otpSentTime, setOtpSentTime] = useState<number | null>(null);
    const OTP_TIMEOUT_SECONDS = 60; 

    // --- LOGIC: KIRIM OTP (Step 1 Submit) ---
    const handleInitialRegistration = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (password !== confirmPassword) {
            setErrorMessage("Kata sandi dan konfirmasi kata sandi tidak cocok.");
            return;
        }
        if (password.length < 6) {
            setErrorMessage("Kata sandi minimal harus 6 karakter.");
            return;
        }
        if (!username || !email || !password || !confirmPassword) {
             setErrorMessage("Semua kolom harus diisi.");
             return;
        }

        setIsLoading(true);
        // SIMULASI API
        setTimeout(() => {
            setIsLoading(false);
            setOtpSentTime(Date.now()); 
            setCurrentStep(2); 
        }, 2000); 
    };
    
    // --- LOGIC: VERIFIKASI OTP (Step 2 Submit) ---
    const handleOtpVerification = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);

        const isOtpExpired = otpSentTime && (Date.now() - otpSentTime) > (OTP_TIMEOUT_SECONDS * 1000);
        
        if (isOtpExpired) {
            setErrorMessage("Kode OTP telah kadaluarsa. Silakan kirim ulang.");
            setIsLoading(false);
            return;
        }

        setTimeout(() => {
            setIsLoading(false);
            if (otpCode === '123456') { 
                alert(`Verifikasi Sukses! Akun ${username} telah aktif.`); 
                router.push('/login'); 
            } else {
                setErrorMessage("Kode OTP salah. Silakan coba lagi.");
            }
        }, 1500); 
    };
    
    const handleResendOtp = () => {
        setErrorMessage('');
        setOtpCode('');
        setIsLoading(true);
        setTimeout(() => {
            setOtpSentTime(Date.now()); 
            setIsLoading(false);
            alert('Kode OTP baru telah dikirimkan!');
        }, 1000);
    };
    
    // --- TAMPILAN UTAMA (RENDER) ---
    return (
        // Menggunakan h-screen dan overflow-hidden untuk mencegah scrolling.
        <div className="h-screen overflow-hidden bg-gray-50 flex items-center justify-center p-4 font-poppins relative"> 
            <AOSInitializer />
            
            <div 
                className="relative z-10 
                           bg-white border border-gray-200 
                           rounded-2xl shadow-xl shadow-gray-200/80 
                           w-full 
                           max-w-sm           /* DIKECILKAN KE max-w-sm */
                           overflow-hidden 
                           transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-duration="600"
            >
                
                {/* Header Sederhana (Biru Solid) */}
                <div className="bg-blue-600 p-6 text-center relative">
                    <Link href="/" className="absolute top-4 left-4 text-white hover:opacity-80 transition-opacity">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    
                    <div data-aos="zoom-in" data-aos-delay="300" className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center mb-2 shadow-lg">
                        {currentStep === 1 ? <User className="w-6 h-6 text-blue-600" /> : <Mail className="w-6 h-6 text-blue-600" />}
                    </div>

                    <h2 className="text-xl font-bold text-white" data-aos="fade-left" data-aos-delay="500">
                        {currentStep === 1 ? 'Registrasi Akun' : 'VERIFIKASI EMAIL'}
                    </h2>
                    <p className="text-xs text-blue-100 mt-1 font-medium">
                        Langkah {currentStep} dari 2
                    </p>
                </div>

                {/* Form Section */}
                <div className="p-6">
                    {errorMessage && (
                        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm" role="alert" data-aos="fade-down">
                            {errorMessage}
                        </div>
                    )}
                    
                    {/* --- LANGKAH 1: INPUT DATA AKUN --- */}
                    {currentStep === 1 && (
                        <form onSubmit={handleInitialRegistration} className="space-y-4" data-aos="fade-up" data-aos-delay="700"> {/* space-y dikurangi */}
                            
                            {/* Baris 1: Username dan Email (Bersebelahan) */}
                            <div className="flex flex-col md:flex-row gap-4"> {/* gap dikurangi */}
                                {/* Input Username */}
                                <div className="w-full md:w-1/2">
                                    <InputGroup 
                                        label="Username" 
                                        type="text" 
                                        value={username} 
                                        onChange={setUsername} 
                                        placeholder="Pengguna Unik Anda" 
                                        Icon={User} 
                                    />
                                </div>
                                
                                {/* Input Email */}
                                <div className="w-full md:w-1/2">
                                    <InputGroup 
                                        label="Email" 
                                        type="email" 
                                        value={email} 
                                        onChange={setEmail} 
                                        placeholder="Alamat Email" 
                                        Icon={Mail} 
                                    />
                                </div>
                            </div>

                            {/* Baris 2: Password dan Konfirmasi Password (Bersebelahan) */}
                            <div className="flex flex-col md:flex-row gap-4"> {/* gap dikurangi */}
                                {/* Input Password */}
                                <div className="w-full md:w-1/2">
                                    <InputGroup 
                                        label="Kata Sandi" 
                                        type="password" 
                                        value={password} 
                                        onChange={setPassword} 
                                        placeholder="Minimal 6 karakter" 
                                        Icon={Lock} 
                                    />
                                </div>
                                
                                {/* Input Konfirmasi Password */}
                                <div className="w-full md:w-1/2">
                                    <InputGroup 
                                        label="Konfirmasi Sandi" 
                                        type="password" 
                                        value={confirmPassword} 
                                        onChange={setConfirmPassword} 
                                        placeholder="Ulangi kata sandi" 
                                        Icon={Lock} 
                                    />
                                </div>
                            </div>

                            {/* Tombol Register Step 1 */}
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-blue-600 text-white font-bold py-2.5 rounded-lg shadow-lg shadow-blue-300/70 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 text-sm disabled:bg-blue-400 disabled:shadow-none disabled:cursor-not-allowed mt-6"   /* Padding tombol dan margin atas dikurangi */
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Mendaftarkan...
                                    </>
                                ) : (
                                    <>
                                        Daftar & Kirim OTP
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {/* --- LANGKAH 2: VERIFIKASI OTP (Menggunakan class yang sudah diperkecil) --- */}
                    {currentStep === 2 && (
                        <form onSubmit={handleOtpVerification} className="space-y-4" data-aos="fade-in" data-aos-delay="200"> 
                            
                            <div className="text-center mb-4">
                                <p className="text-gray-600 text-xs mb-1">
                                    Kami telah mengirimkan kode OTP 6 digit ke:
                                </p>
                                <p className="font-bold text-blue-600 break-words text-base">{email}</p>
                            </div>
                            
                            {/* Input OTP */}
                            <InputGroup 
                                label="Kode Verifikasi OTP" 
                                type="text" 
                                value={otpCode} 
                                onChange={setOtpCode} 
                                placeholder="" 
                                Icon={CheckCircle} 
                                // TAMBAHKAN KELAS INI DI BAWAH:
                                inputClassName="tracking-[0.8rem] text-center font-bold text-base focus:placeholder-opacity-0" 
                                maxLength={6}
                            />

                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg shadow-md shadow-green-300/70 hover:bg-green-700 transition-all flex items-center justify-center gap-2 text-sm disabled:bg-green-400 disabled:shadow-none disabled:cursor-not-allowed mt-4"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Memverifikasi...
                                    </>
                                ) : (
                                    <>
                                        Verifikasi Akun
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                            
                            <OtpResendTimer 
                                otpSentTime={otpSentTime} 
                                timeoutSeconds={OTP_TIMEOUT_SECONDS} 
                                onResend={handleResendOtp}
                                isResending={isLoading}
                            />
                        </form>
                    )}

                    <div className="mt-6 text-center pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600">
                            Sudah memiliki akun?
                        </p>
                        <Link 
                            href="/login" 
                            className="inline-flex items-center justify-center mt-2 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-600 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-all shadow-md text-sm"    /* Ukuran dan padding tombol dikurangi */
                        >
                            Masuk di sini
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}