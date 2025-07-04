
export const getLoanTypeBadgeVariant = (loanType: string) => {
  switch (loanType) {
    case "Installment":
      return "default";
    case "Single Payment":
      return "secondary";
    case "Open Payment":
      return "outline";
    default:
      return "default";
  }
};

export const getReporteeKycStatusBadge = (status: string) => {
  switch (status) {
    case "Verified":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Not Verified":
      return "bg-red-100 text-red-800";
    case "Rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getRecordStatusBadge = (status: string) => {
  switch (status) {
    case "Verified":
      return "bg-green-100 text-green-800";
    case "Partially Verified":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const formatDueDate = (dueDate: string | null) => {
  if (!dueDate) return "No Due Date";
  return new Date(dueDate).toLocaleDateString();
};

export const formatLoanAmount = (amount: string) => {
  // Remove any existing formatting and extract the numeric value
  const numericValue = parseFloat(amount.replace(/[^\d.-]/g, ''));
  
  if (isNaN(numericValue)) return amount;
  
  // Format with dot as thousand separator and 2 decimal places
  return numericValue.toLocaleString('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};
