import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowUpRight, ArrowDown, Menu, X, Sun, Moon, Monitor, Star, ChevronRight } from 'lucide-react';

// --- Minimal Global Styles for Fonts, Variables & Theme Utilities ---
const GlobalStyles = () => (
  <>
    <style>{`
      @font-face {
        font-family: 'Gilmer';
        src: url('/fonts/Gilmer Light.otf') format('opentype');
        font-weight: 300;
        font-style: normal;
      }
      @font-face {
        font-family: 'Gilmer';
        src: url('/fonts/Gilmer Regular.otf') format('opentype');
        font-weight: 400;
        font-style: normal;
      }
      @font-face {
        font-family: 'Gilmer';
        src: url('/fonts/Gilmer Medium.otf') format('opentype');
        font-weight: 500;
        font-style: normal;
      }
      @font-face {
        font-family: 'Gilmer';
        src: url('/fonts/Gilmer Bold.otf') format('opentype');
        font-weight: 600;
        font-style: normal;
      }
      @font-face {
        font-family: 'Gilmer';
        src: url('/fonts/Gilmer Heavy.otf') format('opentype');
        font-weight: 800;
        font-style: normal;
      }

      :root {
        --bg-color: #050505;
        --text-primary: #ffffff;
        --text-secondary: #d4d4d4;
        --text-muted: #a3a3a3;
        --accent-color: #ffffff;
        --border-color: rgba(255, 255, 255, 0.15);
        --nav-bg: rgba(5, 5, 5, 1);
        
        --font-body: 'Gilmer', sans-serif; 
        --font-heading: 'Gilmer', sans-serif;
      }

      [data-theme="light"] {
        --bg-color: #f8f8f8;
        --text-primary: #121212;
        --text-secondary: #4a4a4a;
        --text-muted: #8c8c8c;
        --accent-color: #000000;
        --border-color: rgba(0, 0, 0, 0.12);
        --nav-bg: rgba(248, 248, 248, 1);
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        background-color: var(--bg-color);
        color: var(--text-primary);
        font-family: var(--font-body);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overflow-x: hidden;
      }

      .bg-theme { background-color: var(--bg-color); }
      .text-theme { color: var(--text-primary); }
      .text-theme-muted { color: var(--text-muted); }
      .text-theme-secondary { color: var(--text-secondary); }
      .border-theme { border-color: var(--border-color); }
      .bg-theme-nav { background-color: var(--nav-bg); }
      .fill-theme { fill: var(--text-primary); }
      .stroke-theme { stroke: var(--text-primary); }

      ::-webkit-scrollbar {
        width: 8px;
        background: var(--bg-color);
      }
      ::-webkit-scrollbar-thumb {
        background: var(--text-muted);
        border-radius: 4px;
        opacity: 0.5;
      }

      .loader-svg path {
        stroke-dasharray: 12000; 
        stroke-dashoffset: 12000;
        animation: drawLogo 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        fill: transparent;
        stroke: currentColor;
        stroke-width: 20px;
        transition: stroke 0.5s ease;
      }

      .loader-svg {
        color: var(--text-primary);
      }

      @keyframes drawLogo {
        0% { stroke-dashoffset: 12000; fill: transparent; }
        60% { stroke-dashoffset: 0; fill: transparent; }
        100% { stroke-dashoffset: 0; fill: currentColor; }
      }

      @keyframes transformSymbol {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.5); }
      }

      @keyframes showTextLogo {
        0% { opacity: 0; transform: translateY(20px) scale(0.9); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes customBounce {
        0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
        40% {transform: translateY(-5px);}
        60% {transform: translateY(-3px);}
      }
      
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `}</style>
  </>
);

// --- High-Fidelity Animation Utility ---
const RevealOnScroll = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-12 scale-[0.98] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform] ${isVisible ? '!opacity-100 !translate-y-0 !scale-100' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Logos ---
const NeuaureliusSymbolLogo = ({ className, width = "100%", height = "100%" }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width} height={height} viewBox="0 0 3600 2700" version="1.1" xmlSpace="preserve" style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}>
    <path d="M867.653,1398.775c0,-95.009 14.242,-186.718 40.705,-273.106c116.865,-381.499 472.074,-659.241 891.642,-659.241c514.576,0 932.347,417.771 932.347,932.347c0,154.189 -37.51,299.686 -103.894,427.857c-43.229,83.463 -98.702,159.579 -164.035,225.962l-1596.76,-650.702l-0.005,-3.117Zm1513.317,327.004c54.551,-96.637 85.688,-208.213 85.688,-327.004c0,-367.939 -298.72,-666.658 -666.658,-666.658c-308.384,0 -568.143,209.844 -644.153,494.407l1225.124,499.255Zm-469.759,507.794l-777.869,-316.993l0,-292.809l1044.631,425.702l-105.906,184.1l-160.855,0Zm-777.869,-210.8l517.283,210.8l-517.283,0l0,-210.8Z" />
  </svg>
);

const NeuaureliusTextLogo = ({ className, width = "100%", height = "100%", style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width} height={height} viewBox="0 0 375 75" preserveAspectRatio="xMidYMid meet" version="1.0" className={className} style={style}>
    <g fill="currentColor" fillOpacity="1" fillRule="nonzero">
      <path d="M 23.464844 26.515625 C 18.527344 26.515625 14.585938 28.503906 11.640625 32.523438 L 11.640625 27.605469 L 2.050781 27.605469 L 2.050781 67.667969 L 11.640625 67.667969 L 11.640625 47.277344 C 11.640625 43.863281 12.457031 41.121094 14.089844 39.054688 C 15.722656 36.992188 17.855469 35.976562 20.519531 35.976562 C 23.109375 35.976562 25.0625 36.839844 26.375 38.566406 C 27.691406 40.296875 28.367188 42.660156 28.367188 45.703125 L 28.367188 67.667969 L 37.988281 67.667969 L 37.988281 43.789062 C 37.988281 38.457031 36.746094 34.25 34.261719 31.171875 C 31.773438 28.09375 28.1875 26.554688 23.464844 26.554688 Z M 23.464844 26.515625 " />
      <path d="M 61.128906 67.59375 C 65.566406 67.59375 69.332031 66.464844 72.421875 64.25 C 75.511719 62.035156 77.640625 59.445312 78.847656 56.515625 L 70.183594 53.8125 C 68.480469 57.230469 65.496094 58.957031 61.234375 58.957031 C 58.039062 58.957031 55.554688 58.167969 53.742188 56.554688 C 51.929688 54.9375 50.867188 52.796875 50.546875 50.132812 L 79.132812 50.132812 C 79.273438 49.308594 79.34375 48.105469 79.34375 46.527344 C 79.34375 40.785156 77.640625 36.015625 74.230469 32.222656 C 70.824219 28.429688 66.171875 26.554688 60.3125 26.554688 C 54.59375 26.554688 49.941406 28.503906 46.390625 32.410156 C 42.839844 36.316406 41.0625 41.234375 41.0625 47.128906 C 41.0625 53.285156 42.910156 58.242188 46.605469 61.996094 C 50.296875 65.753906 55.089844 67.628906 61.019531 67.628906 Z M 50.476562 43.789062 C 50.757812 41.421875 51.789062 39.394531 53.5625 37.703125 C 55.339844 36.015625 57.542969 35.152344 60.203125 35.152344 C 62.972656 35.152344 65.210938 35.976562 66.953125 37.628906 C 68.691406 39.28125 69.6875 41.347656 69.933594 43.789062 L 50.472656 43.789062 Z M 50.476562 43.789062 " />
      <path d="M 108.945312 27.605469 L 108.945312 46.753906 C 108.945312 50.246094 108.128906 53.023438 106.53125 55.089844 C 104.933594 57.152344 102.769531 58.167969 100.035156 58.167969 C 97.476562 58.167969 95.523438 57.304688 94.175781 55.578125 C 92.824219 53.851562 92.148438 51.484375 92.148438 48.441406 L 92.148438 27.679688 L 82.5625 27.679688 L 82.5625 50.359375 C 82.5625 55.726562 83.804688 59.96875 86.253906 63.046875 C 88.707031 66.128906 92.328125 67.667969 97.085938 67.667969 C 102.09375 67.667969 106.035156 65.675781 108.910156 61.660156 L 108.910156 67.628906 L 118.535156 67.667969 L 118.535156 27.679688 Z M 108.945312 27.605469 " />
      <path d="M 140.289062 67.59375 C 145.332031 67.59375 149.273438 65.640625 152.113281 61.734375 L 152.367188 67.667969 L 161.808594 67.667969 L 161.808594 27.605469 L 152.113281 27.605469 L 152.113281 32.296875 C 149.273438 28.429688 145.332031 26.515625 140.289062 26.515625 C 135.140625 26.515625 130.808594 28.46875 127.328125 32.375 C 123.847656 36.277344 122.105469 41.195312 122.105469 47.089844 C 122.105469 52.910156 123.847656 57.792969 127.328125 61.734375 C 130.808594 65.675781 135.105469 67.628906 140.253906 67.628906 Z M 141.921875 58.542969 C 138.902344 58.542969 136.417969 57.453125 134.464844 55.3125 C 132.511719 53.175781 131.554688 50.394531 131.554688 47.015625 C 131.554688 43.675781 132.511719 40.933594 134.464844 38.792969 C 136.417969 36.652344 138.902344 35.601562 141.921875 35.601562 C 144.871094 35.601562 147.355469 36.691406 149.378906 38.832031 C 151.402344 40.972656 152.398438 43.675781 152.398438 46.941406 C 152.398438 50.28125 151.402344 53.023438 149.378906 55.203125 C 147.355469 57.378906 144.871094 58.46875 141.921875 58.46875 Z M 141.921875 58.542969 " />
      <path d="M 193.542969 27.605469 L 193.542969 46.753906 C 193.542969 50.246094 192.722656 53.023438 191.125 55.089844 C 189.527344 57.152344 187.363281 58.167969 184.628906 58.167969 C 182.070312 58.167969 180.117188 57.304688 178.769531 55.578125 C 177.417969 53.851562 176.746094 51.484375 176.746094 48.441406 L 176.746094 27.679688 L 167.15625 27.679688 L 167.15625 50.359375 C 167.15625 55.726562 168.398438 59.96875 170.851562 63.046875 C 173.300781 66.128906 176.921875 67.667969 181.679688 67.667969 C 186.6875 67.667969 190.628906 65.675781 193.503906 61.660156 L 193.503906 67.667969 L 203.128906 67.628906 L 203.128906 27.679688 Z M 193.542969 27.605469 " />
      <path d="M 218.527344 33.347656 L 218.527344 27.605469 L 208.9375 27.605469 L 208.9375 67.628906 L 218.527344 67.628906 L 218.527344 49.570312 C 218.527344 44.464844 219.554688 40.859375 221.582031 38.757812 C 223.605469 36.652344 226.621094 35.941406 230.636719 36.617188 L 230.636719 27.078125 C 224.953125 26.253906 220.90625 28.355469 218.492188 33.386719 Z M 218.527344 33.347656 " />
      <path d="M 249.0625 67.59375 C 253.5 67.59375 257.265625 66.464844 260.355469 64.25 C 263.445312 62.035156 265.574219 59.445312 266.78125 56.515625 L 258.117188 53.8125 C 256.414062 57.230469 253.429688 58.957031 249.167969 58.957031 C 245.972656 58.957031 243.488281 58.167969 241.675781 56.554688 C 239.867188 54.9375 238.800781 52.796875 238.480469 50.132812 L 267.066406 50.132812 C 267.210938 49.308594 267.28125 48.105469 267.28125 46.527344 C 267.28125 40.785156 265.574219 36.015625 262.167969 32.222656 C 258.757812 28.429688 254.105469 26.554688 248.246094 26.554688 C 242.527344 26.554688 237.878906 28.503906 234.324219 32.410156 C 230.773438 36.316406 229 41.234375 229 47.128906 C 229 53.285156 230.847656 58.242188 234.539062 61.996094 C 238.230469 65.753906 243.027344 67.628906 248.957031 67.628906 Z M 238.410156 43.789062 C 238.695312 41.421875 239.722656 39.394531 241.5 37.703125 C 243.273438 36.015625 245.476562 35.152344 248.140625 35.152344 C 250.910156 35.152344 253.148438 35.976562 254.886719 37.628906 C 256.625 39.28125 257.621094 41.347656 257.871094 43.789062 Z M 238.410156 43.789062 " />
      <path d="M 270.921875 67.667969 L 280.511719 67.628906 L 280.511719 7.023438 L 270.921875 7.023438 Z M 270.921875 67.667969 " />
      <path fillRule="evenodd" d="M 286.214844 67.628906 L 286.214844 27.226562 L 295.875 27.226562 L 295.875 67.667969 Z M 286.214844 67.628906 " />
      <path d="M 327.820312 27.605469 L 327.820312 46.753906 C 327.820312 50.246094 327.003906 53.023438 325.40625 55.089844 C 323.804688 57.152344 321.640625 58.167969 318.90625 58.167969 C 316.347656 58.167969 314.394531 57.304688 313.046875 55.578125 C 311.695312 53.851562 311.023438 51.484375 311.023438 48.441406 L 311.023438 27.679688 L 301.433594 27.679688 L 301.433594 50.359375 C 301.433594 55.726562 302.675781 59.96875 305.128906 63.046875 C 307.578125 66.128906 311.199219 67.667969 315.957031 67.667969 C 320.964844 67.667969 324.90625 65.675781 327.785156 61.660156 L 327.785156 67.628906 L 337.40625 67.667969 L 337.40625 27.679688 Z M 327.820312 27.605469 " />
      <path d="M 357.707031 67.59375 C 362.355469 67.59375 366.15625 66.390625 369.140625 63.988281 C 372.121094 61.585938 373.613281 58.542969 373.613281 54.863281 C 373.613281 51.671875 372.726562 49.308594 370.914062 47.730469 C 369.105469 46.152344 366.546875 44.839844 363.246094 43.824219 L 354.082031 41.046875 C 352.058594 40.40625 351.027344 39.394531 351.027344 37.96875 C 351.027344 37.027344 351.527344 36.203125 352.554688 35.488281 C 353.585938 34.777344 354.828125 34.4375 356.285156 34.4375 C 359.90625 34.4375 362.535156 35.941406 364.132812 38.980469 L 372.65625 36.351562 C 371.484375 33.386719 369.425781 31.019531 366.511719 29.21875 C 363.601562 27.417969 360.191406 26.515625 356.320312 26.515625 C 352.238281 26.515625 348.757812 27.640625 345.878906 29.933594 C 343.003906 32.222656 341.546875 34.964844 341.546875 38.191406 C 341.546875 43.261719 344.566406 46.714844 350.640625 48.554688 L 360.011719 51.484375 C 362.746094 52.347656 364.097656 53.625 364.097656 55.3125 C 364.097656 56.441406 363.527344 57.378906 362.394531 58.167969 C 361.257812 58.957031 359.800781 59.332031 357.988281 59.332031 C 355.609375 59.332031 353.585938 58.730469 351.882812 57.527344 C 350.175781 56.328125 349.003906 54.789062 348.367188 52.875 L 339.703125 55.539062 C 340.660156 58.804688 342.789062 61.621094 346.09375 63.988281 C 349.394531 66.351562 353.230469 67.554688 357.597656 67.554688 L 357.707031 67.589844 Z M 357.707031 67.59375 " />
    </g>
  </svg>
);

const Preloader = ({ loading }) => {
  return (
    <div className={`fixed inset-0 bg-theme z-[9999] flex justify-center items-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${!loading ? '-translate-y-full pointer-events-none' : ''}`}>
      <div className="relative w-[300px] h-[80px] flex justify-center items-center">
        <div className="absolute w-[80px] h-[60px] flex justify-center items-center animate-[transformSymbol_1.2s_cubic-bezier(0.16,1,0.3,1)_2.2s_forwards]">
          <NeuaureliusSymbolLogo className="loader-svg" />
        </div>
        <div className="absolute w-full opacity-0 translate-y-[20px] text-theme animate-[showTextLogo_1.2s_cubic-bezier(0.16,1,0.3,1)_2.4s_forwards]">
          <NeuaureliusTextLogo style={{ fill: 'currentColor' }} />
        </div>
      </div>
    </div>
  );
};

const ParticleGlobe = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;

    const size = 1200;
    canvas.width = size;
    canvas.height = size;

    const cx = size / 2;
    const cy = size / 2;
    const radius = 550;

    const points = [];

    const lats = 36;
    const lons = 72;
    for (let i = 2; i < lats - 2; i++) {
      const lat = Math.PI * (-0.5 + (i / lats));
      for (let j = 0; j < lons; j++) {
        const lon = 2 * Math.PI * (j / lons);
        points.push({ x: Math.cos(lat) * Math.cos(lon), y: Math.sin(lat), z: Math.cos(lat) * Math.sin(lon), type: 'grid' });
      }
    }

    for (let i = 0; i < 3500; i++) {
      const y = 1 - (i / 3499) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      points.push({ x: Math.cos(theta) * r, y: y, z: Math.sin(theta) * r, type: 'dust' });
    }

    let angleY = 0;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      angleY += 0.001;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const angleX = 0.15;
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const projected = points.map(p => {
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        const perspective = 3.5;
        const scale = perspective / (perspective + z2);

        return { x: cx + (x1 * radius * scale), y: cy + (y2 * radius * scale), z: z2, scale: scale, type: p.type };
      });

      projected.sort((a, b) => b.z - a.z);

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        if (p.z < -0.1) continue;
        const alpha = Math.min(1, (p.z + 1.2) * 0.8);

        if (p.type === 'grid') {
          ctx.fillStyle = `rgba(255, 215, 170, ${alpha * 0.75})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.4 * p.scale, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = `rgba(255, 160, 100, ${alpha * 0.4})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 0.9 * p.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="absolute top-[40%] right-[-70%] md:top-[50%] md:right-[-35%] lg:right-[-25%] w-[250vw] h-[250vw] md:w-[1300px] md:h-[1300px] md:-translate-y-1/2 pointer-events-none z-0">
      <div className="absolute inset-10 bg-[#d4a373] opacity-[0.15] blur-[100px] rounded-full mix-blend-screen" />
      <canvas ref={canvasRef} className="w-full h-full opacity-90 mix-blend-screen" />
    </div>
  );
};


const Hero = () => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stars = useMemo(() => Array.from({ length: 40 }).map(() => ({
    top: Math.random() * 100 + '%',
    left: Math.random() * 100 + '%',
    size: Math.random() * 2 + 1 + 'px',
    opacity: Math.random() * 0.5 + 0.1
  })), []);

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center relative bg-[#050303] overflow-hidden z-0">
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-[#d4a373] opacity-[0.08] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] bg-[#b87333] opacity-[0.06] blur-[150px] rounded-full pointer-events-none" />

      <div style={{ transform: `translateY(${offsetY * 0.1}px)` }} className="absolute inset-0 z-0">
        {stars.map((star, i) => (
          <div key={i} className="absolute bg-white rounded-full pointer-events-none" style={{ top: star.top, left: star.left, width: star.size, height: star.size, opacity: star.opacity }} />
        ))}
      </div>

      <div style={{ transform: `translateY(${offsetY * 0.3}px)` }} className="absolute inset-0 z-0 pointer-events-none">
        <ParticleGlobe />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-8 w-full relative z-10 pt-20">
        <RevealOnScroll delay={100}>
          <h1 className="text-[clamp(2.5rem,10vw,8.5rem)] leading-[1.05] md:leading-[0.9] mb-12 md:mb-16 tracking-[-0.04em] font-semibold text-white font-[family:var(--font-heading)]">
            Architecting <br />
            <span className="text-[#a3a3a3]">Embodied Reality.</span>
          </h1>
        </RevealOnScroll>

        <div className="flex gap-16 md:gap-24 mt-8 flex-col md:flex-row">
          <RevealOnScroll delay={300} className="flex-1 max-w-[420px] max-md:max-w-full">
            <span className="text-[0.8rem] md:text-[0.85rem] font-bold tracking-[0.05em] uppercase mb-4 block text-white opacity-90 font-[family:var(--font-heading)]">Foundational Systems</span>
            <p className="text-[#d4d4d4] leading-relaxed text-[1.02rem] md:text-[1.05rem] font-semibold md:font-normal">
              Neuaurelius is an engineering organization dedicated to building the physical and cognitive infrastructure for intelligent machines.
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={500} className="flex-1 max-w-[420px] max-md:max-w-full">
            <span className="text-[0.8rem] md:text-[0.85rem] font-bold tracking-[0.05em] uppercase mb-4 block text-white opacity-90 font-[family:var(--font-heading)]">Autonomous Design</span>
            <p className="text-[#d4d4d4] leading-relaxed text-[1.02rem] md:text-[1.05rem] font-semibold md:font-normal">
              Moving beyond software abstractions to design complete, integrated autonomous units capable of physical interaction.
            </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={700} className="mt-16 pt-16 border-t border-white/10 flex justify-between items-end">
          <div className="text-[0.65rem] md:text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-[#a3a3a3]">Est. 2023</div>
          <button
            onClick={() => document.getElementById('vision').scrollIntoView({ behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 text-[#a3a3a3] hover:text-white transition-colors focus:outline-none"
          >
            <span className="text-[0.65rem] md:text-[0.7rem] font-semibold tracking-[0.2em] uppercase">Scroll</span>
            <ArrowDown className="animate-[customBounce_2s_infinite]" size={16} />
          </button>
        </RevealOnScroll>
      </div>
    </section>
  );
};


const TrajectoryGroup = () => {
  const items = useMemo(() => [
    {
      title: "High-Density Energy Storage",
      desc: "Advancing battery systems to enable humanoid and large-scale robotic applications to operate with greater efficiency than biological systems, eliminating the need for frequent charging."
    },
    {
      title: "Biomechanical Precision",
      desc: "Engineering high-fidelity robotic kinematics that are precise, accurate, and completely transcend traditional mechanical limitations."
    },
    {
      title: "Computational Cognition & ASI",
      desc: "Simulating unprecedented artificial superintelligence through novel technologies that scale true cognitive capability, rather than merely expanding raw computational architecture."
    }
  ], []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [renderTick, setRenderTick] = useState(0);

  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const dotRefs = useRef([]);

  useEffect(() => {
    const initialTimer = setTimeout(() => setRenderTick(t => t + 1), 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    itemRefs.current.forEach((ref) => ref && observer.observe(ref));

    const handleResize = () => setRenderTick(t => t + 1);
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(initialTimer);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const firstDotTop = dotRefs.current[0]?.offsetTop || 0;
  const firstDotHeight = dotRefs.current[0]?.offsetHeight || 0;
  const lineStart = firstDotTop + firstDotHeight / 2;

  const lastDotTop = dotRefs.current[items.length - 1]?.offsetTop || 0;
  const totalLineHeight = lastDotTop - firstDotTop;

  const activeDotTop = dotRefs.current[activeIndex]?.offsetTop || 0;
  const activeLineHeight = activeDotTop - firstDotTop;

  return (
    <div ref={containerRef} className="relative mt-20 md:mt-32 w-full max-w-5xl mx-auto py-10 overflow-visible">
      {renderTick > 0 && (
        <div
          className="absolute left-[15px] md:left-[23px] w-[2px] bg-theme-muted opacity-20 rounded-full"
          style={{ top: lineStart, height: totalLineHeight }}
        />
      )}

      {renderTick > 0 && (
        <div
          className="absolute left-[15px] md:left-[23px] w-[2px] bg-theme transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full"
          style={{ top: lineStart, height: activeLineHeight }}
        />
      )}

      <div className="flex flex-col gap-24 md:gap-40 relative z-10">
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          const isPast = index <= activeIndex;

          return (
            <div
              key={index}
              ref={el => itemRefs.current[index] = el}
              className="flex items-start gap-8 md:gap-16 group cursor-default"
            >
              <div
                ref={el => dotRefs.current[index] = el}
                className="relative flex-shrink-0 w-8 md:w-12 h-8 md:h-12 flex items-center justify-center z-10"
              >
                <div className={`absolute inset-0 bg-theme rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isActive ? 'opacity-20 scale-[2.5] blur-md' : 'opacity-0 scale-50'}`}></div>
                <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-10 ${isPast ? 'bg-theme border-theme' : 'bg-[var(--bg-color)] border-theme-muted opacity-40'}`}></div>
              </div>

              <div className={`flex-1 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] pt-1 md:pt-2 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-6 group-hover:opacity-70 group-hover:-translate-x-2'}`}>
                <span className="text-xs md:text-sm font-semibold tracking-[0.15em] uppercase text-theme-muted block mb-4 transition-colors duration-500 group-hover:text-theme">
                  0{index + 1} &mdash; {item.title}
                </span>
                <p className="text-lg md:text-[1.75rem] text-theme-secondary max-w-[650px] leading-[1.6] font-light transition-colors duration-500 group-hover:text-theme">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


// RESEARCH CATEGORIES - COMMENTED OUT
// const researchCategories = [
//   {
//     id: "index",
//     category: "Index",
//     papers: [],
//     preview: { title: "Research Index", desc: "View our complete catalog of research papers, architectural overviews, and system design documents." }
//   },
//   {
//     id: "energy",
//     category: "Energy Storage",
//     papers: [
//       { title: "Review paper on Aerogel based batteries", desc: "A comprehensive review of aerogel structures for next-generation solid-state battery electrolytes and anode matrices." }
//     ],
//     preview: { title: "Energy Storage", desc: "Exploring high-density, rapidly discharging power sources to fulfill the rigorous energy demands of continuous autonomous operation." }
//   },
//   {
//     id: "ai",
//     category: "AI Systems",
//     papers: [
//       { title: "ARC 2026", desc: "Autonomous Robotics Control 2026: A novel framework for decentralized multi-agent reinforcement learning." }
//     ],
//     preview: { title: "AI Systems", desc: "Cognitive architectures simulating advanced reasoning, real-time spatial awareness, and decentralized learning." }
//   },
//   {
//     id: "biomechanics",
//     category: "Biomechanics",
//     papers: [],
//     preview: { title: "Biomechanics", desc: "Engineering high-fidelity robotic kinematics that mirror and exceed the capabilities of organic biological systems." }
//   }
// ];
//
// const validCategories = researchCategories.filter(g => g.papers && g.papers.length > 0);

const Navigation = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [mobileResearchOpen, setMobileResearchOpen] = useState(false);

  // const [isResearchHovered, setIsResearchHovered] = useState(false);
  // const [hoveredPreview, setHoveredPreview] = useState(validCategories.length > 0 ? validCategories[0].preview : researchCategories[0].preview);
  const hoverTimeoutRef = useRef(null);

  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // If the navbar is hidden (user scrolled down), ensure the Research mega-menu closes
  // useEffect(() => {
  //   if (hidden) {
  //     setIsResearchHovered(false);
  //   }
  // }, [hidden]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    // setMobileResearchOpen(false);
    // setIsResearchHovered(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // const handleMenuEnter = () => {
  //   clearTimeout(hoverTimeoutRef.current);
  //   setIsResearchHovered(true);
  // };

  // const handleMenuLeave = () => {
  //   hoverTimeoutRef.current = setTimeout(() => {
  //     setIsResearchHovered(false);
  //   }, 150);
  // };

  const getThemeIcon = () => {
    if (theme === 'light') return <Sun size={20} />;
    if (theme === 'dark') return <Moon size={20} />;
    return <Monitor size={20} />;
  };

  const getThemeLabel = () => {
    if (theme === 'light') return 'Light Mode';
    if (theme === 'dark') return 'Dark Mode';
    return 'System Default';
  };

  const navItems = [
    { id: 'home', label: 'Index' },
    { id: 'vision', label: 'Aim' },
    // { id: 'research', label: 'Research' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <div className={`fixed top-0 left-0 w-full z-[1000] flex justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${hidden ? '-translate-y-[150%]' : 'translate-y-0'} ${scrolled ? 'pt-4 md:pt-6 px-4 pointer-events-none' : 'pt-0 px-0'}`}>

        <nav
          className={`w-full relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto ${scrolled ? 'max-w-[1000px] bg-theme border border-theme rounded-[32px] shadow-xl shadow-black/5' : 'max-w-[1400px] bg-transparent border-transparent'}`}
        >
          <div className={`w-full relative flex justify-between items-center ${scrolled ? 'py-4 px-6 md:px-8' : 'py-6 md:py-8 px-6 md:px-8'}`}>
            <button onClick={() => scrollToSection('home')} className={`z-[1001] flex items-center transition-transform duration-500 hover:scale-105 hover:opacity-80 focus:outline-none ${scrolled ? 'text-theme' : 'text-white'}`}>
              <NeuaureliusTextLogo width="130px" height="26px" style={{ fill: 'currentColor' }} />
            </button>

            <div className="flex gap-8 items-center max-md:hidden h-full">
              {navItems.map((item) => {

                // Research Menu Dropdown Trigger - COMMENTED OUT
                // if (item.id === 'research') {
                //   return (
                //     <div key={item.id} className="relative flex items-center h-full" onMouseEnter={handleMenuEnter} onMouseLeave={handleMenuLeave}>
                //       <button onClick={() => scrollToSection(item.id)} className={`text-[0.7rem] font-semibold tracking-[0.15em] uppercase relative transition-all duration-300 focus:outline-none ${scrolled ? 'text-theme-muted hover:text-theme' : 'text-white/80 hover:text-white'} ${isResearchHovered ? (scrolled ? '!text-theme' : '!text-white') : ''}`}>
                //         {item.label}
                //         <span className={`absolute -bottom-1.5 left-0 h-[1.5px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'bg-theme' : 'bg-white'} ${isResearchHovered ? 'w-full' : 'w-0'}`}></span>
                //       </button>
                //     </div>
                //   );
                // }

                return (
                  <button key={item.id} onClick={() => scrollToSection(item.id)} className={`group text-[0.7rem] font-semibold tracking-[0.15em] uppercase relative transition-all duration-300 focus:outline-none ${scrolled ? 'text-theme-muted hover:text-theme' : 'text-white/80 hover:text-white'}`}>
                    {item.label}
                    <span className={`absolute -bottom-1.5 left-0 w-0 h-[1.5px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full ${scrolled ? 'bg-theme' : 'bg-white'}`}></span>
                  </button>
                );
              })}

              <div className={`w-px h-4 mx-2 transition-colors duration-500 ${scrolled ? 'bg-[var(--border-color)]' : 'bg-white/20'}`}></div>

              <button onClick={toggleTheme} className={`transition-all duration-500 hover:rotate-12 hover:scale-110 focus:outline-none ${scrolled ? 'text-theme-muted hover:text-theme' : 'text-white/80 hover:text-white'}`} aria-label="Toggle Theme" title={`Current: ${theme}`}>
                {getThemeIcon()}
              </button>
            </div>

            <button className={`hidden max-md:block z-[1001] transition-transform duration-300 hover:scale-110 focus:outline-none ${mobileMenuOpen ? 'text-theme' : (scrolled ? 'text-theme' : 'text-white')}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Mega Menu Constraint & Centering - COMMENTED OUT */}
          {/* <div
            className={`absolute top-[100%] left-1/2 -translate-x-1/2 w-full max-w-[1000px] pt-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-[1002] hidden md:block ${isResearchHovered ? 'opacity-100 translate-y-0 pointer-events-auto visible' : 'opacity-0 translate-y-4 pointer-events-none invisible'}`}
            onMouseEnter={handleMenuEnter}
            onMouseLeave={handleMenuLeave}
          >
            <div className={`w-full rounded-[24px] p-8 md:p-10 shadow-2xl flex gap-12 text-left transition-colors duration-500 bg-theme border ${scrolled ? 'border-theme' : 'border-[var(--border-color)]'}`}>

              <div className={`w-1/3 border-r pr-8 flex flex-col justify-start transition-colors duration-500 ${scrolled ? 'border-theme' : 'border-[var(--border-color)]'}`}>
                <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-theme-muted block mb-6">Preview</span>
                <h4 className="text-2xl font-semibold text-theme mb-4 font-[family:var(--font-heading)] leading-tight">{hoveredPreview.title}</h4>
                <p className="text-sm text-theme-secondary leading-[1.6] font-light">{hoveredPreview.desc}</p>

              </div>

              <div className="w-2/3 grid grid-cols-2 gap-x-12 gap-y-10">
                {validCategories.map(group => (
                  <div
                    key={group.id}
                    onMouseEnter={() => setHoveredPreview(group.preview)}
                  >
                    <h5 className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-theme mb-4 cursor-default inline-block font-[family:var(--font-heading)]">{group.category}</h5>
                    <ul className={`flex flex-col gap-3 pl-4 border-l transition-colors duration-500 ${scrolled ? 'border-theme' : 'border-[var(--border-color)]'}`}>
                      {group.papers.map((paper, pIdx) => (
                        <li
                          key={pIdx}
                          onMouseEnter={(e) => {
                            e.stopPropagation();
                            setHoveredPreview(paper);
                          }}
                        >
                          <a href="#research" className="text-sm text-theme-secondary hover:text-theme transition-colors line-clamp-2 leading-[1.5]">{paper.title}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </nav>
      </div>

      {/* Full-Screen Mobile Menu with Interactive Research Accordion - COMMENTED OUT */}
      <div className={`fixed inset-0 bg-theme z-[999] flex flex-col justify-center items-center gap-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}>
        {navItems.map((item, index) => {
          // if (item.id === 'research') {
          //   return (
          //     <div key={item.id} className="flex flex-col items-center" style={{ opacity: mobileMenuOpen ? 1 : 0, transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)', transition: `all 0.5s ease ${index * 0.1}s` }}>
          //       <button onClick={() => setMobileResearchOpen(!mobileResearchOpen)} className="text-2xl md:text-3xl uppercase font-extrabold tracking-wide text-theme flex items-center gap-2 focus:outline-none">
          //         {item.label}
          //         <ChevronRight size={24} className={`transition-transform duration-300 ${mobileResearchOpen ? 'rotate-90' : ''}`} />
          //       </button>
          //       <div className={`flex flex-col items-center gap-6 overflow-hidden transition-all duration-500 ${mobileResearchOpen ? 'max-h-[400px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
          //         {validCategories.map((cat, idx) => (
          //           <button key={idx} onClick={() => scrollToSection('research')} className="text-sm font-bold tracking-[0.2em] uppercase text-theme-muted hover:text-theme transition-colors">
          //             {cat.category}
          //           </button>
          //         ))}
          //       </div>
          //     </div>
          //   );
          // }
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-2xl md:text-3xl uppercase font-extrabold tracking-wide text-theme focus:outline-none"
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease ${index * 0.1}s`
              }}
            >
              {item.label}
            </button>
          );
        })}

        <button
          className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-theme border border-theme py-2 px-6 rounded-full focus:outline-none"
          onClick={toggleTheme}
          style={{ opacity: mobileMenuOpen ? 1 : 0, transition: `opacity 0.5s ease 0.4s` }}
        >
          {getThemeIcon()}
          <span className="ml-2">{getThemeLabel()}</span>
        </button>
      </div>
    </>
  );
};


const Vision = () => {
  return (
    <section id="vision" className="min-h-screen flex flex-col justify-center py-24 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 w-full relative">
        <RevealOnScroll>
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            <div className="h-px w-[30px] bg-[var(--text-muted)]"></div>
            <span className="text-[0.65rem] md:text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-theme-muted">01 &mdash; Manifesto</span>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 md:gap-24">
          <div>
            <RevealOnScroll>
              <h3 className="text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.15] md:leading-[1.05] font-medium tracking-[-0.03em] text-theme transition-all duration-700 hover:tracking-[-0.01em] cursor-default">
                Intelligence requires <br /> a physical form.
              </h3>
            </RevealOnScroll>
          </div>

          <div className="flex flex-col gap-8 md:gap-12 pt-0 lg:pt-4 group">
            <RevealOnScroll delay={200}>
              <p className="text-theme-secondary leading-[1.7] text-base md:text-[1.15rem] font-light transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:opacity-30 hover:!opacity-100 hover:translate-x-3 cursor-default">
                True cognition requires a body to perceive, a world to act upon, and a feedback loop that validates reasoning against physical reality. Software alone is insufficient for general autonomy.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={400}>
              <p className="text-theme-secondary leading-[1.7] text-base md:text-[1.15rem] font-light transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:opacity-30 hover:!opacity-100 hover:translate-x-3 cursor-default">
                At Neuaurelius, we approach intelligence as a system integration challenge, where the physical form defines the cognitive constraints and capabilities.
              </p>
            </RevealOnScroll>
          </div>
        </div>

        <div className="mt-24 md:mt-32 pt-16 border-t border-theme">
          <RevealOnScroll>
            <h3 className="text-2xl md:text-[2rem] mb-8 font-medium font-[family:var(--font-heading)] text-theme">Core Trajectories</h3>
          </RevealOnScroll>
          <TrajectoryGroup />
        </div>
      </div>
    </section>
  );
};

// RESEARCH COMPONENT COMMENTED OUT
// const Research = () => {
//   const researchItems = [
//     {
//       title: 'ARC 2026',
//       category: 'AI Systems',
//       desc: 'A focused research track exploring advanced robotics and control systems for next-generation embodied intelligence.',
//     },
//     {
//       title: 'Review paper on Aerogel based batteries',
//       category: 'Energy Storage',
//       desc: 'A review-oriented subsection covering aerogel-based battery architectures, material design, and performance directions.',
//     },
//   ];
// 
//   return (
//     <section id="research" className="min-h-screen flex flex-col justify-center py-24 relative overflow-hidden">
//       <div className="max-w-[1400px] mx-auto px-6 md:px-8 w-full relative">
//         <RevealOnScroll>
//           <div className="flex items-center gap-4 mb-12 md:mb-16">
//             <div className="h-px w-[30px] bg-[var(--text-muted)]"></div>
//             <span className="text-[0.65rem] md:text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-theme-muted">02 &mdash; Research</span>
//           </div>
//         </RevealOnScroll>
// 
//         <RevealOnScroll>
//           <h3 className="text-[clamp(2.2rem,6vw,4.5rem)] leading-[1.15] md:leading-[1.05] font-medium tracking-[-0.03em] text-theme transition-all duration-700 hover:tracking-[-0.01em] cursor-default mb-14 md:mb-20">
//             Current research directions.
//           </h3>
//         </RevealOnScroll>
// 
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
//           {researchItems.map((item, index) => (
//             <RevealOnScroll key={item.title} delay={index * 150} className="h-full">
//               <div className="h-full rounded-[28px] border border-theme bg-[rgba(255,255,255,0.02)] p-8 md:p-10 transition-all duration-500 hover:border-theme hover:bg-[rgba(255,255,255,0.04)]">
//                 <span className="text-[0.7rem] md:text-[0.75rem] font-bold tracking-[0.2em] uppercase text-theme-muted block mb-6 font-[family:var(--font-heading)]">
//                   0{index + 1} &mdash; {item.category}
//                 </span>
//                 <h4 className="text-2xl md:text-[2.2rem] leading-tight font-semibold tracking-[-0.03em] text-theme mb-5 font-[family:var(--font-heading)]">
//                   {item.title}
//                 </h4>
//                 <p className="text-theme-secondary leading-[1.7] text-base md:text-[1.05rem] font-light max-w-[42ch]">
//                   {item.desc}
//                 </p>
//               </div>
//             </RevealOnScroll>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen flex flex-col justify-between py-24 pb-12 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 w-full relative flex-grow flex flex-col justify-center">
        <RevealOnScroll>
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            <div className="h-px w-[30px] bg-[var(--text-muted)]"></div>
            <span className="text-[0.65rem] md:text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-theme-muted">03 &mdash; Contact</span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <p className="text-[clamp(1.8rem,5vw,3.5rem)] font-medium leading-[1.2] md:leading-[1.1] max-w-[900px] mb-16 md:mb-24 tracking-[-0.02em] text-theme font-[family:var(--font-heading)]">
            We welcome inquiries regarding research collaboration and engineering partnerships.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <RevealOnScroll delay={300}>
            <div>
              <span className="text-[0.65rem] md:text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-theme-muted mb-4 md:mb-6 block font-[family:var(--font-heading)]">Reach Out</span>
              <a href="mailto:post@neuaurelius.com" className="text-[clamp(1.3rem,5vw,2.5rem)] font-medium inline-flex items-center gap-3 md:gap-4 border-b border-transparent pb-1 text-theme transition-colors hover:border-theme hover:text-theme-secondary no-underline">
                post@neuaurelius.com
                <ArrowUpRight size={24} className="opacity-70" />
              </a>
              <p className="text-theme-secondary mt-4 text-sm md:text-base">General Inquiries</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={400}>
            <div>
              <span className="text-[0.65rem] md:text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-theme-muted mb-4 md:mb-6 block font-[family:var(--font-heading)]">Location</span>
              <p className="text-2xl md:text-3xl font-medium mb-1 md:mb-2 text-theme font-[family:var(--font-heading)]">Jaipur</p>
              <p className="text-theme-secondary text-sm md:text-base">Rajasthan, India</p>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-8 w-full relative">
        <RevealOnScroll delay={600} className="mt-16 md:mt-24 py-8 md:py-12 border-t border-theme flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-[0.65rem] md:text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-theme-muted font-[family:var(--font-heading)]">Neuaurelius</div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-8 text-[0.65rem] md:text-[0.75rem] font-semibold tracking-[0.2em] uppercase text-theme-muted">
            <span>&copy; 2024</span>
            <span className="text-theme-secondary">All Rights Reserved</span>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

// --- App Root ---
const App = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved || 'system';
    }
    return 'system';
  });

  const [isLoading, setIsLoading] = useState(true);

  // Core Theme logic that controls global CSS Custom Properties
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (targetTheme) => {
      let visualTheme = targetTheme;
      if (targetTheme === 'system') {
        visualTheme = mediaQuery.matches ? 'dark' : 'light';
      }
      root.setAttribute('data-theme', visualTheme);
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);

    const handleSystemChange = () => {
      if (theme === 'system') {
        applyTheme('system');
      }
    };

    if (theme === 'system') {
      mediaQuery.addEventListener('change', handleSystemChange);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleSystemChange);
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === 'dark') return 'light';
      if (prev === 'light') return 'system';
      return 'dark';
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <GlobalStyles />
      <Preloader loading={isLoading} />
      <Navigation theme={theme} toggleTheme={toggleTheme} />

      <main className="transition-colors duration-700 w-full overflow-hidden">
        <Hero />
        <div className="bg-theme text-theme transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-full relative z-10 shadow-2xl">
          <Vision theme={theme} />
          {/* <Research /> */}
          <Contact />
        </div>
      </main>
    </>
  );
};

export default App;