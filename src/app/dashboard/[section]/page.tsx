'use client';

import { usePathname, useRouter } from 'next/navigation';

const PAGE_CONFIG: Record<string, { icon: string; title: string; desc: string; color: string }> = {
  analytics: { icon: '📊', title: 'Analytics', desc: 'Track your site performance and user behavior', color: '#3b82f6' },
  posts: { icon: '📝', title: 'Posts', desc: 'Create and manage your blog posts and articles', color: '#8b5cf6' },
  pages: { icon: '📄', title: 'Pages', desc: 'Manage static pages and landing pages', color: '#10b981' },
  categories: { icon: '🗂️', title: 'Categories', desc: 'Organize content with categories', color: '#06b6d4' },
  tags: { icon: '🏷️', title: 'Tags', desc: 'Add and manage content tags', color: '#f59e0b' },
  media: { icon: '🖼️', title: 'Media Library', desc: 'Upload and manage images, videos and files', color: '#ec4899' },
  users: { icon: '👥', title: 'Users', desc: 'Manage users, roles and permissions', color: '#8b5cf6' },
  comments: { icon: '💬', title: 'Comments', desc: 'Moderate and manage user comments', color: '#3b82f6' },
  orders: { icon: '🛒', title: 'Orders', desc: 'View and manage ecommerce orders', color: '#10b981' },
  plugins: { icon: '🔌', title: 'Plugins', desc: 'Install and configure plugins and extensions', color: '#f59e0b' },
  settings: { icon: '⚙️', title: 'Settings', desc: 'Configure your CMS preferences and options', color: '#6366f1' },
  security: { icon: '🔒', title: 'Security', desc: 'Manage access control and security settings', color: '#ef4444' },
};

export default function PlaceholderPage() {
  const pathname = usePathname();
  const router = useRouter();
  const segment = pathname.split('/').filter(Boolean).pop() || '';
  const config = PAGE_CONFIG[segment] || {
    icon: '📁', title: segment.charAt(0).toUpperCase() + segment.slice(1),
    desc: 'This section is coming soon', color: '#3b82f6'
  };

  return (
    <div className="dashboard-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 64px)', textAlign: 'center' }}>
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: '20px',
        padding: '60px 48px',
        maxWidth: '480px',
        width: '100%',
        animation: 'fadeIn 0.5s ease',
        boxShadow: 'var(--shadow-card)',
      }}>
        <div style={{
          width: '72px', height: '72px',
          borderRadius: '18px',
          background: `${config.color}18`,
          border: `1px solid ${config.color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '32px',
          margin: '0 auto 24px',
        }}>
          {config.icon}
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '10px' }}>
          {config.title}
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: '1.6' }}>
          {config.desc}. This section is under construction and will be available soon.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={() => router.push('/dashboard')}
            className="btn-outline"
          >
            ← Back to Dashboard
          </button>
          <button
            className="btn-sm"
            onClick={() => router.push('/dashboard')}
          >
            Go to Overview
          </button>
        </div>
      </div>
    </div>
  );
}
