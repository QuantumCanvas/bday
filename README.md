# 🎂 Pavithra's Interactive 3D Birthday Card & Cake Studio

A highly interactive, beautiful 3D birthday card website built for **Pavithra** from **Jeevana**.

![Happy Birthday Pavithra](https://img.shields.io/badge/Made%20With-%E2%9D%A4%EF%B8%8F%20Jeevana-ff69b4)
![React](https://img.shields.io/badge/React-19-61dafb)
![Three.js](https://img.shields.io/badge/Three.js-3D-black)
![Vite](https://img.shields.io/badge/Vite-6-646cff)

---

## ✨ Features

- **3D Interactive Cake Studio (Three.js)**:
  - Drag & swipe to **rotate the 3D cake 360°** in real-time.
  - Photorealistic **beveled cake tiers**, porous sponge bump maps, and clearcoat glazes.
  - 5 Flavors (Vanilla Strawberry, Red Velvet, Chocolate Fudge, Matcha Dream, Cotton Candy Sky).
  - 4 Frosting styles (Smooth Velvet, Dripping Ganache, Rosette Swirls, Gold Sparkles) and icing color pickers.
  - 3D Toppings (Glazed Strawberries with leaves 🍓, Maraschino Cherries with stems 🍒, French Macarons with ruffled feet 🧁, Sugar Sprinkles ✨, Chocolates 🍫).

- **Lifelike 3D Candle Flames & Dual Blowing Modes**:
  - Multi-layer teardrop fire geometry with incandescent plasma core & blue combustion root.
  - **Microphone Blow Detection**: Blow air into your microphone to blow out the candles!
  - **Blow Out Button**: Interactive button fallback with wind animations.
  - Extinguishment rising smoke wisps & flame particle SFX.

- **Grand Pop-up Wish Reveal**:
  - Automatically triggers when candles are blown out!
  - Multi-color **confetti cannon burst** (`canvas-confetti`).
  - **Heartfelt Birthday Letter**: Animated envelope unfolding Jeevana's heartfelt letter to Pavithra.
  - **Interactive Memory Flip-Cards**: 3D flip-cards with sweet compliments.
  - **Virtual Birthday Vouchers**: Claimable promises from Jeevana (Infinite Warm Hugs, Dessert Date, Midnight Chat, Free Wish).
  - **Synthesized Music**: Pure Web Audio API Happy Birthday tune player with volume controls.

---

## 🚀 Quick Start Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/pavithra-birthday-3d.git
   cd pavithra-birthday-3d
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser!

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🛠️ Project Structure

```
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
└── src/
    ├── App.jsx
    ├── index.css
    ├── main.jsx
    ├── components/
    │   ├── BackgroundEffects.jsx
    │   ├── CakeCanvas3D.jsx
    │   ├── CakeDecorator.jsx
    │   └── WishModal.jsx
    └── utils/
        └── audio.js
```

---

Crafted with endless love ❤️ by **Jeevana** for **Pavithra** ✨
