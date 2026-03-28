import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Pencil, Trash, SignOut } from '@phosphor-icons/react';

export const AdminDashboard = () => {
  const { admin, token, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title_en: '',
    title_hi: '',
    content_en: '',
    content_hi: '',
    excerpt_en: '',
    excerpt_hi: '',
    image_url: '',
    author: '',
    category: '',
    tags: '',
    published: false
  });

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const API = `${BACKEND_URL}/api`;

  useEffect(() => {
    if (!authLoading && !admin) {
      navigate('/admin');
    }
  }, [admin, authLoading, navigate]);

  useEffect(() => {
    if (admin && token) {
      fetchPosts();
    }
  }, [admin, token]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API}/admin/blog/posts`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const postData = {
        ...formData,
        tags: tagsArray
      };

      await axios.post(`${API}/admin/blog/posts`, postData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Post created successfully!');
      setShowCreateModal(false);
      resetForm();
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
      const postData = {
        ...formData,
        tags: tagsArray
      };

      await axios.put(`${API}/admin/blog/posts/${editingPost.id}`, postData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Post updated successfully!');
      setShowEditModal(false);
      setEditingPost(null);
      resetForm();
      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      await axios.delete(`${API}/admin/blog/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Post deleted successfully!');
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  const openEditModal = (post) => {
    setEditingPost(post);
    setFormData({
      title_en: post.title_en,
      title_hi: post.title_hi || '',
      content_en: post.content_en,
      content_hi: post.content_hi || '',
      excerpt_en: post.excerpt_en,
      excerpt_hi: post.excerpt_hi || '',
      image_url: post.image_url,
      author: post.author,
      category: post.category,
      tags: post.tags.join(', '),
      published: post.published
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      title_en: '',
      title_hi: '',
      content_en: '',
      content_hi: '',
      excerpt_en: '',
      excerpt_hi: '',
      image_url: '',
      author: '',
      category: '',
      tags: '',
      published: false
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  if (authLoading || !admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F0E5]">
      <Header />
      <main className="py-24 md:py-32">
        <div className="px-6 md:px-12 lg:px-24">
          {/* Dashboard Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-[#3A339B] mb-2" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
                Admin Dashboard
              </h1>
              <p className="text-[#6C4025]">Manage your blog posts and FAQs</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/admin/faqs"
                className="inline-flex items-center px-6 py-3 bg-[#3A339B] hover:bg-[#2A2370] text-white font-medium"
                data-testid="manage-faqs-link"
              >
                Manage FAQs
              </Link>
              <Button 
                onClick={() => setShowCreateModal(true)}
                className="bg-[#E67E22] hover:bg-[#D35400] text-white"
                data-testid="create-post-button"
              >
                <Plus size={20} weight="bold" className="mr-2" />
                New Post
              </Button>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="border-[#3A339B] text-[#3A339B] hover:bg-[#3A339B] hover:text-white"
                data-testid="logout-button"
              >
                <SignOut size={20} weight="bold" className="mr-2" />
                Logout
              </Button>
            </div>
          </div>

          {/* Posts List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="text-[#6C4025]">Loading...</div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 bg-white p-12 border border-[rgba(58,51,155,0.2)]">
              <div className="text-[#6C4025] mb-4">No blog posts yet. Create your first post!</div>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div 
                  key={post.id} 
                  className="bg-white p-6 border border-[rgba(58,51,155,0.2)] hover:border-[#E67E22] transition-colors"
                  data-testid={`post-item-${post.id}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-[#3A339B]" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
                          {post.title_en}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium ${post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-sm text-[#6C4025] mb-2">{post.excerpt_en}</p>
                      <div className="flex items-center space-x-4 text-xs text-[#6C4025]">
                        <span>Category: {post.category}</span>
                        <span>Author: {post.author}</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button 
                        onClick={() => openEditModal(post)}
                        size="sm"
                        variant="outline"
                        className="border-[#3A339B] text-[#3A339B] hover:bg-[#3A339B] hover:text-white"
                        data-testid={`edit-post-${post.id}`}
                      >
                        <Pencil size={16} weight="bold" />
                      </Button>
                      <Button 
                        onClick={() => handleDeletePost(post.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        data-testid={`delete-post-${post.id}`}
                      >
                        <Trash size={16} weight="bold" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Create Post Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#3A339B]" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
              Create New Post
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreatePost} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title_en">Title (English) *</Label>
                <Input
                  id="title_en"
                  value={formData.title_en}
                  onChange={(e) => setFormData({...formData, title_en: e.target.value})}
                  required
                  data-testid="create-title-en"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title_hi">Title (Hindi)</Label>
                <Input
                  id="title_hi"
                  value={formData.title_hi}
                  onChange={(e) => setFormData({...formData, title_hi: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="excerpt_en">Excerpt (English) *</Label>
                <Textarea
                  id="excerpt_en"
                  value={formData.excerpt_en}
                  onChange={(e) => setFormData({...formData, excerpt_en: e.target.value})}
                  required
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt_hi">Excerpt (Hindi)</Label>
                <Textarea
                  id="excerpt_hi"
                  value={formData.excerpt_hi}
                  onChange={(e) => setFormData({...formData, excerpt_hi: e.target.value})}
                  rows={3}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="content_en">Content (English) *</Label>
                <Textarea
                  id="content_en"
                  value={formData.content_en}
                  onChange={(e) => setFormData({...formData, content_en: e.target.value})}
                  required
                  rows={8}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content_hi">Content (Hindi)</Label>
                <Textarea
                  id="content_hi"
                  value={formData.content_hi}
                  onChange={(e) => setFormData({...formData, content_hi: e.target.value})}
                  rows={8}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL *</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                required
                placeholder="https://..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                placeholder="infrastructure, construction, agriculture"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({...formData, published: checked})}
              />
              <Label htmlFor="published">Publish immediately</Label>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-[#E67E22] hover:bg-[#D35400] text-white"
                data-testid="submit-create-post"
              >
                Create Post
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Post Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#3A339B]" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
              Edit Post
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdatePost} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_title_en">Title (English) *</Label>
                <Input
                  id="edit_title_en"
                  value={formData.title_en}
                  onChange={(e) => setFormData({...formData, title_en: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_title_hi">Title (Hindi)</Label>
                <Input
                  id="edit_title_hi"
                  value={formData.title_hi}
                  onChange={(e) => setFormData({...formData, title_hi: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_excerpt_en">Excerpt (English) *</Label>
                <Textarea
                  id="edit_excerpt_en"
                  value={formData.excerpt_en}
                  onChange={(e) => setFormData({...formData, excerpt_en: e.target.value})}
                  required
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_excerpt_hi">Excerpt (Hindi)</Label>
                <Textarea
                  id="edit_excerpt_hi"
                  value={formData.excerpt_hi}
                  onChange={(e) => setFormData({...formData, excerpt_hi: e.target.value})}
                  rows={3}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_content_en">Content (English) *</Label>
                <Textarea
                  id="edit_content_en"
                  value={formData.content_en}
                  onChange={(e) => setFormData({...formData, content_en: e.target.value})}
                  required
                  rows={8}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_content_hi">Content (Hindi)</Label>
                <Textarea
                  id="edit_content_hi"
                  value={formData.content_hi}
                  onChange={(e) => setFormData({...formData, content_hi: e.target.value})}
                  rows={8}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit_image_url">Image URL *</Label>
              <Input
                id="edit_image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                required
                placeholder="https://..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_author">Author *</Label>
                <Input
                  id="edit_author"
                  value={formData.author}
                  onChange={(e) => setFormData({...formData, author: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_category">Category *</Label>
                <Input
                  id="edit_category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit_tags">Tags (comma-separated)</Label>
              <Input
                id="edit_tags"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                placeholder="infrastructure, construction, agriculture"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="edit_published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({...formData, published: checked})}
              />
              <Label htmlFor="edit_published">Published</Label>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  setShowEditModal(false);
                  setEditingPost(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-[#E67E22] hover:bg-[#D35400] text-white"
                data-testid="submit-edit-post"
              >
                Update Post
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
