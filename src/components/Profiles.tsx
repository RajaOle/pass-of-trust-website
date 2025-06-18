
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Plus, Edit, Trash2 } from "lucide-react";

export const Profiles = () => {
  const profiles = [
    {
      id: 1,
      name: "Personal Profile",
      description: "Your main personal profile",
      avatar: "/placeholder.svg",
      initials: "JD",
      active: true,
    },
    {
      id: 2,
      name: "Business Profile",
      description: "Professional business profile",
      avatar: "/placeholder.svg",
      initials: "BP",
      active: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profiles</h1>
          <p className="text-gray-600 mt-2">Manage your different profiles and personas.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Profile
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {profiles.map((profile) => (
          <Card key={profile.id} className={profile.active ? 'border-2 border-blue-500' : ''}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback>{profile.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{profile.name}</CardTitle>
                  <p className="text-sm text-gray-600">{profile.description}</p>
                  {profile.active && (
                    <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Active
                    </span>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                {!profile.active && (
                  <Button variant="outline" size="sm">
                    Switch To
                  </Button>
                )}
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Profile Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Default Profile</h4>
              <p className="text-sm text-gray-600">Choose which profile to use by default</p>
            </div>
            <Button variant="outline">Configure</Button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-medium">Profile Visibility</h4>
              <p className="text-sm text-gray-600">Control who can see your profiles</p>
            </div>
            <Button variant="outline">Manage</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
