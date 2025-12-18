"use client";

import { useState } from "react";
import CreateTicketModal from "@/components/support/CreateTicketModal";

function Report_And_Problem() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);
    const handleSubmit = () => {
        // Handle form submission here
        setIsOpen(false);
    };

    return ( 
        <CreateTicketModal isOpen={isOpen} onClose={handleClose} onSubmit={handleSubmit} />
     );
}

export default Report_And_Problem;