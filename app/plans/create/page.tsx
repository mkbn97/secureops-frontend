'use client';

import { useState } from 'react';

export default function CreatePlanPage() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreatePlan = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/plans/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create plan');
      setResponse(JSON.stringify(data.plan, null, 2));
    } catch (err: any) {
      setResponse(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Create General DevSecOps Plan</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a description or request for a DevSecOps plan..."
        rows={6}
        className="w-full p-3 border rounded text-sm mb-4 resize-none"
      />

      <button
        onClick={handleCreatePlan}
        disabled={loading || !prompt}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Plan'}
      </button>

      {response && (
        <pre className="mt-6 bg-gray-900 text-green-300 text-sm p-4 rounded overflow-auto whitespace-pre-wrap">
          {response}
        </pre>
      )}
    </div>
  );
}