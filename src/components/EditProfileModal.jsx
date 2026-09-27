import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, User, MapPin, Globe, Sparkles, Check } from 'lucide-react';

export default function EditProfileModal() {
  const { 
    isEditProfileOpen, 
    setIsEditProfileOpen, 
    userProfile, 
    setUserProfile, 
    targetRoles, 
    showToast 
  } = useApp();

  const [name, setName] = useState(userProfile.name);
  const [title, setTitle] = useState(userProfile.title);
  const [bio, setBio] = useState(userProfile.bio);
  const [location, setLocation] = useState(userProfile.location);
  const [targetRoleId, setTargetRoleId] = useState(userProfile.targetRoleId || 'fullstack-ai');
  const [openForPeers, setOpenForPeers] = useState(userProfile.openForPeers);

  if (!isEditProfileOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    setUserProfile({
      ...userProfile,
      name,
      title,
      bio,
      location,
      targetRoleId,
      openForPeers
    });

    showToast('Profile updated!', 'success');
    setIsEditProfileOpen(false);
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={() => setIsEditProfileOpen(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '28px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Edit Portfolio & Growth Profile</h2>
          <button onClick={() => setIsEditProfileOpen(false)} className="btn-icon">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="input-control"
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Headline / Title
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="input-control"
              required
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Target Role Benchmark
            </label>
            <select
              value={targetRoleId}
              onChange={e => setTargetRoleId(e.target.value)}
              className="input-control"
            >
              {targetRoles.map(r => (
                <option key={r.id} value={r.id}>{r.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Location / Remote Status
            </label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              className="input-control"
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
              Bio & Growth Interests
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="input-control"
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <input
              type="checkbox"
              id="openForPeersCheck"
              checked={openForPeers}
              onChange={e => setOpenForPeers(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label htmlFor="openForPeersCheck" style={{ fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
              Open for Peer Projects & Pair Learning matching
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={() => setIsEditProfileOpen(false)} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Profile Changes
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
