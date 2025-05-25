# API Keys Setup Guide

## 🚀 Enable AI Generation with OpenAI API

### Step 1: Get OpenAI API Key

1. **Visit**: https://platform.openai.com/
2. **Sign up** or **Login** to your account
3. **Go to API Keys**: https://platform.openai.com/api-keys
4. **Click**: "Create new secret key"
5. **Name it**: "Landing Page Generator"
6. **Copy the key**: It looks like `sk-...` (save it securely!)

### Step 2: Add API Key to .env File

1. **Open**: `.env` file in your project root
2. **Find this line**:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```
3. **Replace** `your_openai_api_key_here` with your actual key:
   ```
   OPENAI_API_KEY=sk-your-actual-key-here
   ```

### Step 3: Restart Backend Server

After adding the API key:
1. **Stop** the backend server (Ctrl+C)
2. **Restart** it: `node server/index.js`
3. You should see: "Server running on port 5000"

## 🖼️ Optional: Better Images with Unsplash API

### Get Unsplash API Key:

1. **Visit**: https://unsplash.com/developers
2. **Create account** and **new application**
3. **Copy Access Key**
4. **Add to .env**:
   ```
   UNSPLASH_ACCESS_KEY=your_unsplash_access_key
   ```

## 🚀 Optional: Deployment with Netlify API

### Get Netlify Token:

1. **Visit**: https://app.netlify.com/user/applications#personal-access-tokens
2. **Generate new token**
3. **Add to .env**:
   ```
   NETLIFY_AUTH_TOKEN=your_netlify_token
   ```

## ✅ Testing AI Generation

1. **Restart backend** after adding API keys
2. **Open**: http://localhost:5173
3. **Fill form** completely
4. **Click**: "Generate Landing Page"
5. **Result**: AI-generated content instead of mock data!

## 🔍 How to Verify AI is Working

**With AI (OpenAI key added):**
- Content is unique and tailored to your business
- Headlines are creative and specific
- Descriptions are detailed and relevant

**Without AI (mock data):**
- Generic template content
- Same structure for all businesses
- Basic placeholder text

## 💰 OpenAI Pricing

- **Free tier**: $5 credit for new accounts
- **Pay-per-use**: ~$0.002 per 1K tokens
- **Landing page generation**: ~$0.01-0.05 per page

## 🔒 Security Notes

- **Never commit** .env file to version control
- **Keep API keys** private and secure
- **Regenerate keys** if compromised
- **Monitor usage** on OpenAI dashboard

## 🛠️ Troubleshooting

**Issue**: "OpenAI API key not found"
**Solution**: Check .env file has correct key format

**Issue**: "Invalid API key"
**Solution**: Verify key is correct and account has credits

**Issue**: "Rate limit exceeded"
**Solution**: Wait or upgrade OpenAI plan

**Issue**: Still getting mock data
**Solution**: Restart backend server after adding key
