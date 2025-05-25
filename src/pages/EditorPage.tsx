import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import LandingPagePreview from '../components/editor/LandingPagePreview';
import SectionControls from '../components/editor/SectionControls';
import ThemeControls from '../components/editor/ThemeControls';
import useLandingPageStore from '../store/landingPageStore';

const EditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentPage,
    isLoading,
    error,
    isDarkMode,
    updateSection,
    addSection,
    removeSection,
    reorderSections,
    toggleDarkMode,
    savePage,
    exportToHTML,
    deployToNetlify
  } = useLandingPageStore();

  useEffect(() => {
    // If no page is loaded, redirect to create page
    if (!currentPage) {
      navigate('/create');
    }
  }, [currentPage, navigate]);

  if (!currentPage) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Loading your page...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 p-4 rounded-lg max-w-lg">
          <h3 className="text-lg font-medium mb-2">Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
          Editing: {currentPage.title}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Tabs defaultValue="sections">
              <TabsList className="w-full">
                <TabsTrigger value="sections" className="flex-1">Sections</TabsTrigger>
                <TabsTrigger value="theme" className="flex-1">Theme</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sections" className="mt-4">
                <SectionControls
                  sections={currentPage.sections}
                  onAddSection={addSection}
                  onRemoveSection={removeSection}
                  onReorderSections={reorderSections}
                />
              </TabsContent>
              
              <TabsContent value="theme" className="mt-4">
                <ThemeControls
                  page={currentPage}
                  isDarkMode={isDarkMode}
                  onToggleDarkMode={toggleDarkMode}
                  onSave={savePage}
                  onExport={exportToHTML}
                  onDeploy={deployToNetlify}
                  isLoading={isLoading}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Preview */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
              <h2 className="text-lg font-medium">Preview</h2>
              <div className="flex items-center space-x-2">
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                </div>
              </div>
            </div>
            
            <div className="overflow-auto max-h-[calc(100vh-13rem)] rounded-b-lg">
              <LandingPagePreview
                page={currentPage}
                isEditing={true}
                onUpdateSection={updateSection}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;