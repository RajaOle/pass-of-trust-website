
import { useForm } from "react-hook-form";
import { LoanReport } from "@/types/loanReport";
import { CreateLoanReportFormData } from "@/hooks/useCreateLoanReportForm";

export interface RestructureLoanFormData extends CreateLoanReportFormData {
  originalReportId: number;
}

export const useRestructureLoanForm = (originalReport?: LoanReport) => {
  const form = useForm<RestructureLoanFormData>({
    defaultValues: {
      // Pre-fill with original data
      title: originalReport?.title || "",
      loanAmount: originalReport?.loanAmount || "",
      loanType: originalReport?.loanType || "",
      repaymentCount: "",
      collateralType: "",
      collateralAmount: "",
      dueDate: originalReport?.dueDate || "",
      reporteeType: "individual",
      borrowerName: originalReport?.borrowerName || "",
      companyName: "",
      website: "",
      idType: "",
      idNumber: "",
      phoneNumber: "",
      email: "",
      address: "",
      instagramProfile: "",
      tiktokProfile: "",
      linkedinProfile: "",
      bankName: "",
      bankAccountNumber: "",
      supportingDocuments: undefined,
      originalReportId: originalReport?.id || 0
    }
  });

  const validatePhoneNumber = (value: string) => {
    if (!value) return "Phone number is required";
    return true; // Simplified for read-only context
  };

  const validateEmail = (value: string, reporteeType: "individual" | "company") => {
    if (reporteeType === "individual" && !value) {
      return "Email is required";
    }
    if (value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) || "Please enter a valid email address";
    }
    return true;
  };

  const validateWebsite = (value: string) => {
    if (!value) return true;
    try {
      new URL(value.startsWith('http') ? value : `https://${value}`);
      return true;
    } catch {
      return "Please enter a valid website URL";
    }
  };

  const validateBankAccountNumber = (value: string) => {
    if (!value) return true;
    const bankAccountRegex = /^[0-9]{8,20}$/;
    return bankAccountRegex.test(value) || "Please enter a valid bank account number (8-20 digits)";
  };

  const formatPhoneNumber = (value: string) => {
    return value; // Simplified for read-only context
  };

  return {
    form,
    validatePhoneNumber,
    validateEmail,
    validateWebsite,
    validateBankAccountNumber,
    formatPhoneNumber
  };
};
