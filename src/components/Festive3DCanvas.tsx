import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Festive3DCanvasProps {
  festivalGlow?: string;
  isInteractive?: boolean;
}

export const Festive3DCanvas: React.FC<Festive3DCanvasProps> = ({
  festivalGlow = '#FFB800',
  isInteractive = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLit, setIsLit] = useState(true);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 280;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.6, 3.8);
    camera.lookAt(0, 0.2, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for Diya assembly
    const diyaGroup = new THREE.Group();
    scene.add(diyaGroup);

    // 1. Earthen Diya Clay Bowl (Lathe Geometry for organic clay look)
    const points: THREE.Vector2[] = [];
    points.push(new THREE.Vector2(0, 0));
    points.push(new THREE.Vector2(0.5, 0.05));
    points.push(new THREE.Vector2(0.9, 0.25));
    points.push(new THREE.Vector2(1.1, 0.5));
    points.push(new THREE.Vector2(1.05, 0.6));
    points.push(new THREE.Vector2(0.85, 0.55));
    points.push(new THREE.Vector2(0.4, 0.25));
    points.push(new THREE.Vector2(0, 0.2));

    const bowlGeo = new THREE.LatheGeometry(points, 36);
    const clayMat = new THREE.MeshStandardMaterial({
      color: 0x933D22, // Terracotta red clay
      roughness: 0.75,
      metalness: 0.1,
    });
    const clayBowl = new THREE.Mesh(bowlGeo, clayMat);
    diyaGroup.add(clayBowl);

    // 2. Gold Rim Ornamentation
    const rimGeo = new THREE.TorusGeometry(1.06, 0.04, 16, 48);
    rimGeo.rotateX(Math.PI / 2);
    rimGeo.translate(0, 0.58, 0);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xE5B842,
      roughness: 0.25,
      metalness: 0.85,
    });
    const goldRim = new THREE.Mesh(rimGeo, goldMat);
    diyaGroup.add(goldRim);

    // 3. Oil in Diya
    const oilGeo = new THREE.CylinderGeometry(0.82, 0.45, 0.08, 32);
    const oilMat = new THREE.MeshStandardMaterial({
      color: 0x4A2E05,
      roughness: 0.1,
      metalness: 0.3,
    });
    const oilMesh = new THREE.Mesh(oilGeo, oilMat);
    oilMesh.position.set(0, 0.38, 0);
    diyaGroup.add(oilMesh);

    // 4. Cotton Wick
    const wickGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.35, 12);
    wickGeo.rotateZ(Math.PI / 6);
    const wickMat = new THREE.MeshStandardMaterial({
      color: 0x221B15,
      roughness: 0.9,
    });
    const wick = new THREE.Mesh(wickGeo, wickMat);
    wick.position.set(0.65, 0.48, 0);
    diyaGroup.add(wick);

    // 5. Stylized 3D Flame
    const flameShape = new THREE.ConeGeometry(0.18, 0.55, 24);
    flameShape.translate(0, 0.27, 0);
    const flameMat = new THREE.MeshStandardMaterial({
      color: 0xFF8800,
      emissive: 0xFFAA00,
      emissiveIntensity: 2.2,
      roughness: 0.2,
      transparent: true,
      opacity: 0.92,
    });
    const flame = new THREE.Mesh(flameShape, flameMat);
    flame.position.set(0.72, 0.58, 0);
    diyaGroup.add(flame);

    // 6. Dynamic Point Lights (Flame Glow)
    const flameLight = new THREE.PointLight(0xFFA500, 3.5, 7);
    flameLight.position.set(0.72, 0.8, 0);
    diyaGroup.add(flameLight);

    const warmAmbient = new THREE.AmbientLight(0xFFE4B5, 0.7);
    scene.add(warmAmbient);

    const keyLight = new THREE.DirectionalLight(0xFFF4E0, 1.2);
    keyLight.position.set(2, 4, 3);
    scene.add(keyLight);

    // 7. Floating 3D Festive Golden Particle Embers
    const particleCount = 75;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 3.5;
      particlePositions[i * 3 + 1] = Math.random() * 2.5;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 3.0;

      particleVelocities[i * 3] = (Math.random() - 0.5) * 0.006;
      particleVelocities[i * 3 + 1] = 0.008 + Math.random() * 0.012; // float up
      particleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.006;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle Canvas Texture for glowing circular sparks
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 220, 120, 1)');
      grad.addColorStop(0.4, 'rgba(255, 170, 40, 0.6)');
      grad.addColorStop(1, 'rgba(255, 120, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const sparkTex = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      map: sparkTex,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse / Touch Parallax
    let targetRotationX = 0;
    let targetRotationY = -0.4;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.6 - 0.4;
      targetRotationX = y * 0.3;
    };

    if (isInteractive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Animation Loop with Visibility and Reduced Motion awareness
    let animationFrameId: number;
    let isVisible = true;
    let clock = new THREE.Clock();

    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    observer.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Flame flicker & scale
      if (isLit) {
        const flicker = Math.sin(elapsed * 12) * 0.06 + Math.cos(elapsed * 17) * 0.04;
        flame.scale.set(1 + flicker, 1 + flicker * 1.5, 1 + flicker);
        flameLight.intensity = prefersReduced ? 3.0 : 3.2 + flicker * 3;
        flame.visible = true;
      } else {
        flame.visible = false;
        flameLight.intensity = 0;
      }

      // Smooth Diya tilt
      if (!prefersReduced) {
        diyaGroup.rotation.y += (targetRotationY - diyaGroup.rotation.y) * 0.05;
        diyaGroup.rotation.x += (targetRotationX - diyaGroup.rotation.x) * 0.05;
      }

      // Particle floating loop
      if (!prefersReduced) {
        const positions = particleGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += particleVelocities[i * 3 + 1];
          positions[i * 3] += particleVelocities[i * 3];
          positions[i * 3 + 2] += particleVelocities[i * 3 + 2];

          // Wrap back to bottom
          if (positions[i * 3 + 1] > 2.8) {
            positions[i * 3 + 1] = 0.1;
            positions[i * 3] = (Math.random() - 0.5) * 2.5;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
          }
        }
        particleGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      if (isInteractive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js objects to avoid WebGL memory leaks
      scene.remove(diyaGroup);
      scene.remove(particles);
      bowlGeo.dispose();
      clayMat.dispose();
      rimGeo.dispose();
      goldMat.dispose();
      oilGeo.dispose();
      oilMat.dispose();
      wickGeo.dispose();
      wickMat.dispose();
      flameShape.dispose();
      flameMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      sparkTex.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isLit, isInteractive, prefersReduced]);

  return (
    <div className="relative group w-full h-full flex flex-col items-center justify-center">
      {/* Three.js Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-[280px] sm:h-[320px] cursor-grab active:cursor-grabbing"
        role="img"
        aria-label="Interactive 3D Diya oil lamp with glowing flame and floating golden celebration sparks"
      />

      {/* Floating 3D Controls Badge */}
      <div className="absolute bottom-2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/75 backdrop-blur-md border border-line text-xs font-medium text-ink shadow-sm transition-all duration-300 group-hover:border-gold">
        <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
        <span className="text-[11px] font-semibold text-gold-ink uppercase tracking-wider">
          Interactive 3D Diya
        </span>
        <button
          onClick={() => setIsLit(!isLit)}
          className="ml-1 text-[11px] underline text-primary hover:text-gold transition-colors focus-visible:outline-none"
          title={isLit ? 'Extinguish flame' : 'Light flame'}
        >
          {isLit ? 'Dim' : 'Light'}
        </button>
      </div>
    </div>
  );
};

