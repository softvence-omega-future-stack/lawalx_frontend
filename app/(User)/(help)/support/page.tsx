"use client";

import React, { useState, useRef } from "react";
import { Paperclip, Send, User, X } from "lucide-react";
import CreateTicketModal from "@/components/support/CreateTicketModal";

interface Ticket {
  id: string;
  issueType: string;
  status: "Not Assigned" | "In Progress" | "Resolved";
  title: string;
  assignedTo: string;
  messages: Message[];
}

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  isUser: boolean;
  attachment?: string;
}

const Support = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "#TKT-001",
      issueType: "Device Failure",
      status: "Not Assigned",
      title: "Unable to upload videos to playlist",
      assignedTo: "Jhon Doe",
      messages: [
        {
          id: "1",
          sender: "You",
          text: 'I am trying to upload a 4K video file but it keeps failing. The error message says "Upload failed, please try again." I have tried multiple times with different files.',
          timestamp: "Today, Ticket Created",
          isUser: true,
        },
        {
          id: "2",
          sender: "Jhon Doe",
          text: "Thank you for reaching out. We are looking into the upload issue and will get back to you shortly.",
          timestamp: "Today, 12:34 PM",
          isUser: false,
        },
      ],
    },
    {
      id: "#TKT-002",
      issueType: "Login Failure",
      status: "In Progress",
      title: "Cannot login to account",
      assignedTo: "Jhon Doe",
      messages: [],
    },
    {
      id: "#TKT-003",
      issueType: "Login Failure",
      status: "Resolved",
      title: "Password reset issue",
      assignedTo: "Jhon Doe",
      messages: [],
    },
    {
      id: "#TKT-004",
      issueType: "Login Failure",
      status: "Resolved",
      title: "Two-factor authentication problem",
      assignedTo: "Jhon Doe",
      messages: [],
    },
    {
      id: "#TKT-005",
      issueType: "Content Issue",
      status: "Resolved",
      title: "Video playback not working",
      assignedTo: "Jhon Doe",
      messages: [],
    },
    {
      id: "#TKT-006",
      issueType: "Payment Issue",
      status: "Resolved",
      title: "Billing discrepancy",
      assignedTo: "Jhon Doe",
      messages: [],
    },
    {
      id: "#TKT-007",
      issueType: "Other",
      status: "Resolved",
      title: "General inquiry",
      assignedTo: "Jhon Doe",
      messages: [],
    },
    {
      id: "#TKT-008",
      issueType: "Device Issue",
      status: "Resolved",
      title: "Screen not displaying content",
      assignedTo: "Jhon Doe",
      messages: [],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(
    tickets[0]
  );
  const [newMessage, setNewMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openModal = () => setIsModalOpen(true);

  const handleCreateTicket = (data: {
    issueType: string;
    subject: string;
    message: string;
    file?: File | null;
  }) => {
    const newTicket: Ticket = {
      id: `#TKT-${String(tickets.length + 1).padStart(3, "0")}`,
      issueType: `${data.issueType} Issue`,
      status: "Not Assigned",
      title: data.subject,
      assignedTo: "Jhon Doe",
      messages: [
        {
          id: "1",
          sender: "You",
          text: data.message,
          timestamp: "Today, Ticket Created",
          isUser: true,
          attachment: data.file?.name,
        },
      ],
    };

    setTickets([newTicket, ...tickets]);
    setSelectedTicket(newTicket);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedTicket) return;

    const newMsg: Message = {
      id: String(selectedTicket.messages.length + 1),
      sender: "You",
      text: newMessage,
      timestamp: `Today, ${new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })}`,
      isUser: true,
      attachment: attachedFiles.length > 0 ? attachedFiles[0].name : undefined,
    };

    const updatedTickets = tickets.map((ticket) =>
      ticket.id === selectedTicket.id
        ? { ...ticket, messages: [...ticket.messages, newMsg] }
        : ticket
    );

    setTickets(updatedTickets);
    setSelectedTicket((prev) =>
      prev?.id === selectedTicket.id
        ? { ...prev, messages: [...prev.messages, newMsg] }
        : prev
    );

    setNewMessage("");
    setAttachedFiles([]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachedFiles(Array.from(e.target.files));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Not Assigned":
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
      case "In Progress":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
      case "Resolved":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen">
      <div className="mt-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Support Center
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            We are here to help you with any issues
          </p>
        </div>

        {/* All Tickets Header */}
        <div className="flex items-center justify-between mb-6 px-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            All Tickets
          </h2>
          <button
            onClick={openModal}
            className="px-5 py-2.5 bg-bgBlue hover:bg-blue-500 text-white text-sm font-medium rounded-lg shadow-customShadow transition-colors"
          >
            + Create Ticket
          </button>
        </div>

        {/* Main Layout */}
        <div className="bg-navbarBg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden scrollbar-hide">
          <div className="flex flex-col lg:flex-row h-[700px] overflow-y-auto">
            {/* Tickets List */}
            <div className="w-full lg:w-1/2 border-r border-gray-200 dark:border-gray-700">
              <div className="h-full overflow-y-auto scrollbar-hide">
                <table className="w-full">
                  {/* TABLE HEADER */}
                  <thead className="bg-cardBackground2 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
                    <tr className="h-20">
                      <th className="px-6 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Ticket ID
                      </th>
                      <th className="px-6 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Issue Type
                      </th>
                      <th className="px-6 text-left text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {tickets.map((ticket) => (
                      <tr
                        key={ticket.id}
                        onClick={() => setSelectedTicket(ticket)}
                        className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                          selectedTicket?.id === ticket.id
                            ? "bg-blue-50/60 dark:bg-blue-800/30"
                            : ""
                        }`}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                          {ticket.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                          {ticket.issueType}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-2.5 text-xs font-medium rounded-full ${getStatusColor(
                              ticket.status
                            )}`}
                          >
                            {ticket.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chat Area */}
            <div className="w-full lg:w-1/2 flex flex-col">
              {selectedTicket ? (
                <>
                  {/* CHAT HEADER - Now perfectly matches table header */}
                  <div className="h-20 flex items-center justify-between px-4 sm:px-6 bg-cardBackground2 border-b border-gray-200 dark:border-gray-700">
                    {/* Left - Title + ID */}
                    <div className="flex items-center gap-6 sm:gap-8 min-w-0">
                      <div className="truncate">
                        <h3 className="text-[0.825rem] xs:text-sm sm:text-base font-medium text-gray-900 dark:text-gray-300 tracking-wider truncate">
                          {selectedTicket.title}
                        </h3>
                        <p className="text-[0.7rem] xs:text-xs text-gray-500 dark:text-gray-400">
                          ID: {selectedTicket.id}
                        </p>
                      </div>
                    </div>

                    {/* Middle - Issue Type (hidden on very small screens) */}
                    {/* <div className="hidden xl:block text-center">
                      <p className="text-[0.7rem] xs:text-xs text-gray-500 dark:text-gray-400">
                        Issue
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-300">
                        {selectedTicket.issueType}
                      </p>
                    </div> */}

                    {/* Right - Assigned To */}
                    <div className="text-right min-w-0">
                      <p className="text-[0.7rem] xs:text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                        Assigned to
                      </p>
                      <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-300 truncate max-w-32 sm:max-w-none">
                        {selectedTicket.assignedTo}
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-navbarBg scrollbar-hide">
                    {selectedTicket.messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                        No messages yet. Start the conversation!
                      </div>
                    ) : (
                      selectedTicket.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex gap-4 ${
                            msg.isUser ? "flex-row-reverse" : ""
                          }`}
                        >
                          <div className="shrink-0">
                            {msg.isUser ? (
                              <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                              </div>
                            ) : (
                              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                                JD
                              </div>
                            )}
                          </div>

                          <div
                            className={`max-w-md ${
                              msg.isUser ? "text-right" : ""
                            }`}
                          >
                            {!msg.isUser && (
                              <p className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {msg.sender}
                              </p>
                            )}
                            <div
                              className={`rounded-2xl px-4 py-3 ${
                                msg.isUser
                                  ? "bg-gray-800 dark:bg-white/20 text-white"
                                  : "bg-cardBackground2 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700"
                              }`}
                            >
                              <p className="text-sm leading-relaxed">
                                {msg.text}
                              </p>
                              {msg.attachment && (
                                <div className="mt-3 flex items-center gap-2 text-xs opacity-80">
                                  <Paperclip className="w-4 h-4" />
                                  {msg.attachment}
                                </div>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                              {msg.timestamp}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-cardBackground2">
                    {attachedFiles.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
                        {attachedFiles.map((file, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs"
                          >
                            <Paperclip className="w-4 h-4" />
                            <span>{file.name}</span>
                            <button
                              onClick={() =>
                                setAttachedFiles(
                                  attachedFiles.filter((_, idx) => idx !== i)
                                )
                              }
                              className="text-gray-500 hover:text-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                        multiple
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <Paperclip className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </button>

                      <textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          !e.shiftKey &&
                          handleSendMessage()
                        }
                        className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue text-sm text-gray-900 dark:text-white"
                      />

                      <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="px-5 py-2.5 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                      >
                        <span className="hidden sm:inline">Send</span>
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg">
                  Select a ticket to view conversation
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reusable Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateTicket}
      />
    </div>
  );
};

export default Support;
