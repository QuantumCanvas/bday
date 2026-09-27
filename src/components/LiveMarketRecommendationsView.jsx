import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Activity,
  RefreshCw,
  Zap,
  TrendingUp,
  Briefcase,
  PlusCircle,
  ExternalLink,
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  DollarSign,
  Building2,
  Code2,
  Layers,
  ChevronRight,
  Flame,
  Globe
} from 'lucide-react';

export default function LiveMarketRecommendationsView() {
  const {
    userProfile,
    targetRoles,
    activeRoleId,
    liveMarketData,
    isSyncing,
    autoSyncEnabled,
    setAutoSyncEnabled,
    refreshLiveMarketData,
    recommendations,
    addRecommendedSkillToRoadmap,
    setActiveTab
  } = useApp();

  const currentRole = targetRoles.find(r => r.id === activeRoleId) || targetRoles[0];
  const { skillRecommendations = [], jobRecommendations = [], projectRecommendations = [] } = recommendations;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 20px' }}>
      
      {/* Real-time Ticker & Header Control Bar */}
      <div 
        className="glass-panel"
        style={{
          padding: '20px 24px',
          borderRadius: '20px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-color)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div 
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px var(--accent-glow)'
            }}
          >
            <Activity size={24} color="#040810" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span 
                style={{
                  width: '9px',
                  height: '9px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 10px #10b981',
                  display: 'inline-block'
                }}
              />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#10b981' }}>
                Real-Time Tech Signal Engine
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0 0 0' }}>
              Live Insights & Career Recommendations
            </h2>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            Last synced: <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{liveMarketData?.lastSyncedAt || 'Just now'}</span>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', cursor: 'pointer', background: 'rgba(255,255,255,0.04)', padding: '6px 12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <input 
              type="checkbox"
              checked={autoSyncEnabled}
              onChange={(e) => setAutoSyncEnabled(e.target.checked)}
              style={{ accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
            />
            Auto-Sync (30s)
          </label>

          <button
            onClick={() => refreshLiveMarketData(false)}
            disabled={isSyncing}
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              color: '#fff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: isSyncing ? 'not-allowed' : 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
              transition: 'all 0.2s ease'
            }}
          >
            <RefreshCw size={16} className={isSyncing ? 'spin-anim' : ''} />
            {isSyncing ? 'Syncing Market Data...' : 'Sync Live Data Now'}
          </button>
        </div>
      </div>

      {/* Target Role & Market Velocity Summary Banner */}
      <div 
        className="glass-panel"
        style={{
          padding: '24px',
          borderRadius: '20px',
          marginBottom: '36px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          background: 'rgba(15, 23, 42, 0.6)'
        }}
      >
        <div>
          <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', tracking: '0.05em', color: 'var(--accent-primary)', fontWeight: 700 }}>
            Active Target Role Benchmark
          </span>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '4px' }}>
            {currentRole?.title}
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 1.5 }}>
            {currentRole?.description}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ flex: 1, padding: '16px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Market Growth Rate</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <TrendingUp size={20} /> {currentRole?.growthVelocity || '+42% in 2026'}
            </div>
          </div>

          <div style={{ flex: 1, padding: '16px', borderRadius: '14px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Average Salary Range</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-primary)', marginTop: '4px' }}>
              {currentRole?.marketSalaryTrend || '$140k - $190k'}
            </div>
          </div>
        </div>
      </div>

      {/* Grid Section 1: Real-Time High-Impact Skill Recommendations */}
      <div style={{ marginBottom: '44px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={22} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Recommended High-Impact Skills</h3>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Tailored to your current vector gap scores
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
          {skillRecommendations.map((rec) => (
            <div
              key={rec.id}
              className="glass-panel highlight-hover"
              style={{
                padding: '22px',
                borderRadius: '18px',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between',
                border: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '20px', background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)', fontWeight: 700 }}>
                    {rec.category}
                  </span>
                  <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '20px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', fontWeight: 700 }}>
                    {rec.marketGrowth}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>
                  {rec.skillName}
                </h4>

                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                  {rec.reasoning}
                </p>

                {/* Proficiency Gap Bar */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Your Score vs Target</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{rec.currentProficiency}% / {rec.targetProficiency}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${rec.currentProficiency}%`, 
                        background: 'linear-gradient(90deg, #6366f1, #a855f7)',
                        borderRadius: '4px',
                        transition: 'width 0.4s ease'
                      }} 
                    />
                  </div>
                </div>

                {/* Top Hiring Companies Tag */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hiring:</span>
                  {rec.topCompanies.map((c, i) => (
                    <span key={i} style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)' }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => addRecommendedSkillToRoadmap(rec.skillName, rec.category)}
                style={{
                  width: '100%',
                  padding: '11px',
                  borderRadius: '12px',
                  background: 'rgba(99, 102, 241, 0.12)',
                  color: 'var(--accent-primary)',
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'var(--accent-primary)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(99, 102, 241, 0.12)';
                  e.currentTarget.style.color = 'var(--accent-primary)';
                }}
              >
                <PlusCircle size={16} /> Add to My Skill Roadmap
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Section 2: Real-Time Matched Job Opportunities */}
      <div style={{ marginBottom: '44px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Briefcase size={22} color="#a855f7" />
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Real-Time Matched Career Opportunities</h3>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Matched dynamically to your profile & goal
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {jobRecommendations.map((job) => (
            <div
              key={job.id}
              className="glass-panel highlight-hover"
              style={{
                padding: '24px',
                borderRadius: '18px',
                display: 'flex',
                flexDirection: 'row',
                justify: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '20px',
                border: '1px solid rgba(255,255,255,0.08)'
              }}
            >
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flex: 1, minWidth: '300px' }}>
                <div 
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '14px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0
                  }}
                >
                  {job.logo}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {job.title}
                    </h4>
                    <span 
                      style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        background: job.matchScore > 85 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(99, 102, 241, 0.15)',
                        color: job.matchScore > 85 ? '#10b981' : 'var(--accent-primary)',
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <Zap size={12} fill="currentColor" /> {job.matchScore}% Match
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '4px', flexWrap: 'wrap' }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{job.company}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                    <span>•</span>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>{job.salary}</span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {job.postedTime}</span>
                  </div>

                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '10px', lineHeight: 1.5 }}>
                    {job.description}
                  </p>

                  {/* Required Skill Pills */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Required Skills:</span>
                    {job.requiredSkills.map((sk, idx) => (
                      <span 
                        key={idx}
                        style={{
                          fontSize: '0.76rem',
                          padding: '3px 10px',
                          borderRadius: '8px',
                          background: 'rgba(99, 102, 241, 0.1)',
                          color: 'var(--accent-primary)',
                          border: '1px solid rgba(99, 102, 241, 0.2)',
                          fontWeight: 600
                        }}
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '160px' }}>
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '12px 20px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                    color: '#fff',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    textAlign: 'center',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                  }}
                >
                  Apply Now <ExternalLink size={14} />
                </a>

                <button
                  onClick={() => setActiveTab('skill-paths')}
                  style={{
                    padding: '9px 14px',
                    borderRadius: '10px',
                    background: 'transparent',
                    color: 'var(--text-muted)',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  View Gap Roadmap
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Section 3: Recommended Projects & GitHub Ecosystem Trends */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '28px' }}>
        
        {/* Project Ideas */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Code2 size={22} color="#10b981" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Portfolio Project Suggestions</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {projectRecommendations.map((proj) => (
              <div 
                key={proj.id}
                className="glass-panel"
                style={{ padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', background: 'rgba(16, 185, 129, 0.12)', padding: '3px 8px', borderRadius: '6px' }}>
                    +{proj.xpReward} XP Reward
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Est. {proj.estimatedHours} • {proj.difficulty}
                  </span>
                </div>

                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {proj.title}
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '12px', lineHeight: 1.4 }}>
                  {proj.tagline}
                </p>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.03)', padding: '8px 12px', borderRadius: '8px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Why Build This:</span> {proj.whyRecommended}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live GitHub Ecosystem Signals */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Globe size={22} color="#6366f1" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Live GitHub Trending Tech Signals</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {(liveMarketData?.githubTrends || []).map((repo, idx) => (
              <div 
                key={idx}
                className="glass-panel highlight-hover"
                style={{ padding: '18px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <a
                    href={repo.url || `https://github.com/${repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--accent-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    {repo.name} <ExternalLink size={12} />
                  </a>

                  <span style={{ fontSize: '0.78rem', color: '#f59e0b', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    ★ {repo.stars?.toLocaleString()}
                  </span>
                </div>

                <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', marginBottom: '10px', lineHeight: 1.4 }}>
                  {repo.description || 'Trending open source tech stack repository.'}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#6366f1' }} /> {repo.language}
                  </span>
                  <span>•</span>
                  <span>Active Market Driver</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
