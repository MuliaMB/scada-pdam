'use client';

import React, { useState, useEffect } from 'react';
import { 
  Waves, Gauge, Activity, Droplet, AlertTriangle, 
  Zap, Settings, ArrowUp, ArrowDown, RefreshCw, LucideIcon
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Line
} from 'recharts';
import { motion } from 'framer-motion';

// --- Types & Interfaces ---
interface PumpData {
  id: string;
  name: string;
  status: 'ON' | 'OFF' | 'FAULT';
  load: number;
  rpm: number;
  temp: number;
}

interface WaterQuality {
  ph: number;
  turbidity: number;
  tds: number;
}

interface Alarm {
  id: number;
  type: 'WARNING' | 'CRITICAL';
  message: string;
  timestamp: string;
  component: string;
}

// --- MOCK DATA GENERATORS ---
const generateSparklineData = () => 
  Array.from({ length: 20 }, (_, i) => ({ time: i, value: 50 + Math.random() * 30 }));

const generatePressureData = () => 
  Array.from({ length: 24 }, (_, i) => ({ 
    time: `${i}:00`, 
    pressure: 2.8 + Math.random() * 1.5,
    threshold: 4.5 
  }));

// --- SUB-COMPONENTS ---

interface KPICardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: LucideIcon;
  color: string;
  trend: 'up' | 'down';
  trendValue: number;
}

const KPICard = ({ title, value, unit, icon: Icon, color, trend, trendValue }: KPICardProps) => {
  const data = generateSparklineData();
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wide">{title}</p>
          <div className="flex items-baseline gap-1 mt-1">
            <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
            <span className="text-sm font-medium text-slate-400">{unit}</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <span className={`flex items-center text-xs font-bold ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trend === 'up' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
          {trendValue}%
        </span>
        <span className="text-xs text-slate-400">vs last hour</span>
      </div>

      <div className="h-16 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3b82f6" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill={`url(#grad-${title})`} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

const ReservoirWidget = ({ levelM, levelPct }: { levelM: number, levelPct: number }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col items-center">
    <h3 className="text-slate-600 font-semibold mb-6 w-full text-left flex items-center gap-2">
      <Droplet className="w-5 h-5 text-blue-500" /> Reservoir Level
    </h3>
    <div className="flex gap-8 items-end h-64 w-full justify-center">
      <div className="relative w-24 h-56 bg-slate-100 rounded-lg border-2 border-slate-300 overflow-hidden">
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-blue-500 bg-opacity-80 w-full"
          initial={{ height: 0 }}
          animate={{ height: `${levelPct}%` }}
          transition={{ type: "spring", bounce: 0, duration: 2 }}
        >
          <div className="absolute top-0 w-full h-2 bg-blue-400 opacity-50 animate-pulse" />
        </motion.div>
        <div className="absolute right-0 top-0 bottom-0 w-full flex flex-col justify-between py-2 px-1 pointer-events-none">
          {[100, 75, 50, 25, 0].map(mark => (
            <div key={mark} className="w-full border-t border-slate-400/30 text-[10px] text-right pr-1 text-slate-500">
              {mark === 0 || mark === 100 ? mark + '%' : '-'}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-center">
          <span className="text-xs text-slate-400 uppercase">Height</span>
          <p className="text-3xl font-bold text-slate-800">{levelM.toFixed(1)} <span className="text-base font-normal text-slate-400">m</span></p>
        </div>
        <div className="text-center">
          <span className="text-xs text-slate-400 uppercase">Capacity</span>
          <p className="text-3xl font-bold text-blue-600">{levelPct.toFixed(0)} <span className="text-base font-normal text-blue-400">%</span></p>
        </div>
      </div>
    </div>
  </div>
);

const PumpWidget = ({ pump }: { pump: PumpData }) => (
  <div className="bg-white rounded-lg border border-slate-100 p-4 flex items-center justify-between hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
        pump.status === 'ON' ? 'bg-emerald-100 text-emerald-600' : 
        pump.status === 'FAULT' ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-400'
      }`}>
        <RefreshCw className={`w-6 h-6 ${pump.status === 'ON' ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
      </div>
      <div>
        <h4 className="font-bold text-slate-700">{pump.name}</h4>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
          pump.status === 'ON' ? 'bg-emerald-100 text-emerald-700' : 
          pump.status === 'FAULT' ? 'bg-red-100 text-red-700' : 'bg-slate-200 text-slate-600'
        }`}>
          {pump.status}
        </span>
      </div>
    </div>
    {pump.status === 'ON' && (
      <div className="text-right space-y-1">
        <div className="text-xs text-slate-500">Load: <span className="font-semibold text-slate-700">{pump.load}%</span></div>
        <div className="text-xs text-slate-500">RPM: <span className="font-semibold text-slate-700">{pump.rpm}</span></div>
      </div>
    )}
  </div>
);

// --- MAIN DASHBOARD PAGE ---
export default function SCADADashboard() {
  const [mounted, setMounted] = useState(false);
  const [flowRate, setFlowRate] = useState(125.5);
  const [pressure, setPressure] = useState(4.2);
  const [level, setLevel] = useState(78);
  const [waterQuality, setWaterQuality] = useState<WaterQuality>({ ph: 7.2, turbidity: 2.1, tds: 145 });
  const [alarms] = useState<Alarm[]>([
    { id: 1, type: 'CRITICAL', message: 'Pump B Overheat Warning', timestamp: '10:24 AM', component: 'Pump Intake B' },
    { id: 2, type: 'WARNING', message: 'Pressure Drop - Zone 4', timestamp: '09:15 AM', component: 'Distribution Net' },
  ]);

  const pumps: PumpData[] = [
    { id: '1', name: 'Intake Pump A', status: 'ON', load: 85, rpm: 1450, temp: 45 },
    { id: '2', name: 'Intake Pump B', status: 'FAULT', load: 0, rpm: 0, temp: 82 },
    { id: '3', name: 'Dist. Pump A', status: 'ON', load: 62, rpm: 1200, temp: 40 },
    { id: '4', name: 'Dist. Pump B', status: 'OFF', load: 0, rpm: 0, temp: 28 },
  ];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setFlowRate(prev => +(prev + (Math.random() * 2 - 1)).toFixed(1));
      setPressure(prev => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(2));
      setLevel(prev => {
        const move = Math.random() * 0.5 - 0.25;
        const newVal = prev + move;
        return newVal > 100 ? 100 : newVal < 0 ? 0 : +newVal.toFixed(1);
      });
      setWaterQuality(prev => ({
        ph: +(prev.ph + (Math.random() * 0.1 - 0.05)).toFixed(2),
        turbidity: +(prev.turbidity + (Math.random() * 0.2 - 0.1)).toFixed(2),
        tds: Math.floor(prev.tds + (Math.random() * 4 - 2))
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-6"> 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Flow Rate" value={flowRate} unit="L/s" icon={Waves} color="bg-blue-500" trend="up" trendValue={2.4} />
        <KPICard title="Network Pressure" value={pressure} unit="Bar" icon={Gauge} color="bg-cyan-500" trend="down" trendValue={0.8} />
        <KPICard title="Avg Turbidity" value={waterQuality.turbidity} unit="NTU" icon={Activity} color="bg-purple-500" trend="up" trendValue={0.1} />
        <KPICard title="Power Usage" value={345} unit="kW" icon={Zap} color="bg-amber-500" trend="up" trendValue={1.2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">System Pressure Overview</h3>
              <p className="text-sm text-slate-500">24-Hour Trend Analysis</p>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={generatePressureData()}>
                <defs>
                  <linearGradient id="colorPressure" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} domain={[0, 6]} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="pressure" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorPressure)" />
                <Line type="monotone" dataKey="threshold" stroke="#ef4444" strokeDasharray="5 5" strokeWidth={1} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="space-y-6">
          <ReservoirWidget levelM={level * 0.05} levelPct={level} />
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="text-slate-600 font-semibold mb-4">Water Quality</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-xs text-slate-500">pH Level</span>
                <p className="text-xl font-bold text-slate-800">{waterQuality.ph}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <span className="text-xs text-slate-500">TDS (ppm)</span>
                <p className="text-xl font-bold text-slate-800">{waterQuality.tds}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2"><Settings className="w-5 h-5" /> Pump Station Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pumps.map(pump => <PumpWidget key={pump.id} pump={pump} />)}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-red-500" /> Active Alarms</h3>
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">{alarms.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto max-h-[250px] p-2">
            {alarms.map(alarm => (
              <div key={alarm.id} className="mb-2 p-3 rounded-lg border-l-4 border-l-red-500 bg-red-50 flex justify-between items-start">
                <div>
                  <h5 className="font-bold text-slate-800 text-sm">{alarm.component}</h5>
                  <p className="text-xs text-red-700 mt-1">{alarm.message}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{alarm.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}