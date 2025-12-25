'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface LeafletMapProps {
  showPipePaths?: boolean;
  showSensorMarkers?: boolean;
  showHeatmap?: boolean;
}

export default function LeafletMap({ showPipePaths, showSensorMarkers, showHeatmap }: LeafletMapProps) {
  const mockPipePaths = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: { name: 'Main Line A' },
        geometry: {
          type: 'LineString',
          coordinates: [
            [106.8271, -6.1751],
            [106.8371, -6.1851],
            [106.8471, -6.1951],
          ],
        },
      },
      {
        type: 'Feature',
        properties: { name: 'Branch Line B' },
        geometry: {
          type: 'LineString',
          coordinates: [
            [106.8371, -6.1851],
            [106.8400, -6.1800],
            [106.8450, -6.1700],
          ],
        },
      },
    ],
  };

  const mockSensorMarkers = [
    { position: [-6.1700, 106.8300], name: 'Pressure Sensor 1', data: '2.5 bar' },
    { position: [-6.1900, 106.8400], name: 'Flow Sensor 2', data: '15 L/s' },
    { position: [-6.1800, 106.8500], name: 'Level Sensor 3', data: '70%' },
  ];

  const mockHeatmapData = Array.from({ length: 50 }, (_, i) => ({
    lat: -6.1751 + (Math.random() - 0.5) * 0.05,
    lng: 106.8271 + (Math.random() - 0.5) * 0.05,
    intensity: Math.random(),
  }));

  const getHeatmapColor = (intensity: number) => {
    if (intensity > 0.75) return 'red';
    if (intensity > 0.5) return 'orange';
    if (intensity > 0.25) return 'yellow';
    return 'blue';
  }

  return (
    <MapContainer 
      center={[-6.1751, 106.8271]} 
      zoom={13} 
      scrollWheelZoom={true}
      className="h-full w-full rounded-lg shadow-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {showPipePaths && (
        <GeoJSON 
          data={mockPipePaths as any} 
          style={() => ({
            color: '#3b82f6',
            weight: 3,
            opacity: 0.7,
          })} 
        />
      )}

      {showSensorMarkers && mockSensorMarkers.map((sensor, idx) => (
        <Marker key={idx} position={sensor.position as L.LatLngExpression}>
          <Popup>
            <strong>{sensor.name}</strong><br />
            {sensor.data}
          </Popup>
        </Marker>
      ))}

      {showHeatmap && mockHeatmapData.map((point, idx) => (
        <Circle
          key={idx}
          center={[point.lat, point.lng]}
          pathOptions={{
            color: getHeatmapColor(point.intensity),
            fillColor: getHeatmapColor(point.intensity),
            fillOpacity: 0.3,
          }}
          radius={point.intensity * 200}
        />
      ))}
    </MapContainer>
  );
}