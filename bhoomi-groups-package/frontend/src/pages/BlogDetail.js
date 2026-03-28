import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ArrowLeft, CalendarBlank, User, Tag } from '@phosphor-icons/react';

export const BlogDetail = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const API = `${BACKEND_URL}/api`;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API}/blog/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F0E5]">
        <Header />
        <div className="py-24 text-center">
          <div className="text-[#6C4025]">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F5F0E5]">
        <Header />
        <div className="py-24 text-center">
          <div className="text-[#6C4025]">Post not found.</div>
        </div>
        <Footer />
      </div>
    );
  }

  const getTitle = () => {
    return i18n.language === 'hi' && post.title_hi ? post.title_hi : post.title_en;
  };

  const getContent = () => {
    return i18n.language === 'hi' && post.content_hi ? post.content_hi : post.content_en;
  };

  return (
    <div className="min-h-screen bg-[#F5F0E5]">
      <Header />
      <main className="py-24 md:py-32">
        <article className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
          {/* Back Link */}
          <Link 
            to="/blog" 
            className="inline-flex items-center space-x-2 text-[#3A339B] hover:text-[#E67E22] transition-colors mb-8 font-medium"
            data-testid="back-to-blog"
          >
            <ArrowLeft size={20} weight="bold" />
            <span>{t('blog.backToBlog')}</span>
          </Link>

          {/* Featured Image */}
          <div className="relative h-96 mb-8 overflow-hidden">
            <img 
              src={post.image_url} 
              alt={getTitle()}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Post Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#6C4025] mb-6">
            <span className="inline-flex items-center space-x-2 uppercase tracking-wider font-medium text-[#E67E22]">
              <Tag size={16} weight="duotone" />
              <span>{post.category}</span>
            </span>
            <span className="inline-flex items-center space-x-2">
              <CalendarBlank size={16} />
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </span>
            <span className="inline-flex items-center space-x-2">
              <User size={16} />
              <span>{post.author}</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-black text-[#3A339B] mb-8" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
            {getTitle()}
          </h1>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none text-[#6C4025] leading-relaxed" 
            style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
          >
            {getContent().split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[rgba(58,51,155,0.2)]">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-[#3A339B]" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
                  {t('blog.tags')}:
                </span>
                {post.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 text-xs bg-white border border-[rgba(58,51,155,0.2)] text-[#3A339B] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
};
