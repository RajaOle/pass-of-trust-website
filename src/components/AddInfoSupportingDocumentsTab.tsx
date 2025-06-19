
import React from "react";

export const AddInfoSupportingDocumentsTab = () => {
  return (
    <div className="space-y-4 mt-4">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
        <p className="text-sm text-blue-800">
          📁 Supporting documents from the original report are preserved. No new documents can be added when adding supplemental information.
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium text-gray-700">Original Supporting Documents</h4>
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
          <p className="text-sm text-gray-600">
            All documents from the original loan report remain attached and accessible.
          </p>
        </div>
      </div>
    </div>
  );
};
