
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VerifyCodeRequest {
  phoneNumber: string;
  code: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phoneNumber, code }: VerifyCodeRequest = await req.json();

    if (!phoneNumber || !code) {
      throw new Error('Phone number and verification code are required');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from JWT token
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error('Invalid token');
    }

    // Get KYC profile with verification code
    const { data: profile, error: profileError } = await supabase
      .from('kyc_profiles')
      .select('*')
      .eq('user_id', user.id)
      .eq('phone_number', phoneNumber)
      .single();

    if (profileError || !profile) {
      throw new Error('Verification session not found');
    }

    // Check if code has expired
    const now = new Date();
    const expiresAt = new Date(profile.phone_verification_expires_at);
    
    if (now > expiresAt) {
      throw new Error('Verification code has expired');
    }

    // Check attempt limit
    const maxAttempts = 3;
    if (profile.phone_verification_attempts >= maxAttempts) {
      throw new Error('Maximum verification attempts exceeded');
    }

    // Increment attempts
    const newAttempts = (profile.phone_verification_attempts || 0) + 1;

    // Check if code matches
    if (profile.phone_verification_code !== code) {
      // Update attempts count
      await supabase
        .from('kyc_profiles')
        .update({ 
          phone_verification_attempts: newAttempts 
        })
        .eq('user_id', user.id);

      throw new Error('Invalid verification code');
    }

    // Verification successful - update profile
    const { error: updateError } = await supabase
      .from('kyc_profiles')
      .update({
        phone_verified: true,
        phone_verification_code: null,
        phone_verification_expires_at: null,
        phone_verification_attempts: 0,
      })
      .eq('user_id', user.id);

    if (updateError) {
      throw new Error(`Failed to update verification status: ${updateError.message}`);
    }

    console.log(`Phone verification successful for user ${user.id}, phone ${phoneNumber}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Phone number verified successfully' 
      }),
      {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error('Error in verify-phone-code:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Failed to verify code' 
      }),
      {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
        status: 500,
      }
    );
  }
};

serve(handler);
