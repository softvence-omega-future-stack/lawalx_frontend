import TemplateCard from "./TemplateCard";

interface TemplateItem {
    id: string;
    title: string;
    type: "video" | "image";
    size: string;
    duration?: string;
    thumbnail?: string;
    resolution?: string;
    assignedTo?: string[];
}

interface TemplateGridProps {
    items: TemplateItem[];
}

const TemplateGrid = ({ items }: TemplateGridProps) => {
    // For now, we'll only support grid view for templates as shown in image 5
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
                <TemplateCard
                    key={item.id}
                    item={item}
                />
            ))}
        </div>
    );
};

export default TemplateGrid;
