export interface FormData {
  businessName: string;
  industry: string;
  tone: string;
  brandColors: {
    primary: string;
    secondary?: string;
  };
  keyFeatures: string[];
  targetAudience: string;
  vision: string;
}

export interface LandingPageSection {
  id: string;
  type: "hero" | "about" | "features" | "testimonials" | "cta" | "pricing" | "custom";
  title: string;
  content: any; // This will vary based on section type
  order: number;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
}

export interface HeroSection {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
}

export interface AboutSection {
  title: string;
  content: string;
  image?: string;
}

export interface FeaturesSection {
  title: string;
  subtitle?: string;
  features: Feature[];
}

export interface TestimonialsSection {
  title: string;
  testimonials: Testimonial[];
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

export interface PricingSection {
  title: string;
  subtitle?: string;
  tiers: PricingTier[];
}

export interface CTASection {
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage?: string;
}

export interface CustomSection {
  title: string;
  content: string;
  layout: "text-only" | "text-image" | "custom-html";
  image?: string;
  customHtml?: string;
}

export interface LandingPage {
  id: string;
  title: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
  formData: FormData;
  sections: LandingPageSection[];
  theme: {
    colorScheme: "light" | "dark";
    colors: {
      primary: string;
      secondary?: string;
      background: string;
      text: string;
      accent?: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
  };
  isPublished: boolean;
  publishedUrl?: string;
}

export interface AIPromptResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface AIGenerationParams {
  type: string;
  formData: FormData;
  additionalInstructions?: string;
}