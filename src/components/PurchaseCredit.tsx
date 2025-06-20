import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Check, Calendar, Clock, Star } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PurchaseConfirmationDialog } from "@/components/PurchaseConfirmationDialog";
import { useToast } from "@/hooks/use-toast";

interface PurchaseHistoryItem {
  id: string;
  date: string;
  credits: number;
  amount: number;
  status: "completed" | "pending" | "failed";
  paymentMethod: string;
}

interface CreditPackage {
  id: string;
  credits: number;
  price: number;
  popular?: boolean;
  features: string[];
}

export const PurchaseCredit = () => {
  const { toast } = useToast();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null);
  const [currentBalance, setCurrentBalance] = useState(250);

  // Credit packages with different options
  const creditPackages: CreditPackage[] = [
    {
      id: "basic",
      credits: 50,
      price: 50000,
      features: [
        "50 inquiry credits",
        "Valid for 6 months"
      ]
    },
    {
      id: "standard",
      credits: 150,
      price: 140000,
      popular: true,
      features: [
        "150 inquiry credits",
        "Valid for 12 months",
        "6% savings"
      ]
    },
    {
      id: "premium",
      credits: 250,
      price: 225000,
      features: [
        "250 inquiry credits",
        "Valid for 18 months",
        "Priority support",
        "10% savings"
      ]
    },
    {
      id: "enterprise",
      credits: 500,
      price: 425000,
      features: [
        "500 inquiry credits",
        "Valid for 24 months",
        "Dedicated support",
        "15% savings"
      ]
    }
  ];

  // Mock purchase history data
  const purchaseHistory: PurchaseHistoryItem[] = [
    {
      id: "PUR-001",
      date: "2024-01-15",
      credits: 50,
      amount: 50000,
      status: "completed",
      paymentMethod: "Credit Card"
    },
    {
      id: "PUR-002",
      date: "2024-01-10",
      credits: 50,
      amount: 50000,
      status: "completed",
      paymentMethod: "Bank Transfer"
    },
    {
      id: "PUR-003",
      date: "2024-01-05",
      credits: 50,
      amount: 50000,
      status: "completed",
      paymentMethod: "Credit Card"
    },
    {
      id: "PUR-004",
      date: "2023-12-28",
      credits: 50,
      amount: 50000,
      status: "completed",
      paymentMethod: "Credit Card"
    }
  ];

  const handlePurchaseClick = (pkg: CreditPackage) => {
    setSelectedPackage(pkg);
    setConfirmationOpen(true);
  };

  const handlePurchaseConfirm = () => {
    if (!selectedPackage) return;
    
    // Simulate successful purchase
    setCurrentBalance(prev => prev + selectedPackage.credits);
    
    toast({
      title: "Purchase Successful!",
      description: `${selectedPackage.credits} credits have been added to your account.`,
    });
    
    setSelectedPackage(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Purchase Credits</h1>
        <p className="text-gray-600 mt-2">Buy credits to make inquiries and access reports.</p>
      </div>

      {/* Current Balance Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Current Balance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-blue-600">{currentBalance} Credits</p>
              <p className="text-gray-600">Available for inquiries</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-sm text-gray-600 mb-1">
                <Calendar className="h-4 w-4" />
                <span>Last purchased</span>
              </div>
              <p className="font-medium">January 15, 2024</p>
              <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                <Clock className="h-3 w-3" />
                <span>Credits never expire</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit Packages */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Choose Your Credit Package</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {creditPackages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative ${pkg.popular ? 'border-2 border-blue-500 shadow-lg' : 'border border-gray-200'}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}
              <CardHeader className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">{pkg.credits} Credits</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-blue-600">Rp {pkg.price.toLocaleString()}</span>
                  <div className="text-gray-600 text-sm mt-1">Rp {(pkg.price / pkg.credits).toLocaleString()} per credit</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                  onClick={() => handlePurchaseClick(pkg)}
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Purchase
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Purchase History */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-mono text-sm">{item.id}</TableCell>
                  <TableCell>{formatDate(item.date)}</TableCell>
                  <TableCell className="font-semibold">{item.credits}</TableCell>
                  <TableCell className="font-semibold">Rp {item.amount.toLocaleString()}</TableCell>
                  <TableCell>{item.paymentMethod}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Purchase Confirmation Dialog */}
      {selectedPackage && (
        <PurchaseConfirmationDialog
          open={confirmationOpen}
          onOpenChange={setConfirmationOpen}
          onConfirm={handlePurchaseConfirm}
          credits={selectedPackage.credits}
          price={selectedPackage.price}
        />
      )}
    </div>
  );
};
