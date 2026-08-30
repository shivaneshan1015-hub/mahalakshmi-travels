'use client';

import { useState, useEffect, useRef } from 'react';
import { CrmEnquiry } from '@/types/crm';

export function useLeadNotifications() {
  const [latestLead, setLatestLead] = useState<CrmEnquiry | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const lastCountRef = useRef<number | null>(null);

  // Synthesize soft pleasant dual-tone chime using Web Audio API
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const now = ctx.currentTime;
      
      // First tone (523.25 Hz - C5)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now);
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.3);

      // Second tone (659.25 Hz - E5)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(659.25, now + 0.12);
      gain2.gain.setValueAtTime(0.15, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.45);
    } catch {
      // Audio autoplay policy fallback
    }
  };

  useEffect(() => {
    const checkNewLeads = async () => {
      try {
        const res = await fetch('/api/admin/enquiries');
        const data = await res.json();
        if (data.success && Array.isArray(data.enquiries)) {
          const currentCount = data.count || data.enquiries.length;
          
          // If first check, store initial count
          if (lastCountRef.current === null) {
            lastCountRef.current = currentCount;
            return;
          }

          // If new lead arrived
          if (currentCount > lastCountRef.current) {
            const newest = data.enquiries[0];
            setLatestLead(newest);
            setShowToast(true);
            setUnreadCount((prev) => prev + (currentCount - (lastCountRef.current || 0)));
            playChime();
            lastCountRef.current = currentCount;

            // Auto-dismiss toast after 7s
            setTimeout(() => {
              setShowToast(false);
            }, 7000);
          }
        }
      } catch (err) {
        console.warn('Lead notification check error:', err);
      }
    };

    const interval = setInterval(checkNewLeads, 12000); // 12s polling interval
    return () => clearInterval(interval);
  }, []);

  return {
    latestLead,
    showToast,
    dismissToast: () => setShowToast(false),
    unreadCount,
    resetUnread: () => setUnreadCount(0),
  };
}
