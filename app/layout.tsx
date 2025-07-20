import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SecureOps | AI-Powered DevSecOps Agents",
  description: "Automate cloud security and DevSecOps with SecureOps AI agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#0D1117] text-white`}>
        <header className="w-full px-6 py-4 flex items-center justify-between border-b border-neutral-800">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-secureops.png" // place your transparent logo in public folder
              alt="SecureOps Logo"
              width={40}
              height={40}
              priority
            />
            <span className="text-xl font-semibold tracking-wide">SecureOps</span>
          </Link>

          <nav className="flex gap-6 text-sm font-mono">
            <Link href="/create-plan">Create Plan</Link>
            <Link href="/create-patch-plan">Patch Agent</Link>
            <Link href="/create-key-rotation-plan">Key Rotation</Link>
            <Link href="/create-architecture-analysis">Architecture</Link>
            <Link href="/triage-vulnerabilities">Vulnerability Triage</Link>
          </nav>
        </header>

        <main className="p-6 min-h-screen">{children}</main>

        <footer className="border-t border-neutral-800 px-6 py-4 text-center text-xs text-neutral-500">
          &copy; {new Date().getFullYear()} SecureOps. Built for cloud security.
        </footer>
      </body>
    </html>
  );
}
