/**
 * MAHALAKSHMI TOUR & TRAVEL — OWNER CRM LAYOUT
 * Dedicated full-screen admin command center with strict search-engine privacy (noindex, nofollow).
 */

import { Metadata } from 'next';
import { AdminNavWrapper } from './AdminNavWrapper';

export const metadata: Metadata = {
  title: 'Owner CRM & Lead Command Center | Mahalakshmi Tour & Travel',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#141413] text-[#F2EEE5] flex flex-col font-sans selection:bg-[#A65F43] selection:text-white">
      <AdminNavWrapper>{children}</AdminNavWrapper>
    </div>
  );
}
