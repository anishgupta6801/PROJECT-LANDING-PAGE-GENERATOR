import React from 'react';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { FormData } from '../../types';

interface BrandStyleFormProps {
  formData: FormData;
  onUpdate: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const BrandStyleForm: React.FC<BrandStyleFormProps> = ({
  formData,
  onUpdate,
  onNext,
  onBack,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const handlePrimaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      brandColors: {
        ...formData.brandColors,
        primary: e.target.value,
      },
    });
  };

  const handleSecondaryColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({
      brandColors: {
        ...formData.brandColors,
        secondary: e.target.value,
      },
    });
  };

  // Predefined color palettes
  const colorPalettes = [
    { name: 'Modern Blue', primary: '#3b82f6', secondary: '#93c5fd' },
    { name: 'Vibrant Green', primary: '#10b981', secondary: '#6ee7b7' },
    { name: 'Elegant Purple', primary: '#8b5cf6', secondary: '#c4b5fd' },
    { name: 'Business Blue', primary: '#1e40af', secondary: '#60a5fa' },
    { name: 'Creative Orange', primary: '#f97316', secondary: '#fdba74' },
    { name: 'Tech Teal', primary: '#0d9488', secondary: '#5eead4' },
  ];

  const selectPalette = (primary: string, secondary: string) => {
    onUpdate({
      brandColors: {
        primary,
        secondary,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="primaryColor">Primary Brand Color</Label>
          <div className="flex items-center space-x-2 mt-1">
            <input
              type="color"
              id="primaryColor"
              value={formData.brandColors.primary}
              onChange={handlePrimaryColorChange}
              className="h-10 w-12 border-0 rounded-md cursor-pointer"
            />
            <input
              type="text"
              value={formData.brandColors.primary}
              onChange={handlePrimaryColorChange}
              className="flex h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="secondaryColor">Secondary Brand Color (optional)</Label>
          <div className="flex items-center space-x-2 mt-1">
            <input
              type="color"
              id="secondaryColor"
              value={formData.brandColors.secondary || '#ffffff'}
              onChange={handleSecondaryColorChange}
              className="h-10 w-12 border-0 rounded-md cursor-pointer"
            />
            <input
              type="text"
              value={formData.brandColors.secondary || ''}
              onChange={handleSecondaryColorChange}
              placeholder="Optional secondary color"
              className="flex h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
            />
          </div>
        </div>

        <div className="mt-6">
          <Label>Predefined Color Palettes</Label>
          <div className="grid grid-cols-2 gap-3 mt-2 sm:grid-cols-3">
            {colorPalettes.map((palette) => (
              <button
                key={palette.name}
                type="button"
                onClick={() => selectPalette(palette.primary, palette.secondary)}
                className="flex flex-col items-center p-3 border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex space-x-1 mb-2">
                  <div
                    className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-700"
                    style={{ backgroundColor: palette.primary }}
                  />
                  <div
                    className="w-6 h-6 rounded-full border border-slate-200 dark:border-slate-700"
                    style={{ backgroundColor: palette.secondary }}
                  />
                </div>
                <span className="text-xs font-medium">{palette.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" variant="primary">
          Next
        </Button>
      </div>
    </form>
  );
};

export default BrandStyleForm;