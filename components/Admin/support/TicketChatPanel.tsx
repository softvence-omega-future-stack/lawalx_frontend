'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Paperclip } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { type SupportTicket } from '@/types/supportTickets';
import { mockMessages } from '@/types/supportTickets';

interface TicketChatPanelProps {
    isOpen: boolean;
    onClose: () => void;
    ticket: SupportTicket | null;
}

export default function TicketChatPanel({ isOpen, onClose, ticket }: TicketChatPanelProps) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(mockMessages);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [isOpen, messages]);

    if (!ticket) return null;

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                id: String(messages.length + 1),
                ticketId: ticket.id,
                sender: {
                    name: 'Support Team',
                    isSupport: true
                },
                message: message.trim(),
                timestamp: 'Just now'
            };
            setMessages([...messages, newMessage]);
            setMessage('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Chat Panel */}
            <div
                className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-full md:w-[500px] lg:w-[600px] bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="border-b border-border p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {ticket.ticketId}
                                    </h3>
                                    <Badge variant="default" className="text-xs">
                                        {ticket.type}
                                    </Badge>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {ticket.subject}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                        {ticket.user.name.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900 dark:text-white">{ticket.user.name}</div>
                                    <div className="text-gray-500 dark:text-gray-400">{ticket.user.email}</div>
                                </div>
                            </div>
                            {ticket.assignedTo && (
                                <div className="text-right">
                                    <div className="text-gray-500 dark:text-gray-400">Assigned to</div>
                                    <div className="font-medium text-gray-900 dark:text-white flex items-center gap-1.5 justify-end">
                                        <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                            <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300">
                                                {ticket.assignedTo.charAt(0)}
                                            </span>
                                        </div>
                                        {ticket.assignedTo}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.filter(m => m.ticketId === ticket.id).map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-3 ${msg.sender.isSupport ? 'flex-row-reverse' : ''}`}
                            >
                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                        {msg.sender.name.charAt(0)}
                                    </span>
                                </div>
                                <div className={`flex-1 ${msg.sender.isSupport ? 'text-right' : ''}`}>
                                    {/* <div className="flex items-end gap-2 mb-1">
                                        <span className="text-xs font-medium text-gray-900 dark:text-white">
                                            {msg.sender.name}
                                        </span>
                                    </div> */}
                                    <div
                                        className={`inline-block max-w-[85%] p-3 rounded-lg text-sm ${msg.sender.isSupport
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                                            }`}
                                    >
                                        {msg.message}
                                    </div>
                                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                        {msg.timestamp}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="border-t border-border p-4">
                        <div className="flex items-end gap-2">
                            <div className="flex-1 relative">
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type message"
                                    rows={1}
                                    className="w-full px-4 py-2.5 pr-10 text-sm bg-gray-50 dark:bg-gray-800 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:text-white"
                                />
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            console.log('File selected:', file.name);
                                            // Handle file upload here
                                        }
                                    }}
                                />
                                <button
                                    onClick={() => document.getElementById('file-upload')?.click()}
                                    className="absolute right-2 bottom-2.5 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                >
                                    <Paperclip className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </button>
                            </div>
                            <button
                                onClick={handleSendMessage}
                                className="px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2 transition-colors"
                            >
                                <span className="text-sm font-medium">Send</span>
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
