'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FactWiseLogoAnimation() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const paths = container.current?.querySelectorAll('path');
    if (!paths || paths.length === 0) return;

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1,
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%', // Starts when the top of the container hits 80% of the viewport height
      },
      defaults: { ease: 'power2.inOut' }
    });

    // --- Phase 1: Construction (Forward) ---
    paths.forEach((path, i) => {
      const length = (path as SVGPathElement).getTotalLength();
      
      // Initialize state
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        fillOpacity: 0,
        strokeOpacity: 1,
        stroke: (path as any).getAttribute('fill') // Use their own fill color as stroke color for drawing
      });

      // Draw the stroke
      tl.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
      }, i * 0.2);
    });

    // --- Phase 2: Fill-in ---
    tl.to(paths, {
      fillOpacity: 1,
      duration: 1,
      stagger: 0.1
    }, "-=0.5");

    // --- Phase 3: Hold ---
    tl.to({}, { duration: 2 });

    // --- Phase 4: Deconstruction (Color goes first) ---
    tl.to(paths, {
      fillOpacity: 0,
      strokeOpacity: 1, // Ensure strokes are fully visible as color leaves
      duration: 0.8,
      stagger: {
        each: 0.1,
        from: "end"
      }
    });

    // --- Phase 5: Deconstruction (Strokes go second) ---
    const reversedPaths = Array.from(paths).reverse();
    reversedPaths.forEach((path, i) => {
      const length = (path as SVGPathElement).getTotalLength();
      tl.to(path, {
        strokeDashoffset: length,
        duration: 1,
        ease: 'power2.in'
      }, ">-0.4"); // Slightly tighter overlap for a snappier undraw
    });

    // Final pause
    tl.to({}, { duration: 1 });

  }, { scope: container });

  return (
    <div ref={container} className="w-full h-full flex items-center justify-center overflow-hidden relative group">
      <svg 
        viewBox="0 0 1525 1527" 
        className="w-full max-w-[360px] h-auto relative z-10"
      >
        {/* Black Layer */}
        <path 
          fill="#000000"
          stroke="#000000"
          strokeWidth="6"
          d="M1511.9,15.2 C1512.5,16.1 1513.7,17.1 1513.7,18.0 C1513.8,79.2 1513.8,140.4 1513.8,201.6 C1513.8,359.4 1513.7,517.3 1513.7,675.2 C1513.7,841.8 1513.7,1008.5 1513.7,1175.1 C1513.7,1225.9 1513.9,1276.6 1513.5,1327.4 C1513.5,1339.6 1511.7,1351.6 1508.5,1363.7 C1504.6,1378.2 1499.5,1392.1 1492.9,1405.5 C1484.4,1422.8 1473.3,1438.2 1460.2,1452.4 C1441.6,1472.5 1419.7,1487.7 1394.9,1498.8 C1379.8,1505.7 1364.0,1510.3 1347.5,1513.0 C1323.4,1516.9 1299.2,1514.8 1275.0,1514.8 C1055.4,1515.1 835.8,1515.0 616.2,1515.0 C417.3,1514.9 218.5,1514.9 19.7,1514.9 C18.0,1514.9 16.4,1515.3 14.7,1515.2 C14.4,1515.2 14.2,1514.1 14.3,1513.1 C113.7,1413.7 212.6,1314.8 311.5,1215.9 C312.8,1214.6 314.5,1213.8 316.4,1212.8 C415.0,1212.9 513.1,1212.9 611.6,1212.9 C611.6,1211.0 611.6,1209.4 611.6,1207.7 C611.7,1122.9 611.8,1038.1 611.8,953.3 C611.8,941.3 611.4,929.3 611.4,917.0 C613.0,915.1 614.2,913.2 615.7,911.7 C713.3,814.1 810.9,716.5 908.5,618.8 C909.7,617.7 910.7,616.4 912.1,615.1 C912.9,615.5 913.8,616.2 913.8,616.8 C913.8,690.6 913.7,764.3 913.7,838.1 C913.7,947.8 913.7,1057.6 913.8,1167.4 C913.8,1182.5 913.8,1197.5 913.8,1212.7 C1013.3,1212.7 1112.3,1212.7 1211.7,1212.7 C1211.7,1211.2 1211.7,1210.1 1211.7,1208.9 C1211.7,1077.1 1211.7,945.3 1211.7,813.5 C1211.7,661.3 1211.8,509.1 1211.7,357.0 C1211.7,343.8 1211.4,330.5 1211.5,317.0 C1213.1,314.9 1214.4,313.0 1216.0,311.4 C1313.3,214.1 1410.6,116.8 1507.8,19.5 C1509.2,18.1 1510.5,16.6 1511.9,15.2 z"
        />

        {/* Blue Layer */}
        <path 
          fill="#1176B9"
          stroke="#1176B9"
          strokeWidth="6"
          d="M1511.4,15.2 C1510.5,16.6 1509.2,18.1 1507.8,19.5 C1410.6,116.8 1313.3,214.1 1216.0,311.4 C1214.4,313.0 1213.1,314.9 1211.0,316.9 C912.4,317.2 614.4,317.2 316.2,317.2 C316.2,416.7 316.2,515.7 316.2,615.1 C317.9,615.1 319.3,615.1 320.8,615.1 C400.9,615.1 481.0,615.2 561.1,615.2 C678.0,615.2 794.9,615.2 911.8,615.2 C910.7,616.4 909.7,617.7 908.5,618.8 C810.9,716.5 713.3,814.1 615.7,911.7 C614.2,913.2 613.0,915.1 611.0,916.9 C512.3,917.2 414.2,917.2 315.9,917.2 C315.9,1016.3 315.9,1114.5 315.9,1212.8 C314.5,1213.8 312.8,1214.6 311.5,1215.9 C212.6,1314.8 113.7,1413.7 14.4,1512.8 C14.1,1451.9 14.0,1390.9 14.0,1329.9 C14.0,1059.3 14.0,788.7 14.0,518.1 C14.0,410.5 13.8,302.8 14.2,195.2 C14.3,179.0 18.9,163.3 24.4,148.0 C31.1,129.5 40.1,112.3 51.8,96.4 C61.4,83.4 72.4,71.9 84.8,61.4 C97.3,50.7 111.0,42.0 125.6,34.7 C139.8,27.7 154.6,22.0 170.1,19.2 C183.3,16.8 196.9,15.3 210.4,15.3 C421.7,15.1 633.1,15.2 844.5,15.2 C1066.3,15.3 1288.1,15.2 1510.0,15.2 C1510.3,15.2 1510.6,15.2 1511.4,15.2 z"
        />

        {/* Top White Component */}
        <path 
          fill="#FFFFFF"
          stroke="#F8FAFC"
          strokeWidth="3"
          d="M912.1,615.1 C794.9,615.2 678.0,615.2 561.1,615.2 C481.0,615.2 400.9,615.1 320.8,615.1 C319.3,615.1 317.9,615.1 316.2,615.1 C316.2,515.7 316.2,416.7 316.2,317.2 C614.4,317.2 912.4,317.2 1210.8,317.3 C1211.4,330.5 1211.7,343.8 1211.7,357.0 C1211.8,509.1 1211.7,661.3 1211.7,813.5 C1211.7,945.3 1211.7,1077.1 1211.7,1208.9 C1211.7,1210.1 1211.7,1211.2 1211.7,1212.7 C1112.3,1212.7 1013.3,1212.7 913.8,1212.7 C913.8,1197.5 913.8,1182.5 913.8,1167.4 C913.7,1057.6 913.7,947.8 913.7,838.1 C913.7,764.3 913.8,690.6 913.8,616.8 C913.8,616.2 912.9,615.5 912.1,615.1 z"
        />

        {/* Bottom White Component */}
        <path 
          fill="#FEFEFE"
          stroke="#F8FAFC"
          strokeWidth="3"
          d="M316.4,1212.8 C315.9,1114.5 315.9,1016.3 315.9,917.2 C414.2,917.2 512.3,917.2 610.8,917.3 C611.4,929.3 611.8,941.3 611.8,953.3 C611.8,1038.1 611.7,1122.9 611.6,1207.7 C611.6,1209.4 611.6,1211.0 611.6,1212.9 C513.1,1212.9 415.0,1212.9 316.4,1212.8 z"
        />
      </svg>
    </div>
  );
}
