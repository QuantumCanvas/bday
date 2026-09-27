import React from 'react';

export default function CakeCanvas({
  flavor,
  frosting,
  toppings = [],
  candles = [],
  areCandlesLit = true,
  onToggleCandle,
  onCakeClick
}) {
  // Color presets based on selected flavor
  const flavorStyles = {
    redvelvet: { base: '#991b1b', inner: '#7f1d1d', accent: '#fecdd3' },
    chocolate: { base: '#451a03', inner: '#290e02', accent: '#fbbf24' },
    vanilla:   { base: '#fef3c7', inner: '#fde68a', accent: '#f43f5e' },
    matcha:    { base: '#4d7c0f', inner: '#3f6212', accent: '#d9f99d' },
    cotton:    { base: '#38bdf8', inner: '#0284c7', accent: '#f472b6' },
  };

  const currentFlavor = flavorStyles[flavor.id] || flavorStyles.vanilla;

  // Frosting styles
  const frostingColor = frosting.color || '#fff';

  return (
    <div className="cake-canvas-container" onClick={onCakeClick}>
      <svg
        viewBox="0 0 500 450"
        className="cake-svg"
        style={{ width: '100%', height: '100%', maxHeight: '420px' }}
      >
        <defs>
          {/* Flame Glow Filters & Gradients */}
          <radialGradient id="flameGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffed4a" stopOpacity="1" />
            <stop offset="40%" stopColor="#ff7600" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff0055" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="cakePlateGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 182, 193, 0.4)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>

          {/* Drip Clip Path */}
          <linearGradient id="plateMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f3f4f6" />
            <stop offset="100%" stopColor="#e5e7eb" />
          </linearGradient>

          {/* Gold Trim */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#ca8a04" />
          </linearGradient>
        </defs>

        {/* Ambient Cake Shadow & Plate Glow */}
        <ellipse cx="250" cy="390" rx="200" ry="25" fill="url(#cakePlateGlow)" />
        <ellipse cx="250" cy="390" rx="180" ry="20" fill="rgba(0, 0, 0, 0.15)" />

        {/* Cake Stand / Plate */}
        <ellipse cx="250" cy="380" rx="175" ry="22" fill="url(#plateMetal)" stroke="#d1d5db" strokeWidth="3" />
        <ellipse cx="250" cy="376" rx="160" ry="17" fill="#ffffff" stroke="#f3f4f6" strokeWidth="2" />
        <ellipse cx="250" cy="376" rx="155" ry="14" fill="none" stroke="url(#goldGradient)" strokeWidth="2" strokeDasharray="6 4" />

        {/* BOTTOM TIER (CAKE BASE) */}
        <g id="bottom-tier">
          {/* Main Body */}
          <rect x="110" y="270" width="280" height="100" rx="12" fill={currentFlavor.base} />
          {/* Cake Layer Stripes (Cream filling) */}
          <rect x="110" y="315" width="280" height="12" fill={currentFlavor.accent} opacity="0.85" />
          <ellipse cx="250" cy="270" rx="140" ry="20" fill={currentFlavor.inner} />

          {/* Bottom Tier Frosting Top Cover */}
          <ellipse cx="250" cy="270" rx="140" ry="20" fill={frostingColor} />

          {/* Frosting Style Details on Bottom Tier */}
          {frosting.style === 'drip' && (
            <path
              d="M 110,270 Q 125,300 135,270 Q 150,310 165,270 Q 185,295 200,270 Q 220,315 240,270 Q 265,305 280,270 Q 305,315 320,270 Q 340,295 355,270 Q 375,305 390,270 L 390,280 Q 250,305 110,280 Z"
              fill={frostingColor}
              opacity="0.95"
            />
          )}

          {frosting.style === 'rosette' && (
            <g fill={frostingColor}>
              {[125, 160, 195, 230, 265, 300, 335, 370].map((x, i) => (
                <circle key={i} cx={x} cy="272" r="14" opacity="0.9" />
              ))}
            </g>
          )}

          {frosting.style === 'sparkle' && (
            <g fill="url(#goldGradient)">
              {[130, 180, 230, 280, 330, 370].map((x, i) => (
                <text key={i} x={x} y="340" fontSize="14">✨</text>
              ))}
            </g>
          )}
        </g>

        {/* TOP TIER (CAKE TOP) */}
        <g id="top-tier">
          {/* Main Body */}
          <rect x="150" y="180" width="200" height="90" rx="10" fill={currentFlavor.base} />
          {/* Middle Cream Layer */}
          <rect x="150" y="220" width="200" height="10" fill={currentFlavor.accent} opacity="0.9" />
          <ellipse cx="250" cy="180" rx="100" ry="16" fill={currentFlavor.inner} />

          {/* Top Tier Frosting Cover */}
          <ellipse cx="250" cy="180" rx="100" ry="16" fill={frostingColor} />

          {/* Frosting Drips on Top Tier */}
          {frosting.style === 'drip' && (
            <path
              d="M 150,180 Q 165,205 180,180 Q 200,215 215,180 Q 235,200 250,180 Q 270,215 285,180 Q 310,205 325,180 Q 340,200 350,180 L 350,190 Q 250,205 150,190 Z"
              fill={frostingColor}
            />
          )}

          {frosting.style === 'rosette' && (
            <g fill={frostingColor}>
              {[165, 198, 232, 266, 300, 334].map((x, i) => (
                <circle key={i} cx={x} cy="182" r="11" opacity="0.9" />
              ))}
            </g>
          )}
        </g>

        {/* PLACED TOPPINGS */}
        <g id="toppings-layer">
          {toppings.map((t, idx) => {
            // Position toppings along top and bottom tier curves
            const isTopTier = idx % 2 === 0;
            const radiusX = isTopTier ? 85 : 125;
            const centerY = isTopTier ? 175 : 265;
            const angle = ((idx / Math.max(1, toppings.length)) * Math.PI) - Math.PI / 2;
            const x = 250 + Math.cos(angle) * radiusX;
            const y = centerY + Math.sin(angle) * 12;

            return (
              <g key={t.id || idx} transform={`translate(${x - 12}, ${y - 12})`} className="topping-item-anim">
                {t.type === 'strawberry' && (
                  <text fontSize="22">🍓</text>
                )}
                {t.type === 'cherry' && (
                  <text fontSize="22">🍒</text>
                )}
                {t.type === 'chocolate' && (
                  <text fontSize="20">🍫</text>
                )}
                {t.type === 'macaron' && (
                  <text fontSize="20">🧁</text>
                )}
                {t.type === 'flower' && (
                  <text fontSize="20">🌸</text>
                )}
                {t.type === 'star' && (
                  <text fontSize="20">⭐</text>
                )}
                {t.type === 'heart' && (
                  <text fontSize="20">💖</text>
                )}
                {t.type === 'sprinkles' && (
                  <g>
                    <rect x="0" y="0" width="4" height="10" rx="2" fill="#ef4444" transform="rotate(25)" />
                    <rect x="8" y="4" width="4" height="10" rx="2" fill="#3b82f6" transform="rotate(-30)" />
                    <rect x="14" y="0" width="4" height="10" rx="2" fill="#eab308" transform="rotate(15)" />
                  </g>
                )}
              </g>
            );
          })}
        </g>

        {/* CANDLES LAYER */}
        <g id="candles-layer">
          {candles.map((candle, idx) => {
            const count = candles.length;
            // Distribute candles along top tier ellipse arc
            const spread = Math.min(150, count * 26);
            const startX = 250 - spread / 2 + (spread / (count + 1));
            const candleX = startX + (idx * (spread / Math.max(1, count - 1 || 1)));
            const candleY = 172 - Math.sin((idx / Math.max(1, count - 1)) * Math.PI) * 8;

            const isLit = areCandlesLit && (candle.lit !== false);

            return (
              <g key={candle.id || idx} className="candle-group" cursor="pointer" onClick={(e) => { e.stopPropagation(); onToggleCandle && onToggleCandle(idx); }}>
                {/* Candle Stick */}
                <rect
                  x={candleX - 4}
                  y={candleY - 45}
                  width="8"
                  height="45"
                  rx="3"
                  fill={candle.color || '#ec4899'}
                />

                {/* Candle Stripes */}
                <path
                  d={`M ${candleX - 4},${candleY - 35} L ${candleX + 4},${candleY - 38} M ${candleX - 4},${candleY - 20} L ${candleX + 4},${candleY - 23}`}
                  stroke="#ffffff"
                  strokeWidth="2"
                  opacity="0.8"
                />

                {/* Wick */}
                <line
                  x1={candleX}
                  y1={candleY - 45}
                  x2={candleX}
                  y2={candleY - 50}
                  stroke="#374151"
                  strokeWidth="1.5"
                />

                {/* LIT FLAME */}
                {isLit ? (
                  <g className="flame-animation" transform={`translate(${candleX}, ${candleY - 52})`}>
                    {/* Flame Outer Glow */}
                    <circle cx="0" cy="-6" r="18" fill="url(#flameGlow)" opacity="0.85" />
                    
                    {/* Main Flame SVG Path */}
                    <path
                      d="M 0,-20 Q 7,-10 4,-2 Q 2,4 0,4 Q -2,4 -4,-2 Q -7,-10 0,-20 Z"
                      fill="#ff4500"
                    >
                      <animate attributeName="d" dur="0.4s" repeatCount="indefinite"
                        values="
                          M 0,-20 Q 7,-10 4,-2 Q 2,4 0,4 Q -2,4 -4,-2 Q -7,-10 0,-20 Z;
                          M 0,-22 Q 5,-12 5,-2 Q 2,5 0,5 Q -2,5 -5,-2 Q -5,-12 0,-22 Z;
                          M 0,-20 Q 7,-10 4,-2 Q 2,4 0,4 Q -2,4 -4,-2 Q -7,-10 0,-20 Z
                        "
                      />
                    </path>

                    {/* Inner Flame Core (Yellow/White) */}
                    <path
                      d="M 0,-14 Q 4,-7 2,-1 Q 1,2 0,2 Q -1,2 -2,-1 Q -4,-7 0,-14 Z"
                      fill="#ffea00"
                    />
                    <circle cx="0" cy="-2" r="2.5" fill="#ffffff" />
                  </g>
                ) : (
                  /* SMOKE PUFF WHEN BLOWN OUT */
                  <g className="smoke-animation" transform={`translate(${candleX}, ${candleY - 52})`}>
                    <circle cx="-2" cy="-8" r="4" fill="rgba(200,200,200,0.6)" className="smoke-particle-1" />
                    <circle cx="3" cy="-16" r="6" fill="rgba(220,220,220,0.4)" className="smoke-particle-2" />
                    <circle cx="-1" cy="-26" r="8" fill="rgba(240,240,240,0.2)" className="smoke-particle-3" />
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
