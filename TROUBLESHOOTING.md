# Landing Page Generator - Troubleshooting Guide

## Issue: "Generate Landing Page" Button Not Working

### Quick Fix Steps:

1. **Fix PowerShell Execution Policy** (Run as Administrator):
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

2. **Start Both Servers**:
   - Double-click `start-dev.bat` OR
   - Manual method:
     ```bash
     # Terminal 1 - Backend
     node server/index.js
     
     # Terminal 2 - Frontend  
     npm run dev
     ```

3. **Verify Servers Are Running**:
   - Backend: http://localhost:5000
   - Frontend: http://localhost:5173

### AI Model Configuration:

The app uses **OpenAI GPT-3.5-turbo** for content generation.

**Without OpenAI API Key**: Uses mock data (still works!)
**With OpenAI API Key**: Generates AI-powered content

To enable AI generation:
1. Get OpenAI API key from https://platform.openai.com/
2. Add to `.env` file:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   ```

### Common Issues:

**Issue**: PowerShell script execution disabled
**Solution**: Run as admin: `Set-ExecutionPolicy RemoteSigned`

**Issue**: "Cannot connect to backend"
**Solution**: Ensure backend server is running on port 5000

**Issue**: Frontend not loading
**Solution**: Ensure frontend server is running on port 5173

**Issue**: Generate button shows "Generating..." forever
**Solution**: Check browser console for errors, restart both servers

### Testing the Fix:

1. Open http://localhost:5173
2. Fill out the form completely
3. Click "Generate Landing Page"
4. Should redirect to editor with generated content

### Debug Mode:

Check browser Developer Tools (F12):
- Console tab: Look for JavaScript errors
- Network tab: Check if API calls to `/api/generate` succeed
- Response should be 200 OK with page data

### Mock vs AI Mode:

**Mock Mode** (default): Works without API keys, generates template content
**AI Mode**: Requires OPENAI_API_KEY, generates custom content using GPT-3.5-turbo
