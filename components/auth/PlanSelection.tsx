"use client";

import { Monitor, HardDrive, Upload, Layout, X } from "lucide-react";
import React, { useState } from "react";

interface PlanProps {
    name: string;
    price: number;
    description: string;
    devices: string;
    storage: string;
    uploadLimits: string;
    templates: string;
    isPopular?: boolean;
    buttonText: string;
    buttonColor: string;
    borderColor?: string;
    primaryColor: string;
}

const plans: PlanProps[] = [
    {
        name: "Free Trial",
        price: 0,
        description: "For trying out this platform",
        devices: "20",
        storage: "10 GB",
        uploadLimits: "Max 20 Files",
        templates: "1",
        buttonText: "Start Free Trial",
        buttonColor: "bg-[#0F172A]", // Dark for free trial
        primaryColor: "text-[#171717]",
    },
    {
        name: "Starter",
        price: 17,
        description: "Perfect for growing businesses with advanced needs",
        devices: "20",
        storage: "10 GB",
        uploadLimits: "Max 20 Files",
        templates: "1",
        buttonText: "Get Started",
        buttonColor: "bg-[#0FA6FF]",
        primaryColor: "text-[#171717]",
    },
    {
        name: "Business",
        price: 49,
        description: "Perfect for growing businesses with advanced needs",
        devices: "20",
        storage: "10 GB",
        uploadLimits: "Max 20 Files",
        templates: "1",
        isPopular: true,
        buttonText: "Get Started",
        buttonColor: "bg-[#8B5CF6]",
        borderColor: "border-[#8B5CF6]",
        primaryColor: "text-[#8B5CF6]",
    },
];

interface PlanSelectionProps {
    onSelect: (plan: string) => void;
    onContactUs: () => void;
}

const PlanSelection: React.FC<PlanSelectionProps> = ({ onSelect, onContactUs }) => {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <div className="w-full max-w-6xl mx-auto space-y-10 py-12 px-4 relative">
            <button className="absolute right-0 top-0 p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <X size={28} />
            </button>

            <div className="text-center space-y-3">
                <h1 className="text-4xl font-bold text-headings">Choose Your Plan</h1>
                <p className="text-body max-w-2xl mx-auto">Scale your digital signage network with the right plan for your business</p>
            </div>

            <div className="flex items-center justify-center gap-4">
                <span className={`text-base font-medium ${!isAnnual ? "text-headings" : "text-muted"}`}>Monthly</span>
                <button
                    onClick={() => setIsAnnual(!isAnnual)}
                    className={`w-[52px] h-7 rounded-full relative transition-colors duration-200 cursor-pointer p-1 ${isAnnual ? 'bg-bgBlue' : 'bg-gray-200'}`}
                >
                    <div
                        className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 shadow-sm ${isAnnual ? "translate-x-6" : "translate-x-0"
                            }`}
                    />
                </button>
                <span className={`text-base font-medium ${isAnnual ? "text-headings" : "text-muted"}`}>
                    Annual<span className="text-blue ml-1">(15% off)</span>
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative p-8 rounded-2xl border-2  transition-all duration-300 bg-navbarBg ${plan.isPopular ? "border-[#8B5CF6] shadow-xl md:scale-[1.03]" : "border-border"
                            }`}
                    >
                        {plan.isPopular && (
                            <div className="absolute top-4 right-4 px-3 py-1 bg-[#8B5CF6] text-headings text-[10px] font-bold rounded-lg uppercase tracking-wide">
                                Most Popular
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="space-y-1">
                                <h3 className="text-xl font-bold text-headings">{plan.name}</h3>
                                <p className="text-sm text-muted leading-tight">{plan.description}</p>
                            </div>

                            <div className="pt-2">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-headings">${plan.price}</span>
                                    <span className="text-muted text-sm">/month</span>
                                </div>
                                <p className="text-xs text-muted mt-1">{isAnnual ? "Billed annually" : "Billed monthly"}</p>
                            </div>

                            <div className="space-y-6 pt-6 border-t border-border">
                                <div className="grid grid-cols-2 gap-4">
                                    <FeatureItem icon={Monitor} label="Devices" value={plan.devices} />
                                    <FeatureItem icon={HardDrive} label="Storage" value={plan.storage} />
                                    <FeatureItem icon={Upload} label="Upload Limits" value={plan.uploadLimits} />
                                    <FeatureItem icon={Layout} label="Templates" value={plan.templates} />
                                </div>
                            </div>

                            <button
                                onClick={() => onSelect(plan.name)}
                                className={`w-full py-3.5 rounded-xl font-bold text-white transition-all transform hover:opacity-90 active:scale-95 shadow-customShadow cursor-pointer ${plan.buttonColor}`}
                            >
                                {plan.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Custom Plan Section */}
            <div className="p-8 rounded-2xl border-2 border-border bg-navbarBg flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="space-y-3 flex-1">
                    <h3 className="text-2xl font-bold text-headings">Custom</h3>
                    <p className="text-sm text-muted max-w-md leading-relaxed">
                        Custom solutions for large organizations that requires flexible limits and Enterprise-level scalability and support.
                    </p>
                    <button
                        onClick={onContactUs}
                        className="mt-2 px-8 py-3 bg-bgBlue text-white rounded-xl font-bold hover:bg-[#0EA5E9] transition-all shadow-customShadow cursor-pointer"
                    >
                        Contact Us
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-8 min-w-[300px]">
                    <FeatureItem icon={Monitor} label="Devices" value="Custom" isBlue />
                    <FeatureItem icon={HardDrive} label="Storage" value="Custom" isBlue />
                    <FeatureItem icon={Upload} label="Upload Limits" value="Custom" isBlue />
                    <FeatureItem icon={Layout} label="Templates" value="Custom" isBlue />
                </div>
            </div>
        </div>
    );
};

const FeatureItem = ({ icon: Icon, label, value, isBlue = false }: { icon: any; label: string; value: string; isBlue?: boolean }) => (
    <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0`}>
            <Icon size={18} className={isBlue ? 'text-bgBlue' : 'text-muted'} />
        </div>
        <div className="space-y-0.5">
            <p className="text-[11px] text-muted font-medium uppercase tracking-tight">{label}</p>
            <p className={`text-sm font-bold ${isBlue ? 'text-bgBlue' : 'text-headings'}`}>{value}</p>
        </div>
    </div>
);

export default PlanSelection;
