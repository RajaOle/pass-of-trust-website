
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface CreditBalance {
  available: number;
  used: number;
  total: number;
}

export const useInquiryCredit = () => {
  const { toast } = useToast();
  const [creditBalance, setCreditBalance] = useState<CreditBalance>({
    available: 25,
    used: 5,
    total: 30
  });

  const checkCreditRequirement = (searchType: "goodpass" | "combined") => {
    const required = searchType === "goodpass" ? 1 : 3;
    return {
      required,
      sufficient: creditBalance.available >= required,
      available: creditBalance.available
    };
  };

  const consumeCredits = (amount: number, searchType: string) => {
    if (creditBalance.available >= amount) {
      setCreditBalance(prev => ({
        ...prev,
        available: prev.available - amount,
        used: prev.used + amount
      }));
      
      toast({
        title: "Credits Used",
        description: `${amount} credits used for ${searchType} search`,
      });
      
      return true;
    }
    return false;
  };

  const addSearchToHistory = (searchParams: any, results: any[], creditsUsed: number) => {
    const historyItem = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      searchParams,
      resultsCount: results.length,
      creditsUsed,
      status: "completed"
    };

    const history = JSON.parse(localStorage.getItem("inquiry-history") || "[]");
    history.unshift(historyItem);
    localStorage.setItem("inquiry-history", JSON.stringify(history.slice(0, 50))); // Keep last 50 searches
  };

  return {
    creditBalance,
    checkCreditRequirement,
    consumeCredits,
    addSearchToHistory
  };
};
