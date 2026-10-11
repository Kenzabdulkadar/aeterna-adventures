import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plane, ArrowRight, Compass } from 'lucide-react';
import { WORLD_DESTINATIONS } from '../data/tripsData';

export default function WorldMap({ onSelectDestination }) {
  const [activeDest, setActiveDest] = useState(WORLD_DESTINATIONS[0]);

  const scrollToDest = (id) => {
    const el = document.getElementById(`dest-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="world-map-section" className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-[#090807] text-white border-t border-white/10 select-none scroll-mt-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">

          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-none mb-4">
            Interactive World Map
          </h2>
          
          <p className="text-base sm:text-lg text-white/70 font-normal">
            Hover or tap any destination marker on the globe to explore flight routes and packages.
          </p>
        </div>

        {/* World Map Graphics Container (Desktop / Tablet View) */}
        <div className="relative w-full h-[480px] sm:h-[540px] rounded-3xl overflow-hidden bg-[#110E0C] border border-white/15 shadow-2xl p-6 hidden sm:block">
          
          {/* Subtle Photographic Ambient Background */}
          {activeDest?.bgImage && (
            <motion.div
              key={activeDest.id + '-bg'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.18 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none scale-105 filter blur-[2px]"
              style={{ backgroundImage: `url(${activeDest.bgImage})` }}
            />
          )}

          {/* Vignette Gradient Overlay */}
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#090807] via-transparent to-[#090807]/70 pointer-events-none" />

          {/* Stylized Dark World Map Background SVG */}
          <svg className="relative z-10 w-full h-full opacity-35 object-contain" viewBox="0 0 1000 500" fill="none">
            {/* World Landmass Silhouettes (Stylized outline paths) */}
            <path
              d="M 150 120 Q 220 80 300 130 T 250 280 T 160 220 Z M 280 300 Q 320 320 350 420 T 290 480 T 260 360 Z M 450 100 Q 520 80 580 120 T 600 220 T 480 200 Z M 520 240 Q 620 260 650 380 T 550 460 Z M 650 120 Q 800 100 880 180 T 780 300 Z M 800 350 Q 890 360 920 440 Z"
              fill="#D4A373"
              opacity="0.25"
            />
            
            {/* Flight Arc Paths connecting nodes */}
            <path d="M 720 260 C 680 230 630 230 630 230" stroke="#D4A373" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
            <path d="M 630 230 C 550 180 480 160 480 160" stroke="#D4A373" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
            <path d="M 480 160 C 490 170 510 170 510 170" stroke="#D4A373" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
            <path d="M 720 260 C 780 280 820 320 820 320" stroke="#D4A373" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
            <path d="M 480 160 C 350 150 260 190 260 190" stroke="#D4A373" strokeWidth="2" strokeDasharray="5 5" className="animate-pulse" />
          </svg>

          {/* Interactive Destination Nodes */}
          {WORLD_DESTINATIONS.map((dest) => {
            const isSelected = activeDest.id === dest.id;
            return (
              <div
                key={dest.id}
                style={{
                  left: `${dest.mapCoords.x}%`,
                  top: `${dest.mapCoords.y}%`
                }}
                onClick={() => {
                  setActiveDest(dest);
                  scrollToDest(dest.id);
                }}
                onMouseEnter={() => setActiveDest(dest)}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
              >
                {/* Pulsing ring */}
                <span className={`absolute -inset-3 rounded-full transition-all ${
                  isSelected ? 'bg-[#D4A373]/40 animate-ping' : 'bg-white/10 group-hover:bg-[#D4A373]/20'
                }`} />

                {/* Marker Button */}
                <div className={`relative px-3.5 py-1.5 rounded-full flex items-center gap-2 transition-all duration-300 shadow-xl border ${
                  isSelected 
                    ? 'bg-[#D4A373] text-[#1E1E1E] border-[#D4A373] scale-110 font-bold' 
                    : 'bg-black/80 backdrop-blur-md text-white border-white/20 group-hover:border-[#D4A373]'
                }`}>
                  <span>{dest.flag}</span>
                  <span className="text-xs font-heading font-extrabold">{dest.name}</span>
                </div>
              </div>
            );
          })}

          {/* Feature Destination Photo Card (Floating Bottom Left) */}
          <AnimatePresence mode="wait">
            {activeDest && (
              <motion.div
                key={activeDest.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="absolute bottom-6 left-6 z-30 w-80 bg-[#161311]/95 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              >
                {/* Destination Feature Photo */}
                <div className="relative h-36 w-full overflow-hidden">
                  <img
                    src={activeDest.cardImage || activeDest.bgImage}
                    alt={activeDest.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161311] via-transparent to-black/30" />
                  
                  {/* Badge & Price on photo */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-bold text-[#D4A373] flex items-center gap-1.5 shadow-md">
                    <span>{activeDest.flag}</span>
                    <span>{activeDest.country}</span>
                  </div>

                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#D4A373] text-[#161311] text-[11px] font-extrabold shadow-md">
                    From {activeDest.startingPrice}
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 pt-2">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-heading font-extrabold text-lg text-white">
                      {activeDest.name}
                    </h4>
                    {activeDest.rating && (
                      <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                        ★ {activeDest.rating}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-white/70 line-clamp-2 mb-3.5 font-normal leading-relaxed">
                    {activeDest.subtitle}
                  </p>

                  <button
                    onClick={() => scrollToDest(activeDest.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#D4A373] hover:bg-[#e0b284] text-[#1E1E1E] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[#D4A373]/20 cursor-pointer active:scale-95"
                  >
                    <span>Explore {activeDest.name} Packages</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Mobile Responsive List Fallback */}
        <div className="sm:hidden space-y-4">
          {WORLD_DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              onClick={() => scrollToDest(dest.id)}
              className="bg-[#181412] p-4 rounded-2xl border border-white/10 flex items-center justify-between gap-4 cursor-pointer hover:border-[#D4A373]/50 transition-colors"
            >
              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/15">
                  <img
                    src={dest.cardImage || dest.bgImage}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{dest.flag}</span>
                    <h4 className="font-heading font-bold text-white text-base leading-tight">
                      {dest.name}
                    </h4>
                  </div>
                  <p className="text-xs text-[#D4A373] font-medium mt-0.5">From {dest.startingPrice}</p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <ArrowRight className="w-4 h-4 text-white/70" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
