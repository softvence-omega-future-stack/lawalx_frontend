'use client';

import React, { useState } from 'react';
import { X, Plus, Info } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface AssignRule {
    id: string;
    category: string;
    employees: string[];
}

interface SetAssignRulesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (rules: AssignRule[]) => void;
}

const categories = ['Device', 'Sales', 'Storage', 'Content Creation', 'Enterprise Requests'];
const availableEmployees = ['Emanuel', 'Thompson', 'Lawal', 'Johnson', 'Smith'];

export default function SetAssignRulesModal({ isOpen, onClose, onSave }: SetAssignRulesModalProps) {
    const [rules, setRules] = useState<AssignRule[]>([
        { id: '1', category: 'Device', employees: [] },
        { id: '2', category: 'Sales', employees: ['Emanuel'] },
        { id: '3', category: 'Storage', employees: ['Emanuel', 'Thompson'] },
        { id: '4', category: 'Content Creation', employees: ['Emanuel'] },
        { id: '5', category: 'Enterprise Requests', employees: ['Emanuel'] },
    ]);

    const handleAddEmployee = (categoryId: string, employee: string) => {
        setRules(rules.map(rule =>
            rule.id === categoryId
                ? { ...rule, employees: [...rule.employees, employee] }
                : rule
        ));
    };

    const handleRemoveEmployee = (categoryId: string, employee: string) => {
        setRules(rules.map(rule =>
            rule.id === categoryId
                ? { ...rule, employees: rule.employees.filter(e => e !== employee) }
                : rule
        ));
    };

    const handleSave = () => {
        onSave(rules);
        onClose();
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40"
                    onClick={onClose}
                />
            )}

            {/* Modal */}
            <div
                className={`fixed top-16 right-0 h-[calc(100vh-4rem)] w-full md:w-[500px] lg:w-[600px] bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
                    <div className="p-6">
                        {/* Header */}
                        <div className="mb-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                                        Set Assign Rules
                                    </h2>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Set automation rules to assign employee
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Rules List */}
                        <div className="space-y-4 pr-2">
                            {rules.map((rule) => (
                                <div key={rule.id} className="border-b border-border pb-4 last:border-0">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {rule.category}
                                        </span>
                                        <Info className="w-4 h-4 text-gray-400" />
                                    </div>

                                    {/* Assigned Employees */}
                                    <div className="space-y-2 mb-3">
                                        {rule.employees.map((employee) => (
                                            <div
                                                key={employee}
                                                className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                                            {employee.charAt(0)}
                                                        </span>
                                                    </div>
                                                    <span className="text-sm text-gray-900 dark:text-white">
                                                        {employee}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveEmployee(rule.id, employee)}
                                                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                                                >
                                                    <X className="w-4 h-4 text-gray-500" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Add Employee Button */}
                                    <div className="relative group">
                                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                            <Plus className="w-4 h-4" />
                                            Add Employee
                                        </button>

                                        {/* Dropdown */}
                                        <div className="absolute hidden group-hover:block top-full left-0 w-full mt-1 bg-white dark:bg-gray-800 border border-border rounded-lg shadow-lg z-10">
                                            {availableEmployees
                                                .filter(emp => !rule.employees.includes(emp))
                                                .map((employee) => (
                                                    <button
                                                        key={employee}
                                                        onClick={() => handleAddEmployee(rule.id, employee)}
                                                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                                                    >
                                                        <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                                                {employee.charAt(0)}
                                                            </span>
                                                        </div>
                                                        <span className="text-sm text-gray-900 dark:text-white">
                                                            {employee}
                                                        </span>
                                                    </button>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-border">
                            <Button
                                className="flex-1 rounded-xl h-11 font-medium bg-gray-50 dark:bg-gray-800 border border-border text-gray-700 dark:text-gray-300 shadow-customShadow"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1 rounded-xl h-11 font-medium bg-blue-500 hover:bg-blue-600 text-white shadow-customShadow"
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
