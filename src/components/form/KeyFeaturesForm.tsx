import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { FormData } from '../../types';
import { X, Plus } from 'lucide-react';

interface KeyFeaturesFormProps {
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const KeyFeaturesForm: React.FC<KeyFeaturesFormProps> = ({
  formData,
  onUpdate,
  onNext,
  onBack,
}) => {
  const [newFeature, setNewFeature] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const addFeature = () => {
    if (newFeature.trim() === '') return;
    
    const updatedFeatures = [...formData.keyFeatures, newFeature];
    onUpdate({ keyFeatures: updatedFeatures });
    setNewFeature('');
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = formData.keyFeatures.filter((_, i) => i !== index);
    onUpdate({ keyFeatures: updatedFeatures });
  };

  const updateFeature = (index: number, value: string) => {
    const updatedFeatures = [...formData.keyFeatures];
    updatedFeatures[index] = value;
    onUpdate({ keyFeatures: updatedFeatures });
  };

  // Example feature suggestions based on industry
  const getFeatureSuggestions = () => {
    const suggestions: Record<string, string[]> = {
      technology: [
        'User-friendly interface',
        'Cloud-based solution',
        'Advanced security features',
        'Real-time analytics',
        'Mobile compatibility'
      ],
      healthcare: [
        'HIPAA compliance',
        'Patient records management',
        'Appointment scheduling',
        'Telehealth capabilities',
        'Prescription management'
      ],
      education: [
        'Interactive learning tools',
        'Progress tracking',
        'Virtual classroom',
        'Curriculum management',
        'Student engagement analytics'
      ],
      finance: [
        'Secure transactions',
        'Budget planning tools',
        'Investment portfolio tracking',
        'Tax preparation assistance',
        'Financial report generation'
      ],
      ecommerce: [
        'Product search and filtering',
        'Secure checkout process',
        'Customer reviews',
        'Personalized recommendations',
        'Order tracking'
      ],
      // Add more industries as needed
    };

    return suggestions[formData.industry] || [
      'Easy to use interface',
      'Customer support',
      'Cost-effective solution',
      'Customizable options',
      'Time-saving features'
    ];
  };

  const suggestions = getFeatureSuggestions();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="features">Key Product/Service Features</Label>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            List the main features or benefits of your product or service.
          </p>

          <div className="space-y-2">
            {formData.keyFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder={`Feature ${index + 1}`}
                  className="flex-grow"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="p-2 text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ))}

            <div className="flex items-center space-x-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a new feature"
                className="flex-grow"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addFeature();
                  }
                }}
              />
              <button
                type="button"
                onClick={addFeature}
                className="p-2 text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <Label>Suggested Features</Label>
          <div className="grid grid-cols-1 gap-2 mt-2 sm:grid-cols-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  if (!formData.keyFeatures.includes(suggestion)) {
                    onUpdate({ keyFeatures: [...formData.keyFeatures, suggestion] });
                  }
                }}
                disabled={formData.keyFeatures.includes(suggestion)}
                className="text-left px-3 py-2 text-sm border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          type="submit" 
          variant="primary"
          disabled={formData.keyFeatures.length === 0 || formData.keyFeatures.every(f => f.trim() === '')}
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default KeyFeaturesForm;