
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
      setLoanApplications(data || []);
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

      const { data, error } = await supabase
        .from('loan_applications')
        .insert({
          user_id: user.id,
          ...applicationData,
        })
        .select()
        .single();

      if (error) throw error;

      setLoanApplications(prev => [data, ...prev]);
      setCurrentApplication(data);
      
      toast({
        title: "Success",
        description: "Loan application created successfully",
      });

      return data;
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

      setLoanApplications(prev => 
        prev.map(app => app.id === applicationId ? data : app)
      );
      
      if (currentApplication?.id === applicationId) {
        setCurrentApplication(data);
      }

      toast({
        title: "Success",
        description: "Loan application updated successfully",
      });

      return data;
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
