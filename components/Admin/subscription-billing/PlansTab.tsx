// components/PlansTab.tsx
import React from 'react';

const demoPlans = [
  { name: 'Demo (For Developers)', description: 'Perfect for growing businesses with advanced needs', price: '$0/month', users: '120 Users', devices: '100', storage: '100 GB', upload: 'Max 200 Files', templates: '20' },
  { name: 'Free Trial', description: 'Perfect for growing businesses with advanced needs', price: '$0/month', users: '120 Users', devices: '20', storage: '10 GB', upload: 'Max 20 Files', templates: '1' },
  { name: 'Starter', description: 'Perfect for growing businesses with advanced needs', price: '$0/month', users: '120 Users', devices: '20', storage: '10 GB', upload: 'Max 20 Files', templates: '1' },
  { name: 'Business', description: 'Perfect for growing businesses with advanced needs', price: '$0/month', users: '120 Users', devices: '20', storage: '10 GB', upload: 'Max 20 Files', templates: '1' },
];

const PlansTab: React.FC<{ darkMode: boolean; onCreate: () => void; onEdit: (plan: any) => void }> = ({ darkMode, onCreate, onEdit }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">All Plans</h2>
      <button onClick={onCreate} className="bg-blue-500 text-white p-2 rounded mb-4">Create New Plan</button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {demoPlans.map((plan, index) => (
          <div key={index} className="border dark:border-gray-600 p-4 rounded">
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <p>{plan.price}</p>
            <p>{plan.users}</p>
            <p>Devices: {plan.devices}</p>
            <p>Storage: {plan.storage}</p>
            <p>Upload Limits: {plan.upload}</p>
            <p>Templates: {plan.templates}</p>
            <button onClick={() => onEdit(plan)} className="bg-gray-200 dark:bg-gray-700 p-2 rounded">Edit</button>
          </div>
        ))}
      </div>
      <div className="bg-orange-100 dark:bg-orange-900 p-4 rounded">
        <h3>Yearly Discount</h3>
        <p>Offer a discount for yearly billing.</p>
        <input type="number" placeholder="0" className="p-2 border dark:border-gray-600 dark:bg-gray-700" /> %
        <button className="bg-blue-500 text-white p-2 rounded">Save</button>
      </div>
    </div>
  );
};

export default PlansTab;