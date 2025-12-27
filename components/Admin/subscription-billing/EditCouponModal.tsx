


// components/EditCouponModal.tsx
import React from 'react';

const EditCouponModal: React.FC<{ coupon: any; onClose: () => void }> = ({ coupon, onClose }) => {
  // Similar to create but edit
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded">
        <h2>Edit Coupon</h2>
        <input type="text" defaultValue={coupon?.code} placeholder="Coupon Code" className="w-full p-2 mb-2 border" />
        {/* Other fields */}
        <button onClick={() => console.log('Save Coupon')} className="bg-blue-500 text-white p-2">Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EditCouponModal;