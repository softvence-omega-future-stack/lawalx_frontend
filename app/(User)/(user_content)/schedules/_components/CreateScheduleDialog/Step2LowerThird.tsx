"use client";

import React, { useState } from "react";
import { Image as ImageIcon, Video, Music } from "lucide-react";
import BaseSelect from "@/common/BaseSelect";
import { ContentItem, mockContent } from "../../_data";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Marquee from "react-fast-marquee";

interface Step2LowerThirdProps {
    data: {
        selectedContent: ContentItem;
        lowerThirdConfig: {
            backgroundColor: string;
            backgroundOpacity: number;
            enableAnimation: boolean;
            animationDirection: string;
            speed: string;
            enableLogo: boolean;
            position: string;
            textColor: string;
            fontSize: string;
            message: string;
        };
    };
    onChange: (data: any) => void;
}

const Step2LowerThird: React.FC<Step2LowerThirdProps> = ({ data, onChange }) => {
    const updateConfig = (key: string, value: any) => {
        onChange({
            ...data,
            lowerThirdConfig: {
                ...data.lowerThirdConfig,
                [key]: value
            }
        });
    };

    const animationOptions = [
        { label: "Left to right", value: "left-to-right" },
        { label: "Right to left", value: "right-to-left" }
    ];

    const speedOptions = [
        { label: "Slow", value: "slow" },
        { label: "Medium", value: "medium" },
        { label: "Fast", value: "fast" }
    ];

    const positionOptions = [
        { label: "Bottom", value: "bottom" },
        { label: "Top", value: "top" }
    ];

    const fontSizeOptions = [
        { label: "Small", value: "14" },
        { label: "Medium", value: "16" },
        { label: "Large", value: "20" },
        { label: "Extra Large", value: "24" }
    ];

    // Get related content (exclude the selected one)
    const relatedContent = mockContent.filter(item => item.id !== data.selectedContent.id).slice(0, 6);

    return (
        <div className="space-y-6">
            {/* Content Type Display */}
            <BaseSelect
                label="Content Type"
                options={[{ label: "Lower third", value: "lower-third" }]}
                value="lower-third"
                disabled
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Side - Media Preview */}
                <div className="space-y-4">
                    <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
                        {/* Media Display */}
                        {data.selectedContent.type === "audio" ? (
                            <div className="w-full h-full flex items-center justify-center">
                                <Music className="w-16 h-16 text-white" />
                            </div>
                        ) : data.selectedContent.type === "video" ? (
                            data.selectedContent.thumbnail ? (
                                <img
                                    src={data.selectedContent.thumbnail}
                                    alt={data.selectedContent.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Video className="w-16 h-16 text-white" />
                                </div>
                            )
                        ) : (
                            data.selectedContent.thumbnail && (
                                <img
                                    src={data.selectedContent.thumbnail}
                                    alt={data.selectedContent.name}
                                    className="w-full h-full object-cover"
                                />
                            )
                        )}

                        {/* Marquee Overlay */}
                        {data.lowerThirdConfig.message && (
                            <div
                                className={`absolute ${data.lowerThirdConfig.position === "top" ? "top-0" : "bottom-0"} left-0 right-0 py-2 overflow-hidden`}
                                style={{
                                    backgroundColor: `${data.lowerThirdConfig.backgroundColor}${Math.round(data.lowerThirdConfig.backgroundOpacity * 2.55).toString(16).padStart(2, '0')}`
                                }}
                            >
                                <Marquee
                                    speed={
                                        data.lowerThirdConfig.speed === "slow" ? 20 :
                                            data.lowerThirdConfig.speed === "medium" ? 40 : 60
                                    }
                                    direction={data.lowerThirdConfig.animationDirection === "left-to-right" ? "left" : "right"}
                                    gradient={false}
                                >
                                    <p
                                        className="font-semibold px-4"
                                        style={{
                                            color: data.lowerThirdConfig.textColor,
                                            fontSize: `${data.lowerThirdConfig.fontSize}px`
                                        }}
                                    >
                                        {data.lowerThirdConfig.message}
                                    </p>
                                </Marquee>
                            </div>
                        )}
                    </div>

                    {/* Demo Text Label */}
                    <p className="text-center text-sm text-headings font-medium">
                        This is a demo text
                    </p>

                    {/* Message Input */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-headings">Message</Label>
                        <Input
                            type="text"
                            placeholder="This is a demo text"
                            value={data.lowerThirdConfig.message}
                            onChange={(e) => updateConfig("message", e.target.value)}
                            className="bg-input border-borderGray text-headings"
                        />
                    </div>
                </div>

                {/* Right Side - Configuration */}
                <div className="space-y-4">
                    {/* Background Section */}
                    <div className="space-y-3 p-4 rounded-lg border border-borderGray bg-input/50">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="background"
                                checked={data.lowerThirdConfig.backgroundOpacity > 0}
                                onCheckedChange={(checked) => updateConfig("backgroundOpacity", checked ? 80 : 0)}
                            />
                            <Label htmlFor="background" className="text-sm font-medium text-headings cursor-pointer">
                                Background
                            </Label>
                        </div>

                        {data.lowerThirdConfig.backgroundOpacity > 0 && (
                            <div className="space-y-3 pl-6">
                                <div className="space-y-2">
                                    <Label className="text-sm text-headings">Background Color</Label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="color"
                                            value={data.lowerThirdConfig.backgroundColor}
                                            onChange={(e) => updateConfig("backgroundColor", e.target.value)}
                                            className="w-10 h-10 rounded border border-borderGray cursor-pointer"
                                        />
                                        <Input
                                            type="text"
                                            value={data.lowerThirdConfig.backgroundColor}
                                            onChange={(e) => updateConfig("backgroundColor", e.target.value)}
                                            className="flex-1 bg-input border-borderGray text-headings"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm text-headings">Opacity: {data.lowerThirdConfig.backgroundOpacity}%</Label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={data.lowerThirdConfig.backgroundOpacity}
                                        onChange={(e) => updateConfig("backgroundOpacity", parseInt(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Animation Section */}
                    <div className="space-y-3 p-4 rounded-lg border border-borderGray bg-input/50">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="animation"
                                checked={data.lowerThirdConfig.enableAnimation}
                                onCheckedChange={(checked) => updateConfig("enableAnimation", checked)}
                            />
                            <Label htmlFor="animation" className="text-sm font-medium text-headings cursor-pointer">
                                Animation
                            </Label>
                        </div>

                        {data.lowerThirdConfig.enableAnimation && (
                            <div className="space-y-3 pl-6">
                                <BaseSelect
                                    label="Animation"
                                    options={animationOptions}
                                    value={data.lowerThirdConfig.animationDirection}
                                    onChange={(value) => updateConfig("animationDirection", value)}
                                    showLabel={false}
                                />

                                <BaseSelect
                                    label="Speed"
                                    options={speedOptions}
                                    value={data.lowerThirdConfig.speed}
                                    onChange={(value) => updateConfig("speed", value)}
                                />
                            </div>
                        )}
                    </div>

                    {/* Logo Toggle */}
                    <div className="flex items-center gap-2 p-4 rounded-lg border border-borderGray bg-input/50">
                        <Checkbox
                            id="logo"
                            checked={data.lowerThirdConfig.enableLogo}
                            onCheckedChange={(checked) => updateConfig("enableLogo", checked)}
                        />
                        <Label htmlFor="logo" className="text-sm font-medium text-headings cursor-pointer">
                            Logo
                        </Label>
                    </div>

                    {/* Text Styling */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                            <Label className="text-sm text-headings">Text Color</Label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={data.lowerThirdConfig.textColor}
                                    onChange={(e) => updateConfig("textColor", e.target.value)}
                                    className="w-10 h-10 rounded border border-borderGray cursor-pointer"
                                />
                                <Input
                                    type="text"
                                    value={data.lowerThirdConfig.textColor}
                                    onChange={(e) => updateConfig("textColor", e.target.value)}
                                    className="flex-1 bg-input border-borderGray text-headings text-sm"
                                />
                            </div>
                        </div>

                        <BaseSelect
                            label="Font Size"
                            options={fontSizeOptions}
                            value={data.lowerThirdConfig.fontSize}
                            onChange={(value) => updateConfig("fontSize", value)}
                        />
                    </div>

                    {/* Position */}
                    <BaseSelect
                        label="Position"
                        options={positionOptions}
                        value={data.lowerThirdConfig.position}
                        onChange={(value) => updateConfig("position", value)}
                    />
                </div>
            </div>

            {/* Related Content Marquee */}
            {relatedContent.length > 0 && (
                <div className="space-y-2">
                    <Label className="text-sm font-medium text-headings">Related Content</Label>
                    <div className="rounded-lg border border-borderGray bg-input/50 p-4">
                        <Marquee speed={30} gradient={false}>
                            {relatedContent.map((item) => (
                                <div key={item.id} className="mx-2">
                                    <div className="w-32 h-20 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                                        {item.type === "audio" ? (
                                            <Music className="w-8 h-8 text-bgBlue" />
                                        ) : item.thumbnail ? (
                                            <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="w-8 h-8 text-bgBlue" />
                                        )}
                                    </div>
                                    <p className="text-xs text-center mt-1 text-headings truncate w-32">{item.name}</p>
                                </div>
                            ))}
                        </Marquee>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Step2LowerThird;
