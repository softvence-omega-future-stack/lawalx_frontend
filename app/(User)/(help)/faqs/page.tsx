"use client";

import React, { useState, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import HelpCenterHeader from '@/components/help/HelpCenterHeader';
import CategoryTabs from '@/components/help/CategoryTabs';

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  // FAQ Data Structure mirroring the design categories
  const faqData = useMemo(() => [
    {
      category: 'Device Management',
      questions: [
        { id: 'dm1', question: 'How do I add a new device to my Tape account?', answer: 'To add a new device, go to the Devices page and click "Add Device". You\'ll receive an enrollment code that needs to be entered on your device. Make sure your device is connected to the internet and follow the setup wizard.' },
        { id: 'dm2', question: 'My device is showing as offline. What should I do?', answer: 'Check your internet connection, ensure the Tape app is running, and verify your device settings. If issues persist, try restarting your device.' },
        { id: 'dm3', question: 'Can I control multiple screens from one device?', answer: 'Yes, you can manage multiple screens from a single device through the Tape dashboard. Simply add multiple displays to your account.' },
        { id: 'dm4', question: 'How do I remove a device from my account?', answer: 'Navigate to the Devices page, select the device you want to remove, and click the "Remove Device" button. Confirm the action to complete the removal.' }
      ]
    },
    {
      category: 'Content & Playlists',
      questions: [
        { id: 'cp1', question: 'What video formats does Tape support?', answer: 'Tape supports MP4, MOV, AVI, and WebM formats. For best performance, we recommend using MP4 with H.264 encoding.' },
        { id: 'cp2', question: 'How do I create a playlist?', answer: 'Go to the Playlists section, click "Create New Playlist", add your desired content, arrange the order, and save your playlist.' },
        { id: 'cp3', question: 'Can I add captions to my videos?', answer: 'Yes, you can upload SRT or VTT caption files when adding videos to your content library. Captions will be displayed automatically during playback.' }
      ]
    },
    {
      category: 'Schedule',
      questions: [
        { id: 'sa1', question: 'How do I schedule content to play at specific times?', answer: 'Use the scheduling feature in your playlist settings. Select the playlist, click "Schedule", and set your desired start and end times for automated playback.' },
        { id: 'sa2', question: 'Can I schedule different content for different devices?', answer: 'Absolutely! You can create device-specific schedules by assigning different playlists to different devices with custom time slots.' },
        { id: 'sa3', question: 'Can I add captions to my videos?', answer: 'Yes, you can upload SRT or VTT caption files when adding videos to your content library.' }
      ]
    },
    {
      category: 'Billing & Subscriptions',
      questions: [
        { id: 'bs1', question: 'How do I upgrade my plan?', answer: 'Visit the Billing section in your account settings, select your desired plan, and follow the upgrade process. Changes take effect immediately.' },
        { id: 'bs2', question: 'What happens if I exceed my device limit?', answer: 'You\'ll receive a notification and be prompted to upgrade your plan. Devices added beyond your limit may have restricted functionality until you upgrade.' }
      ]
    }
  ], []);

  const categories = ['All', ...faqData.map(section => section.category)];

  const filteredFAQ = useMemo(() => {
    let filtered = faqData;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = faqData.filter(section => section.category === selectedCategory);
    }

    // Filter by search query within the filtered categories
    if (searchQuery.trim()) {
      filtered = filtered.map(section => ({
        ...section,
        questions: section.questions.filter(q =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(section => section.questions.length > 0);
    }

    return filtered;
  }, [searchQuery, selectedCategory, faqData]);

  const toggleQuestion = (id: string) => {
    setExpandedQuestions(prev =>
      prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-12 w-full max-w-[1920px] mx-auto">
      <HelpCenterHeader
        title="Frequently Asked Questions"
        description="Find answers and inspiration on all things tape."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* FAQ Sections */}
        <div className="space-y-12">
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No questions found matching your search.</p>
            </div>
          ) : (
            filteredFAQ.map((section) => (
              <div key={section.category}>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                  {section.category}
                </h2>
                <div className="divide-y divide-gray-200 dark:divide-gray-800 border-t border-b border-gray-200 dark:border-gray-800">
                  {section.questions.map((item) => (
                    <div
                      key={item.id}
                      className="group"
                    >
                      <button
                        onClick={() => toggleQuestion(item.id)}
                        className="w-full py-4 flex items-start justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors px-2 cursor-pointer"
                      >
                        <span className="text-base font-medium text-gray-900 dark:text-white pr-4">
                          {item.question}
                        </span>
                        <ChevronRight
                          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 cursor-pointer ${expandedQuestions.includes(item.id) ? 'rotate-90' : ''
                            }`}
                        />
                      </button>
                      {expandedQuestions.includes(item.id) && (
                        <div className="pb-4 px-2">
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQs;