// components/BillingInvoicesTab.tsx
import React, { useState } from 'react';
import Pagination from './Pagination';

const demoInvoices = [
  { invoice: 'INV-2023-1245', user: 'Jenny Wilson', email: 'olivia@gmail.com', method: 'Visa **** 4025', amount: '$299.00', status: 'Paid', date: 'December 15, 2024' },
  // Add more, up to 20
];

for (let i = demoInvoices.length; i < 20; i++) {
  demoInvoices.push({
    invoice: `INV-2023-${1245 + i}`,
    user: `User ${i + 1}`,
    email: `user${i + 1}@gmail.com`,
    method: 'Visa **** 4025',
    amount: '$299.00',
    status: 'Paid',
    date: 'December 15, 2024',
  });
}

const BillingInvoicesTab: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(demoInvoices.length / itemsPerPage);
  const currentData = demoInvoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>
      <input type="text" placeholder="Search by name, email, or invoice ID..." className="w-full p-2 mb-4 border dark:border-gray-600 dark:bg-gray-700" />
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>User</th>
            <th>Payment Method</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((inv, index) => (
            <tr key={index}>
              <td>{inv.invoice}</td>
              <td>{inv.user} <br /> {inv.email}</td>
              <td>{inv.method}</td>
              <td>{inv.amount}</td>
              <td><span className="bg-green-200 dark:bg-green-700 p-1 rounded">{inv.status}</span></td>
              <td>{inv.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      <button className="bg-blue-500 text-white p-2 rounded">Download All</button>
    </div>
  );
};

export default BillingInvoicesTab;