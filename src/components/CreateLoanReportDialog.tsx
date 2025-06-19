import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { parsePhoneNumber, isValidPhoneNumber, formatIncompletePhoneNumber } from 'libphonenumber-js';

interface CreateLoanReportFormData {
  // Record Information
  title: string;
  loanAmount: string;
  loanType: string;
  repaymentCount?: string;
  collateralType: string;
  collateralAmount: string;
  dueDate: string;
  
  // Reportee Information
  reporteeType: "individual" | "company";
  borrowerName: string;
  companyName?: string;
  idType: string;
  idNumber: string;
  idDocument?: FileList;
  phoneNumber?: string;
  email?: string;
  address?: string;
  
  // Supporting Documents
  supportingDocuments?: FileList;
}

interface CreateLoanReportDialogProps {
  onCreateReport: (data: CreateLoanReportFormData) => void;
}

export const CreateLoanReportDialog = ({
  onCreateReport
}: CreateLoanReportDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("record");
  const [showCollateral, setShowCollateral] = React.useState(false);
  
  const form = useForm<CreateLoanReportFormData>({
    defaultValues: {
      title: "",
      loanAmount: "",
      loanType: "",
      repaymentCount: "",
      collateralType: "",
      collateralAmount: "",
      dueDate: "",
      reporteeType: "individual",
      borrowerName: "",
      companyName: "",
      idType: "",
      idNumber: "",
      phoneNumber: "",
      email: "",
      address: ""
    }
  });

  const watchLoanType = form.watch("loanType");
  const watchReporteeType = form.watch("reporteeType");

  const validatePhoneNumber = (value: string) => {
    if (!value) return true; // Optional field
    try {
      return isValidPhoneNumber(value) || "Please enter a valid phone number with country code (e.g., +1234567890)";
    } catch (error) {
      return "Please enter a valid phone number with country code (e.g., +1234567890)";
    }
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    try {
      // Add + if not present and value starts with a digit
      const phoneValue = value.startsWith('+') ? value : value.match(/^\d/) ? `+${value}` : value;
      return formatIncompletePhoneNumber(phoneValue);
    } catch (error) {
      return value;
    }
  };

  const onSubmit = (data: CreateLoanReportFormData) => {
    onCreateReport(data);
    form.reset();
    setOpen(false);
    setActiveTab("record");
    setShowCollateral(false);
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

  const getIdTypeOptions = () => {
    if (watchReporteeType === "individual") {
      return [
        { value: "National ID", label: "National ID" },
        { value: "Passport", label: "Passport" },
        { value: "Driver's License", label: "Driver's License" }
      ];
    } else {
      return [
        { value: "National ID", label: "National ID" },
        { value: "Passport", label: "Passport" },
        { value: "Driver's License", label: "Driver's License" },
        { value: "Business Registration", label: "Business Registration" }
      ];
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

              <TabsContent value="record" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="title"
                  rules={{ required: "Loan title is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Title *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Home Mortgage Loan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="loanAmount"
                  rules={{ required: "Loan amount is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Amount *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., $350,000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="loanType"
                  rules={{ required: "Loan type is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Loan Type *</FormLabel>
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
                    </FormItem>
                  )}
                />

                {watchLoanType === "Installment" && (
                  <FormField
                    control={form.control}
                    name="repaymentCount"
                    rules={{ required: "Repayment count is required for installment loans" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Repayment Count *</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="e.g., 12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="addCollateral"
                      checked={showCollateral}
                      onChange={(e) => setShowCollateral(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <label htmlFor="addCollateral" className="text-sm font-medium">
                      Add Collateral Information (Optional)
                    </label>
                  </div>

                  {showCollateral && (
                    <>
                      <FormField
                        control={form.control}
                        name="collateralType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Collateral Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select collateral type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Real Estate">Real Estate</SelectItem>
                                <SelectItem value="Vehicle">Vehicle</SelectItem>
                                <SelectItem value="Equipment">Equipment</SelectItem>
                                <SelectItem value="Cash Deposit">Cash Deposit</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="collateralAmount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Collateral Amount</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., $400,000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date (Optional)</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="reportee" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="reporteeType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reportee Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={(value) => {
                            field.onChange(value);
                            // Reset ID type when changing reportee type
                            form.setValue("idType", "");
                          }}
                          defaultValue={field.value}
                          className="flex flex-row space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="individual" id="individual" />
                            <label htmlFor="individual">Individual</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="company" id="company" />
                            <label htmlFor="company">Company</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchReporteeType === "individual" ? (
                  <FormField
                    control={form.control}
                    name="borrowerName"
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    control={form.control}
                    name="companyName"
                    rules={{ required: "Company name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., ABC Corporation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="idType"
                  rules={{ required: "ID type is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Identification Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select ID type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getIdTypeOptions().map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="idNumber"
                  rules={{ required: "ID number is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ID Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter ID number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="idDocument"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload ID Document</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  rules={{ validate: validatePhoneNumber }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., +1234567890" 
                          {...field}
                          onChange={(e) => {
                            const formatted = formatPhoneNumber(e.target.value);
                            field.onChange(formatted);
                          }}
                        />
                      </FormControl>
                      <p className="text-sm text-gray-500">
                        Include country code (e.g., +1 for US, +44 for UK)
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (Optional)</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="e.g., john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter full address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="documents" className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="supportingDocuments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Supporting Documents (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          onChange={(e) => field.onChange(e.target.files)}
                        />
                      </FormControl>
                      <p className="text-sm text-gray-500">
                        You can upload multiple files. Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
