'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

type PatchPlan = {
  id: string;
  status: string;
  user_email: string;
  plan_json: {
    steps: string[];
    systemType: string;
    patchTools: string[];
    requiresReboot: boolean;
    estimatedDowntime: string;
    createdAt: string;
  };
  prompt: string;
};

export default function PatchPlanDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [plan, setPlan] = useState<PatchPlan | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPlan = async () => {
    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/plans/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch plan');
      const data = await res.json();
      setPlan(data.plan);
    } catch (err) {
      console.error('Error loading plan:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, [params.id]);

  if (loading) return <div className="p-6">Loading patch plan...</div>;
  if (!plan) return <div className="p-6 text-red-600">Patch plan not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Patch Plan Details</h1>

      <div className="bg-white rounded shadow p-4 space-y-3">
        <p><strong>ID:</strong> {plan.id}</p>
        <p><strong>Status:</strong> {plan.status}</p>
        <p><strong>User Email:</strong> {plan.user_email}</p>
        <p><strong>System Type:</strong> {plan.plan_json.systemType}</p>
        <p><strong>Patch Tools:</strong> {plan.plan_json.patchTools.join(', ')}</p>
        <p><strong>Reboot Required:</strong> {plan.plan_json.requiresReboot ? 'Yes' : 'No'}</p>
        <p><strong>Estimated Downtime:</strong> {plan.plan_json.estimatedDowntime}</p>
        <p><strong>Created At:</strong> {new Date(plan.plan_json.createdAt).toLocaleString()}</p>

        <div>
          <strong>Steps:</strong>
          <ol className="list-decimal ml-5 mt-2 space-y-1">
            {plan.plan_json.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div>
          <strong>Original Prompt:</strong>
          <p className="mt-1 text-gray-700">{plan.prompt}</p>
        </div>
      </div>
    </div>
  );
}