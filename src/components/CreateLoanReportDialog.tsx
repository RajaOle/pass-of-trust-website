
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useCreateLoanReportForm, CreateLoanReportFormData } from "@/hooks/useCreateLoanReportForm";
import { RecordInformationTab } from "@/components/RecordInformationTab";
import { ReporteeInformationTab } from "@/components/ReporteeInformationTab";
import { SupportingDocumentsTab } from "@/components/SupportingDocumentsTab";

interface CreateLoanReportDialogProps {
  onCreateReport: (data: CreateLoanReportFormData) => void;
}

export const CreateLoanReportDialog = ({
  onCreateReport
}: CreateLoanReportDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("record");
  const [showCollateral, setShowCollateral] = React.useState(false);
  const [showSocialMedia, setShowSocialMedia] = React.useState(false);
  const [showBankAccount, setShowBankAccount] = React.useState(false);
  
  const { form, validatePhoneNumber, validateEmail, validateWebsite, validateBankAccountNumber, formatPhoneNumber } = useCreateLoanReportForm();

  const watchLoanType = form.watch("loanType");
  const watchReporteeType = form.watch("reporteeType");

  const onSubmit = (data: CreateLoanReportFormData) => {
    console.log("Final form submission with data:", data);
    onCreateReport(data);
    form.reset();
    setOpen(false);
    setActiveTab("record");
    setShowCollateral(false);
    setShowSocialMedia(false);
    setShowBankAccount(false);
  };

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("=== handleNext called ===");
    console.log("Event type:", e.type);
    console.log("Event target:", e.target);
    console.log("Current tab:", activeTab);
    
    // Prevent any event propagation
    e.preventDefault();
    e.stopPropagation();
    
    if (activeTab === "record") {
      console.log("Validating record tab");
      // Validate required fields in Record Information tab
      const fieldsToValidate: (keyof CreateLoanReportFormData)[] = ["title", "loanAmount", "loanType"];
      
      // Also validate repaymentCount if loan type is Installment
      if (watchLoanType === "Installment") {
        fieldsToValidate.push("repaymentCount");
      }
      
      console.log("Record fields to validate:", fieldsToValidate);
      const isValid = await form.trigger(fieldsToValidate);
      console.log("Record validation result:", isValid);
      
      if (!isValid) {
        console.log("Record validation failed - staying on record tab");
        return;
      }
      
      console.log("Record validation passed - moving to reportee tab");
      setActiveTab("reportee");
    } else if (activeTab === "reportee") {
      console.log("Validating reportee tab");
      // Validate required fields in Reportee Information tab
      let fieldsToValidate: (keyof CreateLoanReportFormData)[] = [];
      
      if (watchReporteeType === "individual") {
        fieldsToValidate = ["borrowerName", "phoneNumber", "email"];
      } else {
        // For companies, only companyName and phoneNumber are required
        fieldsToValidate = ["companyName", "phoneNumber"];
      }
      
      // Always validate these fields if they have values
      const optionalFieldsToCheck: (keyof CreateLoanReportFormData)[] = ["email", "website", "bankAccountNumber"];
      for (const field of optionalFieldsToCheck) {
        const value = form.getValues(field);
        if (value) {
          fieldsToValidate.push(field);
        }
      }
      
      console.log("Reportee fields to validate:", fieldsToValidate);
      const isValid = await form.trigger(fieldsToValidate);
      console.log("Reportee validation result:", isValid);
      
      if (!isValid) {
        console.log("Reportee validation failed - staying on reportee tab");
        return;
      }
      
      console.log("Reportee validation passed - moving to documents tab");
      setActiveTab("documents");
    }
    console.log("=== handleNext completed ===");
  };

  const handlePrevious = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("=== handlePrevious called ===");
    console.log("Current tab:", activeTab);
    
    // Prevent any event propagation
    e.preventDefault();
    e.stopPropagation();
    
    if (activeTab === "documents") {
      setActiveTab("reportee");
    } else if (activeTab === "reportee") {
      setActiveTab("record");
    }
    console.log("=== handlePrevious completed ===");
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    console.log("=== handleFormSubmit called ===");
    console.log("Event type:", e.type);
    console.log("Event target:", e.target);
    
    e.preventDefault();
    e.stopPropagation();
    
    // Validate all tabs before final submission
    const recordFields: (keyof CreateLoanReportFormData)[] = ["title", "loanAmount", "loanType"];
    if (watchLoanType === "Installment") {
      recordFields.push("repaymentCount");
    }
    
    let reporteeFields: (keyof CreateLoanReportFormData)[] = [];
    if (watchReporteeType === "individual") {
      reporteeFields = ["borrowerName", "phoneNumber", "email"];
    } else {
      reporteeFields = ["companyName", "phoneNumber"];
    }
    
    const documentFields: (keyof CreateLoanReportFormData)[] = [];
    
    const allFields = [...recordFields, ...reporteeFields, ...documentFields];
    console.log("All fields to validate for final submission:", allFields);
    
    const isValid = await form.trigger(allFields);
    console.log("Final validation result:", isValid);
    
    if (!isValid) {
      console.log("Final validation failed, finding which tab has errors");
      // Find which tab has errors and navigate to it
      const recordValid = await form.trigger(recordFields);
      const reporteeValid = await form.trigger(reporteeFields);
      const documentsValid = await form.trigger(documentFields);
      
      console.log("Tab validation results:", { recordValid, reporteeValid, documentsValid });
      
      if (!recordValid) {
        setActiveTab("record");
      } else if (!reporteeValid) {
        setActiveTab("reportee");
      } else if (!documentsValid) {
        setActiveTab("documents");
      }
      return;
    }
    
    // If all validation passes, submit the form
    console.log("All validation passed, submitting form");
    const formData = form.getValues();
    onSubmit(formData);
    console.log("=== handleFormSubmit completed ===");
  };

  const handleCreateReport = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("=== handleCreateReport called ===");
    
    // Prevent any event propagation
    e.preventDefault();
    e.stopPropagation();
    
    // Manually trigger form submission
    const formData = form.getValues();
    console.log("Create Report button clicked, form data:", formData);
    onSubmit(formData);
    console.log("=== handleCreateReport completed ===");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New Report
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Report</DialogTitle>
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
                <RecordInformationTab 
                  form={form}
                  showCollateral={showCollateral}
                  setShowCollateral={setShowCollateral}
                />
              </TabsContent>

              <TabsContent value="reportee">
                <ReporteeInformationTab 
                  form={form}
                  validatePhoneNumber={validatePhoneNumber}
                  validateEmail={validateEmail}
                  validateWebsite={validateWebsite}
                  validateBankAccountNumber={validateBankAccountNumber}
                  formatPhoneNumber={formatPhoneNumber}
                  showSocialMedia={showSocialMedia}
                  setShowSocialMedia={setShowSocialMedia}
                  showBankAccount={showBankAccount}
                  setShowBankAccount={setShowBankAccount}
                />
              </TabsContent>

              <TabsContent value="documents">
                <SupportingDocumentsTab form={form} />
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
                  <Button type="button" onClick={handleCreateReport} className="bg-blue-600 hover:bg-blue-700">
                    Create Report
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
