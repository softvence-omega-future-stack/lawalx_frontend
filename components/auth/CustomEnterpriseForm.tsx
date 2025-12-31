"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AuthInput from "./AuthInput";
import { X, HelpCircle, ChevronDown } from "lucide-react";

const enterpriseSchema = z.object({
    companyName: z.string().min(2, "Company name is required"),
    industryType: z.string().min(1, "Please select an industry"),
    companySize: z.string().min(1, "Please select company size"),
    location: z.string().min(2, "Location is required"),
    website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
    estimatedDevices: z.string().min(1, "Required"),
    storageRequirements: z.string().min(1, "Required"),
    implementationTimeline: z.string().min(1, "Required"),
    estimatedBudget: z.string().min(1, "Required"),
    additionalComments: z.string().optional(),
});

type EnterpriseFormData = z.infer<typeof enterpriseSchema>;

interface CustomEnterpriseFormProps {
    onClose: () => void;
    onSubmit: (data: EnterpriseFormData) => void;
}

const CustomEnterpriseForm: React.FC<CustomEnterpriseFormProps> = ({ onClose, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EnterpriseFormData>({
        resolver: zodResolver(enterpriseSchema),
    });

    const handleFormSubmit = (data: EnterpriseFormData) => {
        console.log("Enterprise Form Data:", data);
        onSubmit(data);
    };

    return (
        <div className="w-full">
            <div className="w-full max-w-4xl mx-auto py-12 px-4 space-y-8 relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-10 p-2 text-headings hover:text-gray-600 transition-colors"
                >
                    <X size={28} />
                </button>

                <div className="text-center space-y-3">
                    <h1 className="text-4xl font-bold text-headings">Request Your Custom Enterprise Plan</h1>
                    <p className="text-body max-w-2xl mx-auto italic">Tell us about your needs and we&apos;ll create a tailored solution for your organization</p>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
                    {/* Company Information Section */}
                    <div className="p-4 md:p-8 rounded-2xl border border-border bg-navbarBg space-y-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-headings">Company Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                            <div className="md:col-span-2">
                                <AuthInput
                                    label="Company Name"
                                    placeholder="Enter your company name"
                                    required
                                    {...register("companyName")}
                                    error={errors.companyName?.message}
                                />
                            </div>

                            <SelectField
                                label="Industry Type"
                                options={["Fintech", "Health", "Education", "Retail"]}
                                {...register("industryType")}
                                error={errors.industryType?.message}
                            />

                            <SelectField
                                label="Company Size"
                                options={["0 - 50 Employee", "51 - 200 Employee", "201 - 500 Employee", "500+ Employee"]}
                                {...register("companySize")}
                                error={errors.companySize?.message}
                            />

                            <AuthInput
                                label="Location"
                                placeholder="Enter your company name"
                                required
                                {...register("location")}
                                error={errors.location?.message}
                            />

                            <AuthInput
                                label="Website"
                                placeholder="tape.io"
                                type="text"
                                {...register("website")}
                                error={errors.website?.message}
                            />
                        </div>
                    </div>

                    {/* Technical Requirements Section */}
                    <div className="p-4 md:p-8 rounded-2xl border border-border bg-navbarBg space-y-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-headings">Technical Requirements</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                            <SelectField
                                label="Estimated Number of Devices"
                                options={["100 GB", "200 GB", "500 GB", "1 TB+"]}
                                {...register("estimatedDevices")}
                                error={errors.estimatedDevices?.message}
                                hasHelp
                            />

                            <SelectField
                                label="Storage Requirements"
                                options={["100 GB", "200 GB", "500 GB", "1 TB+"]}
                                {...register("storageRequirements")}
                                error={errors.storageRequirements?.message}
                                hasHelp
                            />

                            <SelectField
                                label="Implementation Timeline"
                                options={["1 Month", "3 Months", "6 Months", "ASAP"]}
                                {...register("implementationTimeline")}
                                error={errors.implementationTimeline?.message}
                                hasHelp
                            />

                            <SelectField
                                label="Estimated Budget Range"
                                options={["$3000", "$5000", "$10000+", "TBD"]}
                                {...register("estimatedBudget")}
                                error={errors.estimatedBudget?.message}
                                hasHelp
                            />

                            <div className="md:col-span-2 space-y-1.5 pt-2">
                                <label className="text-sm font-medium text-body flex items-center gap-1.5">
                                    Additional Requirements & Comments <span className="text-red-500">*</span> <HelpCircle size={15} className="text-muted" />
                                </label>
                                <textarea
                                    placeholder="Tell us about any specific requirements, integration needs, or questions you have."
                                    className="w-full min-h-[140px] p-5 border border-gray-200 rounded-2xl outline-none focus:border-bgBlue focus:ring-4 focus:ring-bgBlue/10 transition-all resize-none shadow-sm"
                                    {...register("additionalComments")}
                                />
                                {errors.additionalComments && <p className="text-xs text-red-500">{errors.additionalComments.message}</p>}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-[#0A0A0A] text-white rounded-2xl font-bold hover:opacity-90 transition-all shadow-customShadow border border-border active:scale-[0.99] mt-4 cursor-pointer"
                    >
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
};

const SelectField = React.forwardRef<HTMLSelectElement, { label: string; options: string[]; error?: string; hasHelp?: boolean }>(
    ({ label, options, error, hasHelp, ...props }, ref) => (
        <div className="space-y-1.5 flex-1 w-full">
            <label className="text-sm font-medium text-muted flex items-center gap-1.5">
                {label} <span className="text-red-500">*</span> {hasHelp && <HelpCircle size={15} className="text-muted" />}
            </label>
            <div className="relative group">
                <select
                    ref={ref}
                    className="w-full h-[52px] px-4 border border-border rounded-2xl outline-none bg-input focus:border-bgBlue focus:ring-4 focus:ring-bgBlue/10 transition-all appearance-none text-headings shadow-sm cursor-pointer"
                    {...props}
                >
                    <option value="">Select option</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}<ChevronDown size={20} />
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none group-focus-within:text-bgBlue cursor-pointer">
                    <ChevronDown size={20} />
                </div>
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    )
);
SelectField.displayName = "SelectField";

export default CustomEnterpriseForm;
