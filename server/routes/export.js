import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const router = express.Router();

// Get directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Export the landing page to static HTML, CSS, and JS
router.post('/', (req, res) => {
  try {
    const pageData = req.body;
    
    if (!pageData) {
      return res.status(400).json({ 
        success: false, 
        error: 'Page data is required' 
      });
    }
    
    // Generate a unique identifier for the export
    const exportId = Date.now().toString();
    const exportDir = path.join(__dirname, '../exports', exportId);
    
    // Create the export directory if it doesn't exist
    if (!fs.existsSync(path.join(__dirname, '../exports'))) {
      fs.mkdirSync(path.join(__dirname, '../exports'));
    }
    
    fs.mkdirSync(exportDir);
    
    // Generate the HTML file
    const htmlContent = generateHTML(pageData);
    fs.writeFileSync(path.join(exportDir, 'index.html'), htmlContent);
    
    // Generate the CSS file
    const cssContent = generateCSS(pageData);
    fs.writeFileSync(path.join(exportDir, 'styles.css'), cssContent);
    
    // Generate the JS file
    const jsContent = generateJS();
    fs.writeFileSync(path.join(exportDir, 'script.js'), jsContent);
    
    // Create a zip file of the export directory
    // In a real implementation, you would use a library like archiver to create a zip file
    // and provide a download link to the user
    
    // For now, we'll just return a mock download URL
    const downloadUrl = `/api/export/download/${exportId}`;
    
    res.status(200).json({ 
      success: true, 
      message: 'Landing page exported successfully',
      downloadUrl,
    });
  } catch (error) {
    console.error('Error exporting landing page:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'An error occurred while exporting the landing page' 
    });
  }
});

// Download the exported landing page
router.get('/download/:id', (req, res) => {
  try {
    const { id } = req.params;
    const exportDir = path.join(__dirname, '../exports', id);
    
    // Check if the export directory exists
    if (!fs.existsSync(exportDir)) {
      return res.status(404).json({ 
        success: false, 
        error: 'Export not found' 
      });
    }
    
    // In a real implementation, you would create a zip file of the export directory
    // and send it to the user
    
    // For now, we'll just send the HTML file
    const htmlFilePath = path.join(exportDir, 'index.html');
    
    res.download(htmlFilePath, 'landing-page.html');
  } catch (error) {
    console.error('Error downloading export:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'An error occurred while downloading the export' 
    });
  }
});

// Helper function to generate HTML
function generateHTML(pageData) {
  const { title, sections, theme } = pageData;
  
  // Generate HTML for each section
  const sectionsHTML = sections
    .sort((a, b) => a.order - b.order)
    .map(section => {
      switch (section.type) {
        case 'hero':
          return `
            <section id="${section.id}" class="hero-section">
              <div class="container">
                <h1>${section.content.headline}</h1>
                <p class="hero-subheadline">${section.content.subheadline}</p>
                <a href="${section.content.ctaLink}" class="cta-button">${section.content.ctaText}</a>
              </div>
            </section>
          `;
        
        case 'about':
          return `
            <section id="${section.id}" class="about-section">
              <div class="container">
                <div class="about-content">
                  <div class="about-text">
                    <h2>${section.content.title}</h2>
                    <p>${section.content.content}</p>
                  </div>
                  <div class="about-image">
                    <img src="${section.content.image || ''}" alt="About us">
                  </div>
                </div>
              </div>
            </section>
          `;
        
        case 'features':
          const featuresHTML = section.content.features.map(feature => `
            <div class="feature-card">
              <div class="feature-icon">${feature.icon || ''}</div>
              <h3>${feature.title}</h3>
              <p>${feature.description}</p>
            </div>
          `).join('');
          
          return `
            <section id="${section.id}" class="features-section">
              <div class="container">
                <h2>${section.content.title}</h2>
                ${section.content.subtitle ? `<p class="section-subtitle">${section.content.subtitle}</p>` : ''}
                <div class="features-grid">
                  ${featuresHTML}
                </div>
              </div>
            </section>
          `;
        
        case 'testimonials':
          const testimonialsHTML = section.content.testimonials.map(testimonial => `
            <div class="testimonial-card">
              <p class="testimonial-quote">"${testimonial.quote}"</p>
              <div class="testimonial-author">
                <p class="author-name">${testimonial.author}</p>
                <p class="author-role">${testimonial.role}${testimonial.company ? ` at ${testimonial.company}` : ''}</p>
              </div>
            </div>
          `).join('');
          
          return `
            <section id="${section.id}" class="testimonials-section">
              <div class="container">
                <h2>${section.content.title}</h2>
                <div class="testimonials-grid">
                  ${testimonialsHTML}
                </div>
              </div>
            </section>
          `;
        
        case 'cta':
          return `
            <section id="${section.id}" class="cta-section">
              <div class="container">
                <h2>${section.content.title}</h2>
                ${section.content.subtitle ? `<p class="cta-subtitle">${section.content.subtitle}</p>` : ''}
                <a href="${section.content.buttonLink}" class="cta-button">${section.content.buttonText}</a>
              </div>
            </section>
          `;
        
        case 'custom':
          return `
            <section id="${section.id}" class="custom-section">
              <div class="container">
                <h2>${section.content.title}</h2>
                <div class="custom-content">
                  ${section.content.content}
                </div>
              </div>
            </section>
          `;
        
        default:
          return '';
      }
    }).join('');
  
  // Generate the complete HTML document
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <link rel="stylesheet" href="styles.css">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    </head>
    <body class="${theme.colorScheme === 'dark' ? 'dark-mode' : ''}">
      <header>
        <div class="container">
          <div class="logo">${title.split(' ')[0]}</div>
          <nav>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main>
        ${sectionsHTML}
      </main>
      
      <footer>
        <div class="container">
          <p>&copy; ${new Date().getFullYear()} ${title}. All rights reserved.</p>
        </div>
      </footer>
      
      <script src="script.js"></script>
    </body>
    </html>
  `;
}

// Helper function to generate CSS
function generateCSS(pageData) {
  const { theme } = pageData;
  
  return `
    :root {
      --primary-color: ${theme.colors.primary};
      --secondary-color: ${theme.colors.secondary || '#93c5fd'};
      --background-color: ${theme.colors.background};
      --text-color: ${theme.colors.text};
      --accent-color: ${theme.colors.accent || '#f97316'};
      --font-heading: ${theme.fonts.heading};
      --font-body: ${theme.fonts.body};
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: var(--font-body);
      color: var(--text-color);
      background-color: var(--background-color);
      line-height: 1.6;
    }
    
    .dark-mode {
      --background-color: #121212;
      --text-color: #ffffff;
    }
    
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font-heading);
      margin-bottom: 1rem;
      line-height: 1.2;
    }
    
    h1 {
      font-size: 3rem;
    }
    
    h2 {
      font-size: 2.5rem;
    }
    
    h3 {
      font-size: 1.5rem;
    }
    
    p {
      margin-bottom: 1rem;
    }
    
    a {
      color: var(--primary-color);
      text-decoration: none;
    }
    
    ul {
      list-style: none;
    }
    
    /* Header */
    header {
      background-color: var(--background-color);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
      padding: 1rem 0;
    }
    
    header .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
    }
    
    nav ul {
      display: flex;
    }
    
    nav ul li {
      margin-left: 1.5rem;
    }
    
    nav ul li a {
      transition: color 0.3s ease;
    }
    
    nav ul li a:hover {
      color: var(--primary-color);
    }
    
    /* Hero Section */
    .hero-section {
      background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
      background-size: cover;
      background-position: center;
      color: white;
      text-align: center;
      padding: 8rem 0;
    }
    
    .hero-subheadline {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .cta-button {
      display: inline-block;
      background-color: var(--primary-color);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      font-weight: 600;
      transition: background-color 0.3s ease;
    }
    
    .cta-button:hover {
      background-color: var(--secondary-color);
    }
    
    /* About Section */
    .about-section {
      padding: 5rem 0;
      background-color: #f9fafb;
    }
    
    .dark-mode .about-section {
      background-color: #1a1a1a;
    }
    
    .about-content {
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    
    .about-text {
      flex: 1;
    }
    
    .about-image {
      flex: 1;
    }
    
    .about-image img {
      width: 100%;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    /* Features Section */
    .features-section {
      padding: 5rem 0;
      text-align: center;
    }
    
    .section-subtitle {
      font-size: 1.25rem;
      margin-bottom: 3rem;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }
    
    .feature-card {
      background-color: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;
    }
    
    .dark-mode .feature-card {
      background-color: #1e1e1e;
    }
    
    .feature-card:hover {
      transform: translateY(-5px);
    }
    
    .feature-icon {
      font-size: 2rem;
      color: var(--primary-color);
      margin-bottom: 1rem;
    }
    
    /* Testimonials Section */
    .testimonials-section {
      padding: 5rem 0;
      background-color: #f9fafb;
      text-align: center;
    }
    
    .dark-mode .testimonials-section {
      background-color: #1a1a1a;
    }
    
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }
    
    .testimonial-card {
      background-color: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      text-align: left;
    }
    
    .dark-mode .testimonial-card {
      background-color: #1e1e1e;
    }
    
    .testimonial-quote {
      font-style: italic;
      margin-bottom: 1.5rem;
    }
    
    .author-name {
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    
    .author-role {
      font-size: 0.875rem;
      color: #6b7280;
    }
    
    .dark-mode .author-role {
      color: #9ca3af;
    }
    
    /* CTA Section */
    .cta-section {
      background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2');
      background-size: cover;
      background-position: center;
      color: white;
      text-align: center;
      padding: 5rem 0;
    }
    
    .cta-subtitle {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      max-width: 700px;
      margin-left: auto;
      margin-right: auto;
    }
    
    /* Custom Section */
    .custom-section {
      padding: 5rem 0;
    }
    
    .custom-content {
      margin-top: 2rem;
    }
    
    /* Footer */
    footer {
      background-color: var(--background-color);
      padding: 2rem 0;
      text-align: center;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
    }
    
    .dark-mode footer {
      border-top-color: rgba(255, 255, 255, 0.1);
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      h1 {
        font-size: 2.5rem;
      }
      
      h2 {
        font-size: 2rem;
      }
      
      .about-content {
        flex-direction: column;
      }
      
      nav ul {
        display: none;
      }
    }
  `;
}

// Helper function to generate JS
function generateJS() {
  return `
    // Simple JavaScript for interactivity
    document.addEventListener('DOMContentLoaded', function() {
      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 70, // Adjust for header height
              behavior: 'smooth'
            });
          }
        });
      });
      
      // Add scroll animation for elements
      const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .testimonial-card, .about-image, h2');
        
        elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }
        });
      };
      
      // Apply initial styles for animation
      const elementsToAnimate = document.querySelectorAll('.feature-card, .testimonial-card, .about-image, h2');
      elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      });
      
      // Run animation on load and scroll
      animateOnScroll();
      window.addEventListener('scroll', animateOnScroll);
    });
  `;
}

export default router;