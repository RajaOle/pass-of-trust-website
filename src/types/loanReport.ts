
export interface LoanReport {
  id: number;
  uniqueId: string;
  title: string;
  borrowerName: string;
  loanAmount: string;
  date: string;
  status: string;
  loanType: string;
  dueDate: string | null;
  kycVerified: boolean;
  reporteeKycStatus: string;
  recordStatus: string;
  // Additional fields for "Add Info" feature
  phoneNumber?: string;
  email?: string;
  address?: string;
  website?: string;
  instagramProfile?: string;
  tiktokProfile?: string;
  linkedinProfile?: string;
  bankName?: string;
  bankAccountNumber?: string;
  reporteeType?: "individual" | "company";
  companyName?: string;
  idType?: string;
  idNumber?: string;
  // Payment-related fields
  outstandingAmount?: string;
  paymentHistory?: PaymentRecord[];
  repaymentCount?: number;
  currentInstallment?: number;
}

export interface PaymentRecord {
  id: string;
  amount: string;
  date: string;
  timestamp: string;
  type: "installment" | "partial" | "full";
  installmentNumber?: number;
  paymentProofFiles?: string[];
}
