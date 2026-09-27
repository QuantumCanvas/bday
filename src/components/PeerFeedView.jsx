import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Rss, 
  ThumbsUp, 
  MessageSquare, 
  Share2, 
  Send, 
  Plus, 
  Code, 
  ExternalLink, 
  Award, 
  Sparkles,
  Filter
} from 'lucide-react';

export default function PeerFeedView() {
  const { 
    feedPosts, 
    clapPost, 
    addComment, 
    createFeedPost, 
    userProfile, 
    showToast 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('All');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('Project Showcase');
  const [postTags, setPostTags] = useState('');
  const [activeCommentPostId, setActiveCommentPostId] = useState(null);
  const [commentInput, setCommentInput] = useState('');

  const filteredPosts = feedPosts.filter(post => {
    if (activeFilter === 'All') return true;
    return post.category === activeFilter;
  });

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    createFeedPost({
      category: postCategory,
      content: postContent.trim(),
      tags: postTags.split(',').map(t => t.trim()).filter(Boolean)
    });

    setPostContent('');
    setPostTags('');
    setIsCreatingPost(false);
  };

  const handleCommentSubmit = (postId, e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(postId, commentInput.trim());
    setCommentInput('');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '850px', margin: '0 auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header & Post Creator Trigger */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Rss size={22} color="var(--accent-primary)" /> Peer Growth Network Feed
            </h1>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Collaborate, get code reviews, showcase achievements, and find co-builders
            </p>
          </div>

          <button 
            onClick={() => setIsCreatingPost(!isCreatingPost)} 
            className="btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Plus size={16} /> Share Update
          </button>
        </div>

        {/* Post Creation Box */}
        {isCreatingPost && (
          <form onSubmit={handlePostSubmit} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Category:</span>
              <select
                value={postCategory}
                onChange={e => setPostCategory(e.target.value)}
                className="input-control"
                style={{ width: 'auto', padding: '6px 12px', fontSize: '0.82rem' }}
              >
                <option value="Project Showcase">🚀 Project Showcase</option>
                <option value="Skill Milestone">⚡ Skill Milestone</option>
                <option value="Code Review Request">🔍 Peer Code Review</option>
                <option value="Peer Match Request">💡 Co-builder Wanted</option>
              </select>
            </div>

            <textarea
              rows={3}
              placeholder="Share your latest project update, ask peers for feedback, or post a code review request..."
              value={postContent}
              onChange={e => setPostContent(e.target.value)}
              className="input-control"
              style={{ resize: 'vertical' }}
              required
            />

            <input
              type="text"
              placeholder="Tags (comma separated, e.g. React, Vector DB, Wasm)"
              value={postTags}
              onChange={e => setPostTags(e.target.value)}
              className="input-control"
              style={{ fontSize: '0.82rem' }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" onClick={() => setIsCreatingPost(false)} className="btn-secondary" style={{ padding: '6px 14px', fontSize: '0.82rem' }}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" style={{ padding: '6px 18px', fontSize: '0.82rem' }}>
                Post to Network
              </button>
            </div>
          </form>
        )}

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
          {['All', 'Project Showcase', 'Skill Milestone', 'Code Review Request', 'Peer Match Request'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: activeFilter === cat ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                background: activeFilter === cat ? 'var(--accent-glow)' : 'transparent',
                color: activeFilter === cat ? '#fff' : 'var(--text-secondary)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Feed Posts */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {filteredPosts.map(post => (
          <div key={post.id} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Author Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={post.authorAvatar} alt={post.authorName} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700 }}>{post.authorName}</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>@{post.authorHandle}</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{post.authorTitle} • {post.timeAgo}</p>
                </div>
              </div>

              <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                {post.category}
              </span>
            </div>

            {/* Post Content */}
            <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.55 }}>
              {post.content}
            </div>

            {/* Optional Attached Link */}
            {post.link && (
              <a 
                href={post.link.url} 
                target="_blank" 
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'rgba(99, 102, 241, 0.08)',
                  border: '1px solid rgba(99, 102, 241, 0.25)',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                  <Code size={16} color="var(--accent-primary)" />
                  {post.link.title}
                </div>
                <ExternalLink size={14} color="var(--text-muted)" />
              </a>
            )}

            {/* Post Tags */}
            {post.tags && post.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {post.tags.map((t, idx) => (
                  <span key={idx} className="badge" style={{ fontSize: '0.68rem' }}>#{t}</span>
                ))}
              </div>
            )}

            {/* Actions Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => clapPost(post.id)} 
                  className="btn-secondary"
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.78rem',
                    gap: '6px',
                    color: post.hasClapped ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    borderColor: post.hasClapped ? 'var(--accent-primary)' : 'var(--border-color)'
                  }}
                >
                  <ThumbsUp size={14} />
                  <span>{post.claps} Kudos</span>
                </button>

                <button 
                  onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)} 
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.78rem', gap: '6px' }}
                >
                  <MessageSquare size={14} />
                  <span>{post.comments?.length || 0} Comments</span>
                </button>
              </div>

              <button 
                onClick={() => showToast(`Sent skill endorsement to ${post.authorName}!`, 'success')} 
                className="btn-secondary" 
                style={{ padding: '6px 12px', fontSize: '0.75rem', gap: '4px' }}
              >
                <Award size={13} color="var(--success)" /> Endorse Peer
              </button>
            </div>

            {/* Comments Thread Drawer */}
            {activeCommentPostId === post.id && (
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                {/* Existing comments */}
                {post.comments?.map(c => (
                  <div key={c.id} style={{ display: 'flex', gap: '10px', fontSize: '0.82rem' }}>
                    <img src={c.avatar} alt={c.author} style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.03)', padding: '8px 12px', borderRadius: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <span style={{ fontWeight: 700 }}>{c.author}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.timeAgo}</span>
                      </div>
                      <p style={{ color: 'var(--text-secondary)' }}>{c.text}</p>
                    </div>
                  </div>
                ))}

                {/* Add comment form */}
                <form onSubmit={(e) => handleCommentSubmit(post.id, e)} style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <input
                    type="text"
                    placeholder="Write a constructive peer comment..."
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    className="input-control"
                    style={{ padding: '8px 12px', fontSize: '0.8rem' }}
                  />
                  <button type="submit" className="btn-primary" style={{ padding: '8px 14px' }}>
                    <Send size={14} />
                  </button>
                </form>

              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}
