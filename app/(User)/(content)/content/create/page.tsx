import DashboardHeading from "@/common/DashboardHeading";

const CreateContent = () => {
    return (
        <div className="space-y-6">
            <div>
                <DashboardHeading title="Create Content" />
                <p className="text-sm text-textGray mt-1">Create and upload new content</p>
            </div>

            <div className="bg-navbarBg border border-border rounded-xl p-8 text-center">
                <p className="text-textGray">Content creation interface coming soon...</p>
            </div>
        </div>
    );
};

export default CreateContent;
