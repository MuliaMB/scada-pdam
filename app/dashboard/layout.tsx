import React from 'react';
import Sidebar from '../component/sidebar';
import ClientTaskbarWrapper from './taskbar';

export default function DashboardLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50"> 
      <Sidebar /> 
      <div className="flex-1 flex flex-col overflow-y-auto">
        <ClientTaskbarWrapper />
        <main className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            {children} 
        </main>
      </div>
    </div>
  );
}