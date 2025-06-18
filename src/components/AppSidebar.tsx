import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Settings,
  User,
  HelpCircle,
  LogOut,
} from "lucide-react";

interface AppSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const menuItems = [
  {
    title: "Dashboard",
    key: "dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Search Records",
    key: "inquiry-records",
    icon: FileText,
  },
  {
    title: "Purchase Credit",
    key: "purchase-credit",
    icon: CreditCard,
  },
  {
    title: "Settings",
    key: "settings",
    icon: Settings,
  },
  {
    title: "Profiles",
    key: "profiles",
    icon: User,
  },
  {
    title: "Contact Support",
    key: "contact-support",
    icon: HelpCircle,
  },
];

export function AppSidebar({ activeSection, onSectionChange }: AppSidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here
    navigate("/signin");
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">John Doe</h3>
            <p className="text-xs text-muted-foreground">Credits: 250</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeSection === item.key}
                    onClick={() => onSectionChange(item.key)}
                  >
                    <button className="w-full flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild onClick={handleLogout}>
                  <button className="w-full flex items-center space-x-2 text-red-600 hover:text-red-700">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
