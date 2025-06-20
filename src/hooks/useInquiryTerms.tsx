
import { useState, useEffect } from "react";

export const useInquiryTerms = () => {
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking user's terms acceptance status
    // In a real app, this would check the user's profile or database
    const checkTermsStatus = () => {
      const accepted = localStorage.getItem("inquiry-terms-accepted");
      setHasAcceptedTerms(accepted === "true");
      setIsLoading(false);
    };

    checkTermsStatus();
  }, []);

  const acceptTerms = () => {
    localStorage.setItem("inquiry-terms-accepted", "true");
    setHasAcceptedTerms(true);
  };

  return {
    hasAcceptedTerms,
    acceptTerms,
    isLoading
  };
};
