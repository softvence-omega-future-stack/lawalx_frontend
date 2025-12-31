/* eslint-disable @typescript-eslint/no-explicit-any */
// components/CouponsTab.tsx
import React, { useState } from 'react';
import Pagination from './Pagination';

const demoCoupons = [
  { code: 'WELCOME25', discount: '30%', cycle: 'Once', usage: '156/500', status: 'Active', expiry: 'December 15, 2024' },
  { code: 'ENTERPRISE50', discount: '30%', cycle: '3 months', usage: '156/500', status: 'Expired', expiry: 'December 15, 2024' },
  // Add more up to 20
];

for (let i = demoCoupons.length; i < 20; i++) {
  demoCoupons.push({
    code: `COUPON${i + 1}`,
    discount: '30%',
    cycle: 'Once',
    usage: '156/500',
    status: 'Active',
    expiry: 'December 15, 2024',
  });
}

const CouponsTab: React.FC<{ onCreate: () => void; onEdit: (coupon: any) => void; onStop: (coupon: any) => void }> = ({ onCreate, onEdit, onStop }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(demoCoupons.length / itemsPerPage);
  const currentData = demoCoupons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const [showMenu, setShowMenu] = useState<number | null>(null);

  const handleMenu = (index: number) => {
    setShowMenu(showMenu === index ? null : index);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Coupon Management</h2>
      <button onClick={onCreate} className="bg-blue-500 text-white p-2 rounded mb-4">Create New Coupon</button>
      <input type="text" placeholder="Search by code..." className="w-full p-2 mb-4 border dark:border-gray-600 dark:bg-gray-700" />
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th>Code</th>
            <th>Discount</th>
            <th>Coupon Cycle</th>
            <th>Usage</th>
            <th>Status</th>
            <th>Expiry Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((coupon, index) => (
            <tr key={index}>
              <td>{coupon.code}</td>
              <td>{coupon.discount}</td>
              <td>{coupon.cycle}</td>
              <td>
                <div className="bg-blue-200 dark:bg-blue-700 w-32 h-2 rounded">
                  <div className="bg-blue-500 h-2 rounded" style={{ width: '30%' }}></div>
                </div>
                {coupon.usage}
              </td>
              <td><span className={`p-1 rounded ${coupon.status === 'Active' ? 'bg-green-200 dark:bg-green-700' : 'bg-gray-200 dark:bg-gray-700'}`}>{coupon.status}</span></td>
              <td>{coupon.expiry}</td>
              <td className="relative">
                <button onClick={() => handleMenu(index)}>...</button>
                {showMenu === index && (
                  <div className="absolute bg-white dark:bg-gray-800 border p-2 rounded shadow">
                    <button onClick={() => onEdit(coupon)}>Edit Coupon</button>
                    <button onClick={() => onStop(coupon)} className="text-red-500">Stop Coupon</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default CouponsTab;