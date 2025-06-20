
import React from 'react';
import { LoanApplicationFlow } from '@/components/LoanApplicationFlow';

const LoanApplication = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Loan Application</h1>
          <p className="text-gray-600">
            Complete your KYC verification and submit your loan application
          </p>
        </div>
        
        <LoanApplicationFlow />
      </div>
    </div>
  );
};

export default LoanApplication;
