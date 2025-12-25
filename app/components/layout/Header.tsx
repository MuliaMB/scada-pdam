'use client';

import React from 'react';
import { Menu, Waves } from 'lucide-react';
import { useSidebar } from '@/app/context/SidebarContext';
import ConnectionStatus from '../ui/ConnectionStatus';

export default function Header() {
  const { toggleMobileSidebar, isOnline } = useSidebar(); 

  return (
    <header className="lg:hidden bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <Waves size={20} />
        </div>
        <h1 className="text-xl font-bold text-slate-800">SCADA</h1>
      </div>
      <div className="flex items-center gap-4">
        <ConnectionStatus isOnline={isOnline} /> {/* Add the status indicator */}
        <button 
          onClick={toggleMobileSidebar} 
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}
