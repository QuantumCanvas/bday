import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  TrendingUp, 
  BrainCircuit, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare, 
  Plus, 
  Target, 
  Share2, 
  Flame,
  UserPlus,
  UserCheck,
  Zap
} from 'lucide-react';

export default function GrowthCirclesView() {
  const { 
    marketTrends, 
    circles, 
    toggleJoinCircle, 
    showToast,
    userProfile 
  } = useApp();

  const [selectedCircleId, setSelectedCircleId] = useState(circles[0]?.id || 'circle-1');
  const [newDiscTitle, setNewDiscTitle] = useState('');
  const [isAddingDisc, setIsAddingDisc] = useState(false);

  const activeCircle = circles.find(c => c.id === selectedCircleId) || circles[0];

  const getIconComponent = (iconName) => {
    switch(iconName) {
      case 'BrainCircuit': return <BrainCircuit size={20} color="var(--accent-primary)" />;
      case 'Cpu': return <Cpu size={20} color="var(--warning)" />;
      default: return <Sparkles size={20} color="var(--accent-secondary)" />;
    }
  };

  const handlePostDiscussion = (e) => {
    e.preventDefault();
    if (!newDiscTitle.trim()) return;

    const newDisc = {
      id: `disc-${Date.now()}`,
      author: userProfile.name,
      avatar: userProfile.avatar,
      title: newDiscTitle.trim(),
      repliesCount: 0,
      time: 'Just now'
    };

    activeCircle.discussions.unshift(newDisc);
    setNewDiscTitle('');
    setIsAddingDisc(false);
    showToast('Discussion thread started in circle workspace!', 'success');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Job Market Skill Trends Pulse Ticker */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={22} color="var(--success)" /> 2026 Job Market Skill Pulse
            </h2>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Real-time technology demand velocity & high-growth skill circles
            </p>
          </div>
          <span className="badge badge-success">Live Market Telemetry</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {marketTrends.map(trend => (
            <div 
              key={trend.id} 
              className="glass-panel glass-panel-hover"
              style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.05)', fontSize: '0.68rem' }}>
                  {trend.category}
                </span>
                <span className="badge badge-success" style={{ fontWeight: 800, fontSize: '0.8rem' }}>
                  {trend.demandGrowth}
                </span>
              </div>

              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{trend.skill}</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {trend.description}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Top Roles:</span>
                {trend.topRoles.map((r, idx) => (
                  <span key={idx} style={{ fontSize: '0.7rem', color: 'var(--badge-text)', fontWeight: 600 }}>
                    {r}{idx < trend.topRoles.length - 1 ? ' •' : ''}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Peer Growth Circles Directory & Circle Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Left Side: Circles Directory List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} color="var(--accent-primary)" /> Peer Growth Circles
            </h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{circles.length} Circles Active</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {circles.map(circle => {
              const isSelected = circle.id === selectedCircleId;
              return (
                <div
                  key={circle.id}
                  className="glass-panel"
                  onClick={() => setSelectedCircleId(circle.id)}
                  style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    cursor: 'pointer',
                    borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-color)',
                    background: isSelected ? 'rgba(99, 102, 241, 0.08)' : 'var(--bg-card)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--border-color)'
                      }}>
                        {getIconComponent(circle.icon)}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{circle.name}</h4>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {circle.membersCount} Peers Growing Together
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleJoinCircle(circle.id);
                      }}
                      className={circle.isJoined ? 'btn-secondary' : 'btn-primary'}
                      style={{ padding: '6px 12px', fontSize: '0.78rem', gap: '4px' }}
                    >
                      {circle.isJoined ? (
                        <>
                          <UserCheck size={14} /> Joined
                        </>
                      ) : (
                        <>
                          <UserPlus size={14} /> Join Squad
                        </>
                      )}
                    </button>
                  </div>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {circle.tagline}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    {circle.tags.map((t, idx) => (
                      <span key={idx} className="badge" style={{ fontSize: '0.65rem' }}>#{t}</span>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* Right Side: Active Circle Workspace & Discussions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              <div>
                <span className="badge badge-warning" style={{ marginBottom: '6px' }}>Active Sprint Workspace</span>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{activeCircle.name}</h2>
              </div>
              
              <button 
                onClick={() => setIsAddingDisc(!isAddingDisc)}
                className="btn-primary"
                style={{ padding: '8px 14px', fontSize: '0.8rem' }}
              >
                <Plus size={15} /> Start Discussion
              </button>
            </div>

            {/* Sprint Goal Banner */}
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '12px', padding: '16px' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--badge-text)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <Target size={16} /> Current Circle Sprint Goal
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>
                {activeCircle.activeSprint}
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                <strong>Weekly Challenge:</strong> {activeCircle.weeklyChallenge}
              </p>
            </div>

            {/* New Discussion Creator */}
            {isAddingDisc && (
              <form onSubmit={handlePostDiscussion} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700 }}>Ask or Share with Circle Peers</h4>
                <input
                  type="text"
                  placeholder="What code concept or project topic do you want feedback on?"
                  value={newDiscTitle}
                  onChange={e => setNewDiscTitle(e.target.value)}
                  className="input-control"
                  required
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                  <button type="button" onClick={() => setIsAddingDisc(false)} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.78rem' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.78rem' }}>
                    Post Thread
                  </button>
                </div>
              </form>
            )}

            {/* Discussions List */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MessageSquare size={16} color="var(--accent-primary)" /> Peer Discussion Wall
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {activeCircle.discussions.map(disc => (
                  <div key={disc.id} style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={disc.avatar} alt={disc.author} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <h5 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>{disc.title}</h5>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          By {disc.author} • {disc.time}
                        </span>
                      </div>
                    </div>

                    <span className="badge" style={{ fontSize: '0.68rem', gap: '4px' }}>
                      <MessageSquare size={10} /> {disc.repliesCount} replies
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
