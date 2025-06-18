
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Eye, Download, Edit } from "lucide-react";

export const MyReport = () => {
  const myReports = [
    {
      id: 1,
      title: "Monthly Business Analysis",
      date: "2024-01-15",
      status: "Completed",
      type: "Business Report",
    },
    {
      id: 2,
      title: "Market Research Summary",
      date: "2024-01-12",
      status: "In Progress",
      type: "Market Report",
    },
    {
      id: 3,
      title: "Competitor Analysis",
      date: "2024-01-08",
      status: "Draft",
      type: "Analysis Report",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Reports</h1>
          <p className="text-gray-600 mt-2">Create and manage your personal reports.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New Report
        </Button>
      </div>

      <div className="grid gap-4">
        {myReports.map((report) => (
          <Card key={report.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{report.title}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <span>{report.date}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {report.type}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        report.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : report.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
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
