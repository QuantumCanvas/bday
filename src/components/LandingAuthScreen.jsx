import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import AuthModal from './AuthModal';
import SkillRadar from './SkillRadar';
import { 
  Zap, 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Users, 
  TrendingUp
} from 'lucide-react';

export default function LandingAuthScreen() {
  const { targetRoles = [], setIsAuthModalOpen } = useApp();
  
  const defaultRole = targetRoles[0] || {
    id: 'fullstack-ai',
    title: 'Full-Stack AI Engineer',
    description: 'Build end-to-end intelligent web applications.',
    matchPercent: 84,
    growthVelocity: '+42% demand'
  };

  const [activePreviewRole, setActivePreviewRole] = useState(defaultRole);
  const [modalMode, setModalMode] = useState('login');

  const currentRole = activePreviewRole || defaultRole;

  const previewSkills = [
    { name: "Frontend Architecture", score: currentRole.id === 'fullstack-ai' ? 88 : 95, category: "Frontend" },
    { name: "Backend & APIs", score: currentRole.id === 'cloud-architect' ? 92 : 75, category: "Backend" },
    { name: "AI/ML Integration", score: currentRole.id === 'fullstack-ai' ? 90 : 40, category: "AI/ML" },
    { name: "System Design", score: currentRole.id === 'cloud-architect' ? 95 : 70, category: "Architecture" },
    { name: "Cloud & DevOps", score: currentRole.id === 'cloud-architect' ? 96 : 60, category: "DevOps" },
    { name: "UI/UX & Motion", score: currentRole.id === 'frontend-ux' ? 98 : 65, category: "Design" }
  ];

  const handleOpenAuth = (mode = 'login') => {
    setModalMode(mode);
    if (setIsAuthModalOpen) setIsAuthModalOpen(true);
  };

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)' }}>
      
      {/* Sleek Minimal Header */}
      <header className="glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', padding: '16px 28px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px var(--accent-glow)'
            }}>
              <Zap size={22} color="#fff" />
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
              Skill<span className="gradient-text">Pulse</span>
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              onClick={() => handleOpenAuth('login')}
              className="btn-secondary" 
              style={{ padding: '8px 18px', fontSize: '0.85rem' }}
            >
              Sign In
            </button>
            <button 
              onClick={() => handleOpenAuth('signup')}
              className="btn-primary" 
              style={{ padding: '8px 20px', fontSize: '0.85rem' }}
            >
              Get Started <ArrowRight size={15} />
            </button>
          </div>

        </div>
      </header>

      {/* Main Interactive Landing Section */}
      <main style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '48px 24px 60px 24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
        
        {/* Centered Hero & Interactive Skill Preview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
          
          {/* Left Minimal Hero Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <span className="badge badge-success" style={{ width: 'fit-content', padding: '6px 14px', fontSize: '0.78rem' }}>
              <Sparkles size={13} /> Peer Portfolio & Role Growth Engine
            </span>

            <h1 style={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: 1.15 }}>
              Craft Your Portfolio.<br />
              Level Up With <span className="gradient-text">Peers</span>.
            </h1>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '480px' }}>
              SkillPulse pairs interactive portfolio showcases with real-time 2026 job market skill roadmaps, gap analyzers, and peer squads.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '6px' }}>
              <button 
                onClick={() => handleOpenAuth('signup')}
                className="btn-primary" 
                style={{ padding: '12px 28px', fontSize: '0.95rem' }}
              >
                Create Account <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => handleOpenAuth('demo')}
                className="btn-secondary" 
                style={{ padding: '12px 22px', fontSize: '0.95rem' }}
              >
                Try Demo Account
              </button>
            </div>
          </div>

          {/* Right Interactive Skill Preview Widget */}
          <div className="glass-panel" style={{ padding: '28px', border: '1px solid var(--border-glow)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>INTERACTIVE PREVIEW</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>Role Skill Radar Benchmark</h3>
              </div>
              <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>2026 Telemetry</span>
            </div>

            {/* Interactive Target Role Selectors */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '16px', flexWrap: 'wrap' }}>
              {targetRoles.map(role => {
                const isSelected = currentRole.id === role.id;
                const roleWords = (role.title || '').split(' ');
                const label = roleWords.length >= 2 ? `${roleWords[0]} ${roleWords[1]}` : role.title;
                return (
                  <button
                    key={role.id}
                    onClick={() => setActivePreviewRole(role)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                      background: isSelected ? 'var(--accent-glow)' : 'transparent',
                      color: isSelected ? '#fff' : 'var(--text-secondary)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Canvas Skill Radar */}
            <SkillRadar skills={previewSkills} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>Role Match: <strong style={{ color: 'var(--success)' }}>{currentRole.matchPercent}%</strong></span>
              <span>Growth: <strong style={{ color: '#fff' }}>{currentRole.growthVelocity}</strong></span>
            </div>

          </div>

        </div>

        {/* Clean 3-Card Summary Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Compass size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 700 }}>Skill Path Trees</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Step-by-step 2026 role roadmaps</p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <TrendingUp size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 700 }}>Job Market Pulse</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Real-time technology demand metrics</p>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.15)', color: '#c084fc', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Users size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 700 }}>Peer Growth Squads</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Collaborate and level up with peers</p>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
