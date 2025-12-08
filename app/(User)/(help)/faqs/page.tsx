'use client';

import React, { useState, useMemo } from 'react';
import { Search, ChevronRight, ChevronDown } from 'lucide-react';

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);

  const faqData = useMemo<{ category: string; questions: { id: string; question: string; answer: string }[] }[]>(() => [
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
      category: 'Scheduling & Automation',
      questions: [
        { id: 'sa1', question: 'How do I schedule content to play at specific times?', answer: 'Use the scheduling feature in your playlist settings. Select the playlist, click "Schedule", and set your desired start and end times for automated playback.' },
        { id: 'sa2', question: 'Can I schedule different content for different devices?', answer: 'Absolutely! You can create device-specific schedules by assigning different playlists to different devices with custom time slots.' }
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

  const categories = ['All Categories', ...faqData.map(section => section.category)];

  const filteredFAQ = useMemo(() => {
    let filtered = faqData;

    if (selectedCategory !== 'All Categories') {
      filtered = faqData.filter(section => section.category === selectedCategory);
    }

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
  }, [searchQuery, selectedCategory, faqData]); // fixed: added faqData

  const toggleQuestion = (id: string) => {
    setExpandedQuestions(prev =>
      prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Find answers and inspiration on all things tape.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Content"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-border bg-navbarBg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <div className="relative w-full sm:w-56">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-2.5 sm:py-3 border border-border bg-navbarBg rounded-lg text-left flex items-center justify-between hover:border-border transition-colors text-sm sm:text-base"
            >
              <span className="text-gray-700 dark:text-gray-300 truncate">{selectedCategory}</span>
              <ChevronDown className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform shrink-0 ml-2 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-navbarBg border border-border rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base ${
                      selectedCategory === category 
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-bgBlue dark:text-blue-400' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8 sm:space-y-10">
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">No questions found matching your search.</p>
            </div>
          ) : (
            filteredFAQ.map((section) => (
              <div key={section.category}>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                  {section.category}
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {section.questions.map((item) => (
                    <div
                      key={item.id}
                      className="bg-navbarBg rounded-lg border border-border overflow-hidden hover:shadow-md dark:hover:shadow-xl transition-shadow"
                    >
                      <button
                        onClick={() => toggleQuestion(item.id)}
                        className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-start justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <span className="text-sm sm:text-base font-medium text-gray-900 dark:text-white pr-4 leading-relaxed">
                          {item.question}
                        </span>
                        <ChevronRight
                          className={`w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0 transition-transform mt-0.5 ${
                            expandedQuestions.includes(item.id) ? 'rotate-90' : ''
                          }`}
                        />
                      </button>
                      {expandedQuestions.includes(item.id) && (
                        <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-0">
                          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
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