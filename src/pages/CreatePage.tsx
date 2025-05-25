import React from 'react';
import { useNavigate } from 'react-router-dom';
import MultiStepForm from '../components/form/MultiStepForm';
import useLandingPageStore from '../store/landingPageStore';

const CreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    formData, 
    currentStep, 
    isLoading, 
    setFormData, 
    nextStep, 
    prevStep, 
    generatePage 
  } = useLandingPageStore();

  const handleFormSubmit = async () => {
    try {
      await generatePage();
      navigate('/editor');
    } catch (error) {
      console.error('Error generating page:', error);
    }
  };

  return (
    <div className="flex-1 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              Create Your Landing Page
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Answer a few questions about your business and we'll generate a professional landing page for you.
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-900 shadow-sm rounded-lg border border-slate-200 dark:border-slate-800 p-6">
            <MultiStepForm
              currentStep={currentStep}
              formData={formData}
              onUpdateForm={setFormData}
              onNextStep={nextStep}
              onPrevStep={prevStep}
              onSubmit={handleFormSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;