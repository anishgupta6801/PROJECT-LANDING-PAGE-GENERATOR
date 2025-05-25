import React from 'react';
import { FormData } from '../../types';
import BusinessInfoForm from './BusinessInfoForm';
import BrandStyleForm from './BrandStyleForm';
import KeyFeaturesForm from './KeyFeaturesForm';
import ReviewForm from './ReviewForm';

interface MultiStepFormProps {
  currentStep: number;
  formData: FormData;
  onUpdateForm: (data: Partial<FormData>) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  currentStep,
  formData,
  onUpdateForm,
  onNextStep,
  onPrevStep,
  onSubmit,
  isLoading,
}) => {
  const renderStepIndicator = () => {
    const steps = [
      { name: 'Business Info', number: 1 },
      { name: 'Brand Style', number: 2 },
      { name: 'Key Features', number: 3 },
      { name: 'Review', number: 4 },
    ];

    return (
      <div className="mb-8">
        <div className="hidden sm:flex items-center justify-between">
          {steps.map((step, i) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    i < currentStep
                      ? 'bg-blue-600 text-white'
                      : i === currentStep
                      ? 'bg-blue-100 border-2 border-blue-600 text-blue-600 dark:bg-blue-900 dark:border-blue-500'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300'
                  }`}
                >
                  {i < currentStep ? (
                    '✓'
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={`text-xs font-medium ${
                    i === currentStep
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`flex-1 h-px mx-2 ${
                    i < currentStep
                      ? 'bg-blue-600 dark:bg-blue-500'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Mobile version */}
        <div className="sm:hidden">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Step {currentStep + 1} of {steps.length}
          </p>
          <h2 className="text-lg font-semibold mt-1">
            {steps[currentStep].name}
          </h2>
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BusinessInfoForm
            formData={formData}
            onUpdate={onUpdateForm}
            onNext={onNextStep}
          />
        );
      case 1:
        return (
          <BrandStyleForm
            formData={formData}
            onUpdate={onUpdateForm}
            onNext={onNextStep}
            onBack={onPrevStep}
          />
        );
      case 2:
        return (
          <KeyFeaturesForm
            formData={formData}
            onUpdate={onUpdateForm}
            onNext={onNextStep}
            onBack={onPrevStep}
          />
        );
      case 3:
        return (
          <ReviewForm
            formData={formData}
            onBack={onPrevStep}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {renderStepIndicator()}
      {renderStep()}
    </div>
  );
};

export default MultiStepForm;