'use client';


export default function SystemSection() {
    const sysInfo = [
        { label: 'Version', value: '2.5.8' },
        { label: 'Last Updated', value: 'Oct 15, 2024' },
        { label: 'Database', value: 'PostgreSQL 15.2' },
        { label: 'Server', value: 'AWS (us-east-1)' },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-navbarBg border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-border bg-[#F0FAFF] dark:bg-blue-900/10">
                    <h2 className="text-lg font-semibold text-headings">System Information</h2>
                </div>
                <div className="p-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12">
                        {sysInfo.map((info, i) => (
                            <div key={i} className="space-y-2">
                                <p className="text-xs font-semibold text-muted uppercase tracking-wider">{info.label}</p>
                                <p className="text-md font-medium text-headings">{info.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
