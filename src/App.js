import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowUpRight, ArrowDown, Menu, X, Sun, Moon } from 'lucide-react';

// --- Styles & Fonts Injection ---
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
        /* Default Dark Mode Variables */
        --bg-color: #050505;
        --text-primary: #ffffff;
        --text-secondary: #d4d4d4;
        --text-muted: #a3a3a3;
        --accent-color: #ffffff;
        --border-color: rgba(255, 255, 255, 0.15);
        --nav-bg: rgba(5, 5, 5, 0.85);
        
        --font-body: 'Gilmer', sans-serif; 
        --font-heading: 'Gilmer', sans-serif;
        --max-width: 1400px;
        --nav-height: 80px;
        --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
      }

      [data-theme="light"] {
        --bg-color: #f2f2f2;
        --text-primary: #171717;
        --text-secondary: #525252;
        --text-muted: #737373;
        --accent-color: #000000;
        --border-color: rgba(0, 0, 0, 0.1);
        --nav-bg: rgba(242, 242, 242, 0.85);
      }

      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
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
        transition: background-color 0.5s ease, color 0.5s ease;
      }

      /* Scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
        background: var(--bg-color);
      }
      ::-webkit-scrollbar-thumb {
        background: var(--text-muted);
        border-radius: 4px;
        opacity: 0.5;
      }

      /* Typography Utilities */
      h1, h2, h3, h4, .brand-text {
        font-family: var(--font-heading);
        font-weight: 600;
      }

      a {
        text-decoration: none;
        color: inherit;
        transition: color 0.3s ease;
      }

      button {
        background: none;
        border: none;
        cursor: pointer;
        font-family: inherit;
        color: inherit;
        outline: none;
      }

      /* Layout Utilities */
      .container {
        max-width: var(--max-width);
        margin: 0 auto;
        padding: 0 2rem;
        width: 100%;
        position: relative;
      }

      section {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 6rem 0;
        position: relative;
      }

      /* Animation Classes */
      .reveal-wrapper {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 1.2s var(--ease-out-expo), transform 1.2s var(--ease-out-expo);
        will-change: opacity, transform;
      }
        
      .reveal-visible {
        opacity: 1;
        transform: translateY(0);
      }

      /* --- PRELOADER STYLES --- */
      .preloader {
        position: fixed;
        inset: 0;
        background-color: #050505; /* Always dark for brand intro */
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: transform 1s var(--ease-out-expo);
      }

      .preloader.loaded {
        transform: translateY(-100%);
        pointer-events: none;
      }

      .loader-content {
        position: relative;
        width: 300px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      /* Stage 1: The Symbol */
      .loader-symbol-wrapper {
        position: absolute;
        width: 80px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: transformSymbol 1.2s var(--ease-out-expo) 2.2s forwards;
      }

      .loader-svg path {
        stroke-dasharray: 12000; 
        stroke-dashoffset: 12000;
        animation: drawLogo 2.2s var(--ease-out-expo) forwards;
        fill: transparent;
        stroke: #fff;
        stroke-width: 20px;
      }

      /* Stage 2: The Text Logo */
      .loader-text-wrapper {
        position: absolute;
        width: 100%;
        opacity: 0;
        transform: translateY(20px);
        animation: showTextLogo 1.2s var(--ease-out-expo) 2.4s forwards;
      }

      @keyframes drawLogo {
        0% { stroke-dashoffset: 12000; fill: transparent; }
        60% { stroke-dashoffset: 0; fill: transparent; }
        100% { stroke-dashoffset: 0; fill: #ffffff; }
      }

      @keyframes transformSymbol {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.5); }
      }

      @keyframes showTextLogo {
        0% { opacity: 0; transform: translateY(20px) scale(0.9); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }

      /* --- Navigation --- */
      .navbar {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
        padding: 1.5rem 0;
        transition: transform 0.4s var(--ease-out-expo), background-color 0.4s ease, border-bottom 0.4s ease, padding 0.4s ease;
        border-bottom: 1px solid transparent;
      }

      .navbar.scrolled {
        background-color: var(--nav-bg);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--border-color);
        padding: 1rem 0;
      }

      .navbar.nav-hidden {
        transform: translateY(-100%);
      }

      .nav-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .logo-btn {
        z-index: 1001;
        color: var(--text-primary);
        display: flex;
        align-items: center;
        transition: opacity 0.3s;
      }
      
      .logo-btn:hover {
        opacity: 0.7;
      }

      .nav-links {
        display: flex;
        gap: 3rem;
        align-items: center;
      }

      .nav-item {
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--text-muted);
        position: relative;
        transition: color 0.3s ease;
      }

      .nav-item:hover {
        color: var(--text-primary);
      }

      .nav-item::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 1px;
        background-color: var(--text-primary);
        transition: width 0.3s ease;
      }
        
      .nav-item:hover::after {
        width: 100%;
      }

      .theme-toggle {
        color: var(--text-primary);
        transition: transform 0.3s ease, color 0.3s ease;
      }
      
      .theme-toggle:hover {
        transform: rotate(15deg);
        opacity: 0.8;
      }

      .mobile-toggle {
        display: none;
        z-index: 1001;
        color: var(--text-primary);
      }

      /* --- Mobile Menu --- */
      .mobile-menu {
        position: fixed;
        inset: 0;
        background-color: var(--bg-color);
        z-index: 999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        transition: opacity 0.5s var(--ease-out-expo), visibility 0.5s;
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }

      .mobile-menu.open {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
      }

      .mobile-link {
        font-size: 2rem;
        text-transform: uppercase;
        font-weight: 800;
        letter-spacing: 0.05em;
        color: var(--text-primary);
      }
      
      .mobile-theme-toggle {
        margin-top: 2rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        color: var(--text-primary);
        border: 1px solid var(--border-color);
        padding: 0.5rem 1rem;
        border-radius: 99px;
      }

      /* --- Hero Section --- */
      .hero-title {
        font-size: clamp(3.5rem, 11vw, 8.5rem);
        line-height: 0.9;
        margin-bottom: 4rem;
        letter-spacing: -0.04em;
        font-weight: 600;
        color: var(--text-primary);
      }

      .hero-subtitle {
        color: var(--text-secondary);
        display: block;
      }

      .hero-grid {
        display: flex;
        gap: 6rem;
        margin-top: 2rem;
      }

      .hero-col {
        flex: 1;
        max-width: 420px;
      }

      .label-text {
        font-size: 0.85rem;
        font-weight: 600;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        margin-bottom: 1rem;
        display: block;
        color: var(--text-primary);
        opacity: 0.9;
      }

      .desc-text {
        color: var(--text-secondary);
        line-height: 1.6;
        font-size: 1.05rem; 
        font-weight: 400;
      }

      .hero-footer {
        margin-top: 4rem;
        padding-top: 4rem;
        border-top: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }

      .meta-label {
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--text-muted);
      }

      .scroll-btn {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-muted);
      }
        
      .scroll-btn:hover {
        color: var(--text-primary);
      }

      .scroll-text {
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
      }

      .bounce {
        animation: bounce 2s infinite;
      }

      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
        40% {transform: translateY(-5px);}
        60% {transform: translateY(-3px);}
      }

      /* --- Vision Section --- */
      .section-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 4rem;
      }

      .line-accent {
        height: 1px;
        width: 30px;
        background-color: var(--text-muted);
      }

      .section-title {
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--text-muted);
      }

      .manifesto-grid {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        gap: 6rem;
      }

      .manifesto-heading {
        font-size: clamp(2.5rem, 5vw, 4.5rem);
        line-height: 1.05;
        font-weight: 500;
        letter-spacing: -0.03em;
        color: var(--text-primary);
      }

      .manifesto-text {
        color: var(--text-secondary);
        line-height: 1.7;
        font-size: 1.15rem;
        margin-bottom: 2rem;
        font-weight: 300;
      }

      /* --- Trajectory Component Styles --- */
      .trajectory-wrapper {
        position: relative;
        margin-top: 10rem;
        min-height: 150vh; 
        display: flex;
        padding-bottom: 20vh;
      }

      .svg-container {
        position: sticky;
        top: 20vh; 
        left: 0;
        width: 200px;
        height: 60vh; 
        pointer-events: none;
        overflow: visible;
        align-self: flex-start;
        z-index: 10;
      }

      .trajectory-list {
        flex: 1;
        padding-left: 8rem;
        display: flex;
        flex-direction: column;
        gap: 25vh; 
        padding-top: 10vh;
        position: relative;
        z-index: 5;
      }

      .trajectory-item {
        opacity: 0.2;
        transform: translateX(30px);
        transition: opacity 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo);
      }

      .trajectory-item.active {
        opacity: 1;
        transform: translateX(0);
      }

      .t-title {
        font-size: 1rem;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        margin-bottom: 0.75rem;
        display: block;
        color: var(--text-primary);
      }

      .t-desc {
        color: var(--text-secondary);
        font-size: 1.5rem;
        max-width: 600px;
        line-height: 1.4;
        font-weight: 400;
        transition: color 0.3s ease;
      }
        
      .trajectory-item:hover .t-desc {
        color: var(--text-primary);
      }

      /* Globe Styles - Updated for Sticky Positioning */
      .globe-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%; /* Covers the full scrollable trajectory area */
        z-index: 0;
        pointer-events: none;
        opacity: 0.2;
        mix-blend-mode: screen;
      }
      
      [data-theme="light"] .globe-container {
         mix-blend-mode: multiply; /* Better for light mode */
         opacity: 0.15;
      }
      
      /* New container to make the globe stick to viewport */
      .globe-sticky-view {
         position: sticky;
         top: 0;
         height: 100vh;
         width: 100%;
         display: flex;
         align-items: center;
         justify-content: center;
         overflow: hidden;
      }
      
      /* Constrains max size of globe */
      .globe-canvas-sizer {
         width: 100%;
         max-width: 900px;
         aspect-ratio: 1;
         position: relative;
      }

      /* --- Contact Section --- */
      .inquiry-text {
        font-size: clamp(2rem, 4vw, 3.5rem);
        font-weight: 500;
        line-height: 1.1;
        max-width: 900px;
        margin-bottom: 6rem;
        letter-spacing: -0.02em;
        color: var(--text-primary);
      }

      .contact-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4rem;
      }

      .contact-label {
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--text-muted);
        margin-bottom: 1.5rem;
        display: block;
      }

      .email-link {
        font-size: clamp(1.5rem, 3vw, 2.5rem);
        font-weight: 500;
        display: inline-flex;
        align-items: center;
        gap: 1rem;
        border-bottom: 1px solid transparent;
        padding-bottom: 5px;
        color: var(--text-primary);
      }

      .email-link:hover {
        border-color: var(--border-color);
        color: var(--text-secondary);
      }

      .location-text {
        font-size: 2rem;
        font-weight: 500;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
      }

      .location-sub {
        color: var(--text-secondary);
      }

      /* --- Footer --- */
      .footer {
        margin-top: 6rem;
        padding: 3rem 0;
        border-top: 1px solid var(--border-color);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .footer-text {
        font-size: 0.75rem;
        font-weight: 600;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--text-muted);
      }
        
      .footer-right {
        display: flex;
        gap: 2rem;
      }
        
      .footer-copy {
        color: var(--text-secondary);
      }

      /* --- Responsive Breakpoints --- */
      @media (max-width: 1024px) {
        .manifesto-grid {
          grid-template-columns: 1fr;
        }
        .trajectory-list {
          padding-left: 6rem;
        }
        .svg-container {
            width: 100px;
        }
        .globe-canvas-sizer {
            max-width: 600px;
        }
      }

      @media (max-width: 768px) {
        /* Mobile Nav */
        .nav-links { display: none; }
        .mobile-toggle { display: block; }
        .navbar { padding: 1.2rem 0; }
        
        .container { padding: 0 1.5rem; }

        .hero-grid {
          flex-direction: column;
          gap: 3rem;
        }

        .hero-col {
          max-width: 100%;
        }

        .manifesto-grid {
          gap: 3rem;
        }
        
        /* Mobile Trajectory - Simplified for small screens */
        .svg-container {
            display: none;
        }
        
        .trajectory-wrapper {
            margin-top: 4rem;
            min-height: auto;
            padding-left: 1.5rem;
            border-left: 1px solid var(--border-color);
            display: block;
            padding-bottom: 0;
        }
        
        .trajectory-list {
            padding-left: 2rem;
            padding-top: 0;
            gap: 4rem;
            display: flex;
            flex-direction: column;
        }
        
        .trajectory-item {
          opacity: 1;
          transform: none;
        }

        .globe-canvas-sizer {
          max-width: 350px;
        }
        
        .contact-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
        }
        
        .footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }
        
        .footer-right {
            flex-direction: column;
            gap: 0.5rem;
        }
      }
    `}</style>
  </>
);

// --- Animation Utility ---
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
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-wrapper ${isVisible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Logos ---

// 1. Original Symbol Logo (For Preloader Animation)
const NeuaureliusSymbolLogo = ({ className, width = "100%", height = "100%" }) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    xmlnsXlink="http://www.w3.org/1999/xlink" 
    width={width}
    height={height}
    viewBox="0 0 3600 2700" 
    version="1.1" 
    xmlSpace="preserve" 
    style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}
  >
    <path d="M867.653,1398.775c0,-95.009 14.242,-186.718 40.705,-273.106c116.865,-381.499 472.074,-659.241 891.642,-659.241c514.576,0 932.347,417.771 932.347,932.347c0,154.189 -37.51,299.686 -103.894,427.857c-43.229,83.463 -98.702,159.579 -164.035,225.962l-1596.76,-650.702l-0.005,-3.117Zm1513.317,327.004c54.551,-96.637 85.688,-208.213 85.688,-327.004c0,-367.939 -298.72,-666.658 -666.658,-666.658c-308.384,0 -568.143,209.844 -644.153,494.407l1225.124,499.255Zm-469.759,507.794l-777.869,-316.993l0,-292.809l1044.631,425.702l-105.906,184.1l-160.855,0Zm-777.869,-210.8l517.283,210.8l-517.283,0l0,-210.8Z"/>
  </svg>
);

// 2. New Text Logo (For Navbar & End of Preloader)
// Updated to use currentColor for fill to respect theme variables
const NeuaureliusTextLogo = ({ className, width = "100%", height = "100%", style }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    xmlnsXlink="http://www.w3.org/1999/xlink" 
    width={width} 
    height={height}
    viewBox="0 0 375 75" 
    preserveAspectRatio="xMidYMid meet" 
    version="1.0"
    className={className}
    style={style}
  >
    <g fill="currentColor" fillOpacity="1" fillRule="nonzero">
      <path d="M 23.464844 26.515625 C 18.527344 26.515625 14.585938 28.503906 11.640625 32.523438 L 11.640625 27.605469 L 2.050781 27.605469 L 2.050781 67.667969 L 11.640625 67.667969 L 11.640625 47.277344 C 11.640625 43.863281 12.457031 41.121094 14.089844 39.054688 C 15.722656 36.992188 17.855469 35.976562 20.519531 35.976562 C 23.109375 35.976562 25.0625 36.839844 26.375 38.566406 C 27.691406 40.296875 28.367188 42.660156 28.367188 45.703125 L 28.367188 67.667969 L 37.988281 67.667969 L 37.988281 43.789062 C 37.988281 38.457031 36.746094 34.25 34.261719 31.171875 C 31.773438 28.09375 28.1875 26.554688 23.464844 26.554688 Z M 23.464844 26.515625 "/>
      <path d="M 61.128906 67.59375 C 65.566406 67.59375 69.332031 66.464844 72.421875 64.25 C 75.511719 62.035156 77.640625 59.445312 78.847656 56.515625 L 70.183594 53.8125 C 68.480469 57.230469 65.496094 58.957031 61.234375 58.957031 C 58.039062 58.957031 55.554688 58.167969 53.742188 56.554688 C 51.929688 54.9375 50.867188 52.796875 50.546875 50.132812 L 79.132812 50.132812 C 79.273438 49.308594 79.34375 48.105469 79.34375 46.527344 C 79.34375 40.785156 77.640625 36.015625 74.230469 32.222656 C 70.824219 28.429688 66.171875 26.554688 60.3125 26.554688 C 54.59375 26.554688 49.941406 28.503906 46.390625 32.410156 C 42.839844 36.316406 41.0625 41.234375 41.0625 47.128906 C 41.0625 53.285156 42.910156 58.242188 46.605469 61.996094 C 50.296875 65.753906 55.089844 67.628906 61.019531 67.628906 Z M 50.476562 43.789062 C 50.757812 41.421875 51.789062 39.394531 53.5625 37.703125 C 55.339844 36.015625 57.542969 35.152344 60.203125 35.152344 C 62.972656 35.152344 65.210938 35.976562 66.953125 37.628906 C 68.691406 39.28125 69.6875 41.347656 69.933594 43.789062 L 50.472656 43.789062 Z M 50.476562 43.789062 "/>
      <path d="M 108.945312 27.605469 L 108.945312 46.753906 C 108.945312 50.246094 108.128906 53.023438 106.53125 55.089844 C 104.933594 57.152344 102.769531 58.167969 100.035156 58.167969 C 97.476562 58.167969 95.523438 57.304688 94.175781 55.578125 C 92.824219 53.851562 92.148438 51.484375 92.148438 48.441406 L 92.148438 27.679688 L 82.5625 27.679688 L 82.5625 50.359375 C 82.5625 55.726562 83.804688 59.96875 86.253906 63.046875 C 88.707031 66.128906 92.328125 67.667969 97.085938 67.667969 C 102.09375 67.667969 106.035156 65.675781 108.910156 61.660156 L 108.910156 67.628906 L 118.535156 67.667969 L 118.535156 27.679688 Z M 108.945312 27.605469 "/>
      <path d="M 140.289062 67.59375 C 145.332031 67.59375 149.273438 65.640625 152.113281 61.734375 L 152.367188 67.667969 L 161.808594 67.667969 L 161.808594 27.605469 L 152.113281 27.605469 L 152.113281 32.296875 C 149.273438 28.429688 145.332031 26.515625 140.289062 26.515625 C 135.140625 26.515625 130.808594 28.46875 127.328125 32.375 C 123.847656 36.277344 122.105469 41.195312 122.105469 47.089844 C 122.105469 52.910156 123.847656 57.792969 127.328125 61.734375 C 130.808594 65.675781 135.105469 67.628906 140.253906 67.628906 Z M 141.921875 58.542969 C 138.902344 58.542969 136.417969 57.453125 134.464844 55.3125 C 132.511719 53.175781 131.554688 50.394531 131.554688 47.015625 C 131.554688 43.675781 132.511719 40.933594 134.464844 38.792969 C 136.417969 36.652344 138.902344 35.601562 141.921875 35.601562 C 144.871094 35.601562 147.355469 36.691406 149.378906 38.832031 C 151.402344 40.972656 152.398438 43.675781 152.398438 46.941406 C 152.398438 50.28125 151.402344 53.023438 149.378906 55.203125 C 147.355469 57.378906 144.871094 58.46875 141.921875 58.46875 Z M 141.921875 58.542969 "/>
      <path d="M 193.542969 27.605469 L 193.542969 46.753906 C 193.542969 50.246094 192.722656 53.023438 191.125 55.089844 C 189.527344 57.152344 187.363281 58.167969 184.628906 58.167969 C 182.070312 58.167969 180.117188 57.304688 178.769531 55.578125 C 177.417969 53.851562 176.746094 51.484375 176.746094 48.441406 L 176.746094 27.679688 L 167.15625 27.679688 L 167.15625 50.359375 C 167.15625 55.726562 168.398438 59.96875 170.851562 63.046875 C 173.300781 66.128906 176.921875 67.667969 181.679688 67.667969 C 186.6875 67.667969 190.628906 65.675781 193.503906 61.660156 L 193.503906 67.667969 L 203.128906 67.628906 L 203.128906 27.679688 Z M 193.542969 27.605469 "/>
      <path d="M 218.527344 33.347656 L 218.527344 27.605469 L 208.9375 27.605469 L 208.9375 67.628906 L 218.527344 67.628906 L 218.527344 49.570312 C 218.527344 44.464844 219.554688 40.859375 221.582031 38.757812 C 223.605469 36.652344 226.621094 35.941406 230.636719 36.617188 L 230.636719 27.078125 C 224.953125 26.253906 220.90625 28.355469 218.492188 33.386719 Z M 218.527344 33.347656 "/>
      <path d="M 249.0625 67.59375 C 253.5 67.59375 257.265625 66.464844 260.355469 64.25 C 263.445312 62.035156 265.574219 59.445312 266.78125 56.515625 L 258.117188 53.8125 C 256.414062 57.230469 253.429688 58.957031 249.167969 58.957031 C 245.972656 58.957031 243.488281 58.167969 241.675781 56.554688 C 239.867188 54.9375 238.800781 52.796875 238.480469 50.132812 L 267.066406 50.132812 C 267.210938 49.308594 267.28125 48.105469 267.28125 46.527344 C 267.28125 40.785156 265.574219 36.015625 262.167969 32.222656 C 258.757812 28.429688 254.105469 26.554688 248.246094 26.554688 C 242.527344 26.554688 237.878906 28.503906 234.324219 32.410156 C 230.773438 36.316406 229 41.234375 229 47.128906 C 229 53.285156 230.847656 58.242188 234.539062 61.996094 C 238.230469 65.753906 243.027344 67.628906 248.957031 67.628906 Z M 238.410156 43.789062 C 238.695312 41.421875 239.722656 39.394531 241.5 37.703125 C 243.273438 36.015625 245.476562 35.152344 248.140625 35.152344 C 250.910156 35.152344 253.148438 35.976562 254.886719 37.628906 C 256.625 39.28125 257.621094 41.347656 257.871094 43.789062 Z M 238.410156 43.789062 "/>
      <path d="M 270.921875 67.667969 L 280.511719 67.628906 L 280.511719 7.023438 L 270.921875 7.023438 Z M 270.921875 67.667969 "/>
      <path fillRule="evenodd" d="M 286.214844 67.628906 L 286.214844 27.226562 L 295.875 27.226562 L 295.875 67.667969 Z M 286.214844 67.628906 "/>
      <path d="M 327.820312 27.605469 L 327.820312 46.753906 C 327.820312 50.246094 327.003906 53.023438 325.40625 55.089844 C 323.804688 57.152344 321.640625 58.167969 318.90625 58.167969 C 316.347656 58.167969 314.394531 57.304688 313.046875 55.578125 C 311.695312 53.851562 311.023438 51.484375 311.023438 48.441406 L 311.023438 27.679688 L 301.433594 27.679688 L 301.433594 50.359375 C 301.433594 55.726562 302.675781 59.96875 305.128906 63.046875 C 307.578125 66.128906 311.199219 67.667969 315.957031 67.667969 C 320.964844 67.667969 324.90625 65.675781 327.785156 61.660156 L 327.785156 67.628906 L 337.40625 67.667969 L 337.40625 27.679688 Z M 327.820312 27.605469 "/>
      <path d="M 357.707031 67.59375 C 362.355469 67.59375 366.15625 66.390625 369.140625 63.988281 C 372.121094 61.585938 373.613281 58.542969 373.613281 54.863281 C 373.613281 51.671875 372.726562 49.308594 370.914062 47.730469 C 369.105469 46.152344 366.546875 44.839844 363.246094 43.824219 L 354.082031 41.046875 C 352.058594 40.40625 351.027344 39.394531 351.027344 37.96875 C 351.027344 37.027344 351.527344 36.203125 352.554688 35.488281 C 353.585938 34.777344 354.828125 34.4375 356.285156 34.4375 C 359.90625 34.4375 362.535156 35.941406 364.132812 38.980469 L 372.65625 36.351562 C 371.484375 33.386719 369.425781 31.019531 366.511719 29.21875 C 363.601562 27.417969 360.191406 26.515625 356.320312 26.515625 C 352.238281 26.515625 348.757812 27.640625 345.878906 29.933594 C 343.003906 32.222656 341.546875 34.964844 341.546875 38.191406 C 341.546875 43.261719 344.566406 46.714844 350.640625 48.554688 L 360.011719 51.484375 C 362.746094 52.347656 364.097656 53.625 364.097656 55.3125 C 364.097656 56.441406 363.527344 57.378906 362.394531 58.167969 C 361.257812 58.957031 359.800781 59.332031 357.988281 59.332031 C 355.609375 59.332031 353.585938 58.730469 351.882812 57.527344 C 350.175781 56.328125 349.003906 54.789062 348.367188 52.875 L 339.703125 55.539062 C 340.660156 58.804688 342.789062 61.621094 346.09375 63.988281 C 349.394531 66.351562 353.230469 67.554688 357.597656 67.554688 L 357.707031 67.589844 Z M 357.707031 67.59375 "/>
    </g>
  </svg>
);

// --- Preloader Component ---
const Preloader = ({ loading }) => {
  return (
    <div className={`preloader ${!loading ? 'loaded' : ''}`}>
      <div className="loader-content">
        
        {/* Stage 1: The Symbol drawing then fading out */}
        <div className="loader-symbol-wrapper">
          <NeuaureliusSymbolLogo className="loader-svg" />
        </div>

        {/* Stage 2: The Text appearing */}
        <div className="loader-text-wrapper">
          <NeuaureliusTextLogo style={{ fill: 'white' }} />
        </div>

      </div>
    </div>
  );
};

// --- Wireframe Globe Component ---
const WireframeGlobe = React.memo(({ progress = 0, theme = 'dark' }) => {
    const canvasRef = useRef(null);
    const frameRef = useRef(null);
    const progressRef = useRef(progress);
    const themeRef = useRef(theme);

    useEffect(() => {
        progressRef.current = progress;
    }, [progress]);

    useEffect(() => {
        themeRef.current = theme;
    }, [theme]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.clientWidth;
        let height = canvas.height = canvas.clientHeight;
        
        // Decreased radius multiplier from 0.4 to 0.3 to prevent visual overflow and reduce size
        const radius = width * 0.3; 
        const latLines = 12;
        const lonLines = 12;
        
        const handleResize = () => {
             width = canvas.width = canvas.clientWidth;
             height = canvas.height = canvas.clientHeight;
        };
        window.addEventListener('resize', handleResize);

        const drawGlobe = () => {
            ctx.clearRect(0, 0, width, height);
            // Change color based on theme
            const isDark = themeRef.current === 'dark';
            ctx.strokeStyle = isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)';
            ctx.lineWidth = 1;
            
            const cx = width / 2;
            const cy = height / 2;

            const rotation = progressRef.current * Math.PI * 4;
            const tilt = 0.2; 

            // Use width as dynamic perspective basis instead of hardcoded 500
            // This prevents overflow on large screens
            const perspective = width; 

            const project = (r, lat, lon) => {
                let x = r * Math.cos(lat) * Math.cos(lon);
                let y = r * Math.sin(lat);
                let z = r * Math.cos(lat) * Math.sin(lon);

                let x1 = x * Math.cos(rotation) - z * Math.sin(rotation);
                let z1 = x * Math.sin(rotation) + z * Math.cos(rotation);
                let y1 = y;

                let x2 = x1 * Math.cos(tilt) - y1 * Math.sin(tilt);
                let y2 = x1 * Math.sin(tilt) + y1 * Math.cos(tilt);
                let z2 = z1;

                const scale = perspective / (perspective - z2);

                return {
                    x: cx + x2 * scale,
                    y: cy + y2 * scale,
                    z: z2
                };
            };

            for (let i = 0; i <= latLines; i++) {
                const lat = Math.PI * (i / latLines - 0.5);
                
                ctx.beginPath();
                for (let j = 0; j <= 50; j++) {
                    const lon = (j / 50) * Math.PI * 2;
                    const p = project(radius, lat, lon);
                    if (j === 0) ctx.moveTo(p.x, p.y);
                    else ctx.lineTo(p.x, p.y);
                }
                ctx.closePath();
                ctx.stroke();
            }

            for (let i = 0; i < lonLines; i++) {
                const lonBase = (i / lonLines) * Math.PI * 2;
                
                ctx.beginPath();
                for (let j = 0; j <= 50; j++) {
                    const lat = (j / 50) * Math.PI - Math.PI / 2;
                    const p = project(radius, lat, lonBase);
                    if (j === 0) ctx.moveTo(p.x, p.y);
                    else ctx.lineTo(p.x, p.y);
                }
                ctx.stroke();
            }

            frameRef.current = requestAnimationFrame(drawGlobe);
        };

        drawGlobe();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [theme]); // Re-run if theme changes to update strokeStyle

    return (
        <div className="globe-container">
            <div className="globe-sticky-view">
                <div className="globe-canvas-sizer">
                    <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
                </div>
            </div>
        </div>
    );
});

// --- Trajectory Logic ---
const TrajectoryGroup = ({ theme }) => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [drawProgress, setDrawProgress] = useState(0);

  const items = useMemo(() => [
    { title: "Exploration Robotics", desc: "Autonomous platforms designed for extreme, communications-denied environments." },
    { title: "Aerial Autonomy", desc: "UAV systems capable of complex navigation without GPS or external pilots." },
    { title: "Cognitive Architectures", desc: "Hierarchical control systems bridging high-level reasoning with low-level motor control." },
    { title: "Humanoid Platforms", desc: "Long-term engineering toward general-purpose bi-pedal robotics." }
  ], []);

  const p0 = { x: 20, y: 0 };
  const p1 = { x: 120, y: 200 }; 
  const p2 = { x: -40, y: 400 };
  const p3 = { x: 20, y: 600 };
  
  const calculateCubicBezier = (t, p0, p1, p2, p3) => {
    const cx = 3 * (p1.x - p0.x);
    const bx = 3 * (p2.x - p1.x) - cx;
    const ax = p3.x - p0.x - cx - bx;

    const cy = 3 * (p1.y - p0.y);
    const by = 3 * (p2.y - p1.y) - cy;
    const ay = p3.y - p0.y - cy - by;

    const x = ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t + p0.x;
    const y = ay * Math.pow(t, 3) + by * Math.pow(t, 2) + cy * t + p0.y;
    return { x, y };
  };

  const dotPositions = useMemo(() => {
    return items.map((_, i) => {
      const t = i / (items.length - 1);
      return calculateCubicBezier(t, p0, p1, p2, p3);
    });
  }, [items]);

  useEffect(() => {
    let rafId;
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        const startTrigger = viewportHeight * 0.5;
        const totalScrollableHeight = rect.height;
        const distScrolled = startTrigger - rect.top;
        
        let progress = distScrolled / (totalScrollableHeight - viewportHeight * 0.5);
        
        progress = Math.max(0, Math.min(1, progress));
        setDrawProgress(progress);

        let currentIdx = -1;
        
        items.forEach((_, idx) => {
            const itemT = idx / (items.length - 1);
            if (Math.abs(progress - itemT) < 0.15) {
                currentIdx = idx;
            }
        });
        
        if (progress > 0.95) currentIdx = items.length - 1;
        
        setActiveIndex(currentIdx);
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    return () => {
        window.removeEventListener('scroll', handleScroll);
        if (rafId) cancelAnimationFrame(rafId);
    };
  }, [items]);

  const tipPoint = calculateCubicBezier(drawProgress, p0, p1, p2, p3);
  const isDark = theme === 'dark';
  const mainColor = isDark ? '#ffffff' : '#000000';
  const faintColor = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';

  return (
    <div ref={containerRef} className="trajectory-wrapper">
      <WireframeGlobe progress={drawProgress} theme={theme} />

      <div className="svg-container">
        <svg width="100%" height="100%" viewBox="-50 0 200 600" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={mainColor} stopOpacity="0" />
              <stop offset="50%" stopColor={mainColor} stopOpacity="0.8" />
              <stop offset="100%" stopColor={mainColor} stopOpacity="0" />
            </linearGradient>
            
            <filter id="glow-heavy" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
          </defs>
          
          <path 
            d={`M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`} 
            fill="none" 
            stroke={faintColor} 
            strokeWidth="1" 
          />
          
          <path 
            d={`M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`} 
            fill="none" 
            stroke={mainColor} 
            strokeWidth="2" 
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={1 - drawProgress}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
          
          {drawProgress > 0.01 && drawProgress < 0.99 && (
              <g transform={`translate(${tipPoint.x}, ${tipPoint.y})`}>
                  <circle r="4" fill={mainColor} filter="url(#glow-heavy)" />
                  <circle r="8" fill="none" stroke={mainColor} strokeOpacity="0.3" strokeWidth="1">
                      <animate attributeName="r" from="4" to="12" dur="1.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" repeatCount="indefinite" />
                  </circle>
              </g>
          )}

          {dotPositions.map((pos, i) => {
            const isActive = activeIndex === i;
            const isReached = drawProgress >= (i / (items.length - 1)) - 0.05;
            
            // Dynamic dot fill logic
            const dotFill = isActive ? mainColor : (isDark ? "#000" : "#fff");
            const dotStroke = mainColor;

            return (
              <g key={i} style={{ 
                  opacity: isReached ? 1 : 0.2, 
                  transition: 'opacity 0.4s ease',
                  transformOrigin: `${pos.x}px ${pos.y}px`
                }}>
                <circle 
                   cx={pos.x} cy={pos.y} r={isActive ? 6 : 3} 
                   fill={dotFill} 
                   stroke={dotStroke} 
                   strokeWidth="2" 
                   filter={isActive ? "url(#glow-heavy)" : ""}
                   style={{ transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
              </g>
            );
          })}
        </svg>
      </div>

      <div className="trajectory-list">
        {items.map((item, index) => (
          <div key={index} 
               className={`trajectory-item ${activeIndex === index ? 'active' : ''}`}>
             <span className="t-title" style={{ color: activeIndex === index ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                {item.title}
             </span>
             <p className="t-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Navigation = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
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

  const navItems = [
    { id: 'home', label: 'Index' },
    { id: 'vision', label: 'Aim' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${hidden ? 'nav-hidden' : ''}`}>
        <div className="container nav-content">
          <button onClick={() => scrollToSection('home')} className="logo-btn">
            {/* Logo fills with currentColor, inheriting var(--text-primary) via CSS */}
            <NeuaureliusTextLogo width="150px" height="30px" style={{ fill: 'var(--text-primary)' }} />
          </button>

          <div className="nav-links">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollToSection(item.id)} className="nav-item">
                {item.label}
              </button>
            ))}
            
            {/* Theme Toggle Button */}
            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="mobile-link"
            style={{ 
                opacity: mobileMenuOpen ? 1 : 0, 
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.5s ease ${index * 0.1}s` 
            }}
          >
            {item.label}
          </button>
        ))}

        <button 
            className="mobile-theme-toggle"
            onClick={toggleTheme}
            style={{ 
                opacity: mobileMenuOpen ? 1 : 0, 
                transition: `opacity 0.5s ease 0.4s` 
            }}
        >
            {theme === 'dark' ? (
                <>
                    <Sun size={18} />
                    <span>Light Mode</span>
                </>
            ) : (
                <>
                    <Moon size={18} />
                    <span>Dark Mode</span>
                </>
            )}
        </button>
      </div>
    </>
  );
};

const Hero = () => {
  return (
    <section id="home">
      <div className="container">
        <RevealOnScroll delay={100}>
          <h1 className="hero-title">
            Architecting <br/>
            <span style={{color: 'var(--text-muted)'}}>Embodied Reality.</span>
          </h1>
        </RevealOnScroll>
        
        <div className="hero-grid">
          <RevealOnScroll delay={300} className="hero-col">
              <span className="label-text">Foundational Systems</span>
              <p className="desc-text">
                  Neuaurelius is an engineering organization dedicated to building the physical and cognitive infrastructure for intelligent machines.
              </p>
          </RevealOnScroll>

          <RevealOnScroll delay={500} className="hero-col">
              <span className="label-text">Autonomous Design</span>
              <p className="desc-text">
                  Moving beyond software abstractions to design complete, integrated autonomous units capable of physical interaction.
              </p>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={700} className="hero-footer">
          <div className="meta-label">Est. 2023 &mdash; Home - Barddhaman</div>
          <button 
            onClick={() => document.getElementById('vision').scrollIntoView({ behavior: 'smooth' })}
            className="scroll-btn"
          >
            <span className="scroll-text">Scroll</span>
            <ArrowDown className="bounce" size={16} />
          </button>
        </RevealOnScroll>
      </div>
    </section>
  );
};

const Vision = ({ theme }) => {
  return (
    <section id="vision">
      <div className="container">
        <RevealOnScroll>
          <div className="section-header">
             <div className="line-accent"></div>
             <span className="section-title">01 &mdash; Manifesto</span>
          </div>
        </RevealOnScroll>
        
        <div className="manifesto-grid">
          <div>
            <RevealOnScroll>
              <h3 className="manifesto-heading">
                Intelligence requires <br /> a physical form.
              </h3>
            </RevealOnScroll>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', paddingTop: '1rem' }}>
            <RevealOnScroll delay={200}>
              <p className="manifesto-text">
                True cognition requires a body to perceive, a world to act upon, and a feedback loop that validates reasoning against physical reality. Software alone is insufficient for general autonomy.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={400}>
              <p className="manifesto-text">
                At Neuaurelius, we approach intelligence as a system integration challenge, where the physical form defines the cognitive constraints and capabilities.
              </p>
            </RevealOnScroll>
          </div>
        </div>

        <div style={{ marginTop: '8rem', paddingTop: '4rem', borderTop: '1px solid var(--border-color)' }}>
          <RevealOnScroll>
            <h3 style={{ fontSize: '2rem', marginBottom: '2rem', fontWeight: 500 }}>Core Trajectories</h3>
          </RevealOnScroll>
          <TrajectoryGroup theme={theme} />
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" style={{ justifyContent: 'space-between' }}>
      <div className="container" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
         <RevealOnScroll>
            <div className="section-header">
               <div className="line-accent"></div>
               <span className="section-title">02 &mdash; Contact</span>
            </div>
         </RevealOnScroll>
        
        <RevealOnScroll delay={200}>
          <p className="inquiry-text">
            We welcome inquiries regarding research collaboration and engineering partnerships.
          </p>
        </RevealOnScroll>

        <div className="contact-grid">
          <RevealOnScroll delay={300}>
            <div>
              <span className="contact-label">Reach Out</span>
              <a href="mailto:post@neuaurelius.com" className="email-link">
                post@neuaurelius.com
                <ArrowUpRight size={24} style={{ opacity: 0.7 }} />
              </a>
              <p className="location-sub" style={{ marginTop: '1rem' }}>General Inquiries</p>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll delay={400}>
            <div>
              <span className="contact-label">Location</span>
              <p className="location-text">Jaipur</p>
              <p className="location-sub">Rajasthan, India</p>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <div className="container">
          <RevealOnScroll delay={600} className="footer">
            <div className="footer-text">Neuaurelius Pvt Ltd</div>
            <div className="footer-right footer-text">
                <span>&copy; 2024</span>
                <span className="footer-copy">All Rights Reserved</span>
            </div>
          </RevealOnScroll>
      </div>
    </section>
  );
};

// --- App Root ---
const App = () => {
  // Theme State
  const [theme, setTheme] = useState(() => {
      // Check local storage or prefer-color-scheme
      if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('theme');
          if (saved) return saved;
          return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      }
      return 'dark';
  });

  // Preloader State
  const [isLoading, setIsLoading] = useState(true);

  // Apply theme to document
  useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle Toggle
  const toggleTheme = () => {
      setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    // 2.2s draw + 1.2s morph + buffer
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <GlobalStyles />
      
      {/* Preloader overlay (Always dark for brand consistency) */}
      <Preloader loading={isLoading} />

      <Navigation theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Vision theme={theme} />
        <Contact />
      </main>
    </>
  );
};

export default App;
