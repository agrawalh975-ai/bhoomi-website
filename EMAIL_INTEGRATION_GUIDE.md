# Newsletter & Email Integration Guide

## 📧 Newsletter Subscription Feature

The Bhoomi Groups website now has a fully functional newsletter subscription system that collects visitor information and sends notifications to `bhoomi.info@bhoomigroups.com`.

---

## ✅ Current Implementation

### Backend API Endpoint
```
POST /api/newsletter/subscribe
```

**Request Body:**
```json
{
  "email": "customer@example.com",
  "phone": "9876543210",
  "name": "Customer Name" (optional)
}
```

**Response:**
```json
{
  "message": "Subscription successful! You will receive updates from Bhoomi Groups.",
  "email": "customer@example.com"
}
```

### Data Storage
- All subscriptions are stored in MongoDB collection: `newsletter_subscriptions`
- Fields stored:
  - `id` - Unique identifier
  - `email` - Subscriber email
  - `phone` - Subscriber phone number
  - `name` - Subscriber name (optional)
  - `subscribed_at` - Timestamp
  - `active` - Boolean status

### Email Notification (Currently Logged)
When a visitor subscribes, the backend logs the following information:

```
Newsletter Subscription: customer@example.com - Phone: 9876543210
Email notification would be sent to: bhoomi.info@bhoomigroups.com
Subject: New Newsletter Subscription - customer@example.com
Body:
  Email: customer@example.com
  Phone: 9876543210
  Name: Customer Name
  Subscribed At: 2026-01-XX XX:XX:XX UTC
```

---

## 🔧 To Enable Actual Email Sending

You need to integrate an email service provider. Here are the recommended options:

### Option 1: SendGrid (Recommended)

**Step 1: Get SendGrid API Key**
1. Sign up at https://sendgrid.com
2. Create an API key
3. Verify sender email: bhoomi.info@bhoomigroups.com

**Step 2: Install SendGrid**
```bash
cd /app/backend
pip install sendgrid
pip freeze > requirements.txt
```

**Step 3: Add API Key to .env**
```bash
SENDGRID_API_KEY=your_sendgrid_api_key_here
NOTIFICATION_EMAIL=bhoomi.info@bhoomigroups.com
FROM_EMAIL=noreply@bhoomigroups.com
```

**Step 4: Update server.py**

Replace the TODO section in `/app/backend/server.py` (line ~255) with:

```python
# Send actual email
try:
    import sendgrid
    from sendgrid.helpers.mail import Mail, Email, To, Content
    
    sg = sendgrid.SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
    
    from_email = Email(os.environ.get('FROM_EMAIL', 'noreply@bhoomigroups.com'))
    to_email = To(os.environ.get('NOTIFICATION_EMAIL', 'bhoomi.info@bhoomigroups.com'))
    subject = f"New Newsletter Subscription - {subscription.email}"
    content = Content("text/plain", email_body)
    
    mail = Mail(from_email, to_email, subject, content)
    response = sg.client.mail.send.post(request_body=mail.get())
    
    logger.info(f"Email sent successfully: Status {response.status_code}")
    
except Exception as e:
    logger.error(f"Error sending email: {str(e)}")
```

---

### Option 2: AWS SES (Amazon Simple Email Service)

**Step 1: AWS Setup**
1. Create AWS account
2. Verify domain or email in SES
3. Get AWS credentials

**Step 2: Install boto3**
```bash
pip install boto3
pip freeze > requirements.txt
```

**Step 3: Add to .env**
```bash
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
```

**Step 4: Code Integration**
```python
import boto3

ses_client = boto3.client(
    'ses',
    region_name=os.environ.get('AWS_REGION'),
    aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY')
)

response = ses_client.send_email(
    Source='noreply@bhoomigroups.com',
    Destination={'ToAddresses': ['bhoomi.info@bhoomigroups.com']},
    Message={
        'Subject': {'Data': email_subject},
        'Body': {'Text': {'Data': email_body}}
    }
)
```

---

### Option 3: SMTP (Traditional Email)

**Add to .env:**
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
```

**Code:**
```python
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

msg = MIMEMultipart()
msg['From'] = os.environ.get('SMTP_USER')
msg['To'] = 'bhoomi.info@bhoomigroups.com'
msg['Subject'] = email_subject
msg.attach(MIMEText(email_body, 'plain'))

server = smtplib.SMTP(os.environ.get('SMTP_HOST'), int(os.environ.get('SMTP_PORT')))
server.starttls()
server.login(os.environ.get('SMTP_USER'), os.environ.get('SMTP_PASSWORD'))
server.send_message(msg)
server.quit()
```

---

## 📱 Help Desk Contact Information

### Current Contact Details
The website displays:
- **Phone**: +91-9876543210 (Update this in `/app/frontend/src/components/FormsSection.js`)
- **Email**: bhoomi.info@bhoomigroups.com

### To Update Contact Information

Edit `/app/frontend/src/components/FormsSection.js`:

```javascript
const helpDeskPhone = '+91-YOUR-ACTUAL-NUMBER';
const helpDeskEmail = 'bhoomi.info@bhoomigroups.com';
```

The phone number is clickable and will:
- On mobile: Open the phone dialer
- On desktop: Prompt to call using a calling app

The email is also clickable and will:
- Open the default email client with pre-filled recipient

---

## 🎯 Admin Panel Features

### View Newsletter Subscriptions

**Endpoint:**
```
GET /api/admin/newsletter/subscriptions
```

**Usage:**
1. Login to admin panel
2. Get JWT token
3. Call endpoint with Authorization header

**Example:**
```bash
curl -X GET "https://your-backend/api/admin/newsletter/subscriptions" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Delete/Unsubscribe

**Endpoint:**
```
DELETE /api/admin/newsletter/subscriptions/{subscription_id}
```

---

## 📋 Frontend Newsletter Form

**Location**: Footer section on all pages

**Fields:**
- Name (optional)
- Email (required)
- Phone (required, 10 digits)

**Validation:**
- Email format validation
- Phone number must be exactly 10 digits
- Toast notification on success/error

**User Experience:**
- Form clears on successful submission
- Success message: "Thank you for subscribing!"
- Error messages displayed for failures
- Loading state while processing

---

## 🔐 Security Considerations

1. **API Keys**: Never commit API keys to Git
   - Use environment variables
   - Add to `.gitignore`

2. **Email Verification**: Consider adding double opt-in
   - Send confirmation email to subscriber
   - Require click to confirm subscription

3. **Rate Limiting**: Prevent spam submissions
   - Add rate limiting to newsletter endpoint
   - Use CAPTCHA for public forms

4. **GDPR Compliance**:
   - Add privacy policy link
   - Include unsubscribe mechanism
   - Store consent timestamp

---

## 📊 Testing

### Test Newsletter Subscription

**Using curl:**
```bash
curl -X POST "https://your-backend/api/newsletter/subscribe" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "phone": "9876543210",
    "name": "Test User"
  }'
```

**Using frontend:**
1. Visit website
2. Scroll to footer
3. Fill newsletter form
4. Submit
5. Check MongoDB for entry
6. Check email (when configured)

---

## 🚀 Deployment Checklist

- [ ] Choose email service provider (SendGrid/AWS SES/SMTP)
- [ ] Get API keys/credentials
- [ ] Add credentials to production .env
- [ ] Update FROM_EMAIL and NOTIFICATION_EMAIL
- [ ] Update help desk phone number
- [ ] Test email sending in production
- [ ] Monitor email delivery logs
- [ ] Set up email templates (optional)

---

## 📞 Current Contact Information Summary

**Newsletter Notifications Sent To:**
- bhoomi.info@bhoomigroups.com

**Help Desk Contact:**
- Phone: +91-9876543210 (Update in FormsSection.js)
- Email: bhoomi.info@bhoomigroups.com

**Zoho Forms:**
- Help Desk Form: (embedded iframe)
- Dealer Enquiry Form: (embedded iframe)

---

**Ready to collect leads and engage with customers! 🎉**
