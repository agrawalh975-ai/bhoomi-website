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
import { Plus, Pencil, Trash, ArrowLeft } from '@phosphor-icons/react';

export const AdminFAQ = () => {
  const { admin, token, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);
  const [formData, setFormData] = useState({
    question_en: '',
    question_hi: '',
    answer_en: '',
    answer_hi: '',
    category: '',
    order: 0,
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
      fetchFaqs();
    }
  }, [admin, token]);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get(`${API}/admin/faqs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFaqs(response.data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      toast.error('Failed to fetch FAQs');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFaq = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/admin/faqs`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('FAQ created successfully!');
      setShowCreateModal(false);
      resetForm();
      fetchFaqs();
    } catch (error) {
      console.error('Error creating FAQ:', error);
      toast.error('Failed to create FAQ');
    }
  };

  const handleUpdateFaq = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/admin/faqs/${editingFaq.id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('FAQ updated successfully!');
      setShowEditModal(false);
      setEditingFaq(null);
      resetForm();
      fetchFaqs();
    } catch (error) {
      console.error('Error updating FAQ:', error);
      toast.error('Failed to update FAQ');
    }
  };

  const handleDeleteFaq = async (faqId) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) {
      return;
    }

    try {
      await axios.delete(`${API}/admin/faqs/${faqId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('FAQ deleted successfully!');
      fetchFaqs();
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast.error('Failed to delete FAQ');
    }
  };

  const openEditModal = (faq) => {
    setEditingFaq(faq);
    setFormData({
      question_en: faq.question_en,
      question_hi: faq.question_hi || '',
      answer_en: faq.answer_en,
      answer_hi: faq.answer_hi || '',
      category: faq.category,
      order: faq.order,
      published: faq.published
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({
      question_en: '',
      question_hi: '',
      answer_en: '',
      answer_hi: '',
      category: '',
      order: 0,
      published: false
    });
  };

  if (authLoading || !admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F0E5]">
      <Header />
      <main className="py-24 md:py-32">
        <div className="px-6 md:px-12 lg:px-24">
          {/* Header */}
          <div className="flex justify-between items-center mb-12">
            <div>
              <Link 
                to="/admin/dashboard"
                className="inline-flex items-center space-x-2 text-[#3A339B] hover:text-[#E67E22] mb-4"
              >
                <ArrowLeft size={20} weight="bold" />
                <span>Back to Dashboard</span>
              </Link>
              <h1 className="text-4xl sm:text-5xl font-black text-[#3A339B] mb-2" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
                FAQ Management
              </h1>
              <p className="text-[#6C4025]">Manage frequently asked questions</p>
            </div>
            <Button 
              onClick={() => setShowCreateModal(true)}
              className="bg-[#E67E22] hover:bg-[#D35400] text-white"
              data-testid="create-faq-button"
            >
              <Plus size={20} weight="bold" className="mr-2" />
              New FAQ
            </Button>
          </div>

          {/* FAQs List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="text-[#6C4025]">Loading...</div>
            </div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-12 bg-white p-12 border border-[#3A339B]">
              <div className="text-[#6C4025] mb-4">No FAQs yet. Create your first FAQ!</div>
            </div>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div 
                  key={faq.id} 
                  className="bg-white p-6 border border-[#3A339B] hover:border-[#E67E22] transition-colors"
                  data-testid={`faq-item-${faq.id}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="px-3 py-1 text-xs bg-[#E67E22] text-white font-medium">{faq.category}</span>
                        <span className="px-3 py-1 text-xs bg-gray-200 text-gray-800 font-medium">Order: {faq.order}</span>
                        <span className={`px-2 py-1 text-xs font-medium ${faq.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {faq.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-[#3A339B] mb-2" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
                        {faq.question_en}
                      </h3>
                      <p className="text-sm text-[#6C4025] line-clamp-2">{faq.answer_en}</p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Button 
                        onClick={() => openEditModal(faq)}
                        size="sm"
                        variant="outline"
                        className="border-[#3A339B] text-[#3A339B] hover:bg-[#3A339B] hover:text-white"
                        data-testid={`edit-faq-${faq.id}`}
                      >
                        <Pencil size={16} weight="bold" />
                      </Button>
                      <Button 
                        onClick={() => handleDeleteFaq(faq.id)}
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        data-testid={`delete-faq-${faq.id}`}
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

      {/* Create FAQ Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#3A339B]" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
              Create New FAQ
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateFaq} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="question_en">Question (English) *</Label>
                <Input
                  id="question_en"
                  value={formData.question_en}
                  onChange={(e) => setFormData({...formData, question_en: e.target.value})}
                  required
                  data-testid="create-question-en"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="question_hi">Question (Hindi)</Label>
                <Input
                  id="question_hi"
                  value={formData.question_hi}
                  onChange={(e) => setFormData({...formData, question_hi: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="answer_en">Answer (English) *</Label>
                <Textarea
                  id="answer_en"
                  value={formData.answer_en}
                  onChange={(e) => setFormData({...formData, answer_en: e.target.value})}
                  required
                  rows={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="answer_hi">Answer (Hindi)</Label>
                <Textarea
                  id="answer_hi"
                  value={formData.answer_hi}
                  onChange={(e) => setFormData({...formData, answer_hi: e.target.value})}
                  rows={5}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                  placeholder="e.g., Products, Installation, Support"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                  min="0"
                />
              </div>
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
                data-testid="submit-create-faq"
              >
                Create FAQ
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit FAQ Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#3A339B]" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
              Edit FAQ
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateFaq} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_question_en">Question (English) *</Label>
                <Input
                  id="edit_question_en"
                  value={formData.question_en}
                  onChange={(e) => setFormData({...formData, question_en: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_question_hi">Question (Hindi)</Label>
                <Input
                  id="edit_question_hi"
                  value={formData.question_hi}
                  onChange={(e) => setFormData({...formData, question_hi: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_answer_en">Answer (English) *</Label>
                <Textarea
                  id="edit_answer_en"
                  value={formData.answer_en}
                  onChange={(e) => setFormData({...formData, answer_en: e.target.value})}
                  required
                  rows={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_answer_hi">Answer (Hindi)</Label>
                <Textarea
                  id="edit_answer_hi"
                  value={formData.answer_hi}
                  onChange={(e) => setFormData({...formData, answer_hi: e.target.value})}
                  rows={5}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit_category">Category *</Label>
                <Input
                  id="edit_category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit_order">Display Order</Label>
                <Input
                  id="edit_order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                  min="0"
                />
              </div>
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
                  setEditingFaq(null);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-[#E67E22] hover:bg-[#D35400] text-white"
                data-testid="submit-edit-faq"
              >
                Update FAQ
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
