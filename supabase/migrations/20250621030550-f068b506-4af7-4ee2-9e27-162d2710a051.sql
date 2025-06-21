
-- Add phone verification columns to kyc_profiles table
ALTER TABLE public.kyc_profiles 
ADD COLUMN IF NOT EXISTS phone_verification_code TEXT,
ADD COLUMN IF NOT EXISTS phone_verification_expires_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS phone_verification_attempts INTEGER DEFAULT 0;

-- Create index for phone verification lookup
CREATE INDEX IF NOT EXISTS idx_kyc_profiles_phone_verification 
ON public.kyc_profiles(phone_number, phone_verification_code) 
WHERE phone_verification_code IS NOT NULL;
