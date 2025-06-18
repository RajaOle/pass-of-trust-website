
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, MessageCircle, Mail, Phone, Clock } from "lucide-react";

export const ContactSupport = () => {
  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "Available 24/7",
      action: "Start Chat",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      availability: "Response within 24h",
      action: "Send Email",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our support specialists",
      availability: "Mon-Fri, 9AM-6PM EST",
      action: "Call Now",
    },
  ];

  const faqItems = [
    {
      question: "How do I purchase credits?",
      answer: "You can purchase credits through the Purchase Credit section in your dashboard.",
    },
    {
      question: "What is GP Score?",
      answer: "GP Score is your Goodpass credibility rating based on your contributions and activity.",
    },
    {
      question: "How do I write a report?",
      answer: "Navigate to the Make Report section and follow the guided form to submit your report.",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Support</h1>
        <p className="text-gray-600 mt-2">Get help when you need it. We're here to assist you.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {supportOptions.map((option, index) => (
          <Card key={index}>
            <CardHeader className="text-center">
              <option.icon className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <CardTitle className="text-lg">{option.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-gray-600">{option.description}</p>
              <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                <span>{option.availability}</span>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                {option.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <HelpCircle className="h-5 w-5" />
            <span>Frequently Asked Questions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <h4 className="font-medium text-gray-900 mb-2">{item.question}</h4>
                <p className="text-sm text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline">View All FAQs</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for? Our comprehensive help center has detailed guides and tutorials.
          </p>
          <Button variant="outline">Visit Help Center</Button>
        </CardContent>
      </Card>
    </div>
  );
};
