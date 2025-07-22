// components/ClientLayout.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen text-white bg-[#0D1117]">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#1F1F1F] z-40 transform transition-transform duration-300 ease-in-out border-r border-neutral-800 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
      >
        <div className="p-6 space-y-6">
          <Link href="/" className="flex items-center gap-3 mb-4">
            <Image src="/logo-secureops.png" alt="SecureOps Logo" width={32} height={32} priority />
            <span className="text-lg font-semibold">SecureOps</span>
          </Link>
          </div>
      </aside>
      

      {/* Main Content */}
      <div className="flex-1 ml-0 sm:ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="w-full px-6 py-4 border-b border-neutral-800 bg-[#0D1117] sticky top-0 z-30 flex items-center justify-between">
          <button
            className="sm:hidden text-white focus:outline-none"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold tracking-wide">SecureOps</h1>
        </header>

        <main className="flex-grow p-6">{children}</main>

        <footer className="border-t border-neutral-800 px-6 py-4 text-center text-xs text-neutral-500">
          &copy; {new Date().getFullYear()} SecureOps. Built for cloud security.
        </footer>
      </div>
    </div>
  );
}
