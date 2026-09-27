import React from 'react';
import { useApp } from '../context/AppContext';
import SkillNodeModal from './SkillNodeModal';
import { 
  Compass, 
  CheckCircle2, 
  Lock, 
  Flame, 
  ArrowRight, 
  Zap, 
  TrendingUp, 
  BookOpen, 
  Award, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function SkillPathsView() {
  const { 
    targetRoles, 
    activeRoleId, 
    setActiveRoleId, 
    roadmaps, 
    setSelectedSkillNode,
    userProfile 
  } = useApp();

  const currentRole = targetRoles.find(r => r.id === activeRoleId) || targetRoles[0];
  const roleNodes = roadmaps[activeRoleId] || [];

  const masteredCount = roleNodes.filter(n => n.status === 'mastered').length;
  const completionPercent = roleNodes.length > 0 ? Math.round((masteredCount / roleNodes.length) * 100) : 0;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner & Role Selection */}
      <div className="glass-panel" style={{ padding: '28px', background: 'linear-gradient(135deg, rgba(18, 24, 38, 0.9) 0%, rgba(99, 102, 241, 0.12) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Compass size={22} color="var(--accent-primary)" />
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Role Skill Roadmaps & Gap Analyzer</h1>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Step-by-step career path trees aligned with 2026 tech market demands.
            </p>
          </div>

          <span className="badge badge-success" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
            <Sparkles size={14} /> Updated for 2026 Trends
          </span>
        </div>

        {/* Target Role Selector Chips */}
        <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px' }}>
          {targetRoles.map(role => {
            const isSelected = role.id === activeRoleId;
            return (
              <button
                key={role.id}
                onClick={() => setActiveRoleId(role.id)}
                style={{
                  padding: '12px 18px',
                  borderRadius: '14px',
                  border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  background: isSelected ? 'var(--accent-glow)' : 'rgba(255, 255, 255, 0.03)',
                  color: isSelected ? '#fff' : 'var(--text-secondary)',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: isSelected ? 'var(--accent-primary)' : 'var(--text-muted)'
                }} />
                {role.title}
                <span className="badge" style={{ fontSize: '0.65rem', background: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)' }}>
                  {role.matchPercent}% Match
                </span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Role Gap & Demand Details Card */}
      <div className="glass-panel" style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'center' }}>
        
        <div>
          <span className="badge badge-warning" style={{ marginBottom: '8px' }}>
            <TrendingUp size={12} /> {currentRole.growthVelocity}
          </span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px' }}>{currentRole.title}</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '14px' }}>
            {currentRole.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {currentRole.keyFocus.map((skill, idx) => (
              <span key={idx} className="badge" style={{ fontSize: '0.72rem' }}>#{skill}</span>
            ))}
          </div>
        </div>

        {/* Progress & Gap Meter */}
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>Skill Path Mastery</span>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{completionPercent}%</span>
          </div>

          <div style={{ height: '10px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '5px', overflow: 'hidden' }}>
            <div 
              style={{ 
                height: '100%', 
                width: `${completionPercent}%`, 
                background: 'var(--accent-gradient)',
                borderRadius: '5px',
                transition: 'width 0.4s ease'
              }} 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            <span>{masteredCount} of {roleNodes.length} Nodes Mastered</span>
            <span>Target Salary: {currentRole.marketSalaryTrend}</span>
          </div>
        </div>

      </div>

      {/* Interactive Skill Tree Nodes Roadmap */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={18} color="var(--warning)" /> Interactive Learning Tree Roadmap
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
          
          {roleNodes.map((node, index) => {
            const isMastered = node.status === 'mastered';
            const isInProgress = node.status === 'in-progress';
            const isNext = node.status === 'next';
            const isLocked = node.status === 'locked';

            return (
              <div 
                key={node.id} 
                className="glass-panel glass-panel-hover"
                onClick={() => setSelectedSkillNode(node)}
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  cursor: 'pointer',
                  borderColor: isMastered ? 'rgba(16, 185, 129, 0.4)' : isNext ? 'var(--accent-primary)' : 'var(--border-color)',
                  background: isMastered ? 'rgba(16, 185, 129, 0.05)' : isInProgress ? 'rgba(245, 158, 11, 0.05)' : 'var(--bg-card)'
                }}
              >
                
                {/* Node Title & Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: '260px' }}>
                  
                  {/* Status Circle Badge */}
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isMastered ? 'rgba(16, 185, 129, 0.2)' : isInProgress ? 'rgba(245, 158, 11, 0.2)' : isNext ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    color: isMastered ? '#34d399' : isInProgress ? '#fbbf24' : isNext ? '#818cf8' : 'var(--text-muted)'
                  }}>
                    {isMastered ? <CheckCircle2 size={24} /> : isLocked ? <Lock size={20} /> : <BookOpen size={20} />}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                      <span className="badge" style={{ fontSize: '0.65rem' }}>Level {node.level}</span>
                      <span className="badge" style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.05)' }}>{node.category}</span>
                      {isMastered && <span className="badge badge-success">Mastered</span>}
                      {isInProgress && <span className="badge badge-warning">In Progress</span>}
                      {isNext && <span className="badge" style={{ background: 'var(--accent-primary)', color: '#fff' }}>Recommended Next</span>}
                    </div>

                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{node.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      {node.description}
                    </p>
                  </div>

                </div>

                {/* Node Actions & XP */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'Fira Code, monospace' }}>
                    +{node.xp} XP
                  </span>

                  <button className={isMastered ? 'btn-secondary' : 'btn-primary'} style={{ padding: '8px 14px', fontSize: '0.8rem', gap: '6px' }}>
                    <span>{isMastered ? 'Review Node' : 'Explore Node'}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

              </div>
            );
          })}

        </div>
      </div>

      <SkillNodeModal />
    </div>
  );
}
