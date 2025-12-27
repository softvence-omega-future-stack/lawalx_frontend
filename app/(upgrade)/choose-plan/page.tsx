"use client";

import { useState } from "react";
import { Crown } from "lucide-react";

const plans = [
  {
    title: "Trial",
    price: "$0",
    duration: "/14 days",
    description: "Perfect for testing and evaluation",
    features: [
      "2 Devices",
      "1 GB Storage",
      "Basic Content Upload",
      "Email Support",
      "Screen Splitting",
    ],
    unavailable: [
      "Content Creation Tools",
      "Priority Support",
      "Advanced Analytics",
      "API Access",
      "White-label Options",
    ],
    buttonText: "Current Plan",
    buttonStyle: "border",
    recommended: false,
  },
  {
    title: "Basic",
    price: "$29",
    duration: "/month",
    billed: "Billed annually: ($348/year)",
    description: "Great for small businesses and startups",
    features: [
      "5 Devices",
      "10 GB Storage",
      "Basic Content Upload",
      "Email Support",
      "Screen Splitting",
      "Content Creation Tools",
      "Priority Support",
      "Advanced Analytics",
      "API Access",
      "White-label Options",
    ],
    buttonText: "Choose Basic",
    buttonStyle: "white",
    recommended: false,
  },
  {
    title: "Premium",
    price: "$49",
    duration: "/month",
    billed: "Billed annually: ($588/year)",
    description: "Perfect for growing businesses with advanced needs",
    features: [
      "20 Devices",
      "50 GB Storage",
      "Advanced Content Upload",
      "Priority Support",
      "Screen Splitting",
      "Content Creation Tools",
      "Advanced Analytics",
      { text: "Content AI", badge: "ai" },
      { text: "White-label Options", badge: "border" },
      "Custom Branding",
    ],
    buttonText: "Upgrade to Premium",
    buttonStyle: "black",
    recommended: true,
    badge: "Recommended",
  },
  {
    title: "Enterprise",
    price: "Custom",
    billed: "Billed annually: ($2388/year)",
    description: "Custom pricing for large organizations",
    features: [
      "Unlimited Devices",
      "Custom Storage",
      "Advanced Content Upload",
      "Dedicated Support",
      "Screen Splitting",
      "Content Creation Tools",
      "Advanced Analytics",
      "API Access",
      "White-label Options",
      "Custom Integrations",
    ],
    buttonText: "Contact Sales",
    buttonStyle: "white",
    recommended: false,
    badge: "Custom",
    badgeColor: "purple",
  },
];

export default function ChoosePlanPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="bg-gray-50 rounded-2xl max-w-6xl w-full p-8 relative">
        {/* Header */}
        <div className="text-center mb-8">
          <Crown className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Choose Your Plan
          </h2>
          <p className="text-gray-600 mb-4">
            Scale your digital signage network with the right plan for your
            business.
          </p>

          {/* Trial Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm mb-6">
            <Crown className="w-4 h-4" />
            Trial: 12 days left
          </div>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span
            className={`text-sm ${
              !isAnnual ? "text-gray-900 font-medium" : "text-gray-600"
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              isAnnual ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                isAnnual ? "right-1" : "left-1"
              }`}
            ></span>
          </button>
          <span
            className={`text-sm ${
              isAnnual ? "text-gray-900 font-medium" : "text-gray-600"
            }`}
          >
            Annual
          </span>
        </div>

        {/* Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-white border-2 rounded-xl p-6 relative ${
                plan.recommended ? "border-blue-500" : "border-gray-200"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span
                    className={`${
                      plan.badgeColor === "purple"
                        ? "bg-purple-600"
                        : "bg-blue-500"
                    } text-white text-xs px-3 py-1 rounded-full font-medium`}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {plan.title}
              </h3>

              <div className="mb-1">
                <span className="text-4xl font-bold text-gray-900">
                  {plan.price}
                </span>
                {plan.duration && (
                  <span className="text-gray-600 text-sm">{plan.duration}</span>
                )}
              </div>

              {plan.billed && (
                <p className="text-xs text-gray-500 mb-1">{plan.billed}</p>
              )}

              {plan.description && (
                <p className="text-sm text-gray-600 mb-6">
                  {plan.description}
                </p>
              )}

              <button
                className={`w-full py-2.5 rounded-lg font-medium mb-6 text-sm ${
                  plan.buttonStyle === "black"
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : plan.buttonStyle === "border"
                    ? "border-2 border-gray-900 text-gray-900"
                    : "border-2 border-gray-200 text-gray-900 hover:border-gray-300"
                }`}
              >
                {plan.buttonText}
              </button>

              <ul className="space-y-2.5 text-sm">
                {plan.features.map((feature, i) => {
                  const isObject = typeof feature === "object";
                  const featureText = isObject ? feature.text : feature;
                  const badge = isObject ? feature.badge : null;

                  return (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-gray-700"
                    >
                      <span
                        className={`mt-0.5 ${
                          badge === "ai" ? "text-blue-500" : "text-green-500"
                        }`}
                      >
                        ✓
                      </span>
                      <span className="flex items-center gap-1.5 flex-wrap">
                        {badge === "ai" && (
                          <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded font-medium">
                            AI
                          </span>
                        )}
                        {badge === "border" ? (
                          <span className="border border-blue-400 text-blue-600 text-xs px-2 py-0.5 rounded">
                            {featureText}
                          </span>
                        ) : (
                          <span>{featureText}</span>
                        )}
                      </span>
                    </li>
                  );
                })}
                {plan.unavailable?.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-gray-300"
                  >
                    <span className="mt-0.5">✗</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}