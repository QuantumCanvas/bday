import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  MapPin, 
  Compass, 
  Users, 
  Rss, 
  Zap, 
  Sparkles,
  Plus,
  Flame,
  LogIn,
  LogOut,
  Edit3,
  UserCheck,
  ChevronDown,
  Activity,
  Palette
} from 'lucide-react';

export default function Navbar() {
  const { 
    activeTab, 
    setActiveTab, 
    userProfile, 
    isAuthenticated,
    logout,
    setIsAuthModalOpen,
    setIsMatchmakerOpen,
    setIsAddProjectOpen,
    setIsEditProfileOpen,
    theme,
    setTheme
  } = useApp();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <header className="glass-panel" style={{ borderRadius: 0, borderTop: 'none', borderLeft: 'none', borderRight: 'none', position: 'sticky', top: 0, zIndex: 900 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('portfolio')}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px var(--accent-glow)'
          }}>
            <Zap size={24} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
                Skill<span className="gradient-text">Pulse</span>
              </span>
              <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Peer-2-Peer</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Grow Together • Craft Your Portfolio</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(255, 255, 255, 0.03)', padding: '4px', borderRadius: '14px', border: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveTab('portfolio')}
            className={activeTab === 'portfolio' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
          >
            <User size={15} />
            <span>Portfolio</span>
          </button>

          <button
            onClick={() => setActiveTab('skill-paths')}
            className={activeTab === 'skill-paths' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
          >
            <Compass size={15} />
            <span>Roadmaps</span>
          </button>

          <button
            onClick={() => setActiveTab('live-insights')}
            className={activeTab === 'live-insights' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 14px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Activity size={15} color={activeTab === 'live-insights' ? '#fff' : '#10b981'} />
            <span>Market Insights</span>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
          </button>

          <button
            onClick={() => setActiveTab('circles')}
            className={activeTab === 'circles' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
          >
            <Users size={15} />
            <span>Job Circles</span>
          </button>

          <button
            onClick={() => setActiveTab('feed')}
            className={activeTab === 'feed' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
          >
            <Rss size={15} />
            <span>Peer Network</span>
          </button>

          <button
            onClick={() => setActiveTab('matchmaker')}
            className={activeTab === 'matchmaker' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
          >
            <Sparkles size={15} />
            <span>Buddy Matchmaker</span>
          </button>
        </nav>

        {/* User Level, Theme Selector & Auth */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

          {/* Technical Theme Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255, 255, 255, 0.04)', padding: '4px 8px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <Palette size={14} color="var(--accent-primary)" />
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'var(--code-font)',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="peacock-blue">🦚 Peacock Blue</option>
              <option value="neon">🌸 Lavender & Mint</option>
              <option value="matrix-terminal">🌺 Sakura & Rose</option>
              <option value="quantum-synth">🌿 Sage & Matcha</option>
              <option value="synthwave-retro">🍑 Peach & Honey</option>
            </select>
          </div>

          {/* Auth Button or User Profile Pill Dropdown */}
          {!isAuthenticated ? (
            <button 
              onClick={() => setIsAuthModalOpen(true)} 
              className="btn-primary"
              style={{ padding: '8px 18px', fontSize: '0.85rem', gap: '6px' }}
            >
              <LogIn size={16} /> Sign In
            </button>
          ) : (
            <div style={{ position: 'relative' }}>
              <div 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 10px 4px 6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '24px',
                  cursor: 'pointer'
                }}
              >
                <img 
                  src={userProfile.avatar} 
                  alt={userProfile.name} 
                  style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, lineHeight: 1 }}>{userProfile.name}</span>
                  <span style={{ fontSize: '0.68rem', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>
                    <Flame size={10} /> Lvl {userProfile.level} ({userProfile.xp} XP)
                  </span>
                </div>
                <ChevronDown size={14} color="var(--text-muted)" />
              </div>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div 
                  className="animate-fade-in"
                  style={{
                    position: 'absolute',
                    top: '46px',
                    right: 0,
                    width: '210px',
                    background: 'var(--bg-dark)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '14px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    padding: '8px',
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                  }}
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <button 
                    onClick={() => setIsEditProfileOpen(true)}
                    className="btn-secondary"
                    style={{ justifyContent: 'flex-start', border: 'none', background: 'transparent', padding: '8px 12px', fontSize: '0.82rem', gap: '8px' }}
                  >
                    <Edit3 size={15} color="var(--accent-primary)" /> Edit Profile
                  </button>

                  <button 
                    onClick={() => setIsAuthModalOpen(true)}
                    className="btn-secondary"
                    style={{ justifyContent: 'flex-start', border: 'none', background: 'transparent', padding: '8px 12px', fontSize: '0.82rem', gap: '8px' }}
                  >
                    <UserCheck size={15} color="#c084fc" /> Switch Profile
                  </button>

                  <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }} />

                  <button 
                    onClick={logout}
                    className="btn-secondary"
                    style={{ justifyContent: 'flex-start', border: 'none', background: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '8px 12px', fontSize: '0.82rem', gap: '8px' }}
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </header>
  );
}
