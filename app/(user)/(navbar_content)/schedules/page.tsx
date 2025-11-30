// 'use client';

// import React, { useState } from 'react';
// import { Play, Pause, Edit2, Trash2, X, Clock, Calendar, Monitor, Video, Check } from 'lucide-react';

// interface Schedule {
//   id: string;
//   name: string;
//   description: string;
//   content: string[];
//   devices: string[];
//   repeat: 'once' | 'daily' | 'weekly' | 'monthly';
//   playTime?: string;
//   days?: string[];
//   active: boolean;
// }

// export default function ContentSchedulingDashboard() {
//   const [schedules, setSchedules] = useState<Schedule[]>([
//     {
//       id: '1',
//       name: 'Morning Content',
//       description: 'Play welcome content during morning hours',
//       content: ['Video 1'],
//       devices: ['Main Lobby Display', 'Building A, Ground Floor'],
//       repeat: 'daily',
//       playTime: '09:00 AM',
//       days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
//       active: true,
//     },
//   ]);

//   const [isOpen, setIsOpen] = useState(false);
//   const [step, setStep] = useState(1);
//   const [editing, setEditing] = useState<Schedule | null>(null);

//   const [form, setForm] = useState<Partial<Schedule>>({
//     name: '',
//     description: '',
//     content: [],
//     devices: [],
//     repeat: 'daily',
//     playTime: '09:00 AM',
//     days: [],
//   });

//   const contentItems = ['Video 1', 'Video 2', 'Welcome Video', 'Promotion 2025'];
//   const screens = [
//     { name: 'Main Lobby Display', status: 'online' },
//     { name: 'Building A, Ground Floor', status: 'online' },
//     { name: 'Building A, Ground Floor', status: 'offline' },
//     { name: 'Main Lobby Display', status: 'offline' },
//   ];

//   const steps = [
//     { id: 1, title: 'Name and Description' },
//     { id: 2, title: 'Content Selection' },
//     { id: 3, title: 'Screen Selection' },
//     { id: 4, title: 'Schedule Settings' },
//   ];

//   const openModal = (schedule?: Schedule) => {
//     if (schedule) {
//       setEditing(schedule);
//       setForm(schedule);
//     } else {
//       setEditing(null);
//       setForm({
//         name: '',
//         description: '',
//         content: [],
//         devices: [],
//         repeat: 'daily',
//         playTime: '09:00 AM',
//         days: [],
//       });
//     }
//     setStep(1);
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//     setStep(1);
//   };

//   const next = () => step < 4 && setStep(step + 1);
//   const prev = () => step > 1 && setStep(step - 1);

//   const save = () => {
//     if (editing) {
//       setSchedules(s => s.map(item => item.id === editing.id ? { ...form, id: item.id, active: item.active } as Schedule : item));
//     } else {
//       const newSch: Schedule = {
//         id: Date.now().toString(),
//         name: form.name || 'Untitled',
//         description: form.description || '',
//         content: form.content || [],
//         devices: form.devices || [],
//         repeat: form.repeat || 'daily',
//         playTime: form.playTime,
//         days: form.days,
//         active: true,
//       };
//       setSchedules(s => [...s, newSch]);
//     }
//     closeModal();
//   };

//   const toggle = (id: string) => {
//     setSchedules(s => s.map(item => item.id === id ? { ...item, active: !item.active } : item));
//   };

//   const remove = (id: string) => {
//     setSchedules(s => s.filter(item => item.id !== id));
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gray-100">
//         <div className="max-w-7xl mx-auto p-6 lg:p-10">
//           {/* Header */}
//           <div className="flex justify-between items-start mb-8">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Content Scheduling</h1>
//               <p className="text-gray-600 mt-1">Schedule when and where your content should play</p>
//             </div>
//             <button
//               onClick={() => openModal()}
//               className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition"
//             >
//               + Create Schedule
//             </button>
//           </div>

//           {/* Schedule Cards */}
//           <div className="space-y-4">
//             {schedules.map(sch => (
//               <div key={sch.id} className="bg-white rounded-2xl shadow-sm border border-gray-200">
//                 <div className="p-6">
//                   <div className="flex justify-between items-start">
//                     <div className="flex items-start gap-4">
//                       <button onClick={() => toggle(sch.id)} className="mt-1">
//                         {sch.active ? <Play className="w-5 h-5 text-gray-600" /> : <Pause className="w-5 h-5 text-gray-400" />}
//                       </button>
//                       <div>
//                         <h3 className="text-lg font-semibold text-gray-900">{sch.name}</h3>
//                         <p className="text-gray-600 text-sm mt-1">{sch.description}</p>
//                         <div className="flex flex-wrap gap-6 mt-4 text-sm text-gray-600">
//                           <div className="flex items-center gap-2">
//                             <Clock className="w-4 h-4" />
//                             <span>{sch.days?.join(', ') || 'Mon-Fri'} • {sch.playTime}</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <Calendar className="w-4 h-4" />
//                             <span className="capitalize">{sch.repeat}</span>
//                           </div>
//                           <div className="flex items-center gap-2">
//                             <Monitor className="w-4 h-4" />
//                             <span>{sch.devices.length} Devices</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex gap-2">
//                       <button onClick={() => openModal(sch)} className="p-2 hover:bg-gray-100 rounded-lg">
//                         <Edit2 className="w-5 h-5 text-gray-600" />
//                       </button>
//                       <button onClick={() => remove(sch.id)} className="p-2 hover:bg-red-50 rounded-lg">
//                         <Trash2 className="w-5 h-5 text-red-600" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Modal – Exact Design Match */}
//         {isOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//             <div className="fixed inset-0 bg-black/40" onClick={closeModal} />
//             <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-screen overflow-y-auto">
//               <div className="p-8">
//                 {/* Header */}
//                 <div className="flex justify-between items-center mb-8">
//                   <h2 className="text-2xl font-bold text-gray-900">
//                     {editing ? 'Edit Schedule' : 'Create New Schedule'}
//                   </h2>
//                   <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
//                     <X className="w-6 h-6" />
//                   </button>
//                 </div>

//                 {/* Step Progress Bar */}
//                 <div className="flex items-center justify-between mb-10">
//                   {steps.map((s, i) => (
//                     <React.Fragment key={s.id}>
//                       <div className="flex flex-col items-center">
//                         <div
//                           className={`w-12 h-12 rounded-full flex items-center justify-center ${
//                             step > s.id
//                               ? 'bg-green-100 text-green-600'
//                               : step === s.id
//                               ? 'bg-blue-100 text-blue-600'
//                               : 'bg-gray-100 text-gray-400'
//                           }`}
//                         >
//                           {step > s.id ? <Check className="w-6 h-6" /> : <Video className="w-6 h-6" />}
//                         </div>
//                         <span className="text-xs mt-2 text-gray-600 text-center w-24">{s.title}</span>
//                       </div>
//                       {i < 3 && (
//                         <div className={`flex-1 h-0.5 mx-4 ${step > s.id + 1 ? 'bg-green-500' : 'bg-gray-300'}`} />
//                       )}
//                     </React.Fragment>
//                   ))}
//                 </div>

//                 {/* Step 1 */}
//                 {step === 1 && (
//                   <div className="space-y-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//                       <input
//                         type="text"
//                         value={form.name || ''}
//                         onChange={e => setForm({ ...form, name: e.target.value })}
//                         placeholder="Placeholder"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
//                       <textarea
//                         value={form.description || ''}
//                         onChange={e => setForm({ ...form, description: e.target.value })}
//                         placeholder="Enter schedule description"
//                         rows={4}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* Step 2 – Content */}
//                 {step === 2 && (
//                   <div>
//                     <div className="flex gap-4 mb-6">
//                       <input type="text" placeholder="Search Content" className="flex-1 px-4 py-3 border rounded-lg" />
//                       <select className="px-4 py-3 border rounded-lg">
//                         <option>Videos</option>
//                       </select>
//                     </div>
//                     <div className="space-y-3">
//                       {contentItems.map(item => (
//                         <label key={item} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={form.content?.includes(item)}
//                             onChange={e => {
//                               if (e.target.checked) {
//                                 setForm({ ...form, content: [...(form.content || []), item] });
//                               } else {
//                                 setForm({ ...form, content: form.content?.filter(x => x !== item) });
//                               }
//                             }}
//                             className="w-5 h-5 text-blue-600 rounded"
//                           />
//                           <div className="w-16 h-16 bg-gray-200 border-2 border-dashed rounded ml-4" />
//                           <div className="ml-4">
//                             <p className="font-medium">{item}</p>
//                             <p className="text-sm text-gray-500">40 MB</p>
//                           </div>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Step 3 – Screens */}
//                 {step === 3 && (
//                   <div>
//                     <input type="text" placeholder="Search Screen" className="w-full px-4 py-3 border rounded-lg mb-6" />
//                     <div className="space-y-3">
//                       {screens.map(screen => (
//                         <label key={screen.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
//                           <div className="flex items-center">
//                             <input
//                               type="checkbox"
//                               checked={form.devices?.includes(screen.name)}
//                               onChange={e => {
//                                 if (e.target.checked) {
//                                   setForm({ ...form, devices: [...(form.devices || []), screen.name] });
//                                 } else {
//                                   setForm({ ...form, devices: form.devices?.filter(d => d !== screen.name) });
//                                 }
//                               }}
//                               className="w-5 h-5 text-blue-600 rounded"
//                             />
//                             <span className="ml-4 font-medium">{screen.name}</span>
//                           </div>
//                           <span className={`px-3 py-1 rounded-full text-xs font-medium ${screen.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                             {screen.status}
//                           </span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Step 4 – Schedule Settings */}
//                 {step === 4 && (
//                   <div className="space-y-8">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-3">Repeat</label>
//                       <select
//                         value={form.repeat}
//                         onChange={e => setForm({ ...form, repeat: e.target.value as any })}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                       >
//                         <option value="once">Run Once</option>
//                         <option value="daily">Daily</option>
//                         <option value="weekly">Weekly</option>
//                         <option value="monthly">Monthly</option>
//                       </select>
//                     </div>

//                     {form.repeat === 'weekly' && (
//                       <div>
//                         <p className="text-sm font-medium text-gray-700 mb-4">Select Days</p>
//                         <div className="grid grid-cols-7 gap-3">
//                           {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
//                             <button
//                               key={day}
//                               type="button"
//                               onClick={() => {
//                                 const days = form.days || [];
//                                 setForm({
//                                   ...form,
//                                   days: days.includes(day) ? days.filter(d => d !== day) : [...days, day],
//                                 });
//                               }}
//                               className={`py-3 rounded-lg font-medium ${
//                                 form.days?.includes(day)
//                                   ? 'bg-blue-600 text-white'
//                                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//                               }`}
//                             >
//                               {day}
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {(form.repeat === 'daily' || form.repeat === 'weekly') && (
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-3">Play Time</label>
//                         <input
//                           type="text"
//                           value={form.playTime}
//                           onChange={e => setForm({ ...form, playTime: e.target.value })}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg"
//                           placeholder="09:00 AM"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 )}

//                 {/* Footer */}
//                 <div className="flex justify-between items-center mt-12">
//                   <button
//                     onClick={prev}
//                     disabled={step === 1}
//                     className="px-6 py-3 text-gray-700 flex items-center gap-2 disabled:opacity-50"
//                   >
//                     ← Previous
//                   </button>

//                   <span className="text-sm text-gray-500">Step {step} of 4</span>

//                   {step < 4 ? (
//                     <button
//                       onClick={next}
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
//                     >
//                       Next →
//                     </button>
//                   ) : (
//                     <button
//                       onClick={save}
//                       className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
//                     >
//                       {editing ? 'Update Schedule' : 'Create Schedule'}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }


// app/schedules/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Play,
  Pause,
  Edit2,
  Trash2,
  X,
  Clock,
  Calendar,
  Monitor,
  Video,
  Check,
} from 'lucide-react';
import Link from 'next/link';

interface Schedule {
  id: string;
  name: string;
  description: string;
  content: string[];
  devices: string[];
  repeat: 'once' | 'daily' | 'weekly' | 'monthly';
  playTime?: string;
  days?: string[];
  active: boolean;
}

export default function ContentSchedulingDashboard() {
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: '1',
      name: 'Morning Content',
      description: 'Play welcome content during morning hours',
      content: ['Video 1'],
      devices: ['Main Lobby Display', 'Building A, Ground Floor'],
      repeat: 'daily',
      playTime: '09:00 AM',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      active: true,
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [editing, setEditing] = useState<Schedule | null>(null);

  const [form, setForm] = useState<Partial<Schedule>>({
    name: '',
    description: '',
    content: [],
    devices: [],
    repeat: 'daily',
    playTime: '09:00 AM',
    days: [],
  });

  const contentItems = ['Video 1', 'Video 2', 'Welcome Video', 'Promotion 2025'];

  const screens = [
    { name: 'Main Lobby Display', status: 'online' },
    { name: 'Building A, Ground Floor', status: 'online' },
    { name: 'Building B, 2nd Floor', status: 'offline' },
    { name: 'Cafeteria Display', status: 'offline' },
  ];

  const steps = [
    { id: 1, title: 'Name and Description' },
    { id: 2, title: 'Content Selection' },
    { id: 3, title: 'Screen Selection' },
    { id: 4, title: 'Schedule Settings' },
  ];

  const openModal = (schedule?: Schedule) => {
    if (schedule) {
      setEditing(schedule);
      setForm(schedule);
    } else {
      setEditing(null);
      setForm({
        name: '',
        description: '',
        content: [],
        devices: [],
        repeat: 'daily',
        playTime: '09:00 AM',
        days: [],
      });
    }
    setStep(1);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setStep(1);
  };

  const next = () => step < 4 && setStep(step + 1);
  const prev = () => step > 1 && setStep(step - 1);

  const save = () => {
    if (editing) {
      setSchedules(s =>
        s.map(item =>
          item.id === editing.id ? { ...form, id: item.id, active: item.active } as Schedule : item
        )
      );
    } else {
      const newSch: Schedule = {
        id: Date.now().toString(),
        name: form.name || 'Untitled',
        description: form.description || '',
        content: form.content || [],
        devices: form.devices || [],
        repeat: form.repeat || 'daily',
        playTime: form.playTime,
        days: form.days,
        active: true,
      };
      setSchedules(s => [...s, newSch]);
    }
    closeModal();
  };

  const toggle = (id: string) => {
    setSchedules(s => s.map(item => (item.id === id ? { ...item, active: !item.active } : item)));
  };

  const remove = (id: string) => {
    setSchedules(s => s.filter(item => item.id !== id));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <div className="">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Content Scheduling</h1>
              <p className="text-gray-600 mt-1">Schedule when and where your content should play</p>
            </div>
            <button
              onClick={() => openModal()}
              className="bg-bgBlue hover:bg-blue-400 shadow-customShadow text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition"
            >
              + Create Schedule
            </button>
          </div>

          {/* Schedule Cards */}
          <div className="space-y-4">
            {schedules.map(sch => (
              <Link href={`/schedules/${sch.id}`} key={sch.id}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all cursor-pointer">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-4">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggle(sch.id);
                          }}
                          className="mt-1"
                        >
                          {sch.active ? (
                            <Play className="w-5 h-5 text-gray-600" />
                          ) : (
                            <Pause className="w-5 h-5 text-gray-400" />
                          )}
                        </button>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{sch.name}</h3>
                          <p className="text-gray-600 text-sm mt-1">{sch.description}</p>

                          <div className="flex flex-wrap gap-6 mt-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{sch.days?.join(', ') || 'Mon-Fri'} • {sch.playTime}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span className="capitalize">{sch.repeat}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Monitor className="w-4 h-4" />
                              <span>{sch.devices.length} Devices</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openModal(sch);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg transition"
                        >
                          <Edit2 className="w-5 h-5 text-gray-600" />
                        </button>

                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            remove(sch.id);
                          }}
                          className="p-2 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {schedules.length === 0 && (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto bg-gray-200 border-2 border-dashed rounded-xl mb-4" />
              <p className="text-gray-500 text-lg">No schedules created yet</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/40" onClick={closeModal} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-screen overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editing ? 'Edit Schedule' : 'Create New Schedule'}
                  </h2>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center justify-between mb-10">
                  {steps.map((s, i) => (
                    <React.Fragment key={s.id}>
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                            step > s.id
                              ? 'bg-green-100 text-green-600'
                              : step === s.id
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {step > s.id ? <Check className="w-6 h-6" /> : <Video className="w-6 h-6" />}
                        </div>
                        <span className="text-xs mt-2 text-gray-600 text-center w-24">{s.title}</span>
                      </div>
                      {i < 3 && (
                        <div
                          className={`flex-1 h-0.5 mx-4 ${step > s.id + 1 ? 'bg-green-500' : 'bg-gray-300'}`}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Step 1 */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={form.name || ''}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Morning Welcome"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={form.description || ''}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        placeholder="Enter schedule description"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div>
                    <div className="flex gap-4 mb-6">
                      <input type="text" placeholder="Search Content" className="flex-1 px-4 py-3 border rounded-lg outline-none" />
                      <select className="px-4 py-3 border rounded-lg outline-none">
                        <option>Videos</option>
                        <option>Images</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      {contentItems.map(item => (
                        <label key={item} className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.content?.includes(item)}
                            onChange={e => {
                              if (e.target.checked) {
                                setForm({ ...form, content: [...(form.content || []), item] });
                              } else {
                                setForm({ ...form, content: form.content?.filter(x => x !== item) });
                              }
                            }}
                            className="w-5 h-5 text-blue-600 rounded"
                          />
                          <div className="w-16 h-16 bg-gray-200 border-2 border-dashed rounded ml-4" />
                          <div className="ml-4">
                            <p className="font-medium">{item}</p>
                            <p className="text-sm text-gray-500">40 MB</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <div>
                    <input type="text" placeholder="Search Screen" className="w-full px-4 py-3 border rounded-lg mb-6 outline-none" />
                    <div className="space-y-3">
                      {screens.map(screen => (
                        <label
                          key={screen.name}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={form.devices?.includes(screen.name)}
                              onChange={e => {
                                if (e.target.checked) {
                                  setForm({ ...form, devices: [...(form.devices || []), screen.name] });
                                } else {
                                  setForm({ ...form, devices: form.devices?.filter(d => d !== screen.name) });
                                }
                              }}
                              className="w-5 h-5 text-blue-600 rounded"
                            />
                            <span className="ml-4 font-medium">{screen.name}</span>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              screen.status === 'online'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {screen.status}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4 */}
                {step === 4 && (
                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Repeat</label>
                      <select
                        value={form.repeat}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                          setForm({ ...form, repeat: e.target.value as Schedule['repeat'] })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      >
                        <option value="once">Run Once</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>

                    {form.repeat === 'weekly' && (
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-4">Select Days</p>
                        <div className="grid grid-cols-7 gap-3">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <button
                              key={day}
                              type="button"
                              onClick={() => {
                                const days = form.days || [];
                                setForm({
                                  ...form,
                                  days: days.includes(day) ? days.filter(d => d !== day) : [...days, day],
                                });
                              }}
                              className={`py-3 rounded-lg font-medium transition ${
                                form.days?.includes(day)
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {(form.repeat === 'daily' || form.repeat === 'weekly') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Play Time</label>
                        <input
                          type="text"
                          value={form.playTime || ''}
                          onChange={e => setForm({ ...form, playTime: e.target.value })}
                          placeholder="09:00 AM"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Footer */}
                <div className="flex justify-between items-center mt-12">
                  <button
                    onClick={prev}
                    disabled={step === 1}
                    className="px-6 py-3 text-gray-700 flex items-center gap-2 disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <span className="text-sm text-gray-500">Step {step} of 4</span>

                  {step < 4 ? (
                    <button
                      onClick={next}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={save}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium"
                    >
                      {editing ? 'Update Schedule' : 'Create Schedule'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}