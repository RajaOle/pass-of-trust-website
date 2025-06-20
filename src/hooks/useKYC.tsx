
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { KYCProfile, KYCDocument } from '@/types/kyc';
import { useToast } from '@/hooks/use-toast';

export const useKYC = () => {
  const [kycProfile, setKycProfile] = useState<KYCProfile | null>(null);
  const [kycDocuments, setKycDocuments] = useState<KYCDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchKYCProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('kyc_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setKycProfile(data);
    } catch (error) {
      console.error('Error fetching KYC profile:', error);
      toast({
        title: "Error",
        description: "Failed to load KYC profile",
        variant: "destructive",
      });
    }
  };

  const fetchKYCDocuments = async () => {
    try {
      if (!kycProfile) return;

      const { data, error } = await supabase
        .from('kyc_documents')
        .select('*')
        .eq('kyc_profile_id', kycProfile.id)
        .order('uploaded_at', { ascending: false });

      if (error) throw error;
      setKycDocuments(data || []);
    } catch (error) {
      console.error('Error fetching KYC documents:', error);
    }
  };

  const createKYCProfile = async (profileData: Partial<KYCProfile>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('kyc_profiles')
        .insert({
          user_id: user.id,
          ...profileData,
        })
        .select()
        .single();

      if (error) throw error;

      setKycProfile(data);
      toast({
        title: "Success",
        description: "KYC profile created successfully",
      });

      return data;
    } catch (error) {
      console.error('Error creating KYC profile:', error);
      toast({
        title: "Error",
        description: "Failed to create KYC profile",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateKYCProfile = async (updates: Partial<KYCProfile>) => {
    try {
      if (!kycProfile) throw new Error('No KYC profile found');

      const { data, error } = await supabase
        .from('kyc_profiles')
        .update(updates)
        .eq('id', kycProfile.id)
        .select()
        .single();

      if (error) throw error;

      setKycProfile(data);
      toast({
        title: "Success",
        description: "KYC profile updated successfully",
      });

      return data;
    } catch (error) {
      console.error('Error updating KYC profile:', error);
      toast({
        title: "Error",
        description: "Failed to update KYC profile",
        variant: "destructive",
      });
      throw error;
    }
  };

  const uploadKYCDocument = async (file: File, documentType: KYCDocument['document_type']) => {
    try {
      if (!kycProfile) throw new Error('No KYC profile found');

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${documentType}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('loan-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data, error } = await supabase
        .from('kyc_documents')
        .insert({
          kyc_profile_id: kycProfile.id,
          document_type: documentType,
          file_name: file.name,
          file_path: fileName,
          file_size: file.size,
          mime_type: file.type,
        })
        .select()
        .single();

      if (error) throw error;

      setKycDocuments(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Document uploaded successfully",
      });

      return data;
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchKYCProfile();
      setLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (kycProfile) {
      fetchKYCDocuments();
    }
  }, [kycProfile]);

  return {
    kycProfile,
    kycDocuments,
    loading,
    createKYCProfile,
    updateKYCProfile,
    uploadKYCDocument,
    refetchProfile: fetchKYCProfile,
    refetchDocuments: fetchKYCDocuments,
  };
};
