'use client';

import React, { ReactNode } from 'react';

interface AgentCardProps {
  title: string;
  description: string;
  children?: ReactNode; // <-- This line enables `children`
}

const AgentCard: React.FC<AgentCardProps> = ({ title, description, children }) => {
  return (
    <div
      style={{
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '12px',
        padding: '24px',
        backgroundColor: 'var(--background)',
        color: 'var(--foreground)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        maxWidth: '960px',
        width: '100%',
        margin: '0 auto',
      }}
    >
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{title}</h2>
      <p style={{ fontSize: '1rem', marginBottom: '1.5rem', color: '#666' }}>{description}</p>
      {children}
    </div>
  );
};

export default AgentCard;
