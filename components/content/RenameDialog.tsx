"use client";

import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface RenameDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    itemName: string;
    onRename: (newName: string) => void;
    itemType: "folder" | "playlist" | "video" | "image";
}

const RenameDialog = ({ open, setOpen, itemName, onRename, itemType }: RenameDialogProps) => {
    const [newName, setNewName] = useState(itemName);

    useEffect(() => {
        setNewName(itemName);
    }, [itemName]);

    const handleCancel = () => {
        setOpen(false);
        setNewName(itemName);
    };

    const handleSave = () => {
        onRename(newName);
        setOpen(false);
    };

    const title = itemType === "folder" ? "Rename Folder" : "Rename File";

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px] p-0 gap-0 rounded-2xl overflow-hidden border-none bg-navbarBg shadow-lg">
                <DialogHeader className="p-6 pb-4">
                    <DialogTitle className="text-2xl font-bold text-headings">
                        {title}
                    </DialogTitle>
                    <DialogDescription className="text-base text-body mt-1">
                        Change the name of your {itemType === "folder" ? "folder" : "file"}
                    </DialogDescription>
                </DialogHeader>

                <div className="px-6 py-6 border-t border-b border-border">
                    <div className="space-y-2">
                        <Label
                            htmlFor="rename-input"
                            className="text-base font-semibold text-body"
                        >
                            Name
                        </Label>
                        <Input
                            id="rename-input"
                            placeholder="Set Menu"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="h-12 border-border rounded-lg text-base px-4 focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-inputFocus"
                        />
                    </div>
                </div>

                <DialogFooter className="p-6 flex flex-row gap-4 sm:justify-between sm:space-x-0">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        className="flex-1 h-12 rounded-lg text-base font-bold text-body border-border shadow-customShadow hover:bg-gray-50 bg-white"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handleSave}
                        className="flex-1 h-12 rounded-lg text-base font-bold bg-bgBlue hover:bg-[#0095FF] text-white transition-colors shadow-customShadow"
                    >
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default RenameDialog;
