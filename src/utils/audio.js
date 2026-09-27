// Web Audio API Sound Synthesizer & Microphone Blow Detector

let audioCtx = null;
let musicInterval = null;
let isMusicPlaying = false;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play a single synthesized note (marimba/xylophone tone)
export function playNote(freq, duration = 0.3, type = 'sine', volume = 0.2) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm envelope
    gain.gain.setValueAtTime(0.01, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(volume, ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    console.warn("Audio note error:", err);
  }
}

// Sound Effects
export function playPopSound() {
  const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 cheerful chime
  notes.forEach((freq, idx) => {
    setTimeout(() => playNote(freq, 0.15, 'triangle', 0.15), idx * 40);
  });
}

export function playBlowSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    // White noise puff + descending synth chime
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.4);
    
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start();
    
    // Magical sparkle chime
    [1046.5, 880, 698.46, 523.25].forEach((freq, i) => {
      setTimeout(() => playNote(freq, 0.25, 'sine', 0.12), 100 + i * 60);
    });
  } catch (err) {
    console.warn("Blow sound error:", err);
  }
}

export function playCelebrationFanfare() {
  const notes = [
    { f: 523.25, d: 0.2 }, { f: 523.25, d: 0.2 }, { f: 659.25, d: 0.3 }, { f: 783.99, d: 0.4 },
    { f: 1046.5, d: 0.6 }
  ];
  notes.forEach((n, idx) => {
    setTimeout(() => playNote(n.f, n.d, 'triangle', 0.25), idx * 180);
  });
}

// "Happy Birthday" Melody Synthesizer Notes
// Frequency mapping for notes in C major scale
const NOTES = {
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00, B5: 987.77, C6: 1046.50
};

const HAPPY_BIRTHDAY_SONG = [
  { note: NOTES.C4, dur: 0.35, delay: 400 },
  { note: NOTES.C4, dur: 0.35, delay: 400 },
  { note: NOTES.D4, dur: 0.6,  delay: 600 },
  { note: NOTES.C4, dur: 0.6,  delay: 600 },
  { note: NOTES.F4, dur: 0.6,  delay: 600 },
  { note: NOTES.E4, dur: 1.0,  delay: 1000 },

  { note: NOTES.C4, dur: 0.35, delay: 400 },
  { note: NOTES.C4, dur: 0.35, delay: 400 },
  { note: NOTES.D4, dur: 0.6,  delay: 600 },
  { note: NOTES.C4, dur: 0.6,  delay: 600 },
  { note: NOTES.G4, dur: 0.6,  delay: 600 },
  { note: NOTES.F4, dur: 1.0,  delay: 1000 },

  { note: NOTES.C4, dur: 0.35, delay: 400 },
  { note: NOTES.C4, dur: 0.35, delay: 400 },
  { note: NOTES.C5, dur: 0.6,  delay: 600 },
  { note: NOTES.A4, dur: 0.6,  delay: 600 },
  { note: NOTES.F4, dur: 0.6,  delay: 600 },
  { note: NOTES.E4, dur: 0.6,  delay: 600 },
  { note: NOTES.D4, dur: 1.0,  delay: 1000 },

  { note: NOTES.A5, dur: 0.35, delay: 400 },
  { note: NOTES.A5, dur: 0.35, delay: 400 },
  { note: NOTES.A4, dur: 0.6,  delay: 600 },
  { note: NOTES.F4, dur: 0.6,  delay: 600 },
  { note: NOTES.G4, dur: 0.6,  delay: 600 },
  { note: NOTES.F4, dur: 1.2,  delay: 1200 }
];

export function toggleBirthdayMusic(onStateChange) {
  if (isMusicPlaying) {
    stopBirthdayMusic();
    if (onStateChange) onStateChange(false);
    return false;
  } else {
    startBirthdayMusic(onStateChange);
    if (onStateChange) onStateChange(true);
    return true;
  }
}

export function startBirthdayMusic(onStateChange) {
  if (isMusicPlaying) return;
  isMusicPlaying = true;

  let step = 0;
  const playNextNote = () => {
    if (!isMusicPlaying) return;
    const current = HAPPY_BIRTHDAY_SONG[step];
    playNote(current.note, current.dur, 'sine', 0.22);
    
    // Add light backing harmony
    if (step % 2 === 0) {
      playNote(current.note / 2, current.dur * 0.8, 'triangle', 0.08);
    }

    step = (step + 1) % HAPPY_BIRTHDAY_SONG.length;
    musicInterval = setTimeout(playNextNote, current.delay);
  };

  playNextNote();
}

export function stopBirthdayMusic() {
  isMusicPlaying = false;
  if (musicInterval) {
    clearTimeout(musicInterval);
    musicInterval = null;
  }
}

export function getMusicState() {
  return isMusicPlaying;
}

// Microphone Loudness Listener for Candle Blowing
export function startMicBlowDetector(onBlowDetected, onError) {
  let mediaStream = null;
  let analyser = null;
  let animationId = null;

  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      mediaStream = stream;
      const ctx = getAudioContext();
      if (!ctx) return;

      const source = ctx.createMediaStreamSource(stream);
      analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      let blowThresholdHits = 0;

      const checkVolume = () => {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        // Focus on low-frequency blowing turbulence noise (bins 0-30)
        for (let i = 0; i < 30; i++) {
          sum += dataArray[i];
        }
        const average = sum / 30;

        // If average noise spike > 65, count as blowing air into microphone
        if (average > 65) {
          blowThresholdHits++;
          if (blowThresholdHits >= 4) { // Sustained blow for ~100ms
            onBlowDetected();
            stopMic();
            return;
          }
        } else {
          blowThresholdHits = Math.max(0, blowThresholdHits - 1);
        }

        animationId = requestAnimationFrame(checkVolume);
      };

      checkVolume();
    })
    .catch(err => {
      console.warn("Microphone access not available or denied:", err);
      if (onError) onError(err);
    });

  const stopMic = () => {
    if (animationId) cancelAnimationFrame(animationId);
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    }
  };

  return stopMic;
}
