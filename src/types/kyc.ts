
export interface KYCProfile {
  id: string;
  user_id: string;
  phone_number: string;
  phone_verified: boolean;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  national_id_number?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  kyc_status: 'not_started' | 'pending' | 'approved' | 'rejected';
  kyc_completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface KYCDocument {
  id: string;
  kyc_profile_id: string;
  document_type: 'national_id' | 'passport' | 'drivers_license' | 'utility_bill' | 'bank_statement' | 'income_proof' | 'collateral_document' | 'other';
  file_name: string;
  file_path: string;
  file_size?: number;
  mime_type?: string;
  verification_status: 'pending' | 'verified' | 'rejected';
  verification_notes?: string;
  uploaded_at: string;
  verified_at?: string;
}

export interface LoanApplication {
  id: string;
  user_id: string;
  kyc_profile_id: string;
  loan_amount: number;
  loan_purpose?: string;
  loan_term_months?: number;
  interest_rate?: number;
  borrower_type: string; // Changed from union type to string to match database
  company_name?: string;
  company_registration_number?: string;
  monthly_income?: number;
  employment_status?: string;
  employer_name?: string;
  collateral_type?: string;
  collateral_value?: number;
  collateral_description?: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'active' | 'completed' | 'defaulted';
  submitted_at?: string;
  approved_at?: string;
  rejected_at?: string;
  rejection_reason?: string;
  created_at: string;
  updated_at: string;
}

// Helper type for form data with proper borrower_type union
export interface LoanApplicationFormData extends Omit<LoanApplication, 'borrower_type'> {
  borrower_type: 'individual' | 'company';
}
