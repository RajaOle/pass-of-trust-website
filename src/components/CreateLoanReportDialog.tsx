
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
  
  const { form, validatePhoneNumber, validateEmail, validateWebsite, formatPhoneNumber } = useCreateLoanReportForm();

  const watchLoanType = form.watch("loanType");
  const watchReporteeType = form.watch("reporteeType");

  const onSubmit = (data: CreateLoanReportFormData) => {
    onCreateReport(data);
    form.reset();
    setOpen(false);
    setActiveTab("record");
    setShowCollateral(false);
    setShowSocialMedia(false);
  };

  const handleNext = async () => {
    if (activeTab === "record") {
      // Validate required fields in Record Information tab
      const isValid = await form.trigger(["title", "loanAmount", "loanType"]);
      
      // Also validate repaymentCount if loan type is Installment
      if (watchLoanType === "Installment") {
        const repaymentValid = await form.trigger("repaymentCount");
        if (!isValid || !repaymentValid) return;
      } else if (!isValid) {
        return;
      }
      
      setActiveTab("reportee");
    } else if (activeTab === "reportee") {
      // Validate required fields in Reportee Information tab
      if (watchReporteeType === "individual") {
        const isValid = await form.trigger(["borrowerName", "phoneNumber", "email"]);
        if (!isValid) return;
      } else {
        // For companies, only companyName and phoneNumber are required
        // Email is optional for companies
        const isValid = await form.trigger(["companyName", "phoneNumber"]);
        if (!isValid) return;
        
        // Validate email only if it's provided
        const emailValue = form.getValues("email");
        if (emailValue) {
          const emailValid = await form.trigger("email");
          if (!emailValid) return;
        }
        
        // Validate website only if it's provided
        const websiteValue = form.getValues("website");
        if (websiteValue) {
          const websiteValid = await form.trigger("website");
          if (!websiteValid) return;
        }
      }
      
      setActiveTab("documents");
    }
  };

  const handlePrevious = () => {
    if (activeTab === "documents") {
      setActiveTab("reportee");
    } else if (activeTab === "reportee") {
      setActiveTab("record");
    }
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  formatPhoneNumber={formatPhoneNumber}
                  showSocialMedia={showSocialMedia}
                  setShowSocialMedia={setShowSocialMedia}
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
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Create Report
                  </Button>
                ) : (
                  <Button type="button" onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                    Next
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
