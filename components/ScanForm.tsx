'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

export default function ScanForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    target: '',
    systemType: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const res = await fetch('/api/v1/plans/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Scan failed');
      }

      const result = await res.json();
      setSuccessMessage('Scan completed successfully.');
      setFormData({ target: '', systemType: '' });
      router.refresh(); // optional if you want to reload updated data
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <div>
        <Label htmlFor="target" className="block text-sm font-medium text-gray-700">
          Target Hostname / IP
        </Label>
        <Input
          type="text"
          id="target"
          name="target"
          value={formData.target}
          onChange={handleChange}
          placeholder="e.g., 192.168.1.10"
          required
        />
      </div>

      <div>
        <Label htmlFor="systemType" className="block text-sm font-medium text-gray-700">
          System Type
        </Label>
        <Input
          type="text"
          id="systemType"
          name="systemType"
          value={formData.systemType}
          onChange={handleChange}
          placeholder="e.g., Ubuntu 22.04"
          required
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Scanning...' : 'Start Scan'}
      </Button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}
    </form>
  );
}