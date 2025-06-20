
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Building, User, FileText } from 'lucide-react';
import { useKYC } from '@/hooks/useKYC';
import { useLoanApplication } from '@/hooks/useLoanApplication';
import { LoanApplication } from '@/types/kyc';

interface LoanApplicationFormProps {
  onSubmitted?: (application: LoanApplication) => void;
}

export const LoanApplicationForm = ({ onSubmitted }: LoanApplicationFormProps) => {
  const { kycProfile } = useKYC();
  const { createLoanApplication, updateLoanApplication, submitLoanApplication, currentApplication } = useLoanApplication();
  
  const [formData, setFormData] = useState<Partial<LoanApplication>>({
    loan_amount: 0,
    loan_purpose: '',
    loan_term_months: 12,
    borrower_type: 'individual',
    company_name: '',
    company_registration_number: '',
    monthly_income: 0,
    employment_status: '',
    employer_name: '',
    collateral_type: '',
    collateral_value: 0,
    collateral_description: '',
  });
  
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (currentApplication) {
      setFormData(currentApplication);
    }
  }, [currentApplication]);

  const handleInputChange = (field: keyof LoanApplication, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveAsDraft = async () => {
    if (!kycProfile) return;
    
    setSaving(true);
    try {
      if (currentApplication) {
        await updateLoanApplication(currentApplication.id, formData);
      } else {
        await createLoanApplication({
          ...formData,
          kyc_profile_id: kycProfile.id,
          status: 'draft',
        });
      }
    } catch (error) {
      console.error('Error saving loan application:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitApplication = async () => {
    if (!kycProfile || !currentApplication) return;
    
    setSubmitting(true);
    try {
      // Update with latest data first
      await updateLoanApplication(currentApplication.id, formData);
      
      // Then submit
      const submittedApp = await submitLoanApplication(currentApplication.id);
      
      if (onSubmitted) {
        onSubmitted(submittedApp);
      }
    } catch (error) {
      console.error('Error submitting loan application:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!kycProfile) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">Please complete your KYC verification first.</p>
        </CardContent>
      </Card>
    );
  }

  if (kycProfile.kyc_status !== 'approved') {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">
            Your KYC verification is still pending. Please wait for approval before applying for a loan.
          </p>
          <Badge variant="outline" className="mt-2">
            Status: {kycProfile.kyc_status}
          </Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Loan Application</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Loan Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Loan Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loan_amount">Loan Amount ($)</Label>
                <Input
                  id="loan_amount"
                  type="number"
                  value={formData.loan_amount || ''}
                  onChange={(e) => handleInputChange('loan_amount', parseFloat(e.target.value) || 0)}
                  placeholder="Enter loan amount"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loan_term_months">Loan Term (Months)</Label>
                <Select 
                  value={formData.loan_term_months?.toString() || ''}
                  onValueChange={(value) => handleInputChange('loan_term_months', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 months</SelectItem>
                    <SelectItem value="12">12 months</SelectItem>
                    <SelectItem value="24">24 months</SelectItem>
                    <SelectItem value="36">36 months</SelectItem>
                    <SelectItem value="48">48 months</SelectItem>
                    <SelectItem value="60">60 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="loan_purpose">Loan Purpose</Label>
                <Textarea
                  id="loan_purpose"
                  value={formData.loan_purpose || ''}
                  onChange={(e) => handleInputChange('loan_purpose', e.target.value)}
                  placeholder="Describe the purpose of this loan"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Borrower Type */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Borrower Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Borrower Type</Label>
                <Select 
                  value={formData.borrower_type || 'individual'}
                  onValueChange={(value: 'individual' | 'company') => handleInputChange('borrower_type', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Individual</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="company">
                      <div className="flex items-center space-x-2">
                        <Building className="h-4 w-4" />
                        <span>Company</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.borrower_type === 'company' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company_name">Company Name</Label>
                    <Input
                      id="company_name"
                      value={formData.company_name || ''}
                      onChange={(e) => handleInputChange('company_name', e.target.value)}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company_registration_number">Registration Number</Label>
                    <Input
                      id="company_registration_number"
                      value={formData.company_registration_number || ''}
                      onChange={(e) => handleInputChange('company_registration_number', e.target.value)}
                      placeholder="Enter registration number"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Financial Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monthly_income">Monthly Income ($)</Label>
                <Input
                  id="monthly_income"
                  type="number"
                  value={formData.monthly_income || ''}
                  onChange={(e) => handleInputChange('monthly_income', parseFloat(e.target.value) || 0)}
                  placeholder="Enter monthly income"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employment_status">Employment Status</Label>
                <Select 
                  value={formData.employment_status || ''}
                  onValueChange={(value) => handleInputChange('employment_status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full_time">Full Time</SelectItem>
                    <SelectItem value="part_time">Part Time</SelectItem>
                    <SelectItem value="self_employed">Self Employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="employer_name">Employer Name</Label>
                <Input
                  id="employer_name"
                  value={formData.employer_name || ''}
                  onChange={(e) => handleInputChange('employer_name', e.target.value)}
                  placeholder="Enter employer name"
                />
              </div>
            </div>
          </div>

          {/* Collateral Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Collateral (Optional)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="collateral_type">Collateral Type</Label>
                <Input
                  id="collateral_type"
                  value={formData.collateral_type || ''}
                  onChange={(e) => handleInputChange('collateral_type', e.target.value)}
                  placeholder="e.g., Vehicle, Property, Equipment"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="collateral_value">Estimated Value ($)</Label>
                <Input
                  id="collateral_value"
                  type="number"
                  value={formData.collateral_value || ''}
                  onChange={(e) => handleInputChange('collateral_value', parseFloat(e.target.value) || 0)}
                  placeholder="Enter estimated value"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="collateral_description">Description</Label>
                <Textarea
                  id="collateral_description"
                  value={formData.collateral_description || ''}
                  onChange={(e) => handleInputChange('collateral_description', e.target.value)}
                  placeholder="Describe the collateral in detail"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button 
              variant="outline" 
              onClick={handleSaveAsDraft} 
              disabled={saving}
              className="flex-1"
            >
              {saving ? 'Saving...' : 'Save as Draft'}
            </Button>
            <Button 
              onClick={handleSubmitApplication} 
              disabled={submitting || !currentApplication}
              className="flex-1"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
