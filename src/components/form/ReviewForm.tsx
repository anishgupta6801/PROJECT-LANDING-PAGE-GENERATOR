import React from 'react';
import { Button } from '../ui/button';
import { FormData } from '../../types';
import { capitalize } from '../../lib/utils';

interface ReviewFormProps {
  formData: FormData;
  onBack: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  formData,
  onBack,
  onSubmit,
  isLoading,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-slate-50 p-4 rounded-lg dark:bg-slate-800">
        <h3 className="text-lg font-medium mb-4">Review Your Information</h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Business Name</h4>
              <p className="mt-1">{formData.businessName || 'Not provided'}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Industry</h4>
              <p className="mt-1">{capitalize(formData.industry) || 'Not provided'}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Brand Tone</h4>
              <p className="mt-1">{capitalize(formData.tone) || 'Not provided'}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Target Audience</h4>
              <p className="mt-1">{formData.targetAudience || 'Not provided'}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Brand Colors</h4>
            <div className="flex items-center space-x-3 mt-1">
              <div className="flex items-center space-x-1">
                <div
                  className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-700"
                  style={{ backgroundColor: formData.brandColors.primary }}
                />
                <span className="text-sm">{formData.brandColors.primary}</span>
              </div>
              
              {formData.brandColors.secondary && (
                <div className="flex items-center space-x-1">
                  <div
                    className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-700"
                    style={{ backgroundColor: formData.brandColors.secondary }}
                  />
                  <span className="text-sm">{formData.brandColors.secondary}</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Key Features</h4>
            {formData.keyFeatures.length > 0 ? (
              <ul className="mt-1 list-disc list-inside">
                {formData.keyFeatures.map((feature, index) => (
                  <li key={index} className="text-sm">{feature}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-1 text-sm">No features provided</p>
            )}
          </div>

          {formData.vision && (
            <div>
              <h4 className="text-sm font-medium text-slate-500 dark:text-slate-400">Company Vision</h4>
              <p className="mt-1 text-sm">{formData.vision}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          type="button" 
          variant="primary" 
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Landing Page'}
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;