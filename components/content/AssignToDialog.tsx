"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";

interface ScreenItem {
    id: string;
    name: string;
    location: string;
}

const mockScreens: ScreenItem[] = [
    { id: "1", name: "Main Lobby Display", location: "Building A, Ground Floor" },
    { id: "2", name: "Main Lobby Display", location: "Building A, Ground Floor" },
    { id: "3", name: "Main Lobby Display", location: "Building A, Ground Floor" },
    { id: "4", name: "Main Lobby Display", location: "Building A, Ground Floor" },
    { id: "5", name: "Main Lobby Display", location: "Building A, Ground Floor" },
];

interface AssignToDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onAssign?: (selectedIds: string[]) => void;
}

const AssignToDialog = ({ open, setOpen, onAssign }: AssignToDialogProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleScreen = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleAssign = () => {
        onAssign?.(selectedIds);
        setOpen(false);
    };

    const filteredScreens = mockScreens.filter((screen) =>
        screen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        screen.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px] p-0 gap-0 rounded-2xl overflow-hidden border-none bg-navbarBg shadow-lg">
                <DialogHeader className="p-6 pb-4">
                    <DialogTitle className="text-2xl font-bold text-headings">
                        Assign to Program
                    </DialogTitle>
                    <DialogDescription className="text-base text-body mt-1">
                        Select the screens where you want to show this content
                    </DialogDescription>
                </DialogHeader>

                <div className="px-6 py-6 border-t border-b border-border space-y-4">
                    {/* Search Box */}
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-textGray pointer-events-none" />
                        <Input
                            placeholder="Search Screen"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-12 pl-10 pr-4 border-border bg-input rounded-lg text-base focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-inputFocus"
                        />
                    </div>
                    {/* List Area */}
                    <div className="border border-border rounded-xl bg-white dark:bg-gray-900 overflow-hidden">
                        <div className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
                            {filteredScreens.length > 0 ? (
                                filteredScreens.map((screen) => (
                                    <div
                                        key={screen.id}
                                        className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer group"
                                        onClick={() => toggleScreen(screen.id)}
                                    >
                                        <div onClick={(e) => e.stopPropagation()}>
                                            <Checkbox
                                                checked={selectedIds.includes(screen.id)}
                                                onCheckedChange={() => toggleScreen(screen.id)}
                                                className="w-6 h-6 rounded-md data-[state=checked]:bg-bgBlue data-[state=checked]:border-bgBlue data-[state=checked]:text-white shrink-0"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0 text-left">
                                            <p className="font-semibold text-headings text-[15px] md:text-base truncate leading-tight">
                                                {screen.name}
                                            </p>
                                            <p className="text-xs md:text-[13px] text-textGray mt-1 leading-tight">
                                                {screen.location}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-textGray text-sm">
                                    No screens found matching "{searchQuery}"
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-6 flex flex-row gap-4 sm:justify-between sm:space-x-0">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="flex-1 h-12 rounded-lg text-base font-bold text-body border-border shadow-customShadow hover:bg-gray-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleAssign}
                        className="flex-1 h-12 rounded-lg text-base font-bold bg-bgBlue hover:bg-[#0095FF] text-white transition-colors shadow-customShadow"
                    >
                        Assign
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AssignToDialog;
