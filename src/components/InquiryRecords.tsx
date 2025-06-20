
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Search, Filter, Download, Eye } from "lucide-react";
import { InquiryButton } from "@/components/InquiryButton";
import { InquiryHistoryCard } from "@/components/InquiryHistoryCard";
import { useToast } from "@/hooks/use-toast";

interface InquiryRecord {
  id: number;
  timestamp: string;
  searchType: "goodpass" | "combined";
  searchTarget: string;
  resultsCount: number;
  creditsUsed: number;
  status: "completed" | "in-progress" | "failed";
}

export const InquiryRecords = () => {
  const { toast } = useToast();
  const [records, setRecords] = useState<InquiryRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<InquiryRecord[]>([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    // Load inquiry history from localStorage
    const history = JSON.parse(localStorage.getItem("inquiry-history") || "[]");
    
    // Mock data if no history exists
    const mockRecords: InquiryRecord[] = [
      {
        id: 1,
        timestamp: "2024-01-15T10:30:00Z",
        searchType: "combined",
        searchTarget: "John Doe (+1234567890)",
        resultsCount: 2,
        creditsUsed: 3,
        status: "completed"
      },
      {
        id: 2,
        timestamp: "2024-01-14T15:20:00Z", 
        searchType: "goodpass",
        searchTarget: "jane.smith@email.com",
        resultsCount: 1,
        creditsUsed: 1,
        status: "completed"
      },
      {
        id: 3,
        timestamp: "2024-01-13T09:15:00Z",
        searchType: "combined",
        searchTarget: "Mike Johnson",
        resultsCount: 0,
        creditsUsed: 3,
        status: "completed"
      }
    ];

    const allRecords = history.length > 0 ? history : mockRecords;
    setRecords(allRecords);
    setFilteredRecords(allRecords);
  }, []);

  useEffect(() => {
    let filtered = records;

    // Apply search filter
    if (searchFilter) {
      filtered = filtered.filter(record => 
        record.searchTarget.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(record => record.status === statusFilter);
    }

    // Apply type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(record => record.searchType === typeFilter);
    }

    setFilteredRecords(filtered);
  }, [records, searchFilter, statusFilter, typeFilter]);

  const handleViewResults = (id: number) => {
    const record = records.find(r => r.id === id);
    if (record) {
      toast({
        title: "Opening Results",
        description: `Viewing results for ${record.searchTarget}`,
      });
    }
  };

  const handleDownloadReport = (id: number) => {
    const record = records.find(r => r.id === id);
    if (record) {
      toast({
        title: "Download Started",
        description: `Downloading report for ${record.searchTarget}`,
      });
    }
  };

  const getTotalCreditsUsed = () => {
    return records.reduce((total, record) => total + record.creditsUsed, 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inquiry Records</h1>
          <p className="text-gray-600 mt-2">View and manage your search history and results.</p>
        </div>
        <InquiryButton />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{records.length}</div>
            <div className="text-sm text-gray-600">Total Searches</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {records.filter(r => r.status === "completed").length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {records.reduce((total, r) => total + r.resultsCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Results</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{getTotalCreditsUsed()}</div>
            <div className="text-sm text-gray-600">Credits Used</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search Target</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <Input
                  placeholder="Search by name, phone, or email..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Search Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="goodpass">Goodpass Only</SelectItem>
                  <SelectItem value="combined">Goodpass + 3rd Party</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Records List */}
      <div className="space-y-4">
        {filteredRecords.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Records Found</h3>
              <p className="text-gray-600 mb-4">
                {records.length === 0 
                  ? "You haven't made any inquiries yet." 
                  : "No records match your current filters."
                }
              </p>
              {records.length === 0 && <InquiryButton />}
            </CardContent>
          </Card>
        ) : (
          filteredRecords.map((record) => (
            <InquiryHistoryCard
              key={record.id}
              item={record}
              onViewResults={handleViewResults}
              onDownloadReport={handleDownloadReport}
            />
          ))
        )}
      </div>
    </div>
  );
};
