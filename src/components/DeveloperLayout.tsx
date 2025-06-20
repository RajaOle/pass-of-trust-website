
import { useState } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { title: "Introduction", href: "/developers" },
  { title: "Authentication", href: "/developers/authentication" },
  { title: "Making Inquiries", href: "/developers/inquiries" },
  { title: "Submitting Financial Reports", href: "/developers/reports" },
  { title: "Webhooks", href: "/developers/webhooks" },
  { title: "SDKs", href: "/developers/sdks" },
  { title: "Reputation Score Use Cases", href: "/developers/use-cases" },
  { title: "Support / FAQ", href: "/developers/support" },
];

export const DeveloperLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <Link to="/" className="flex items-center ml-2 lg:ml-0">
                <img 
                  alt="Goodpass" 
                  className="h-6 sm:h-8 w-auto" 
                  src="/lovable-uploads/322b1780-03c2-42ca-9d1b-e4bf6b49a3fe.png" 
                />
              </Link>
            </div>
            <nav className="hidden lg:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Home
              </Link>
              <Link to="/makereport" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Make a Report
              </Link>
              <Link to="/makeinquiries" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Make Inquiries
              </Link>
              <Link to="/developers" className="text-blue-600 font-medium">
                Developers
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600" asChild>
                <Link to="/signin">Login</Link>
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 pt-16 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="h-full overflow-y-auto px-4 py-6">
            <div className="mb-6">
              <div className="flex flex-col space-y-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get API Keys
                </Button>
                <Button size="sm" variant="outline" className="border-gray-300 text-gray-700">
                  View Documentation
                </Button>
              </div>
            </div>
            <nav className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:pl-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
