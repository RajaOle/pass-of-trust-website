
import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardContent } from "@/components/DashboardContent";
import { MyReport } from "@/components/MyReport";
import { InquiryRecords } from "@/components/InquiryRecords";
import { PurchaseCredit } from "@/components/PurchaseCredit";
import { Settings } from "@/components/Settings";
import { Profiles } from "@/components/Profiles";
import { ContactSupport } from "@/components/ContactSupport";
import { EditProfile } from "@/components/EditProfile";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />;
      case "my-report":
        return <MyReport />;
      case "inquiry-records":
        return <InquiryRecords />;
      case "purchase-credit":
        return <PurchaseCredit />;
      case "settings":
        return <Settings />;
      case "profiles":
        return <Profiles onEditProfile={() => setActiveSection("edit-profile")} />;
      case "edit-profile":
        return <EditProfile />;
      case "contact-support":
        return <ContactSupport />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 p-6">
          <div className="mb-4">
            <SidebarTrigger />
          </div>
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
