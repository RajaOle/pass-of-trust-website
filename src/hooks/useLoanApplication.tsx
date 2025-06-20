
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { LoanApplication } from '@/types/kyc';
import { useToast } from '@/hooks/use-toast';

export const useLoanApplication = () => {
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>([]);
  const [currentApplication, setCurrentApplication] = useState<LoanApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLoanApplications = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('loan_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLoanApplications((data || []) as LoanApplication[]);
    } catch (error) {
      console.error('Error fetching loan applications:', error);
      toast({
        title: "Error",
        description: "Failed to load loan applications",
        variant: "destructive",
      });
    }
  };

  const createLoanApplication = async (applicationData: Partial<LoanApplication>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Ensure required fields are provided
      if (!applicationData.kyc_profile_id) {
        throw new Error('KYC profile ID is required');
      }

      if (!applicationData.loan_amount) {
        throw new Error('Loan amount is required');
      }

      const { data, error } = await supabase
        .from('loan_applications')
        .insert({
          user_id: user.id,
          kyc_profile_id: applicationData.kyc_profile_id,
          loan_amount: applicationData.loan_amount,
          loan_purpose: applicationData.loan_purpose,
          loan_term_months: applicationData.loan_term_months,
          interest_rate: applicationData.interest_rate,
          borrower_type: applicationData.borrower_type || 'individual',
          company_name: applicationData.company_name,
          company_registration_number: applicationData.company_registration_number,
          monthly_income: applicationData.monthly_income,
          employment_status: applicationData.employment_status,
          employer_name: applicationData.employer_name,
          collateral_type: applicationData.collateral_type,
          collateral_value: applicationData.collateral_value,
          collateral_description: applicationData.collateral_description,
          status: applicationData.status || 'draft',
        })
        .select()
        .single();

      if (error) throw error;

      const newApplication = data as LoanApplication;
      setLoanApplications(prev => [newApplication, ...prev]);
      setCurrentApplication(newApplication);
      
      toast({
        title: "Success",
        description: "Loan application created successfully",
      });

      return newApplication;
    } catch (error) {
      console.error('Error creating loan application:', error);
      toast({
        title: "Error",
        description: "Failed to create loan application",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateLoanApplication = async (applicationId: string, updates: Partial<LoanApplication>) => {
    try {
      const { data, error } = await supabase
        .from('loan_applications')
        .update(updates)
        .eq('id', applicationId)
        .select()
        .single();

      if (error) throw error;

      const updatedApplication = data as LoanApplication;
      setLoanApplications(prev => 
        prev.map(app => app.id === applicationId ? updatedApplication : app)
      );
      
      if (currentApplication?.id === applicationId) {
        setCurrentApplication(updatedApplication);
      }

      toast({
        title: "Success",
        description: "Loan application updated successfully",
      });

      return updatedApplication;
    } catch (error) {
      console.error('Error updating loan application:', error);
      toast({
        title: "Error",
        description: "Failed to update loan application",
        variant: "destructive",
      });
      throw error;
    }
  };

  const submitLoanApplication = async (applicationId: string) => {
    try {
      return await updateLoanApplication(applicationId, {
        status: 'submitted',
        submitted_at: new Date().toISOString(),
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchLoanApplications();
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    loanApplications,
    currentApplication,
    loading,
    createLoanApplication,
    updateLoanApplication,
    submitLoanApplication,
    setCurrentApplication,
    refetch: fetchLoanApplications,
  };
};
