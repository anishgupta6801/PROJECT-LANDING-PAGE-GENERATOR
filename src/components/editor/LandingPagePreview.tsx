import React from 'react';
import { LandingPage, LandingPageSection } from '../../types';
import HeroSection from '../landing/HeroSection';
import AboutSection from '../landing/AboutSection';
import FeaturesSection from '../landing/FeaturesSection';
import TestimonialsSection from '../landing/TestimonialsSection';
import CTASection from '../landing/CTASection';

interface LandingPagePreviewProps {
  page: LandingPage;
  isEditing?: boolean;
  onUpdateSection?: (sectionId: string, data: any) => void;
}

const LandingPagePreview: React.FC<LandingPagePreviewProps> = ({
  page,
  isEditing = false,
  onUpdateSection,
}) => {
  // Sort sections by order
  const sortedSections = [...page.sections].sort((a, b) => a.order - b.order);

  const handleSectionUpdate = (sectionId: string, data: any) => {
    if (onUpdateSection) {
      onUpdateSection(sectionId, { content: { ...data } });
    }
  };

  const handleFeatureUpdate = (sectionId: string, featureId: string, data: any) => {
    if (onUpdateSection) {
      const section = page.sections.find(s => s.id === sectionId);
      if (section && section.type === 'features') {
        const updatedFeatures = section.content.features.map((feature: any) => 
          feature.id === featureId ? { ...feature, ...data } : feature
        );
        
        onUpdateSection(sectionId, { 
          content: { 
            ...section.content, 
            features: updatedFeatures 
          } 
        });
      }
    }
  };

  const handleTestimonialUpdate = (sectionId: string, testimonialId: string, data: any) => {
    if (onUpdateSection) {
      const section = page.sections.find(s => s.id === sectionId);
      if (section && section.type === 'testimonials') {
        const updatedTestimonials = section.content.testimonials.map((testimonial: any) => 
          testimonial.id === testimonialId ? { ...testimonial, ...data } : testimonial
        );
        
        onUpdateSection(sectionId, { 
          content: { 
            ...section.content, 
            testimonials: updatedTestimonials 
          } 
        });
      }
    }
  };

  // Apply theme styles
  const themeStyles = {
    backgroundColor: page.theme.colors.background,
    color: page.theme.colors.text,
    fontFamily: page.theme.fonts.body,
  };

  return (
    <div style={themeStyles} className="min-h-screen">
      {sortedSections.map((section) => {
        switch (section.type) {
          case 'hero':
            return (
              <HeroSection
                key={section.id}
                data={section.content}
                isEditing={isEditing}
                onEdit={isEditing ? (data) => handleSectionUpdate(section.id, data) : undefined}
              />
            );
          case 'about':
            return (
              <AboutSection
                key={section.id}
                data={section.content}
                isEditing={isEditing}
                onEdit={isEditing ? (data) => handleSectionUpdate(section.id, data) : undefined}
              />
            );
          case 'features':
            return (
              <FeaturesSection
                key={section.id}
                data={section.content}
                isEditing={isEditing}
                onEdit={isEditing ? (data) => handleSectionUpdate(section.id, data) : undefined}
                onEditFeature={isEditing ? (featureId, data) => handleFeatureUpdate(section.id, featureId, data) : undefined}
              />
            );
          case 'testimonials':
            return (
              <TestimonialsSection
                key={section.id}
                data={section.content}
                isEditing={isEditing}
                onEdit={isEditing ? (data) => handleSectionUpdate(section.id, data) : undefined}
                onEditTestimonial={isEditing ? (testimonialId, data) => handleTestimonialUpdate(section.id, testimonialId, data) : undefined}
              />
            );
          case 'cta':
            return (
              <CTASection
                key={section.id}
                data={section.content}
                isEditing={isEditing}
                onEdit={isEditing ? (data) => handleSectionUpdate(section.id, data) : undefined}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default LandingPagePreview;