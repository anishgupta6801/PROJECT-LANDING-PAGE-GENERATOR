import React from 'react';
import { motion } from 'framer-motion';
import { TestimonialsSection as TestimonialsSectionType, Testimonial } from '../../types';

interface TestimonialsSectionProps {
  data: TestimonialsSectionType;
  isEditing?: boolean;
  onEdit?: (data: Partial<TestimonialsSectionType>) => void;
  onEditTestimonial?: (testimonialId: string, data: Partial<Testimonial>) => void;
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  data,
  isEditing = false,
  onEdit,
  onEditTestimonial,
}) => {
  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            {isEditing && onEdit ? (
              <input
                value={data.title}
                onChange={(e) => onEdit({ title: e.target.value })}
                className="w-full text-center bg-transparent border-b border-slate-300 dark:border-slate-700 py-2 focus:outline-none focus:border-blue-500"
              />
            ) : (
              data.title
            )}
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <svg className="w-8 h-8 text-slate-300 dark:text-slate-600" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                
                <div className="flex-grow">
                  <p className="text-slate-600 dark:text-slate-300 italic mb-6">
                    {isEditing && onEditTestimonial ? (
                      <textarea
                        value={testimonial.quote}
                        onChange={(e) => onEditTestimonial(testimonial.id, { quote: e.target.value })}
                        className="w-full bg-transparent border border-slate-300 dark:border-slate-700 rounded-md p-2 focus:outline-none focus:border-blue-500"
                        rows={4}
                      />
                    ) : (
                      `"${testimonial.quote}"`
                    )}
                  </p>
                </div>
                
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      {testimonial.avatar ? (
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500 dark:text-slate-400">
                          {testimonial.author.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">
                      {isEditing && onEditTestimonial ? (
                        <input
                          value={testimonial.author}
                          onChange={(e) => onEditTestimonial(testimonial.id, { author: e.target.value })}
                          className="bg-transparent border-b border-slate-300 dark:border-slate-700 py-1 focus:outline-none focus:border-blue-500"
                        />
                      ) : (
                        testimonial.author
                      )}
                    </h4>
                    {(testimonial.role || testimonial.company) && (
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {isEditing && onEditTestimonial ? (
                          <input
                            value={`${testimonial.role || ''} ${testimonial.company ? 'at ' + testimonial.company : ''}`}
                            onChange={(e) => {
                              const value = e.target.value;
                              const atIndex = value.toLowerCase().indexOf(' at ');
                              
                              if (atIndex !== -1) {
                                const role = value.substring(0, atIndex).trim();
                                const company = value.substring(atIndex + 4).trim();
                                onEditTestimonial(testimonial.id, { role, company });
                              } else {
                                onEditTestimonial(testimonial.id, { role: value, company: '' });
                              }
                            }}
                            className="bg-transparent border-b border-slate-300 dark:border-slate-700 py-1 focus:outline-none focus:border-blue-500"
                          />
                        ) : (
                          <>
                            {testimonial.role}
                            {testimonial.role && testimonial.company && ' at '}
                            {testimonial.company}
                          </>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;