'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AutoGeneratePlanPage() {
  const [agentId, setAgentId] = useState('');
  const [systemDetails, setSystemDetails] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) throw new Error('Not authenticated');

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/plans/auto-generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ agent_id: agentId, system_details: systemDetails }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to auto-generate plan');
      setMessage('✅ Plan generated and stored successfully.');
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Auto-Generate Patch Plan</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Agent ID"
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          placeholder="System Details"
          value={systemDetails}
          onChange={(e) => setSystemDetails(e.target.value)}
          rows={5}
          className="w-full border rounded px-3 py-2 resize-none"
        />

        <button
          onClick={handleSubmit}
          disabled={!agentId || !systemDetails || loading}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-5 rounded disabled:opacity-50"
        >
          {loading ? 'Generating...' : 'Auto Generate Plan'}
        </button>

        {message && (
          <div className="mt-4 text-sm whitespace-pre-wrap">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}