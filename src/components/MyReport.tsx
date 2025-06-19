
import React, { useState } from "react";
import { LoanReportHeader } from "@/components/LoanReportHeader";
import { LoanReportCard } from "@/components/LoanReportCard";
import { loanReports as initialLoanReports } from "@/data/loanReportsData";
import { LoanReport } from "@/types/loanReport";
import { CreateLoanReportFormData } from "@/hooks/useCreateLoanReportForm";
import { RestructureLoanFormData } from "@/hooks/useRestructureLoanForm";

export const MyReport = () => {
  const [loanReports, setLoanReports] = useState<LoanReport[]>(initialLoanReports);

  const handleCreateReport = (data: CreateLoanReportFormData) => {
    // Determine KYC status based on ID document upload
    const hasIdDocument = data.idDocument && data.idDocument.length > 0;
    const kycStatus = hasIdDocument ? "Pending" : "Not Verified";

    const newReport: LoanReport = {
      id: loanReports.length + 1,
      uniqueId: `LR-2024-${String(loanReports.length + 1).padStart(3, '0')}-${data.title.substring(0, 3).toUpperCase()}`,
      title: data.title,
      borrowerName: data.reporteeType === "individual" 
        ? data.borrowerName 
        : data.companyName || "",
      loanAmount: data.loanAmount,
      date: new Date().toISOString().split('T')[0],
      status: "Under Review",
      loanType: data.loanType,
      dueDate: data.dueDate || null,
      kycVerified: hasIdDocument,
      reporteeKycStatus: kycStatus,
      recordStatus: "Partially Verified"
    };

    setLoanReports([newReport, ...loanReports]);
  };

  const handleRestructure = (data: RestructureLoanFormData) => {
    setLoanReports(prevReports => 
      prevReports.map(report => 
        report.id === data.originalReportId
          ? {
              ...report,
              loanType: data.loanType,
              dueDate: data.dueDate || null,
              status: "Under Review", // Reset status when restructured
              recordStatus: "Partially Verified" // Update record status
            }
          : report
      )
    );

    console.log("Report restructured successfully");
  };

  return (
    <div className="space-y-6">
      <LoanReportHeader onCreateReport={handleCreateReport} />
      
      <div className="grid gap-4">
        {loanReports.map((report) => (
          <LoanReportCard 
            key={report.id} 
            report={report} 
            onRestructure={handleRestructure}
          />
        ))}
      </div>
    </div>
  );
};
