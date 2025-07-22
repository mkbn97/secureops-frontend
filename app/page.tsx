'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { motion } from 'framer-motion';
import {
  FaBug,
  FaShieldAlt,
  FaSignInAlt,
  FaKey,
  FaChartLine,
  FaNetworkWired,
  FaClipboardCheck,
  FaFileAlt,
} from 'react-icons/fa';
import DashboardMetricCard from '@/components/DashboardMetricCard';
import LiveServerFeed from '@/components/LiveServerFeed';


export default function Home() {
  return (
    <main className={styles.page}>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.hero}
      >
        <Image
          className={styles.logo}
          src="/logo-secureops.PNG"
          alt="SecureOps logo"
          width={160}
          height={40}
          priority
        />
        <h1 className={styles.title}>SecureOps</h1>
        <p className={styles.subtitle}>Your AI-powered DevSecOps agent suite</p>
      </motion.header>

      <motion.div
        className={styles.ctas}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <Link className={styles.primary} href="/create-plan">
          Generate a Custom Plan
        </Link>
        <Link className={styles.secondary} href="/create-architecture-audit">
          System Architecture Audit
        </Link>
        <Link className={styles.secondary} href="/create-key-rotation-plan">
          Key Rotation Plan
        </Link>
        <Link className={styles.secondary} href="/create-cicd-pipeline">
          Secure Your CI/CD Pipeline
        </Link>
        <Link className={styles.secondary} href="/generate-compliance-report">
          Generate Compliance Report
        </Link>
        <Link className={styles.secondary} href="/triage-vulnerabilities">
          Triage Vulnerabilities
        </Link>
      </motion.div>

      <motion.section
        className={styles.metrics}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.metricTitle}> SecureOps Dashboard</h2>
        <div className={styles.metricGrid}>
          <DashboardMetricCard icon={<FaBug />} title="Unpatched Vulnerabilities" value="12" subtext="5 Critical" severity="critical" />
          <DashboardMetricCard icon={<FaShieldAlt />} title="Active Security Incidents" value="3" subtext="High" severity="high" />
          <DashboardMetricCard icon={<FaSignInAlt />} title="Failed Login Attempts (24h)" value="59" severity="medium" />
          <DashboardMetricCard icon={<FaKey />} title="Privileged Access Events" value="4" severity="low" />
          <DashboardMetricCard icon={<FaChartLine />} title="System Resource Anomalies" value="2 Hosts Spiking" severity="low" />
          <DashboardMetricCard icon={<FaNetworkWired />} title="Unusual Network Behavior" value="1 Suspicious IP" severity="critical" />
          <DashboardMetricCard icon={<FaClipboardCheck />} title="Audit Log Integrity Status" value="100% Verified" severity="verified" />
          <DashboardMetricCard icon={<FaFileAlt />} title="Patch Plan Approval Queue" value="2 Plans Waiting" severity="medium" />
        </div>
      </motion.section>
        
        <div>
      <LiveServerFeed />
      </div>


      <footer className={styles.footer}>
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
          Built with Next.js
        </a>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          Deployed on Vercel
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </footer>
    </main>
  );
}
