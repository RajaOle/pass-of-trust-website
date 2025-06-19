
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, User, Phone, Mail, MapPin, Instagram, Linkedin, Building2, Hash, CreditCard } from "lucide-react";
import { AddInfoFormData } from "@/hooks/useAddInfoForm";
import { LoanReport } from "@/types/loanReport";
import { countries } from "@/data/countries";
import { banks } from "@/data/banks";

interface AddInfoReporteeTabProps {
  form: UseFormReturn<AddInfoFormData>;
  report: LoanReport;
  validatePhoneNumber: (value: string) => string | boolean;
  validateEmail: (value: string) => string | boolean;
  validateWebsite: (value: string) => string | boolean;
  validateBankAccountNumber: (value: string) => string | boolean;
  formatPhoneNumber: (value: string) => string;
  showSocialMedia: boolean;
  setShowSocialMedia: (show: boolean) => void;
  showBankAccount: boolean;
  setShowBankAccount: (show: boolean) => void;
}

export const AddInfoReporteeTab = ({
  form,
  report,
  validatePhoneNumber,
  validateEmail,
  validateWebsite,
  validateBankAccountNumber,
  formatPhoneNumber,
  showSocialMedia,
  setShowSocialMedia,
  showBankAccount,
  setShowBankAccount
}: AddInfoReporteeTabProps) => {
  const watchReporteeType = form.watch("reporteeType");
  
  // Check if field was originally populated in the report (read-only)
  const isFieldOriginallyPopulated = (fieldName: keyof LoanReport) => {
    const fieldValue = report[fieldName];
    return fieldValue && String(fieldValue).trim() !== "";
  };

  return (
    <div className="space-y-4 mt-4">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
        <p className="text-sm text-blue-800">
          💡 Only empty fields can be edited. Fields with existing data are preserved and shown as read-only.
        </p>
      </div>

      {/* Basic Information */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-700 flex items-center gap-2">
          <User className="h-4 w-4" />
          Basic Information
        </h4>
        
        {watchReporteeType === "individual" ? (
          <FormField
            control={form.control}
            name="borrowerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} disabled className="bg-gray-100" />
                </FormControl>
              </FormItem>
            )}
          />
        ) : (
          <>
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      disabled={isFieldOriginallyPopulated('companyName')}
                      className={isFieldOriginallyPopulated('companyName') ? "bg-gray-100" : ""}
                    />
                  </FormControl>
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
                    Website
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., www.company.com"
                      {...field} 
                      disabled={isFieldOriginallyPopulated('website')}
                      className={isFieldOriginallyPopulated('website') ? "bg-gray-100" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-700 flex items-center gap-2">
          <Phone className="h-4 w-4" />
          Contact Information
        </h4>
        
        <FormField
          control={form.control}
          name="phoneNumber"
          rules={{ validate: validatePhoneNumber }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input 
                  placeholder="e.g., +1234567890"
                  {...field}
                  onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
                  disabled={isFieldOriginallyPopulated('phoneNumber')}
                  className={isFieldOriginallyPopulated('phoneNumber') ? "bg-gray-100" : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          rules={{ validate: validateEmail }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address
              </FormLabel>
              <FormControl>
                <Input 
                  type="email"
                  placeholder="e.g., john@example.com"
                  {...field} 
                  disabled={isFieldOriginallyPopulated('email')}
                  className={isFieldOriginallyPopulated('email') ? "bg-gray-100" : ""}
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
              <FormLabel className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address
              </FormLabel>
              <FormControl>
                <Input 
                  placeholder="Full address"
                  {...field} 
                  disabled={isFieldOriginallyPopulated('address')}
                  className={isFieldOriginallyPopulated('address') ? "bg-gray-100" : ""}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {/* Social Media Section */}
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
                    <Input 
                      placeholder="e.g., @username or full URL"
                      {...field} 
                      disabled={isFieldOriginallyPopulated('instagramProfile')}
                      className={isFieldOriginallyPopulated('instagramProfile') ? "bg-gray-100" : ""}
                    />
                  </FormControl>
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
                    <Input 
                      placeholder="e.g., @username or full URL"
                      {...field} 
                      disabled={isFieldOriginallyPopulated('tiktokProfile')}
                      className={isFieldOriginallyPopulated('tiktokProfile') ? "bg-gray-100" : ""}
                    />
                  </FormControl>
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
                    <Input 
                      placeholder="e.g., linkedin.com/in/username"
                      {...field} 
                      disabled={isFieldOriginallyPopulated('linkedinProfile')}
                      className={isFieldOriginallyPopulated('linkedinProfile') ? "bg-gray-100" : ""}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </>
        )}
      </div>

      {/* Bank Account Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="addBankAccount"
            checked={showBankAccount}
            onChange={(e) => setShowBankAccount(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="addBankAccount" className="text-sm font-medium">
            Add Bank Account Information (Optional)
          </label>
        </div>

        {showBankAccount && (
          <>
            <FormField
              control={form.control}
              name="bankName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Bank Name
                  </FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      disabled={isFieldOriginallyPopulated('bankName')}
                    >
                      <SelectTrigger className={isFieldOriginallyPopulated('bankName') ? "bg-gray-100" : ""}>
                        <SelectValue placeholder="Select bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {banks.map((bank) => (
                          <SelectItem key={bank.code} value={bank.name}>
                            {bank.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bankAccountNumber"
              rules={{ validate: validateBankAccountNumber }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Hash className="h-4 w-4" />
                    Bank Account Number
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Account number (8-20 digits)"
                      {...field} 
                      disabled={isFieldOriginallyPopulated('bankAccountNumber')}
                      className={isFieldOriginallyPopulated('bankAccountNumber') ? "bg-gray-100" : ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </div>

      {/* ID Information */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-700 flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          ID Information
        </h4>
        
        <FormField
          control={form.control}
          name="idType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Type</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  disabled={isFieldOriginallyPopulated('idType')}
                >
                  <SelectTrigger className={isFieldOriginallyPopulated('idType') ? "bg-gray-100" : ""}>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="drivers-license">Driver's License</SelectItem>
                    <SelectItem value="national-id">National ID</SelectItem>
                    <SelectItem value="state-id">State ID</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Number</FormLabel>
              <FormControl>
                <Input 
                  placeholder="ID number"
                  {...field} 
                  disabled={isFieldOriginallyPopulated('idNumber')}
                  className={isFieldOriginallyPopulated('idNumber') ? "bg-gray-100" : ""}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
