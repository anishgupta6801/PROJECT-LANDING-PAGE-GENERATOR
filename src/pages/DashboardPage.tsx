import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { LandingPage } from '../types';
import { Plus, Edit, Trash2, ExternalLink, Calendar } from 'lucide-react';
import { formatDate } from '../lib/utils';

const DashboardPage: React.FC = () => {
  const [savedPages, setSavedPages] = useState<LandingPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSavedPages = async () => {
      try {
        setIsLoading(true);
        
        // This would be a real API call in production
        const response = await fetch('/api/pages');
        
        if (!response.ok) {
          throw new Error('Failed to fetch saved pages');
        }
        
        const data = await response.json();
        setSavedPages(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSavedPages();
  }, []);

  const handleDeletePage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;
    
    try {
      // This would be a real API call in production
      const response = await fetch(`/api/pages/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete page');
      }
      
      // Update the local state
      setSavedPages(savedPages.filter(page => page.id !== id));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  // Temporary demo data for UI development
  const demoPages: LandingPage[] = [
    {
      id: '1',
      title: 'TechCorp Landing Page',
      createdAt: new Date(2023, 5, 15),
      updatedAt: new Date(2023, 5, 20),
      formData: {
        businessName: 'TechCorp',
        industry: 'technology',
        tone: 'professional',
        brandColors: {
          primary: '#3b82f6',
          secondary: '#93c5fd',
        },
        keyFeatures: ['Cloud Integration', 'AI-Powered Analytics', 'Enterprise Security'],
        targetAudience: 'Enterprise businesses',
        vision: 'Empowering businesses with cutting-edge technology solutions',
      },
      sections: [],
      theme: {
        colorScheme: 'light',
        colors: {
          primary: '#3b82f6',
          secondary: '#93c5fd',
          background: '#ffffff',
          text: '#111827',
        },
        fonts: {
          heading: 'Inter, sans-serif',
          body: 'Inter, sans-serif',
        },
      },
      isPublished: true,
      publishedUrl: 'https://techcorp-landing.netlify.app',
    },
    {
      id: '2',
      title: 'HealthPlus Medical Services',
      createdAt: new Date(2023, 6, 10),
      updatedAt: new Date(2023, 6, 12),
      formData: {
        businessName: 'HealthPlus',
        industry: 'healthcare',
        tone: 'caring',
        brandColors: {
          primary: '#10b981',
          secondary: '#6ee7b7',
        },
        keyFeatures: ['24/7 Telemedicine', 'Online Prescription', 'Health Monitoring'],
        targetAudience: 'Health-conscious individuals',
        vision: 'Making quality healthcare accessible to everyone',
      },
      sections: [],
      theme: {
        colorScheme: 'light',
        colors: {
          primary: '#10b981',
          secondary: '#6ee7b7',
          background: '#ffffff',
          text: '#111827',
        },
        fonts: {
          heading: 'Inter, sans-serif',
          body: 'Inter, sans-serif',
        },
      },
      isPublished: false,
      publishedUrl: '',
    },
  ];

  const displayPages = savedPages.length > 0 ? savedPages : demoPages;

  return (
    <div className="flex-1 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Your Landing Pages
          </h1>
          
          <Button asChild variant="primary">
            <Link to="/create" className="flex items-center gap-1">
              <Plus size={16} />
              Create New
            </Link>
          </Button>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 p-4 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}
        
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 dark:border-blue-400"></div>
          </div>
        ) : (
          <>
            {displayPages.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 shadow-sm rounded-lg border border-slate-200 dark:border-slate-800 p-12 text-center">
                <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-4">
                  No Landing Pages Yet
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Create your first landing page to get started.
                </p>
                <Button asChild variant="primary">
                  <Link to="/create" className="flex items-center gap-1">
                    <Plus size={16} />
                    Create Landing Page
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayPages.map((page) => (
                  <div
                    key={page.id}
                    className="bg-white dark:bg-slate-900 shadow-sm rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col"
                  >
                    <div className="h-40 bg-slate-100 dark:bg-slate-800 relative">
                      <div 
                        className="absolute inset-0"
                        style={{ 
                          backgroundColor: page.theme.colors.primary,
                          backgroundImage: `linear-gradient(45deg, ${page.theme.colors.primary}, ${page.theme.colors.secondary || page.theme.colors.primary}90)`,
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <h3 className="text-2xl font-bold text-white px-4 text-center">{page.title}</h3>
                      </div>
                    </div>
                    
                    <div className="p-4 flex-1">
                      <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
                        <Calendar size={14} className="mr-1" />
                        <span>Updated {formatDate(page.updatedAt)}</span>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2 min-w-24">Industry:</span>
                          <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">{page.formData.industry}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2 min-w-24">Brand Colors:</span>
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: page.theme.colors.primary }}
                            ></div>
                            {page.theme.colors.secondary && (
                              <div 
                                className="w-4 h-4 rounded-full" 
                                style={{ backgroundColor: page.theme.colors.secondary }}
                              ></div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-2 min-w-24">Status:</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            page.isPublished 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                            {page.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-slate-200 dark:border-slate-800 p-4 flex justify-between">
                      <Button variant="ghost" size="sm" onClick={() => handleDeletePage(page.id)}>
                        <Trash2 size={16} className="mr-1 text-red-500" />
                        Delete
                      </Button>
                      
                      <div className="flex space-x-2">
                        {page.isPublished && page.publishedUrl && (
                          <Button asChild variant="outline" size="sm">
                            <a href={page.publishedUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink size={16} className="mr-1" />
                              View
                            </a>
                          </Button>
                        )}
                        
                        <Button asChild variant="primary" size="sm">
                          <Link to={`/editor/${page.id}`}>
                            <Edit size={16} className="mr-1" />
                            Edit
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;