
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings as SettingsIcon, Bell, Shield, User, Key, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Settings = () => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account preferences and settings.</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Account Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Change Password</h4>
                <p className="text-sm text-gray-600">Update your account password</p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-gray-600">Receive updates via email</p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Push Notifications</h4>
                <p className="text-sm text-gray-600">Browser push notifications</p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Privacy & Security</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-600">Add an extra layer of security</p>
              </div>
              <Button variant="outline">Enable 2FA</Button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Data Export</h4>
                <p className="text-sm text-gray-600">Download your data</p>
              </div>
              <Button variant="outline">Export Data</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Key className="h-5 w-5" />
              <span>API Access</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="client-id" className="text-sm font-medium text-gray-700">
                Client ID
              </label>
              <div className="flex space-x-2">
                <Input
                  id="client-id"
                  type="text"
                  value="gp_client_1234567890abcdef"
                  readOnly
                  className="bg-gray-50 flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard("gp_client_1234567890abcdef", "Client ID")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="client-secret" className="text-sm font-medium text-gray-700">
                Client Secret
              </label>
              <div className="flex space-x-2">
                <Input
                  id="client-secret"
                  type="password"
                  value="gp_secret_abcdef1234567890"
                  readOnly
                  className="bg-gray-50 flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard("gp_secret_abcdef1234567890", "Client Secret")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="pt-2">
              <Button 
                variant="outline" 
                onClick={() => window.open('/developers', '_blank')}
              >
                View API Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
