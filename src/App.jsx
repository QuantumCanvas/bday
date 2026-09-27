import React, { useState } from 'react';
import BackgroundEffects from './components/BackgroundEffects';
import CakeCanvas3D from './components/CakeCanvas3D';
import CakeDecorator from './components/CakeDecorator';
import WishModal from './components/WishModal';
import { playBlowSound, playPopSound, toggleBirthdayMusic, startBirthdayMusic } from './utils/audio';
import { Sparkles, Heart, Volume2, VolumeX, Gift, Box } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  // Cake customization states
  const [flavor, setFlavor] = useState({
    id: 'vanilla',
    name: 'Vanilla Strawberry',
    color: '#fef3c7',
    icon: '🍰'
  });

  const [frosting, setFrosting] = useState({
    style: 'smooth',
    color: '#ffffff'
  });

  const [toppings, setToppings] = useState([
    { id: 1, type: 'strawberry' },
    { id: 2, type: 'cherry' },
    { id: 3, type: 'star' },
    { id: 4, type: 'heart' },
    { id: 5, type: 'macaron' }
  ]);

  const [candles, setCandles] = useState([
    { id: 0, color: '#ec4899', lit: true },
    { id: 1, color: '#3b82f6', lit: true },
    { id: 2, color: '#eab308', lit: true },
    { id: 3, color: '#a855f7', lit: true },
    { id: 4, color: '#10b981', lit: true }
  ]);

  const [areCandlesLit, setAreCandlesLit] = useState(true);
  const [isWishModalOpen, setIsWishModalOpen] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);

  // Handle Blow Out Candles Action
  const handleBlowOutCandles = () => {
    playBlowSound();
    setAreCandlesLit(false);

    // Fire quick celebratory confetti burst
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.5 }
    });

    // Automatically open the heartfelt pop-up wish after short delay
    setTimeout(() => {
      setIsWishModalOpen(true);
      // Start background birthday music melody
      startBirthdayMusic();
      setIsMusicOn(true);
    }, 700);
  };

  // Re-light candles
  const handleRelightCandles = () => {
    playPopSound();
    setAreCandlesLit(true);
  };

  // Toggle individual candle flame
  const handleToggleCandle = (index) => {
    playPopSound();
    setCandles((prev) => {
      const next = [...prev];
      if (next[index]) {
        next[index] = { ...next[index], lit: !next[index].lit };
      }
      return next;
    });
  };

  // Toggle Music
  const handleToggleMusic = () => {
    const newState = toggleBirthdayMusic((state) => setIsMusicOn(state));
    setIsMusicOn(newState);
  };

  return (
    <div className="birthday-app-root">
      {/* Background Animated Orbs & Floating Hearts */}
      <BackgroundEffects />

      {/* Top Header Navigation */}
      <header className="app-header glass-header">
        <div className="header-brand">
          <span className="brand-badge">
            <Heart size={16} color="#ec4899" fill="#ec4899" /> Jeevana → Pavithra
          </span>
          <h1 className="brand-title">
            Happy Birthday Pavithra! <span className="title-emoji">🎉</span>
          </h1>
        </div>

        <div className="header-controls">
          <button
            className={`music-btn-top ${isMusicOn ? 'active' : ''}`}
            onClick={handleToggleMusic}
          >
            {isMusicOn ? <Volume2 className="icon-pulse" size={18} /> : <VolumeX size={18} />}
            <span>{isMusicOn ? "Music On 🎵" : "Play Song 🎶"}</span>
          </button>

          {!areCandlesLit && (
            <button className="open-letter-top-btn" onClick={() => setIsWishModalOpen(true)}>
              <Gift size={16} /> Open Birthday Letter 💌
            </button>
          )}
        </div>
      </header>

      {/* Main Interactive Stage */}
      <main className="app-main-stage">
        <div className="stage-container">
          
          {/* Left Column: 3D Interactive Cake Canvas Display */}
          <div className="cake-display-section glass-card">
            <div className="cake-canvas-wrapper" style={{ height: '440px', width: '100%' }}>
              <CakeCanvas3D
                flavor={flavor}
                frosting={frosting}
                toppings={toppings}
                candles={candles}
                areCandlesLit={areCandlesLit}
                onToggleCandle={handleToggleCandle}
              />
            </div>

            <div className="cake-status-bar">
              <div className="status-item">
                <span className="status-label">3D View:</span>
                <span className="status-value">Interactive 360°</span>
              </div>
              <div className="status-item">
                <span className="status-label">Flavor:</span>
                <span className="status-value">{flavor.name} {flavor.icon}</span>
              </div>
              <div className="status-item">
                <span className="status-label">Candles:</span>
                <span className="status-value">{candles.length} ({areCandlesLit ? '🔥 Lit' : '💨 Blown Out'})</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cake Decorator Controls */}
          <div className="decorator-section">
            <CakeDecorator
              flavor={flavor}
              setFlavor={setFlavor}
              frosting={frosting}
              setFrosting={setFrosting}
              toppings={toppings}
              setToppings={setToppings}
              candles={candles}
              setCandles={setCandles}
              areCandlesLit={areCandlesLit}
              onBlowOutCandles={handleBlowOutCandles}
              onRelightCandles={handleRelightCandles}
              onOpenWishModal={() => setIsWishModalOpen(true)}
            />
          </div>

        </div>
      </main>

      {/* Footer Signature */}
      <footer className="app-footer">
        <p>
          Crafted with endless love <Heart size={14} color="#ec4899" fill="#ec4899" /> by <strong>Jeevana</strong> for <strong>Pavithra's</strong> Special Day ✨
        </p>
      </footer>

      {/* Pop-up Wish & Celebration Modal */}
      <WishModal
        isOpen={isWishModalOpen}
        onClose={() => setIsWishModalOpen(false)}
        onReplay={() => {
          setAreCandlesLit(true);
        }}
      />
    </div>
  );
}
