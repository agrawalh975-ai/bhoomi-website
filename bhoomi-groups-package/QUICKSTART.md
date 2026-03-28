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
