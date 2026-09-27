import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ThumbsUp, 
  ExternalLink, 
  Code, 
  Plus, 
  Image, 
  Tag, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function ProjectModal() {
  const { 
    selectedProject, 
    setSelectedProject, 
    isAddProjectOpen, 
    setIsAddProjectOpen, 
    addProject, 
    clapProject 
  } = useApp();

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tagsInput, setTagsInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !tagline.trim()) return;

    addProject({
      title: title.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      demoUrl: demoUrl.trim(),
      repoUrl: repoUrl.trim(),
      image: imageUrl.trim() || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    });

    setTitle('');
    setTagline('');
    setDescription('');
    setDemoUrl('');
    setRepoUrl('');
    setImageUrl('');
    setTagsInput('');
    setIsAddProjectOpen(false);
  };

  // 1. New Project Modal
  if (isAddProjectOpen) {
    return (
      <div className="modal-overlay animate-fade-in" onClick={() => setIsAddProjectOpen(false)}>
        <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '28px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Showcase New Project</h2>
            <button onClick={() => setIsAddProjectOpen(false)} className="btn-icon">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Project Title *
              </label>
              <input
                type="text"
                placeholder="e.g. NeuroMind AI - Real-time Knowledge Graph"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="input-control"
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                One-Line Tagline *
              </label>
              <input
                type="text"
                placeholder="e.g. Collaborative canvas for designing system architectures with peers"
                value={tagline}
                onChange={e => setTagline(e.target.value)}
                className="input-control"
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Detailed Description & Proof of Work
              </label>
              <textarea
                rows={3}
                placeholder="Describe your tech stack, system architecture decisions, and what you built..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="input-control"
                style={{ resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                  Live Demo URL
                </label>
                <input
                  type="url"
                  placeholder="https://myproject.demo"
                  value={demoUrl}
                  onChange={e => setDemoUrl(e.target.value)}
                  className="input-control"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                  Source Code Repo URL
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/user/repo"
                  value={repoUrl}
                  onChange={e => setRepoUrl(e.target.value)}
                  className="input-control"
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Cover Image URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                className="input-control"
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                Tech Tags (Comma separated)
              </label>
              <input
                type="text"
                placeholder="React, Vector DB, WebAssembly, TailwindCSS"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
                className="input-control"
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              <button type="button" onClick={() => setIsAddProjectOpen(false)} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Publish Project Showcase
              </button>
            </div>
          </form>

        </div>
      </div>
    );
  }

  // 2. View Project Details Modal (1 Kudo per user constraint)
  if (selectedProject) {
    return (
      <div className="modal-overlay animate-fade-in" onClick={() => setSelectedProject(null)}>
        <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '24px' }}>
          
          <div style={{ height: '200px', width: '100%', borderRadius: '14px', overflow: 'hidden', marginBottom: '16px', position: 'relative' }}>
            <img src={selectedProject.image} alt={selectedProject.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button 
              onClick={() => setSelectedProject(null)} 
              className="btn-icon"
              style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff' }}
            >
              <X size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
            {selectedProject.tags?.map((t, idx) => (
              <span key={idx} className="badge" style={{ fontSize: '0.7rem' }}>#{t}</span>
            ))}
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px' }}>{selectedProject.title}</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '12px' }}>
            {selectedProject.tagline}
          </p>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
            {selectedProject.description || "No detailed description provided."}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
            <button 
              onClick={() => clapProject(selectedProject.id)} 
              className={selectedProject.hasClapped ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '8px 16px', fontSize: '0.82rem', gap: '6px' }}
            >
              <ThumbsUp size={15} fill={selectedProject.hasClapped ? "#fff" : "transparent"} />
              <span>{selectedProject.hasClapped ? `Kudo Given (${selectedProject.claps})` : `Give +1 Kudo (${selectedProject.claps})`}</span>
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              {selectedProject.repoUrl && (
                <a href={selectedProject.repoUrl} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.82rem', gap: '6px' }}>
                  <Code size={15} /> Source Code
                </a>
              )}
              {selectedProject.demoUrl && (
                <a href={selectedProject.demoUrl} target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: '8px 14px', fontSize: '0.82rem', gap: '6px', background: 'var(--accent-gradient)', color: '#fff', border: 'none' }}>
                  <ExternalLink size={15} /> Live Demo
                </a>
              )}
            </div>
          </div>

        </div>
      </div>
    );
  }

  return null;
}
