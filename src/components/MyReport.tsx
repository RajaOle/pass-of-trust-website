
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Eye, Download, Edit, Calendar, CreditCard } from "lucide-react";

export const MyReport = () => {
  const loanReports = [
    {
      id: 1,
      title: "Home Mortgage Loan",
      borrowerName: "John Smith",
      loanAmount: "$350,000",
      date: "2024-01-15",
      status: "Active",
      loanType: "Installment",
      dueDate: "2024-02-15",
      kycVerified: true,
    },
    {
      id: 2,
      title: "Business Line of Credit",
      borrowerName: "ABC Corp",
      loanAmount: "$75,000",
      date: "2024-01-12",
      status: "Under Review",
      loanType: "Open Payment",
      dueDate: null, // No due date for open payment
      kycVerified: false,
    },
    {
      id: 3,
      title: "Personal Auto Loan",
      borrowerName: "Sarah Johnson",
      loanAmount: "$28,500",
      date: "2024-01-08",
      status: "Pending",
      loanType: "Installment",
      dueDate: "2024-02-08",
      kycVerified: true,
    },
    {
      id: 4,
      title: "Equipment Finance",
      borrowerName: "Tech Solutions LLC",
      loanAmount: "$120,000",
      date: "2024-01-05",
      status: "Active",
      loanType: "Single Payment",
      dueDate: "2024-12-05",
      kycVerified: true,
    },
  ];

  const getLoanTypeBadgeVariant = (loanType: string) => {
    switch (loanType) {
      case "Installment":
        return "default";
      case "Single Payment":
        return "secondary";
      case "Open Payment":
        return "outline";
      default:
        return "default";
    }
  };

  const formatDueDate = (dueDate: string | null) => {
    if (!dueDate) return "No Due Date";
    return new Date(dueDate).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Loan Reports</h1>
          <p className="text-gray-600 mt-2">Manage and track your loan portfolio and reports.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New Loan Report
        </Button>
      </div>

      <div className="grid gap-4">
        {loanReports.map((report) => (
          <Card key={report.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-lg">{report.title}</h3>
                    <Badge 
                      variant={getLoanTypeBadgeVariant(report.loanType)}
                      className="flex items-center space-x-1"
                    >
                      <CreditCard className="h-3 w-3" />
                      <span>{report.loanType}</span>
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="font-medium">Borrower:</span>
                      <span>{report.borrowerName}</span>
                      <span className="font-medium">Amount:</span>
                      <span className="font-semibold text-green-600">{report.loanAmount}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Created: {report.date}</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Due: {formatDueDate(report.dueDate)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          report.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : report.status === "Under Review"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {report.status}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          report.kycVerified
                            ? "bg-blue-100 text-blue-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {report.kycVerified ? "KYC Verified" : "Not Verified"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
