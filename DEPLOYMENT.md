# 🚀 Deployment Guide

## Local Development

### Prerequisites
- Node.js 16+
- Git
- OpenAI API Key (optional)

### Quick Start
```bash
# Clone the repository
git clone https://github.com/anishgupta6801/PROJECT-LANDING-PAGE-GENERATOR.git
cd PROJECT-LANDING-PAGE-GENERATOR

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start backend server
npm run server

# Start frontend (in another terminal)
npm run dev
```

## Production Deployment

### Option 1: Vercel (Recommended)

1. **Fork/Clone** this repository
2. **Connect to Vercel**:
   - Go to https://vercel.com
   - Import your GitHub repository
   - Configure build settings:
     ```
     Build Command: npm run build
     Output Directory: dist
     Install Command: npm install
     ```

3. **Environment Variables**:
   ```
   OPENAI_API_KEY=your_openai_api_key
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=production
   ```

4. **Deploy**: Vercel will automatically deploy

### Option 2: Netlify

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repository

3. **Environment Variables**:
   - Add the same environment variables as above

### Option 3: Railway

1. **Connect Repository**:
   - Go to https://railway.app
   - Connect your GitHub repository

2. **Configure**:
   - Railway will auto-detect Node.js
   - Add environment variables
   - Deploy automatically

### Option 4: Heroku

1. **Create Heroku App**:
   ```bash
   heroku create your-app-name
   ```

2. **Set Environment Variables**:
   ```bash
   heroku config:set OPENAI_API_KEY=your_key
   heroku config:set NODE_ENV=production
   ```

3. **Deploy**:
   ```bash
   git push heroku main
   ```

## Database Setup

### MongoDB Atlas (Recommended)
1. Create account at https://mongodb.com/atlas
2. Create a cluster
3. Get connection string
4. Add to environment variables

### Local MongoDB
```bash
# Install MongoDB locally
# Start MongoDB service
mongod

# Use connection string
MONGODB_URI=mongodb://localhost:27017/landing-page-generator
```

## Environment Variables

### Required
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

### Optional
- `OPENAI_API_KEY` - For AI content generation
- `MONGODB_URI` - For data persistence
- `UNSPLASH_ACCESS_KEY` - For image integration
- `NETLIFY_AUTH_TOKEN` - For deployment features

## Build Commands

```bash
# Development
npm run dev          # Start frontend
npm run server       # Start backend
npm run dev:server   # Start backend with nodemon

# Production
npm run build        # Build frontend
npm start           # Start production server

# Testing
npm test            # Run tests
npm run lint        # Run linter
```

## Troubleshooting

### Common Issues

1. **Port already in use**:
   ```bash
   # Kill process on port 5000
   npx kill-port 5000
   ```

2. **OpenAI quota exceeded**:
   - App automatically falls back to mock data
   - Add billing to OpenAI account

3. **MongoDB connection failed**:
   - App works without MongoDB
   - Check connection string format

4. **Build fails**:
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

## Performance Optimization

### Frontend
- Images are optimized and lazy-loaded
- Code splitting with React.lazy
- Tailwind CSS purging in production

### Backend
- Express compression middleware
- MongoDB connection pooling
- API rate limiting

## Security

### Environment Variables
- Never commit `.env` files
- Use different keys for development/production
- Rotate API keys regularly

### API Security
- CORS configured for specific origins
- Input validation on all endpoints
- Rate limiting on AI generation endpoints

## Monitoring

### Logs
```bash
# View server logs
npm run server

# View build logs
npm run build
```

### Health Check
- Backend: `GET /` returns server status
- Frontend: Check console for errors

## Support

For deployment issues:
1. Check the logs first
2. Verify environment variables
3. Test locally before deploying
4. Open an issue on GitHub

---

🚀 **Happy Deploying!**
