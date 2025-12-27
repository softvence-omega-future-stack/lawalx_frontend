// components/EditPlanModal.tsx
import React from 'react';

const EditPlanModal: React.FC<{ plan: any; onClose: () => void }> = ({ plan, onClose }) => {
  // Similar to CreatePlanModal but with prefilled data
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <h2>Edit Plan</h2>
        <input type="text" defaultValue={plan?.name} placeholder="Plan Name" className="w-full p-2 mb-2 border" />
        {/* Other fields */}
        <button onClick={() => console.log('Save Plan')} className="bg-blue-500 text-white p-2">Save Plan</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditPlanModal;