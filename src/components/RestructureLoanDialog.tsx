
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";
import { useRestructureLoanForm, RestructureLoanFormData } from "@/hooks/useRestructureLoanForm";
import { RestrictedRecordInformationTab } from "@/components/RestrictedRecordInformationTab";
import { ReadOnlyReporteeInformationTab } from "@/components/ReadOnlyReporteeInformationTab";
import { ReadOnlySupportingDocumentsTab } from "@/components/ReadOnlySupportingDocumentsTab";
import { LoanReport } from "@/types/loanReport";

interface RestructureLoanDialogProps {
  report: LoanReport;
  onRestructure: (data: RestructureLoanFormData) => void;
}

export const RestructureLoanDialog = ({ report, onRestructure }: RestructureLoanDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("record");
  
  const { form } = useRestructureLoanForm(report);

  const watchLoanType = form.watch("loanType");

  const onSubmit = (data: RestructureLoanFormData) => {
    console.log("Restructure form submission with data:", data);
    onRestructure(data);
    form.reset();
    setOpen(false);
    setActiveTab("record");
  };

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (activeTab === "record") {
      // Validate required fields in Record Information tab
      const fieldsToValidate: (keyof RestructureLoanFormData)[] = ["loanType"];
      
      // Also validate repaymentCount if loan type is Installment
      if (watchLoanType === "Installment") {
        fieldsToValidate.push("repaymentCount");
      }
      
      const isValid = await form.trigger(fieldsToValidate);
      
      if (!isValid) {
        return;
      }
      
      setActiveTab("reportee");
    } else if (activeTab === "reportee") {
      setActiveTab("documents");
    }
  };

  const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (activeTab === "documents") {
      setActiveTab("reportee");
    } else if (activeTab === "reportee") {
      setActiveTab("record");
    }
  };

  const handleRestructure = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Validate required fields
    const fieldsToValidate: (keyof RestructureLoanFormData)[] = ["loanType"];
    if (watchLoanType === "Installment") {
      fieldsToValidate.push("repaymentCount");
    }
    
    const isValid = await form.trigger(fieldsToValidate);
    
    if (!isValid) {
      setActiveTab("record");
      return;
    }
    
    const formData = form.getValues();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-28">
          <FileText className="h-4 w-4 mr-1" />
          Restructure
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Restructure Loan Report</DialogTitle>
          <p className="text-sm text-gray-600">
            Modify loan type and due date for report: {report.title}
          </p>
        </DialogHeader>
        
        <Form {...form}>
          <div className="space-y-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="record">Record Information</TabsTrigger>
                <TabsTrigger value="reportee">Reportee Information</TabsTrigger>
                <TabsTrigger value="documents">Supporting Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="record">
                <RestrictedRecordInformationTab form={form} />
              </TabsContent>

              <TabsContent value="reportee">
                <ReadOnlyReporteeInformationTab form={form} />
              </TabsContent>

              <TabsContent value="documents">
                <ReadOnlySupportingDocumentsTab form={form} />
              </TabsContent>
            </Tabs>

            <div className="flex justify-between space-x-2 pt-4">
              <div>
                {activeTab !== "record" && (
                  <Button type="button" variant="outline" onClick={handlePrevious}>
                    Previous
                  </Button>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                
                {activeTab === "documents" ? (
                  <Button type="button" onClick={handleRestructure} className="bg-orange-600 hover:bg-orange-700">
                    Restructure Report
                  </Button>
                ) : (
                  <Button type="button" onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                    Next
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
