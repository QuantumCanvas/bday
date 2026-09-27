import React, { useRef, useEffect } from 'react';

export default function SkillRadar({ skills = [] }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Handle high DPI crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const width = 320;
    const height = 320;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 105;
    const numAxes = skills.length || 6;
    const angleStep = (Math.PI * 2) / numAxes;

    // Draw background grid concentric polygons (4 levels: 25%, 50%, 75%, 100%)
    const levels = [0.25, 0.5, 0.75, 1.0];
    levels.forEach(level => {
      ctx.beginPath();
      for (let i = 0; i < numAxes; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const r = radius * level;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = level === 1.0 ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = level === 1.0 ? 1.5 : 1;
      ctx.stroke();
    });

    // Draw radial axes lines & axis labels
    skills.forEach((skill, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const xEnd = centerX + radius * Math.cos(angle);
      const yEnd = centerY + radius * Math.sin(angle);

      // Axis line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(xEnd, yEnd);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Axis text label placement offset
      const labelRadius = radius + 22;
      const lx = centerX + labelRadius * Math.cos(angle);
      const ly = centerY + labelRadius * Math.sin(angle);

      ctx.font = '600 10px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = lx < centerX - 10 ? 'right' : lx > centerX + 10 ? 'left' : 'center';
      ctx.textBaseline = ly < centerY - 10 ? 'bottom' : ly > centerY + 10 ? 'top' : 'middle';
      
      // Shorten label if too long
      const labelText = skill.name.length > 15 ? skill.name.slice(0, 13) + '..' : skill.name;
      ctx.fillText(`${labelText} (${skill.score}%)`, lx, ly);
    });

    // Draw filled polygon for user skills
    ctx.beginPath();
    skills.forEach((skill, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const scoreNormalized = Math.min(100, Math.max(10, skill.score)) / 100;
      const r = radius * scoreNormalized;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();

    // Gradient fill for skill radar polygon
    const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.5)');
    gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.35)');
    gradient.addColorStop(1, 'rgba(6, 182, 212, 0.2)');

    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw node glowing points
    skills.forEach((skill, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const scoreNormalized = Math.min(100, Math.max(10, skill.score)) / 100;
      const r = radius * scoreNormalized;
      const x = centerX + r * Math.cos(angle);
      const y = centerY + r * Math.sin(angle);

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#06b6d4';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

  }, [skills]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
