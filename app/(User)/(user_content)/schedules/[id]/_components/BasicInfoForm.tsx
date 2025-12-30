import React from "react";

interface BasicInfoFormProps {
    name: string;
    setName: (val: string) => void;
    description: string;
    setDescription: (val: string) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ name, setName, description, setDescription }) => {
    return (
        <section className="bg-navbarBg border border-border rounded-xl p-6 space-y-4 shadow-sm">
            <h2 className="text-lg font-bold text-headings dark:text-white">Basic Information</h2>
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-headings dark:text-white">Name *</label>
                    <input
                        type="text"
                        placeholder="Store A - NYC"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-bgGray bg-input border border-border rounded-lg text-body"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-headings dark:text-white">Description</label>
                    <textarea
                        placeholder="Store A - NYC"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 bg-bgGray bg-input border border-border rounded-lg text-body "
                    />
                </div>
            </div>
        </section>
    );
};

export default BasicInfoForm;
