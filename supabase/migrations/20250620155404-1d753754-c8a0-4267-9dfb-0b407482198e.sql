
-- Create enum types for the loan application system
CREATE TYPE public.kyc_status AS ENUM ('not_started', 'pending', 'approved', 'rejected');
CREATE TYPE public.loan_status AS ENUM ('draft', 'submitted', 'under_review', 'approved', 'rejected', 'active', 'completed', 'defaulted');
CREATE TYPE public.document_type AS ENUM ('national_id', 'passport', 'drivers_license', 'utility_bill', 'bank_statement', 'income_proof', 'collateral_document', 'other');
CREATE TYPE public.verification_status AS ENUM ('pending', 'verified', 'rejected');

-- Create KYC profiles table
CREATE TABLE public.kyc_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  phone_number TEXT NOT NULL,
  phone_verified BOOLEAN DEFAULT FALSE,
  first_name TEXT,
  last_name TEXT,
  date_of_birth DATE,
  national_id_number TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  country TEXT,
  kyc_status kyc_status DEFAULT 'not_started',
  kyc_completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create KYC documents table
CREATE TABLE public.kyc_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kyc_profile_id UUID REFERENCES public.kyc_profiles(id) ON DELETE CASCADE NOT NULL,
  document_type document_type NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  verification_status verification_status DEFAULT 'pending',
  verification_notes TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  verified_at TIMESTAMP WITH TIME ZONE
);

-- Create loan applications table
CREATE TABLE public.loan_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  kyc_profile_id UUID REFERENCES public.kyc_profiles(id) NOT NULL,
  
  -- Loan details
  loan_amount DECIMAL(15,2) NOT NULL,
  loan_purpose TEXT,
  loan_term_months INTEGER,
  interest_rate DECIMAL(5,2),
  
  -- Borrower information
  borrower_type TEXT CHECK (borrower_type IN ('individual', 'company')) DEFAULT 'individual',
  company_name TEXT,
  company_registration_number TEXT,
  
  -- Financial information
  monthly_income DECIMAL(15,2),
  employment_status TEXT,
  employer_name TEXT,
  
  -- Collateral information
  collateral_type TEXT,
  collateral_value DECIMAL(15,2),
  collateral_description TEXT,
  
  -- Application status
  status loan_status DEFAULT 'draft',
  submitted_at TIMESTAMP WITH TIME ZONE,
  approved_at TIMESTAMP WITH TIME ZONE,
  rejected_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create loan application documents table
CREATE TABLE public.loan_application_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_application_id UUID REFERENCES public.loan_applications(id) ON DELETE CASCADE NOT NULL,
  document_type document_type NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create active loans table
CREATE TABLE public.active_loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  loan_application_id UUID REFERENCES public.loan_applications(id) NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Loan terms
  principal_amount DECIMAL(15,2) NOT NULL,
  interest_rate DECIMAL(5,2) NOT NULL,
  term_months INTEGER NOT NULL,
  monthly_payment DECIMAL(15,2) NOT NULL,
  
  -- Loan status
  outstanding_balance DECIMAL(15,2) NOT NULL,
  payments_made INTEGER DEFAULT 0,
  next_payment_date DATE,
  
  -- Dates
  disbursed_at TIMESTAMP WITH TIME ZONE NOT NULL,
  maturity_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create loan payments table
CREATE TABLE public.loan_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  active_loan_id UUID REFERENCES public.active_loans(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  
  -- Payment details
  payment_amount DECIMAL(15,2) NOT NULL,
  principal_amount DECIMAL(15,2) NOT NULL,
  interest_amount DECIMAL(15,2) NOT NULL,
  payment_date DATE NOT NULL,
  payment_method TEXT,
  
  -- Payment proof
  payment_proof_file_path TEXT,
  verification_status verification_status DEFAULT 'pending',
  verified_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.kyc_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kyc_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_application_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.active_loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for kyc_profiles
CREATE POLICY "Users can view their own KYC profile" 
  ON public.kyc_profiles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own KYC profile" 
  ON public.kyc_profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own KYC profile" 
  ON public.kyc_profiles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create RLS policies for kyc_documents
CREATE POLICY "Users can view their own KYC documents" 
  ON public.kyc_documents 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.kyc_profiles 
      WHERE id = kyc_documents.kyc_profile_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own KYC documents" 
  ON public.kyc_documents 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.kyc_profiles 
      WHERE id = kyc_documents.kyc_profile_id 
      AND user_id = auth.uid()
    )
  );

-- Create RLS policies for loan_applications
CREATE POLICY "Users can view their own loan applications" 
  ON public.loan_applications 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own loan applications" 
  ON public.loan_applications 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own loan applications" 
  ON public.loan_applications 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create RLS policies for loan_application_documents
CREATE POLICY "Users can view their own loan application documents" 
  ON public.loan_application_documents 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.loan_applications 
      WHERE id = loan_application_documents.loan_application_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create their own loan application documents" 
  ON public.loan_application_documents 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.loan_applications 
      WHERE id = loan_application_documents.loan_application_id 
      AND user_id = auth.uid()
    )
  );

-- Create RLS policies for active_loans
CREATE POLICY "Users can view their own active loans" 
  ON public.active_loans 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create RLS policies for loan_payments
CREATE POLICY "Users can view their own loan payments" 
  ON public.loan_payments 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own loan payments" 
  ON public.loan_payments 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create storage bucket for KYC and loan documents
INSERT INTO storage.buckets (id, name, public) 
VALUES ('loan-documents', 'loan-documents', false);

-- Create storage policies for loan documents
CREATE POLICY "Users can upload their own documents" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (
    bucket_id = 'loan-documents' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can view their own documents" 
  ON storage.objects 
  FOR SELECT 
  USING (
    bucket_id = 'loan-documents' 
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_kyc_profiles_updated_at 
  BEFORE UPDATE ON public.kyc_profiles 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_loan_applications_updated_at 
  BEFORE UPDATE ON public.loan_applications 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_active_loans_updated_at 
  BEFORE UPDATE ON public.active_loans 
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
