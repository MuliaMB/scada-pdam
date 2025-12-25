'use client';

import React from 'react';

interface ConnectionStatusProps {
  isOnline: boolean;
}

export default function ConnectionStatus({ isOnline }: ConnectionStatusProps) {
  return (
    <div className="flex items-center gap-2">
      <span 
        className={`w-3 h-3 rounded-full animate-pulse ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
        title={isOnline ? 'System Online' : 'System Offline'}
      />
      <span className={`text-sm font-medium ${isOnline ? 'text-slate-700' : 'text-red-600'}`}>
        {isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  );
}
