"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CodeStep({ email }: { email: string }) {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleContinue = () => {
    if (code.length !== 6) {
      alert("Please enter the 6-digit code.");
      return;
    }
    router.push("/dashboard");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">Enter code</h2>

      <p className="text-gray-500 text-center mb-4">
        We sent a 6-digit code to <b>{email}</b>
      </p>

      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        maxLength={6}
        placeholder="Enter 6-digit code"
        className="w-full border border-gray-300 rounded-lg text-center text-lg tracking-widest py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleContinue}
        className="w-full bg-blue-600 text-white py-2.5 mt-6 rounded-lg hover:bg-blue-700 transition"
      >
        Continue with code
      </button>

      <div className="text-center text-sm text-gray-500 mt-4">
        <button className="text-blue-600">Resend code</button> •{" "}
        <button className="text-blue-600">Use a different email</button>
      </div>
    </div>
  );
}
