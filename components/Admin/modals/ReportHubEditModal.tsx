'use client';

import React from 'react';
import ReportHubFormModal from './ReportHubFormModal';

interface ReportHubEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    reportData: any;
    onUpdate?: (report: any) => void;
}

/**
 * Dedicated component for editing reports, as requested.
 * Wraps the base form modal with 'edit' mode.
 */
export default function ReportHubEditModal({
    isOpen,
    onClose,
    reportData,
    onUpdate
}: ReportHubEditModalProps) {
    return (
        <ReportHubFormModal
            isOpen={isOpen}
            onClose={onClose}
            mode="edit"
            initialData={reportData}
            onSave={onUpdate}
        />
    );
}
