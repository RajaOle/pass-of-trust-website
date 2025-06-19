
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
    recordStatus: "Verified",
    phoneNumber: "+1234567890",
    email: "john.smith@email.com",
    address: "123 Main St, Anytown, USA",
    reporteeType: "individual",
    idType: "drivers-license",
    idNumber: "D1234567",
    repaymentCount: 12,
    currentInstallment: 2,
    paymentHistory: [
      {
        id: "PAY-001",
        amount: "29,166.67",
        date: "2024-02-15",
        timestamp: "2024-02-15T10:30:00Z",
        type: "installment",
        installmentNumber: 2
      },
      {
        id: "PAY-002",
        amount: "29,166.67",
        date: "2024-01-15",
        timestamp: "2024-01-15T09:15:00Z",
        type: "installment",
        installmentNumber: 1
      }
    ]
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
    recordStatus: "Partially Verified",
    reporteeType: "company",
    companyName: "ABC Corp",
    website: "https://abccorp.com",
    paymentHistory: []
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
    recordStatus: "Verified",
    phoneNumber: "+1987654321",
    email: "sarah.johnson@email.com",
    reporteeType: "individual",
    repaymentCount: 6,
    currentInstallment: 1,
    paymentHistory: [
      {
        id: "PAY-003",
        amount: "4,750.00",
        date: "2024-01-08",
        timestamp: "2024-01-08T14:20:00Z",
        type: "installment",
        installmentNumber: 1
      }
    ]
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
    recordStatus: "Partially Verified",
    reporteeType: "company",
    companyName: "Tech Solutions LLC",
    email: "contact@techsolutions.com",
    paymentHistory: []
  },
];
