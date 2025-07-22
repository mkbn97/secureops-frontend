'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

type PlanFormProps = {
  endpoint: string; // e.g., '/api/v1/plans/create' or '/api/v1/plans/auto-generate'
};

const PlanForm: React.FC<PlanFormProps> = ({ endpoint }) => {
  const router = useRouter();
  const [systemDetails, setSystemDetails] = useState('');
  const [patchType, setPatchType] = useState('');
  const [severity, setSeverity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const payload = {
      systemDetails,
      patchType,
      severity,
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Something went wrong');
      }

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border shadow-md rounded-lg p-6 space-y-5 max-w-xl w-full"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          System Details
        </label>
        <input
          type="text"
          value={systemDetails}
          onChange={(e) => setSystemDetails(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm"
          placeholder="e.g. Ubuntu 22.04 | Web Server"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Patch Type
        </label>
        <input
          type="text"
          value={patchType}
          onChange={(e) => setPatchType(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm"
          placeholder="e.g. Kernel, SSL, App updates"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Severity Level
        </label>
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm"
          required
        >
          <option value="">Select severity</option>
          <option value="low">Low</option>
          <option value="moderate">Moderate</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-md flex justify-center items-center gap-2"
      >
        {loading && <Loader2 className="animate-spin w-4 h-4" />}
        {loading ? 'Submitting...' : 'Submit Plan'}
      </button>
    </form>
  );
};

export default PlanForm;