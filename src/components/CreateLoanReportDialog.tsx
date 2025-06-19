import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";

interface CreateLoanReportFormData {
  title: string;
  borrowerName: string;
  loanAmount: string;
  loanType: string;
  dueDate: string;
}
interface CreateLoanReportDialogProps {
  onCreateReport: (data: CreateLoanReportFormData) => void;
}
export const CreateLoanReportDialog = ({
  onCreateReport
}: CreateLoanReportDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm<CreateLoanReportFormData>({
    defaultValues: {
      title: "",
      borrowerName: "",
      loanAmount: "",
      loanType: "",
      dueDate: ""
    }
  });
  const onSubmit = (data: CreateLoanReportFormData) => {
    onCreateReport(data);
    form.reset();
    setOpen(false);
  };
  return <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Report</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="title" rules={{
            required: "Title is required"
          }} render={({
            field
          }) => <FormItem>
                  <FormLabel>Loan Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Home Mortgage Loan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="borrowerName" rules={{
            required: "Borrower name is required"
          }} render={({
            field
          }) => <FormItem>
                  <FormLabel>Borrower Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="loanAmount" rules={{
            required: "Loan amount is required"
          }} render={({
            field
          }) => <FormItem>
                  <FormLabel>Loan Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., $350,000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="loanType" rules={{
            required: "Loan type is required"
          }} render={({
            field
          }) => <FormItem>
                  <FormLabel>Loan Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select loan type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Installment">Installment</SelectItem>
                      <SelectItem value="Single Payment">Single Payment</SelectItem>
                      <SelectItem value="Open Payment">Open Payment</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>} />
            
            <FormField control={form.control} name="dueDate" render={({
            field
          }) => <FormItem>
                  <FormLabel>Due Date (Optional)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Create Report
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>;
};
