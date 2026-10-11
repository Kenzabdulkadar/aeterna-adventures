import React, { useState } from 'react';
import {
  X,
  MapPin,
  Calendar,
  Star,
  Users,
  CheckCircle,
  Bed,
  Car,
  Utensils,
  Compass,
  ArrowRight,
  ShieldCheck,
  Phone,
  Sparkles,
  Info,
} from 'lucide-react';
import WhatsAppButton, { WhatsAppIcon } from './WhatsAppButton';
import { getWhatsAppNumber, formatPhoneNumber } from '../config/whatsappConfig';

export default function DetailModal({ trip, onClose, onBookNow, onBookWhatsApp }) {
  const [activeImage, setActiveImage] = useState(trip?.image || '');
  const [selectedPackageTier, setSelectedPackageTier] = useState(trip?.category || '');

  if (!trip) return null;

  const propertyWhatsAppNumber = formatPhoneNumber(getWhatsAppNumber(trip));

  const handleWhatsAppBooking = (customPackageName) => {
    onClose();
    if (onBookWhatsApp) {
      onBookWhatsApp(trip, {
        packageName: customPackageName || selectedPackageTier || trip.category,
      });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#2B231F]/15 max-h-[92vh] flex flex-col my-auto">
        
        {/* Modal Header Hero Image Bar */}
        <div className="relative h-80 sm:h-96 md:h-[440px] w-full shrink-0 bg-neutral-900 overflow-hidden">
          <img
            src={activeImage}
            alt={trip.title}
            className="w-full h-full object-cover object-center transition-all duration-500"
          />
          
          {/* Subtle gradient so photo details and scenery remain sharp and visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl z-20 cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Top WhatsApp verified pill */}
          <div className="absolute top-4 left-4 z-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#25D366]/40 text-[#25D366] text-xs font-extrabold shadow-xl">
              <WhatsAppIcon className="w-4 h-4" />
              <span>Resort WhatsApp: {propertyWhatsAppNumber}</span>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-10 pointer-events-none">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-[#D4A373] text-[#1E1E1E] px-3.5 py-1 rounded-full text-xs font-extrabold shadow-md">
                  {trip.category}
                </span>
                <span className="bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-semibold">
                  • {trip.slotsLeft} Spots Left
                </span>
                <span className="bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-amber-300">
                  ★ {trip.rating || '4.95'} ({trip.reviewsCount || 120} reviews)
                </span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-xl text-white">
                {trip.title}
              </h2>

              <p className="text-sm sm:text-base text-white/90 flex flex-wrap items-center gap-1.5 mt-2 drop-shadow">
                <MapPin className="w-4 h-4 text-[#D4A373] shrink-0" />
                <span className="font-medium">{trip.location}</span>
                <span className="mx-1">•</span>
                <Calendar className="w-4 h-4 text-[#D4A373] shrink-0" />
                <span>{trip.dateRange}</span>
              </p>
            </div>

            <div className="text-left sm:text-right shrink-0 bg-black/50 backdrop-blur-md p-3 rounded-2xl border border-white/15">
              <span className="text-[11px] uppercase text-white/80 block font-semibold">Price per traveler</span>
              <span className="text-3xl sm:text-4xl font-extrabold text-[#D4A373]">
                ₹{trip.price.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Comfortable & Clear Gallery Thumbnails Strip */}
        {trip.images && trip.images.length > 1 && (
          <div className="px-6 py-4 bg-[#F5F3EF] border-b border-[#2B231F]/10 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#6E6660]">
              <span>Photo Gallery ({trip.images.length} photos) — Tap to enlarge</span>
              <span>{trip.images.findIndex((img) => img === activeImage) + 1} of {trip.images.length}</span>
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin">
              {trip.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`relative w-24 sm:w-28 h-16 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all duration-200 cursor-pointer shadow-sm group ${
                    activeImage === img
                      ? 'border-[#D4A373] ring-2 ring-[#D4A373]/40 scale-102 opacity-100'
                      : 'border-white/80 opacity-70 hover:opacity-100 hover:border-[#D4A373]/60'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Photo ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {activeImage === img && (
                    <div className="absolute inset-0 bg-black/10 border-2 border-[#D4A373] pointer-events-none rounded-xl" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Premium Comfortable Overview Section */}
          <div className="bg-[#FAF9F6] p-6 sm:p-7 rounded-3xl border border-[#2B231F]/10 shadow-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#D4A373]/20 text-[#2B231F] flex items-center justify-center shrink-0">
                <Info className="w-4 h-4 text-[#D4A373]" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#D4A373] block leading-tight">
                  About This Experience
                </span>
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#2B231F] leading-tight">
                  Trip & Property Overview
                </h3>
              </div>
            </div>

            {/* Core Experience Badges Strip */}
            <div className="flex flex-wrap items-center gap-2 mb-4 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#2B231F]/10 text-xs font-bold text-[#2B231F] shadow-2xs">
                <Compass className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>{trip.activity || 'Curated Journey'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#2B231F]/10 text-xs font-bold text-[#2B231F] shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>{trip.region || 'Kerala'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Stay</span>
              </span>
            </div>

            {/* Description Text */}
            <p className="text-base sm:text-[17px] text-[#4A423D] leading-relaxed font-normal">
              {trip.description}
            </p>
          </div>

          {/* Room / Package Inclusions & Direct Package WhatsApp CTA */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-bold text-xl text-[#2B231F]">
                Included in Room & Package
              </h3>
              <span className="text-xs font-bold text-[#25D366] flex items-center gap-1">
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>Bookable via WhatsApp</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {trip.inclusions.map((inc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F9F8F6] border border-[#2B231F]/10 hover:border-[#D4A373] transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D4A373] shrink-0" />
                    <span className="text-sm font-semibold text-[#2B231F]">{inc.text}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppBooking(inc.text)}
                    className="text-[11px] font-bold text-[#25D366] group-hover:underline px-2 py-1 rounded-md bg-[#25D366]/10 hover:bg-[#25D366] hover:text-white transition-all shrink-0"
                    title={`Book ${inc.text} package via WhatsApp`}
                  >
                    Book This
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Comfortable Curated Itinerary Timeline */}
          {trip.itinerary && (
            <div className="bg-[#FAF9F6] p-6 sm:p-8 rounded-3xl border border-[#2B231F]/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#D4A373] mb-1">
                    Day-By-Day Experience
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2B231F]">
                    Curated Travel Itinerary
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white border border-[#2B231F]/15 text-[#6E6660] shadow-2xs self-start sm:self-auto">
                  {trip.itinerary.length} Days Planned
                </span>
              </div>

              <div className="relative pl-4 sm:pl-6 space-y-6 before:absolute before:left-[19px] sm:before:left-[27px] before:top-4 before:bottom-6 before:w-0.5 before:bg-[#D4A373]/30">
                {trip.itinerary.map((step, idx) => (
                  <div key={idx} className="relative flex items-start gap-4 sm:gap-6 group">
                    {/* Glowing Timeline Marker */}
                    <div className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#1E1E1E] group-hover:bg-[#D4A373] group-hover:text-[#1E1E1E] text-white flex items-center justify-center font-extrabold text-xs sm:text-sm shrink-0 shadow-md transition-colors duration-300">
                      {idx + 1}
                    </div>

                    {/* Itinerary Day Content Card */}
                    <div className="flex-1 bg-white p-5 sm:p-6 rounded-2xl border border-[#2B231F]/10 shadow-xs hover:shadow-md transition-all">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-extrabold text-[#D4A373] uppercase tracking-wider">
                          {step.day}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                          Guided Activity
                        </span>
                      </div>
                      
                      <h4 className="font-heading font-extrabold text-lg sm:text-xl text-[#2B231F] mb-2 leading-snug">
                        {step.title}
                      </h4>

                      <p className="text-sm sm:text-base text-[#6E6660] leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WhatsApp Direct Guarantee Banner */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950 via-[#1E1E1E] to-[#1E1E1E] text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-emerald-800/40 shadow-md">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] shrink-0">
                <WhatsAppIcon className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm sm:text-base text-white">
                  Direct Resort WhatsApp Booking
                </h4>
                <p className="text-xs text-white/70 mt-0.5">
                  Pre-filled dates, transparent pricing, and direct team confirmation.
                </p>
              </div>
            </div>

            <WhatsAppButton
              onClick={() => handleWhatsAppBooking()}
              label="Book via WhatsApp"
              size="sm"
              variant="primary"
              className="shrink-0"
            />
          </div>

          {/* Trust note */}
          <div className="p-4 rounded-2xl bg-[#D4A373]/15 border border-[#D4A373]/30 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#2B231F] shrink-0" />
            <p className="text-xs text-[#2B231F] font-medium">
              Flexible 100% cancellation refund up to 14 days before departure. Intimate boutique groups capped for maximum comfort.
            </p>
          </div>

        </div>

        {/* Modal Footer Sticky CTA */}
        <div className="p-5 sm:p-6 bg-[#F9F8F6] border-t border-[#2B231F]/10 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-xs text-[#6E6660] block font-medium">Total starting price</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-[#2B231F]">
              ₹{trip.price.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-[#6E6660] ml-1">/ seat</span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Primary Option 1: Book via WhatsApp */}
            <WhatsAppButton
              onClick={() => handleWhatsAppBooking()}
              label="Book via WhatsApp"
              size="md"
              variant="primary"
              className="flex-1 sm:flex-none shadow-lg"
              badge="Instant"
            />

            {/* Option 2: Standard Checkout Modal */}
            <button
              onClick={() => {
                onClose();
                onBookNow(trip);
              }}
              className="flex-1 sm:flex-none bg-[#1E1E1E] text-white hover:bg-[#D4A373] hover:text-[#1E1E1E] font-bold py-3 px-6 rounded-full transition-all flex items-center justify-center gap-2 shadow-md text-sm font-heading"
            >
              <span>Standard Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
