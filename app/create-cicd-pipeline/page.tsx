'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function CreateCICDPipelinePage() {
  const [projectName, setProjectName] = useState('');
  const [repositoryUrl, setRepositoryUrl] = useState('');
  const [deploymentTarget, setDeploymentTarget] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/v1/cicd/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectName, repositoryUrl, deploymentTarget }),
      });

      if (!res.ok) {
        throw new Error('Failed to create CI/CD pipeline plan');
      }

      const data = await res.json();
      router.push(`/pipelines/${data.id}`);
    } catch (err: any) {
      setError(err.message || 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Create CI/CD Pipeline Plan</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <Label htmlFor="projectName">Project Name</Label>
          <Input
            id="projectName"
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="repositoryUrl">Repository URL</Label>
          <Input
            id="repositoryUrl"
            type="url"
            value={repositoryUrl}
            onChange={(e) => setRepositoryUrl(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="deploymentTarget">Deployment Target</Label>
          <Input
            id="deploymentTarget"
            type="text"
            value={deploymentTarget}
            onChange={(e) => setDeploymentTarget(e.target.value)}
            placeholder="e.g. Vercel, AWS, DigitalOcean"
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating...' : 'Create Pipeline'}
        </Button>
      </form>
    </main>
  );
}