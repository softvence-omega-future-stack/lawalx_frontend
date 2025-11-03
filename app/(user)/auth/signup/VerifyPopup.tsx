"use client";

import { Dispatch, SetStateAction } from "react";

interface Props {
  email: string;
  onClose: () => void;
}

export default function VerifyPopup({ email, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center">
        <h3 className="text-xl font-semibold mb-4">Verify Your Email</h3>
        <p className="text-gray-600 mb-6">
          We sent a verification link to <b>{email}</b>. Please verify your
          account to continue.
        </p>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white py-2.5 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          I have verified, go to dashboard
        </button>
      </div>
    </div>
  );
}
