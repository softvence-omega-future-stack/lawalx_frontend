/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { X, Monitor, User, MapPin, Database, Cpu, Activity } from 'lucide-react';

interface GoogleMapModalProps {
    isOpen: boolean;
    onClose: () => void;
    lat: number;
    lng: number;
    label: string;
    device: any; // Using any for simplicity as types are local to page.tsx
}

const containerStyle = {
    width: '100%',
    height: '450px'
};

const GoogleMapModal: React.FC<GoogleMapModalProps> = ({ isOpen, onClose, lat, lng, device }) => {
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const GoogleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: GoogleApiKey
    });

    if (!isOpen) return null;

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Online': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'Offline': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            case 'Syncing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
        }
    };

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-gray-200 dark:border-gray-800 animate-in fade-in zoom-in duration-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Live Tracking</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Viewing real-time location for {device?.device}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors group"
                    >
                        <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                    </button>
                </div>

                <div className="p-1">
                    {isLoaded ? (
                        <div className="rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800">
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={{ lat, lng }}
                                zoom={14}
                                onClick={() => setShowInfoWindow(false)}
                                options={{
                                    disableDefaultUI: false,
                                    zoomControl: true,
                                    mapTypeControl: false,
                                    streetViewControl: false,
                                    fullscreenControl: false,
                                }}
                            >
                                <Marker
                                    position={{ lat, lng }}
                                    onClick={(e) => {
                                        e.stop(); // Prevent map click from firing
                                        setShowInfoWindow(!showInfoWindow);
                                    }}
                                />
                                {showInfoWindow && device && (
                                    <InfoWindow
                                        position={{ lat, lng }}
                                        onCloseClick={() => setShowInfoWindow(false)}
                                    >
                                        <div className="p-1 min-w-[200px] text-gray-900">
                                            <div className="flex items-center gap-2 mb-2 border-b pb-2">
                                                <div className="p-1.5 bg-blue-50 rounded-lg">
                                                    <Monitor className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold leading-tight">{device.device}</p>
                                                    <p className="text-[10px] text-gray-500 font-medium">{device.model}</p>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-[11px]">
                                                    <div className="flex items-center gap-1.5 text-gray-500">
                                                        <User className="w-3 h-3" />
                                                        <span>Customer</span>
                                                    </div>
                                                    <span className="font-semibold">{device.customer}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-[11px]">
                                                    <div className="flex items-center gap-1.5 text-gray-500">
                                                        <Activity className="w-3 h-3" />
                                                        <span>Status</span>
                                                    </div>
                                                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${getStatusStyles(device.status)}`}>
                                                        {device.status}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between text-[11px]">
                                                    <div className="flex items-center gap-1.5 text-gray-500">
                                                        <Database className="w-3 h-3" />
                                                        <span>Storage</span>
                                                    </div>
                                                    <span className="font-semibold text-blue-600">{device.storage}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-[11px]">
                                                    <div className="flex items-center gap-1.5 text-gray-500">
                                                        <Cpu className="w-3 h-3" />
                                                        <span>Uptime</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                        <span className="font-semibold">{device.uptime}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </InfoWindow>
                                )}
                            </GoogleMap>
                        </div>
                    ) : (
                        <div className="h-[450px] flex items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-8 h-8 border-4 border-bgBlue border-t-transparent rounded-full animate-spin" />
                                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Initializing Google Maps...</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        <span>Coordinates: {lat.toFixed(4)}, {lng.toFixed(4)}</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm active:scale-95"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GoogleMapModal;
