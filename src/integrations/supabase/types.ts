export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      active_loans: {
        Row: {
          created_at: string | null
          disbursed_at: string
          id: string
          interest_rate: number
          loan_application_id: string
          maturity_date: string
          monthly_payment: number
          next_payment_date: string | null
          outstanding_balance: number
          payments_made: number | null
          principal_amount: number
          term_months: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          disbursed_at: string
          id?: string
          interest_rate: number
          loan_application_id: string
          maturity_date: string
          monthly_payment: number
          next_payment_date?: string | null
          outstanding_balance: number
          payments_made?: number | null
          principal_amount: number
          term_months: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          disbursed_at?: string
          id?: string
          interest_rate?: number
          loan_application_id?: string
          maturity_date?: string
          monthly_payment?: number
          next_payment_date?: string | null
          outstanding_balance?: number
          payments_made?: number | null
          principal_amount?: number
          term_months?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "active_loans_loan_application_id_fkey"
            columns: ["loan_application_id"]
            isOneToOne: false
            referencedRelation: "loan_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      inquiries: {
        Row: {
          created_at: string | null
          id: string
          inquiry_type: string | null
          subject_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          inquiry_type?: string | null
          subject_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          inquiry_type?: string | null
          subject_id?: string | null
        }
        Relationships: []
      }
      kyc_documents: {
        Row: {
          document_type: Database["public"]["Enums"]["document_type"]
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          kyc_profile_id: string
          mime_type: string | null
          uploaded_at: string | null
          verification_notes: string | null
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at: string | null
        }
        Insert: {
          document_type: Database["public"]["Enums"]["document_type"]
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          kyc_profile_id: string
          mime_type?: string | null
          uploaded_at?: string | null
          verification_notes?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
        }
        Update: {
          document_type?: Database["public"]["Enums"]["document_type"]
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          kyc_profile_id?: string
          mime_type?: string | null
          uploaded_at?: string | null
          verification_notes?: string | null
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "kyc_documents_kyc_profile_id_fkey"
            columns: ["kyc_profile_id"]
            isOneToOne: false
            referencedRelation: "kyc_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      kyc_profiles: {
        Row: {
          address_line1: string | null
          address_line2: string | null
          city: string | null
          country: string | null
          created_at: string | null
          date_of_birth: string | null
          first_name: string | null
          id: string
          kyc_completed_at: string | null
          kyc_status: Database["public"]["Enums"]["kyc_status"] | null
          last_name: string | null
          national_id_number: string | null
          phone_number: string
          phone_verification_attempts: number | null
          phone_verification_code: string | null
          phone_verification_expires_at: string | null
          phone_verified: boolean | null
          postal_code: string | null
          state: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          first_name?: string | null
          id?: string
          kyc_completed_at?: string | null
          kyc_status?: Database["public"]["Enums"]["kyc_status"] | null
          last_name?: string | null
          national_id_number?: string | null
          phone_number: string
          phone_verification_attempts?: number | null
          phone_verification_code?: string | null
          phone_verification_expires_at?: string | null
          phone_verified?: boolean | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address_line1?: string | null
          address_line2?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          first_name?: string | null
          id?: string
          kyc_completed_at?: string | null
          kyc_status?: Database["public"]["Enums"]["kyc_status"] | null
          last_name?: string | null
          national_id_number?: string | null
          phone_number?: string
          phone_verification_attempts?: number | null
          phone_verification_code?: string | null
          phone_verification_expires_at?: string | null
          phone_verified?: boolean | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      loan_application_documents: {
        Row: {
          document_type: Database["public"]["Enums"]["document_type"]
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          loan_application_id: string
          mime_type: string | null
          uploaded_at: string | null
        }
        Insert: {
          document_type: Database["public"]["Enums"]["document_type"]
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          loan_application_id: string
          mime_type?: string | null
          uploaded_at?: string | null
        }
        Update: {
          document_type?: Database["public"]["Enums"]["document_type"]
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          loan_application_id?: string
          mime_type?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loan_application_documents_loan_application_id_fkey"
            columns: ["loan_application_id"]
            isOneToOne: false
            referencedRelation: "loan_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      loan_applications: {
        Row: {
          approved_at: string | null
          borrower_type: string | null
          collateral_description: string | null
          collateral_type: string | null
          collateral_value: number | null
          company_name: string | null
          company_registration_number: string | null
          created_at: string | null
          employer_name: string | null
          employment_status: string | null
          id: string
          interest_rate: number | null
          kyc_profile_id: string
          loan_amount: number
          loan_purpose: string | null
          loan_term_months: number | null
          monthly_income: number | null
          rejected_at: string | null
          rejection_reason: string | null
          status: Database["public"]["Enums"]["loan_status"] | null
          submitted_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          approved_at?: string | null
          borrower_type?: string | null
          collateral_description?: string | null
          collateral_type?: string | null
          collateral_value?: number | null
          company_name?: string | null
          company_registration_number?: string | null
          created_at?: string | null
          employer_name?: string | null
          employment_status?: string | null
          id?: string
          interest_rate?: number | null
          kyc_profile_id: string
          loan_amount: number
          loan_purpose?: string | null
          loan_term_months?: number | null
          monthly_income?: number | null
          rejected_at?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["loan_status"] | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          approved_at?: string | null
          borrower_type?: string | null
          collateral_description?: string | null
          collateral_type?: string | null
          collateral_value?: number | null
          company_name?: string | null
          company_registration_number?: string | null
          created_at?: string | null
          employer_name?: string | null
          employment_status?: string | null
          id?: string
          interest_rate?: number | null
          kyc_profile_id?: string
          loan_amount?: number
          loan_purpose?: string | null
          loan_term_months?: number | null
          monthly_income?: number | null
          rejected_at?: string | null
          rejection_reason?: string | null
          status?: Database["public"]["Enums"]["loan_status"] | null
          submitted_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "loan_applications_kyc_profile_id_fkey"
            columns: ["kyc_profile_id"]
            isOneToOne: false
            referencedRelation: "kyc_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      loan_payments: {
        Row: {
          active_loan_id: string
          created_at: string | null
          id: string
          interest_amount: number
          payment_amount: number
          payment_date: string
          payment_method: string | null
          payment_proof_file_path: string | null
          principal_amount: number
          user_id: string
          verification_status:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at: string | null
        }
        Insert: {
          active_loan_id: string
          created_at?: string | null
          id?: string
          interest_amount: number
          payment_amount: number
          payment_date: string
          payment_method?: string | null
          payment_proof_file_path?: string | null
          principal_amount: number
          user_id: string
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
        }
        Update: {
          active_loan_id?: string
          created_at?: string | null
          id?: string
          interest_amount?: number
          payment_amount?: number
          payment_date?: string
          payment_method?: string | null
          payment_proof_file_path?: string | null
          principal_amount?: number
          user_id?: string
          verification_status?:
            | Database["public"]["Enums"]["verification_status"]
            | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "loan_payments_active_loan_id_fkey"
            columns: ["active_loan_id"]
            isOneToOne: false
            referencedRelation: "active_loans"
            referencedColumns: ["id"]
          },
        ]
      }
      loans: {
        Row: {
          amount: number
          created_at: string | null
          due_date: string
          loan_id: string
          status: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          due_date: string
          loan_id?: string
          status?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          due_date?: string
          loan_id?: string
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          loan_id: string | null
          message: string
          notification_id: string
          status: string | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          loan_id?: string | null
          message: string
          notification_id?: string
          status?: string | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          loan_id?: string | null
          message?: string
          notification_id?: string
          status?: string | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_loan_id_fkey"
            columns: ["loan_id"]
            isOneToOne: false
            referencedRelation: "loans"
            referencedColumns: ["loan_id"]
          },
        ]
      }
      payments: {
        Row: {
          created_at: string | null
          loan_id: string
          payment_id: string
          payment_proof_url: string
        }
        Insert: {
          created_at?: string | null
          loan_id: string
          payment_id?: string
          payment_proof_url: string
        }
        Update: {
          created_at?: string | null
          loan_id?: string
          payment_id?: string
          payment_proof_url?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_loan_id_fkey"
            columns: ["loan_id"]
            isOneToOne: false
            referencedRelation: "loans"
            referencedColumns: ["loan_id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          report_type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          report_type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          report_type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          id: string
          key: string | null
          updated_at: string | null
          user_id: string | null
          value: string | null
        }
        Insert: {
          id?: string
          key?: string | null
          updated_at?: string | null
          user_id?: string | null
          value?: string | null
        }
        Update: {
          id?: string
          key?: string | null
          updated_at?: string | null
          user_id?: string | null
          value?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      document_type:
        | "national_id"
        | "passport"
        | "drivers_license"
        | "utility_bill"
        | "bank_statement"
        | "income_proof"
        | "collateral_document"
        | "other"
      kyc_status: "not_started" | "pending" | "approved" | "rejected"
      loan_status:
        | "draft"
        | "submitted"
        | "under_review"
        | "approved"
        | "rejected"
        | "active"
        | "completed"
        | "defaulted"
      verification_status: "pending" | "verified" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      document_type: [
        "national_id",
        "passport",
        "drivers_license",
        "utility_bill",
        "bank_statement",
        "income_proof",
        "collateral_document",
        "other",
      ],
      kyc_status: ["not_started", "pending", "approved", "rejected"],
      loan_status: [
        "draft",
        "submitted",
        "under_review",
        "approved",
        "rejected",
        "active",
        "completed",
        "defaulted",
      ],
      verification_status: ["pending", "verified", "rejected"],
    },
  },
} as const
