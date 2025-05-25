import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  ArrowUp, 
  ArrowDown, 
  Trash2, 
  Plus, 
  Settings, 
  X, 
  Code
} from 'lucide-react';
import { LandingPageSection } from '../../types';

interface SectionControlsProps {
  sections: LandingPageSection[];
  onAddSection: (type: string, prompt?: string) => Promise<void>;
  onRemoveSection: (id: string) => void;
  onReorderSections: (orderedIds: string[]) => void;
}

const SectionControls: React.FC<SectionControlsProps> = ({
  sections,
  onAddSection,
  onRemoveSection,
  onReorderSections,
}) => {
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionType, setNewSectionType] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    
    const newOrder = [...sortedSections];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    
    onReorderSections(newOrder.map(section => section.id));
  };

  const handleMoveDown = (index: number) => {
    if (index === sortedSections.length - 1) return;
    
    const newOrder = [...sortedSections];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    
    onReorderSections(newOrder.map(section => section.id));
  };

  const handleAddSection = async () => {
    if (!newSectionType) return;
    
    setIsLoading(true);
    
    try {
      await onAddSection(newSectionType, customPrompt);
      setIsAddingSection(false);
      setNewSectionType('');
      setCustomPrompt('');
    } catch (error) {
      console.error('Failed to add section:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sectionTypeOptions = [
    { value: 'hero', label: 'Hero Section' },
    { value: 'about', label: 'About Section' },
    { value: 'features', label: 'Features Section' },
    { value: 'testimonials', label: 'Testimonials Section' },
    { value: 'cta', label: 'Call to Action' },
    { value: 'custom', label: 'Custom Section (AI Generated)' },
  ];

  return (
    <div className="space-y-4 p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Page Sections</h3>
        <Button 
          size="sm"
          variant="outline"
          onClick={() => setIsAddingSection(true)}
          className="flex items-center gap-1"
        >
          <Plus size={16} />
          Add Section
        </Button>
      </div>

      {sortedSections.length === 0 && (
        <div className="text-center py-8 text-slate-500 dark:text-slate-400">
          <p>No sections yet. Add a section to get started.</p>
        </div>
      )}

      <div className="space-y-2">
        {sortedSections.map((section, index) => (
          <motion.div 
            key={section.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-md"
          >
            <div>
              <span className="font-medium">{section.title}</span>
              <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                ({section.type})
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => handleMoveUp(index)}
                disabled={index === 0}
                className="h-8 w-8 p-0"
              >
                <ArrowUp size={16} />
              </Button>
              
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => handleMoveDown(index)}
                disabled={index === sortedSections.length - 1}
                className="h-8 w-8 p-0"
              >
                <ArrowDown size={16} />
              </Button>
              
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => onRemoveSection(section.id)}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>

      {isAddingSection && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 p-4 border border-slate-200 dark:border-slate-700 rounded-md bg-slate-50 dark:bg-slate-800"
        >
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Add New Section</h4>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => setIsAddingSection(false)}
              className="h-6 w-6 p-0"
            >
              <X size={16} />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {sectionTypeOptions.map(option => (
                <Button
                  key={option.value}
                  variant={newSectionType === option.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setNewSectionType(option.value)}
                  className="justify-start"
                >
                  {option.label}
                </Button>
              ))}
            </div>
            
            {newSectionType === 'custom' && (
              <div>
                <label className="block text-sm font-medium mb-1">
                  What kind of section do you want to add?
                </label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="E.g., 'Add a pricing table with 3 tiers' or 'Add a FAQ section with 5 common questions'"
                  className="w-full p-2 border border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-900"
                  rows={3}
                />
              </div>
            )}
            
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsAddingSection(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                size="sm"
                onClick={handleAddSection}
                disabled={!newSectionType || (newSectionType === 'custom' && !customPrompt) || isLoading}
              >
                {isLoading ? 'Adding...' : 'Add Section'}
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SectionControls;