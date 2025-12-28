"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Copy, Download, ExternalLink, Mail, RefreshCcw, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TransactionSheetProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    transactionId: string;
}

const TransactionSheet = ({ open, setOpen, transactionId }: TransactionSheetProps) => {
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader className="mb-6">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-xl">Transaction Details <Badge variant="success" className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Successful</Badge></SheetTitle>
                    </div>
                    <SheetDescription>
                        Complete information for transaction {transactionId}
                    </SheetDescription>
                </SheetHeader>

                <div className="space-y-6">
                    {/* Amount Box */}
                    <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center border border-gray-100">
                        <div>
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <div className="text-2xl font-bold text-headings">$2,400.00</div>
                        </div>
                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                            ✔️
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-medium text-sm text-gray-900 border-b pb-2">Transaction Information</h4>
                        <div className="grid grid-cols-2 gap-y-4 text-sm">
                            <div className="text-gray-500">Transaction ID</div>
                            <div className="text-right font-medium flex items-center justify-end gap-1">
                                {transactionId} <Copy className="w-3 h-3 text-gray-400 cursor-pointer" />
                            </div>

                            <div className="text-gray-500">Date & Time</div>
                            <div className="text-right font-medium">Dec 15, 2023</div>

                            <div className="text-gray-500">Status</div>
                            <div className="text-right"><Badge variant="default" className="text-green-600 border-green-200 bg-green-50">Successful</Badge></div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-medium text-sm text-gray-900 border-b pb-2">Customer Information</h4>
                        <div className="grid grid-cols-2 gap-y-4 text-sm">
                            <div className="text-gray-500">Customer</div>
                            <div className="text-right font-medium">TechCorp Inc.</div>

                            <div className="text-gray-500">Plan</div>
                            <div className="text-right">
                                <Badge variant="success" className="bg-gray-100 text-gray-600">Enterprise</Badge>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="font-medium text-sm text-gray-900 border-b pb-2">Payment Details</h4>
                        <div className="grid grid-cols-2 gap-y-4 text-sm">
                            <div className="text-gray-500">Payment Method</div>
                            <div className="text-right font-medium flex items-center justify-end gap-1">
                                💳 Visa ending in 4242
                            </div>

                            <div className="text-gray-500">Gateway Ref</div>
                            <div className="text-right font-medium flex items-center justify-end gap-1">
                                stripe_pi_... <Copy className="w-3 h-3 text-gray-400 cursor-pointer" />
                            </div>

                            <div className="text-gray-500">Gateway</div>
                            <div className="text-right font-medium flex items-center justify-end gap-1">
                                Stripe <ExternalLink className="w-3 h-3 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-medium text-sm text-gray-900">Quick Actions</h4>
                        <div className="grid grid-cols-3 gap-2">
                            <Button variant="default" className="w-full text-xs bg-slate-900 h-9">
                                <Download className="w-3 h-3 mr-1" /> Invoice
                            </Button>
                            <Button variant="outline" className="w-full text-xs h-9">
                                <Mail className="w-3 h-3 mr-1" /> Receipt
                            </Button>
                            <Button variant="destructive" className="w-full text-xs h-9">
                                <RefreshCcw className="w-3 h-3 mr-1" /> Refund
                            </Button>
                        </div>
                    </div>


                </div>
            </SheetContent>
        </Sheet>
    );
};

export default TransactionSheet;
