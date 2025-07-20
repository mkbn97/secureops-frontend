'use client';

import React from 'react';
import styles from './DashboardMetricCard.module.css';

interface DashboardMetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtext?: string;
  severity?: 'low' | 'medium' | 'high' | 'critical' | 'verified';
}

const DashboardMetricCard: React.FC<DashboardMetricCardProps> = ({
  icon,
  title,
  value,
  subtext,
  severity = 'low',
}) => {
  return (
    <div className={`${styles.card} ${styles[severity]}`}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.textGroup}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>{value}</div>
        {subtext && <div className={styles.subtext}>{subtext}</div>}
      </div>
    </div>
  );
};

export default DashboardMetricCard;
