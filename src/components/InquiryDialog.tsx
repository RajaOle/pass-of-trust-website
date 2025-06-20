
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Search, CreditCard, Clock, Check, X, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InquiryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type InquiryStep = "terms" | "source" | "search" | "results" | "credit";
type DataSource = "goodpass" | "combined";

interface SearchParams {
  goodpass: {
    name: string;
    phoneNumber: string;
    email: string;
  };
  thirdParty: {
    searchType: "phone" | "email" | "social";
    phoneNumber: string;
    email: string;
    socialMedia: string;
  };
}

export const InquiryDialog = ({ open, onOpenChange }: InquiryDialogProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<InquiryStep>("terms");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dataSource, setDataSource] = useState<DataSource>("goodpass");
  const [searchParams, setSearchParams] = useState<SearchParams>({
    goodpass: { name: "", phoneNumber: "", email: "" },
    thirdParty: { searchType: "phone", phoneNumber: "", email: "", socialMedia: "" }
  });
  const [isSearching, setIsSearching] = useState(false);
  const [showCreditDialog, setShowCreditDialog] = useState(false);
  const [currentCredits] = useState(25); // Mock current credits
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Mock terms acceptance status - in real app, this would come from user profile
  const [hasAcceptedTerms] = useState(false);

  const handleNext = () => {
    if (currentStep === "terms") {
      if (!termsAccepted) {
        toast({
          title: "Terms Required",
          description: "Please accept the terms to continue",
          variant: "destructive",
        });
        return;
      }
      setCurrentStep("source");
    } else if (currentStep === "source") {
      setCurrentStep("search");
    }
  };

  const handleSearch = async () => {
    // Check credit requirement
    const requiredCredits = dataSource === "goodpass" ? 1 : 3;
    if (currentCredits < requiredCredits) {
      setShowCreditDialog(true);
      return;
    }

    setIsSearching(true);
    
    // Mock search delay
    setTimeout(() => {
      // Mock search results
      const mockResults = [
        {
          id: 1,
          name: "John Doe",
          phone: "+1234567890",
          email: "john@example.com",
          loanHistory: "3 loans, 100% repayment rate",
          source: "Goodpass"
        }
      ];
      
      setSearchResults(mockResults);
      setCurrentStep("results");
      setIsSearching(false);
      
      toast({
        title: "Search Complete",
        description: `Found ${mockResults.length} results. ${requiredCredits} credits used.`,
      });
    }, 2000);
  };

  const renderTermsStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Terms of Use</h3>
        <p className="text-gray-600">Please review and accept our terms to proceed with your inquiry.</p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4 max-h-64 overflow-y-auto">
            <h4 className="font-medium">Data Usage Terms</h4>
            <p className="text-sm text-gray-600">
              By proceeding, you agree that the information retrieved will be used solely for legitimate business purposes including but not limited to:
            </p>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              <li>Loan origination and underwriting decisions</li>
              <li>Business partnership evaluations</li>
              <li>Employment verification processes</li>
              <li>Rental application assessments</li>
            </ul>
            <p className="text-sm text-gray-600">
              You acknowledge that misuse of this information may result in account suspension and legal action.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) => setTermsAccepted(checked === true)}
        />
        <Label htmlFor="terms" className="text-sm">
          I accept the terms of use and data usage policy
        </Label>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleNext} disabled={!termsAccepted}>
          Continue
        </Button>
      </div>
    </div>
  );

  const renderSourceStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Select Data Source</h3>
        <p className="text-gray-600">Choose which data sources to include in your search.</p>
      </div>

      <RadioGroup value={dataSource} onValueChange={(value) => setDataSource(value as DataSource)}>
        <Card className="cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="goodpass" id="goodpass" />
              <div className="flex-1">
                <Label htmlFor="goodpass" className="font-medium cursor-pointer">
                  Goodpass Only
                </Label>
                <p className="text-sm text-gray-600">Search only Goodpass verified records</p>
                <p className="text-xs text-green-600 font-medium">1 credit per search</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="combined" id="combined" />
              <div className="flex-1">
                <Label htmlFor="combined" className="font-medium cursor-pointer">
                  Goodpass + 3rd Party Data
                </Label>
                <p className="text-sm text-gray-600">Enhanced search with external data sources</p>
                <p className="text-xs text-blue-600 font-medium">3 credits per search</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </RadioGroup>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep("terms")}>
          Back
        </Button>
        <Button onClick={handleNext}>
          Continue
        </Button>
      </div>
    </div>
  );

  const renderSearchStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Search Parameters</h3>
        <p className="text-gray-600">Enter the information to search for.</p>
      </div>

      {/* Credit Info */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Current Credits: {currentCredits}</p>
              <p className="text-sm text-gray-600">
                This search will cost {dataSource === "goodpass" ? "1" : "3"} credits
              </p>
            </div>
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      {/* Goodpass Search Fields */}
      <Card>
        <CardContent className="p-4">
          <h4 className="font-medium mb-4">Goodpass Search</h4>
          <div className="space-y-4">
            <div>
              <Label htmlFor="goodpass-name">Name</Label>
              <Input
                id="goodpass-name"
                placeholder="Enter full name"
                value={searchParams.goodpass.name}
                onChange={(e) => setSearchParams(prev => ({
                  ...prev,
                  goodpass: { ...prev.goodpass, name: e.target.value }
                }))}
              />
            </div>
            <div>
              <Label htmlFor="goodpass-phone">Phone Number</Label>
              <Input
                id="goodpass-phone"
                placeholder="Enter phone number"
                value={searchParams.goodpass.phoneNumber}
                onChange={(e) => setSearchParams(prev => ({
                  ...prev,
                  goodpass: { ...prev.goodpass, phoneNumber: e.target.value }
                }))}
              />
            </div>
            <div>
              <Label htmlFor="goodpass-email">Email</Label>
              <Input
                id="goodpass-email"
                placeholder="Enter email address"
                value={searchParams.goodpass.email}
                onChange={(e) => setSearchParams(prev => ({
                  ...prev,
                  goodpass: { ...prev.goodpass, email: e.target.value }
                }))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3rd Party Search Fields */}
      {dataSource === "combined" && (
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-4">3rd Party Data Search</h4>
            <div className="space-y-4">
              <div>
                <Label>Search Type</Label>
                <RadioGroup 
                  value={searchParams.thirdParty.searchType} 
                  onValueChange={(value) => setSearchParams(prev => ({
                    ...prev,
                    thirdParty: { ...prev.thirdParty, searchType: value as "phone" | "email" | "social" }
                  }))}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="phone" />
                    <Label htmlFor="phone">Phone</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email" />
                    <Label htmlFor="email">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="social" id="social" />
                    <Label htmlFor="social">Social Media</Label>
                  </div>
                </RadioGroup>
              </div>

              {searchParams.thirdParty.searchType === "phone" && (
                <div>
                  <Label htmlFor="third-party-phone">Phone Number</Label>
                  <Input
                    id="third-party-phone"
                    placeholder="Enter phone number"
                    value={searchParams.thirdParty.phoneNumber}
                    onChange={(e) => setSearchParams(prev => ({
                      ...prev,
                      thirdParty: { ...prev.thirdParty, phoneNumber: e.target.value }
                    }))}
                  />
                </div>
              )}

              {searchParams.thirdParty.searchType === "email" && (
                <div>
                  <Label htmlFor="third-party-email">Email Address</Label>
                  <Input
                    id="third-party-email"
                    placeholder="Enter email address"
                    value={searchParams.thirdParty.email}
                    onChange={(e) => setSearchParams(prev => ({
                      ...prev,
                      thirdParty: { ...prev.thirdParty, email: e.target.value }
                    }))}
                  />
                </div>
              )}

              {searchParams.thirdParty.searchType === "social" && (
                <div>
                  <Label htmlFor="third-party-social">Social Media Handle</Label>
                  <Input
                    id="third-party-social"
                    placeholder="Enter social media handle"
                    value={searchParams.thirdParty.socialMedia}
                    onChange={(e) => setSearchParams(prev => ({
                      ...prev,
                      thirdParty: { ...prev.thirdParty, socialMedia: e.target.value }
                    }))}
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep("source")}>
          Back
        </Button>
        <Button onClick={handleSearch} disabled={isSearching}>
          {isSearching ? (
            <>
              <Clock className="w-4 h-4 mr-2 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Search
            </>
          )}
        </Button>
      </div>
    </div>
  );

  const renderResultsStep = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Search Results</h3>
        <p className="text-gray-600">Found {searchResults.length} matching records.</p>
      </div>

      <div className="space-y-4">
        {searchResults.map((result) => (
          <Card key={result.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h4 className="font-medium">{result.name}</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>📞 {result.phone}</p>
                    <p>📧 {result.email}</p>
                    <p>📊 {result.loanHistory}</p>
                    <p className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded inline-block">
                      Source: {result.source}
                    </p>
                  </div>
                </div>
                <Button size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep("search")}>
          New Search
        </Button>
        <Button onClick={() => onOpenChange(false)}>
          Done
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Make Inquiry
            </DialogTitle>
          </DialogHeader>

          {!hasAcceptedTerms && currentStep === "terms" && renderTermsStep()}
          {(hasAcceptedTerms || currentStep !== "terms") && currentStep === "source" && renderSourceStep()}
          {currentStep === "search" && renderSearchStep()}
          {currentStep === "results" && renderResultsStep()}
        </DialogContent>
      </Dialog>

      {/* Credit Top-up Dialog */}
      <AlertDialog open={showCreditDialog} onOpenChange={setShowCreditDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
              Insufficient Credits
            </AlertDialogTitle>
            <AlertDialogDescription>
              You need {dataSource === "goodpass" ? "1" : "3"} credits to perform this search, but you only have {currentCredits} credits remaining.
              Would you like to purchase more credits?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              setShowCreditDialog(false);
              setCurrentStep("credit");
            }}>
              Buy Credits
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
