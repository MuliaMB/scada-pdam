// app/dashboard/Taskbar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Waves, Bell } from 'lucide-react'; 

// Komponen Taskbar murni (hanya berisi markup)
const TaskbarComponent = ({ currentTime }: { currentTime: string }) => (
    <nav className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shadow-sm sticky top-0 z-50">
        
        {/* Kiri: Judul */}
        <div className="flex items-center gap-3">
            <Waves className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold text-slate-800">SCADA Dashboard</h1>
        </div>
        
        {/* Kanan: Notifikasi & Waktu */}
        <div className="flex items-center gap-6">
            <div className="text-right hidden md:block">
                {/* Waktu di-passing dari wrapper Client */}
                <p className="text-sm font-bold text-slate-700">{currentTime}</p> 
                <p className="text-xs text-slate-400">Live Connection • 12ms Latency</p>
            </div>
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Operator" alt="User" />
            </div>
        </div>
    </nav>
);

// Wrapper untuk menangani state Waktu (Mencegah Hydration Error)
export default function ClientTaskbarWrapper() {
    const [currentTime, setCurrentTime] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Ambil waktu setelah komponen dimuat di client
        setCurrentTime(new Date().toLocaleTimeString('id-ID'));
        
        // Agar jam berjalan real-time
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('id-ID'));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Jika belum mounted (SSR), tampilkan kosong atau placeholder
    if (!mounted) {
        return <TaskbarComponent currentTime={"--:--:--"} />;
    }

    return <TaskbarComponent currentTime={currentTime} />;
};