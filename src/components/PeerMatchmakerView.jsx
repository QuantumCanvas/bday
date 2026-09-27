import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  UserPlus,
  MessageSquare,
  CheckCircle2,
  Search,
  Filter,
  Users,
  Flame,
  Award,
  ArrowRight,
  Code2,
  Zap,
  Target
} from 'lucide-react';

export default function PeerMatchmakerView() {
  const { peers, showToast, userProfile } = useApp();
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [invitedPeerIds, setInvitedPeerIds] = useState([]);

  const filteredPeers = peers.filter(peer => {
    const matchesSearch = peer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          peer.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterCategory === 'all') return matchesSearch;
    if (filterCategory === 'high-match') return matchesSearch && peer.compatibility.includes('9');
    if (filterCategory === 'ai-ml') return matchesSearch && (peer.strongSkills.some(s => s.toLowerCase().includes('ai') || s.toLowerCase().includes('vector')) || peer.seekingSkills.some(s => s.toLowerCase().includes('ai')));
    if (filterCategory === 'frontend') return matchesSearch && (peer.strongSkills.some(s => s.toLowerCase().includes('react') || s.toLowerCase().includes('frontend')) || peer.seekingSkills.some(s => s.toLowerCase().includes('frontend')));
    return matchesSearch;
  });

  const handleInvite = (peer) => {
    if (invitedPeerIds.includes(peer.id)) return;
    setInvitedPeerIds([...invitedPeerIds, peer.id]);
    showToast(`🚀 Collaboration invite sent to ${peer.name}! They've been notified.`, 'success');
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 20px' }}>
      
      {/* Page Header Banner */}
      <div 
        className="glass-panel"
        style={{
          padding: '28px',
          borderRadius: '20px',
          marginBottom: '32px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-primary)', background: 'var(--badge-bg)', padding: '3px 10px', borderRadius: '6px' }}>
              DEDICATED FEATURE PAGE • PEER MATCHMAKING
            </span>
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
            Peer Buddy Matchmaker
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '6px', maxWidth: '640px', lineHeight: 1.5 }}>
            Discover peers with complementary skill sets for pair coding, mutual code reviews, and co-building portfolio projects.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ padding: '14px 20px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Compatible Peers</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '2px' }}>
              {peers.length} Online
            </div>
          </div>

          <div style={{ padding: '14px 20px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Active Invites</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>
              {invitedPeerIds.length} Pending
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Peers' },
            { id: 'high-match', label: '🔥 Top 90%+ Match' },
            { id: 'ai-ml', label: '🧠 AI / ML Builders' },
            { id: 'frontend', label: '🎨 Frontend & UX' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className={filterCategory === tab.id ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            placeholder="Search peer by name or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-control"
            style={{ paddingLeft: '38px', fontSize: '0.84rem' }}
          />
        </div>
      </div>

      {/* Peer Grid Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
        {filteredPeers.map(peer => {
          const isInvited = invitedPeerIds.includes(peer.id);
          return (
            <div 
              key={peer.id}
              className="glass-panel highlight-hover"
              style={{
                padding: '24px',
                borderRadius: '18px',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                gap: '16px',
                border: '1px solid var(--border-color)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img 
                      src={peer.avatar} 
                      alt={peer.name} 
                      style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }}
                    />
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>{peer.name}</h3>
                        <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Lvl {peer.level}</span>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>{peer.title}</p>
                    </div>
                  </div>

                  <span 
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '12px',
                      background: 'rgba(56, 189, 248, 0.12)',
                      color: 'var(--accent-primary)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    {peer.compatibility}
                  </span>
                </div>

                {/* Skills Complement Breakdown */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.8rem', marginTop: '12px' }}>
                  <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                    <span style={{ color: '#10b981', fontWeight: 700, display: 'block', marginBottom: '6px', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      Strong In:
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      {peer.strongSkills.map((s, idx) => (
                        <span key={idx} style={{ color: 'var(--text-primary)', fontWeight: 500 }}>• {s}</span>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(56, 189, 248, 0.05)', padding: '12px', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.15)' }}>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 700, display: 'block', marginBottom: '6px', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                      Seeking:
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      {peer.seekingSkills.map((s, idx) => (
                        <span key={idx} style={{ color: 'var(--text-primary)', fontWeight: 500 }}>• {s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Connect Actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Open for Pair Projects
                </span>

                <button
                  onClick={() => handleInvite(peer)}
                  disabled={isInvited}
                  className={isInvited ? 'btn-secondary' : 'btn-primary'}
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.82rem',
                    background: isInvited ? 'rgba(16, 185, 129, 0.12)' : undefined,
                    color: isInvited ? '#10b981' : undefined,
                    borderColor: isInvited ? 'rgba(16, 185, 129, 0.3)' : undefined
                  }}
                >
                  {isInvited ? (
                    <><CheckCircle2 size={14} /> Invite Sent</>
                  ) : (
                    <><UserPlus size={14} /> Invite to Pair Project</>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
