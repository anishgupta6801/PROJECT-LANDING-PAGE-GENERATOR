import React from 'react';
import { motion } from 'framer-motion';
import { FeaturesSection as FeaturesSectionType, Feature } from '../../types';
import * as Icons from 'lucide-react';

interface FeaturesSectionProps {
  data: FeaturesSectionType;
  isEditing?: boolean;
  onEdit?: (data: Partial<FeaturesSectionType>) => void;
  onEditFeature?: (featureId: string, data: Partial<Feature>) => void;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  data,
  isEditing = false,
  onEdit,
  onEditFeature,
}) => {
  const getIconComponent = (iconName: string = 'Star') => {
    // Convert to capitalized format that matches Lucide icon names
    const formattedName = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    return (Icons as any)[formattedName] || Icons.Star;
  };

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold text-slate-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {isEditing && onEdit ? (
              <input
                value={data.title}
                onChange={(e) => onEdit({ title: e.target.value })}
                className="w-full text-center bg-transparent border-b border-slate-300 dark:border-slate-700 py-2 focus:outline-none focus:border-blue-500"
              />
            ) : (
              data.title
            )}
          </motion.h2>
          
          {data.subtitle && (
            <motion.p 
              className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {isEditing && onEdit ? (
                <input
                  value={data.subtitle}
                  onChange={(e) => onEdit({ subtitle: e.target.value })}
                  className="w-full text-center bg-transparent border-b border-slate-300 dark:border-slate-700 py-2 focus:outline-none focus:border-blue-500"
                />
              ) : (
                data.subtitle
              )}
            </motion.p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.features.map((feature, index) => {
            const IconComponent = getIconComponent(feature.icon);
            
            return (
              <motion.div 
                key={feature.id}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 transition-all hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  <IconComponent size={24} />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                  {isEditing && onEditFeature ? (
                    <input
                      value={feature.title}
                      onChange={(e) => onEditFeature(feature.id, { title: e.target.value })}
                      className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 py-1 focus:outline-none focus:border-blue-500"
                    />
                  ) : (
                    feature.title
                  )}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-300">
                  {isEditing && onEditFeature ? (
                    <textarea
                      value={feature.description}
                      onChange={(e) => onEditFeature(feature.id, { description: e.target.value })}
                      className="w-full bg-transparent border border-slate-300 dark:border-slate-700 rounded-md p-2 focus:outline-none focus:border-blue-500"
                      rows={4}
                    />
                  ) : (
                    feature.description
                  )}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;