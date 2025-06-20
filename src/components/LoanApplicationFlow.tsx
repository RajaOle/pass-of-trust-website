
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle, User, FileText, DollarSign } from 'lucide-react';
import { KYCForm } from '@/components/KYCForm';
import { LoanApplicationForm } from '@/components/LoanApplicationForm';
import { useKYC } from '@/hooks/useKYC';
import { useAuth } from '@/hooks/useAuth';
import { LoanApplication } from '@/types/kyc';

type Step = 'kyc' | 'application' | 'submitted';

export const LoanApplicationFlow = () => {
  const { user } = useAuth();
  const { kycProfile } = useKYC();
  const [currentStep, setCurrentStep] = useState<Step>('kyc');
  const [submittedApplication, setSubmittedApplication] = useState<LoanApplication | null>(null);

  const steps = [
    {
      id: 'kyc',
      title: 'KYC Verification',
      description: 'Complete your identity verification',
      icon: User,
      completed: kycProfile?.kyc_status === 'approved',
    },
    {
      id: 'application',
      title: 'Loan Application',
      description: 'Fill out your loan application',
      icon: FileText,
      completed: false,
    },
    {
      id: 'submitted',
      title: 'Application Submitted',
      description: 'Review and track your application',
      icon: DollarSign,
      completed: false,
    },
  ];

  const getStepProgress = () => {
    switch (currentStep) {
      case 'kyc':
        return kycProfile?.kyc_status === 'approved' ? 33 : 10;
      case 'application':
        return 66;
      case 'submitted':
        return 100;
      default:
        return 0;
    }
  };

  const handleKYCComplete = () => {
    setCurrentStep('application');
  };

  const handleApplicationSubmitted = (application: LoanApplication) => {
    setSubmittedApplication(application);
    setCurrentStep('submitted');
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-600">Please sign in to access the loan application.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Header */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Application Process</CardTitle>
          <div className="space-y-4">
            <Progress value={getStepProgress()} className="w-full" />
            <div className="flex justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = step.completed || (step.id === 'submitted' && submittedApplication);
                
                return (
                  <div key={step.id} className="flex flex-col items-center space-y-2">
                    <div className={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2
                      ${isCompleted 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : isActive 
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'bg-gray-100 border-gray-300 text-gray-400'
                      }
                    `}>
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Icon className="h-5 w-5" />
                      )}
                    </div>
                    <div className="text-center">
                      <p className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Step Content */}
      {currentStep === 'kyc' && (
        <KYCForm onComplete={handleKYCComplete} />
      )}

      {currentStep === 'application' && (
        <LoanApplicationForm onSubmitted={handleApplicationSubmitted} />
      )}

      {currentStep === 'submitted' && submittedApplication && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Application Submitted Successfully!</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">
                Your loan application has been submitted and is now under review.
              </p>
              <p className="text-green-700 text-sm mt-1">
                You will receive updates via email and SMS as your application progresses.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Application ID</p>
                <p className="font-mono text-sm bg-gray-100 p-2 rounded">{submittedApplication.id}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Loan Amount</p>
                <p className="text-lg font-semibold">${submittedApplication.loan_amount?.toLocaleString()}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Status</p>
                <Badge variant="default">Under Review</Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Submitted</p>
                <p className="text-sm">{new Date(submittedApplication.submitted_at!).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-medium mb-2">What's Next?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <Circle className="h-3 w-3" />
                  <span>Our team will review your application within 2-3 business days</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Circle className="h-3 w-3" />
                  <span>You may be contacted for additional documentation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Circle className="h-3 w-3" />
                  <span>Final approval decision will be communicated via email</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
