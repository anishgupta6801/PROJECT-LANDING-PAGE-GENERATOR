import React from 'react';
import { motion } from 'framer-motion';
import { AboutSection as AboutSectionType } from '../../types';

interface AboutSectionProps {
  data: AboutSectionType;
  isEditing?: boolean;
  onEdit?: (data: Partial<AboutSectionType>) => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  data,
  isEditing = false,
  onEdit,
}) => {
  // Default image if none provided
  const image = data.image || 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 right-4 bottom-4 bg-slate-100 dark:bg-slate-800 rounded-lg -z-10"></div>
              <img 
                src={image} 
                alt="About us" 
                className="rounded-lg shadow-lg w-full object-cover h-[400px]"
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              {isEditing && onEdit ? (
                <input
                  value={data.title}
                  onChange={(e) => onEdit({ title: e.target.value })}
                  className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 py-2 focus:outline-none focus:border-blue-500"
                />
              ) : (
                data.title
              )}
            </h2>
            
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {isEditing && onEdit ? (
                <textarea
                  value={data.content}
                  onChange={(e) => onEdit({ content: e.target.value })}
                  className="w-full bg-transparent border border-slate-300 dark:border-slate-700 rounded-md p-3 min-h-[200px] focus:outline-none focus:border-blue-500"
                  rows={8}
                />
              ) : (
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {data.content}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;