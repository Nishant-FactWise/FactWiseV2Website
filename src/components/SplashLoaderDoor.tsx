'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const phrases = ["Quoting Platform", "Sourcing Platform", "Procurement Platform"];

const row1 = [
  { name: "Cyient DLM", logo: "/Cyient.png" },
  { name: "Vashi Integrated Solutions", logo: "/Vashilogo.png" },
  { name: "Prasol Chemicals", logo: "/PrasolChemicals.png" },
  { name: "Syrma SGS", logo: "/syrmasgs.png" }
];

const row2 = [
  { name: "JRE", logo: "/JRE.png" },
  { name: "Lineage", logo: "/Lineage.png" },
  { name: "Govils", logo: "/Govils.png" },
  { name: "Shanparts", logo: "/shanparts.png" }
];

const row3 = [
  { name: "Gem Corpochem", logo: "/gemcorp.png" },
  { name: "Amkette", logo: "/Amkette.png" },
  { name: "Driplex Engitech", logo: "/Driplexengitech.png" },
  { name: "Bridgepointe", logo: "/bridgepointe.png" }
];

export default function SplashLoaderDoor() {
  const container = useRef<HTMLDivElement>(null);
  const leftPanel = useRef<HTMLDivElement>(null);
  const rightPanel = useRef<HTMLDivElement>(null);
  const contentWrapper = useRef<HTMLDivElement>(null);
  const logoContainer = useRef<HTMLDivElement>(null);
  const textContainer = useRef<HTMLDivElement>(null);
  const subheadingRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const [isActive, setIsActive] = useState(true);
  // Pre-seed first char so the splash never renders an empty cursor on
  // first paint (the screenshot from the affected laptop caught exactly
  // that frame). The typing useEffect picks up from displayText.length.
  const [displayText, setDisplayText] = useState(phrases[0][0] || '');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasExited, setHasExited] = useState(false);
  const hasExitedRef = useRef(false);

  // Prevent scrolling while active
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isActive]);

  const triggerExitTransition = () => {
    if (hasExitedRef.current) return;
    hasExitedRef.current = true;
    setHasExited(true);

    if (leftPanel.current && rightPanel.current && contentWrapper.current) {
      const exitTl = gsap.timeline({
        onComplete: () => setIsActive(false)
      });
      exitTl.to(contentWrapper.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
      exitTl.to(leftPanel.current, {
        y: '-100%',
        duration: 0.75,
        ease: 'power3.inOut'
      }, "-=0.15");
      exitTl.to(rightPanel.current, {
        y: '100%',
        duration: 0.75,
        ease: 'power3.inOut'
      }, "<");
    } else {
      setIsActive(false);
    }
  };

  useEffect(() => {
    const fallback = window.setTimeout(() => {
      triggerExitTransition();
    }, 5200);

    return () => window.clearTimeout(fallback);
  }, []);

  useEffect(() => {
    if (hasExited) return;

    const currentPhrase = phrases[phraseIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
      }, 15);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
      }, 30);
    }

    if (!isDeleting && displayText === currentPhrase) {
      if (phraseIndex === phrases.length - 1) {
        // Hold the final phrase and trigger exit
        timer = setTimeout(() => {
          triggerExitTransition();
        }, 800);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 500);
      }
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setPhraseIndex((prev) => prev + 1);
      // Same trick as the initial state: pre-seed the first char of the
      // next phrase so the cursor doesn't sit on an empty string between
      // phrases. Without this there's a ~30 ms window where displayText
      // is '' and a screenshot can catch it.
      const next = phrases[phraseIndex + 1];
      if (next) setDisplayText(next[0]);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, hasExited]);

  useGSAP(() => {
    if (
      !container.current ||
      !leftPanel.current ||
      !rightPanel.current ||
      !contentWrapper.current ||
      !logoContainer.current ||
      !textContainer.current ||
      !subheadingRef.current
    ) return;

    const paths = logoContainer.current.querySelectorAll('path');
    const letters = textContainer.current.querySelectorAll('.char');

    // Master timeline
    const tl = gsap.timeline();
    timelineRef.current = tl;

    const basePaths = Array.from(paths).slice(0, 2);
    const whitePaths = Array.from(paths).slice(2);

    // --- Phase 1: Base Logo Construction ---
    basePaths.forEach((path, i) => {
      const length = (path as SVGPathElement).getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fillOpacity: 0,
        strokeOpacity: 1,
        stroke: (path as any).getAttribute('fill')
      });

      tl.to(path, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.inOut'
      }, i * 0.25);
    });

    // --- Phase 2: Base Logo Fill ---
    tl.to(basePaths, {
      fillOpacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1
    }, "-=0.5");

    // --- Phase 3: White Arrow & Square Animation ---
    // Initialize white paths scale and transparent
    gsap.set(whitePaths, {
      opacity: 0,
      scale: 0.5,
      transformOrigin: 'center center'
    });

    // Animate the white square (first) and L-shape (second) to form the arrow
    tl.to(whitePaths, {
      opacity: 1,
      scale: 1,
      duration: 0.9,
      ease: 'back.out(1.8)',
      stagger: 0.12,
      onComplete: () => {
        // Keep the white arrow parts pulsing gently
        gsap.to(whitePaths, {
          opacity: 0.3,
          scale: 0.9,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          stagger: 0.2,
          transformOrigin: 'center center'
        });
      }
    }, "-=0.2");

    // Clean masked slide-up transition
    tl.fromTo(letters, {
      y: '110%',
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power4.out',
      stagger: 0.045
    }, 0.1);

    // --- Phase 4: Subheading Reveal ---
    tl.fromTo(subheadingRef.current, {
      y: 20,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out'
    }, 0.3);


  }, { scope: container });

  const handleSkip = () => {
    if (hasExitedRef.current) return;
    hasExitedRef.current = true;
    setHasExited(true);
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    // Perform instant door slide out on click skip
    if (leftPanel.current && rightPanel.current && contentWrapper.current) {
      const skipTl = gsap.timeline({
        onComplete: () => setIsActive(false)
      });
      skipTl.to(contentWrapper.current, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.out'
      });
      skipTl.to(leftPanel.current, {
        y: '-100%',
        duration: 0.55,
        ease: 'power3.out'
      }, "-=0.1");
      skipTl.to(rightPanel.current, {
        y: '100%',
        duration: 0.55,
        ease: 'power3.out'
      }, "<");
    } else {
      setIsActive(false);
    }
  };

  if (!isActive) return null;

  return (
    <div
      ref={container}
      data-no-localize
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] overflow-hidden pointer-events-auto cursor-pointer force-animate"
    >
      {/* Split Door Panels (Horizontal Split, sliding vertically) */}
      <div
        ref={leftPanel}
        className="fixed top-0 left-0 w-full h-[51vh] bg-white z-[9997]"
      />
      <div
        ref={rightPanel}
        className="fixed bottom-0 left-0 w-full h-[51vh] bg-white z-[9997]"
      />

      {/* Floating Centered Content Wrapper */}
      <div 
        ref={contentWrapper}
        className="absolute inset-0 z-[9998] flex items-center justify-center pointer-events-none"
      >
        {/* Main Logo & Text block (Exactly Centered in Viewport) */}
        <div className="flex items-center justify-center gap-4 md:gap-8 flex-col md:flex-row pointer-events-auto">
          
          {/* Animated Logo */}
          <div ref={logoContainer} className="w-[45px] md:w-[98px] h-auto shrink-0 relative">
            <svg viewBox="0 0 1525 1527" className="w-full h-auto drop-shadow-sm">
              {/* Black Layer */}
              <path fill="#000000" stroke="#000000" strokeWidth="6" d="M1511.9,15.2 C1512.5,16.1 1513.7,17.1 1513.7,18.0 C1513.8,79.2 1513.8,140.4 1513.8,201.6 C1513.8,359.4 1513.7,517.3 1513.7,675.2 C1513.7,841.8 1513.7,1008.5 1513.7,1175.1 C1513.7,1225.9 1513.9,1276.6 1513.5,1327.4 C1513.5,1339.6 1511.7,1351.6 1508.5,1363.7 C1504.6,1378.2 1499.5,1392.1 1492.9,1405.5 C1484.4,1422.8 1473.3,1438.2 1460.2,1452.4 C1441.6,1472.5 1419.7,1487.7 1394.9,1498.8 C1379.8,1505.7 1364.0,1510.3 1347.5,1513.0 C1323.4,1516.9 1299.2,1514.8 1275.0,1514.8 C1055.4,1515.1 835.8,1515.0 616.2,1515.0 C417.3,1514.9 218.5,1514.9 19.7,1514.9 C18.0,1514.9 16.4,1515.3 14.7,1515.2 C14.4,1515.2 14.2,1514.1 14.3,1513.1 C113.7,1413.7 212.6,1314.8 311.5,1215.9 C312.8,1214.6 314.5,1213.8 316.4,1212.8 C415.0,1212.9 513.1,1212.9 611.6,1212.9 C611.6,1211.0 611.6,1209.4 611.6,1207.7 C611.7,1122.9 611.8,1038.1 611.8,953.3 C611.8,941.3 611.4,929.3 611.4,917.0 C613.0,915.1 614.2,913.2 615.7,911.7 C713.3,814.1 810.9,716.5 908.5,618.8 C909.7,617.7 910.7,616.4 912.1,615.1 C912.9,615.5 913.8,616.2 913.8,616.8 C913.8,690.6 913.7,764.3 913.7,838.1 C913.7,947.8 913.7,1057.6 913.8,1167.4 C913.8,1182.5 913.8,1197.5 913.8,1212.7 C1013.3,1212.7 1112.3,1212.7 1211.7,1212.7 C1211.7,1211.2 1211.7,1210.1 1211.7,1208.9 C1211.7,1077.1 1211.7,945.3 1211.7,813.5 C1211.7,661.3 1211.8,509.1 1211.7,357.0 C1211.7,343.8 1211.4,330.5 1211.5,317.0 C1213.1,314.9 1214.4,313.0 1216.0,311.4 C1313.3,214.1 1410.6,116.8 1507.8,19.5 C1509.2,18.1 1510.5,16.6 1511.9,15.2 z" />
              {/* Blue Layer */}
              <path fill="#1176B9" stroke="#1176B9" strokeWidth="6" d="M1511.4,15.2 C1510.5,16.6 1509.2,18.1 1507.8,19.5 C1410.6,116.8 1313.3,214.1 1216.0,311.4 C1214.4,313.0 1213.1,314.9 1211.0,316.9 C912.4,317.2 614.4,317.2 316.2,317.2 C316.2,416.7 316.2,515.7 316.2,615.1 C317.9,615.1 319.3,615.1 320.8,615.1 C400.9,615.1 481.0,615.2 561.1,615.2 C678.0,615.2 794.9,615.2 911.8,615.2 C910.7,616.4 909.7,617.7 908.5,618.8 C810.9,716.5 713.3,814.1 615.7,911.7 C614.2,913.2 613.0,915.1 611.0,916.9 C512.3,917.2 414.2,917.2 315.9,917.2 C315.9,1016.3 315.9,1114.5 315.9,1212.8 C314.5,1213.8 312.8,1214.6 311.5,1215.9 C212.6,1314.8 113.7,1413.7 14.4,1512.8 C14.1,1451.9 14.0,1390.9 14.0,1329.9 C14.0,1059.3 14.0,788.7 14.0,518.1 C14.0,410.5 13.8,302.8 14.2,195.2 C14.3,179.0 18.9,163.3 24.4,148.0 C31.1,129.5 40.1,112.3 51.8,96.4 C61.4,83.4 72.4,71.9 84.8,61.4 C97.3,50.7 111.0,42.0 125.6,34.7 C139.8,27.7 154.6,22.0 170.1,19.2 C183.3,16.8 196.9,15.3 210.4,15.3 C421.7,15.1 633.1,15.2 844.5,15.2 C1066.3,15.3 1288.1,15.2 1510.0,15.2 C1510.3,15.2 1510.6,15.2 1511.4,15.2 z" />
              {/* Top White Component */}
              <path fill="#FFFFFF" stroke="#F8FAFC" strokeWidth="3" d="M912.1,615.1 C794.9,615.2 678.0,615.2 561.1,615.2 C481.0,615.2 400.9,615.1 320.8,615.1 C319.3,615.1 317.9,615.1 316.2,615.1 C316.2,515.7 316.2,416.7 316.2,317.2 C614.4,317.2 912.4,317.2 1210.8,317.3 C1211.4,330.5 1211.7,343.8 1211.7,357.0 C1211.8,509.1 1211.7,661.3 1211.7,813.5 C1211.7,945.3 1211.7,1077.1 1211.7,1208.9 C1211.7,1210.1 1211.7,1211.2 1211.7,1212.7 C1112.3,1212.7 1013.3,1212.7 913.8,1212.7 C913.8,1197.5 913.8,1182.5 913.8,1167.4 C913.7,1057.6 913.7,947.8 913.7,838.1 C913.7,764.3 913.8,690.6 913.8,616.8 C913.8,616.2 912.9,615.5 912.1,615.1 z" />
              {/* Bottom White Component */}
              <path fill="#FEFEFE" stroke="#F8FAFC" strokeWidth="3" d="M316.4,1212.8 C315.9,1114.5 315.9,1016.3 315.9,917.2 C414.2,917.2 512.3,917.2 610.8,917.3 C611.4,929.3 611.8,941.3 611.8,953.3 C611.8,1038.1 611.7,1122.9 611.6,1207.7 C611.6,1209.4 611.6,1211.0 611.6,1212.9 C513.1,1212.9 415.0,1212.9 316.4,1212.8 z" />
            </svg>
          </div>

          {/* Text Area and Subheading Container */}
          <div className="flex flex-col items-center md:items-start justify-center mt-4 md:mt-0">
            <div
              ref={textContainer}
              className="flex font-[580] tracking-tight text-black"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 10vw, 6.32rem)', lineHeight: 1, perspective: '400px' }}
            >
              {['F', 'a', 'c', 't', 'W', 'i', 's', 'e'].map((char, index) => (
                <span key={index} className="inline-block overflow-hidden py-2 -my-2">
                  <span
                    className="char inline-block"
                    style={{ transformOrigin: 'bottom center' }}
                  >
                    {char}
                  </span>
                </span>
              ))}
            </div>

            {/* Subheading with typewriter animation (Typora-style code comment) */}
            <div
              ref={subheadingRef}
              className="text-slate-400 font-normal tracking-[0.15em] text-[10px] md:text-[14px] uppercase flex items-center justify-center md:justify-start animate-pulse-cursor"
              style={{ fontFamily: 'var(--font-inter)', height: '1.5em', marginTop: 'clamp(0.35rem, 0.7vw, 0.7rem)' }}
            >
              <span>/*&nbsp;End-to-End&nbsp;</span>
              <span className="text-[#1176B9] font-medium">{displayText}</span>
              <span className="animate-[pulse_1s_infinite] text-[#1176B9] font-light">|</span>
              <span>&nbsp;*/</span>
            </div>
          </div>

        </div>

        {/* Fading List of Logos grouped in structured rows matching the Canva placement, size, and depth opacities */}
        <div className="absolute bottom-[2%] md:bottom-[-1%] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-y-2 md:gap-y-6 w-[95vw] max-w-7xl pointer-events-auto">
          {/* Row 1: Largest & Darkest (Higher Opacity) */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-24 gap-y-2 md:gap-y-4">
            {row1.map((company) => (
              <div
                key={company.name}
                className="h-[28px] md:h-[48px] w-[75px] md:w-[180px] flex items-center justify-center transition-all duration-300"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-h-full max-w-full object-contain grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                />
              </div>
            ))}
          </div>

          {/* Row 2: Medium Size & Lighter */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-24 gap-y-2 md:gap-y-4">
            {row2.map((company) => (
              <div
                key={company.name}
                className="h-[24px] md:h-[42px] w-[65px] md:w-[160px] flex items-center justify-center transition-all duration-300"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-h-full max-w-full object-contain grayscale opacity-25 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                />
              </div>
            ))}
          </div>

          {/* Row 3: Smallest & Lightest */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-24 gap-y-2 md:gap-y-4">
            {row3.map((company) => (
              <div
                key={company.name}
                className="h-[24px] md:h-[42px] w-[65px] md:w-[160px] flex items-center justify-center transition-all duration-300"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="max-h-full max-w-full object-contain grayscale opacity-[0.08] hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
