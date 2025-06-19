
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
}
