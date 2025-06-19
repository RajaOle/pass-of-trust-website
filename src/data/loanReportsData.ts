
import { LoanReport } from "@/types/loanReport";

export const loanReports: LoanReport[] = [
  {
    id: 1,
    uniqueId: "LR-2024-001-HML",
    title: "Home Mortgage Loan",
    borrowerName: "John Smith",
    loanAmount: "$350,000",
    date: "2024-01-15",
    status: "Active",
    loanType: "Installment",
    dueDate: "2024-02-15",
    kycVerified: true,
    reporteeKycStatus: "Verified",
    recordStatus: "Verified"
  },
  {
    id: 2,
    uniqueId: "LR-2024-002-BLC",
    title: "Business Line of Credit",
    borrowerName: "ABC Corp",
    loanAmount: "$75,000",
    date: "2024-01-12",
    status: "Under Review",
    loanType: "Open Payment",
    dueDate: null,
    kycVerified: false,
    reporteeKycStatus: "Pending",
    recordStatus: "Partially Verified"
  },
  {
    id: 3,
    uniqueId: "LR-2024-003-PAL",
    title: "Personal Auto Loan",
    borrowerName: "Sarah Johnson",
    loanAmount: "$28,500",
    date: "2024-01-08",
    status: "Active",
    loanType: "Installment",
    dueDate: "2024-02-08",
    kycVerified: true,
    reporteeKycStatus: "Verified",
    recordStatus: "Verified"
  },
  {
    id: 4,
    uniqueId: "LR-2024-004-EQF",
    title: "Equipment Finance",
    borrowerName: "Tech Solutions LLC",
    loanAmount: "$120,000",
    date: "2024-01-05",
    status: "Active",
    loanType: "Single Payment",
    dueDate: "2024-12-05",
    kycVerified: true,
    reporteeKycStatus: "Verified",
    recordStatus: "Partially Verified"
  },
];
