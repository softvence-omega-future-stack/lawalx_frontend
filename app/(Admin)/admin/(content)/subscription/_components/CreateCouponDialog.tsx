"use client";

import React, { useState } from "react";
import BaseDialog from "@/common/BaseDialog";
import { Label } from "@/components/ui/label";
import BaseSelect from "@/common/BaseSelect";
import { Sparkles, Calendar, Gift } from "lucide-react";

interface CreateCouponDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    editMode?: boolean;
    initialData?: any;
}

const CreateCouponDialog = ({
    open,
    setOpen,
    editMode,
    initialData,
}: CreateCouponDialogProps) => {
    const [name, setName] = useState(initialData?.name || "");
    const [code, setCode] = useState(initialData?.code || "");
    const [discountType, setDiscountType] = useState("percentage");
    const [discountValue, setDiscountValue] =
        useState(initialData?.discount?.replace("%", "") || "15");
    const [useLimit, setUseLimit] =
        useState<number>(initialData?.usage?.total || 100);
    const [expiryDate, setExpiryDate] = useState("");
    const [couponCycle, setCouponCycle] = useState("once");
    const [cycleType, setCycleType] = useState("month");
    const [totalCycles, setTotalCycles] = useState("6");

    const inputClass =
        "w-full bg-input border border-border rounded-lg px-3 py-3 h-12 text-headings focus:outline-none focus:ring-1 focus:ring-bgBlue";

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
            maxWidth="2xl"
        >
            <div className="space-y-4 md:space-y-6 px-1">
                {/* Name & Code */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-headings font-medium">
                            Name
                        </Label>
                        <input
                            placeholder="AEION"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-headings font-medium">
                            Coupon Code
                        </Label>
                        <div className="flex gap-2">
                            <input
                                placeholder="AEION"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className={`${inputClass} flex-1`}
                            />
                            <button
                                type="button"
                                onClick={generateCode}
                                className="h-12 px-4 rounded-lg bg-bgBlue text-white font-medium flex items-center gap-2 hover:bg-bgBlue/90 transition cursor-pointer shadow-customShadow"
                            >
                                <Sparkles className="w-4 h-4" />
                                Generate
                            </button>
                        </div>
                    </div>
                </div>

                {/* Discount */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-headings font-medium">
                            Discount Type
                        </Label>
                        <BaseSelect
                            options={[
                                { label: "Percentage %", value: "percentage" },
                                { label: "Fixed Amount", value: "fixed" },
                            ]}
                            value={discountType}
                            onChange={setDiscountType}
                            showLabel={false}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-headings font-medium">
                            {discountType === "percentage"
                                ? "Percentage %"
                                : "Amount"}
                        </Label>
                        <input
                            type="number"
                            value={discountValue}
                            onChange={(e) =>
                                setDiscountValue(e.target.value)
                            }
                            className={inputClass}
                        />
                    </div>
                </div>

                {/* Usage & Expiry */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label className="text-headings font-medium">
                            Use Limit
                        </Label>
                        <input
                            type="number"
                            value={useLimit}
                            onChange={(e) =>
                                setUseLimit(Number(e.target.value))
                            }
                            className={inputClass}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-headings font-medium">
                            Expiry Date
                        </Label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="MM/DD/YYYY"
                                value={expiryDate}
                                onChange={(e) =>
                                    setExpiryDate(e.target.value)
                                }
                                className={`${inputClass} pr-10`}
                            />
                            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                        </div>
                    </div>
                </div>

                {/* Coupon Cycle */}
                <div className="space-y-2">
                    <Label className="text-headings font-medium">
                        Coupon Cycle
                    </Label>
                    <BaseSelect
                        options={[
                            { label: "Once", value: "once" },
                            { label: "Multiple", value: "multiple" },
                            { label: "Forever", value: "forever" },
                        ]}
                        value={couponCycle}
                        onChange={setCouponCycle}
                        showLabel={false}
                    />
                </div>

                {/* Conditional Cycle */}
                {couponCycle === "multiple" && (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label className="text-headings font-medium">
                                Cycle Type
                            </Label>
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
                            <Label className="text-headings font-medium">
                                Total{" "}
                                {cycleType === "month"
                                    ? "Months"
                                    : "Years"}
                            </Label>
                            <input
                                type="number"
                                value={totalCycles}
                                onChange={(e) =>
                                    setTotalCycles(e.target.value)
                                }
                                className={inputClass}
                            />
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="px-3 py-2 md:px-4 md:py-3 border border-border rounded-lg font-medium shadow-customShadow cursor-pointer hover:bg-gray-100 hover:text-bgBlue text-headings transition-all duration-300 ease-in-out"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="px-3 py-2 md:px-4 md:py-3 bg-bgBlue text-white rounded-lg font-medium hover:bg-bgBlue/90 transition flex items-center gap-2 shadow-customShadow cursor-pointer"
                    >
                        <Gift className="w-5 h-5" />
                        {editMode ? "Save Changes" : "Create Coupon"}
                    </button>
                </div>
            </div>
        </BaseDialog>
    );
};

export default CreateCouponDialog;
