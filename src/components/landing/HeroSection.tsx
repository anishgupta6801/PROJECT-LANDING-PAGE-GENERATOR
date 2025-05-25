import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { HeroSection as HeroSectionType } from '../../types';

interface HeroSectionProps {
  data: HeroSectionType;
  isEditing?: boolean;
  onEdit?: (data: Partial<HeroSectionType>) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  isEditing = false,
  onEdit,
}) => {
  // Default background if none provided
  const backgroundImage = data.backgroundImage || 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20 z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto"
        >
          {isEditing && onEdit ? (
            <textarea
              value={data.headline}
              onChange={(e) => onEdit({ headline: e.target.value })}
              className="w-full bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-md p-2"
              rows={3}
            />
          ) : (
            data.headline
          )}
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
        >
          {isEditing && onEdit ? (
            <textarea
              value={data.subheadline}
              onChange={(e) => onEdit({ subheadline: e.target.value })}
              className="w-full bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-md p-2"
              rows={2}
            />
          ) : (
            data.subheadline
          )}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {isEditing && onEdit ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <input
                value={data.ctaText}
                onChange={(e) => onEdit({ ctaText: e.target.value })}
                className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-md p-2"
                placeholder="Button text"
              />
              <input
                value={data.ctaLink}
                onChange={(e) => onEdit({ ctaLink: e.target.value })}
                className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-md p-2"
                placeholder="Button link (e.g., #contact)"
              />
            </div>
          ) : (
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              {data.ctaText}
            </Button>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HeroSection;