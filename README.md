# Dynamic Landing Page Generator

A MERN stack application with AI integration that allows users to generate beautiful, customizable landing pages based on their business information.

## Features

- Multi-step form to collect business information
- AI-powered content generation for landing page sections
- Real-time preview of the generated landing page
- Drag-and-drop section reordering
- Theme customization with light/dark mode toggle
- Export to static HTML/CSS/JS files
- Deploy to Netlify integration
- Saved pages with shareable URLs

## Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Zustand
- **Backend**: Node.js, Express.js, MongoDB
- **AI Integration**: OpenAI API for text generation, Unsplash API for images
- **Deployment**: Netlify integration

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (optional, for persistence)
- OpenAI API key (for AI-powered generation)
- Unsplash API key (for image integration)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/landing-page-generator.git
   cd landing-page-generator
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`
   ```
   cp .env.example .env
   ```

4. Update the `.env` file with your API keys and configuration

5. Start the development server
   ```
   npm run dev
   ```

6. In a separate terminal, start the backend server
   ```
   npm run dev:server
   ```

7. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
├── client/                 # Frontend code
│   ├── components/         # React components
│   │   ├── editor/         # Page editor components
│   │   ├── form/           # Multi-step form components
│   │   ├── landing/        # Landing page section components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # UI components
│   ├── pages/              # Page components
│   ├── store/              # Zustand state management
│   ├── lib/                # Utility functions
│   └── types/              # TypeScript types
├── server/                 # Backend code
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   └── index.js            # Server entry point
└── public/                 # Static assets
```

## API Endpoints

- `GET /api/pages` - Get all landing pages
- `GET /api/pages/:id` - Get a specific landing page
- `POST /api/pages` - Create a new landing page
- `PUT /api/pages/:id` - Update a landing page
- `DELETE /api/pages/:id` - Delete a landing page
- `POST /api/generate` - Generate a landing page with AI
- `POST /api/generate/section` - Generate a section with AI
- `POST /api/export` - Export landing page to static files
- `GET /api/export/download/:id` - Download exported files
- `POST /api/deploy` - Deploy landing page to Netlify

## Extending the Project

### Adding New Section Types

1. Create a new component in `src/components/landing/`
2. Update the `LandingPageSection` type in `src/types/index.ts`
3. Add the section rendering in `src/components/editor/LandingPagePreview.tsx`
4. Add the section generation logic in `server/routes/generate.js`

### Adding New AI Integrations

1. Install the required API client
2. Add the API key to `.env`
3. Create a new service in `server/services/`
4. Integrate the service in the generation routes

## License

This project is licensed under the MIT License.