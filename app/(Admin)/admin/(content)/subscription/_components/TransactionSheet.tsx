"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, CloudDownload, Copy, CornerDownLeft, ExternalLink, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TransactionSheetProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    transactionId: string;
}

const TransactionSheet = ({ open, setOpen, transactionId }: TransactionSheetProps) => {
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto bg-navbarBg">
                <SheetHeader className="mb-6">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-xl text-headings">Transaction Details <Badge variant="success" className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Successful</Badge></SheetTitle>
                    </div>
                    <SheetDescription className="text-body">
                        Complete information for transaction {transactionId}
                    </SheetDescription>
                </SheetHeader>

                <div className="space-y-6">
                    {/* Amount Box */}
                    <div className="bg-navbarBg p-4 rounded-lg flex justify-between items-center border border-border">
                        <div>
                            <p className="text-sm text-muted">Total Amount</p>
                            <div className="text-2xl font-bold text-headings">$2,400.00</div>
                        </div>
                        <div className="">
                            <CircleCheckBig className="w-4 h-4 md:w-6 md:h-6 text-green-600"/>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-medium text-sm text-headings border-b pb-2">Transaction Information</h4>
                        <div className="grid grid-cols-2 gap-y-4 text-sm">
                            <div className="text-muted">Transaction ID</div>
                            <div className="text-right font-medium flex items-center justify-end gap-1 text-body">
                                {transactionId} <Copy className="w-3 h-3 text-muted cursor-pointer" />
                            </div>

                            <div className="text-muted">Date & Time</div>
                            <div className="text-right font-medium text-body">Dec 15, 2023</div>

                            <div className="text-muted">Status</div>
                            <div className="text-right"><Badge variant="default" className="text-green-600 border-green-200 bg-green-50">Successful</Badge></div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-medium text-sm text-headings border-b pb-2">Customer Information</h4>
                        <div className="grid grid-cols-2 gap-y-4 text-sm">
                            <div className="text-muted">Customer</div>
                            <div className="text-right font-medium text-body">TechCorp Inc.</div>

                            <div className="text-muted">Plan</div>
                            <div className="text-right">
                                <Badge variant="success" className="bg-gray-100 text-gray-600">Enterprise</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-medium text-sm text-headings border-b pb-2">Payment Details</h4>
                        <div className="grid grid-cols-2 gap-y-4 text-sm">
                            <div className="text-gray-500">Payment Method</div>
                            <div className="text-right font-medium flex items-center justify-end gap-1 text-body">
                                💳 Visa ending in 4242
                            </div>

                            <div className="text-gray-500">Gateway Ref</div>
                            <div className="text-right font-medium flex items-center justify-end gap-1 text-body">
                                stripe_pi_... <Copy className="w-3 h-3 text-gray-400 cursor-pointer" />
                            </div>

                            <div className="text-gray-500">Gateway</div>
                            <div className="text-right font-medium flex items-center justify-end gap-1 text-body">
                                Stripe <ExternalLink className="w-3 h-3 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-medium text-sm text-headings">Quick Actions</h4>
                        <div className="grid grid-cols-3 gap-2">
                            <Button variant="default" className="w-full text-xs bg-slate-900 h-9 shadow-customShadow hover:text-bgBlue border border-border">
                                <CloudDownload className="w-3 h-3 mr-1" /> Invoice
                            </Button>
                            <Button variant="outline" className="w-full text-xs h-9 text-headings border border-border shadow-customShadow hover:text-bgBlue hover:bg-gray-100">
                                <Mail className="w-3 h-3 mr-1" /> Receipt
                            </Button>
                            <Button variant="destructive" className="w-full text-xs h-9 shadow-customShadow hover:text-gray-100 bg-[#EF4444]">
                                <CornerDownLeft className="w-3 h-3 mr-1" /> Refund
                            </Button>
                        </div>
                    </div>


                </div>
            </SheetContent>
        </Sheet>
    );
};

export default TransactionSheet;
