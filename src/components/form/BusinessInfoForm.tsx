import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { FormData } from '../../types';

interface BusinessInfoFormProps {
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
}

const industries = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'finance', label: 'Finance' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'hospitality', label: 'Hospitality' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'other', label: 'Other' },
];

const tones = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'casual', label: 'Casual' },
  { value: 'formal', label: 'Formal' },
  { value: 'technical', label: 'Technical' },
  { value: 'humorous', label: 'Humorous' },
  { value: 'enthusiastic', label: 'Enthusiastic' },
];

const BusinessInfoForm: React.FC<BusinessInfoFormProps> = ({
  formData,
  onUpdate,
  onNext,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => onUpdate({ businessName: e.target.value })}
            placeholder="Enter your business name"
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="industry">Industry</Label>
          <Select
            value={formData.industry}
            onValueChange={(value) => onUpdate({ industry: value })}
          >
            <SelectTrigger id="industry" className="mt-1">
              <SelectValue placeholder="Select an industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry.value} value={industry.value}>
                  {industry.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="tone">Brand Tone</Label>
          <Select
            value={formData.tone}
            onValueChange={(value) => onUpdate({ tone: value })}
          >
            <SelectTrigger id="tone" className="mt-1">
              <SelectValue placeholder="Select a tone" />
            </SelectTrigger>
            <SelectContent>
              {tones.map((tone) => (
                <SelectItem key={tone.value} value={tone.value}>
                  {tone.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="targetAudience">Target Audience</Label>
          <Input
            id="targetAudience"
            value={formData.targetAudience}
            onChange={(e) => onUpdate({ targetAudience: e.target.value })}
            placeholder="Describe your target audience"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="vision">Company Vision (optional)</Label>
          <textarea
            id="vision"
            value={formData.vision}
            onChange={(e) => onUpdate({ vision: e.target.value })}
            placeholder="Describe your company's vision or mission"
            className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:focus-visible:ring-slate-300"
            rows={4}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="primary">
          Next
        </Button>
      </div>
    </form>
  );
};

export default BusinessInfoForm;