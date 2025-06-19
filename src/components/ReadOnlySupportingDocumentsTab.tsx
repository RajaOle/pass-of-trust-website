
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { RestructureLoanFormData } from "@/hooks/useRestructureLoanForm";

interface ReadOnlySupportingDocumentsTabProps {
  form: UseFormReturn<RestructureLoanFormData>;
}

export const ReadOnlySupportingDocumentsTab = ({ form }: ReadOnlySupportingDocumentsTabProps) => {
  return (
    <div className="space-y-4 mt-4">
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4">
        <p className="text-sm text-yellow-800">
          📁 Supporting documents from the original report are preserved. No new documents can be added during restructure.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium text-gray-700">Original Supporting Documents</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
          <p className="text-sm text-gray-600">
            All documents from the original loan report will remain attached to this restructured report.
          </p>
        </div>
      </div>
    </div>
  );
};
