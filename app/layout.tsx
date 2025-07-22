import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar"; // 👈 import the sidebar

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SecureOps | AI-Powered DevSecOps Agents",
  description: "Automate cloud security and DevSecOps with SecureOps AI agents.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#0D1117] text-white flex min-h-screen`}
      >
        {/* Sidebar */}
        <aside>
        <Sidebar />
        </aside>

        {/* Main Content */}
        <div className="flex-1 ml-0 sm:ml-64 flex flex-col min-h-screen">


          <main className="flex-grow p-6">{children}</main>

          <footer className="border-t border-neutral-800 px-6 py-4 text-center text-xs text-neutral-500">
            &copy; {new Date().getFullYear()} SecureOps. Built for cloud security.
          </footer>
        </div>
      </body>
    </html>
  );
}
