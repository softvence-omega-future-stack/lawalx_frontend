// components/WarningModal.tsx
import React from 'react';

const WarningModal: React.FC<{ onCancel: () => void; onConfirm: () => void }> = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <h2>Are You Sure?</h2>
        <p>This plan has 120 subscribers. Changing anything will impact all users in this plan.</p>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onConfirm} className="bg-red-500 text-white p-2">Edit</button>
      </div>
    </div>
  );
};

export default WarningModal;