
import React from "react";
import { CreateLoanReportDialog } from "@/components/CreateLoanReportDialog";
import { CreateLoanReportFormData } from "@/hooks/useCreateLoanReportForm";

interface LoanReportHeaderProps {
  onCreateReport: (data: CreateLoanReportFormData) => void;
}

export const LoanReportHeader = ({ onCreateReport }: LoanReportHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Your Reports</h1>
        <p className="text-gray-600 mt-2">Manage and track your loan portfolio and reports.</p>
      </div>
      <CreateLoanReportDialog onCreateReport={onCreateReport} />
    </div>
  );
};
