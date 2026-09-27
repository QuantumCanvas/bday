import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Zap, 
  User, 
  Lock, 
  Mail, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  UserPlus, 
  LogIn,
  X
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const { login, signup, switchAccount, peers, showToast, targetRoles } = useApp();

  const [mode, setMode] = useState(initialMode);
  
  useEffect(() => {
    if (initialMode) setMode(initialMode);
  }, [initialMode]);

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Signup form state
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [targetRoleId, setTargetRoleId] = useState('fullstack-ai');

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    login({ email, password });
    showToast(`Welcome back, ${email.split('@')[0]}!`, 'success');
    if (onClose) onClose();
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !username.trim() || !signupEmail.trim()) return;

    signup({
      name: name.trim(),
      username: username.trim().toLowerCase().replace(/\s+/g, '_'),
      email: signupEmail.trim(),
      targetRoleId,
      title: `${targetRoles.find(r => r.id === targetRoleId)?.title || 'Developer'} Explorer`,
      bio: `Building skills in ${targetRoles.find(r => r.id === targetRoleId)?.title || 'Tech'}. Excited to collaborate with peers!`
    });

    showToast(`Account created! Welcome to SkillPulse, ${name}!`, 'success');
    if (onClose) onClose();
  };

  const handleDemoSelect = (peerId) => {
    switchAccount(peerId);
    showToast(`Logged in as demo account!`, 'info');
    if (onClose) onClose();
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose} style={{ zIndex: 1100 }}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px', padding: '28px', border: '1px solid var(--border-glow)' }}>
        
        {/* Header & Close */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Zap size={18} color="#fff" />
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              Skill<span className="gradient-text">Pulse</span>
            </span>
          </div>

          <button onClick={onClose} className="btn-icon">
            <X size={16} />
          </button>
        </div>

        {/* Minimal Mode Tabs */}
        <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.04)', padding: '4px', borderRadius: '10px', marginBottom: '20px', border: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setMode('login')}
            style={{
              flex: 1,
              padding: '7px',
              border: 'none',
              borderRadius: '7px',
              background: mode === 'login' ? 'var(--accent-primary)' : 'transparent',
              color: mode === 'login' ? '#fff' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Sign In
          </button>

          <button
            onClick={() => setMode('signup')}
            style={{
              flex: 1,
              padding: '7px',
              border: 'none',
              borderRadius: '7px',
              background: mode === 'signup' ? 'var(--accent-primary)' : 'transparent',
              color: mode === 'signup' ? '#fff' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Register
          </button>

          <button
            onClick={() => setMode('demo')}
            style={{
              flex: 1,
              padding: '7px',
              border: 'none',
              borderRadius: '7px',
              background: mode === 'demo' ? 'var(--accent-primary)' : 'transparent',
              color: mode === 'demo' ? '#fff' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Demo Users
          </button>
        </div>

        {/* 1. Sign In Form */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Email or Username
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="alex@skillpulse.dev"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="input-control"
                  style={{ paddingLeft: '36px' }}
                  required
                />
                <Mail size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-control"
                  style={{ paddingLeft: '36px' }}
                  required
                />
                <Lock size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '11px' }} />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '11px', marginTop: '4px' }}>
              Sign In <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* 2. Register Form */}
        {mode === 'signup' && (
          <form onSubmit={handleSignupSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '3px' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Jordan Lee"
                value={name}
                onChange={e => setName(e.target.value)}
                className="input-control"
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '3px' }}>
                  Username
                </label>
                <input
                  type="text"
                  placeholder="jordan_lee"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="input-control"
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '3px' }}>
                  Target Role
                </label>
                <select
                  value={targetRoleId}
                  onChange={e => setTargetRoleId(e.target.value)}
                  className="input-control"
                >
                  {targetRoles.map(r => (
                    <option key={r.id} value={r.id}>{r.title.split(' ')[0]} {r.title.split(' ')[1]}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '3px' }}>
                Email
              </label>
              <input
                type="email"
                placeholder="jordan@dev.io"
                value={signupEmail}
                onChange={e => setSignupEmail(e.target.value)}
                className="input-control"
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '3px' }}>
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={signupPassword}
                onChange={e => setSignupPassword(e.target.value)}
                className="input-control"
                required
              />
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px', marginTop: '4px' }}>
              Create Account <Sparkles size={15} />
            </button>
          </form>
        )}

        {/* 3. Demo Profiles */}
        {mode === 'demo' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Select a peer profile for 1-click preview:
            </p>

            <button
              onClick={() => handleDemoSelect('usr-me')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 12px',
                background: 'rgba(99, 102, 241, 0.1)',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                borderRadius: '10px',
                color: '#fff',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" alt="Alex" style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }} />
              <div>
                <h4 style={{ fontSize: '0.88rem', fontWeight: 700 }}>Alex Rivera</h4>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>AI Engineer • Level 14</p>
              </div>
            </button>

            {peers.map(p => (
              <button
                key={p.id}
                onClick={() => handleDemoSelect(p.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '10px',
                  color: '#fff',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <img src={p.avatar} alt={p.name} style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700 }}>{p.name}</h4>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.title.split('&')[0]} • Level {p.level}</p>
                </div>
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
