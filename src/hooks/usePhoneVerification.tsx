
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface PhoneVerificationState {
  step: 'input' | 'verify' | 'verified';
  isLoading: boolean;
  phoneNumber: string;
  verificationCode: string;
  attemptsRemaining: number;
  error: string | null;
}

export const usePhoneVerification = () => {
  const { toast } = useToast();
  const [state, setState] = useState<PhoneVerificationState>({
    step: 'input',
    isLoading: false,
    phoneNumber: '',
    verificationCode: '',
    attemptsRemaining: 3,
    error: null,
  });

  const sendVerificationCode = async (phoneNumber: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const { data, error } = await supabase.functions.invoke('send-verification-code', {
        body: { phoneNumber },
      });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        step: 'verify',
        phoneNumber,
        isLoading: false,
      }));

      toast({
        title: "Verification code sent",
        description: `We've sent a verification code to ${phoneNumber}`,
      });

      return { success: true };
    } catch (error: any) {
      setState(prev => ({ ...prev, isLoading: false, error: error.message }));
      toast({
        title: "Error",
        description: error.message || "Failed to send verification code",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const verifyCode = async (code: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const { data, error } = await supabase.functions.invoke('verify-phone-code', {
        body: { 
          phoneNumber: state.phoneNumber,
          code 
        },
      });

      if (error) throw error;

      setState(prev => ({
        ...prev,
        step: 'verified',
        isLoading: false,
        verificationCode: code,
      }));

      toast({
        title: "Phone verified successfully",
        description: "Your phone number has been verified",
      });

      return { success: true };
    } catch (error: any) {
      const newAttempts = state.attemptsRemaining - 1;
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error.message,
        attemptsRemaining: newAttempts,
      }));

      if (newAttempts <= 0) {
        setState(prev => ({ ...prev, step: 'input' }));
        toast({
          title: "Too many attempts",
          description: "Please request a new verification code",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Invalid code",
          description: `${newAttempts} attempts remaining`,
          variant: "destructive",
        });
      }

      return { success: false, error: error.message };
    }
  };

  const resetVerification = () => {
    setState({
      step: 'input',
      isLoading: false,
      phoneNumber: '',
      verificationCode: '',
      attemptsRemaining: 3,
      error: null,
    });
  };

  return {
    state,
    sendVerificationCode,
    verifyCode,
    resetVerification,
  };
};
