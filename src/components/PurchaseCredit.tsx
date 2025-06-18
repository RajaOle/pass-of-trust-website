
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Check } from "lucide-react";

export const PurchaseCredit = () => {
  const creditPackages = [
    {
      id: 1,
      name: "Starter Pack",
      credits: 50,
      price: 9.99,
      features: ["Basic reports", "Email support", "7-day history"],
    },
    {
      id: 2,
      name: "Professional Pack",
      credits: 150,
      price: 24.99,
      features: ["Advanced reports", "Priority support", "30-day history", "Export options"],
      popular: true,
    },
    {
      id: 3,
      name: "Enterprise Pack",
      credits: 500,
      price: 79.99,
      features: ["Unlimited reports", "24/7 support", "Unlimited history", "API access", "Custom branding"],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Purchase Credits</h1>
        <p className="text-gray-600 mt-2">Choose a credit package that fits your needs.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {creditPackages.map((pkg) => (
          <Card key={pkg.id} className={`relative ${pkg.popular ? 'border-2 border-blue-500' : ''}`}>
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </span>
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{pkg.name}</CardTitle>
              <div className="mt-4">
                <span className="text-3xl font-bold">${pkg.price}</span>
                <div className="text-gray-600 mt-2">{pkg.credits} Credits</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                variant={pkg.popular ? 'default' : 'outline'}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Purchase
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">250 Credits</p>
              <p className="text-gray-600">Available for use</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Last purchased</p>
              <p className="font-medium">January 10, 2024</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
