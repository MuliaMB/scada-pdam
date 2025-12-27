'use client';

import React, { useState, useEffect } from 'react';
import {
  Waves, ChevronLeft, ChevronRight,
  LayoutDashboard, Activity, Clock, AlertCircle, List, Map
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSidebar } from '@/app/context/SidebarContext';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const {
    isCollapsed,
    toggleSidebar,
    isMobileOpen,
    closeMobileSidebar
  } = useSidebar();
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
        setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      closeMobileSidebar();
    }
  }, [pathname]);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/overview' },
    { icon: Activity, label: 'Real-Time Monitor', href: '/monitoring' },
    { icon: Clock, label: 'Historical Trends', href: '/history' },
    { icon: AlertCircle, label: 'Alarms & Events', href: '/alarms' },
    { icon: List, label: 'Device Status', href: '/devices' },
    { icon: Map, label: 'Distribution Map', href: '/map' },
  ];

  const sidebarWidth = isCollapsed ? 80 : 320;

  return (
    <>
      {/* Mobile Overlay has been removed based on user feedback */}
      
      <motion.aside 
        initial={false}
        animate={{ width: isDesktop ? sidebarWidth : 320 }}
        transition={{ ease: 'easeInOut', duration: 0.3 }}
        className={cn(
          "h-screen bg-white border-r border-slate-200 flex flex-col z-[1100]",
          "lg:sticky lg:top-0", 
          !isDesktop && "fixed top-0 left-0", 
          !isDesktop && (isMobileOpen ? "translate-x-0" : "-translate-x-full"),
          "transition-transform duration-300 ease-in-out"
        )}
      >
        {/* Header Sidebar */}
        <div className="p-6 flex items-center justify-between shrink-0">
          {!(isCollapsed && isDesktop) && (
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
          
          <button 
            onClick={toggleSidebar}
            className={cn(
                "p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors hidden lg:block",
                isCollapsed && "mx-auto"
            )}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* List Menu */}
        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
          {menuItems.map((item) => (
            <Link href={item.href} key={item.label} onClick={closeMobileSidebar}>
              <div
                className={cn(
                  "flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all group",
                  pathname === item.href ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50'
                )}
              >
                <item.icon size={22} className={cn(pathname === item.href ? 'text-blue-600' : 'group-hover:text-blue-500')} />
                
                {!(isCollapsed && isDesktop) && (
                  <span className="font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                )}

                {isCollapsed && isDesktop && (
                  <div className="absolute left-20 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                    {item.label}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </nav>

        {/* Footer / Status Mini */}
        <div className="shrink-0">
            {!(isCollapsed && isDesktop) ? (
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
        </div>
      </motion.aside>
    </>
  );
}