#!/bin/bash

# Bhoomi Groups - Package for Deployment
# This script packages your project for easy deployment

echo "=========================================="
echo "Bhoomi Groups - Packaging for Deployment"
echo "=========================================="
echo ""

# Create package directory
PACKAGE_DIR="bhoomi-groups-package"
mkdir -p $PACKAGE_DIR

# Copy backend files
echo "📦 Copying backend files..."
mkdir -p $PACKAGE_DIR/backend
cp /app/backend/server.py $PACKAGE_DIR/backend/
cp /app/backend/requirements.txt $PACKAGE_DIR/backend/
cp /app/backend/.env $PACKAGE_DIR/backend/.env.example

# Copy frontend files
echo "📦 Copying frontend files..."
mkdir -p $PACKAGE_DIR/frontend
cp -r /app/frontend/public $PACKAGE_DIR/frontend/
cp -r /app/frontend/src $PACKAGE_DIR/frontend/
cp /app/frontend/package.json $PACKAGE_DIR/frontend/
cp /app/frontend/tailwind.config.js $PACKAGE_DIR/frontend/
cp /app/frontend/postcss.config.js $PACKAGE_DIR/frontend/
cp /app/frontend/.env $PACKAGE_DIR/frontend/.env.example

# Copy documentation
echo "📄 Copying documentation..."
cp /app/README.md $PACKAGE_DIR/
cp /app/DEPLOYMENT.md $PACKAGE_DIR/
cp /app/memory/test_credentials.md $PACKAGE_DIR/

# Create .gitignore
echo "📝 Creating .gitignore..."
cat > $PACKAGE_DIR/.gitignore << 'EOF'
# Dependencies
node_modules/
venv/
__pycache__/
*.pyc

# Environment
.env
.env.local
.env.production

# Build
frontend/build/
frontend/.next/
dist/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/
.pytest_cache/
EOF

# Create Procfile for Railway/Heroku
echo "📝 Creating Procfile..."
echo "web: uvicorn server:app --host 0.0.0.0 --port \$PORT" > $PACKAGE_DIR/backend/Procfile

# Create package.json for root (optional)
echo "📝 Creating root package.json..."
cat > $PACKAGE_DIR/package.json << 'EOF'
{
  "name": "bhoomi-groups",
  "version": "1.0.0",
  "description": "Bhoomi Groups - Full Stack Website",
  "scripts": {
    "install:backend": "cd backend && pip install -r requirements.txt",
    "install:frontend": "cd frontend && yarn install",
    "dev:backend": "cd backend && uvicorn server:app --reload --host 0.0.0.0 --port 8001",
    "dev:frontend": "cd frontend && yarn start",
    "build:frontend": "cd frontend && yarn build"
  },
  "keywords": ["bhoomi", "groups", "pipes", "pumps", "cables"],
  "author": "Bhoomi Groups",
  "license": "PROPRIETARY"
}
EOF

# Create deployment instructions
echo "📝 Creating quick start guide..."
cat > $PACKAGE_DIR/QUICKSTART.md << 'EOF'
# Quick Start Guide

## 1. Install Dependencies

### Backend
```bash
cd backend
pip install -r requirements.txt
```

### Frontend
```bash
cd frontend
yarn install
```

## 2. Configure Environment

### Backend (.env)
```bash
cd backend
cp .env.example .env
# Edit .env and update:
# - MONGO_URL with your MongoDB connection string
# - JWT_SECRET with a secure random string
```

### Frontend (.env)
```bash
cd frontend
cp .env.example .env
# Edit .env and update:
# - REACT_APP_BACKEND_URL with your backend URL
```

## 3. Run Locally

### Start Backend
```bash
cd backend
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

### Start Frontend (new terminal)
```bash
cd frontend
yarn start
```

Visit: http://localhost:3000

## 4. Deploy (Read DEPLOYMENT.md for full guide)

- **Backend**: Railway, Render, or any Python hosting
- **Frontend**: Vercel, Netlify, or any static hosting
- **Database**: MongoDB Atlas (free tier available)

## Admin Credentials

Email: admin@bhoomigroups.com
Password: Admin@123

**⚠️ IMPORTANT: Change password after first login!**
EOF

# Create ZIP archive
echo "🗜️  Creating ZIP archive..."
cd /app
zip -r bhoomi-groups-package.zip $PACKAGE_DIR -x "*.git*" -q

echo ""
echo "✅ Package created successfully!"
echo ""
echo "📦 Package location: /app/bhoomi-groups-package.zip"
echo "📁 Uncompressed files: /app/$PACKAGE_DIR/"
echo ""
echo "Next steps:"
echo "1. Download the ZIP file: bhoomi-groups-package.zip"
echo "2. Extract on your local machine"
echo "3. Read QUICKSTART.md for local setup"
echo "4. Read DEPLOYMENT.md for production deployment"
echo ""
echo "=========================================="
