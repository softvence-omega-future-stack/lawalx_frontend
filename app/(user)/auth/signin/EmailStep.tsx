"use client";

import { Dispatch, SetStateAction } from "react";
import { Mail } from "lucide-react";
import Image from "next/image";

interface Props {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<"email" | "password" | "code">>;
}

export default function EmailStep({ email, setEmail, setStep }: Props) {
  const handleNext = () => {
    if (email.trim() === "") {
      alert("Please enter your email address.");
      return;
    }
    setStep("password");
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Sign in to your account
      </h2>
      <button className="w-full border border-gray-300 rounded-lg py-2 flex items-center justify-center gap-2 mb-4 hover:bg-gray-50">
        <Image
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          width={20}
          height={20}
          className="w-5 h-5"
        />
        Continue with Google
      </button>

      <div className="relative mb-6">
        <Mail className="absolute left-3 top-3 text-gray-400" />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleNext}
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
      >
        Continue
      </button>
    </>
  );
}
