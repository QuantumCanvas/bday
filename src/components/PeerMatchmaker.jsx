import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Sparkles, 
  UserPlus, 
  MessageSquare, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  Award
} from 'lucide-react';

export default function PeerMatchmaker() {
  const { 
    isMatchmakerOpen, 
    setIsMatchmakerOpen, 
    peers, 
    showToast 
  } = useApp();

  if (!isMatchmakerOpen) return null;

  return (
    <div className="modal-overlay animate-fade-in" onClick={() => setIsMatchmakerOpen(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '28px', maxWidth: '700px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Sparkles size={20} color="var(--accent-tertiary)" />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Peer Buddy Matchmaker</h2>
            </div>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
              Discovered peers with complementary skill sets for pair coding and co-building projects
            </p>
          </div>
          <button onClick={() => setIsMatchmakerOpen(false)} className="btn-icon">
            <X size={18} />
          </button>
        </div>

        {/* Peers List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {peers.map(peer => (
            <div 
              key={peer.id} 
              style={{ 
                background: 'rgba(255, 255, 255, 0.03)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '16px', 
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={peer.avatar} alt={peer.name} style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{peer.name}</h4>
                      <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Lvl {peer.level}</span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{peer.title}</p>
                  </div>
                </div>

                <span className="badge" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', fontSize: '0.75rem', fontWeight: 700 }}>
                  {peer.compatibility}
                </span>
              </div>

              {/* Skills matching breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.78rem' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                  <span style={{ color: '#34d399', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Strong In:</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {peer.strongSkills.map((s, idx) => (
                      <span key={idx} style={{ color: 'var(--text-secondary)' }}>• {s}</span>
                    ))}
                  </div>
                </div>

                <div style={{ background: 'rgba(99, 102, 241, 0.05)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(99, 102, 241, 0.15)' }}>
                  <span style={{ color: '#818cf8', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Wants to Learn:</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {peer.seekingSkills.map((s, idx) => (
                      <span key={idx} style={{ color: 'var(--text-secondary)' }}>• {s}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Connect Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '6px' }}>
                <button 
                  onClick={() => {
                    showToast(`Pair invite sent to ${peer.name}!`, 'success');
                    setIsMatchmakerOpen(false);
                  }}
                  className="btn-primary"
                  style={{ padding: '6px 14px', fontSize: '0.78rem', gap: '6px' }}
                >
                  <UserPlus size={14} /> Invite to Pair Project
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
