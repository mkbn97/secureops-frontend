'use client';

import { useState } from 'react';
import AgentCard from '@/components/AgentCard';

type PlanResult =
  | string
  | {
      pipeline_security_plan?: Record<string, any>;
    };

export default function CreatePipelineSecurePage() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<PlanResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('http://localhost:4000/create-pipeline-secure', {
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
      title="Create Pipeline Security Plan"
      description="Secure your CI/CD pipeline using least privilege, token protection, and automated threat detection."
    >
      <textarea
        placeholder="e.g. secure CI/CD pipeline with role-based access and secrets scanning"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        style={{
          width: '100%',
          marginTop: 12,
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
        {loading ? 'Generating...' : 'Generate Pipeline Plan'}
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
