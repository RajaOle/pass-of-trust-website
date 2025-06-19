import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, Calendar, CreditCard, Hash, User, Activity } from "lucide-react";

export const MyReport = () => {
  const loanReports = [
    {
      id: 1,
      uniqueId: "LR-2024-001-HML",
      title: "Home Mortgage Loan",
      borrowerName: "John Smith",
      loanAmount: "$350,000",
      date: "2024-01-15",
      status: "Active",
      loanType: "Installment",
      dueDate: "2024-02-15",
      kycVerified: true,
      reporteeKycStatus: "Verified",
      recordStatus: "Verified"
    },
    {
      id: 2,
      uniqueId: "LR-2024-002-BLC",
      title: "Business Line of Credit",
      borrowerName: "ABC Corp",
      loanAmount: "$75,000",
      date: "2024-01-12",
      status: "Under Review",
      loanType: "Open Payment",
      dueDate: null,
      kycVerified: false,
      reporteeKycStatus: "Pending",
      recordStatus: "Partially Verified"
    },
    {
      id: 3,
      uniqueId: "LR-2024-003-PAL",
      title: "Personal Auto Loan",
      borrowerName: "Sarah Johnson",
      loanAmount: "$28,500",
      date: "2024-01-08",
      status: "Pending",
      loanType: "Installment",
      dueDate: "2024-02-08",
      kycVerified: true,
      reporteeKycStatus: "Verified",
      recordStatus: "Verified"
    },
    {
      id: 4,
      uniqueId: "LR-2024-004-EQF",
      title: "Equipment Finance",
      borrowerName: "Tech Solutions LLC",
      loanAmount: "$120,000",
      date: "2024-01-05",
      status: "Active",
      loanType: "Single Payment",
      dueDate: "2024-12-05",
      kycVerified: true,
      reporteeKycStatus: "Verified",
      recordStatus: "Partially Verified"
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

  const getReporteeKycStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRecordStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-green-100 text-green-800";
      case "Partially Verified":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
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
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-4">
                  {/* Header with title and loan type */}
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-lg text-gray-900">{report.title}</h3>
                    <Badge 
                      variant={getLoanTypeBadgeVariant(report.loanType)}
                      className="flex items-center space-x-1"
                    >
                      <CreditCard className="h-3 w-3" />
                      <span>{report.loanType}</span>
                    </Badge>
                  </div>
                  
                  {/* Unique ID */}
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Hash className="h-4 w-4" />
                    <span className="font-medium">ID:</span>
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs">
                      {report.uniqueId}
                    </span>
                  </div>

                  {/* Reportee Name and Amount */}
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="font-medium text-gray-700">Reportee Name:</span>
                      <span className="text-gray-900">{report.borrowerName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-700">Amount:</span>
                      <span className="font-semibold text-green-600 text-base">{report.loanAmount}</span>
                    </div>
                  </div>
                  
                  {/* Dates */}
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Created: {report.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Due: {formatDueDate(report.dueDate)}</span>
                    </div>
                  </div>
                  
                  {/* Status badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        report.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : report.status === "Under Review"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {report.status}
                    </span>
                    
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getReporteeKycStatusBadge(report.reporteeKycStatus)}`}>
                      <User className="h-3 w-3" />
                      <span>KYC: {report.reporteeKycStatus}</span>
                    </span>
                    
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getRecordStatusBadge(report.recordStatus)}`}>
                      <Activity className="h-3 w-3" />
                      <span>Record: {report.recordStatus}</span>
                    </span>
                  </div>
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-col space-y-2 ml-6">
                  <Button variant="outline" size="sm" className="w-28">
                    <FileText className="h-4 w-4 mr-1" />
                    Restructure
                  </Button>
                  <Button variant="default" size="sm" className="w-28 bg-blue-600 hover:bg-blue-700">
                    <Activity className="h-4 w-4 mr-1" />
                    Process
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
