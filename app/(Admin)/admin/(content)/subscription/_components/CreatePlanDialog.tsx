"use client";

import React, { useState } from "react";
import BaseDialog from "@/common/BaseDialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BaseSelect from "@/common/BaseSelect";
import { Crown } from "lucide-react";

interface CreatePlanDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    editMode?: boolean;
    initialData?: any;
}

const CreatePlanDialog = ({ open, setOpen, editMode, initialData }: CreatePlanDialogProps) => {
    const [planName, setPlanName] = useState(initialData?.name || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [price, setPrice] = useState(initialData?.price?.replace("$", "") || "0");
    const [currency, setCurrency] = useState("USD");
    const [isAdvanced, setIsAdvanced] = useState(false);

    const [limits, setLimits] = useState({
        deviceLimit: initialData?.devices || 20,
        storageLimit: initialData?.storage?.replace(" GB", "") || 50,
        fileLimit: initialData?.uploadLimits || "",
        fileSizeLimit: "",
    });

    const handleLimitChange = (field: string, value: any) => {
        setLimits(prev => ({ ...prev, [field]: value }));
    };

    return (
        <BaseDialog
            open={open}
            setOpen={setOpen}
            title={editMode ? "Edit Plan" : "Create New Plan"}
            description="Configure the plan details, limits, and features."
            maxWidth="lg"
        >
            <div className="space-y-5">
                {/* Icon Header */}
                <div className="flex items-center justify-center -mt-6 mb-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 border border-purple-100">
                        <Crown className="w-6 h-6" />
                    </div>
                </div>

                {/* Plan Name */}
                <div className="space-y-2">
                    <Label className="text-headings font-medium">Plan Name</Label>
                    <Input
                        placeholder="Business"
                        value={planName}
                        onChange={(e) => setPlanName(e.target.value)}
                        className="bg-input border-border h-12"
                    />
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <Label className="text-headings font-medium">Description</Label>
                    <Textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="bg-input border-border min-h-[100px] resize-none"
                    />
                </div>

                {/* Price */}
                <div className="space-y-2">
                    <Label className="text-headings font-medium">Price</Label>
                    <div className="relative flex items-center">
                        <span className="absolute left-4 text-muted">$</span>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full bg-input border border-border rounded-lg pl-8 pr-20 py-3 focus:outline-none focus:ring-1 focus:ring-bgBlue text-headings"
                        />
                        <div className="absolute right-2 w-20">
                            <BaseSelect
                                options={[{ label: "USD", value: "USD" }]}
                                value={currency}
                                onChange={setCurrency}
                                placeholder="USD"
                                showLabel={false}
                                className="border-none shadow-none bg-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Limit Header */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                    <h4 className="font-semibold text-headings">Limit</h4>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-headings font-medium">Advence</span>
                        <button
                            onClick={() => setIsAdvanced(!isAdvanced)}
                            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isAdvanced ? "bg-bgBlue" : "bg-gray-200"}`}
                        >
                            <span
                                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAdvanced ? "translate-x-5" : "translate-x-0"}`}
                            />
                        </button>
                    </div>
                </div>

                {/* Limits Grid */}
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-headings font-medium">Device Limit</Label>
                        <Input
                            type="number"
                            value={limits.deviceLimit}
                            onChange={(e) => handleLimitChange("deviceLimit", e.target.value)}
                            className="bg-input border-border h-12"
                        />
                    </div>
                    <div className="space-y-2 relative">
                        <div className="absolute -top-3 left-4 bg-purple-600 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1 z-10">
                            <span className="w-2 h-2 border border-white rotate-45" /> Input Field
                        </div>
                        <Label className="text-headings font-medium">Storage Limit</Label>
                        <div className="relative">
                            <Input
                                type="number"
                                value={limits.storageLimit}
                                onChange={(e) => handleLimitChange("storageLimit", e.target.value)}
                                className="bg-input border-border h-12 pr-12"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted text-sm">GB</span>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label className="text-headings font-medium">File Limit</Label>
                        <Input
                            placeholder="File Limit"
                            value={limits.fileLimit}
                            onChange={(e) => handleLimitChange("fileLimit", e.target.value)}
                            className="bg-input border-border h-12"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-headings font-medium">File Size Limit</Label>
                        <Input
                            placeholder="File Size Limit"
                            value={limits.fileSizeLimit}
                            onChange={(e) => handleLimitChange("fileSizeLimit", e.target.value)}
                            className="bg-input border-border h-12"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                    <button
                        onClick={() => setOpen(false)}
                        className="px-6 py-2 border border-borderGray rounded-lg font-medium text-headings hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => setOpen(false)}
                        className="px-6 py-2 bg-bgBlue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
                    >
                        {editMode ? "Save Plan" : (
                            <><Crown className="w-4 h-4" /> Create Plan</>
                        )}
                    </button>
                </div>
            </div>
        </BaseDialog>
    );
};

export default CreatePlanDialog;
