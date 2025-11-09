"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { ZoomIn, ZoomOut, Monitor } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix TypeScript error for modifying Leaflet default icon URLs
// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom DivIcon (Monitor Marker)
const customIcon = L.divIcon({
  className: "bg-transparent border-none",
  html: `
    <div style="position: relative;">
      <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 0C13.5 0 0 13.5 0 30C0 47.5 30 80 30 80C30 80 60 47.5 60 30C60 13.5 46.5 0 30 0Z" fill="#2563EB"/>
      </svg>
      <div style="position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 36px; height: 36px; background: white; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="20" height="14" x="2" y="3" rx="2"/>
          <line x1="8" x2="16" y1="21" y2="21"/>
          <line x1="12" x2="12" y1="17" y2="21"/>
        </svg>
      </div>
    </div>
  `,
  iconSize: [60, 80],
  iconAnchor: [30, 80],
  popupAnchor: [0, -80],
}) as L.DivIcon;

// Custom Zoom Controls
const ZoomControls: React.FC = () => {
  const map = useMap();

  return (
    <div className="absolute top-4 left-4 z-500 flex flex-col gap-2">
      <button
        onClick={() => map.zoomIn()}
        className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        aria-label="Zoom in"
        type="button"
      >
        <ZoomIn className="w-5 h-5 text-gray-700" />
      </button>
      <button
        onClick={() => map.zoomOut()}
        className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        aria-label="Zoom out"
        type="button"
      >
        <ZoomOut className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  );
};

const MapLocation: React.FC = () => {
  const position: [number, number] = [45.6, -114.0];

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
          Locations
        </h1>
        <h2 className="text-base text-gray-500">Map</h2>
      </div>

      {/* Map Container */}
      <div className="relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden z-0">
        <div className="relative h-96 overflow-hidden rounded-xl">
          <MapContainer
            center={position}
            zoom={6}
            zoomControl={false}
            className="rounded-xl z-0"
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Custom Zoom Buttons */}
            <ZoomControls />

            {/* Main Custom Marker */}
            <Marker position={position} icon={customIcon}>
              <Popup>
                <div className="text-center p-2">
                  <Monitor className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900">Main Location</p>
                  <p className="text-sm text-gray-600">Idaho/Montana Region</p>
                </div>
              </Popup>
            </Marker>

            {/* Extra Markers */}
            <Marker position={[47.6062, -122.3321]}>
              <Popup>
                <div className="p-1">
                  <p className="font-semibold">Seattle</p>
                  <p className="text-sm text-gray-600">Washington</p>
                </div>
              </Popup>
            </Marker>

            <Marker position={[49.2827, -123.1207]}>
              <Popup>
                <div className="p-1">
                  <p className="font-semibold">Vancouver</p>
                  <p className="text-sm text-gray-600">British Columbia</p>
                </div>
              </Popup>
            </Marker>

            <Marker position={[49.8951, -97.1384]}>
              <Popup>
                <div className="p-1">
                  <p className="font-semibold">Winnipeg</p>
                  <p className="text-sm text-gray-600">Manitoba</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* Time Zone Info */}
      <div className="mt-6">
        <div className="text-gray-600 font-semibold">Time Zone</div>
        <div className="text-gray-900 mt-1">Asia/Dhaka</div>
      </div>

      {/* Tailwind inline override for Leaflet internal layers */}
      <style>{`
        .leaflet-container {
          z-index: 0 !important;
          border-radius: 0.75rem; /* matches rounded-xl */
          overflow: hidden;
        }
        .leaflet-pane,
        .leaflet-tile,
        .leaflet-overlay-pane,
        .leaflet-shadow-pane,
        .leaflet-popup-pane {
          z-index: 0 !important;
        }
        .leaflet-popup {
          z-index: 10 !important;
        }
      `}</style>
    </div>
  );
};

export default MapLocation;
