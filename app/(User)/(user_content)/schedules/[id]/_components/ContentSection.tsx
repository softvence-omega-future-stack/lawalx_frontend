import React from "react";
import { Info, X } from "lucide-react";
import BaseSelect from "@/common/BaseSelect";
import { ContentItem } from "../../_data";

interface ContentSectionProps {
    contentType: string;
    setContentType: (val: string) => void;
    content: ContentItem[];
}

const ContentSection: React.FC<ContentSectionProps> = ({ contentType, setContentType, content }) => {
    return (
        <section className="bg-navbarBg border border-border rounded-xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-headings">Content</h2>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-headings flex items-center gap-1">
                        Content Type * <Info className="w-4 h-4 text-gray-400" />
                    </label>
                    <BaseSelect
                        value={contentType}
                        onChange={setContentType}
                        options={[
                            { label: "Image or Video", value: "Image or Video" },
                            { label: "HTML Content", value: "HTML Content" },
                            { label: "Playlist", value: "Playlist" },
                        ]}
                        placeholder="Select Type"
                    />
                </div>

                {content.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 border border-border rounded-xl bg-bgGray/30 dark:bg-gray-800/30">
                        <img src={item.thumbnail} alt={item.name} className="w-16 h-12 rounded-lg object-cover" />
                        <div className="flex-1">
                            <div className="font-bold text-muted">{item.name}</div>
                            <div className="text-xs text-muted">{item.size}</div>
                        </div>
                        <button className="text-gray-400 hover:text-red-500 transition">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ContentSection;
