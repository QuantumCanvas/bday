import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Flame,
  Mic,
  MicOff,
  Wind,
  Plus,
  Minus,
  RotateCcw,
  Heart,
  Gift,
  Palette,
  Check
} from 'lucide-react';
import { startMicBlowDetector, playPopSound } from '../utils/audio';

export default function CakeDecorator({
  flavor,
  setFlavor,
  frosting,
  setFrosting,
  toppings,
  setToppings,
  candles,
  setCandles,
  areCandlesLit,
  onBlowOutCandles,
  onRelightCandles,
  onOpenWishModal
}) {
  const [activeTab, setActiveTab] = useState('flavors');
  const [isMicActive, setIsMicActive] = useState(false);
  const [micError, setMicError] = useState(null);
  const [stopMicFunc, setStopMicFunc] = useState(null);

  // Available Flavors
  const flavors = [
    { id: 'vanilla', name: 'Vanilla Strawberry', color: '#fef3c7', icon: '🍰' },
    { id: 'redvelvet', name: 'Red Velvet Love', color: '#991b1b', icon: '❤️' },
    { id: 'chocolate', name: 'Chocolate Fudge', color: '#451a03', icon: '🍫' },
    { id: 'matcha', name: 'Matcha Dream', color: '#4d7c0f', icon: '🍵' },
    { id: 'cotton', name: 'Cotton Candy Sky', color: '#38bdf8', icon: '☁️' }
  ];

  // Frosting styles & colors
  const frostingStyles = [
    { id: 'smooth', name: 'Smooth Velvet' },
    { id: 'drip', name: 'Dripping Glaze' },
    { id: 'rosette', name: 'Rosette Swirls' },
    { id: 'sparkle', name: 'Gold Sparkles' }
  ];

  const frostingColors = [
    { name: 'Pure White', hex: '#ffffff' },
    { name: 'Blush Pink', hex: '#fbcfe8' },
    { name: 'Lavender Dream', hex: '#e9d5ff' },
    { name: 'Golden Glow', hex: '#fef08a' },
    { name: 'Mint Fresh', hex: '#bbf7d0' }
  ];

  // Available Topping options to tap & add
  const toppingOptions = [
    { type: 'strawberry', label: 'Strawberry', icon: '🍓' },
    { type: 'cherry', label: 'Sweet Cherry', icon: '🍒' },
    { type: 'chocolate', label: 'Choco Star', icon: '🍫' },
    { type: 'macaron', label: 'Macaron', icon: '🧁' },
    { type: 'flower', label: 'Sakura Flower', icon: '🌸' },
    { type: 'star', label: 'Golden Star', icon: '⭐' },
    { type: 'heart', label: 'Sweet Heart', icon: '💖' },
    { type: 'sprinkles', label: 'Rainbow Sprinkles', icon: '✨' }
  ];

  const candleColors = ['#ec4899', '#3b82f6', '#eab308', '#a855f7', '#10b981', '#f97316'];

  // Handle Topping Add/Remove
  const handleAddTopping = (toppingItem) => {
    playPopSound();
    setToppings((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), type: toppingItem.type }
    ]);
  };

  const handleClearToppings = () => {
    playPopSound();
    setToppings([]);
  };

  // Adjust Candle Count
  const handleSetCandleCount = (count) => {
    playPopSound();
    const newCount = Math.max(1, Math.min(10, count));
    const newCandles = [];
    for (let i = 0; i < newCount; i++) {
      newCandles.push({
        id: i,
        color: candleColors[i % candleColors.length],
        lit: true
      });
    }
    setCandles(newCandles);
  };

  // Toggle Microphone Blowing Listener
  const toggleMicListening = () => {
    if (isMicActive) {
      if (stopMicFunc) stopMicFunc();
      setIsMicActive(false);
      setStopMicFunc(null);
    } else {
      setMicError(null);
      const stopFn = startMicBlowDetector(
        () => {
          // Mic detected blow!
          onBlowOutCandles();
          setIsMicActive(false);
        },
        (err) => {
          setMicError("Mic access denied or unavailable. You can use the Blow Button below!");
          setIsMicActive(false);
        }
      );
      setStopMicFunc(() => stopFn);
      setIsMicActive(true);
    }
  };

  useEffect(() => {
    return () => {
      if (stopMicFunc) stopMicFunc();
    };
  }, [stopMicFunc]);

  return (
    <div className="cake-decorator-panel glass-card">
      <div className="decorator-header">
        <h2 className="decorator-title">
          <Sparkles className="title-icon icon-spin" /> Pavithra's Birthday Cake Studio
        </h2>
        <p className="decorator-subtitle">Decorate your dream cake & make a magical wish!</p>
      </div>

      {/* Tabs */}
      <div className="decorator-tabs">
        <button
          className={`tab-btn ${activeTab === 'flavors' ? 'active' : ''}`}
          onClick={() => { playPopSound(); setActiveTab('flavors'); }}
        >
          🎂 Flavor Base
        </button>
        <button
          className={`tab-btn ${activeTab === 'frosting' ? 'active' : ''}`}
          onClick={() => { playPopSound(); setActiveTab('frosting'); }}
        >
          🎨 Frosting
        </button>
        <button
          className={`tab-btn ${activeTab === 'toppings' ? 'active' : ''}`}
          onClick={() => { playPopSound(); setActiveTab('toppings'); }}
        >
          🍓 Toppings ({toppings.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'candles' ? 'active' : ''}`}
          onClick={() => { playPopSound(); setActiveTab('candles'); }}
        >
          🕯️ Candles ({candles.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="decorator-content">
        {/* FLAVORS TAB */}
        {activeTab === 'flavors' && (
          <div className="options-grid">
            {flavors.map((f) => (
              <button
                key={f.id}
                className={`option-card ${flavor.id === f.id ? 'selected' : ''}`}
                onClick={() => {
                  playPopSound();
                  setFlavor(f);
                }}
              >
                <span className="option-icon">{f.icon}</span>
                <span className="option-label">{f.name}</span>
                {flavor.id === f.id && <Check className="check-mark" size={16} />}
              </button>
            ))}
          </div>
        )}

        {/* FROSTING TAB */}
        {activeTab === 'frosting' && (
          <div className="frosting-controls">
            <h4 className="section-subhead">Frosting Style</h4>
            <div className="options-grid">
              {frostingStyles.map((s) => (
                <button
                  key={s.id}
                  className={`option-card ${frosting.style === s.id ? 'selected' : ''}`}
                  onClick={() => {
                    playPopSound();
                    setFrosting((prev) => ({ ...prev, style: s.id }));
                  }}
                >
                  <span className="option-label">{s.name}</span>
                  {frosting.style === s.id && <Check className="check-mark" size={16} />}
                </button>
              ))}
            </div>

            <h4 className="section-subhead" style={{ marginTop: '16px' }}>Icing Color</h4>
            <div className="color-swatches">
              {frostingColors.map((c) => (
                <button
                  key={c.hex}
                  className={`color-swatch ${frosting.color === c.hex ? 'active-swatch' : ''}`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  onClick={() => {
                    playPopSound();
                    setFrosting((prev) => ({ ...prev, color: c.hex }));
                  }}
                >
                  {frosting.color === c.hex && <Check size={14} color="#333" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TOPPINGS TAB */}
        {activeTab === 'toppings' && (
          <div>
            <div className="options-grid">
              {toppingOptions.map((t) => (
                <button
                  key={t.type}
                  className="option-card topping-btn"
                  onClick={() => handleAddTopping(t)}
                >
                  <span className="option-icon">{t.icon}</span>
                  <span className="option-label">+ {t.label}</span>
                </button>
              ))}
            </div>
            {toppings.length > 0 && (
              <button className="clear-btn" onClick={handleClearToppings}>
                <RotateCcw size={14} /> Clear All Toppings
              </button>
            )}
          </div>
        )}

        {/* CANDLES TAB */}
        {activeTab === 'candles' && (
          <div className="candle-controls">
            <h4 className="section-subhead">Number of Birthday Candles</h4>
            <div className="counter-row">
              <button
                className="counter-btn"
                onClick={() => handleSetCandleCount(candles.length - 1)}
                disabled={candles.length <= 1}
              >
                <Minus size={18} />
              </button>
              <span className="counter-value">{candles.length} Candles</span>
              <button
                className="counter-btn"
                onClick={() => handleSetCandleCount(candles.length + 1)}
                disabled={candles.length >= 10}
              >
                <Plus size={18} />
              </button>
            </div>
            <p className="hint-text">Tip: Click on individual candles on the cake to toggle their flames!</p>
          </div>
        )}
      </div>

      {/* CANDLE BLOWING & REVEAL ACTION PANEL */}
      <div className="action-footer">
        {areCandlesLit ? (
          <div className="blow-action-group">
            <button className="glow-button blow-main-btn" onClick={onBlowOutCandles}>
              <Wind className="btn-icon icon-bounce" /> Blow Out Candles & Make a Wish! ✨
            </button>

            <button
              className={`mic-btn ${isMicActive ? 'listening' : ''}`}
              onClick={toggleMicListening}
              title="Click to blow into your microphone!"
            >
              {isMicActive ? <Mic className="icon-pulse" size={18} /> : <MicOff size={18} />}
              {isMicActive ? 'Listening... Blow into Mic!' : 'Blow with Microphone 🎤'}
            </button>
            {micError && <p className="mic-error-msg">{micError}</p>}
          </div>
        ) : (
          <div className="wish-unlocked-group">
            <div className="candles-extinguished-badge">
              <Sparkles size={18} color="#f59e0b" /> Candles Blown Out! Your wish is on its way!
            </div>
            <div className="action-row">
              <button className="glow-button primary-reveal-btn" onClick={onOpenWishModal}>
                <Gift className="btn-icon" /> Open Jeevana's Birthday Letter 💌
              </button>
              <button className="relight-btn" onClick={onRelightCandles}>
                <Flame size={16} /> Re-light Candles
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
