
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Instagram, Linkedin } from "lucide-react";
import { CreateLoanReportFormData } from "@/hooks/useCreateLoanReportForm";

interface SocialMediaSectionProps {
  form: UseFormReturn<CreateLoanReportFormData>;
  showSocialMedia: boolean;
  setShowSocialMedia: (show: boolean) => void;
}

export const SocialMediaSection = ({ form, showSocialMedia, setShowSocialMedia }: SocialMediaSectionProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="addSocialMedia"
          checked={showSocialMedia}
          onChange={(e) => setShowSocialMedia(e.target.checked)}
          className="h-4 w-4"
        />
        <label htmlFor="addSocialMedia" className="text-sm font-medium">
          Add Social Media Profiles (Optional)
        </label>
      </div>

      {showSocialMedia && (
        <>
          <FormField
            control={form.control}
            name="instagramProfile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Instagram className="h-4 w-4" />
                  Instagram Profile
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., @username or full URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tiktokProfile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <span className="h-4 w-4 text-center font-bold text-xs">TT</span>
                  TikTok Profile
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., @username or full URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedinProfile"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn Profile
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., linkedin.com/in/username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </div>
  );
};
