'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, ArrowRight, Shield, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { LogoHorizontal } from '@/components/brand/LogoHorizontal';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/admin';

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('owner@mahalakshmitravels.com');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Authentication failed. Invalid owner password.');
        setLoading(false);
        return;
      }

      // Success, route to destination
      router.push(redirectUrl);
      router.refresh();
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred while signing in. Please check your network.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#121211] px-4 py-12 relative overflow-hidden">
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#A65F43]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#1C1C1A] border border-[#2E2E2A] text-[#A65F43] mb-4 shadow-editorial-md">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="font-serif text-2xl md:text-3xl text-white font-bold tracking-tight">
            Mahalakshmi Travel Desk
          </h1>
          <p className="text-xs text-[#8A8780] font-mono uppercase tracking-widest mt-1">
            Owner CRM & Lead Management Portal
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-[#1A1A19] border border-[#2D2D29] rounded-lg p-6 sm:p-8 shadow-editorial-lift">
          {error && (
            <div className="mb-6 p-3.5 bg-red-950/40 border border-red-800/60 rounded flex items-center gap-3 text-red-200 text-xs animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#A8A59E] tracking-wider mb-1.5">
                Owner Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-[#121211] border border-[#33332E] rounded text-sm text-white focus:outline-none focus:border-[#A65F43] focus:ring-1 focus:ring-[#A65F43] transition-colors"
                placeholder="owner@mahalakshmitravels.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-mono uppercase text-[#A8A59E] tracking-wider">
                  Access Password / PIN
                </label>
                <span className="text-[10px] text-[#78756F] font-mono">
                  Default: <code className="text-[#A65F43]">mahalakshmi2026</code>
                </span>
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter owner access password"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-[#121211] border border-[#33332E] rounded text-sm text-white focus:outline-none focus:border-[#A65F43] focus:ring-1 focus:ring-[#A65F43] transition-colors font-mono"
                />
                <Lock className="w-4 h-4 text-[#78756F] absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-[#A65F43] hover:bg-[#86462E] text-white font-medium text-sm rounded shadow-editorial-sm transition-all flex items-center justify-center gap-2 group disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Access...</span>
                  </span>
                ) : (
                  <>
                    <span>Enter Owner Portal</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Access Button */}
          <div className="mt-6 pt-5 border-t border-[#2A2A26] text-center">
            <button
              type="button"
              onClick={() => {
                setPassword('mahalakshmi2026');
                setEmail('owner@mahalakshmitravels.com');
              }}
              className="text-xs text-[#A65F43] hover:underline inline-flex items-center gap-1 font-mono cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fill Default Password</span>
            </button>
          </div>
        </div>

        {/* Security & SEO Notice */}
        <div className="mt-6 text-center text-[11px] text-[#63615C] space-y-1">
          <p className="flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Protected with Next.js Middleware & Session HMAC</span>
          </p>
          <p>Search engines strictly blocked with <code className="font-mono text-[#7E7B75]">noindex, nofollow</code>.</p>
        </div>
      </div>
    </div>
  );
}
