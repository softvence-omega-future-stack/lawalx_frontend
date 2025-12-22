// components/CreateCouponModal.tsx
import React from 'react';

const CreateCouponModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <h2>Create a Coupon</h2>
        <input type="text" placeholder="Name" className="w-full p-2 mb-2 border" />
        <input type="text" placeholder="Coupon Code" className="w-full p-2 mb-2 border" />
        {/* Other fields */}
        <button onClick={() => console.log('Create Coupon')} className="bg-blue-500 text-white p-2">Create Coupon</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateCouponModal;