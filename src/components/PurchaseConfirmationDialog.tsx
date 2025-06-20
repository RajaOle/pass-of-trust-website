
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Check } from "lucide-react";

interface PurchaseConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  credits: number;
  price: number;
}

export const PurchaseConfirmationDialog = ({
  open,
  onOpenChange,
  onConfirm,
  credits,
  price,
}: PurchaseConfirmationDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Confirm Purchase</span>
          </DialogTitle>
          <DialogDescription>
            Please confirm your credit purchase details below.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Credits:</span>
              <span className="font-semibold">{credits} Credits</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Price:</span>
              <span className="font-semibold text-blue-600">Rp {price.toLocaleString()}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total:</span>
                <span className="font-bold text-lg">Rp {price.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 text-xs text-gray-600">
            <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>Credits will be added to your account immediately after payment confirmation.</span>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="bg-blue-600 hover:bg-blue-700">
            <CreditCard className="h-4 w-4 mr-2" />
            Confirm Purchase
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
