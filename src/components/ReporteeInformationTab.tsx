
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CreateLoanReportFormData } from "@/hooks/useCreateLoanReportForm";
import { ReporteeTypeSelector } from "@/components/ReporteeTypeSelector";
import { PersonalInfoFields } from "@/components/PersonalInfoFields";
import { ContactInfoFields } from "@/components/ContactInfoFields";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { BankAccountSection } from "@/components/BankAccountSection";

interface ReporteeInformationTabProps {
  form: UseFormReturn<CreateLoanReportFormData>;
  validatePhoneNumber: (value: string) => string | boolean;
  validateEmail: (value: string, reporteeType: "individual" | "company") => string | boolean;
  validateWebsite: (value: string) => string | boolean;
  validateBankAccountNumber: (value: string) => string | boolean;
  formatPhoneNumber: (value: string) => string;
  showSocialMedia: boolean;
  setShowSocialMedia: (show: boolean) => void;
  showBankAccount: boolean;
  setShowBankAccount: (show: boolean) => void;
}

export const ReporteeInformationTab = ({ 
  form, 
  validatePhoneNumber, 
  validateEmail,
  validateWebsite,
  validateBankAccountNumber,
  formatPhoneNumber,
  showSocialMedia,
  setShowSocialMedia,
  showBankAccount,
  setShowBankAccount
}: ReporteeInformationTabProps) => {
  const watchReporteeType = form.watch("reporteeType");

  return (
    <div className="space-y-4 mt-4">
      <ReporteeTypeSelector form={form} />
      
      <PersonalInfoFields 
        form={form} 
        reporteeType={watchReporteeType} 
        validateWebsite={validateWebsite} 
      />

      <ContactInfoFields 
        form={form} 
        reporteeType={watchReporteeType}
        validatePhoneNumber={validatePhoneNumber}
        validateEmail={validateEmail}
        formatPhoneNumber={formatPhoneNumber}
      />

      <SocialMediaSection 
        form={form}
        showSocialMedia={showSocialMedia}
        setShowSocialMedia={setShowSocialMedia}
      />

      <BankAccountSection 
        form={form}
        showBankAccount={showBankAccount}
        setShowBankAccount={setShowBankAccount}
        validateBankAccountNumber={validateBankAccountNumber}
      />
    </div>
  );
};
