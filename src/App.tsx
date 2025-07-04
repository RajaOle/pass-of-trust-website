
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { DeveloperLayout } from "./components/DeveloperLayout";
import Index from "./pages/Index";
import MakeReport from "./pages/MakeReport";
import MakeInquiries from "./pages/MakeInquiries";
import Pricing from "./pages/Pricing";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import LoanApplication from "./pages/LoanApplication";
import TermsOfUse from "./pages/TermsOfUse";
import AdditionalTermsOfUse from "./pages/AdditionalTermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/makereport" element={<MakeReport />} />
            <Route path="/makeinquiries" element={<MakeInquiries />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/loan-application" element={<LoanApplication />} />
            <Route path="/about-us/terms-of-use" element={<TermsOfUse />} />
            <Route path="/about-us/terms-of-use/additional-terms-of-use" element={<AdditionalTermsOfUse />} />
            <Route path="/about-us/privacy-policy" element={<PrivacyPolicy />} />
            
            {/* Developer Documentation Route - Single Page */}
            <Route path="/developers" element={<DeveloperLayout />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
