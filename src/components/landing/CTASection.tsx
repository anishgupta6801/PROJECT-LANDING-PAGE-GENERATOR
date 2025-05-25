import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { CTASection as CTASectionType } from '../../types';

interface CTASectionProps {
  data: CTASectionType;
  isEditing?: boolean;
  onEdit?: (data: Partial<CTASectionType>) => void;
}

const CTASection: React.FC<CTASectionProps> = ({
  data,
  isEditing = false,
  onEdit,
}) => {
  // Default background if none provided
  const backgroundImage = data.backgroundImage || 'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <section className="py-16 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${backgroundImage})`,
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isEditing && onEdit ? (
              <input
                value={data.title}
                onChange={(e) => onEdit({ title: e.target.value })}
                className="w-full text-center bg-transparent border-b border-white/30 py-2 focus:outline-none focus:border-blue-400 text-white"
              />
            ) : (
              data.title
            )}
          </h2>
          
          {data.subtitle && (
            <p className="text-xl text-white/80 mb-8">
              {isEditing && onEdit ? (
                <input
                  value={data.subtitle}
                  onChange={(e) => onEdit({ subtitle: e.target.value })}
                  className="w-full text-center bg-transparent border-b border-white/30 py-2 focus:outline-none focus:border-blue-400 text-white/80"
                />
              ) : (
                data.subtitle
              )}
            </p>
          )}
          
          {isEditing && onEdit ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <input
                value={data.buttonText}
                onChange={(e) => onEdit({ buttonText: e.target.value })}
                className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-md p-2"
                placeholder="Button text"
              />
              <input
                value={data.buttonLink}
                onChange={(e) => onEdit({ buttonLink: e.target.value })}
                className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-md p-2"
                placeholder="Button link (e.g., #contact)"
              />
            </div>
          ) : (
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              {data.buttonText}
            </Button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;