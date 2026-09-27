import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export default function ToastNotifications() {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div 
      className="animate-fade-in"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 2000,
        background: 'var(--bg-card)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--accent-primary)',
        boxShadow: '0 10px 30px var(--accent-glow)',
        borderRadius: '14px',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '420px',
        color: '#fff'
      }}
    >
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        background: 'var(--accent-gradient)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        <Sparkles size={18} color="#fff" />
      </div>
      <div style={{ fontSize: '0.88rem', fontWeight: 600, lineHeight: 1.4 }}>
        {toast.message}
      </div>
    </div>
  );
}
