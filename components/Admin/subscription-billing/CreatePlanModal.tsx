// components/CreatePlanModal.tsx
import React from 'react';

const CreatePlanModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <h2>Create New Plan</h2>
        <input type="text" placeholder="Plan Name" className="w-full p-2 mb-2 border" />
        <textarea placeholder="Description" className="w-full p-2 mb-2 border" />
        <input type="number" placeholder="Price" className="w-full p-2 mb-2 border" />
        {/* Other fields */}
        <button onClick={() => console.log('Create Plan')} className="bg-blue-500 text-white p-2">Create Plan</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CreatePlanModal;