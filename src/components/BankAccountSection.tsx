
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Building2, Check, ChevronsUpDown } from "lucide-react";
import { CreateLoanReportFormData } from "@/hooks/useCreateLoanReportForm";
import { banks } from "@/data/banks";
import { cn } from "@/lib/utils";

interface BankAccountSectionProps {
  form: UseFormReturn<CreateLoanReportFormData>;
  showBankAccount: boolean;
  setShowBankAccount: (show: boolean) => void;
  validateBankAccountNumber: (value: string) => string | boolean;
}

export const BankAccountSection = ({ 
  form, 
  showBankAccount, 
  setShowBankAccount, 
  validateBankAccountNumber 
}: BankAccountSectionProps) => {
  const [bankOpen, setBankOpen] = useState(false);

  return (
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
                <Popover open={bankOpen} onOpenChange={setBankOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={bankOpen}
                        className="w-full justify-between"
                      >
                        {field.value
                          ? banks.find((bank) => bank.name === field.value)?.name
                          : "Select bank..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search banks..." />
                      <CommandEmpty>No bank found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          {banks.map((bank) => (
                            <CommandItem
                              key={bank.code}
                              value={bank.name}
                              onSelect={(currentValue) => {
                                field.onChange(currentValue === field.value ? "" : currentValue);
                                setBankOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  field.value === bank.name ? "opacity-100" : "opacity-0"
                                )}
                              />
                              <div className="flex flex-col">
                                <span>{bank.name}</span>
                                <span className="text-xs text-gray-500">{bank.country}</span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankAccountNumber"
            rules={{ validate: validateBankAccountNumber }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Account Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter account number" {...field} />
                </FormControl>
                <p className="text-sm text-gray-500">
                  Enter your bank account number (8-20 digits)
                </p>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
};
