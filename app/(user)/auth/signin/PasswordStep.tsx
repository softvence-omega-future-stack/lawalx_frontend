"use client";

import { Dispatch, SetStateAction } from "react";
import { Lock } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  email: string;
  setStep: Dispatch<SetStateAction<"email" | "password" | "code">>;
}

export default function PasswordStep({ email, setStep }: Props) {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/dashboard");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Welcome back
      </h2>

      <p className="text-gray-500 text-center mb-4">{email}</p>

      <div className="relative mb-4">
        <Lock className="absolute left-3 top-3 text-gray-400" />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center gap-2 text-gray-600 text-sm">
          <input type="checkbox" /> Remember me
        </label>
        <button className="text-blue-600 text-sm">Forgot password?</button>
      </div>

      <button
        onClick={handleSignIn}
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition"
      >
        Sign in with password
      </button>

      <p className="text-center text-gray-500 mt-4">or</p>

      <button
        onClick={() => setStep("code")}
        className="w-full border border-gray-300 mt-4 py-2.5 rounded-lg hover:bg-gray-50 transition"
      >
        Sign in with code
      </button>
    </div>
  );
}
