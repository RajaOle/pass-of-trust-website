
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Check, Calendar, Clock } from "lucide-react";
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

export const PurchaseCredit = () => {
  const { toast } = useToast();
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(250);

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

  const creditPackage = {
    credits: 50,
    price: 50000,
    features: [
      "50 inquiry credits",
      "Valid for 6 months",
      "Email support",
      "Instant activation"
    ]
  };

  const handlePurchaseConfirm = () => {
    // Simulate successful purchase
    setCurrentBalance(prev => prev + creditPackage.credits);
    
    toast({
      title: "Purchase Successful!",
      description: `${creditPackage.credits} credits have been added to your account.`,
    });
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
                <span>Credits expire in 5 months</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credit Package */}
      <Card className="border-2 border-blue-200 bg-blue-50/30">
        <CardHeader className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
            <CreditCard className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-xl">Standard Credit Package</CardTitle>
          <div className="mt-4">
            <span className="text-4xl font-bold text-blue-600">Rp {creditPackage.price.toLocaleString()}</span>
            <div className="text-gray-600 mt-2">{creditPackage.credits} Credits</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2">
            {creditPackage.features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => setConfirmationOpen(true)}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Purchase Credits
          </Button>
        </CardContent>
      </Card>

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
      <PurchaseConfirmationDialog
        open={confirmationOpen}
        onOpenChange={setConfirmationOpen}
        onConfirm={handlePurchaseConfirm}
        credits={creditPackage.credits}
        price={creditPackage.price}
      />
    </div>
  );
};
