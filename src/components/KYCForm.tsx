
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useKYC } from '@/hooks/useKYC';
import { KYCProfile, KYCDocument } from '@/types/kyc';

interface KYCFormProps {
  onComplete?: () => void;
}

export const KYCForm = ({ onComplete }: KYCFormProps) => {
  const { kycProfile, kycDocuments, loading, createKYCProfile, updateKYCProfile, uploadKYCDocument } = useKYC();
  const [formData, setFormData] = useState<Partial<KYCProfile>>({
    first_name: kycProfile?.first_name || '',
    last_name: kycProfile?.last_name || '',
    date_of_birth: kycProfile?.date_of_birth || '',
    national_id_number: kycProfile?.national_id_number || '',
    address_line1: kycProfile?.address_line1 || '',
    address_line2: kycProfile?.address_line2 || '',
    city: kycProfile?.city || '',
    state: kycProfile?.state || '',
    postal_code: kycProfile?.postal_code || '',
    country: kycProfile?.country || '',
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleInputChange = (field: keyof KYCProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      if (kycProfile) {
        await updateKYCProfile(formData);
      } else {
        await createKYCProfile({
          ...formData,
          phone_number: '', // Will be populated from auth
          kyc_status: 'pending',
        });
      }
    } catch (error) {
      console.error('Error saving KYC profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (file: File, documentType: KYCDocument['document_type']) => {
    setUploading(true);
    try {
      await uploadKYCDocument(file, documentType);
    } catch (error) {
      console.error('Error uploading document:', error);
    } finally {
      setUploading(false);
    }
  };

  const getDocumentIcon = (status: KYCDocument['verification_status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: KYCProfile['kyc_status']) => {
    const statusConfig = {
      not_started: { label: 'Not Started', variant: 'secondary' as const },
      pending: { label: 'Pending Review', variant: 'default' as const },
      approved: { label: 'Approved', variant: 'default' as const },
      rejected: { label: 'Rejected', variant: 'destructive' as const },
    };

    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading KYC information...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>KYC Verification</CardTitle>
            {kycProfile && getStatusBadge(kycProfile.kyc_status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                value={formData.first_name || ''}
                onChange={(e) => handleInputChange('first_name', e.target.value)}
                placeholder="Enter your first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={formData.last_name || ''}
                onChange={(e) => handleInputChange('last_name', e.target.value)}
                placeholder="Enter your last name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input
                id="date_of_birth"
                type="date"
                value={formData.date_of_birth || ''}
                onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="national_id_number">National ID Number</Label>
              <Input
                id="national_id_number"
                value={formData.national_id_number || ''}
                onChange={(e) => handleInputChange('national_id_number', e.target.value)}
                placeholder="Enter your ID number"
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address_line1">Address Line 1</Label>
                <Input
                  id="address_line1"
                  value={formData.address_line1 || ''}
                  onChange={(e) => handleInputChange('address_line1', e.target.value)}
                  placeholder="Street address"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address_line2">Address Line 2 (Optional)</Label>
                <Input
                  id="address_line2"
                  value={formData.address_line2 || ''}
                  onChange={(e) => handleInputChange('address_line2', e.target.value)}
                  placeholder="Apartment, suite, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={formData.city || ''}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="City"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  value={formData.state || ''}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="State or Province"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postal_code">Postal Code</Label>
                <Input
                  id="postal_code"
                  value={formData.postal_code || ''}
                  onChange={(e) => handleInputChange('postal_code', e.target.value)}
                  placeholder="Postal code"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={formData.country || ''}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  placeholder="Country"
                />
              </div>
            </div>
          </div>

          <Button onClick={handleSaveProfile} disabled={saving} className="w-full">
            {saving ? 'Saving...' : 'Save Profile'}
          </Button>
        </CardContent>
      </Card>

      {/* Document Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Document Upload</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Upload Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(['national_id', 'passport', 'drivers_license', 'utility_bill', 'bank_statement'] as const).map((docType) => (
              <div key={docType} className="space-y-2">
                <Label className="capitalize">{docType.replace('_', ' ')}</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, docType);
                    }}
                    className="hidden"
                    id={`upload-${docType}`}
                    disabled={uploading}
                  />
                  <label
                    htmlFor={`upload-${docType}`}
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      {uploading ? 'Uploading...' : 'Click to upload'}
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          {/* Uploaded Documents */}
          {kycDocuments.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Uploaded Documents</h3>
              {kycDocuments.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{doc.file_name}</p>
                      <p className="text-sm text-gray-500 capitalize">
                        {doc.document_type.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getDocumentIcon(doc.verification_status)}
                    <Badge variant="outline">{doc.verification_status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {kycProfile?.kyc_status === 'approved' && onComplete && (
        <Button onClick={onComplete} className="w-full" size="lg">
          Continue to Loan Application
        </Button>
      )}
    </div>
  );
};
