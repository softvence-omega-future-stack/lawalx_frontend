"use client";

import React, { useState } from "react";
import BaseDialog from "@/common/BaseDialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import BaseSelect from "@/common/BaseSelect";
import { Checkbox } from "@/components/ui/checkbox";

interface RefundDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    invoiceId: string;
}

const RefundDialog = ({ open, setOpen, invoiceId }: RefundDialogProps) => {
    const [refundType, setRefundType] = useState("full");
    const [reason, setReason] = useState("duplicate");
    const [cancelSub, setCancelSub] = useState(false);
    const [sendReceipt, setSendReceipt] = useState(false);

    return (
        <BaseDialog
            open={open}
            setOpen={setOpen}
            title={`Refund Transaction ${invoiceId}`}
            description="Customer: TechCorp Inc. | Original Amount: $2,400.00"
            maxWidth="lg"
        >
            <div className="space-y-6">
                {/* Refund Type */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-headings">Refund Type</h4>
                    <BaseSelect
                        options={[
                            { label: "Full Refund", value: "full" },
                            { label: "Prorated Refund", value: "prorated" },
                            { label: "Partial/Custom Amount", value: "partial" },
                        ]}
                        value={refundType}
                        onChange={setRefundType}
                        placeholder="Select refund type"
                    />
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="cancelSub"
                            checked={cancelSub}
                            onCheckedChange={(c) => setCancelSub(!!c)}
                        />
                        <label
                            htmlFor="cancelSub"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-20 text-body"
                        >
                            Cancel Subscription?
                        </label>
                    </div>
                </div>

                <div className="bg-border h-[1px] w-full" />

                {/* Refund Details */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-headings">Refund Details</h4>
                    <BaseSelect
                        label="Reason for Refund"
                        options={[
                            { label: "Duplicate Charge", value: "duplicate" },
                            { label: "Service Dissatisfaction", value: "dissatisfied" },
                            { label: "Accidental Purchase", value: "accidental" },
                            { label: "Fraudulent", value: "fraudulent" },
                            { label: "Other", value: "other" },
                        ]}
                        value={reason}
                        onChange={setReason}
                        placeholder="Select reason"
                    />

                    <div className="space-y-2">
                        <Label className="text-body">Internal Note</Label>
                        <textarea
                            placeholder="Add internal comments (e.g., 'Approved by Manager')..."
                            className="w-full min-h-[120px] resize-none rounded-md border border-border bg-input px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring placeholder:text-muted text-muted"
                        />
                    </div>

                </div>

                <div className="bg-borderGray h-[1px] w-full" />


                {/* Documentation */}
                <div className="space-y-4">
                    <h4 className="font-semibold text-headings">Documentation</h4>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="sendReceipt"
                            checked={sendReceipt}
                            onCheckedChange={(c) => setSendReceipt(!!c)}
                        />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="sendReceipt"
                                className="text-sm md:text-base font-medium leading-none peer-disabled:cursor-not-allowed text-headings"
                            >
                                Send Refund Receipt to Customer
                            </label>
                            <p className="text-sm text-muted">
                                Email confirmation will be sent to TechCorp Inc.
                            </p>
                        </div>
                    </div>
                </div>


                <div className="flex justify-end gap-3 pt-4">
                    <button className="flex items-center gap-2 px-4 py-2 border border-borderGray dark:border-gray-600 rounded-lg font-medium shadow-customShadow cursor-pointer hover:bg-gray-100 hover:text-red-500 text-headings transition-all duration-300 ease-in-out" disabled>Cancel</button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-red-500 rounded-lg font-medium shadow-customShadow cursor-pointer hover:bg-red-600 text-white transition-all duration-300 ease-in-out bg-red-500">Process Refund</button>
                </div>
            </div>
        </BaseDialog>
    );
};

export default RefundDialog;
