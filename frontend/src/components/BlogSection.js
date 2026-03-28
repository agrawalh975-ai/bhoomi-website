import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { ArrowRight, CalendarBlank } from '@phosphor-icons/react';

export const BlogSection = () => {
  const { t, i18n } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const API = `${BACKEND_URL}/api`;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API}/blog/posts`);
        setPosts(response.data.slice(0, 3)); // Show only 3 latest posts
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

  if (loading || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-32 bg-[#F5F0E5]" data-testid="blog-section">
      <div className="px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="uppercase text-xs sm:text-sm tracking-[0.2em] font-semibold text-[#E67E22] mb-4">
            {t('blog.subtitle')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-[#3A339B] mb-6" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
            {t('blog.title')}
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
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

        {/* View All Link */}
        <div className="text-center">
          <Link 
            to="/blog" 
            className="inline-flex items-center space-x-2 px-8 py-4 bg-[#E67E22] text-white hover:bg-[#D35400] transition-colors duration-200 font-medium"
            data-testid="view-all-posts"
          >
            <span>{t('blog.viewAll')}</span>
            <ArrowRight size={20} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
};
