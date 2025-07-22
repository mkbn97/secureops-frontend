'use client';

import { useEffect, useState } from 'react';
import { Server, Clock, ListChecks } from 'lucide-react';

type Scan = {
  id: string;
  systemName: string;
  timestamp: string;
  resultSummary: string;
};

export default function ScansPage() {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const res = await fetch('/api/v1/plans/scans');
        if (!res.ok) throw new Error('Failed to fetch scans');
        const data = await res.json();
        setScans(data);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchScans();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">System Scans</h1>

      {loading && <p>Loading scans...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {scans.map((scan) => (
          <div
            key={scan.id}
            className="bg-white border shadow-sm rounded-lg p-5 space-y-3 hover:shadow-md transition"
          >
            <div className="flex items-center gap-2 text-gray-700 font-medium">
              <Server className="w-4 h-4 text-blue-600" />
              {scan.systemName}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              {new Date(scan.timestamp).toLocaleString()}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ListChecks className="w-4 h-4 text-green-600" />
              {scan.resultSummary}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}