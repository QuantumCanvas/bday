import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  Music,
  Gift,
  X,
  RotateCcw,
  Volume2,
  VolumeX,
  Smile,
  CheckCircle2,
  Star,
  Award
} from 'lucide-react';
import { toggleBirthdayMusic, getMusicState, playCelebrationFanfare, playPopSound } from '../utils/audio';

export default function WishModal({ isOpen, onClose, onReplay }) {
  const [activeTab, setActiveTab] = useState('letter'); // 'letter' | 'reasons' | 'vouchers'
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});
  const [claimedVouchers, setClaimedVouchers] = useState({});

  useEffect(() => {
    if (isOpen) {
      // Fire grand confetti burst
      fireConfetti();
      playCelebrationFanfare();
      
      // Auto open envelope after short delay
      const timer = setTimeout(() => {
        setIsEnvelopeOpen(true);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setIsEnvelopeOpen(false);
    }
  }, [isOpen]);

  const fireConfetti = () => {
    try {
      // Dual side confetti cannons
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6, x: 0.2 },
        colors: ['#ec4899', '#8b5cf6', '#3b82f6', '#f59e0b', '#10b981']
      });
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6, x: 0.8 },
        colors: ['#ec4899', '#8b5cf6', '#3b82f6', '#f59e0b', '#10b981']
      });
    } catch (e) {
      console.warn("Confetti error:", e);
    }
  };

  const handleToggleMusic = () => {
    const newState = toggleBirthdayMusic((state) => setIsPlayingMusic(state));
    setIsPlayingMusic(newState);
  };

  const toggleFlipCard = (index) => {
    playPopSound();
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleClaimVoucher = (index) => {
    playPopSound();
    setClaimedVouchers((prev) => ({ ...prev, [index]: true }));
    // Fire small burst of sparkles confetti
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  if (!isOpen) return null;

  // Reasons Pavithra is special
  const reasons = [
    {
      title: "Your Golden Heart ❤️",
      frontText: "Click to reveal what makes your heart special...",
      backText: "Your genuine warmth, empathy, and kindness illuminate every room you walk into. You care so deeply for everyone around you."
    },
    {
      title: "Unstoppable Laughter 😄",
      frontText: "Click to open a sweet memory...",
      backText: "Your laugh is wonderfully contagious! Even on the toughest days, a few minutes with you brings endless smiles and pure joy."
    },
    {
      title: "Unwavering Loyalty 🤝",
      frontText: "Click to read Jeevana's promise...",
      backText: "You are the kind of friend who is always there—in victory, in peaceful moments, and through any storm. That bond is priceless."
    },
    {
      title: "Pure Creative Magic ✨",
      frontText: "Click to unveil your superpower...",
      backText: "You possess a unique, inspiring perspective on life. You turn ordinary moments into magical memories effortlessly!"
    }
  ];

  // Birthday Vouchers from Jeevana
  const vouchers = [
    {
      id: 1,
      title: "1x Infinite Warm Hugs & Support",
      desc: "Valid anytime, anywhere. Unlimited redeems with zero expiration date!",
      icon: "🤗"
    },
    {
      id: 2,
      title: "1x Coffee, Ice Cream & Treats Date",
      desc: "Fully sponsored by Jeevana at your favorite cafe or dessert spot!",
      icon: "🍨"
    },
    {
      id: 3,
      title: "1x Midnight Chat & Snacks Pass",
      desc: "Entitles you to endless gossip, snacks, and deep conversations whenever needed.",
      icon: "🌙"
    },
    {
      id: 4,
      title: "1x Any One Wish Granted",
      desc: "No questions asked! Jeevana will fulfill one request of your choice.",
      icon: "👑"
    }
  ];

  return (
    <div className="modal-overlay">
      <div className={`wish-card-modal glass-card-modal ${isEnvelopeOpen ? 'open' : ''}`}>
        
        {/* Header Controls */}
        <div className="modal-header">
          <div className="header-badges">
            <span className="badge-sparkle">
              <Sparkles size={14} /> Happy Birthday Pavithra!
            </span>
          </div>

          <div className="header-actions">
            <button
              className={`music-toggle-btn ${isPlayingMusic ? 'playing' : ''}`}
              onClick={handleToggleMusic}
              title={isPlayingMusic ? "Mute Song" : "Play Happy Birthday Tune"}
            >
              {isPlayingMusic ? <Volume2 className="icon-pulse" size={18} /> : <VolumeX size={18} />}
              <span>{isPlayingMusic ? "Playing Music 🎶" : "Play Music 🎵"}</span>
            </button>

            <button className="close-modal-btn" onClick={onClose} title="Close Wish">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="wish-tabs">
          <button
            className={`wish-tab ${activeTab === 'letter' ? 'active' : ''}`}
            onClick={() => { playPopSound(); setActiveTab('letter'); }}
          >
            💌 Letter from Jeevana
          </button>
          <button
            className={`wish-tab ${activeTab === 'reasons' ? 'active' : ''}`}
            onClick={() => { playPopSound(); setActiveTab('reasons'); }}
          >
            ⭐ Why You Are Special
          </button>
          <button
            className={`wish-tab ${activeTab === 'vouchers' ? 'active' : ''}`}
            onClick={() => { playPopSound(); setActiveTab('vouchers'); }}
          >
            🎟️ Birthday Vouchers
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body-content">
          {/* TAB 1: HEARTFELT LETTER */}
          {activeTab === 'letter' && (
            <div className="letter-wrapper">
              <div className="envelope-graphic">
                <div className="envelope-top-flap" />
                <div className="letter-paper">
                  <div className="letter-header">
                    <h3 className="letter-greeting">Dearest Pavithra, 💕</h3>
                    <p className="letter-sub">Happy Birthday to someone incredibly special!</p>
                  </div>

                  <div className="letter-body">
                    <p>
                      Today is all about celebrating <strong>YOU</strong>—the joy you bring, the light you spread, and the wonderful person you are every single day.
                    </p>
                    <p>
                      May this new year of your life be filled with boundless happiness, unforgettable adventures, endless laughter, and all the success your heart desires. Thank you for being such an extraordinary presence in my life.
                    </p>
                    <p>
                      Keep shining brightly, dreaming big, and being the amazing soul you are! Always remember how truly appreciated and cherished you are.
                    </p>
                  </div>

                  <div className="letter-footer">
                    <p className="letter-closing">With lots of love & best wishes always,</p>
                    <p className="letter-signature">~ Jeevana ✨</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REASONS WHY PAVITHRA IS SPECIAL */}
          {activeTab === 'reasons' && (
            <div className="reasons-grid">
              {reasons.map((r, idx) => (
                <div
                  key={idx}
                  className={`flip-card ${flippedCards[idx] ? 'flipped' : ''}`}
                  onClick={() => toggleFlipCard(idx)}
                >
                  <div className="flip-card-inner">
                    <div className="flip-card-front glass-card">
                      <Star className="card-star-icon" size={24} />
                      <h4 className="card-front-title">{r.title}</h4>
                      <p className="card-front-hint">{r.frontText}</p>
                      <span className="tap-flip-badge">Tap to flip 🔄</span>
                    </div>
                    <div className="flip-card-back glass-card">
                      <Heart className="card-heart-icon" size={24} fill="#ec4899" color="#ec4899" />
                      <p className="card-back-text">{r.backText}</p>
                      <span className="tap-flip-badge">Tap to close 🔄</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: BIRTHDAY VOUCHERS */}
          {activeTab === 'vouchers' && (
            <div className="vouchers-list">
              <p className="vouchers-intro">Special Birthday Promises from Jeevana! Tap any voucher to claim it:</p>
              <div className="vouchers-grid">
                {vouchers.map((v, idx) => {
                  const isClaimed = claimedVouchers[idx];
                  return (
                    <div key={v.id} className={`voucher-card ${isClaimed ? 'claimed' : ''}`}>
                      <div className="voucher-icon">{v.icon}</div>
                      <div className="voucher-details">
                        <h4 className="voucher-title">{v.title}</h4>
                        <p className="voucher-desc">{v.desc}</p>
                      </div>
                      <button
                        className={`claim-btn ${isClaimed ? 'claimed-btn' : ''}`}
                        onClick={() => handleClaimVoucher(idx)}
                        disabled={isClaimed}
                      >
                        {isClaimed ? (
                          <>
                            <CheckCircle2 size={16} /> Claimed!
                          </>
                        ) : (
                          'Claim Voucher 🎟️'
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="modal-footer">
          <button className="confetti-reburst-btn" onClick={fireConfetti}>
            <Sparkles size={16} /> More Confetti! 🎉
          </button>
          
          <button
            className="replay-game-btn"
            onClick={() => {
              onClose();
              if (onReplay) onReplay();
            }}
          >
            <RotateCcw size={16} /> Redecorate Cake 🎂
          </button>
        </div>

      </div>
    </div>
  );
}
