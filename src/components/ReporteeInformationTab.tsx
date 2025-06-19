import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Instagram, Linkedin, Globe } from "lucide-react";
import { CreateLoanReportFormData } from "@/hooks/useCreateLoanReportForm";

interface ReporteeInformationTabProps {
  form: UseFormReturn<CreateLoanReportFormData>;
  validatePhoneNumber: (value: string) => string | boolean;
  validateEmail: (value: string, reporteeType: "individual" | "company") => string | boolean;
  validateWebsite: (value: string) => string | boolean;
  formatPhoneNumber: (value: string) => string;
  showSocialMedia: boolean;
  setShowSocialMedia: (show: boolean) => void;
}

export const ReporteeInformationTab = ({ 
  form, 
  validatePhoneNumber, 
  validateEmail,
  validateWebsite,
  formatPhoneNumber,
  showSocialMedia,
  setShowSocialMedia 
}: ReporteeInformationTabProps) => {
  const watchReporteeType = form.watch("reporteeType");

  const getIdTypeOptions = () => {
    if (watchReporteeType === "individual") {
      return [
        { value: "National ID", label: "National ID" },
        { value: "Passport", label: "Passport" },
        { value: "Driver's License", label: "Driver's License" }
      ];
    } else {
      return [
        { value: "Tax ID", label: "Tax ID" },
        { value: "Company Registration Number", label: "Company Registration Number" }
      ];
    }
  };

  return (
    <div className="space-y-4 mt-4">
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
              <FormLabel>Full Name *</FormLabel>
              <FormControl>
                <Input placeholder="e.g., John Smith" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <>
          <FormField
            control={form.control}
            name="companyName"
            rules={{ required: "Company name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., ABC Corporation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            rules={{ validate: validateWebsite }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website (Optional)
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., www.company.com or https://company.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}

      <FormField
        control={form.control}
        name="phoneNumber"
        rules={{ validate: validatePhoneNumber }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone Number *</FormLabel>
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
        rules={{ 
          validate: (value) => validateEmail(value, watchReporteeType)
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Email {watchReporteeType === "individual" ? "*" : "(Optional)"}
            </FormLabel>
            <FormControl>
              <Input type="email" placeholder="e.g., contact@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="idType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Identification Type (Optional)</FormLabel>
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
        render={({ field }) => (
          <FormItem>
            <FormLabel>ID Number (Optional)</FormLabel>
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
            <FormLabel>Upload ID Document (Optional)</FormLabel>
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

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="addSocialMedia"
            checked={showSocialMedia}
            onChange={(e) => setShowSocialMedia(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="addSocialMedia" className="text-sm font-medium">
            Add Social Media Profiles (Optional)
          </label>
        </div>

        {showSocialMedia && (
          <>
            <FormField
              control={form.control}
              name="instagramProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Instagram className="h-4 w-4" />
                    Instagram Profile
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., @username or full URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tiktokProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <span className="h-4 w-4 text-center font-bold text-xs">TT</span>
                    TikTok Profile
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., @username or full URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedinProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn Profile
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., linkedin.com/in/username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </div>
    </div>
  );
};
