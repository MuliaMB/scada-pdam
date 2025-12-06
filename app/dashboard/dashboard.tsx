// DashboardDebitAir.jsx (Contoh React Component)

'use client'; 

import React, { useState, useEffect } from 'react';
import { Water, Droplet, Gauge, Activity, TrendingUp, AlertTriangle, Map, Zap } from 'lucide-react';

// Data statis untuk simulasi tampilan
const criticalMeters = [
    { id: 1, name: 'Pompa Intake A', currentFlow: 125, pressure: 5.2, status: 'Normal', unit: 'L/s' },
    { id: 2, name: 'Distribusi Zona B', currentFlow: 88, pressure: 3.1, status: 'Peringatan', unit: 'L/s' },
    { id: 3, name: 'Reservoir Utama', currentFlow: 210, pressure: 4.8, status: 'Normal', unit: 'L/s' },
];

const totalFlowRate = criticalMeters.reduce((sum, meter) => sum + meter.currentFlow, 0);

// --- KOMPONEN BANTU: KARTU INDIKATOR UTAMA ---
interface IndicatorCardProps {
    title: string;
    value: string | number;
    unit: string;
    icon: React.ElementType;
    color: string;
}
const IndicatorCard: React.FC<IndicatorCardProps> = ({ title, value, unit, icon: Icon, color }) => (
    <div className={`bg-white p-5 rounded-xl shadow-lg border-l-4 ${color} transition-all hover:shadow-xl`}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <h3 className="text-3xl font-extrabold text-gray-900 mt-1">
                    {value}
                    <span className="text-base font-semibold text-gray-500 ml-1">{unit}</span>
                </h3>
            </div>
            <Icon className={`w-8 h-8 ${color.replace('border-', 'text-')} opacity-70`} />
        </div>
    </div>
);

// --- KOMPONEN BANTU: ALERT KRITIS ---
interface AlertItemProps {
    meter: string;
    message: string;
    time: string;
}
const AlertItem: React.FC<AlertItemProps> = ({ meter, message, time }) => (
    <div className="flex items-start justify-between p-3 border-b last:border-b-0 hover:bg-red-50 transition-colors">
        <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <div>
                <p className="text-sm font-semibold text-gray-800">{meter}</p>
                <p className="text-xs text-red-600">{message}</p>
            </div>
        </div>
        <span className="text-xs text-gray-500 mt-0.5">{time}</span>
    </div>
);


// --- KOMPONEN UTAMA DASHBOARD ---
export default function DashboardDebitAir() {
    const [alarms] = useState([
        { meter: 'Distribusi Zona B', message: 'Debit di bawah ambang batas minimum (Low Flow)', time: '08:30' },
        { meter: 'Pompa Intake A', message: 'Konsumsi Daya Tinggi (Potential Clogging)', time: '07:45' },
    ]);

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            
            {/* Header Dashboard */}
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <Water className="w-7 h-7 text-blue-600" />
                    SCADA PDAM: Monitoring Debit Air
                </h1>
                <p className="text-gray-500 mt-1">Status Operasional Real-Time | Terakhir diperbarui: {new Date().toLocaleTimeString('id-ID')}</p>
            </header>

            {/* Bagian 1: Indikator Kritis (KPIs) */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <IndicatorCard 
                    title="Total Debit Sistem"
                    value={totalFlowRate}
                    unit="L/s"
                    icon={Gauge}
                    color="border-blue-600"
                />
                <IndicatorCard 
                    title="Reservoir Utama Level"
                    value={78}
                    unit="%"
                    icon={Droplet}
                    color="border-teal-500"
                />
                <IndicatorCard 
                    title="Volume Harian"
                    value={'12,450'}
                    unit="m³"
                    icon={Activity}
                    color="border-indigo-600"
                />
                <IndicatorCard 
                    title="Pompa Aktif"
                    value={3}
                    unit="/ 4 Unit"
                    icon={Zap}
                    color="border-yellow-600"
                />
            </div>

            {/* Bagian 2: Grafik & Peta (Flex Layout) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                
                {/* Kolom Kiri - Peta GIS Simulasikan */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Map className="w-5 h-5 text-gray-600" /> Peta Lokasi Kritis & Status
                    </h2>
                    <div className="h-96 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
                        [Placeholder: Peta GIS Interaktif Menampilkan Titik Pompa (Hijau/Merah)]
                    </div>
                </div>

                {/* Kolom Kanan - Alarm Kritis */}
                <div className="lg:col-span-1 bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-red-600 text-white p-4 font-bold flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" /> ALARM AKTIF (Perlu Tindakan)
                    </div>
                    <div className="divide-y divide-gray-100">
                        {alarms.length > 0 ? (
                            alarms.map((alarm, index) => (
                                <AlertItem key={index} {...alarm} />
                            ))
                        ) : (
                            <p className="p-4 text-sm text-gray-500">Tidak ada alarm aktif saat ini.</p>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Bagian 3: Detail Metering dan Tren */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Kolom Kiri: Tabel Detail Debit Kritis */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Droplet className="w-5 h-5 text-gray-600" /> Detail Metering Kritis
                    </h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Debit (L/s)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tekanan (Bar)</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {criticalMeters.map((meter) => (
                                <tr key={meter.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{meter.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">{meter.currentFlow}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{meter.pressure}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            meter.status === 'Normal' ? 'bg-green-100 text-green-800' : 
                                            meter.status === 'Peringatan' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {meter.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Kolom Kanan: Grafik Tren Simulasikan */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-gray-600" /> Tren Debit 24 Jam
                    </h2>
                    <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-500 rounded-lg">
                        [Placeholder: Line Chart Debit vs. Waktu]
                    </div>
                </div>
            </div>
            
        </div>
    );
}