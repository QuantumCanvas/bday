import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SkillRadar from './SkillRadar';
import { 
  Flame, 
  MapPin, 
  Github, 
  Twitter, 
  Globe, 
  Edit3, 
  Plus, 
  ThumbsUp, 
  ExternalLink, 
  Code, 
  Award, 
  Layers, 
  CheckCircle2, 
  MessageSquare,
  Sparkles,
  Share2
} from 'lucide-react';

export default function PortfolioView() {
  const { 
    userProfile, 
    setIsEditProfileOpen, 
    setIsAddProjectOpen, 
    setSelectedProject, 
    clapProject,
    targetRoles,
    setActiveTab,
    showToast
  } = useApp();

  const [projectFilter, setProjectFilter] = useState('All');

  const currentRole = targetRoles.find(r => r.id === userProfile.targetRoleId) || targetRoles[0];

  const filteredProjects = userProfile.projects.filter(p => {
    if (projectFilter === 'All') return true;
    return p.tags.some(t => t.toLowerCase().includes(projectFilter.toLowerCase()));
  });

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Profile Cover & Header Banner */}
      <div className="glass-panel" style={{ overflow: 'hidden', position: 'relative' }}>
        {/* Cover Image */}
        <div style={{ height: '180px', width: '100%', position: 'relative', overflow: 'hidden' }}>
          <img 
            src={userProfile.coverImage} 
            alt="Cover" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, var(--bg-dark) 100%)' }} />
        </div>

        {/* Profile Card Main Body */}
        <div style={{ padding: '0 28px 24px 28px', marginTop: '-60px', position: 'relative', display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', flexWrap: 'wrap' }}>
            {/* Avatar */}
            <div style={{ position: 'relative' }}>
              <img 
                src={userProfile.avatar} 
                alt={userProfile.name}
                style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '24px', 
                  objectFit: 'cover', 
                  border: '4px solid var(--bg-dark)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)' 
                }}
              />
              <span 
                className="badge badge-success" 
                style={{ position: 'absolute', bottom: '-6px', right: '-6px', boxShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
              >
                Lvl {userProfile.level}
              </span>
            </div>

            {/* Profile Text Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{userProfile.name}</h1>
                {userProfile.openForPeers && (
                  <span className="badge badge-success" style={{ padding: '4px 12px' }}>
                    <Sparkles size={12} /> Open for Peer Projects
                  </span>
                )}
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', fontWeight: 500 }}>
                {userProfile.title}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: 'var(--text-muted)', fontSize: '0.85rem', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} /> {userProfile.location}
                </span>
                {userProfile.socials.github && (
                  <a href={`https://${userProfile.socials.github}`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                    <Github size={14} /> {userProfile.socials.github}
                  </a>
                )}
                {userProfile.socials.twitter && (
                  <a href={`https://${userProfile.socials.twitter}`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                    <Twitter size={14} /> {userProfile.socials.twitter}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons & Target Role Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setIsEditProfileOpen(true)} className="btn-secondary">
              <Edit3 size={15} /> Edit Profile
            </button>
            <button onClick={() => setIsAddProjectOpen(true)} className="btn-primary">
              <Plus size={16} /> Showcase Project
            </button>
          </div>

        </div>

        {/* Level XP Progress Bar */}
        <div style={{ padding: '12px 28px', background: 'rgba(255, 255, 255, 0.02)', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-primary)', minWidth: '120px' }}>
            <Flame size={16} /> XP Progress
          </div>
          <div style={{ flex: 1, height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
            <div 
              style={{ 
                height: '100%', 
                width: `${(userProfile.xp / userProfile.nextLevelXp) * 100}%`, 
                background: 'var(--accent-gradient)',
                borderRadius: '4px',
                transition: 'width 0.5s ease'
              }} 
            />
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'Fira Code, monospace' }}>
            {userProfile.xp} / {userProfile.nextLevelXp} XP
          </span>
        </div>

      </div>

      {/* Main Grid: Left Skill Radar & Target Role | Right Project Showcase */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Left Side: Skill Radar & Target Role */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Skill Radar Panel */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Interactive Skill Radar</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Verified competencies across 6 core tech domains</p>
              </div>
              <span className="badge badge-success">Verified</span>
            </div>

            <SkillRadar skills={userProfile.skills} />

            {/* Detailed Skills Bar Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
              {userProfile.skills.map((s, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{s.name}</span>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>{s.score}%</span>
                  </div>
                  <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${s.score}%`, 
                        background: 'var(--accent-gradient)',
                        borderRadius: '3px'
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Current Target Role Target */}
          <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(18, 24, 38, 0.8) 100%)', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className="badge" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8' }}>
                Target Role Benchmark
              </span>
              <button onClick={() => setActiveTab('skill-paths')} className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                View Gap Analysis
              </button>
            </div>
            
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px' }}>{currentRole.title}</h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '14px' }}>
              {currentRole.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <div>
                <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 800, color: 'var(--success)' }}>
                  {currentRole.matchPercent}%
                </span>
                <span>Role Match</span>
              </div>
              <div style={{ height: '30px', width: '1px', background: 'var(--border-color)' }} />
              <div>
                <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc' }}>
                  {currentRole.masteredSkillsCount} / {currentRole.requiredSkillsCount}
                </span>
                <span>Skills Mastered</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Projects Showcase Deck */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Portfolio Showcase</h2>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Proof of work, live projects, and peer feedback</p>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '6px', background: 'rgba(255, 255, 255, 0.04)', padding: '4px', borderRadius: '10px' }}>
              {['All', 'React', 'Vector DB', 'Wasm', 'TypeScript'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setProjectFilter(tag)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '8px',
                    border: 'none',
                    background: projectFilter === tag ? 'var(--accent-primary)' : 'transparent',
                    color: projectFilter === tag ? '#fff' : 'var(--text-secondary)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {filteredProjects.map(proj => (
              <div 
                key={proj.id} 
                className="glass-panel glass-panel-hover"
                style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
              >
                {/* Project Image Preview */}
                <div style={{ height: '160px', width: '100%', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(9, 13, 22, 0.8) 0%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', bottom: '12px', left: '14px', right: '14px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {proj.tags.map((t, idx) => (
                      <span key={idx} className="badge" style={{ fontSize: '0.65rem' }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Project Content */}
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{proj.title}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, flex: 1 }}>
                    {proj.tagline}
                  </p>

                  {/* Actions & Kudos (Strictly 1 Kudos Per User) */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--border-color)', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button 
                        onClick={() => clapProject(proj.id)}
                        className="btn-icon" 
                        style={{ 
                          width: 'auto', 
                          padding: '0 10px', 
                          gap: '6px', 
                          fontSize: '0.75rem',
                          background: proj.hasClapped ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                          borderColor: proj.hasClapped ? 'var(--accent-primary)' : 'var(--border-color)',
                          color: proj.hasClapped ? '#fff' : 'var(--text-secondary)'
                        }}
                        title={proj.hasClapped ? "You gave 1 Kudo (Click to remove)" : "Give 1 Peer Kudo"}
                      >
                        <ThumbsUp size={14} color={proj.hasClapped ? "var(--accent-primary)" : "var(--text-muted)"} fill={proj.hasClapped ? "var(--accent-primary)" : "transparent"} />
                        <span>{proj.claps} Kudos</span>
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {proj.repoUrl && (
                        <a href={proj.repoUrl} target="_blank" rel="noreferrer" className="btn-icon" title="View Source Code">
                          <Code size={16} />
                        </a>
                      )}
                      {proj.demoUrl && (
                        <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="btn-icon" title="Live Demo">
                          <ExternalLink size={16} />
                        </a>
                      )}
                      <button 
                        onClick={() => setSelectedProject(proj)} 
                        className="btn-secondary"
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      >
                        Details
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>

          {/* Peer Skill Endorsements Section */}
          <div className="glass-panel" style={{ padding: '24px', marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Peer Skill Endorsements</h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Verified testimonials from study buddies and co-builders</p>
              </div>
              <button 
                onClick={() => showToast('Endorsement request link copied to clipboard!', 'info')} 
                className="btn-secondary" 
                style={{ padding: '6px 12px', fontSize: '0.78rem' }}
              >
                <Share2 size={14} /> Request Endorsement
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {userProfile.endorsements.map(end => (
                <div key={end.id} style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={end.authorAvatar} alt={end.authorName} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{end.authorName}</h4>
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{end.authorTitle}</p>
                    </div>
                    <span className="badge badge-success" style={{ marginLeft: 'auto', fontSize: '0.65rem' }}>
                      {end.skill}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.4 }}>
                    "{end.text}"
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
