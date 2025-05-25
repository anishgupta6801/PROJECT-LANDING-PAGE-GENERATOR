import { create } from 'zustand';
import { 
  FormData, 
  LandingPage, 
  LandingPageSection 
} from '../types';

interface LandingPageState {
  currentPage: LandingPage | null;
  savedPages: LandingPage[];
  isLoading: boolean;
  error: string | null;
  currentStep: number;
  formData: FormData;
  isDarkMode: boolean;
  
  // Actions
  setFormData: (data: Partial<FormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  generatePage: () => Promise<void>;
  savePage: () => Promise<void>;
  loadPage: (id: string) => Promise<void>;
  deletePage: (id: string) => Promise<void>;
  updateSection: (sectionId: string, data: Partial<LandingPageSection>) => void;
  addSection: (sectionType: string, prompt?: string) => Promise<void>;
  removeSection: (sectionId: string) => void;
  reorderSections: (orderedIds: string[]) => void;
  toggleDarkMode: () => void;
  exportToHTML: () => Promise<string>;
  deployToNetlify: () => Promise<string>;
  resetForm: () => void;
}

// Initial form data
const initialFormData: FormData = {
  businessName: '',
  industry: '',
  tone: 'professional',
  brandColors: {
    primary: '#3b82f6',
  },
  keyFeatures: [''],
  targetAudience: '',
  vision: '',
};

// Create the store
const useLandingPageStore = create<LandingPageState>((set, get) => ({
  currentPage: null,
  savedPages: [],
  isLoading: false,
  error: null,
  currentStep: 0,
  formData: initialFormData,
  isDarkMode: false,

  setFormData: (data) => {
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    }));
  },

  nextStep: () => {
    set((state) => ({
      currentStep: state.currentStep + 1,
    }));
  },

  prevStep: () => {
    set((state) => ({
      currentStep: Math.max(0, state.currentStep - 1),
    }));
  },

  setStep: (step) => {
    set({ currentStep: step });
  },

  generatePage: async () => {
    const { formData } = get();
    set({ isLoading: true, error: null });

    try {
      // This is where we would call our API to generate the page
      // For now, we'll mock it
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate landing page');
      }

      const data = await response.json();
      
      // Update the store with the generated page
      set({
        currentPage: data.page,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },

  savePage: async () => {
    const { currentPage, formData } = get();
    set({ isLoading: true, error: null });

    try {
      // Here we would save to our backend
      const pageToSave = currentPage || {
        id: '',
        title: formData.businessName,
        createdAt: new Date(),
        updatedAt: new Date(),
        formData,
        sections: [],
        theme: {
          colorScheme: get().isDarkMode ? 'dark' : 'light',
          colors: {
            primary: formData.brandColors.primary,
            secondary: formData.brandColors.secondary,
            background: get().isDarkMode ? '#121212' : '#ffffff',
            text: get().isDarkMode ? '#ffffff' : '#111827',
          },
          fonts: {
            heading: 'Inter, sans-serif',
            body: 'Inter, sans-serif',
          }
        },
        isPublished: false,
      };

      const response = await fetch('/api/pages', {
        method: currentPage ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pageToSave),
      });

      if (!response.ok) {
        throw new Error('Failed to save landing page');
      }

      const savedPage = await response.json();
      
      // Update the store
      set((state) => ({
        currentPage: savedPage,
        savedPages: currentPage
          ? state.savedPages.map(p => p.id === savedPage.id ? savedPage : p)
          : [...state.savedPages, savedPage],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },

  loadPage: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(`/api/pages/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to load landing page');
      }

      const page = await response.json();
      
      set({
        currentPage: page,
        formData: page.formData,
        isLoading: false,
        isDarkMode: page.theme.colorScheme === 'dark',
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },

  deletePage: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch(`/api/pages/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete landing page');
      }

      // Update the store
      set((state) => ({
        savedPages: state.savedPages.filter(p => p.id !== id),
        currentPage: state.currentPage?.id === id ? null : state.currentPage,
        isLoading: false,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },

  updateSection: (sectionId, data) => {
    set((state) => {
      if (!state.currentPage) return state;

      const updatedSections = state.currentPage.sections.map(section => 
        section.id === sectionId ? { ...section, ...data } : section
      );

      return {
        currentPage: {
          ...state.currentPage,
          sections: updatedSections,
          updatedAt: new Date(),
        },
      };
    });
  },

  addSection: async (sectionType, prompt = '') => {
    const { formData, currentPage } = get();
    set({ isLoading: true, error: null });

    try {
      // This would call the API to generate the section
      const response = await fetch('/api/generate/section', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: sectionType,
          formData,
          prompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate ${sectionType} section`);
      }

      const data = await response.json();
      
      // Update the store with the new section
      set((state) => {
        if (!state.currentPage) return state;

        const newOrder = Math.max(0, ...state.currentPage.sections.map(s => s.order)) + 1;

        return {
          currentPage: {
            ...state.currentPage,
            sections: [
              ...state.currentPage.sections,
              {
                ...data.section,
                order: newOrder,
              },
            ],
            updatedAt: new Date(),
          },
          isLoading: false,
        };
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },

  removeSection: (sectionId) => {
    set((state) => {
      if (!state.currentPage) return state;

      return {
        currentPage: {
          ...state.currentPage,
          sections: state.currentPage.sections.filter(s => s.id !== sectionId),
          updatedAt: new Date(),
        },
      };
    });
  },

  reorderSections: (orderedIds) => {
    set((state) => {
      if (!state.currentPage) return state;

      // Create a map of id to new order
      const orderMap = new Map(orderedIds.map((id, index) => [id, index]));

      // Update the order of each section
      const updatedSections = state.currentPage.sections.map(section => ({
        ...section,
        order: orderMap.has(section.id) ? orderMap.get(section.id)! : section.order,
      }));

      return {
        currentPage: {
          ...state.currentPage,
          sections: updatedSections,
          updatedAt: new Date(),
        },
      };
    });
  },

  toggleDarkMode: () => {
    set((state) => {
      const isDarkMode = !state.isDarkMode;
      
      // Also update the current page theme if it exists
      if (state.currentPage) {
        return {
          isDarkMode,
          currentPage: {
            ...state.currentPage,
            theme: {
              ...state.currentPage.theme,
              colorScheme: isDarkMode ? 'dark' : 'light',
              colors: {
                ...state.currentPage.theme.colors,
                background: isDarkMode ? '#121212' : '#ffffff',
                text: isDarkMode ? '#ffffff' : '#111827',
              },
            },
          },
        };
      }
      
      return { isDarkMode };
    });
  },

  exportToHTML: async () => {
    const { currentPage } = get();
    set({ isLoading: true, error: null });

    try {
      if (!currentPage) {
        throw new Error('No page to export');
      }

      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentPage),
      });

      if (!response.ok) {
        throw new Error('Failed to export landing page');
      }

      const data = await response.json();
      set({ isLoading: false });
      
      return data.downloadUrl;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
      return '';
    }
  },

  deployToNetlify: async () => {
    const { currentPage } = get();
    set({ isLoading: true, error: null });

    try {
      if (!currentPage) {
        throw new Error('No page to deploy');
      }

      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentPage),
      });

      if (!response.ok) {
        throw new Error('Failed to deploy landing page');
      }

      const data = await response.json();
      
      // Update the current page with the published URL
      set((state) => ({
        currentPage: state.currentPage
          ? {
              ...state.currentPage,
              isPublished: true,
              publishedUrl: data.url,
              updatedAt: new Date(),
            }
          : null,
        isLoading: false,
      }));
      
      return data.url;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
      return '';
    }
  },

  resetForm: () => {
    set({
      formData: initialFormData,
      currentStep: 0,
      currentPage: null,
      error: null,
    });
  },
}));

export default useLandingPageStore;