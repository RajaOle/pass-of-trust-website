
import { useForm } from "react-hook-form";
import { LoanReport } from "@/types/loanReport";
import { parsePhoneNumber, isValidPhoneNumber, formatIncompletePhoneNumber } from 'libphonenumber-js';

export interface AddInfoFormData {
  // Read-only fields from original report
  originalReportId: number;
  borrowerName: string;
  companyName?: string;
  reporteeType: "individual" | "company";
  
  // Potentially editable fields
  phoneNumber?: string;
  email?: string;
  address?: string;
  website?: string;
  instagramProfile?: string;
  tiktokProfile?: string;
  linkedinProfile?: string;
  bankName?: string;
  bankAccountNumber?: string;
  idType?: string;
  idNumber?: string;
}

export const useAddInfoForm = (report: LoanReport) => {
  const form = useForm<AddInfoFormData>({
    defaultValues: {
      originalReportId: report.id,
      borrowerName: report.borrowerName,
      companyName: report.companyName || "",
      reporteeType: report.reporteeType || "individual",
      phoneNumber: report.phoneNumber || "",
      email: report.email || "",
      address: report.address || "",
      website: report.website || "",
      instagramProfile: report.instagramProfile || "",
      tiktokProfile: report.tiktokProfile || "",
      linkedinProfile: report.linkedinProfile || "",
      bankName: report.bankName || "",
      bankAccountNumber: report.bankAccountNumber || "",
      idType: report.idType || "",
      idNumber: report.idNumber || "",
    }
  });

  const validatePhoneNumber = (value: string) => {
    if (!value) return true; // Optional for add info
    try {
      return isValidPhoneNumber(value) || "Please enter a valid phone number with country code (e.g., +1234567890)";
    } catch (error) {
      return "Please enter a valid phone number with country code (e.g., +1234567890)";
    }
  };

  const validateEmail = (value: string) => {
    if (!value) return true; // Optional for add info
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || "Please enter a valid email address";
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

  const validateBankAccountNumber = (value: string) => {
    if (!value) return true; // Optional field
    const bankAccountRegex = /^[0-9]{8,20}$/;
    return bankAccountRegex.test(value) || "Please enter a valid bank account number (8-20 digits)";
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    try {
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
    validateBankAccountNumber,
    formatPhoneNumber
  };
};
