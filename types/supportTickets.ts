// Support Tickets Types and Interfaces

export type TicketStatus = 'Open' | 'In Progress' | 'Completed';
export type TicketPriority = 'Low' | 'Medium' | 'High';
export type TicketType = 'Sales' | 'Device' | 'Account' | 'Payment';
export type UserPlanType = 'Guest' | 'Trial' | 'Pro' | 'Enterprise';

export interface TicketUser {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    planType: UserPlanType;
}

export interface SupportTicket {
    id: string;
    ticketId: string; // Display ID like "TICK-001"
    user: TicketUser;
    type: TicketType;
    priority: TicketPriority;
    status: TicketStatus;
    subject: string;
    description: string;
    created: string;
    assignedTo?: string;
    hasRedDot?: boolean; // For visual indicator
}

export interface TicketMessage {
    id: string;
    ticketId: string;
    sender: {
        name: string;
        avatar?: string;
        isSupport: boolean;
    };
    message: string;
    timestamp: string;
}

// Mock data for development
export const mockUsers: TicketUser[] = [
    {
        id: '#11002233',
        name: 'Simmons',
        email: 'simmons@example.com',
        planType: 'Enterprise'
    },
    {
        id: '#11002234',
        name: 'Courtney',
        email: 'nathan.robertti@example.com',
        planType: 'Pro'
    },
    {
        id: '#11002235',
        name: 'Regina',
        email: 'alma.lawson@example.com',
        planType: 'Trial'
    },
    {
        id: '#11002236',
        name: 'Gloria',
        email: 'deanna.curtis@example.com',
        planType: 'Enterprise'
    },
    {
        id: '#11002237',
        name: 'Darlene',
        email: 'sara.cruz@example.com',
        planType: 'Guest'
    },
    {
        id: '#11002238',
        name: 'Aubrey',
        email: 'willie.jennings@example.com',
        planType: 'Pro'
    },
    {
        id: '#11002239',
        name: 'Judith',
        email: 'jessica.hanson@example.com',
        planType: 'Enterprise'
    },
    {
        id: '#11002240',
        name: 'Olivia Rhye',
        email: 'olivia@example.com',
        planType: 'Pro'
    }
];

export const mockTickets: SupportTicket[] = [
    {
        id: '1',
        ticketId: 'TICK-001',
        user: {
            id: '#11002233',
            name: 'John Smith',
            email: 'john@gmail.com',
            planType: 'Guest'
        },
        type: 'Sales',
        priority: 'Low',
        status: 'Open',
        subject: 'Pricing question for Enterprise',
        description: 'I would like to know more about the Enterprise pricing and features.',
        created: 'Feb 21, 2023 at 03:05 pm',
        hasRedDot: true
    },
    {
        id: '2',
        ticketId: 'TICK-002',
        user: {
            id: '#11002234',
            name: 'John Smith',
            email: 'john@gmail.com',
            planType: 'Trial'
        },
        type: 'Device',
        priority: 'Medium',
        status: 'In Progress',
        subject: 'Pricing question for Enterprise',
        description: 'Device sync issues with multiple screens.',
        created: 'Feb 21, 2023 at 03:05 pm',
        assignedTo: 'Thompson'
    },
    {
        id: '3',
        ticketId: 'TICK-002',
        user: {
            id: '#11002235',
            name: 'John Smith',
            email: 'john@gmail.com',
            planType: 'Pro'
        },
        type: 'Account',
        priority: 'High',
        status: 'Completed',
        subject: 'Pricing question for Enterprise',
        description: 'Unable to access account settings.',
        created: 'Feb 21, 2023 at 03:05 pm',
        assignedTo: 'Emanuel'
    },
    {
        id: '4',
        ticketId: 'TICK-002',
        user: {
            id: '#11002236',
            name: 'John Smith',
            email: 'john@gmail.com',
            planType: 'Enterprise'
        },
        type: 'Payment',
        priority: 'Medium',
        status: 'In Progress',
        subject: 'Pricing question for Enterprise',
        description: 'Payment method not being accepted.',
        created: 'Feb 21, 2023 at 03:05 pm',
        assignedTo: 'Lawal'
    },
    {
        id: '5',
        ticketId: 'TICK-002',
        user: {
            id: '#11002237',
            name: 'John Smith',
            email: 'john@gmail.com',
            planType: 'Pro'
        },
        type: 'Account',
        priority: 'High',
        status: 'Completed',
        subject: 'Pricing question for Enterprise',
        description: 'Need to update billing information.',
        created: 'Feb 21, 2023 at 03:05 pm',
        assignedTo: 'Emanuel'
    },
    {
        id: '6',
        ticketId: 'TICK-002',
        user: {
            id: '#11002238',
            name: 'John Smith',
            email: 'john@gmail.com',
            planType: 'Enterprise'
        },
        type: 'Payment',
        priority: 'Medium',
        status: 'In Progress',
        subject: 'Pricing question for Enterprise',
        description: 'Subscription renewal question.',
        created: 'Feb 21, 2023 at 03:05 pm',
        assignedTo: 'Lawal'
    },
    {
        id: '7',
        ticketId: 'TICK-002',
        user: {
            id: '#11002239',
            name: 'John Smith',
            email: 'john@gmail.com',
            planType: 'Pro'
        },
        type: 'Account',
        priority: 'High',
        status: 'Completed',
        subject: 'Pricing question for Enterprise',
        description: 'Account migration assistance needed.',
        created: 'Feb 21, 2023 at 03:05 pm',
        assignedTo: 'Emanuel'
    },
    {
        id: '8',
        ticketId: 'TICK-002',
        user: {
            id: '#11002240',
            name: 'John Smith',
            email: 'john@gmail.com',
            planType: 'Enterprise'
        },
        type: 'Payment',
        priority: 'Medium',
        status: 'In Progress',
        subject: 'Pricing question for Enterprise',
        description: 'Invoice request for last month.',
        created: 'Feb 21, 2023 at 03:05 pm',
        assignedTo: 'Lawal'
    },
    {
        id: '9',
        ticketId: 'TICK-002',
        user: {
            id: '#11002241',
            name: 'John Smith',
            email: 'john@gmail.com',
            planType: 'Enterprise'
        },
        type: 'Account',
        priority: 'High',
        status: 'Completed',
        subject: 'Pricing question for Enterprise',
        description: 'Password reset not working.',
        created: 'Feb 21, 2023 at 03:05 pm',
        assignedTo: 'Emanuel'
    },
    {
        id: '10',
        ticketId: 'TICK-002',
        user: {
            id: '#11002242',
            name: 'John Smith',
            email: 'john@gmail.com',
            planType: 'Enterprise'
        },
        type: 'Payment',
        priority: 'Medium',
        status: 'In Progress',
        subject: 'Pricing question for Enterprise',
        description: 'Refund request for cancelled subscription.',
        created: 'Feb 21, 2023 at 03:05 pm',
        assignedTo: 'Lawal'
    }
];

export const mockMessages: TicketMessage[] = [
    {
        id: '1',
        ticketId: '2',
        sender: {
            name: 'John Smith',
            isSupport: false
        },
        message: 'I am trying to upload a 4K video file but it keeps failing. The error message says "Upload failed, please try again". I have tried multiple times with different files.',
        timestamp: 'Today, 12:45 PM'
    },
    {
        id: '2',
        ticketId: '2',
        sender: {
            name: 'Jhon Doe',
            isSupport: false
        },
        message: 'I am trying to upload a 4K video file but it keeps failing. The error message says "Upload failed, please try again". I have tried multiple times with different files.',
        timestamp: 'Today, 12:45 PM'
    }
];
