
import { LoanReport, PaymentRecord } from "@/types/loanReport";

export const calculateOutstandingAmount = (report: LoanReport): number => {
  const initialAmount = parseFloat(report.loanAmount.replace(/[^\d.-]/g, ''));
  
  if (!report.paymentHistory || report.paymentHistory.length === 0) {
    return initialAmount;
  }

  const totalPaid = report.paymentHistory.reduce((sum, payment) => {
    return sum + parseFloat(payment.amount.replace(/[^\d.-]/g, ''));
  }, 0);

  return Math.max(0, initialAmount - totalPaid);
};

export const calculateInstallmentAmount = (report: LoanReport): number => {
  if (report.loanType !== "Installment" || !report.repaymentCount) {
    return 0;
  }

  const outstandingAmount = calculateOutstandingAmount(report);
  const remainingInstallments = report.repaymentCount - (report.currentInstallment || 0);
  
  return remainingInstallments > 0 ? outstandingAmount / remainingInstallments : 0;
};

export const getNextInstallmentNumber = (report: LoanReport): number => {
  return (report.currentInstallment || 0) + 1;
};

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

export const generatePaymentId = (): string => {
  return `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
