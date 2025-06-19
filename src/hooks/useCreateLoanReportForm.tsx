import { useForm } from "react-hook-form";
import { parsePhoneNumber, isValidPhoneNumber, formatIncompletePhoneNumber } from 'libphonenumber-js';

export interface CreateLoanReportFormData {
  // Record Information
  title: string;
  loanAmount: string;
  loanType: string;
  repaymentCount?: string;
  collateralType: string;
  collateralAmount: string;
  dueDate: string;
  
  // Reportee Information
  reporteeType: "individual" | "company";
  borrowerName: string;
  companyName?: string;
  website?: string;
  idType: string;
  idNumber: string;
  idDocument?: FileList;
  phoneNumber: string;
  email: string;
  address?: string;
  instagramProfile?: string;
  tiktokProfile?: string;
  linkedinProfile?: string;
  
  // Supporting Documents
  supportingDocuments?: FileList;
}

export const useCreateLoanReportForm = () => {
  const form = useForm<CreateLoanReportFormData>({
    defaultValues: {
      title: "",
      loanAmount: "",
      loanType: "",
      repaymentCount: "",
      collateralType: "",
      collateralAmount: "",
      dueDate: "",
      reporteeType: "individual",
      borrowerName: "",
      companyName: "",
      website: "",
      idType: "",
      idNumber: "",
      phoneNumber: "",
      email: "",
      address: "",
      instagramProfile: "",
      tiktokProfile: "",
      linkedinProfile: ""
    }
  });

  const validatePhoneNumber = (value: string) => {
    if (!value) return "Phone number is required";
    try {
      return isValidPhoneNumber(value) || "Please enter a valid phone number with country code (e.g., +1234567890)";
    } catch (error) {
      return "Please enter a valid phone number with country code (e.g., +1234567890)";
    }
  };

  const validateEmail = (value: string, reporteeType: "individual" | "company") => {
    // Email is required for individuals, optional for companies
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
    if (!value) return true; // Optional field
    try {
      new URL(value.startsWith('http') ? value : `https://${value}`);
      return true;
    } catch {
      return "Please enter a valid website URL";
    }
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    try {
      // Add + if not present and value starts with a digit
      const phoneValue = value.startsWith('+') ? value : value.match(/^\d/) ? `+${value}` : value;
      return formatIncompletePhoneNumber(phoneValue);
    } catch (error) {
      return value;
    }
  };

  return {
    form,
    validatePhoneNumber,
    validateEmail,
    validateWebsite,
    formatPhoneNumber
  };
};
