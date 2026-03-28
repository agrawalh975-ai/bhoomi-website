import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CalendarBlank, ArrowRight } from '@phosphor-icons/react';

export const BlogList = () => {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const API = `${BACKEND_URL}/api`;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API}/blog/posts`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const getTitle = (post) => {
    return i18n.language === 'hi' && post.title_hi ? post.title_hi : post.title_en;
  };

  const getExcerpt = (post) => {
    return i18n.language === 'hi' && post.excerpt_hi ? post.excerpt_hi : post.excerpt_en;
  };

  return (
    <div className="min-h-screen bg-[#F5F0E5]">
      <Header />
      <main className="py-24 md:py-32">
        <div className="px-6 md:px-12 lg:px-24">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="uppercase text-xs sm:text-sm tracking-[0.2em] font-semibold text-[#E67E22] mb-4">
              {t('blog.subtitle')}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-black text-[#3A339B] mb-6" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
              {t('blog.title')}
            </h1>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="text-[#6C4025]">Loading...</div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-[#6C4025]">No blog posts available.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {posts.map((post, index) => (
                <Link 
                  to={`/blog/${post.id}`} 
                  key={post.id}
                  className="group bg-white border border-[rgba(58,51,155,0.2)] hover:border-[#E67E22] transition-all duration-300"
                  data-testid={`blog-card-${index}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image_url} 
                      alt={getTitle(post)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-xs text-[#6C4025] mb-3">
                      <span className="uppercase tracking-wider font-medium text-[#E67E22]">{post.category}</span>
                      <span className="flex items-center space-x-1">
                        <CalendarBlank size={14} />
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#3A339B] mb-3 line-clamp-2 group-hover:text-[#E67E22] transition-colors" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
                      {getTitle(post)}
                    </h3>
                    <p className="text-sm text-[#6C4025] mb-4 line-clamp-3">
                      {getExcerpt(post)}
                    </p>
                    <div className="inline-flex items-center space-x-2 text-[#3A339B] group-hover:text-[#E67E22] transition-colors font-medium text-sm">
                      <span>{t('blog.readMore')}</span>
                      <ArrowRight size={16} weight="bold" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
