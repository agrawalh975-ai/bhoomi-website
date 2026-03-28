# Test Credentials for Bhoomi Groups Website

## Admin Account
- Email: admin@bhoomigroups.com
- Password: Admin@123

## API Endpoints
- Backend URL: Use REACT_APP_BACKEND_URL from frontend/.env
- Admin Login: POST /api/admin/login
- Admin Create: POST /api/admin/create

## Notes
- First time setup: Create admin account using /api/admin/create endpoint
- Then use /api/admin/login to get JWT token
- Use token in Authorization header as "Bearer <token>"
