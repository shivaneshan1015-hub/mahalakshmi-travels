/**
 * MAHALAKSHMI TOUR & TRAVEL — PROGRESSIVE CUSTOM JOURNEY BUILDER
 * Master interactive container supporting URL prefill, multi-step navigation, and submission.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, MessageSquare, Phone } from 'lucide-react';
import {
  StructuredEnquiry,
  TravelIntent,
  GroupType,
  VehicleRequirementType,
  DateFlexibility,
  ContactPreference,
} from '@/types/enquiry';
import { validateEnquiryPayload } from '@/lib/conversion/validation';
import { getQuickWhatsAppLink } from '@/lib/conversion/whatsapp';
import { getPrimaryPhoneTelUrl } from '@/lib/conversion/phone';
import { getStoredAttribution } from '@/lib/conversion/attribution';
import { JourneyLineProgress } from './JourneyLineProgress';
import { Step01Intent } from './Step01Intent';
import { Step02Destinations } from './Step02Destinations';
import { Step03Travellers } from './Step03Travellers';
import { Step04DatesDuration } from './Step04DatesDuration';
import { Step05VehicleRequirements } from './Step05VehicleRequirements';
import { Step06ContactReview } from './Step06ContactReview';
import { EnquirySuccessCard } from './EnquirySuccessCard';
import { Button } from '@/components/ui/Button';
import { Zap, X, Clock, CheckCircle } from 'lucide-react';

export function CustomJourneyBuilder() {
  const searchParams = useSearchParams();

  // Master State
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showQuickQuoteModal, setShowQuickQuoteModal] = useState<boolean>(false);
  const [quickQuoteSubmitted, setQuickQuoteSubmitted] = useState<boolean>(false);
  const [quickQuoteData, setQuickQuoteData] = useState({
    name: '',
    phone: '',
    destination: '',
    passengers: '4-7 Passengers',
  });
  const [submittedData, setSubmittedData] = useState<{
    enquiry: StructuredEnquiry;
    referenceCode: string;
  } | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof StructuredEnquiry, string>>>({});

  const [enquiry, setEnquiry] = useState<StructuredEnquiry>({
    intent: 'custom',
    origin: 'Madurai',
    destinations: [],
    customDestination: '',
    travelDate: '',
    returnDate: '',
    duration: '1 Night / 2 Days',
    dateFlexibility: 'flexible',
    travellerCount: 4,
    groupType: 'family',
    vehicleRequirement: 'help-me-choose',
    notes: '',
    name: '',
    phone: '',
    email: '',
    contactPreference: 'whatsapp',
    honeypot: '',
  });

  // URL Context Prefill
  useEffect(() => {
    const tourParam = searchParams.get('tour');
    const vehicleParam = searchParams.get('vehicle');
    const serviceParam = searchParams.get('service');
    const destinationParam = searchParams.get('destination');

    setEnquiry((prev) => {
      const updated = { ...prev };

      if (tourParam) {
        updated.intent = 'tour';
        const formattedTitle = tourParam
          .replace('madurai-to-', '')
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());
        updated.destinations = [formattedTitle];
        updated.sourceContext = { tourSlug: tourParam, tourTitle: `Madurai to ${formattedTitle}` };
      } else if (vehicleParam) {
        updated.intent = 'vehicle';
        if (vehicleParam.includes('21-seater')) {
          updated.vehicleRequirement = '21-seater-van';
          updated.travellerCount = 15;
          updated.groupType = 'group';
        } else if (vehicleParam.includes('sedan')) {
          updated.vehicleRequirement = 'sedan-car';
          updated.travellerCount = 4;
          updated.groupType = 'family';
        }
        updated.sourceContext = { vehicleSlug: vehicleParam };
      } else if (serviceParam) {
        if (serviceParam.includes('college')) {
          updated.intent = 'college';
          updated.groupType = 'college';
          updated.travellerCount = 18;
          updated.vehicleRequirement = '21-seater-van';
        } else if (serviceParam.includes('group')) {
          updated.intent = 'group';
          updated.groupType = 'organization';
          updated.travellerCount = 16;
          updated.vehicleRequirement = '21-seater-van';
        } else if (serviceParam.includes('family')) {
          updated.intent = 'family';
          updated.groupType = 'family';
          updated.travellerCount = 4;
        } else if (serviceParam.includes('function')) {
          updated.intent = 'function';
          updated.groupType = 'function';
          updated.travellerCount = 20;
          updated.vehicleRequirement = '21-seater-van';
        }
        updated.sourceContext = { serviceSlug: serviceParam };
      } else if (destinationParam) {
        const formatted = destinationParam
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());
        updated.destinations = [formatted];
      }

      return updated;
    });
  }, [searchParams]);

  // Step Nav Handlers
  const handleNext = () => {
    // Basic step validation
    if (currentStep === 2) {
      const hasDest = enquiry.destinations.length > 0 || (enquiry.customDestination && enquiry.customDestination.trim().length > 0);
      if (!hasDest && enquiry.intent !== 'general' && enquiry.intent !== 'vehicle') {
        setErrors({ destinations: 'Please select or enter at least one destination.' });
        return;
      }
    }
    setErrors({});
    setCurrentStep((prev) => Math.min(6, prev + 1));
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateEnquiryPayload(enquiry);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const attribution = getStoredAttribution();
      const payload = {
        ...enquiry,
        ...attribution,
      };

      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success && data.reference) {
        setSubmittedData({
          enquiry,
          referenceCode: data.reference,
        });
      } else {
        setErrors({ name: data.error || 'Failed to submit enquiry. Please try again or contact our travel desk.' });
      }
    } catch (err) {
      setErrors({ name: 'Unable to submit enquiry due to a network error. Please try again or contact our Madurai travel desk directly via WhatsApp or Phone.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setCurrentStep(1);
    setEnquiry({
      intent: 'custom',
      origin: 'Madurai',
      destinations: [],
      customDestination: '',
      travelDate: '',
      returnDate: '',
      duration: '1 Night / 2 Days',
      dateFlexibility: 'flexible',
      travellerCount: 4,
      groupType: 'family',
      vehicleRequirement: 'help-me-choose',
      notes: '',
      name: '',
      phone: '',
      email: '',
      contactPreference: 'whatsapp',
    });
  };

  if (submittedData) {
    return (
      <EnquirySuccessCard
        enquiry={submittedData.enquiry}
        referenceCode={submittedData.referenceCode}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto relative">
      {/* Quick-Quote Shortcut Helper Prompt */}
      <div className="mb-6 px-4 py-3 bg-[var(--color-terracotta-50)] border border-[var(--color-terracotta-200)] rounded-[4px] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-editorial-sm">
        <div className="flex items-center gap-2 text-xs text-[var(--color-terracotta-800)] font-medium">
          <Zap className="w-4 h-4 text-[var(--color-terracotta-600)] shrink-0" />
          <span>In a hurry? Get a direct travel quote without 6 steps:</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowQuickQuoteModal(true)}
            className="text-xs font-semibold text-[var(--color-terracotta-700)] underline hover:text-[var(--color-terracotta-800)] cursor-pointer"
          >
            Quick 30s Quote
          </button>
          <span className="text-[var(--color-terracotta-300)]">•</span>
          <a
            href={getQuickWhatsAppLink('Quick Quote Prompt')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[var(--color-terracotta-700)] flex items-center gap-1 hover:text-[var(--color-terracotta-800)]"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            WhatsApp
          </a>
        </div>
      </div>

      {/* Route Line Progress Indicator */}
      <JourneyLineProgress
        currentStep={currentStep}
        totalSteps={6}
        onStepClick={(s) => setCurrentStep(s)}
      />

      {/* Step Contents Container */}
      <div className="p-6 md:p-10 bg-[#FFFFFF] rounded-[4px] border border-[var(--border-default)] shadow-editorial-sm mb-6 animate-step-enter key={currentStep}">
        {currentStep === 1 && (
          <div className="animate-step-enter">
            <Step01Intent
              selectedIntent={enquiry.intent}
              onSelect={(intent) => {
                setEnquiry((prev) => ({ ...prev, intent }));
                handleNext();
              }}
              onNext={handleNext}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="animate-step-enter">
            <Step02Destinations
              origin={enquiry.origin}
              destinations={enquiry.destinations}
              customDestination={enquiry.customDestination}
              onUpdateOrigin={(origin) => setEnquiry((prev) => ({ ...prev, origin }))}
              onToggleDestination={(dest) =>
                setEnquiry((prev) => ({
                  ...prev,
                  destinations: prev.destinations.includes(dest)
                    ? prev.destinations.filter((d) => d !== dest)
                    : [...prev.destinations, dest],
                }))
              }
              onUpdateCustomDestination={(dest) =>
                setEnquiry((prev) => ({ ...prev, customDestination: dest }))
              }
            />
          </div>
        )}

        {currentStep === 3 && (
          <div className="animate-step-enter">
            <Step03Travellers
              travellerCount={enquiry.travellerCount}
              groupType={enquiry.groupType}
              onChangeCount={(count) => setEnquiry((prev) => ({ ...prev, travellerCount: count }))}
              onChangeGroupType={(type) => setEnquiry((prev) => ({ ...prev, groupType: type }))}
            />
          </div>
        )}

        {currentStep === 4 && (
          <div className="animate-step-enter">
            <Step04DatesDuration
              dateFlexibility={enquiry.dateFlexibility}
              travelDate={enquiry.travelDate}
              returnDate={enquiry.returnDate}
              duration={enquiry.duration}
              onChangeFlexibility={(flexibility) =>
                setEnquiry((prev) => ({ ...prev, dateFlexibility: flexibility }))
              }
              onChangeTravelDate={(date) => setEnquiry((prev) => ({ ...prev, travelDate: date }))}
              onChangeReturnDate={(date) => setEnquiry((prev) => ({ ...prev, returnDate: date }))}
              onChangeDuration={(dur) => setEnquiry((prev) => ({ ...prev, duration: dur }))}
            />
          </div>
        )}

        {currentStep === 5 && (
          <div className="animate-step-enter">
            <Step05VehicleRequirements
              vehicleRequirement={enquiry.vehicleRequirement}
              notes={enquiry.notes}
              onChangeVehicleRequirement={(req) =>
                setEnquiry((prev) => ({ ...prev, vehicleRequirement: req }))
              }
              onChangeNotes={(notes) => setEnquiry((prev) => ({ ...prev, notes }))}
            />
          </div>
        )}

        {currentStep === 6 && (
          <div className="animate-step-enter">
            <Step06ContactReview
              enquiry={enquiry}
              errors={errors}
              isSubmitting={isSubmitting}
              onChangeName={(name) => setEnquiry((prev) => ({ ...prev, name }))}
              onChangePhone={(phone) => setEnquiry((prev) => ({ ...prev, phone }))}
              onChangeEmail={(email) => setEnquiry((prev) => ({ ...prev, email }))}
              onChangePreference={(pref) =>
                setEnquiry((prev) => ({ ...prev, contactPreference: pref }))
              }
              onChangeHoneypot={(val) => setEnquiry((prev) => ({ ...prev, honeypot: val }))}
              onSubmit={handleSubmit}
              onEditStep={(s) => setCurrentStep(s)}
            />
          </div>
        )}
      </div>

      {/* Persistent Bottom Stepper Controls (Steps 1 to 5) */}
      {currentStep < 6 && (
        <div className="flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={handleBack}
              icon={<ArrowLeft className="w-4 h-4" />}
              iconPosition="left"
            >
              Back
            </Button>
          ) : (
            <div />
          )}

          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleNext}
            withArrow
          >
            {currentStep === 5 ? 'Review Your Journey' : 'Continue to Next Step'}
          </Button>
        </div>
      )}

      {/* Quick 1-Step Quote Modal */}
      {showQuickQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-step-enter">
          <div className="bg-[var(--color-paper-100)] border border-[var(--border-default)] rounded-[4px] p-6 md:p-8 max-w-lg w-full shadow-editorial-lift relative">
            <button
              type="button"
              onClick={() => setShowQuickQuoteModal(false)}
              className="absolute top-4 right-4 text-[var(--color-ink-600)] hover:text-[var(--color-ink-950)] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!quickQuoteSubmitted ? (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-[var(--color-terracotta-500)]" />
                  <span className="type-eyebrow text-[var(--color-terracotta-500)]">Fast Callback</span>
                </div>
                <h3 className="type-h3 text-[var(--color-ink-950)] mb-2">
                  Get a 30-Second Travel Quote
                </h3>
                <p className="type-body-small text-[var(--text-secondary)] mb-6">
                  Leave your travel destination and number. Our Madurai travel desk will WhatsApp your itinerary estimate within 15 minutes.
                </p>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!quickQuoteData.phone) return;
                    setIsSubmitting(true);
                    try {
                      const attribution = getStoredAttribution();
                      await fetch('/api/enquiry', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          name: quickQuoteData.name || 'Quick Quote Guest',
                          phone: quickQuoteData.phone,
                          destinations: [quickQuoteData.destination || 'South India Trip'],
                          intent: 'custom',
                          origin: 'Madurai',
                          notes: `Quick Quote request for ${quickQuoteData.passengers}`,
                          contactPreference: 'whatsapp',
                          ...attribution,
                        }),
                      });
                    } catch (err) {
                      // offline fallback
                    } finally {
                      setIsSubmitting(false);
                      setQuickQuoteSubmitted(true);
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-800)] mb-1">
                      Your WhatsApp / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 63801 92145"
                      value={quickQuoteData.phone}
                      onChange={(e) => setQuickQuoteData({ ...quickQuoteData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[3px] border border-[var(--border-default)] bg-white text-sm focus:outline-none focus:border-[var(--color-terracotta-500)]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-800)] mb-1">
                        Destination
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Munnar / Ooty"
                        value={quickQuoteData.destination}
                        onChange={(e) => setQuickQuoteData({ ...quickQuoteData, destination: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[3px] border border-[var(--border-default)] bg-white text-sm focus:outline-none focus:border-[var(--color-terracotta-500)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-ink-800)] mb-1">
                        Group Size
                      </label>
                      <select
                        value={quickQuoteData.passengers}
                        onChange={(e) => setQuickQuoteData({ ...quickQuoteData, passengers: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-[3px] border border-[var(--border-default)] bg-white text-sm focus:outline-none focus:border-[var(--color-terracotta-500)]"
                      >
                        <option value="1-4 Passengers">1–4 (Sedan)</option>
                        <option value="5-7 Passengers">5–7 (Innova/SUV)</option>
                        <option value="8-14 Passengers">8–14 (Tempo Traveller)</option>
                        <option value="15-21 Passengers">15–21 (Minibus)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <Button type="submit" variant="primary" size="md" fullWidth isLoading={isSubmitting}>
                      Request Quick Callback
                    </Button>
                    <a
                      href={`https://wa.me/916380192145?text=${encodeURIComponent(
                        `Hi Mahalakshmi Travels, I would like a quick quote for a trip to ${quickQuoteData.destination || 'South India'} (${quickQuoteData.passengers}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button type="button" variant="secondary" size="md" fullWidth icon={<MessageSquare className="w-4 h-4 text-emerald-700" />} iconPosition="left">
                        Open in WhatsApp
                      </Button>
                    </a>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-[var(--color-status-success)] mx-auto mb-3" />
                <h4 className="type-h3 text-[var(--color-ink-950)] mb-2">
                  Callback Request Received!
                </h4>
                <p className="type-body-small text-[var(--text-secondary)] mb-6">
                  Our Madurai travel coordinator will reach out on WhatsApp ({quickQuoteData.phone}) shortly.
                </p>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setShowQuickQuoteModal(false);
                    setQuickQuoteSubmitted(false);
                  }}
                >
                  Done
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
