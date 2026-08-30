'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  KanbanSquare,
  Users,
  Megaphone,
  Settings,
  LogOut,
  Menu,
  X,
  MessageSquare,
  ExternalLink,
  ShieldCheck,
  Compass,
  Bell,
  Sparkles,
} from 'lucide-react';
import { LogoHorizontal } from '@/components/brand/LogoHorizontal';
import { useLeadNotifications } from '@/lib/crm/useLeadNotifications';

export function AdminNavWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { latestLead, showToast, dismissToast, unreadCount, resetUnread } = useLeadNotifications();

  // If on login page, render only the login container
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    {
      label: 'Overview & KPIs',
      href: '/admin',
      icon: LayoutDashboard,
      active: pathname === '/admin',
    },
    {
      label: 'Leads Table',
      href: '/admin/enquiries',
      icon: Users,
      active: pathname === '/admin/enquiries',
    },
    {
      label: 'Pipeline Kanban',
      href: '/admin/pipeline',
      icon: KanbanSquare,
      active: pathname === '/admin/pipeline',
    },
    {
      label: 'Ads & WhatsApp Hub',
      href: '/admin/settings',
      icon: Megaphone,
      active: pathname === '/admin/settings',
    },
  ];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#121211] relative">
      {/* Real-Time Floating Lead Toast Notification */}
      {showToast && latestLead && (
        <div className="fixed top-4 right-4 z-50 max-w-sm w-full bg-[#1C1C1A] border-2 border-[#A65F43] rounded-lg p-4 shadow-editorial-lift animate-in slide-in-from-top duration-300">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#A65F43]/20 flex items-center justify-center text-[#A65F43] shrink-0">
                <Bell className="w-4 h-4 animate-bounce" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#A65F43] font-bold">
                  New Lead Received!
                </span>
                <h4 className="text-xs font-bold text-white">
                  {latestLead.name}
                </h4>
              </div>
            </div>
            <button
              onClick={dismissToast}
              className="p-1 text-[#8A8780] hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-2 text-[11px] text-[#C2BFBA] space-y-0.5 font-mono">
            <div>📍 {latestLead.origin} → {latestLead.destinations.join(', ')}</div>
            <div className="text-[#8A8780]">Source: {latestLead.attribution?.source || 'Website'}</div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <Link
              href={`/admin/enquiries/${latestLead.id}`}
              onClick={dismissToast}
              className="flex-1 py-1.5 px-2.5 bg-[#A65F43] hover:bg-[#86462E] text-white text-[11px] font-semibold rounded text-center transition-colors"
            >
              Open Lead Dossier
            </Link>
            <button
              onClick={dismissToast}
              className="py-1.5 px-2.5 bg-[#262624] text-[#C2BFBA] hover:text-white text-[11px] rounded"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#191918] border-r border-[#2C2C29] flex flex-col transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-5 border-b border-[#2C2C29] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#A65F43] flex items-center justify-center font-serif text-white font-bold text-lg shadow-sm">
              M
            </div>
            <div>
              <h2 className="font-serif text-sm font-semibold text-white tracking-wide">
                MAHALAKSHMI
              </h2>
              <p className="text-[10px] text-[#A65F43] font-mono uppercase tracking-wider">
                Owner CRM Desk
              </p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 text-[#8A8780] hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#73706A]">
            Core Operations
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded text-xs font-medium transition-all ${
                  item.active
                    ? 'bg-[#A65F43] text-white shadow-sm font-semibold'
                    : 'text-[#C2BFBA] hover:bg-[#242422] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-4 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-[#73706A]">
            Quick Shortcuts
          </div>

          <Link
            href="/admin/enquiries?status=NEW_ENQUIRY"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-xs text-[#C2BFBA] hover:bg-[#242422] hover:text-white rounded"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#BC765A] animate-pulse"></span>
              New Leads Stream
            </span>
          </Link>

          <Link
            href="/admin/enquiries?source=google_ads"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-xs text-[#C2BFBA] hover:bg-[#242422] hover:text-white rounded"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              Google Ads Leads
            </span>
          </Link>

          <Link
            href="/admin/enquiries?source=meta_ads"
            onClick={() => setSidebarOpen(false)}
            className="flex items-center justify-between px-3 py-2 text-xs text-[#C2BFBA] hover:bg-[#242422] hover:text-white rounded"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
              Instagram / Meta Leads
            </span>
          </Link>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-xs text-[#8A8780] hover:text-[#C2BFBA] transition-colors mt-2"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Open Public Website</span>
            <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
          </a>
        </nav>

        {/* User Session & Logout Footer */}
        <div className="p-3 border-t border-[#2C2C29] bg-[#141413]">
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#2A2A28] border border-[#3D3D39] flex items-center justify-center text-[10px] text-[#A65F43] font-mono font-bold">
                OWN
              </div>
              <div className="text-left">
                <div className="text-xs font-medium text-white flex items-center gap-1">
                  Travel Desk
                  <ShieldCheck className="w-3 h-3 text-[#A65F43]" />
                </div>
                <div className="text-[10px] text-[#73706A] font-mono">Madurai Office</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="p-1.5 rounded text-[#8A8780] hover:text-red-400 hover:bg-[#222220] transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Command Bar */}
        <header className="h-14 bg-[#191918] border-b border-[#2C2C29] px-4 lg:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 text-[#C2BFBA] hover:text-white lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#8A8780]">
              <span className="text-[#C2BFBA] font-medium">Mahalakshmi Tour & Travel</span>
              <span>/</span>
              <span className="text-[#A65F43] font-mono uppercase text-[10px] tracking-wider bg-[#A65F43]/10 px-2 py-0.5 rounded border border-[#A65F43]/20">
                Owner Mode
              </span>
            </div>
          </div>

          {/* Topbar Quick Actions & Realtime Notifications */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button
              onClick={resetUnread}
              className="p-1.5 rounded bg-[#242422] border border-[#333330] text-[#C2BFBA] hover:text-white relative cursor-pointer"
              title="New Lead Alerts"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#A65F43] text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <Link
              href="/admin/enquiries"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#242422] border border-[#333330] text-xs text-[#C2BFBA] hover:text-white hover:border-[#4B4A46] transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-[#A65F43]" />
              <span>All Enquiries</span>
            </Link>

            <Link
              href="/admin/pipeline"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#A65F43] text-white text-xs font-semibold hover:bg-[#86462E] transition-colors shadow-sm"
            >
              <KanbanSquare className="w-3.5 h-3.5" />
              <span>Pipeline</span>
            </Link>
          </div>
        </header>

        {/* Page Content Scrollable Container */}
        <main className="flex-1 overflow-y-auto bg-[#121211] p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

