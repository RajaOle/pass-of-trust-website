
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Clock, CheckCircle } from "lucide-react";

interface InquiryHistoryItem {
  id: number;
  timestamp: string;
  searchType: "goodpass" | "combined";
  resultsCount: number;
  creditsUsed: number;
  status: "completed" | "in-progress" | "failed";
  searchTarget: string;
}

interface InquiryHistoryCardProps {
  item: InquiryHistoryItem;
  onViewResults: (id: number) => void;
  onDownloadReport: (id: number) => void;
}

export const InquiryHistoryCard = ({ 
  item, 
  onViewResults, 
  onDownloadReport 
}: InquiryHistoryCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              {getStatusIcon(item.status)}
              <h4 className="font-medium">{item.searchTarget}</h4>
              <Badge className={getStatusColor(item.status)}>
                {item.status}
              </Badge>
            </div>
            
            <div className="text-sm text-gray-600 space-y-1">
              <p>📅 {new Date(item.timestamp).toLocaleDateString()}</p>
              <p>🔍 {item.searchType === "goodpass" ? "Goodpass Only" : "Goodpass + 3rd Party"}</p>
              <p>📊 {item.resultsCount} results found</p>
              <p>💳 {item.creditsUsed} credits used</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewResults(item.id)}
              disabled={item.status !== "completed"}
            >
              <Eye className="w-4 h-4 mr-1" />
              View
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onDownloadReport(item.id)}
              disabled={item.status !== "completed"}
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
