'use client';

import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, ArrowDown, Search, Loader2,
  Signal, Thermometer, Droplet, Gauge, Activity
} from 'lucide-react';

interface LiveData {
  device_id: string;
  location: string;
  pressure: number; 
  flow: number; 
  level: number; 
  status: 'online' | 'offline' | 'warning';
  timestamp: string; 
}

const generateMockData = (): LiveData[] => {
  const statuses: ('online' | 'offline' | 'warning')[] = ['online', 'offline', 'warning'];
  return Array.from({ length: 15 }, (_, i) => ({
    device_id: `DEV-${100 + i}`,
    location: `Zone ${Math.floor(i / 3) + 1}`,
    pressure: parseFloat((Math.random() * 5 + 1).toFixed(2)),
    flow: parseFloat((Math.random() * 20 + 5).toFixed(2)),
    level: parseFloat((Math.random() * 100).toFixed(2)),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    timestamp: new Date(Date.now() - Math.random() * 3600 * 1000).toISOString(),
  }));
};

export default function MonitoringPage() {
  const [data, setData] = useState<LiveData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof LiveData | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(generateMockData());
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (column: keyof LiveData) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const filteredData = data.filter(item =>
    Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortBy) return 0;

    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const getSortIcon = (column: keyof LiveData) => {
    if (sortBy === column) {
      return sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
    }
    return null;
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Real-Time Monitor</h1>
      <p className="text-slate-600 mb-8">Live updates from connected devices.</p>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search data..."
              className="pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {loading && (
            <div className="flex items-center text-blue-500">
              <Loader2 className="animate-spin mr-2" size={20} /> Loading Live Data...
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('device_id')}
                >
                  <div className="flex items-center">Device ID {getSortIcon('device_id')}</div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('location')}
                >
                  <div className="flex items-center">Location {getSortIcon('location')}</div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('pressure')}
                >
                  <div className="flex items-center">Pressure (bar) {getSortIcon('pressure')}</div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('flow')}
                >
                  <div className="flex items-center">Flow (L/s) {getSortIcon('flow')}</div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('level')}
                >
                  <div className="flex items-center">Level (%) {getSortIcon('level')}</div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">Status {getSortIcon('status')}</div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('timestamp')}
                >
                  <div className="flex items-center">Timestamp {getSortIcon('timestamp')}</div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {sortedData.map((item, index) => (
                <tr key={item.device_id} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.device_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.pressure}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.flow}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.level}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'online' ? 'bg-emerald-100 text-emerald-800' :
                      item.status === 'warning' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(item.timestamp).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && !loading && (
            <div className="text-center py-8 text-slate-500">No matching data found.</div>
          )}
        </div>
      </div>
    </div>
  );
}