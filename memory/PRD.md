# Bhoomi Groups - Product Requirements Document

## Problem Statement
Create a full-stack, multilingual website for Bhoomi Groups with a blog CMS, FAQ/Help Desk (integrating Zoho forms), and responsive design. Incorporates specific branding (colors from logo) and reference structural elements from competitor sites.

## Tech Stack
- **Frontend**: React + Tailwind CSS + Shadcn UI
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **i18n**: react-i18next (English/Hindi)
- **Auth**: JWT-based admin authentication

## Core Features (All Completed)
- [x] Multilingual support (English/Hindi toggle)
- [x] Hero section with background imagery and CTAs
- [x] About section with company description
- [x] Stats Counter (15+ years, 5000+ products, 100K+ customers, 8 warehouses)
- [x] Featured Products carousel
- [x] Blog CMS with Admin dashboard (create/delete posts)
- [x] FAQ section with Admin panel
- [x] Help Center with embedded Zoho forms
- [x] Newsletter subscription (routes to bhoomi.info@bhoomigroups.com)
- [x] WhatsApp floating button (wa.me/916261084801)
- [x] Responsive design (mobile + desktop)
- [x] Contact section
- [x] Footer with newsletter signup

## Deployment
- [x] Deployment package (zip) with guides
- [x] DEPLOYMENT.md, QUICKSTART.md, EMAIL_INTEGRATION_GUIDE.md

## Hardcoded Business Values
- WhatsApp: 6261084801 (with India +91 prefix)
- Newsletter email: bhoomi.info@bhoomigroups.com
- Admin credentials: admin@bhoomigroups.com / Admin@123

## Key API Endpoints
- GET /api/blog/posts - List blog posts
- POST /api/blog/posts - Create blog post (protected)
- GET /api/faq - List FAQs
- POST /api/newsletter/subscribe - Newsletter subscription
- POST /api/auth/login - Admin login

## Status: COMPLETE
All user-requested features implemented and verified. Deployment package updated with latest responsive CSS fixes.
