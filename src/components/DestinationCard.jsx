import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Star, MapPin, Tag } from 'lucide-react';

export default function DestinationCard({ pkg, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      onClick={() => onSelect(pkg)}
      className="group relative bg-white/95 rounded-3xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      
      {/* Image Container with Zoom Effect */}
      <div className="relative h-72 sm:h-80 overflow-hidden bg-neutral-900">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10 pointer-events-none">
          <span className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold border border-white/20 flex items-center gap-1.5 shadow-md">
            <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
            {pkg.location}
          </span>
          <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-[#2B231F] text-xs font-extrabold flex items-center gap-1 shadow-md">
            <Star className="w-3.5 h-3.5 fill-[#D4A373] text-[#D4A373]" />
            {pkg.rating}
          </span>
        </div>

        {/* Soft Vignette Overlay for maximum photo clarity */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
      </div>

      {/* Card Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-heading font-extrabold text-xl text-[#2B231F] group-hover:text-[#D4A373] transition-colors leading-tight mb-2">
            {pkg.title}
          </h4>
          <p className="text-sm text-[#6E6660] font-normal line-clamp-2 leading-relaxed mb-4">
            {pkg.desc}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="pt-4 border-t border-[#2B231F]/10 flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#6E6660]">Starting From</span>
            <div className="text-xl font-extrabold text-[#2B231F] font-heading">{pkg.price}</div>
          </div>

          <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1E1E1E] group-hover:bg-[#D4A373] text-white group-hover:text-[#1E1E1E] text-xs font-bold transition-all duration-300 shadow-md">
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

    </motion.div>
  );
}
