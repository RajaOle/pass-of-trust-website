
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { InquiryDialog } from "@/components/InquiryDialog";

export const InquiryButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setDialogOpen(true)}
        className="bg-blue-600 hover:bg-blue-700"
      >
        <Search className="w-4 h-4 mr-2" />
        Make Inquiry
      </Button>
      
      <InquiryDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </>
  );
};
