import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Procedural Texture Generator for Lifelike Sponge & Frosting Micro-details
function createSpongeBumpTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 256, 256);

  // Add fine porous cake sponge noise
  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const r = Math.random() * 2 + 0.5;
    const val = Math.floor(Math.random() * 120 + 60);
    ctx.fillStyle = `rgb(${val},${val},${val})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

function createFrostingSwirlTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 256, 256);

  // Subtle whipped cream spatula swirls
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#a0a0a0';
  for (let i = 0; i < 15; i++) {
    ctx.beginPath();
    ctx.arc(128, 128, 20 + i * 8, 0, Math.PI * 1.5);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

export default function CakeCanvas3D({
  flavor,
  frosting,
  toppings = [],
  candles = [],
  areCandlesLit = true,
  onToggleCandle,
  onCakeClick
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cakeGroupRef = useRef(null);
  const candleGroupRef = useRef(null);
  const toppingsGroupRef = useRef(null);
  const smokeParticlesRef = useRef([]);
  const emberParticlesRef = useRef([]);

  // Auto rotation toggle
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Lifelike Flavor Color & Material Config
  const flavorColors = {
    vanilla:   { base: 0xfff3c7, inner: 0xfde68a, accent: 0xf43f5e, rough: 0.4 },
    redvelvet: { base: 0x881337, inner: 0x4c0519, accent: 0xffe4e6, rough: 0.35 },
    chocolate: { base: 0x3b1c10, inner: 0x1f0d07, accent: 0xfbbf24, rough: 0.25 },
    matcha:    { base: 0x3f6212, inner: 0x1a2e05, accent: 0xd9f99d, rough: 0.4 },
    cotton:    { base: 0x38bdf8, inner: 0x0284c7, accent: 0xf472b6, rough: 0.3 }
  };

  const currentFlavor = flavorColors[flavor.id] || flavorColors.vanilla;

  // Initialize Three.js Photorealistic Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 4.2, 8.8);
    camera.lookAt(0, 0.6, 0);

    // 3. Renderer with High Fidelity Shadows & Tone Mapping
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.appendChild(renderer.domElement);

    // 4. Studio Lighting System for Delicious Highlights & Contact Shadows
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 0.9);
    scene.add(ambientLight);

    // Warm Main Key Light (Soft Warm Sunbeam)
    const mainLight = new THREE.DirectionalLight(0xfff5ea, 1.8);
    mainLight.position.set(6, 12, 8);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.bias = -0.0001;
    mainLight.shadow.radius = 3;
    scene.add(mainLight);

    // Pink/Purple Rim Fill Light for Magical Backdrop Glow
    const rimLight = new THREE.DirectionalLight(0xec4899, 0.9);
    rimLight.position.set(-6, 5, -6);
    scene.add(rimLight);

    // Soft Bottom Fill Light
    const fillLight = new THREE.PointLight(0xa855f7, 0.5, 15);
    fillLight.position.set(0, -2, 5);
    scene.add(fillLight);

    // 5. Root Cake Group
    const cakeGroup = new THREE.Group();
    scene.add(cakeGroup);
    cakeGroupRef.current = cakeGroup;

    // 6. Photorealistic Glass & Gold Cake Stand / Pedestal
    const plateGeo = new THREE.CylinderGeometry(3.1, 2.7, 0.16, 64);
    const plateMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.4,
      opacity: 1,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1,
      ior: 1.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.position.y = -0.08;
    plate.receiveShadow = true;
    cakeGroup.add(plate);

    // Gold Beveled Trim Ring
    const trimGeo = new THREE.TorusGeometry(3.05, 0.05, 24, 64);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.15
    });
    const trim = new THREE.Mesh(trimGeo, goldMat);
    trim.rotation.x = Math.PI / 2;
    trim.position.y = -0.01;
    cakeGroup.add(trim);

    // Elegant Pedestal Base
    const pedestalGeo = new THREE.CylinderGeometry(0.75, 1.45, 0.65, 32);
    const pedestal = new THREE.Mesh(pedestalGeo, plateMat);
    pedestal.position.y = -0.48;
    pedestal.receiveShadow = true;
    cakeGroup.add(pedestal);

    // Mouse & Touch Drag Rotation Controls
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      previousMouseX = e.clientX || (e.touches && e.touches[0].clientX);
      previousMouseY = e.clientY || (e.touches && e.touches[0].clientY);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const currentX = e.clientX || (e.touches && e.touches[0].clientX);
      const currentY = e.clientY || (e.touches && e.touches[0].clientY);

      const deltaX = currentX - previousMouseX;
      const deltaY = currentY - previousMouseY;

      cakeGroup.rotation.y += deltaX * 0.009;
      camera.position.y = Math.max(2, Math.min(6.5, camera.position.y - deltaY * 0.009));
      camera.lookAt(0, 0.6, 0);

      previousMouseX = currentX;
      previousMouseY = currentY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onMouseDown);
    domElem.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    domElem.addEventListener('touchstart', onMouseDown, { passive: true });
    domElem.addEventListener('touchmove', onMouseMove, { passive: true });
    window.addEventListener('touchend', onMouseUp);

    // Animation Loop for Lifelike Physics & Flame Motion
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Auto Rotation
      if (isAutoRotating && !isDragging) {
        cakeGroup.rotation.y += 0.004;
      }

      // 1. ANIMATE EXTINCTION SMOKE WISPS
      if (smokeParticlesRef.current.length > 0) {
        smokeParticlesRef.current.forEach((sp, idx) => {
          sp.mesh.position.y += sp.speedY;
          sp.mesh.position.x += Math.sin(elapsedTime * 5 + idx) * 0.007;
          sp.mesh.position.z += Math.cos(elapsedTime * 4 + idx) * 0.007;
          sp.mesh.scale.multiplyScalar(1.02);
          sp.mesh.material.opacity -= 0.007;

          if (sp.mesh.material.opacity <= 0) {
            scene.remove(sp.mesh);
            smokeParticlesRef.current.splice(idx, 1);
          }
        });
      }

      // 2. ANIMATE EMBER SPARKS
      if (emberParticlesRef.current.length > 0) {
        emberParticlesRef.current.forEach((ep, idx) => {
          ep.mesh.position.y += ep.speedY;
          ep.mesh.position.x += Math.sin(elapsedTime * 10 + idx) * 0.003;
          ep.mesh.material.opacity -= 0.022;

          if (ep.mesh.material.opacity <= 0) {
            scene.remove(ep.mesh);
            emberParticlesRef.current.splice(idx, 1);
          }
        });
      }

      // 3. LIFELIKE CANDLE FLAME ANIMATION
      if (candleGroupRef.current) {
        candleGroupRef.current.children.forEach((candleObj, candleIdx) => {
          const flameGroup = candleObj.getObjectByName('flameGroup');
          const pointLight = candleObj.getObjectByName('flameLight');

          if (flameGroup && flameGroup.visible) {
            const freq1 = Math.sin(elapsedTime * 18 + candleIdx * 2.5);
            const freq2 = Math.cos(elapsedTime * 28 + candleIdx * 1.7);
            const freq3 = Math.sin(elapsedTime * 38 + candleIdx * 3.1);

            // Natural Flame Stretch & Squeeze
            const scaleY = 1 + freq1 * 0.12 + freq2 * 0.08;
            const scaleXZ = 1 - freq1 * 0.06;
            flameGroup.scale.set(scaleXZ, scaleY, scaleXZ);

            // Sway & Tilt
            flameGroup.rotation.z = Math.sin(elapsedTime * 4 + candleIdx) * 0.08 + freq2 * 0.04;
            flameGroup.rotation.x = Math.cos(elapsedTime * 5 + candleIdx * 2) * 0.08 + freq3 * 0.04;

            // Halo Aura Scale
            const auraHalo = flameGroup.getObjectByName('auraHalo');
            if (auraHalo) {
              const auraScale = 1 + freq3 * 0.15;
              auraHalo.scale.set(auraScale, auraScale, auraScale);
            }

            // Dynamic PointLight Flicker
            if (pointLight) {
              pointLight.intensity = 1.6 + freq1 * 0.4 + freq3 * 0.2;
              pointLight.color.setHSL(0.08 + freq2 * 0.02, 1.0, 0.65 + freq2 * 0.05);
            }

            // Ember Spark
            if (Math.random() < 0.07) {
              const sparkGeo = new THREE.SphereGeometry(0.015, 6, 6);
              const sparkMat = new THREE.MeshBasicMaterial({
                color: Math.random() > 0.5 ? 0xffea00 : 0xff7700,
                transparent: true,
                opacity: 0.9,
                blending: THREE.AdditiveBlending
              });
              const spark = new THREE.Mesh(sparkGeo, sparkMat);
              const worldPos = new THREE.Vector3();
              flameGroup.getWorldPosition(worldPos);
              spark.position.set(
                worldPos.x + (Math.random() - 0.5) * 0.04,
                worldPos.y + 0.35,
                worldPos.z + (Math.random() - 0.5) * 0.04
              );
              scene.add(spark);
              emberParticlesRef.current.push({
                mesh: spark,
                speedY: 0.012 + Math.random() * 0.008
              });
            }
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', onMouseDown);
      domElem.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Re-build Photorealistic Cake Mesh when Options Change
  useEffect(() => {
    const cakeGroup = cakeGroupRef.current;
    if (!cakeGroup) return;

    // Remove old cake tiers (keep plate & stand at indices 0, 1, 2)
    while (cakeGroup.children.length > 3) {
      cakeGroup.remove(cakeGroup.children[cakeGroup.children.length - 1]);
    }

    const spongeBumpMap = createSpongeBumpTexture();
    const frostingSwirlMap = createFrostingSwirlTexture();

    const flavorColor = currentFlavor.base;
    const frostingHex = parseInt((frosting.color || '#ffffff').replace('#', '0x'));

    // Photorealistic Materials with Clearcoat & Bump Maps
    const cakeBaseMat = new THREE.MeshStandardMaterial({
      color: flavorColor,
      bumpMap: spongeBumpMap,
      bumpScale: 0.02,
      roughness: currentFlavor.rough,
      metalness: 0.02
    });

    const creamFillingMat = new THREE.MeshPhysicalMaterial({
      color: currentFlavor.accent,
      roughness: 0.2,
      clearcoat: 0.5,
      clearcoatRoughness: 0.1
    });

    const frostingMat = new THREE.MeshPhysicalMaterial({
      color: frostingHex,
      bumpMap: frostingSwirlMap,
      bumpScale: 0.01,
      roughness: 0.15,
      metalness: 0.02,
      clearcoat: 0.85,
      clearcoatRoughness: 0.15
    });

    // Helper: Create Rounded Beveled Cylinder for Realistic Soft Edges
    const createBeveledTier = (radius, height, material) => {
      const shape = new THREE.Shape();
      shape.absarc(0, 0, radius, 0, Math.PI * 2, false);
      const extrudeSettings = {
        depth: height,
        bevelEnabled: true,
        bevelSegments: 8,
        steps: 1,
        bevelSize: 0.08,
        bevelThickness: 0.08,
        curveSegments: 64
      };
      const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      geo.rotateX(Math.PI / 2); // Orient upright
      return new THREE.Mesh(geo, material);
    };

    // -------------------------------------------------------------
    // BOTTOM TIER CAKE (BEVELED REALISTIC)
    // -------------------------------------------------------------
    const bottomRadius = 2.2;
    const bottomHeight = 1.25;

    const bottomTier = createBeveledTier(bottomRadius, bottomHeight, cakeBaseMat);
    bottomTier.position.y = bottomHeight + 0.04;
    bottomTier.castShadow = true;
    bottomTier.receiveShadow = true;
    cakeGroup.add(bottomTier);

    // Rich Cream Layer Sandwich
    const stripe = new THREE.Mesh(
      new THREE.CylinderGeometry(bottomRadius + 0.02, bottomRadius + 0.02, 0.14, 64),
      creamFillingMat
    );
    stripe.position.y = bottomHeight / 2;
    cakeGroup.add(stripe);

    // Bottom Tier Frosting Smooth Cap
    const bottomFrostingCap = new THREE.Mesh(
      new THREE.CylinderGeometry(bottomRadius + 0.03, bottomRadius + 0.03, 0.09, 64),
      frostingMat
    );
    bottomFrostingCap.position.y = bottomHeight + 0.08;
    cakeGroup.add(bottomFrostingCap);

    // Realistic Piped Rosettes / Fluid Drips for Bottom Tier
    if (frosting.style === 'drip') {
      const dripCount = 22;
      for (let i = 0; i < dripCount; i++) {
        const angle = (i / dripCount) * Math.PI * 2;
        const dripHeight = 0.22 + (i % 3 === 0 ? 0.38 : i % 2 === 0 ? 0.22 : 0.12);
        
        // Fluid droplet teardrop mesh
        const dripGeo = new THREE.ConeGeometry(0.09, dripHeight, 16);
        const drip = new THREE.Mesh(dripGeo, frostingMat);
        drip.rotation.x = Math.PI; // Point down
        drip.position.set(
          Math.cos(angle) * (bottomRadius + 0.03),
          bottomHeight - dripHeight / 2 + 0.05,
          Math.sin(angle) * (bottomRadius + 0.03)
        );
        cakeGroup.add(drip);
      }
    } else if (frosting.style === 'rosette') {
      const rosetteCount = 18;
      for (let i = 0; i < rosetteCount; i++) {
        const angle = (i / rosetteCount) * Math.PI * 2;
        // Piped Swirl Rosette Geometry
        const rosGeo = new THREE.TorusKnotGeometry(0.12, 0.04, 32, 8, 2, 3);
        const rosette = new THREE.Mesh(rosGeo, frostingMat);
        rosette.rotation.x = Math.PI / 2;
        rosette.position.set(
          Math.cos(angle) * (bottomRadius - 0.08),
          bottomHeight + 0.14,
          Math.sin(angle) * (bottomRadius - 0.08)
        );
        cakeGroup.add(rosette);
      }
    }

    // -------------------------------------------------------------
    // TOP TIER CAKE (BEVELED REALISTIC)
    // -------------------------------------------------------------
    const topRadius = 1.4;
    const topHeight = 1.05;
    const topPosY = bottomHeight + 0.14;

    const topTier = createBeveledTier(topRadius, topHeight, cakeBaseMat);
    topTier.position.y = topPosY + topHeight;
    topTier.castShadow = true;
    topTier.receiveShadow = true;
    cakeGroup.add(topTier);

    // Top Tier Cream Layer
    const topStripe = new THREE.Mesh(
      new THREE.CylinderGeometry(topRadius + 0.02, topRadius + 0.02, 0.12, 64),
      creamFillingMat
    );
    topStripe.position.y = topPosY + topHeight / 2;
    cakeGroup.add(topStripe);

    // Top Tier Frosting Cap
    const topFrostingCap = new THREE.Mesh(
      new THREE.CylinderGeometry(topRadius + 0.03, topRadius + 0.03, 0.09, 64),
      frostingMat
    );
    topFrostingCap.position.y = topPosY + topHeight + 0.08;
    cakeGroup.add(topFrostingCap);

    // Top Tier Drips
    if (frosting.style === 'drip') {
      const dripCount = 16;
      for (let i = 0; i < dripCount; i++) {
        const angle = (i / dripCount) * Math.PI * 2;
        const dripHeight = 0.2 + (i % 2 === 0 ? 0.3 : 0.14);
        const drip = new THREE.Mesh(
          new THREE.ConeGeometry(0.07, dripHeight, 16),
          frostingMat
        );
        drip.rotation.x = Math.PI;
        drip.position.set(
          Math.cos(angle) * (topRadius + 0.03),
          topPosY + topHeight - dripHeight / 2 + 0.05,
          Math.sin(angle) * (topRadius + 0.03)
        );
        cakeGroup.add(drip);
      }
    }

    // SCATTERED REALISTIC SPRINKLES
    const sprinklesGroup = new THREE.Group();
    cakeGroup.add(sprinklesGroup);

    const sprinkleColors = [0xef4444, 0x3b82f6, 0xeab308, 0xa855f7, 0x10b981, 0xf472b6];
    for (let s = 0; s < 45; s++) {
      const spColor = sprinkleColors[s % sprinkleColors.length];
      const spMat = new THREE.MeshStandardMaterial({ color: spColor, roughness: 0.2 });
      const sprinkleMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.025, 0.12, 8),
        spMat
      );
      
      const isTop = s % 2 === 0;
      const radius = isTop ? Math.random() * (topRadius - 0.2) : Math.random() * (bottomRadius - 0.2);
      const angle = Math.random() * Math.PI * 2;
      const y = isTop ? topPosY + topHeight + 0.13 : bottomHeight + 0.13;

      sprinkleMesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      sprinkleMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      sprinklesGroup.add(sprinkleMesh);
    }

    // -------------------------------------------------------------
    // PHOTOREALISTIC 3D TOPPINGS
    // -------------------------------------------------------------
    const toppingsGroup = new THREE.Group();
    cakeGroup.add(toppingsGroup);
    toppingsGroupRef.current = toppingsGroup;

    toppings.forEach((t, idx) => {
      const isTopTier = idx % 2 === 0;
      const radius = isTopTier ? topRadius - 0.3 : bottomRadius - 0.3;
      const angle = (idx / Math.max(1, toppings.length)) * Math.PI * 2;
      const yPos = isTopTier ? topPosY + topHeight + 0.14 : bottomHeight + 0.14;

      const posX = Math.cos(angle) * radius;
      const posZ = Math.sin(angle) * radius;

      let toppingMesh;

      if (t.type === 'strawberry') {
        // Lifelike Glazed Strawberry with Sepals
        toppingMesh = new THREE.Group();
        const berryMat = new THREE.MeshPhysicalMaterial({
          color: 0xef4444,
          roughness: 0.15,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1
        });
        const berryBody = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.38, 20), berryMat);
        berryBody.rotation.x = Math.PI;

        // Leaf Sepal Crown
        const leafMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.4 });
        for (let l = 0; l < 5; l++) {
          const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.18, 6), leafMat);
          leaf.rotation.z = 1.2;
          leaf.rotation.y = (l / 5) * Math.PI * 2;
          leaf.position.y = 0.16;
          berryBody.add(leaf);
        }
        toppingMesh.add(berryBody);
      } else if (t.type === 'cherry') {
        // Lifelike Maraschino Glossy Cherry
        toppingMesh = new THREE.Group();
        const cherryMat = new THREE.MeshPhysicalMaterial({
          color: 0x9f1239,
          roughness: 0.05,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05
        });
        const cherrySphere = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 24), cherryMat);
        
        // Curved Stem
        const stemCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0.18, 0),
          new THREE.Vector3(0.08, 0.32, 0),
          new THREE.Vector3(0.14, 0.45, 0.05)
        ]);
        const stemGeo = new THREE.TubeGeometry(stemCurve, 16, 0.015, 8, false);
        const stemMat = new THREE.MeshStandardMaterial({ color: 0x166534 });
        const stem = new THREE.Mesh(stemGeo, stemMat);
        
        toppingMesh.add(cherrySphere, stem);
      } else if (t.type === 'macaron') {
        // French Macaron with Ruffled Feet ("Pied")
        toppingMesh = new THREE.Group();
        const mMat = new THREE.MeshPhysicalMaterial({
          color: 0xf472b6,
          roughness: 0.25,
          clearcoat: 0.3
        });
        const shell1 = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.09, 24), mMat);
        const shell2 = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.09, 24), mMat);
        shell1.position.y = 0.065;
        shell2.position.y = -0.065;

        // Ruffled pied texture ring
        const piedGeo = new THREE.TorusGeometry(0.21, 0.02, 12, 24);
        const pied1 = new THREE.Mesh(piedGeo, mMat);
        const pied2 = new THREE.Mesh(piedGeo, mMat);
        pied1.rotation.x = Math.PI / 2;
        pied2.rotation.x = Math.PI / 2;
        pied1.position.y = 0.02;
        pied2.position.y = -0.02;

        const cream = new THREE.Mesh(
          new THREE.CylinderGeometry(0.2, 0.2, 0.05, 24),
          new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 })
        );
        toppingMesh.add(shell1, shell2, pied1, pied2, cream);
        toppingMesh.rotation.z = 0.35;
      } else {
        // Dark Chocolate Star Shavings
        const chocoMat = new THREE.MeshPhysicalMaterial({
          color: 0x27140c,
          roughness: 0.2,
          clearcoat: 0.6
        });
        toppingMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(0.16), chocoMat);
      }

      if (toppingMesh) {
        toppingMesh.position.set(posX, yPos, posZ);
        toppingMesh.castShadow = true;
        toppingsGroup.add(toppingMesh);
      }
    });

    // -------------------------------------------------------------
    // LIFELIKE CANDLE STICKS & FLAMES
    // -------------------------------------------------------------
    const candleGroup = new THREE.Group();
    cakeGroup.add(candleGroup);
    candleGroupRef.current = candleGroup;

    const topSurfaceY = topPosY + topHeight + 0.14;
    const candleCount = candles.length;

    // Teardrop Lathe Geometry
    const flameTeardropPoints = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const r = 0.11 * Math.sin(Math.PI * t) * Math.pow(1 - t, 0.35);
      const y = 0.36 * t;
      flameTeardropPoints.push(new THREE.Vector2(r, y));
    }
    const teardropGeo = new THREE.LatheGeometry(flameTeardropPoints, 32);

    const coreTeardropPoints = [];
    for (let i = 0; i <= 20; i++) {
      const t = i / 20;
      const r = 0.06 * Math.sin(Math.PI * t) * Math.pow(1 - t, 0.4);
      const y = 0.22 * t;
      coreTeardropPoints.push(new THREE.Vector2(r, y));
    }
    const coreTeardropGeo = new THREE.LatheGeometry(coreTeardropPoints, 24);

    candles.forEach((c, idx) => {
      const candleObj = new THREE.Group();
      
      const angle = (idx / Math.max(1, candleCount)) * Math.PI * 2;
      const radius = candleCount > 1 ? 0.75 : 0;
      const posX = Math.cos(angle) * radius;
      const posZ = Math.sin(angle) * radius;

      candleObj.position.set(posX, topSurfaceY, posZ);

      // Candle Stick Body
      const cHex = parseInt((c.color || '#ec4899').replace('#', '0x'));
      const stickMat = new THREE.MeshStandardMaterial({
        color: cHex,
        roughness: 0.3
      });
      const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.65, 16), stickMat);
      stick.position.y = 0.325;
      stick.castShadow = true;
      candleObj.add(stick);

      // Wick
      const wick = new THREE.Mesh(
        new THREE.CylinderGeometry(0.012, 0.012, 0.1, 8),
        new THREE.MeshBasicMaterial({ color: 0x111111 })
      );
      wick.position.y = 0.68;
      candleObj.add(wick);

      // FLAME ROOT GROUP
      const flameGroup = new THREE.Group();
      flameGroup.position.set(0, 0.72, 0);
      flameGroup.name = 'flameGroup';
      candleObj.add(flameGroup);

      // Outer Flame
      const outerFlameMat = new THREE.MeshBasicMaterial({
        color: 0xff4500,
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const outerFlameMesh = new THREE.Mesh(teardropGeo, outerFlameMat);
      flameGroup.add(outerFlameMesh);

      // Inner Core Flame
      const innerCoreMat = new THREE.MeshBasicMaterial({
        color: 0xfff3a0,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const innerCoreMesh = new THREE.Mesh(coreTeardropGeo, innerCoreMat);
      innerCoreMesh.position.y = 0.02;
      flameGroup.add(innerCoreMesh);

      // Blue Base Anchor
      const blueBaseGeo = new THREE.SphereGeometry(0.045, 16, 16);
      const blueBaseMat = new THREE.MeshBasicMaterial({
        color: 0x2563eb,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const blueBaseMesh = new THREE.Mesh(blueBaseGeo, blueBaseMat);
      blueBaseMesh.position.y = 0.03;
      blueBaseMesh.scale.set(1, 0.6, 1);
      flameGroup.add(blueBaseMesh);

      // Aura Halo
      const haloGeo = new THREE.PlaneGeometry(0.5, 0.5);
      const haloMat = new THREE.MeshBasicMaterial({
        color: 0xffaa00,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide
      });
      const auraHalo = new THREE.Mesh(haloGeo, haloMat);
      auraHalo.position.y = 0.18;
      auraHalo.name = 'auraHalo';
      flameGroup.add(auraHalo);

      // PointLight
      const flameLight = new THREE.PointLight(0xffaa00, 1.8, 4.5);
      flameLight.position.y = 0.85;
      flameLight.name = 'flameLight';
      candleObj.add(flameLight);

      // Check Lit Status
      const isLit = areCandlesLit && c.lit !== false;
      flameGroup.visible = isLit;
      flameLight.visible = isLit;

      // Smoke particles if blown out
      if (!isLit) {
        for (let s = 0; s < 5; s++) {
          const sGeo = new THREE.SphereGeometry(0.04 + s * 0.015, 12, 12);
          const sMat = new THREE.MeshBasicMaterial({
            color: 0xe2e8f0,
            transparent: true,
            opacity: 0.65 - s * 0.1,
            depthWrite: false
          });
          const sMesh = new THREE.Mesh(sGeo, sMat);
          sMesh.position.set(
            posX + (Math.random() - 0.5) * 0.04,
            topSurfaceY + 0.75 + s * 0.12,
            posZ + (Math.random() - 0.5) * 0.04
          );
          sceneRef.current.add(sMesh);
          smokeParticlesRef.current.push({
            mesh: sMesh,
            speedY: 0.016 + Math.random() * 0.008
          });
        }
      }

      candleGroup.add(candleObj);
    });

  }, [flavor, frosting, toppings, candles, areCandlesLit, currentFlavor]);

  return (
    <div className="cake-canvas-container-3d" style={{ position: 'relative', width: '100%', height: '100%', minHeight: '440px' }}>
      {/* 3D WebGL Canvas */}
      <div ref={mountRef} style={{ width: '100%', height: '100%', cursor: 'grab' }} onClick={onCakeClick} />

      {/* Interactive 3D Controls Badge */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '6px 16px',
        borderRadius: '20px',
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        color: '#fbcfe8',
        fontSize: '0.8rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        pointerEvents: 'auto',
        userSelect: 'none'
      }}>
        <span>🖱️ Drag to rotate 3D Cake 360°</span>
        <button
          onClick={(e) => { e.stopPropagation(); setIsAutoRotating(!isAutoRotating); }}
          style={{
            background: isAutoRotating ? '#ec4899' : 'rgba(255,255,255,0.15)',
            border: 'none',
            color: 'white',
            borderRadius: '10px',
            padding: '2px 8px',
            fontSize: '0.72rem',
            cursor: 'pointer',
            fontWeight: 700
          }}
        >
          {isAutoRotating ? 'Auto Rotate: ON 🔄' : 'Auto Rotate: OFF ⏸️'}
        </button>
      </div>
    </div>
  );
}
