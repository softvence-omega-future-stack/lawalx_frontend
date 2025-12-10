"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Shield } from "lucide-react";

export default function VerifyAdminPage() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleLogin = () => {
    const enteredCode = code.join("");
    if (enteredCode.length === 6) {
      router.push("/admin/dashboard");
    }
  };

  const handleBack = () => {
    router.push("/admin/login");
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-lg shadow-customShadow overflow-hidden">
            <div className="bg-bgBlue shadow-customShadow p-4 w-fit mt-6 rounded-full text-center mx-auto">
              <Image
                src="/admin/navbar/adminlogo.svg"
                alt="Logo"
                width={28}
                height={28}
                className="mx-auto"
              />
            </div>

            <div className="px-10 pt-8 pb-10 text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Tape Admin Portal
              </h1>
              <p className="text-sm text-gray-600 mt-2">
                Enter your verification code
              </p>

              {/* Info Box */}
              <div className="mt-8 mb-10 px-4 py-4 bg-blue-50 border border-bgBlue rounded-lg text-left">
                <p className="text-sm text-bgBlue">
                  <Shield className="inline-block w-5 h-5 mr-2 text-bgBlue" />
                  We have sent a verification code to your registered device.
                </p>
              </div>

              {/* OTP Input */}
              <div className="mb-10">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Verification Code
                </label>
                <div className="flex items-center justify-center w-full gap-2 sm:gap-4">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <div key={index} className="flex items-center justify-evenly gap-2">
                      <input
                        ref={(el) => {
                          inputRefs.current[index] = el;
                        }}
                        type="text"
                        maxLength={1}
                        value={code[index]}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className={`
                        w-10 h-10
                        text-center text-md font-semibold
                        bg-gray-50 border-2 rounded-lg
                        focus:outline-none focus:border-bgBlue focus:ring-1 focus:ring-bgBlue dark:text-black
                        transition-all duration-200
                        ${code[index] ? "border-bgBlue shadow-sm" : "border-gray-300"}
                      `}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                      />

                      {/* Dash between inputs (except after the last one) */}
                      {index < 5 && (
                        <span className=" text-gray-400 font-medium text-sm select-none">
                          -
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleBack}
                  className="flex-1 px-6 py-3.5 text-gray-700 font-medium rounded-lg shadow-customShadow hover:bg-gray-50 transition"
                >
                  Back
                </button>
                <button
                  onClick={handleLogin}
                  disabled={code.join("").length < 6}
                  className={`
                    flex-1 px-6 py-3.5 text-white font-medium rounded-xl transition shadow-customShadow
                    ${
                      code.join("").length === 6
                        ? "bg-bgBlue hover:bg-blue-500"
                        : "bg-gray-300 cursor-not-allowed"
                    }
                  `}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
