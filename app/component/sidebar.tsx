'use client';

import React, { useState } from 'react';
import { 
  Waves, Gauge, Activity, Droplet, 
  Settings, ChevronLeft, ChevronRight,
  LayoutDashboard, Database, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Daftar Menu Navigasi
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Activity, label: 'System Analytics', active: false },
    { icon: Droplet, label: 'Water Level', active: false },
    { icon: Database, label: 'Pump Station', active: false },
    { icon: AlertCircle, label: 'Alarms', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <motion.aside 
      // Animasi lebar sidebar saat di-click
      initial={false}
      animate={{ width: isCollapsed ? 80 : 320 }}
      className="h-screen sticky top-0 bg-white border-r border-slate-200 flex flex-col transition-all duration-300 ease-in-out hidden lg:flex"
    >
      {/* Header Sidebar */}
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="flex items-center gap-3"
          >
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Waves size={20} />
            </div>
            <h1 className="text-xl font-bold text-slate-800">SCADA</h1>
          </motion.div>
        )}
        
        {/* Tombol Toggle Collapse */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors ${isCollapsed ? 'mx-auto' : ''}`}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* List Menu */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`
              flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all group
              ${item.active ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'}
            `}
          >
            <item.icon size={22} className={item.active ? 'text-blue-600' : 'group-hover:text-blue-500'} />
            
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-medium whitespace-nowrap"
              >
                {item.label}
              </motion.span>
            )}

            {/* Tooltip saat collapsed */}
            {isCollapsed && (
              <div className="absolute left-20 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                {item.label}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer / Status Mini */}
      {!isCollapsed ? (
        <div className="p-6 border-t border-slate-100">
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase">System Status</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-sm font-semibold text-slate-700">All Systems Normal</p>
          </div>
        </div>
      ) : (
        <div className="p-6 border-t border-slate-100 flex justify-center">
             <div className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
      )}
    </motion.aside>
  );
}