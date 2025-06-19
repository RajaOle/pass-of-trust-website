
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoanReport } from "@/types/loanReport";

const processPaymentSchema = z.object({
  originalReportId: z.number(),
  paymentAmount: z.string().min(1, "Payment amount is required"),
  paymentType: z.enum(["installment", "partial", "full"]),
  installmentNumber: z.number().optional(),
  notes: z.string().optional(),
});

export type ProcessPaymentFormData = z.infer<typeof processPaymentSchema>;

export const useProcessPaymentForm = (report: LoanReport) => {
  const form = useForm<ProcessPaymentFormData>({
    resolver: zodResolver(processPaymentSchema),
    defaultValues: {
      originalReportId: report.id,
      paymentAmount: "",
      paymentType: report.loanType === "Installment" ? "installment" : "partial",
      installmentNumber: undefined,
      notes: "",
    },
  });

  return { form };
};
