'use client';

import React, { useState, useEffect } from 'react';
import {
  Filter, Search, Clock, MapPin, HardDrive, AlertTriangle, XCircle, CheckCircle, Loader2
} from 'lucide-react';
type AlarmSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

interface Alarm {
  id: string;
  timestamp: string;
  severity: AlarmSeverity;
  device: string;
  location: string;
  message: string;
}

const generateMockAlarms = (): Alarm[] => {
  const severities: AlarmSeverity[] = ['INFO', 'WARNING', 'CRITICAL'];
  const devices = ['Pump A', 'Valve B', 'Sensor C', 'Filter D', 'Motor E'];
  const locations = ['Zone 1', 'Zone 2', 'Zone 3', 'Control Room', 'Reservoir'];

  return Array.from({ length: 25 }, (_, i) => ({
    id: `ALARM-${1000 + i}`,
    timestamp: new Date(Date.now() - Math.random() * 86400 * 1000 * 7).toISOString(), 
    severity: severities[Math.floor(Math.random() * severities.length)],
    device: devices[Math.floor(Math.random() * devices.length)],
    location: locations[Math.floor(Math.random() * locations.length)],
    message: `Anomaly detected in ${devices[Math.floor(Math.random() * devices.length)]} at ${locations[Math.floor(Math.random() * locations.length)]}. Severity: ${severities[Math.floor(Math.random() * severities.length)]}.`,
  }));
};

export default function AlarmsPage() {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterDevice, setFilterDevice] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [filterTime, setFilterTime] = useState('All'); 

  const allDevices = ['All', ...new Set(alarms.map(a => a.device))].sort();
  const allLocations = ['All', ...new Set(alarms.map(a => a.location))].sort();
  const allSeverities = ['All', 'INFO', 'WARNING', 'CRITICAL'];
  const allTimeFilters = ['All', 'Last 24 Hours', 'Last 7 Days', 'Last 30 Days'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlarms(generateMockAlarms());
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredAlarms = alarms.filter(alarm => {
    const matchesDevice = filterDevice === 'All' || alarm.device === filterDevice;
    const matchesLocation = filterLocation === 'All' || alarm.location === filterLocation;
    const matchesSeverity = filterSeverity === 'All' || alarm.severity === filterSeverity;
    
    let matchesTime = true;
    const alarmDate = new Date(alarm.timestamp);
    const now = new Date();

    if (filterTime === 'Last 24 Hours') {
      matchesTime = (now.getTime() - alarmDate.getTime()) < 24 * 60 * 60 * 1000;
    } else if (filterTime === 'Last 7 Days') {
      matchesTime = (now.getTime() - alarmDate.getTime()) < 7 * 24 * 60 * 60 * 1000;
    } else if (filterTime === 'Last 30 Days') {
      matchesTime = (now.getTime() - alarmDate.getTime()) < 30 * 24 * 60 * 60 * 1000;
    }

    return matchesDevice && matchesLocation && matchesSeverity && matchesTime;
  });

  const getSeverityClasses = (severity: AlarmSeverity) => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-100 text-red-800 border-red-500';
      case 'WARNING': return 'bg-amber-100 text-amber-800 border-amber-500';
      case 'INFO': return 'bg-blue-100 text-blue-800 border-blue-500';
      default: return 'bg-slate-100 text-slate-800 border-slate-500';
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
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Alarms & Events Log</h1>
      <p className="text-slate-600 mb-8">Comprehensive log of system alerts and important events.</p>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Filter size={20} className="text-blue-600" /> Filter Alarms
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="filterDevice" className="block text-sm font-medium text-slate-700 mb-1">Device</label>
            <select
              id="filterDevice"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={filterDevice}
              onChange={(e) => setFilterDevice(e.target.value)}
            >
              {allDevices.map(device => (
                <option key={device} value={device}>{device}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filterLocation" className="block text-sm font-medium text-slate-700 mb-1">Location</label>
            <select
              id="filterLocation"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            >
              {allLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filterSeverity" className="block text-sm font-medium text-slate-700 mb-1">Severity</label>
            <select
              id="filterSeverity"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
            >
              {allSeverities.map(severity => (
                <option key={severity} value={severity}>{severity}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filterTime" className="block text-sm font-medium text-slate-700 mb-1">Time Range</label>
            <select
              id="filterTime"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={filterTime}
              onChange={(e) => setFilterTime(e.target.value)}
            >
              {allTimeFilters.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-800">Alarm Log</h3>
          <span className="text-sm font-medium text-slate-500">Total: {filteredAlarms.length} alarms</span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Message</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredAlarms.map(alarm => (
                <tr key={alarm.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(alarm.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border-l-4 ${getSeverityClasses(alarm.severity)}`}>
                      {alarm.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{alarm.device}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{alarm.location}</td>
                  <td className="px-6 py-4 text-sm text-slate-900 max-w-xs truncate">{alarm.message}</td>
                </tr>
              ))}
              {filteredAlarms.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-slate-500">No alarms found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}