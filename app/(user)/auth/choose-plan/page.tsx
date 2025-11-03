"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const plans = [
  { label: "Free Trial", type: "free" },
  { label: "Basic", type: "basic" },
  { label: "Premium", type: "premium" },
  { label: "Enterprise", type: "enterprise" },
  { label: "Custom", type: "custom" },
];

export default function ChoosePlanPage() {
  const router = useRouter();
  const [customPlan, setCustomPlan] = useState("");

  const handleSelect = (type: string) => {
    if (type === "free") router.push("/dashboard");
    else if (type === "custom") {
      // open custom input
      const name = prompt("Enter your custom plan name:");
      if (name) router.push("/dashboard");
    } else {
      alert("Redirect to payment flow (mock)");
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-2xl font-semibold mb-6">Choose Your Plan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.type}
            className="border rounded-xl p-6 text-center hover:shadow-lg cursor-pointer"
            onClick={() => handleSelect(plan.type)}
          >
            <h3 className="text-xl font-semibold mb-2">{plan.label}</h3>
            <p className="text-gray-500">
              {plan.type === "free"
                ? "Free trial with limited features"
                : "Paid plan with full features"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
