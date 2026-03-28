# Bhoomi Groups - Full Stack Website

A modern, multi-language website for Bhoomi Groups - a diversified manufacturing & distribution conglomerate specializing in pipes, pumps, cables, and fittings.

## 🌟 Features

✅ **Multi-Language Support** - English & Hindi (हिन्दी) with complete translation  
✅ **Full CMS for Blog Management** - Admin panel to create, edit, delete blog posts  
✅ **FAQ Management System** - Admin panel to manage frequently asked questions  
✅ **Help Desk & Dealer Enquiry** - Embedded Zoho forms with dedicated panels  
✅ **Modern UI/UX** - Industrial-themed design with Bhoomi brand colors  
✅ **Responsive Design** - Mobile-first approach, works on all devices  
✅ **Product Showcase** - Detailed information about Pipes, Pumps, Cables, Fittings  
✅ **Dynamic Blog** - 5+ comprehensive blog posts with multilingual content  
✅ **Searchable FAQs** - Category filters and search functionality  
✅ **Testimonials & Stats** - Customer testimonials and company statistics  

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router DOM v6
- Tailwind CSS
- react-i18next (internationalization)
- react-fast-marquee
- @phosphor-icons/react (icons)
- Shadcn/UI components
- Axios for API calls

### Backend
- FastAPI (Python)
- MongoDB with Motor (async driver)
- JWT Authentication
- bcrypt for password hashing
- Pydantic for data validation

## 📁 Project Structure

```
/app
├── backend/
│   ├── server.py          # FastAPI app with Blog, FAQ & Auth APIs
│   ├── .env               # Environment variables
│   └── requirements.txt   # Python dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/    # Header, Footer, Sections
│   │   ├── context/       # Auth context
│   │   ├── pages/         # Home, Blog, Help Center, Admin
│   │   ├── i18n.js        # Multi-language config
│   │   ├── App.js
│   │   └── index.css
│   ├── package.json
│   └── .env              # Frontend environment variables
└── memory/
    └── test_credentials.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and Yarn
- Python 3.9+
- MongoDB 4.4+

### Backend Setup

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Configure .env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="bhoomi_database"
CORS_ORIGINS="*"
JWT_SECRET="your-secret-key-change-in-production"

# Run server
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
yarn install

# Configure .env
REACT_APP_BACKEND_URL=http://localhost:8001
WDS_SOCKET_PORT=443
ENABLE_HEALTH_CHECK=false

# Run development server
yarn start
```

## 👨‍💼 Admin Panel

### Default Credentials (Change Immediately)
- **Email**: admin@bhoomigroups.com
- **Password**: Admin@123

### Admin Features
- **Blog Management**: Create, edit, delete, publish/unpublish posts
- **FAQ Management**: Manage frequently asked questions
- **Multilingual Content**: English & Hindi translations
- **Rich Media**: Images, categories, tags

## 📡 API Endpoints

### Public
- `GET /api/blog/posts` - Published blog posts
- `GET /api/faqs` - Published FAQs

### Admin (JWT Required)
- `POST /api/admin/login` - Admin login
- Blog: GET/POST/PUT/DELETE `/api/admin/blog/posts`
- FAQ: GET/POST/PUT/DELETE `/api/admin/faqs`

## 🎨 Design System

### Colors
- Primary: #3A339B
- Orange: #E67E22
- Beige: #F5F0E5

### Typography
- Headings: Cabinet Grotesk
- Body: IBM Plex Sans

## 🌐 Deployment to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/bhoomi-groups.git
git push -u origin main
```

## 🔗 Zoho Forms

- **Help Desk**: https://forms.zohopublic.in/bhoomiinfobhoomi1/form/BhoomiGroupsHelpDeskSupportRequestForm/formperma/zsL5n0ihh-CXPqEz5UKnEJTO7366_AEegnh9-sJtD2g
- **Dealer Enquiry**: https://forms.zohopublic.in/bhoomiinfobhoomi1/form/DealerQuestionnaireFormforthewebsite/formperma/Dq2r69zArvvqsIDBeU_q7PrJ9QjksXiMf_F9UThjKRc

## 📱 Pages

- `/` - Home
- `/blog` - Blog listing
- `/blog/:id` - Blog detail
- `/help-center` - FAQs & Forms
- `/admin` - Admin login
- `/admin/dashboard` - Blog management
- `/admin/faqs` - FAQ management

---

© 2026 Bhoomi Groups | Built with Emergent AI
