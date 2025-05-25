import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Initialize OpenAI (if API key is provided)
let openai;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Function to generate mock data for development without OpenAI
const generateMockData = (formData, type = 'page') => {
  const { businessName, industry, tone, keyFeatures } = formData;

  // Create a mock landing page
  if (type === 'page') {
    return {
      id: uuidv4(),
      title: `${businessName} Landing Page`,
      createdAt: new Date(),
      updatedAt: new Date(),
      formData,
      sections: [
        {
          id: uuidv4(),
          type: 'hero',
          title: 'Hero Section',
          order: 0,
          content: {
            headline: `Transform Your ${industry} with ${businessName}`,
            subheadline: `The ${tone} solution designed to help businesses thrive in today's competitive landscape.`,
            ctaText: 'Get Started',
            ctaLink: '#contact',
            backgroundImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          },
        },
        {
          id: uuidv4(),
          type: 'about',
          title: 'About Us',
          order: 1,
          content: {
            title: 'About Us',
            content: `At ${businessName}, we're passionate about delivering exceptional ${industry} solutions that make a difference. Our team of experts works tirelessly to ensure that every client receives personalized service and outstanding results. With years of experience and a commitment to excellence, we've established ourselves as leaders in the ${industry} industry.`,
            image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          },
        },
        {
          id: uuidv4(),
          type: 'features',
          title: 'Features',
          order: 2,
          content: {
            title: 'Our Key Features',
            subtitle: 'Discover what makes us different',
            features: keyFeatures.map((feature, index) => ({
              id: uuidv4(),
              title: feature,
              description: `Our ${feature} solution provides exceptional value by streamlining processes and improving outcomes.`,
              icon: ['Zap', 'Shield', 'BarChart', 'Clock', 'Users'][index % 5],
            })),
          },
        },
        {
          id: uuidv4(),
          type: 'testimonials',
          title: 'Testimonials',
          order: 3,
          content: {
            title: 'What Our Clients Say',
            testimonials: [
              {
                id: uuidv4(),
                quote: `${businessName} has completely transformed our approach to ${industry}. The results speak for themselves.`,
                author: 'Jane Smith',
                role: 'CEO',
                company: 'Acme Inc.',
              },
              {
                id: uuidv4(),
                quote: `Working with ${businessName} has been a game-changer for our business. Highly recommended!`,
                author: 'John Doe',
                role: 'Marketing Director',
                company: 'Global Corp',
              },
              {
                id: uuidv4(),
                quote: `The team at ${businessName} consistently delivers exceptional results. We couldn't be happier.`,
                author: 'Sarah Johnson',
                role: 'Operations Manager',
                company: 'Tech Solutions',
              },
            ],
          },
        },
        {
          id: uuidv4(),
          type: 'cta',
          title: 'Call to Action',
          order: 4,
          content: {
            title: 'Ready to Get Started?',
            subtitle: `Join the many satisfied clients who have already transformed their ${industry} with ${businessName}.`,
            buttonText: 'Contact Us Today',
            buttonLink: '#contact',
            backgroundImage: 'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          },
        },
      ],
      theme: {
        colorScheme: 'light',
        colors: {
          primary: formData.brandColors.primary,
          secondary: formData.brandColors.secondary,
          background: '#ffffff',
          text: '#111827',
        },
        fonts: {
          heading: 'Inter, sans-serif',
          body: 'Inter, sans-serif',
        },
      },
      isPublished: false,
    };
  }

  // Create a mock section
  if (type === 'section') {
    const sectionType = formData.type;

    switch (sectionType) {
      case 'hero':
        return {
          id: uuidv4(),
          type: 'hero',
          title: 'Hero Section',
          content: {
            headline: `Transform Your ${industry} with ${businessName}`,
            subheadline: `The ${tone} solution designed to help businesses thrive in today's competitive landscape.`,
            ctaText: 'Get Started',
            ctaLink: '#contact',
            backgroundImage: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          },
        };

      case 'about':
        return {
          id: uuidv4(),
          type: 'about',
          title: 'About Us',
          content: {
            title: 'About Us',
            content: `At ${businessName}, we're passionate about delivering exceptional ${industry} solutions that make a difference. Our team of experts works tirelessly to ensure that every client receives personalized service and outstanding results.`,
            image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          },
        };

      case 'features':
        return {
          id: uuidv4(),
          type: 'features',
          title: 'Features',
          content: {
            title: 'Our Key Features',
            subtitle: 'Discover what makes us different',
            features: keyFeatures.slice(0, 3).map((feature, index) => ({
              id: uuidv4(),
              title: feature,
              description: `Our ${feature} solution provides exceptional value by streamlining processes and improving outcomes.`,
              icon: ['Zap', 'Shield', 'BarChart'][index % 3],
            })),
          },
        };

      case 'testimonials':
        return {
          id: uuidv4(),
          type: 'testimonials',
          title: 'Testimonials',
          content: {
            title: 'What Our Clients Say',
            testimonials: [
              {
                id: uuidv4(),
                quote: `${businessName} has completely transformed our approach to ${industry}. The results speak for themselves.`,
                author: 'Jane Smith',
                role: 'CEO',
                company: 'Acme Inc.',
              },
              {
                id: uuidv4(),
                quote: `Working with ${businessName} has been a game-changer for our business. Highly recommended!`,
                author: 'John Doe',
                role: 'Marketing Director',
                company: 'Global Corp',
              },
            ],
          },
        };

      case 'cta':
        return {
          id: uuidv4(),
          type: 'cta',
          title: 'Call to Action',
          content: {
            title: 'Ready to Get Started?',
            subtitle: `Join the many satisfied clients who have already transformed their ${industry} with ${businessName}.`,
            buttonText: 'Contact Us Today',
            buttonLink: '#contact',
            backgroundImage: 'https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          },
        };

      case 'custom':
        // For custom sections, we'll create a simple text section
        return {
          id: uuidv4(),
          type: 'custom',
          title: 'Custom Section',
          content: {
            title: 'Custom Section',
            content: `This is a custom section for ${businessName}. It can be customized to fit your specific needs and requirements.`,
            layout: 'text-only',
          },
        };

      default:
        return {
          id: uuidv4(),
          type: 'about',
          title: 'About Us',
          content: {
            title: 'About Us',
            content: `At ${businessName}, we're passionate about delivering exceptional ${industry} solutions that make a difference.`,
            image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          },
        };
    }
  }
};

// Generate a complete landing page
router.post('/', async (req, res) => {
  try {
    const { formData } = req.body;

    // Check if formData is provided
    if (!formData) {
      return res.status(400).json({
        success: false,
        error: 'Form data is required'
      });
    }

    let generatedPage;

    // If OpenAI is initialized, use it to generate the page
    if (openai) {
      // Prepare the prompt for OpenAI
      const prompt = `
        Create a landing page for a ${formData.industry} business called "${formData.businessName}".
        The tone should be ${formData.tone}.
        The key features of the business are: ${formData.keyFeatures.join(', ')}.
        The target audience is: ${formData.targetAudience || 'general customers'}.
        Business vision: ${formData.vision || 'Not specified'}.

        Generate the following sections for the landing page:
        1. Hero section with headline, subheadline, and call-to-action text
        2. About section with company description
        3. Features section with descriptions for each key feature
        4. Testimonials section with 3 fictional customer quotes
        5. Call-to-action section

        Format the response as a JSON object that follows this structure:
        {
          "sections": [
            {
              "type": "hero",
              "content": {
                "headline": "",
                "subheadline": "",
                "ctaText": "",
                "ctaLink": ""
              }
            },
            {
              "type": "about",
              "content": {
                "title": "",
                "content": ""
              }
            },
            {
              "type": "features",
              "content": {
                "title": "",
                "subtitle": "",
                "features": [
                  {
                    "title": "",
                    "description": "",
                    "icon": ""
                  }
                ]
              }
            },
            {
              "type": "testimonials",
              "content": {
                "title": "",
                "testimonials": [
                  {
                    "quote": "",
                    "author": "",
                    "role": "",
                    "company": ""
                  }
                ]
              }
            },
            {
              "type": "cta",
              "content": {
                "title": "",
                "subtitle": "",
                "buttonText": "",
                "buttonLink": ""
              }
            }
          ]
        }
      `;

      // Generate content with OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a professional copywriter and web designer specializing in creating compelling landing pages." },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      const aiResponse = completion.choices[0].message.content;
      let parsedResponse;

      try {
        parsedResponse = JSON.parse(aiResponse);
      } catch (parseError) {
        console.error('Error parsing OpenAI response:', parseError);
        return res.status(500).json({
          success: false,
          error: 'Failed to parse AI-generated content'
        });
      }

      // Build the page object with the AI-generated content
      generatedPage = {
        id: uuidv4(),
        title: `${formData.businessName} Landing Page`,
        createdAt: new Date(),
        updatedAt: new Date(),
        formData,
        sections: parsedResponse.sections.map((section, index) => ({
          id: uuidv4(),
          type: section.type,
          title: section.content.title || section.type.charAt(0).toUpperCase() + section.type.slice(1),
          order: index,
          content: section.content,
        })),
        theme: {
          colorScheme: 'light',
          colors: {
            primary: formData.brandColors.primary,
            secondary: formData.brandColors.secondary,
            background: '#ffffff',
            text: '#111827',
          },
          fonts: {
            heading: 'Inter, sans-serif',
            body: 'Inter, sans-serif',
          },
        },
        isPublished: false,
      };
    } else {
      // Use mock data if OpenAI is not initialized
      generatedPage = generateMockData(formData);
    }

    res.status(200).json({
      success: true,
      page: generatedPage
    });
  } catch (error) {
    console.error('Error generating landing page:', error);

    // If OpenAI fails (quota exceeded, API issues, etc.), fall back to mock data
    if (error.status === 429 || error.code === 'insufficient_quota' || error.type === 'insufficient_quota') {
      console.log('OpenAI quota exceeded, falling back to mock data...');
      const generatedPage = generateMockData(formData);
      return res.status(200).json({
        success: true,
        page: generatedPage,
        message: 'Generated using mock data (OpenAI quota exceeded)'
      });
    }

    res.status(500).json({
      success: false,
      error: error.message || 'An error occurred while generating the landing page'
    });
  }
});

// Generate a single section
router.post('/section', async (req, res) => {
  try {
    const { type, formData, prompt } = req.body;

    // Check if required data is provided
    if (!type || !formData) {
      return res.status(400).json({
        success: false,
        error: 'Section type and form data are required'
      });
    }

    let generatedSection;

    // If OpenAI is initialized, use it to generate the section
    if (openai) {
      // Prepare the prompt for OpenAI
      const aiPrompt = `
        Create a ${type} section for a landing page for a ${formData.industry} business called "${formData.businessName}".
        The tone should be ${formData.tone}.
        The key features of the business are: ${formData.keyFeatures.join(', ')}.
        The target audience is: ${formData.targetAudience || 'general customers'}.
        Business vision: ${formData.vision || 'Not specified'}.

        ${prompt ? `Additional instructions: ${prompt}` : ''}

        Format the response as a JSON object that follows this structure (adjust based on section type):

        For hero section:
        {
          "type": "hero",
          "content": {
            "headline": "",
            "subheadline": "",
            "ctaText": "",
            "ctaLink": ""
          }
        }

        For about section:
        {
          "type": "about",
          "content": {
            "title": "",
            "content": ""
          }
        }

        For features section:
        {
          "type": "features",
          "content": {
            "title": "",
            "subtitle": "",
            "features": [
              {
                "title": "",
                "description": "",
                "icon": ""
              }
            ]
          }
        }

        For testimonials section:
        {
          "type": "testimonials",
          "content": {
            "title": "",
            "testimonials": [
              {
                "quote": "",
                "author": "",
                "role": "",
                "company": ""
              }
            ]
          }
        }

        For CTA section:
        {
          "type": "cta",
          "content": {
            "title": "",
            "subtitle": "",
            "buttonText": "",
            "buttonLink": ""
          }
        }

        For custom section:
        {
          "type": "custom",
          "content": {
            "title": "",
            "content": "",
            "layout": "text-only"
          }
        }
      `;

      // Generate content with OpenAI
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a professional copywriter and web designer specializing in creating compelling landing page sections." },
          { role: "user", content: aiPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });

      const aiResponse = completion.choices[0].message.content;
      let parsedResponse;

      try {
        parsedResponse = JSON.parse(aiResponse);
      } catch (parseError) {
        console.error('Error parsing OpenAI response:', parseError);
        return res.status(500).json({
          success: false,
          error: 'Failed to parse AI-generated content'
        });
      }

      // Build the section object with the AI-generated content
      generatedSection = {
        id: uuidv4(),
        type: parsedResponse.type,
        title: parsedResponse.content.title || parsedResponse.type.charAt(0).toUpperCase() + parsedResponse.type.slice(1),
        content: parsedResponse.content,
      };
    } else {
      // Use mock data if OpenAI is not initialized
      // Add the type to the formData for the mock generator
      const mockFormData = { ...formData, type };
      generatedSection = generateMockData(mockFormData, 'section');
    }

    res.status(200).json({
      success: true,
      section: generatedSection
    });
  } catch (error) {
    console.error('Error generating section:', error);

    // If OpenAI fails (quota exceeded, API issues, etc.), fall back to mock data
    if (error.status === 429 || error.code === 'insufficient_quota' || error.type === 'insufficient_quota') {
      console.log('OpenAI quota exceeded, falling back to mock data for section...');
      const mockFormData = { ...formData, type };
      const generatedSection = generateMockData(mockFormData, 'section');
      return res.status(200).json({
        success: true,
        section: generatedSection,
        message: 'Generated using mock data (OpenAI quota exceeded)'
      });
    }

    res.status(500).json({
      success: false,
      error: error.message || 'An error occurred while generating the section'
    });
  }
});

export default router;