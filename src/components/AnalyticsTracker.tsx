"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Clarity from "@microsoft/clarity";

// Declare global dataLayer array for GTM
declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const currentPathnameRef = useRef(pathname);
  const pageStartTimeRef = useRef<number>(0);
  const activeSectionsRef = useRef<{ [sectionId: string]: number }>({});
  const activeSectionObserverRef = useRef<IntersectionObserver | null>(null);

  // Initialize tracking and fetch IP address
  useEffect(() => {
    // Initialize Microsoft Clarity if project ID is provided
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
    if (clarityId) {
      Clarity.init(clarityId);
    }

    // Set initial page start time if not already set
    if (pageStartTimeRef.current === 0) {
      pageStartTimeRef.current = Date.now();
    }

    // 1. Fetch IP Address once on load
    fetch("/api/get-ip")
      .then((res) => res.json())
      .then((data) => {
        if (data?.ip) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "user_ip_detected",
            user_ip: data.ip,
          });
        }
      })
      .catch((err) => console.error("Error fetching IP address:", err));

    // 2. Identify potential username or user_id from localStorage/cookies
    try {
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(";").shift();
        return null;
      };

      const username =
        getCookie("factwise_user") ||
        getCookie("username") ||
        localStorage.getItem("username") ||
        localStorage.getItem("user_id") ||
        localStorage.getItem("email") ||
        null;

      if (username) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "username_detected",
          username: username,
        });
      }
    } catch {
      // Ignore if localStorage is disabled or cookies inaccessible
    }

    // 3. Global Click Listener
    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target) return;

      // Find the closest clickable element
      const clickableElement = target.closest("button, a, [role='button'], input[type='submit'], input[type='button']");
      
      // If not a standard clickable element, we still might want to track it if it has an ID or Class
      const elementToTrack = clickableElement || target;
      
      const clickText = elementToTrack.textContent?.trim().substring(0, 100) || "";
      const clickId = elementToTrack.id || "";
      const clickClass = elementToTrack.className ? String(elementToTrack.className).substring(0, 100) : "";
      const clickTagName = elementToTrack.tagName;

      // Find parent section details
      const parentSection = elementToTrack.closest("section") || elementToTrack.closest("[id]");
      const clickSection = parentSection ? parentSection.id || parentSection.tagName : "body";

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "custom_click",
        click_text: clickText,
        click_id: clickId,
        click_class: clickClass,
        click_tag: clickTagName,
        click_section: clickSection,
        click_coordinates: `${event.clientX},${event.clientY}`,
      });
    };

    document.addEventListener("click", handleGlobalClick, true);

    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, []);

  // Track page view time on path change or beforeunload/visibility change
  useEffect(() => {
    // Define cleanups and handlers for page time tracking
    const trackPageExit = () => {
      if (pageStartTimeRef.current > 0) {
        const now = Date.now();
        const timeSpent = Math.round((now - pageStartTimeRef.current) / 1000);
        
        if (timeSpent > 0) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "page_engagement_time",
            page_path: currentPathnameRef.current,
            page_time_spent_seconds: timeSpent,
          });
        }
      }
    };

    // Whenever pathname changes, track exit for old page and start new timer
    trackPageExit();
    currentPathnameRef.current = pathname;
    pageStartTimeRef.current = Date.now();

    // Track tab hidden / browser close
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        trackPageExit();
      } else {
        pageStartTimeRef.current = Date.now();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pathname]);

  // Section engagement observer (scroll stopping points/attention tracker)
  useEffect(() => {
    // Cleanup any existing observer
    if (activeSectionObserverRef.current) {
      activeSectionObserverRef.current.disconnect();
    }

    const pushSectionEngagement = (sectionId: string, durationSeconds: number) => {
      if (durationSeconds > 0) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "section_engagement",
          section_name: sectionId,
          section_engagement_seconds: durationSeconds,
        });
      }
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const now = Date.now();
      entries.forEach((entry) => {
        const id = entry.target.id || `section_${entry.target.tagName}_${Array.from(entry.target.parentNode?.children || []).indexOf(entry.target)}`;
        
        if (entry.isIntersecting) {
          // Section entered viewport - record entry time
          activeSectionsRef.current[id] = now;
        } else {
          // Section exited viewport - calculate duration and report
          const entryTime = activeSectionsRef.current[id];
          if (entryTime) {
            const timeSpent = Math.round((now - entryTime) / 1000);
            pushSectionEngagement(id, timeSpent);
            delete activeSectionsRef.current[id];
          }
        }
      });
    };

    // Observe all `<section>` elements or elements with class names/IDs indicating they are containers
    const sections = document.querySelectorAll("section, [id^='section-'], main > div");
    
    if (sections.length > 0) {
      const observer = new IntersectionObserver(handleIntersect, {
        threshold: 0.5, // Section must be at least 50% in view to count
      });
      
      sections.forEach((sec) => observer.observe(sec));
      activeSectionObserverRef.current = observer;
    }

    return () => {
      // Send engagement for any remaining sections on unmount/re-evaluate
      const now = Date.now();
      Object.keys(activeSectionsRef.current).forEach((id) => {
        const entryTime = activeSectionsRef.current[id];
        if (entryTime) {
          const timeSpent = Math.round((now - entryTime) / 1000);
          pushSectionEngagement(id, timeSpent);
        }
      });
      activeSectionsRef.current = {};

      if (activeSectionObserverRef.current) {
        activeSectionObserverRef.current.disconnect();
      }
    };
  }, [pathname]);

  return null; // This component does not render any visual elements
}
