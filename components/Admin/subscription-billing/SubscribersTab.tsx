// components/SubscribersTab.tsx
import React, { useState } from 'react';
import Pagination from './Pagination';

const demoSubscribers = [
  { user: 'Jenny Wilson', email: 'jenny@gmail.com', plan: 'Starter', amount: '$299.00', cycle: 'Monthly', nextBilling: 'Jan 15, 2024', revenue: '$231.00' },
  { user: 'Brooklyn Simmons', email: 'brooklyn@gmail.com', plan: 'Professional', amount: '$299.00', cycle: 'Yearly', nextBilling: 'Jan 15, 2024', revenue: '$231.00' },
  // Add more demo data up to 20 for pagination
  // ... repeat similar entries to have at least 20
];

for (let i = demoSubscribers.length; i < 20; i++) {
  demoSubscribers.push({
    user: `User ${i + 1}`,
    email: `user${i + 1}@gmail.com`,
    plan: 'Business',
    amount: '$299.00',
    cycle: 'Monthly',
    nextBilling: 'Jan 15, 2024',
    revenue: '$231.00',
  });
}

const SubscribersTab: React.FC<{ darkMode: boolean }> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(demoSubscribers.length / itemsPerPage);
  const currentData = demoSubscribers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-navbarBg p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">All Users (1112)</h2>
      <input type="text" placeholder="Search by name, email, or user ID..." className="w-full p-2 mb-4 border dark:border-gray-600 dark:bg-gray-700" />
      <table className="w-full mb-4">
        <thead>
          <tr className="bg-blue-100 dark:bg-blue-900">
            <th>User</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Payment Cycle</th>
            <th>Next Billing</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((sub, index) => (
            <tr key={index}>
              <td>{sub.user} <br /> {sub.email}</td>
              <td><span className="bg-blue-200 dark:bg-blue-700 p-1 rounded">{sub.plan}</span></td>
              <td>{sub.amount}</td>
              <td>{sub.cycle}</td>
              <td>{sub.nextBilling}</td>
              <td>{sub.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default SubscribersTab;