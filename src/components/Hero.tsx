'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Font classes matching the main website system
const fontDisplay = 'var(--font-display)';
const fontInter = 'var(--font-inter)';

const slides = [
  { 
    mediaDesktop: "/FinalIphone.mp4",
    mediaMobile: "/FinalIphone_mobileVersion.mp4",
    label: "ELECTRONICS"
  },
  { 
    mediaDesktop: "/Final_ChemicalProduction_Video.mp4",
    mediaMobile: "/Final_ChemicalProduction_mobileversion.mp4",
    label: "CHEMICAL"
  }
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const progressBarRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const isTransitioning = useRef(false);
  const textOverlayRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sync activeIndex to ref to prevent stale closure bugs
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Pinned scroll-reveal animation for text overlay
  useGSAP(() => {
    if (!containerRef.current || !textOverlayRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300', // Text reveal in 1 scroll (300px)
        pin: true,
        pinSpacing: true, // Let it scroll naturally after pinning, NO overlap
        scrub: true,
        anticipatePin: 1,
      }
    });

    // Reveal text overlay (fade in & slide up)
    tl.to(textOverlayRef.current, {
      opacity: 1,
      y: 0,
      duration: 1, // Timeline duration is mapped to the scroll distance
      ease: 'none',
    });

  }); // Global scope allows targeting .hero-overlap-content in page.tsx

  // Set up video ended event listeners
  useEffect(() => {
    const cleanups = videoRefs.current.map((video, idx) => {
      if (!video) return null;

      const handleVideoEnded = () => {
        const currentActive = activeIndexRef.current;
        // Only trigger transition if the ended video is the currently active one
        if (idx === currentActive && !isTransitioning.current) {
          const nextIdx = idx === 0 ? 1 : 0;
          triggerTransition(nextIdx);
        }
      };

      video.addEventListener('ended', handleVideoEnded);

      return {
        cleanup: () => {
          video.removeEventListener('ended', handleVideoEnded);
        }
      };
    });

    // Play initial video
    if (videoRefs.current[0]) {
      videoRefs.current[0].play().catch(() => {});
    }

    return () => {
      cleanups.forEach(item => item?.cleanup());
    };
  }, []);

  // Re-play video if src changes due to resize
  useEffect(() => {
    if (!mounted) return;
    const currentActive = activeIndexRef.current;
    const activeVideo = videoRefs.current[currentActive];
    if (activeVideo) {
      activeVideo.play().catch(() => {});
    }
  }, [isMobile, mounted]);

  // Butter-smooth 60fps progress bar updating using requestAnimationFrame (bypasses React re-renders)
  useEffect(() => {
    let animId: number;
    
    const updateProgress = () => {
      const currentActive = activeIndexRef.current;
      const activeVideo = videoRefs.current[currentActive];
      
      if (activeVideo && activeVideo.duration) {
        const pct = (activeVideo.currentTime / activeVideo.duration) * 100;
        
        // Update active bar
        const activeBar = progressBarRefs.current[currentActive];
        if (activeBar) {
          activeBar.style.width = `${pct}%`;
        }
        
        // Reset inactive bar
        const inactiveIdx = currentActive === 0 ? 1 : 0;
        const inactiveBar = progressBarRefs.current[inactiveIdx];
        if (inactiveBar) {
          inactiveBar.style.width = '0%';
        }
      }
      animId = requestAnimationFrame(updateProgress);
    };

    animId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animId);
  }, []);

  const triggerTransition = (targetIndex: number) => {
    const currentIdx = activeIndexRef.current;
    if (isTransitioning.current || targetIndex === currentIdx) return;
    isTransitioning.current = true;

    const direction = targetIndex > currentIdx ? 'forward' : 'backward';

    const currentSlide = slideRefs.current[currentIdx];
    const targetSlide = slideRefs.current[targetIndex];
    const currentVideo = videoRefs.current[currentIdx];
    const targetVideo = videoRefs.current[targetIndex];

    if (!currentSlide || !targetSlide || !targetVideo) {
      isTransitioning.current = false;
      return;
    }

    // Play target video immediately so it's ready during transition
    targetVideo.currentTime = 0;
    targetVideo.play().catch(() => {});

    // Set initial position of the target slide before transitioning
    const startXPercent = direction === 'forward' ? 100 : -100;
    
    // Set target slide active/visible and set starting position
    gsap.set(targetSlide, { 
      xPercent: startXPercent,
      zIndex: 2,
      visibility: 'visible' 
    });
    
    // Bring target video content in with opposite translation (parallax window effect) and initial zoom
    const videoParallaxStart = direction === 'forward' ? -35 : 35;
    gsap.set(targetVideo, { 
      xPercent: videoParallaxStart,
      scale: 1.15
    });

    // Build transition timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Pause and reset previous video
        if (currentVideo) {
          currentVideo.pause();
          currentVideo.currentTime = 0;
          gsap.set(currentVideo, { scale: 1.02, xPercent: 0 });
        }
        
        // Finalize styles
        gsap.set(currentSlide, { zIndex: 1, visibility: 'hidden' });
        gsap.set(targetSlide, { zIndex: 3 });
        gsap.set(targetVideo, { scale: 1.02, xPercent: 0 });
        
        setActiveIndex(targetIndex);
        isTransitioning.current = false;
      }
    });

    // Slide transition with strong premium power4 easing
    tl.to(currentSlide, {
      xPercent: direction === 'forward' ? -100 : 100,
      duration: 1.4,
      ease: 'power4.inOut'
    }, 0);

    if (currentVideo) {
      tl.to(currentVideo, {
        xPercent: direction === 'forward' ? 35 : -35,
        scale: 0.95,
        duration: 1.4,
        ease: 'power4.inOut'
      }, 0);
    }

    tl.to(targetSlide, {
      xPercent: 0,
      duration: 1.4,
      ease: 'power4.inOut'
    }, 0);

    tl.to(targetVideo, {
      xPercent: 0,
      scale: 1.02,
      duration: 1.4,
      ease: 'power4.inOut'
    }, 0);
  };

  const onSlideNavClick = (idx: number) => {
    triggerTransition(idx);
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[100svh] md:h-screen bg-black overflow-hidden select-none"
      style={{ zIndex: 1 }}
    >
      
      {/* Slides Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={i}
            ref={el => { slideRefs.current[i] = el; }}
            className="absolute inset-0 w-full h-full overflow-hidden border-l border-r border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.9)]"
            style={{
              zIndex: i === 0 ? 3 : 1,
              visibility: i === 0 ? 'visible' : 'hidden'
            }}
          >
            {/* The Video Element */}
            <video
              ref={el => { videoRefs.current[i] = el; }}
              src={mounted && isMobile ? slide.mediaMobile : slide.mediaDesktop}
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-contain md:object-cover scale-[1.02]"
            />
            
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/40 z-[1] pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Soft Bottom Shadow/Gradient Layer */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent z-[5]" />

      {/* Scroll-reveal Text Overlay */}
      <div 
        ref={textOverlayRef}
        className="absolute inset-0 z-[6] flex flex-col md:flex-row items-start md:items-end justify-end md:justify-between px-6 md:px-16 pb-[18%] md:pb-[8%] pointer-events-none"
        style={{ opacity: 0, transform: 'translateY(20px)' }}
      >
        {/* Left Side: Huge FactWise Text */}
        <h1 
          className="text-white text-[15vw] md:text-[8vw] font-bold tracking-tighter leading-none select-none"
          style={{ fontFamily: fontDisplay, color: '#F2F1E8' }}
        >
          FactWise
        </h1>

        {/* Right Side: Description paragraph */}
        <div className="hidden md:block max-w-[90%] md:max-w-[400px] mt-4 md:mt-0 md:mr-12">
          <p 
            className="text-white/80 text-[14px] md:text-[15px] leading-relaxed tracking-wide font-normal"
            style={{ fontFamily: fontInter }}
          >
            Procurement is just the beginning. FactWise connects every workflow — from customer quotes and vendor RFQs to POs, payments, and beyond — in one platform built for manufacturers.
          </p>
        </div>
      </div>

      {/* Right Column Slide Navigation */}
      <nav className="absolute bottom-[6%] right-[6%] md:bottom-[10%] md:right-[8%] flex gap-6 md:gap-8 z-[10]">
        {slides.map((slide, i) => (
          <div 
            key={i} 
            onClick={() => onSlideNavClick(i)}
            className={`flex flex-col gap-2 cursor-pointer transition-opacity duration-300 ${activeIndex === i ? 'opacity-100' : 'opacity-40 hover:opacity-75'}`}
          >
            {/* Progress indicator bar */}
            <div className="w-[80px] md:w-[120px] h-[2px] bg-white/20 relative overflow-hidden">
              <div 
                ref={el => { progressBarRefs.current[i] = el; }}
                className="absolute top-0 left-0 h-full bg-white"
                style={{ width: '0%' }}
              />
            </div>
            {/* Nav title */}
            <span 
              className="text-[11px] md:text-xs uppercase tracking-wider font-semibold text-white"
              style={{ fontFamily: fontInter }}
            >
              {slide.label}
            </span>
          </div>
        ))}
      </nav>

    </section>
  );
}
