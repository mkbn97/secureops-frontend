'use client';

import { useState } from 'react';
import AgentCard from '@/components/AgentCard';

type PlanResult =
  | string
  | {
      patch_management_plan?: Record<string, any>;
      key_rotation_plan?: Record<string, any>;
      [key: string]: any;
    };

export default function CreatePlanPage() {
  const [agent, setAgent] = useState('create-plan');
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<PlanResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`http://localhost:4000/${agent}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResult(data.plan || data.result || data.rawResult || data.error || 'No result returned.');
    } catch (err: any) {
      setResult(`Error: ${err.message || 'Unexpected error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AgentCard
      title="SecureOps AI Assistant"
      description="Create custom DevSecOps automation plans. Select an agent and describe the task you'd like to automate."
    >
      <label style={{ display: 'block', marginTop: 16, marginBottom: 8 }}>
        <strong>Select Agent:</strong>
      </label>
      <select
        value={agent}
        onChange={(e) => setAgent(e.target.value)}
        style={{
          width: '100%',
          padding: 8,
          marginBottom: 16,
          borderRadius: 4,
          border: '1px solid #ccc',
        }}
      >
        <option value="create-plan">📋 General DevSecOps Plan</option>
        <option value="create-patch-plan">🛡️ Patch Management Plan</option>
        {/* You can add more agent routes here */}
      </select>

      <textarea
        placeholder="e.g. automate SSL certificate renewal"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        style={{
          width: '100%',
          marginBottom: 12,
          padding: 8,
          backgroundColor: '#1e1e1e',
          color: '#fff',
          border: '1px solid #ccc',
          borderRadius: 4,
        }}
      />

      <button
        onClick={handleGenerate}
        disabled={loading || prompt.trim() === ''}
        style={{
          backgroundColor: '#0070f3',
          color: '#fff',
          padding: '8px 16px',
          borderRadius: 4,
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Generating...' : 'Generate Plan'}
      </button>

      {result && (
        <pre
          style={{
            marginTop: 20,
            backgroundColor: '#111',
            color: '#0f0',
            padding: 12,
            borderRadius: 4,
            whiteSpace: 'pre-wrap',
          }}
        >
          {typeof result === 'string' ? result : JSON.stringify(result, null, 2)}
        </pre>
      )}
    </AgentCard>
  );
}
