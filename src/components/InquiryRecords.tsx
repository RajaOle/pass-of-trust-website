
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Eye, Download } from "lucide-react";

export const InquiryRecords = () => {
  const records = [
    {
      id: 1,
      title: "Company Financial Review",
      date: "2024-01-15",
      status: "Completed",
      type: "Financial Report",
    },
    {
      id: 2,
      title: "Business Partnership Inquiry",
      date: "2024-01-10",
      status: "In Progress",
      type: "Partnership Report",
    },
    {
      id: 3,
      title: "Vendor Assessment",
      date: "2024-01-05",
      status: "Completed",
      type: "Vendor Report",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inquiry Records</h1>
          <p className="text-gray-600 mt-2">View and manage your inquiry history.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="h-4 w-4 mr-2" />
          New Inquiry
        </Button>
      </div>

      <div className="grid gap-4">
        {records.map((record) => (
          <Card key={record.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{record.title}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <span>{record.date}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {record.type}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        record.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {record.status}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
