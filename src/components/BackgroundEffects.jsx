import React, { useMemo } from 'react';

export default function BackgroundEffects() {
  // Generate random floating particles for dynamic background
  const particles = useMemo(() => {
    const items = [];
    const symbols = ['✨', '💖', '⭐', '🌸', '🎈', '💫', '🎁', '🎂'];
    for (let i = 0; i < 30; i++) {
      items.push({
        id: i,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 1.5 + 0.8,
        duration: Math.random() * 10 + 12,
        delay: Math.random() * 5,
        opacity: Math.random() * 0.6 + 0.2
      });
    }
    return items;
  }, []);

  return (
    <div className="bg-effects-container">
      {/* Ambient Gradient Orbs */}
      <div className="gradient-orb orb-1" />
      <div className="gradient-orb orb-2" />
      <div className="gradient-orb orb-3" />

      {/* Floating Sparkles & Hearts */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="floating-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            fontSize: `${p.size}rem`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity
          }}
        >
          {p.symbol}
        </div>
      ))}
    </div>
  );
}
