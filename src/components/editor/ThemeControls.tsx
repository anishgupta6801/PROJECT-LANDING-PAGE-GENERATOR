import React from 'react';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';
import { Moon, Sun, Download, ExternalLink } from 'lucide-react';
import { LandingPage } from '../../types';

interface ThemeControlsProps {
  page: LandingPage;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onSave: () => Promise<void>;
  onExport: () => Promise<string>;
  onDeploy: () => Promise<string>;
  isLoading: boolean;
}

const ThemeControls: React.FC<ThemeControlsProps> = ({
  page,
  isDarkMode,
  onToggleDarkMode,
  onSave,
  onExport,
  onDeploy,
  isLoading,
}) => {
  return (
    <div className="space-y-6 p-4 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
      <div>
        <h3 className="text-lg font-medium mb-4">Theme Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Toggle between light and dark theme
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Sun size={18} className="text-slate-600 dark:text-slate-400" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={onToggleDarkMode}
              />
              <Moon size={18} className="text-slate-600 dark:text-slate-400" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="primary-color">Primary Color</Label>
            <div className="flex items-center space-x-2 mt-1">
              <input
                type="color"
                id="primary-color"
                value={page.theme.colors.primary}
                readOnly
                disabled
                className="h-10 w-12 border-0 rounded-md cursor-not-allowed"
              />
              <span className="text-sm">{page.theme.colors.primary}</span>
            </div>
          </div>
          
          {page.theme.colors.secondary && (
            <div>
              <Label htmlFor="secondary-color">Secondary Color</Label>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="color"
                  id="secondary-color"
                  value={page.theme.colors.secondary}
                  readOnly
                  disabled
                  className="h-10 w-12 border-0 rounded-md cursor-not-allowed"
                />
                <span className="text-sm">{page.theme.colors.secondary}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-medium mb-4">Actions</h3>
        
        <div className="space-y-3">
          <Button 
            onClick={onSave} 
            disabled={isLoading}
            className="w-full justify-start"
          >
            {isLoading ? 'Saving...' : 'Save Landing Page'}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onExport} 
            disabled={isLoading}
            className="w-full justify-start"
          >
            <Download size={16} className="mr-2" />
            Export to HTML
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onDeploy} 
            disabled={isLoading}
            className="w-full justify-start"
          >
            <ExternalLink size={16} className="mr-2" />
            Deploy to Netlify
          </Button>
        </div>
        
        {page.publishedUrl && (
          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-md">
            <p className="text-sm font-medium mb-1">Published URL:</p>
            <a 
              href={page.publishedUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all"
            >
              {page.publishedUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeControls;