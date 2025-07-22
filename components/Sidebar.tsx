'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Sidebar.module.css';

import {
  FiHome,
  FiFileText,
  FiTool,
  FiKey,
  FiCpu,
  FiAlertCircle,
  FiInfo,
  FiMail,
  FiDollarSign,
  FiMenu,
  FiX,
} from 'react-icons/fi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <FiX /> : <FiMenu />}
      </button>

      <aside className={`${styles.sidebar} ${!isOpen ? styles.closed : ''}`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo-secureops.png"
            alt="SecureOps Logo"
            width={32}
            height={32}
            priority
          />
          <span>SecureOps</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.link}><FiHome /> Dashboard</Link>
          <Link href="/create-plan" className={styles.link}><FiFileText /> Create Plan</Link>
          <Link href="/create-patch-plan" className={styles.link}><FiTool /> Patch Agent</Link>
          <Link href="/create-key-rotation-plan" className={styles.link}><FiKey /> Key Rotation</Link>
          <Link href="/create-architecture-audit" className={styles.link}><FiCpu /> Architecture</Link>
          <Link href="/triage-vulnerabilities" className={styles.link}><FiAlertCircle /> Vulnerabilities</Link>

          <hr className={styles.divider} />

          <Link href="/about" className={styles.link}><FiInfo /> About Us</Link>
          <Link href="/contact" className={styles.link}><FiMail /> Contact</Link>
          <Link href="/pricing" className={styles.link}><FiDollarSign /> Pricing</Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;