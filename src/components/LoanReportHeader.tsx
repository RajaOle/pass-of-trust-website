
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const LoanReportHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Loan Reports</h1>
        <p className="text-gray-600 mt-2">Manage and track your loan portfolio and reports.</p>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700">
        <Plus className="h-4 w-4 mr-2" />
        Create New Loan Report
      </Button>
    </div>
  );
};
