
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, CreditCard, Hash, User, Activity } from "lucide-react";
import { LoanReport } from "@/types/loanReport";
import { RestructureLoanDialog } from "@/components/RestructureLoanDialog";
import { AddInfoDialog } from "@/components/AddInfoDialog";
import { ProcessPaymentDialog } from "@/components/ProcessPaymentDialog";
import { RestructureLoanFormData } from "@/hooks/useRestructureLoanForm";
import { AddInfoFormData } from "@/hooks/useAddInfoForm";
import { ProcessPaymentFormData } from "@/hooks/useProcessPaymentForm";
import {
  getLoanTypeBadgeVariant,
  getReporteeKycStatusBadge,
  getRecordStatusBadge,
  formatDueDate,
  formatLoanAmount
} from "@/utils/loanReportHelpers";

interface LoanReportCardProps {
  report: LoanReport;
  onRestructure?: (data: RestructureLoanFormData) => void;
  onAddInfo?: (data: AddInfoFormData) => void;
  onProcessPayment?: (data: ProcessPaymentFormData) => void;
}

export const LoanReportCard = ({ report, onRestructure, onAddInfo, onProcessPayment }: LoanReportCardProps) => {
  const handleRestructure = (data: RestructureLoanFormData) => {
    console.log("Restructuring report:", report.id, "with data:", data);
    if (onRestructure) {
      onRestructure(data);
    }
  };

  const handleAddInfo = (data: AddInfoFormData) => {
    console.log("Adding info to report:", report.id, "with data:", data);
    if (onAddInfo) {
      onAddInfo(data);
    }
  };

  const handleProcessPayment = (data: ProcessPaymentFormData) => {
    console.log("Processing payment for report:", report.id, "with data:", data);
    if (onProcessPayment) {
      onProcessPayment(data);
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
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
                <span className="font-semibold text-green-600 text-base">{formatLoanAmount(report.loanAmount)}</span>
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
            <RestructureLoanDialog 
              report={report} 
              onRestructure={handleRestructure}
            />
            <AddInfoDialog 
              report={report} 
              onAddInfo={handleAddInfo}
            />
            <ProcessPaymentDialog 
              report={report} 
              onProcessPayment={handleProcessPayment}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
