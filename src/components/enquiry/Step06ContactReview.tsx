/**
 * MAHALAKSHMI TOUR & TRAVEL — STEP 06: CONTACT DETAILS & ROUTE REVIEW
 * "Your route is taking shape."
 */

'use client';

import React from 'react';
import { Sparkles, MessageSquare, Phone, CheckCircle, ShieldCheck, MapPin, Users, Calendar, Car } from 'lucide-react';
import { StructuredEnquiry, ContactPreference } from '@/types/enquiry';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils/cn';

interface Step06ContactReviewProps {
  enquiry: Partial<StructuredEnquiry>;
  errors: Partial<Record<keyof StructuredEnquiry, string>>;
  isSubmitting: boolean;
  onChangeName: (name: string) => void;
  onChangePhone: (phone: string) => void;
  onChangeEmail: (email: string) => void;
  onChangePreference: (pref: ContactPreference) => void;
  onChangeHoneypot: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onEditStep: (step: number) => void;
}

export function Step06ContactReview({
  enquiry,
  errors,
  isSubmitting,
  onChangeName,
  onChangePhone,
  onChangeEmail,
  onChangePreference,
  onChangeHoneypot,
  onSubmit,
  onEditStep,
}: Step06ContactReviewProps) {
  const destinationText = (enquiry.destinations && enquiry.destinations.length > 0)
    ? enquiry.destinations.join(' → ')
    : enquiry.customDestination || 'South India Circuit';

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <div>
        <span className="type-eyebrow text-[var(--color-terracotta-500)] block mb-1">
          STEP 06 OF 06 — FINAL REVIEW
        </span>
        <h2 className="type-h2 text-[var(--color-ink-950)] mb-2">
          Your route is taking shape.
        </h2>
        <p className="type-body-small text-[var(--text-secondary)]">
          Review your travel summary below and tell us where our Madurai desk can reach you.
        </p>
      </div>

      {/* Summary Review Card */}
      <div className="p-6 bg-[var(--color-paper-100)] rounded-[4px] border border-[var(--border-default)] shadow-editorial-xs">
        <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--color-terracotta-500)]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-ink-950)] font-bold">
              JOURNEY SUMMARY
            </span>
          </div>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">
            MADURAI ORIGIN
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <div className="flex items-center justify-between text-[var(--text-muted)] mb-1">
              <span className="flex items-center gap-1 font-mono uppercase text-[10px]">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-terracotta-500)]" /> Route:
              </span>
              <button
                type="button"
                onClick={() => onEditStep(2)}
                className="text-[10px] text-[var(--color-terracotta-600)] hover:underline"
              >
                Edit
              </button>
            </div>
            <p className="font-bold text-[var(--color-ink-950)]">
              {enquiry.origin || 'Madurai'} → {destinationText}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between text-[var(--text-muted)] mb-1">
              <span className="flex items-center gap-1 font-mono uppercase text-[10px]">
                <Users className="w-3.5 h-3.5 text-[var(--color-terracotta-500)]" /> Travellers:
              </span>
              <button
                type="button"
                onClick={() => onEditStep(3)}
                className="text-[10px] text-[var(--color-terracotta-600)] hover:underline"
              >
                Edit
              </button>
            </div>
            <p className="font-bold text-[var(--color-ink-950)]">
              {enquiry.travellerCount || 1} Passengers ({enquiry.groupType || 'Family'})
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between text-[var(--text-muted)] mb-1">
              <span className="flex items-center gap-1 font-mono uppercase text-[10px]">
                <Calendar className="w-3.5 h-3.5 text-[var(--color-terracotta-500)]" /> Dates & Duration:
              </span>
              <button
                type="button"
                onClick={() => onEditStep(4)}
                className="text-[10px] text-[var(--color-terracotta-600)] hover:underline"
              >
                Edit
              </button>
            </div>
            <p className="font-bold text-[var(--color-ink-950)]">
              {enquiry.travelDate || 'Flexible Dates'} {enquiry.duration ? `• ${enquiry.duration}` : ''}
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between text-[var(--text-muted)] mb-1">
              <span className="flex items-center gap-1 font-mono uppercase text-[10px]">
                <Car className="w-3.5 h-3.5 text-[var(--color-terracotta-500)]" /> Vehicle Match:
              </span>
              <button
                type="button"
                onClick={() => onEditStep(5)}
                className="text-[10px] text-[var(--color-terracotta-600)] hover:underline"
              >
                Edit
              </button>
            </div>
            <p className="font-bold text-[var(--color-ink-950)]">
              {enquiry.vehicleRequirement ? enquiry.vehicleRequirement.replace('-', ' ').toUpperCase() : 'Help Me Choose'}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form Inputs */}
      <div className="space-y-4 p-6 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)]">
        <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink-900)] font-semibold block">
          Where Can We Reach You?
        </span>

        {/* Honeypot Spam Trap (Hidden) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website-trap">Leave this blank</label>
          <input
            id="website-trap"
            type="text"
            value={enquiry.honeypot || ''}
            onChange={(e) => onChangeHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Full Name */}
        <div>
          <label htmlFor="contact-name" className="text-xs font-semibold text-[var(--color-ink-950)] block mb-1">
            Your Full Name *
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={enquiry.name || ''}
            onChange={(e) => onChangeName(e.target.value)}
            placeholder="e.g. Anand Sundaram"
            className={cn(
              'w-full px-3.5 py-2.5 text-xs rounded-[3px] border bg-[var(--color-paper-100)] text-[var(--color-ink-950)] focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)]',
              errors.name ? 'border-red-500 bg-red-50' : 'border-[var(--border-default)]'
            )}
          />
          {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
        </div>

        {/* Mobile / WhatsApp */}
        <div>
          <label htmlFor="contact-phone" className="text-xs font-semibold text-[var(--color-ink-950)] block mb-1">
            Phone / WhatsApp Number *
          </label>
          <input
            id="contact-phone"
            type="tel"
            required
            value={enquiry.phone || ''}
            onChange={(e) => onChangePhone(e.target.value)}
            placeholder="e.g. 98421 23456 (or with country code +91)"
            className={cn(
              'w-full px-3.5 py-2.5 text-xs rounded-[3px] border bg-[var(--color-paper-100)] text-[var(--color-ink-950)] focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)]',
              errors.phone ? 'border-red-500 bg-red-50' : 'border-[var(--border-default)]'
            )}
          />
          {errors.phone && <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>}
        </div>

        {/* Optional Email */}
        <div>
          <label htmlFor="contact-email" className="text-xs font-semibold text-[var(--color-ink-950)] block mb-1">
            Email Address (Optional)
          </label>
          <input
            id="contact-email"
            type="email"
            value={enquiry.email || ''}
            onChange={(e) => onChangeEmail(e.target.value)}
            placeholder="e.g. anand@example.com"
            className={cn(
              'w-full px-3.5 py-2.5 text-xs rounded-[3px] border bg-[var(--color-paper-100)] text-[var(--color-ink-950)] focus:outline-none focus:ring-2 focus:ring-[var(--color-terracotta-500)]',
              errors.email ? 'border-red-500 bg-red-50' : 'border-[var(--border-default)]'
            )}
          />
          {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
        </div>

        {/* Contact Preference */}
        <div>
          <span className="text-xs font-semibold text-[var(--color-ink-950)] block mb-1.5">
            How would you prefer us to reply?
          </span>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'whatsapp', label: 'WhatsApp Message' },
              { id: 'call', label: 'Direct Phone Call' },
              { id: 'either', label: 'Either is Fine' },
            ].map((p) => {
              const isSelected = (enquiry.contactPreference || 'whatsapp') === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onChangePreference(p.id as ContactPreference)}
                  className={cn(
                    'px-3 py-1.5 text-xs rounded-[3px] border transition-all',
                    isSelected
                      ? 'bg-[var(--color-ink-950)] text-white border-[var(--color-ink-950)] font-semibold'
                      : 'bg-[var(--color-paper-100)] text-[var(--text-secondary)] border-[var(--border-default)] hover:border-[var(--color-terracotta-400)]'
                  )}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Submit Action Block */}
      <div className="space-y-3 pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          withArrow
        >
          {isSubmitting ? 'Sending Your Enquiry...' : 'SEND MY ENQUIRY'}
        </Button>
        <p className="text-[11px] text-center text-[var(--text-muted)]">
          Your travel details are reviewed directly by our Madurai coordinators to confirm vehicle availability and customized route pacing.
        </p>
      </div>
    </form>
  );
}
