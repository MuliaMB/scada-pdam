'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Loader2, Route, MapPin, Flame } from 'lucide-react';

const DynamicLeafletMap = dynamic(() => import('../../components/map/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-full bg-slate-100 rounded-lg">
      <Loader2 className="animate-spin text-blue-500" size={48} />
      <span className="ml-3 text-lg text-slate-600">Loading Map...</span>
    </div>
  ),
});

export default function MapPage() {
  const [showPipePaths, setShowPipePaths] = useState(true);
  const [showSensorMarkers, setShowSensorMarkers] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(false); 

  return (
    <div className="p-8 h-full flex flex-col">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Distribution Map</h1>
      <p className="text-slate-600 mb-8">Visual representation of the water distribution network and sensor locations.</p>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mb-6 flex flex-wrap gap-4 items-center">
        <h3 className="text-lg font-bold text-slate-800 mr-4">Map Layers:</h3>
        
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-blue-600 rounded"
            checked={showPipePaths}
            onChange={(e) => setShowPipePaths(e.target.checked)}
          />
          <Route size={20} className="text-blue-500" />
          <span className="text-slate-700 font-medium">Pipe Paths</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-green-600 rounded"
            checked={showSensorMarkers}
            onChange={(e) => setShowSensorMarkers(e.target.checked)}
          />
          <MapPin size={20} className="text-green-500" />
          <span className="text-slate-700 font-medium">Sensor Markers</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 text-red-600 rounded"
            checked={showHeatmap}
            onChange={(e) => setShowHeatmap(e.target.checked)}
          />
          <Flame size={20} className="text-red-500" />
          <span className="text-slate-700 font-medium">Heatmap (Placeholder)</span>
        </label>
      </div>

      <div className="flex-1 h-[600px] w-full">
        <DynamicLeafletMap 
          showPipePaths={showPipePaths} 
          showSensorMarkers={showSensorMarkers} 
          showHeatmap={showHeatmap} 
        />
      </div>
    </div>
  );
}