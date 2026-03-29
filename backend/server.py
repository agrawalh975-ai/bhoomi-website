from fastapi import FastAPI, APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt
import bcrypt


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# JWT configuration
JWT_SECRET = os.environ.get('JWT_SECRET', 'bhoomi-secret-key-change-in-production')
JWT_ALGORITHM = 'HS256'
JWT_EXPIRATION_HOURS = 24

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

security = HTTPBearer()


# Admin Model
class Admin(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    password_hash: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class AdminCreate(BaseModel):
    email: EmailStr
    password: str


# Blog Post Model
class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title_en: str
    title_hi: Optional[str] = None
    content_en: str
    content_hi: Optional[str] = None
    excerpt_en: str
    excerpt_hi: Optional[str] = None
    image_url: str
    author: str
    category: str
    tags: List[str] = []
    published: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# FAQ Model
class FAQ(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    question_en: str
    question_hi: Optional[str] = None
    answer_en: str
    answer_hi: Optional[str] = None
    category: str
    order: int = 0
    published: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Newsletter Subscription Model
class NewsletterSubscription(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    phone: str
    name: Optional[str] = None
    subscribed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    active: bool = True

class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr
    phone: str
    name: Optional[str] = None

class FAQCreate(BaseModel):
    question_en: str
    question_hi: Optional[str] = None
    answer_en: str
    answer_hi: Optional[str] = None
    category: str
    order: int = 0
    published: bool = False

class FAQUpdate(BaseModel):
    question_en: Optional[str] = None
    question_hi: Optional[str] = None
    answer_en: Optional[str] = None
    answer_hi: Optional[str] = None
    category: Optional[str] = None
    order: Optional[int] = None
    published: Optional[bool] = None

class BlogPostCreate(BaseModel):
    title_en: str
    title_hi: Optional[str] = None
    content_en: str
    content_hi: Optional[str] = None
    excerpt_en: str
    excerpt_hi: Optional[str] = None
    image_url: str
    author: str
    category: str
    tags: List[str] = []
    published: bool = False

class BlogPostUpdate(BaseModel):
    title_en: Optional[str] = None
    title_hi: Optional[str] = None
    content_en: Optional[str] = None
    content_hi: Optional[str] = None
    excerpt_en: Optional[str] = None
    excerpt_hi: Optional[str] = None
    image_url: Optional[str] = None
    author: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    published: Optional[bool] = None


# Auth Helpers
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        email = payload.get("email")
        if email is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
        return email
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")


# Admin Routes
@api_router.post("/admin/create")
async def create_admin(admin: AdminCreate):
    """Create an admin account (for initial setup)"""
    existing = await db.admins.find_one({"email": admin.email}, {"_id": 0})
    if existing:
        raise HTTPException(status_code=400, detail="Admin already exists")
    
    admin_obj = Admin(
        email=admin.email,
        password_hash=hash_password(admin.password)
    )
    
    doc = admin_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.admins.insert_one(doc)
    return {"message": "Admin created successfully", "email": admin.email}

@api_router.post("/admin/login")
async def admin_login(credentials: AdminLogin):
    """Admin login"""
    admin = await db.admins.find_one({"email": credentials.email}, {"_id": 0})
    if not admin or not verify_password(credentials.password, admin['password_hash']):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_access_token({"email": admin['email']})
    return {"access_token": token, "token_type": "bearer", "email": admin['email']}

@api_router.get("/admin/verify")
async def verify_admin(email: str = Depends(verify_token)):
    """Verify admin token"""
    return {"email": email, "valid": True}


# Blog Routes (Public)
@api_router.get("/blog/posts", response_model=List[BlogPost])
async def get_published_posts():
    """Get all published blog posts"""
    posts = await db.blog_posts.find({"published": True}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    
    for post in posts:
        if isinstance(post['created_at'], str):
            post['created_at'] = datetime.fromisoformat(post['created_at'])
        if isinstance(post['updated_at'], str):
            post['updated_at'] = datetime.fromisoformat(post['updated_at'])
    
    return posts

@api_router.get("/blog/posts/{post_id}", response_model=BlogPost)
async def get_post(post_id: str):
    """Get a single blog post by ID"""
    post = await db.blog_posts.find_one({"id": post_id, "published": True}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    if isinstance(post['created_at'], str):
        post['created_at'] = datetime.fromisoformat(post['created_at'])
    if isinstance(post['updated_at'], str):
        post['updated_at'] = datetime.fromisoformat(post['updated_at'])
    
    return post


# Blog Routes (Admin - Protected)
@api_router.get("/admin/blog/posts", response_model=List[BlogPost])
async def get_all_posts_admin(email: str = Depends(verify_token)):
    """Get all blog posts (published and unpublished) - Admin only"""
    posts = await db.blog_posts.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    
    for post in posts:
        if isinstance(post['created_at'], str):
            post['created_at'] = datetime.fromisoformat(post['created_at'])
        if isinstance(post['updated_at'], str):
            post['updated_at'] = datetime.fromisoformat(post['updated_at'])
    
    return posts

@api_router.post("/admin/blog/posts", response_model=BlogPost)
async def create_post(post: BlogPostCreate, email: str = Depends(verify_token)):
    """Create a new blog post - Admin only"""
    post_obj = BlogPost(**post.model_dump())
    
    doc = post_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    
    await db.blog_posts.insert_one(doc)
    return post_obj

@api_router.put("/admin/blog/posts/{post_id}", response_model=BlogPost)
async def update_post(post_id: str, post_update: BlogPostUpdate, email: str = Depends(verify_token)):
    """Update a blog post - Admin only"""
    existing_post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if not existing_post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    update_data = {k: v for k, v in post_update.model_dump().items() if v is not None}
    update_data['updated_at'] = datetime.now(timezone.utc).isoformat()
    
    await db.blog_posts.update_one({"id": post_id}, {"$set": update_data})
    
    updated_post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if isinstance(updated_post['created_at'], str):
        updated_post['created_at'] = datetime.fromisoformat(updated_post['created_at'])
    if isinstance(updated_post['updated_at'], str):
        updated_post['updated_at'] = datetime.fromisoformat(updated_post['updated_at'])
    
    return updated_post

@api_router.delete("/admin/blog/posts/{post_id}")
async def delete_post(post_id: str, email: str = Depends(verify_token)):
    """Delete a blog post - Admin only"""
    result = await db.blog_posts.delete_one({"id": post_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return {"message": "Post deleted successfully"}


# FAQ Routes (Public)
@api_router.get("/faqs", response_model=List[FAQ])
async def get_published_faqs():
    """Get all published FAQs"""
    faqs = await db.faqs.find({"published": True}, {"_id": 0}).sort("order", 1).to_list(1000)
    
    for faq in faqs:
        if isinstance(faq['created_at'], str):
            faq['created_at'] = datetime.fromisoformat(faq['created_at'])
        if isinstance(faq['updated_at'], str):
            faq['updated_at'] = datetime.fromisoformat(faq['updated_at'])
    
    return faqs


# FAQ Routes (Admin - Protected)
@api_router.get("/admin/faqs", response_model=List[FAQ])
async def get_all_faqs_admin(email: str = Depends(verify_token)):
    """Get all FAQs (published and unpublished) - Admin only"""
    faqs = await db.faqs.find({}, {"_id": 0}).sort("order", 1).to_list(1000)
    
    for faq in faqs:
        if isinstance(faq['created_at'], str):
            faq['created_at'] = datetime.fromisoformat(faq['created_at'])
        if isinstance(faq['updated_at'], str):
            faq['updated_at'] = datetime.fromisoformat(faq['updated_at'])
    
    return faqs

@api_router.post("/admin/faqs", response_model=FAQ)
async def create_faq(faq: FAQCreate, email: str = Depends(verify_token)):
    """Create a new FAQ - Admin only"""
    faq_obj = FAQ(**faq.model_dump())
    
    doc = faq_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    doc['updated_at'] = doc['updated_at'].isoformat()
    
    await db.faqs.insert_one(doc)
    return faq_obj

@api_router.put("/admin/faqs/{faq_id}", response_model=FAQ)
async def update_faq(faq_id: str, faq_update: FAQUpdate, email: str = Depends(verify_token)):
    """Update a FAQ - Admin only"""
    existing_faq = await db.faqs.find_one({"id": faq_id}, {"_id": 0})
    if not existing_faq:
        raise HTTPException(status_code=404, detail="FAQ not found")
    
    update_data = {k: v for k, v in faq_update.model_dump().items() if v is not None}
    update_data['updated_at'] = datetime.now(timezone.utc).isoformat()
    
    await db.faqs.update_one({"id": faq_id}, {"$set": update_data})
    
    updated_faq = await db.faqs.find_one({"id": faq_id}, {"_id": 0})
    if isinstance(updated_faq['created_at'], str):
        updated_faq['created_at'] = datetime.fromisoformat(updated_faq['created_at'])
    if isinstance(updated_faq['updated_at'], str):
        updated_faq['updated_at'] = datetime.fromisoformat(updated_faq['updated_at'])
    
    return updated_faq

@api_router.delete("/admin/faqs/{faq_id}")
async def delete_faq(faq_id: str, email: str = Depends(verify_token)):
    """Delete a FAQ - Admin only"""
    result = await db.faqs.delete_one({"id": faq_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="FAQ not found")
    return {"message": "FAQ deleted successfully"}


# Newsletter Subscription Routes (Public)
@api_router.post("/newsletter/subscribe")
async def subscribe_newsletter(subscription: NewsletterSubscriptionCreate):
    """Subscribe to newsletter - Public endpoint"""
    # Check if email already subscribed
    existing = await db.newsletter_subscriptions.find_one({"email": subscription.email}, {"_id": 0})
    if existing and existing.get('active'):
        raise HTTPException(status_code=400, detail="This email is already subscribed")
    
    # Create subscription
    sub_obj = NewsletterSubscription(**subscription.model_dump())
    doc = sub_obj.model_dump()
    doc['subscribed_at'] = doc['subscribed_at'].isoformat()
    
    await db.newsletter_subscriptions.insert_one(doc)
    
    # Send notification email to bhoomi.info@bhoomigroups.com
    try:
        # Email notification content
        email_subject = f"New Newsletter Subscription - {subscription.email}"
        email_body = f"""
New Newsletter Subscription Received

Email: {subscription.email}
Phone: {subscription.phone}
Name: {subscription.name if subscription.name else 'Not provided'}
Subscribed At: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S UTC')}

---
This is an automated notification from Bhoomi Groups Website
"""
        
        # Log the subscription (in production, send actual email)
        logger.info(f"Newsletter Subscription: {subscription.email} - Phone: {subscription.phone}")
        logger.info(f"Email notification would be sent to: bhoomi.info@bhoomigroups.com")
        logger.info(f"Subject: {email_subject}")
        logger.info(f"Body: {email_body}")
        
        # TODO: Integrate actual email service (SendGrid, AWS SES, etc.)
        # Example with SendGrid:
        # import sendgrid
        # sg = sendgrid.SendGridAPIClient(api_key=os.environ.get('SENDGRID_API_KEY'))
        # message = Mail(
        #     from_email='noreply@bhoomigroups.com',
        #     to_emails='bhoomi.info@bhoomigroups.com',
        #     subject=email_subject,
        #     plain_text_content=email_body
        # )
        # sg.send(message)
        
    except Exception as e:
        logger.error(f"Error sending notification email: {str(e)}")
    
    return {
        "message": "Subscription successful! You will receive updates from Bhoomi Groups.",
        "email": subscription.email
    }


@api_router.get("/admin/newsletter/subscriptions", response_model=List[NewsletterSubscription])
async def get_all_subscriptions(email: str = Depends(verify_token)):
    """Get all newsletter subscriptions - Admin only"""
    subscriptions = await db.newsletter_subscriptions.find({}, {"_id": 0}).sort("subscribed_at", -1).to_list(1000)
    
    for sub in subscriptions:
        if isinstance(sub['subscribed_at'], str):
            sub['subscribed_at'] = datetime.fromisoformat(sub['subscribed_at'])
    
    return subscriptions


@api_router.delete("/admin/newsletter/subscriptions/{subscription_id}")
async def delete_subscription(subscription_id: str, email: str = Depends(verify_token)):
    """Delete/Unsubscribe a newsletter subscription - Admin only"""
    result = await db.newsletter_subscriptions.update_one(
        {"id": subscription_id},
        {"$set": {"active": False}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return {"message": "Subscription removed successfully"}


# Health check
@api_router.get("/")
async def root():
    return {"message": "Bhoomi Groups API is running"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
