'use client';

import React, { useState, useEffect } from 'react';
import {
  Search, ArrowUp, ArrowDown, HardDrive,
  MapPin, Settings, Wifi, WifiOff, Loader2,
  ChevronLeft, ChevronRight, XCircle 
} from 'lucide-react';
interface Device {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'active' | 'inactive' | 'error';
  last_online: string;
  firmware_version: string;
}

const generateMockDevices = (): Device[] => {
  const types = ['Sensor', 'Pump', 'Valve', 'Controller'];
  const locations = ['Zone 1', 'Zone 2', 'Zone 3', 'Reservoir', 'Treatment Plant'];
  const statuses = ['active', 'inactive', 'error'];

  return Array.from({ length: 50 }, (_, i) => ({
    id: `DEV-${100 + i}`,
    name: `${types[Math.floor(Math.random() * types.length)]} ${i + 1}`,
    type: types[Math.floor(Math.random() * types.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    last_online: new Date(Date.now() - Math.random() * 86400 * 1000 * 30).toISOString(),
    firmware_version: `v1.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 5)}`,
  }));
};

const DEVICES_PER_PAGE = 10;

export default function DevicesPage() {
  const [allDevices, setAllDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof Device | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAllDevices(generateMockDevices());
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleSort = (column: keyof Device) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const filteredDevices = allDevices.filter(device =>
    Object.values(device).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedDevices = [...filteredDevices].sort((a, b) => {
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

  const totalPages = Math.ceil(sortedDevices.length / DEVICES_PER_PAGE);
  const startIndex = (currentPage - 1) * DEVICES_PER_PAGE;
  const endIndex = startIndex + DEVICES_PER_PAGE;
  const currentDevices = sortedDevices.slice(startIndex, endIndex);

  const getSortIcon = (column: keyof Device) => {
    if (sortBy === column) {
      return sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />;
    }
    return null;
  };

  const getStatusClasses = (status: Device['status']) => {
    switch (status) {
      case 'active': return 'bg-emerald-100 text-emerald-800';
      case 'inactive': return 'bg-slate-100 text-slate-600';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin text-blue-500" size={48} />
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Device Status</h1>
      <p className="text-slate-600 mb-8">Comprehensive inventory and status of all connected devices.</p>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search devices..."
              className="pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 w-full"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <span className="text-sm text-slate-500">
            Showing {currentDevices.length} of {filteredDevices.length} devices
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">Device Name {getSortIcon('name')}</div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('type')}
                >
                  <div className="flex items-center">Type {getSortIcon('type')}</div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('location')}
                >
                  <div className="flex items-center">Location {getSortIcon('location')}</div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">Status {getSortIcon('status')}</div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('last_online')}
                >
                  <div className="flex items-center">Last Online {getSortIcon('last_online')}</div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('firmware_version')}
                >
                  <div className="flex items-center">Firmware {getSortIcon('firmware_version')}</div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {currentDevices.map(device => (
                <tr key={device.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 flex items-center gap-2">
                    <HardDrive size={18} className="text-slate-500" /> {device.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{device.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 flex items-center gap-1">
                    <MapPin size={16} className="text-blue-500" /> {device.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(device.status)}`}>
                      {device.status === 'active' && <Wifi size={14} className="inline mr-1" />}
                      {device.status === 'inactive' && <WifiOff size={14} className="inline mr-1" />}
                      {device.status === 'error' && <XCircle size={14} className="inline mr-1" />}
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(device.last_online).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{device.firmware_version}</td>
                </tr>
              ))}
              {filteredDevices.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-slate-500">No devices found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav
          className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
          aria-label="Pagination"
        >
          <div className="flex-1 flex justify-between sm:justify-end">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} className="mr-2" /> Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <ChevronRight size={16} className="ml-2" />
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Page <span className="font-medium">{currentPage}</span> of{' '}
                <span className="font-medium">{totalPages}</span>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}