# Bhoomi Groups - Self Deployment Guide

## 📦 Complete File Structure

All your project files are located in `/app` directory. Here's what you have:

```
/app/
├── backend/
│   ├── server.py              # FastAPI application
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Backend environment variables
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   ├── HeroSection.js
│   │   │   ├── AboutSection.js
│   │   │   ├── ProductsSection.js
│   │   │   ├── BlogSection.js
│   │   │   ├── TestimonialsSection.js
│   │   │   ├── FAQSection.js
│   │   │   └── FormsSection.js
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── BlogList.js
│   │   │   ├── BlogDetail.js
│   │   │   ├── HelpCenter.js
│   │   │   ├── AdminLogin.js
│   │   │   ├── AdminDashboard.js
│   │   │   └── AdminFAQ.js
│   │   ├── i18n.js            # Multi-language configuration
│   │   ├── App.js             # Main React app
│   │   ├── App.css            # Component styles
│   │   └── index.css          # Global styles
│   ├── package.json           # Node dependencies
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env                   # Frontend environment variables
│
├── memory/
│   └── test_credentials.md    # Admin credentials
│
├── README.md                  # Complete documentation
└── DEPLOYMENT.md              # This file
```

## 🚀 Deployment Options

### Option 1: Download All Files (Recommended)

You can download the entire project using:

```bash
# If you have access to the server
cd /app
zip -r bhoomi-groups.zip backend/ frontend/ README.md -x "*/node_modules/*" "*/venv/*" "*/__pycache__/*"
```

### Option 2: Create GitHub Repository

```bash
cd /app

# Initialize git
git init

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
venv/
__pycache__/

# Environment variables
.env.local
.env.production

# Build outputs
frontend/build/
*.pyc

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Logs
*.log
EOF

# Add all files
git add .

# Commit
git commit -m "Initial commit: Bhoomi Groups website"

# Add your GitHub repository
git remote add origin https://github.com/YOUR_USERNAME/bhoomi-groups.git

# Push
git push -u origin main
```

## 🌐 Deployment Platforms

### A. Deploy Backend to Railway

1. **Create account at** https://railway.app
2. **Create New Project** → Deploy from GitHub
3. **Select your repository**
4. **Add Environment Variables**:
   ```
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
   DB_NAME=bhoomi_production
   CORS_ORIGINS=https://your-frontend-domain.com
   JWT_SECRET=your-secure-random-secret-key-min-32-characters
   PORT=8001
   ```
5. **Add Procfile** (create in /app/backend/):
   ```
   web: uvicorn server:app --host 0.0.0.0 --port $PORT
   ```
6. **Deploy** - Railway will auto-deploy
7. **Get your backend URL**: e.g., `https://bhoomi-backend.railway.app`

### B. Deploy Backend to Render

1. **Create account at** https://render.com
2. **New Web Service** → Connect GitHub
3. **Build Command**: `pip install -r requirements.txt`
4. **Start Command**: `uvicorn server:app --host 0.0.0.0 --port $PORT`
5. **Add Environment Variables** (same as Railway)
6. **Deploy**

### C. Deploy Frontend to Vercel

1. **Create account at** https://vercel.com
2. **Import Project** from GitHub
3. **Framework Preset**: Create React App
4. **Root Directory**: `frontend`
5. **Add Environment Variables**:
   ```
   REACT_APP_BACKEND_URL=https://your-backend-url.railway.app
   ```
6. **Deploy** - Vercel will build and deploy automatically
7. **Get your frontend URL**: e.g., `https://bhoomi-groups.vercel.app`

### D. Deploy Frontend to Netlify

1. **Create account at** https://netlify.com
2. **New Site from Git** → Choose GitHub
3. **Build Command**: `cd frontend && yarn build`
4. **Publish Directory**: `frontend/build`
5. **Environment Variables**: Add `REACT_APP_BACKEND_URL`
6. **Deploy**

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create account at** https://www.mongodb.com/cloud/atlas
2. **Create Free Cluster**
3. **Database Access** → Create user with password
4. **Network Access** → Add IP (0.0.0.0/0 for all IPs)
5. **Connect** → Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/bhoomi?retryWrites=true&w=majority
   ```
6. **Use this as MONGO_URL** in backend environment variables

## 🔑 Important: Update Environment Variables

### Backend (.env)
```env
MONGO_URL=mongodb+srv://your-connection-string
DB_NAME=bhoomi_production
CORS_ORIGINS=https://your-frontend-domain.com,https://www.your-domain.com
JWT_SECRET=change-this-to-a-very-long-random-string-min-32-chars
```

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=https://your-backend-url.railway.app
```

## 📋 Pre-Deployment Checklist

- [ ] Create MongoDB Atlas cluster and get connection string
- [ ] Update backend/.env with production MongoDB URL
- [ ] Generate secure JWT_SECRET (32+ characters)
- [ ] Deploy backend first and get the URL
- [ ] Update frontend/.env with backend URL
- [ ] Deploy frontend
- [ ] Test all features after deployment
- [ ] Create admin account using API
- [ ] Login to admin panel and verify

## 🧪 Testing After Deployment

1. **Create Admin Account**:
   ```bash
   curl -X POST "https://your-backend-url/api/admin/create" \
     -H "Content-Type: application/json" \
     -d '{
       "email": "admin@bhoomigroups.com",
       "password": "YourSecurePassword123"
     }'
   ```

2. **Test Website**:
   - Visit homepage
   - Switch language (English/Hindi)
   - Browse blog posts
   - Open Help Center
   - Submit test form (optional)
   - Login to admin panel
   - Create a test blog post
   - Create a test FAQ

## 🔒 Security Recommendations

1. **Change default admin password** immediately after first login
2. **Use strong JWT_SECRET** (generate using: `openssl rand -hex 32`)
3. **Enable HTTPS** (automatic on Vercel/Netlify)
4. **Restrict CORS origins** to your actual domain only
5. **Regular backups** of MongoDB database
6. **Keep dependencies updated** (`yarn upgrade`, `pip install -U`)

## 📱 Custom Domain Setup

### Vercel (Frontend)
1. Go to Project Settings → Domains
2. Add your domain (e.g., bhoomigroups.com)
3. Update DNS records as instructed

### Railway (Backend)
1. Project Settings → Domains
2. Add custom domain (e.g., api.bhoomigroups.com)
3. Update DNS CNAME record

## 🆘 Troubleshooting

**Frontend not connecting to backend?**
- Check REACT_APP_BACKEND_URL is correct
- Verify CORS_ORIGINS includes your frontend domain
- Check browser console for errors

**Admin login not working?**
- Verify admin account was created successfully
- Check JWT_SECRET is set in backend
- Clear browser cache/cookies

**MongoDB connection failed?**
- Verify MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check connection string username/password
- Ensure database user has read/write permissions

**Forms not loading?**
- Zoho forms require external iframe permissions
- Check browser console for CSP errors
- Open forms in new tab using "Open Form" buttons

## 📞 Support

If you need help:
1. Check README.md for detailed documentation
2. Review error logs in deployment platform
3. Contact: admin@bhoomigroups.com

---

**Your website is ready to deploy! 🎉**

All files are in `/app` directory. Just follow the steps above to deploy to your preferred platform.
