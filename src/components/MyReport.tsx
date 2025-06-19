
import React from "react";
import { LoanReportHeader } from "@/components/LoanReportHeader";
import { LoanReportCard } from "@/components/LoanReportCard";
import { loanReports } from "@/data/loanReportsData";

export const MyReport = () => {
  return (
    <div className="space-y-6">
      <LoanReportHeader />
      
      <div className="grid gap-4">
        {loanReports.map((report) => (
          <LoanReportCard key={report.id} report={report} />
        ))}
      </div>
    </div>
  );
};
