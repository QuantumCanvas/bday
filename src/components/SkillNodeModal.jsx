import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  CheckCircle2, 
  BookOpen, 
  Target, 
  Users, 
  Zap, 
  ExternalLink,
  Flame,
  Award
} from 'lucide-react';

export default function SkillNodeModal() {
  const { 
    selectedSkillNode, 
    setSelectedSkillNode, 
    activeRoleId, 
    completeSkillNode,
    setActiveTab
  } = useApp();

  if (!selectedSkillNode) return null;

  const isMastered = selectedSkillNode.status === 'mastered';

  return (
    <div className="modal-overlay animate-fade-in" onClick={() => setSelectedSkillNode(null)}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '28px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8' }}>
                Level {selectedSkillNode.level} Node
              </span>
              <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.06)' }}>
                {selectedSkillNode.category}
              </span>
              {isMastered ? (
                <span className="badge badge-success"><CheckCircle2 size={12} /> Mastered</span>
              ) : (
                <span className="badge badge-warning">+{selectedSkillNode.xp} XP Available</span>
              )}
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{selectedSkillNode.title}</h2>
          </div>
          <button onClick={() => setSelectedSkillNode(null)} className="btn-icon">
            <X size={18} />
          </button>
        </div>

        {/* Overview */}
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
          {selectedSkillNode.description}
        </p>

        {/* Why it matters in 2026 */}
        <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '14px', padding: '16px', marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#34d399', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <Zap size={16} /> Why This Skill Matters in 2026 Job Market
          </h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-primary)', lineHeight: 1.4 }}>
            {selectedSkillNode.whyIn2026}
          </p>
        </div>

        {/* Resources Section */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BookOpen size={16} color="var(--accent-primary)" /> Curated Learning Resources
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {selectedSkillNode.resources?.map((res, idx) => (
              <a
                key={idx}
                href={res.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge" style={{ fontSize: '0.65rem' }}>{res.type}</span>
                  <span style={{ fontWeight: 600 }}>{res.name}</span>
                </div>
                <ExternalLink size={14} color="var(--text-muted)" />
              </a>
            ))}
          </div>
        </div>

        {/* Practical Hands-on Challenge */}
        {selectedSkillNode.challenge && (
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', borderRadius: '14px', padding: '16px', marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Target size={16} color="var(--warning)" /> Peer Practice Challenge
            </h4>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
              {selectedSkillNode.challenge}
            </p>
          </div>
        )}

        {/* Actions Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
          {selectedSkillNode.circleRecommendation && (
            <button
              onClick={() => {
                setSelectedSkillNode(null);
                setActiveTab('circles');
              }}
              className="btn-secondary"
              style={{ fontSize: '0.8rem', gap: '6px' }}
            >
              <Users size={14} /> Join Study Circle
            </button>
          )}

          <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
            {isMastered ? (
              <button disabled className="btn-secondary" style={{ opacity: 0.7, color: 'var(--success)', cursor: 'default' }}>
                <CheckCircle2 size={16} /> Skill Mastered
              </button>
            ) : (
              <button 
                onClick={() => {
                  completeSkillNode(activeRoleId, selectedSkillNode.id);
                  setSelectedSkillNode(null);
                }} 
                className="btn-primary"
              >
                <Award size={16} /> Mark as Mastered (+{selectedSkillNode.xp} XP)
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
