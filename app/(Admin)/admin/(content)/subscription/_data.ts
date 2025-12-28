export interface Subscriber {
    id: string;
    name: string;
    email: string;
    plan: string;
    planStatus: "Starter" | "Professional" | "Business" | "Trial";
    amount: string;
    paymentCycle: "Monthly" | "Yearly";
    nextBilling: string;
    revenue: string;
}

export interface Invoice {
    id: string;
    subscriberName: string;
    subscriberEmail: string;
    paymentMethod: string;
    last4: string;
    amount: string;
    status: "Paid" | "Failed" | "Refunded";
    date: string;
    transactionId: string;
    gateway: string;
    gatewayRef: string;
}

export interface Plan {
    id: string;
    name: string;
    description: string;
    price: string;
    users: number;
    devices: number;
    storage: string;
    uploadLimits: string;
    templates: number;
}

export interface Coupon {
    id: string;
    code: string;
    discount: string;
    cycle: string;
    usage: {
        current: number;
        total: number;
    };
    status: "Active" | "Expired";
    expiryDate: string;
}

export const subscribers: Subscriber[] = [
    {
        id: "1",
        name: "Jenny Wilson",
        email: "olivia@gmail.com",
        plan: "Starter",
        planStatus: "Starter",
        amount: "$299.00",
        paymentCycle: "Monthly",
        nextBilling: "Jan 15, 2024",
        revenue: "$231.00",
    },
    {
        id: "2",
        name: "Brooklyn Simmons",
        email: "olivia@gmail.com",
        plan: "Professional",
        planStatus: "Professional",
        amount: "$299.00",
        paymentCycle: "Yearly",
        nextBilling: "Jan 15, 2024",
        revenue: "$231.00",
    },
    {
        id: "3",
        name: "Kristin Watson",
        email: "olivia@gmail.com",
        plan: "Professional",
        planStatus: "Professional",
        amount: "$299.00",
        paymentCycle: "Monthly",
        nextBilling: "Jan 15, 2024",
        revenue: "$231.00",
    },
    {
        id: "4",
        name: "Dianne Russell",
        email: "olivia@gmail.com",
        plan: "Business",
        planStatus: "Business",
        amount: "$299.00",
        paymentCycle: "Yearly",
        nextBilling: "Jan 15, 2024",
        revenue: "$231.00",
    },
    {
        id: "5",
        name: "Floyd Miles",
        email: "olivia@gmail.com",
        plan: "Business",
        planStatus: "Business",
        amount: "$299.00",
        paymentCycle: "Yearly",
        nextBilling: "Jan 15, 2024",
        revenue: "$231.00",
    },
    {
        id: "6",
        name: "Jerome Bell",
        email: "olivia@gmail.com",
        plan: "Trial",
        planStatus: "Trial",
        amount: "$299.00",
        paymentCycle: "Monthly",
        nextBilling: "Jan 15, 2024",
        revenue: "$0",
    },
    {
        id: "7",
        name: "Jacob Jones",
        email: "olivia@gmail.com",
        plan: "Trial",
        planStatus: "Trial",
        amount: "$299.00",
        paymentCycle: "Monthly",
        nextBilling: "Jan 15, 2024",
        revenue: "$0",
    },
];

export const invoices: Invoice[] = [
    {
        id: "INV-2023-1245",
        subscriberName: "Jenny Wilson",
        subscriberEmail: "olivia@gmail.com",
        paymentMethod: "Visa",
        last4: "4025",
        amount: "$299.00",
        status: "Failed",
        date: "December 15, 2024",
        transactionId: "INV-2023-1245",
        gateway: "Stripe",
        gatewayRef: "stripe_pi_qbyoj56v1xf",
    },
    {
        id: "INV-2023-1246",
        subscriberName: "Brooklyn Simmons",
        subscriberEmail: "olivia@gmail.com",
        paymentMethod: "Visa",
        last4: "4025",
        amount: "$299.00",
        status: "Paid",
        date: "December 15, 2024",
        transactionId: "INV-2023-1246",
        gateway: "Stripe",
        gatewayRef: "stripe_pi_qbyoj56v1xf",
    },
    {
        id: "INV-2023-1247",
        subscriberName: "Kristin Watson",
        subscriberEmail: "olivia@gmail.com",
        paymentMethod: "Visa",
        last4: "4025",
        amount: "$299.00",
        status: "Refunded",
        date: "December 15, 2024",
        transactionId: "INV-2023-1247",
        gateway: "Stripe",
        gatewayRef: "stripe_pi_qbyoj56v1xf",
    },
    {
        id: "INV-2023-1248",
        subscriberName: "Dianne Russell",
        subscriberEmail: "olivia@gmail.com",
        paymentMethod: "Visa",
        last4: "4025",
        amount: "$299.00",
        status: "Paid",
        date: "December 15, 2024",
        transactionId: "INV-2023-1248",
        gateway: "Stripe",
        gatewayRef: "stripe_pi_qbyoj56v1xf",
    },
    {
        id: "INV-2023-1250",
        subscriberName: "Jerome Bell",
        subscriberEmail: "olivia@gmail.com",
        paymentMethod: "Visa",
        last4: "4025",
        amount: "$299.00",
        status: "Paid",
        date: "December 15, 2024",
        transactionId: "INV-2023-1250",
        gateway: "Stripe",
        gatewayRef: "stripe_pi_qbyoj56v1xf",
    },
];

export const plans: Plan[] = [
    {
        id: "1",
        name: "Demo (For Developers)",
        description: "Perfect for growing businesses with advanced needs",
        price: "$0",
        users: 120,
        devices: 100,
        storage: "100 GB",
        uploadLimits: "Max 200 Files",
        templates: 20,
    },
    {
        id: "2",
        name: "Free Trial",
        description: "Perfect for growing businesses with advanced needs",
        price: "$0",
        users: 120,
        devices: 20,
        storage: "10 GB",
        uploadLimits: "Max 20 Files",
        templates: 1,
    },
    {
        id: "3",
        name: "Starter",
        description: "Perfect for growing businesses with advanced needs",
        price: "$0",
        users: 120,
        devices: 20,
        storage: "10 GB",
        uploadLimits: "Max 20 Files",
        templates: 1,
    },
    {
        id: "4",
        name: "Business",
        description: "Perfect for growing businesses with advanced needs",
        price: "$0",
        users: 120,
        devices: 20,
        storage: "10 GB",
        uploadLimits: "Max 20 Files",
        templates: 1,
    },
];

export const coupons: Coupon[] = [
    {
        id: "1",
        code: "WELCOME25",
        discount: "30%",
        cycle: "Once",
        usage: { current: 156, total: 500 },
        status: "Active",
        expiryDate: "December 15, 2024",
    },
    {
        id: "2",
        code: "ENTERPRISE50",
        discount: "30%",
        cycle: "3 months",
        usage: { current: 156, total: 500 },
        status: "Expired",
        expiryDate: "December 15, 2024",
    },
    {
        id: "3",
        code: "HOLIDAY2023",
        discount: "30%",
        cycle: "1 year",
        usage: { current: 156, total: 500 },
        status: "Expired",
        expiryDate: "December 15, 2024",
    },
    {
        id: "4",
        code: "HOLIDAY2023",
        discount: "30%",
        cycle: "Forever",
        usage: { current: 156, total: 500 },
        status: "Expired",
        expiryDate: "December 15, 2024",
    },
    {
        id: "5",
        code: "HOLIDAY2023",
        discount: "30%",
        cycle: "Once",
        usage: { current: 156, total: 500 },
        status: "Expired",
        expiryDate: "December 15, 2024",
    },
    {
        id: "6",
        code: "HOLIDAY2023",
        discount: "30%",
        cycle: "Once",
        usage: { current: 156, total: 500 },
        status: "Expired",
        expiryDate: "December 15, 2024",
    },
];
