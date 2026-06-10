'use client';

import React from 'react';

const companies = [
  {
    name: "Syrma SGS",
    logo: "/syrmasgs.png",
    url: "https://syrmasgs.com/"
  },
  {
    name: "Vashi Integrated Solutions",
    logo: "/Vashilogo.png",
    url: "https://vashiisl.com/"
  },
  {
    name: "Prasol Chemicals",
    logo: "/PrasolChemicals.png",
    url: "https://www.prasolchem.com/"
  },
  {
    name: "Gem Corpochem",
    logo: "/gemcorp.png",
    url: "https://gemcorp.in/"
  },
  {
    name: "Amkette",
    logo: "/Amkette.png",
    url: "https://www.amkette.com/"
  },
  {
    name: "Cyient DLM",
    logo: "/Cyient.png",
    url: "https://www.cyientdlm.com/"
  },
  {
    name: "Shanparts",
    logo: "/shanparts.png",
    url: "#"
  },
  {
    name: "Driplex Engitech",
    logo: "/Driplexengitech.png",
    url: "#"
  },
  {
    name: "Bridgepointe",
    logo: "/bridgepointe.png",
    url: "#"
  },
  {
    name: "Govils",
    logo: "/Govils.png",
    url: "#"
  },
  {
    name: "JRE",
    logo: "/JRE.png",
    url: "#"
  },
  {
    name: "Lineage",
    logo: "/Lineage.png",
    url: "#"
  }
];

export default function CompanyMarquee() {
  // Triple the list to ensure it spans much more than the screen width for seamless looping
  const marqueeList = [...companies, ...companies, ...companies];

  return (
    <section className="w-full bg-[#FFFFFF] py-10 md:py-14 border-b border-slate-100 relative z-20 force-animate">
      <style>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .marquee-container {
          overflow: hidden;
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 15%,
            black 85%,
            transparent
          );
        }
        .marquee-track {
          display: flex;
          width: max-content;
          gap: 5rem;
          padding: 0.5rem 0;
          animation: marquee-scroll 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        /* Reduced-motion override.
           globals.css's reset uses *:not(.force-animate):not(.force-animate *)
           with a Level-4 complex :not() that some older / Windows Chromium
           builds parse as "matches nothing", leaving the marquee-track stuck
           at animation-duration:0.001ms (the static frame the user saw).
           We re-assert the original animation here with !important; specificity
           (.force-animate .marquee-track = 0,2,0) beats the global reset
           (0,1,0) so this wins regardless of how :not() is parsed.
           Note: an infinitely scrolling marquee is one of the things WCAG
           specifically calls out under reduced-motion, but the brand intent
           is for these logos to scroll, so we honour that here. */
        @media (prefers-reduced-motion: reduce) {
          .force-animate .marquee-track {
            animation: marquee-scroll 35s linear infinite !important;
            animation-duration: 35s !important;
            animation-iteration-count: infinite !important;
            animation-name: marquee-scroll !important;
            animation-timing-function: linear !important;
          }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 text-center mb-6">
        <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          Trusted by Leaders
        </p>
      </div>

      <div className="marquee-container">
        <div className="marquee-track">
          {marqueeList.map((company, idx) => (
            <a
              key={idx}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-12 w-36 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const fallback = document.createElement('span');
                    fallback.className = 'text-sm font-bold tracking-tight text-slate-400';
                    fallback.innerText = company.name;
                    parent.appendChild(fallback);
                  }
                }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
