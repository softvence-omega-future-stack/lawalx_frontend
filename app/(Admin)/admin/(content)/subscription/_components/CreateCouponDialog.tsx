"use client";

import React, { useState } from "react";
import BaseDialog from "@/common/BaseDialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import BaseSelect from "@/common/BaseSelect";
import { Gift, Sparkles, Calendar } from "lucide-react";

interface CreateCouponDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    editMode?: boolean;
    initialData?: any;
}

const CreateCouponDialog = ({ open, setOpen, editMode, initialData }: CreateCouponDialogProps) => {
    const [name, setName] = useState(initialData?.name || "");
    const [code, setCode] = useState(initialData?.code || "");
    const [discountType, setDiscountType] = useState("percentage");
    const [discountValue, setDiscountValue] = useState(initialData?.discount?.replace("%", "") || "15");
    const [useLimit, setUseLimit] = useState(initialData?.usage?.total || 100);
    const [expiryDate, setExpiryDate] = useState("");
    const [couponCycle, setCouponCycle] = useState("once");
    const [cycleType, setCycleType] = useState("month");
    const [totalCycles, setTotalCycles] = useState("6");

    const generateCode = () => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCode(result);
    };

    return (
        <BaseDialog
            open={open}
            setOpen={setOpen}
            title={editMode ? "Edit Coupon" : "Create a Coupon"}
            description="Generate a new promotional code with custom discount settings and usage restrictions."
            maxWidth="lg"
        >
            <div className="space-y-6">
                {/* Icon Header */}
                <div className="flex items-center justify-center -mt-6 mb-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center text-purple-600 border border-purple-100">
                        <Gift className="w-6 h-6" />
                    </div>
                </div>

                {/* Name & Code Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-headings font-medium">Name</Label>
                        <Input
                            placeholder="AEION"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-input border-border h-12"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-headings font-medium">Coupon Code</Label>
                        <div className="flex gap-2">
                            <Input
                                placeholder="AEION"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="bg-input border-border h-12 flex-1"
                            />
                            <button
                                onClick={generateCode}
                                className="bg-bgBlue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm font-medium whitespace-nowrap h-12"
                            >
                                <Sparkles className="w-4 h-4" /> Generate
                            </button>
                        </div>
                    </div>
                </div>

                {/* Discount Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-headings font-medium">Discount Type</Label>
                        <BaseSelect
                            options={[{ label: "Percentage %", value: "percentage" }, { label: "Fixed Amount", value: "fixed" }]}
                            value={discountType}
                            onChange={setDiscountType}
                            placeholder="Select Type"
                            showLabel={false}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-headings font-medium">Percentage %</Label>
                        <Input
                            type="number"
                            value={discountValue}
                            onChange={(e) => setDiscountValue(e.target.value)}
                            className="bg-input border-border h-12"
                        />
                    </div>
                </div>

                {/* Limit & Expiry Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-headings font-medium">Use Limit</Label>
                        <Input
                            type="number"
                            value={useLimit}
                            onChange={(e) => setUseLimit(Number(e.target.value))}
                            className="bg-input border-border h-12"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-headings font-medium">Expiry Date</Label>
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="MM/DD/YYYY"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                className="bg-input border-border h-12 pr-10"
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        </div>
                    </div>
                </div>

                {/* Cycle Row */}
                <div className="space-y-2">
                    <Label className="text-headings font-medium">Coupon Cycle</Label>
                    <BaseSelect
                        options={[
                            { label: "Once", value: "once" },
                            { label: "Multiple Months", value: "multiple" },
                            { label: "Forever", value: "forever" },
                        ]}
                        value={couponCycle}
                        onChange={setCouponCycle}
                        placeholder="Select Cycle"
                        showLabel={false}
                    />
                </div>

                {/* Conditional Cycle Details */}
                {couponCycle === "multiple" && (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-headings font-medium">Coupon Cycle</Label>
                            <BaseSelect
                                options={[
                                    { label: "Month", value: "month" },
                                    { label: "Year", value: "year" },
                                ]}
                                value={cycleType}
                                onChange={setCycleType}
                                showLabel={false}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-headings font-medium">Total {cycleType === "month" ? "Months" : "Years"}</Label>
                            <Input
                                type="number"
                                value={totalCycles}
                                onChange={(e) => setTotalCycles(e.target.value)}
                                className="bg-input border-border h-12"
                            />
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                    <button
                        onClick={() => setOpen(false)}
                        className="px-8 py-3 border border-borderGray rounded-lg font-medium text-headings hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => setOpen(false)}
                        className="px-8 py-3 bg-bgBlue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
                    >
                        <Gift className="w-5 h-5" /> {editMode ? "Save Changes" : "Create Coupon"}
                    </button>
                </div>
            </div>
        </BaseDialog>
    );
};

export default CreateCouponDialog;
