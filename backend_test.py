import requests
import sys
import json
from datetime import datetime

class BhoomiGroupsAPITester:
    def __init__(self, base_url="https://bhoomi-fullstack.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.admin_email = "admin@bhoomigroups.com"
        self.admin_password = "Admin@123"

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'
        
        if headers:
            test_headers.update(headers)

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers, timeout=30)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                    return True, response_data
                except:
                    return True, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Error: {response.text}")
                return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test API health check"""
        return self.run_test("API Health Check", "GET", "", 200)

    def test_admin_login(self):
        """Test admin login and get token"""
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "admin/login",
            200,
            data={"email": self.admin_email, "password": self.admin_password}
        )
        if success and 'access_token' in response:
            self.token = response['access_token']
            print(f"   Token obtained: {self.token[:20]}...")
            return True
        return False

    def test_admin_verify(self):
        """Test admin token verification"""
        if not self.token:
            print("❌ No token available for verification")
            return False
        
        return self.run_test("Admin Token Verification", "GET", "admin/verify", 200)

    def test_get_published_posts(self):
        """Test getting published blog posts"""
        return self.run_test("Get Published Blog Posts", "GET", "blog/posts", 200)

    def test_get_all_posts_admin(self):
        """Test getting all blog posts (admin)"""
        if not self.token:
            print("❌ No token available for admin posts")
            return False
        
        return self.run_test("Get All Blog Posts (Admin)", "GET", "admin/blog/posts", 200)

    def test_create_blog_post(self):
        """Test creating a new blog post"""
        if not self.token:
            print("❌ No token available for creating post")
            return False

        test_post = {
            "title_en": "Test Blog Post",
            "title_hi": "परीक्षण ब्लॉग पोस्ट",
            "content_en": "This is a test blog post content in English.",
            "content_hi": "यह अंग्रेजी में एक परीक्षण ब्लॉग पोस्ट सामग्री है।",
            "excerpt_en": "Test excerpt in English",
            "excerpt_hi": "हिंदी में परीक्षण अंश",
            "image_url": "https://images.unsplash.com/photo-1768984418592-5b54e4fe7af5",
            "author": "Test Author",
            "category": "Testing",
            "tags": ["test", "automation"],
            "published": True
        }

        success, response = self.run_test(
            "Create Blog Post",
            "POST",
            "admin/blog/posts",
            200,
            data=test_post
        )
        
        if success and 'id' in response:
            self.test_post_id = response['id']
            return True
        return False

    def test_get_single_post(self):
        """Test getting a single blog post"""
        if not hasattr(self, 'test_post_id'):
            print("❌ No test post ID available")
            return False
        
        return self.run_test(
            "Get Single Blog Post",
            "GET",
            f"blog/posts/{self.test_post_id}",
            200
        )

    def test_update_blog_post(self):
        """Test updating a blog post"""
        if not self.token or not hasattr(self, 'test_post_id'):
            print("❌ No token or test post ID available")
            return False

        update_data = {
            "title_en": "Updated Test Blog Post",
            "published": False
        }

        return self.run_test(
            "Update Blog Post",
            "PUT",
            f"admin/blog/posts/{self.test_post_id}",
            200,
            data=update_data
        )

    def test_delete_blog_post(self):
        """Test deleting a blog post"""
        if not self.token or not hasattr(self, 'test_post_id'):
            print("❌ No token or test post ID available")
            return False

        return self.run_test(
            "Delete Blog Post",
            "DELETE",
            f"admin/blog/posts/{self.test_post_id}",
            200
        )

def main():
    print("🚀 Starting Bhoomi Groups API Testing...")
    print("=" * 60)
    
    tester = BhoomiGroupsAPITester()
    
    # Test sequence
    tests = [
        ("API Health Check", tester.test_health_check),
        ("Admin Login", tester.test_admin_login),
        ("Admin Token Verification", tester.test_admin_verify),
        ("Get Published Posts", tester.test_get_published_posts),
        ("Get All Posts (Admin)", tester.test_get_all_posts_admin),
        ("Create Blog Post", tester.test_create_blog_post),
        ("Get Single Post", tester.test_get_single_post),
        ("Update Blog Post", tester.test_update_blog_post),
        ("Delete Blog Post", tester.test_delete_blog_post),
    ]
    
    failed_tests = []
    
    for test_name, test_func in tests:
        try:
            success = test_func()
            if not success:
                failed_tests.append(test_name)
        except Exception as e:
            print(f"❌ {test_name} - Exception: {str(e)}")
            failed_tests.append(test_name)
    
    # Print results
    print("\n" + "=" * 60)
    print(f"📊 Test Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if failed_tests:
        print(f"❌ Failed tests: {', '.join(failed_tests)}")
        return 1
    else:
        print("✅ All tests passed!")
        return 0

if __name__ == "__main__":
    sys.exit(main())