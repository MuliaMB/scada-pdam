'use client';

import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { 
  Calendar, Download, ZoomIn, ZoomOut, Move, 
  Settings2, ChevronDown
} from 'lucide-react';

interface HistoricalData {
  time: string;
  [key: string]: number | string; 
}

const generateMockHistoricalData = (sensors: string[] = ['sensor1', 'sensor2']): HistoricalData[] => {
  const data: HistoricalData[] = [];
  for (let i = 0; i < 30; i++) {
    const entry: HistoricalData = {
      time: `Day ${i + 1}`,
    };
    sensors.forEach(sensor => {
      entry[sensor] = parseFloat((Math.random() * 100).toFixed(2));
    });
    data.push(entry);
  }
  return data;
};

const dateRangeOptions = ['Day', 'Week', 'Month', 'Year'];
const availableSensors = ['Pressure', 'Flow', 'Level', 'Temperature', 'PH'];

export default function HistoryPage() {
  const [selectedDateRange, setSelectedDateRange] = useState('Month');
  const [selectedSensors, setSelectedSensors] = useState<string[]>(['Pressure', 'Flow']);
  const [mockData, setMockData] = useState<HistoricalData[]>(() => generateMockHistoricalData(selectedSensors));

  React.useEffect(() => {
    setMockData(generateMockHistoricalData(selectedSensors));
  }, [selectedSensors]);

  const handleSensorToggle = (sensor: string) => {
    setSelectedSensors(prev =>
      prev.includes(sensor)
        ? prev.filter(s => s !== sensor)
        : [...prev, sensor]
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Historical Trends</h1>
      <p className="text-slate-600 mb-8">Analyze past data trends for insights.</p>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        {/* Controls Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          {/* Date Range Controls */}
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-slate-500" />
            {dateRangeOptions.map(range => (
              <button
                key={range}
                onClick={() => setSelectedDateRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedDateRange === range
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Chart Interaction Controls (Placeholder) */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm font-medium">
              <ZoomIn size={18} /> Zoom In
            </button>
            <button className="flex items-center gap-1 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm font-medium">
              <ZoomOut size={18} /> Zoom Out
            </button>
            <button className="flex items-center gap-1 px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-sm font-medium">
              <Move size={18} /> Pan
            </button>
          </div>

          {/* Multi-sensor Comparison & Export */}
          <div className="flex items-center gap-3">
            {/* Sensor Selection Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-colors text-sm font-medium">
                <Settings2 size={18} /> Select Sensors <ChevronDown size={18} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-10 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto">
                {availableSensors.map(sensor => (
                  <label key={sensor} className="flex items-center px-4 py-2 hover:bg-slate-100 text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedSensors.includes(sensor)}
                      onChange={() => handleSensorToggle(sensor)}
                      className="form-checkbox h-4 w-4 text-blue-600 rounded"
                    />
                    <span className="ml-2 text-sm">{sensor}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Export Button */}
            <button className="flex items-center gap-1 px-4 py-2 rounded-lg bg-emerald-500 text-white shadow-md hover:bg-emerald-600 transition-colors text-sm font-medium">
              <Download size={18} /> Export
            </button>
          </div>
        </div>

        {/* Recharts LineChart */}
        <div className="h-[400px] w-full">
          {selectedSensors.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #e2e8f0', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    backgroundColor: '#ffffff',
                    padding: '10px'
                  }} 
                  labelStyle={{ fontWeight: 'bold', color: '#1e293b' }}
                  itemStyle={{ color: '#475569' }}
                />
                <Legend />
                {selectedSensors.map((sensor, index) => (
                  <Line 
                    key={sensor}
                    type="monotone" 
                    dataKey={sensor} 
                    stroke={['#3b82f6', '#ef4444', '#22c55e', '#eab308', '#8b5cf6'][index % 5]}
                    strokeWidth={2} 
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-500 text-lg">
              Please select at least one sensor to display data.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}