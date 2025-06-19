
import React, { useState } from "react";
import { LoanReportHeader } from "@/components/LoanReportHeader";
import { LoanReportCard } from "@/components/LoanReportCard";
import { loanReports as initialLoanReports } from "@/data/loanReportsData";
import { LoanReport } from "@/types/loanReport";

export const MyReport = () => {
  const [loanReports, setLoanReports] = useState<LoanReport[]>(initialLoanReports);

  const handleCreateReport = (data: any) => {
    const newReport: LoanReport = {
      id: loanReports.length + 1,
      uniqueId: `LR-2024-${String(loanReports.length + 1).padStart(3, '0')}-${data.title.substring(0, 3).toUpperCase()}`,
      title: data.title,
      borrowerName: data.borrowerName,
      loanAmount: data.loanAmount,
      date: new Date().toISOString().split('T')[0],
      status: "Under Review",
      loanType: data.loanType,
      dueDate: data.dueDate || null,
      kycVerified: false,
      reporteeKycStatus: "Pending",
      recordStatus: "Partially Verified"
    };

    setLoanReports([newReport, ...loanReports]);
  };

  return (
    <div className="space-y-6">
      <LoanReportHeader onCreateReport={handleCreateReport} />
      
      <div className="grid gap-4">
        {loanReports.map((report) => (
          <LoanReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
};
