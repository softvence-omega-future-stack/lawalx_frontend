// "use client";

// import { useState } from "react";
// import Sidebar from "./components/Sidebar";
// import ContentCard from "./components/ContentCard";
// import CreateContentPopup from "./components/CreateContentPopup";
// import ContentDetailsModal from "./components/ContentDetailsModel";

// export default function ContentPage() {
  // const [selectedSidebar, setSelectedSidebar] = useState<"uploaded" | "create">("uploaded");
  // const [showCreatePopup, setShowCreatePopup] = useState(false);
  // const [showDetailsModal, setShowDetailsModal] = useState(false);

  // const uploadedFiles = [
  //   { title: "Video 1", subtitle: "Promo video" },
  //   { title: "Image 1", subtitle: "Banner image" },
  // ];

  // const createContentList = [
  //   { title: "New Folder", subtitle: "Organize content" },
  //   { title: "New Playlist", subtitle: "Group multiple contents" },
  // ];

  // const contentToShow = selectedSidebar === "uploaded" ? uploadedFiles : createContentList;

//   return (
//     // <div className="flex gap-6">
//     //   {/* Sidebar */}
//     //   <Sidebar selected={selectedSidebar} setSelected={setSelectedSidebar} />

//     //   {/* Main Content */}
//     //   <div className="flex-1 space-y-4">
//     //     {/* Header */}
//     //     <div className="flex justify-between items-center">
//     //       <h2 className="text-2xl font-semibold">{selectedSidebar === "uploaded" ? "Uploaded Files" : "Create Content"}</h2>
//     //       <button
//     //         onClick={() => setShowCreatePopup(true)}
//     //         className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
//     //       >
//     //         Create New
//     //       </button>
//     //     </div>

//     //     {/* Filter/Search */}
//     //     <div className="flex gap-4 mb-4">
//     //       <input
//     //         type="text"
//     //         placeholder="Search..."
//     //         className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
//     //       />
//     //       <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
//     //         <option>All Types</option>
//     //         <option>Folder</option>
//     //         <option>File</option>
//     //         <option>Playlist</option>
//     //       </select>
//     //     </div>

//     //     {/* Content Grid */}
//     //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//     //       {contentToShow.map((item, idx) => (
//     //         <ContentCard
//     //           key={idx}
//     //           title={item.title}
//     //           subtitle={item.subtitle}
//     //           onClick={() => setShowDetailsModal(true)}
//     //         />
//     //       ))}
//     //     </div>
//     //   </div>

//     //   {showCreatePopup && <CreateContentPopup onClose={() => setShowCreatePopup(false)} />}
//     //   {showDetailsModal && <ContentDetailsModal title="Content Details" subtitle="Details for selected content" onClose={() => setShowDetailsModal(false)} />}
//     // </div>
//     <div className="flex items-center justify-center">
//       Content page
//     </div>
//   );
// }

const page = () => {
  return (
    <div>page</div>
  )
}

export default page