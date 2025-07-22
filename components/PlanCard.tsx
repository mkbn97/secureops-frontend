'use client';

import Link from 'next/link';
import { FC } from 'react';
import { CalendarCheck, Server, ShieldCheck } from 'lucide-react';

type PlanCardProps = {
  id: string;
  agentId: string;
  systemDetails: string;
  createdAt: string;
  status: string;
};

const PlanCard: FC<PlanCardProps> = ({ id, agentId, systemDetails, createdAt, status }) => {
  return (
    <div className="border rounded-xl shadow-sm p-5 bg-white hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            Patch Plan #{id.slice(0, 6)}...
          </h2>

          <p className="text-sm text-gray-600 flex items-center gap-1">
            <Server className="w-4 h-4 text-gray-400" />
            {systemDetails || 'N/A'}
          </p>

          <p className="text-sm text-gray-600 flex items-center gap-1">
            <CalendarCheck className="w-4 h-4 text-gray-400" />
            Created: {new Date(createdAt).toLocaleDateString()}
          </p>

          <p className={`text-sm font-medium mt-1 ${
            status === 'pending' ? 'text-yellow-600' :
            status === 'completed' ? 'text-green-600' :
            'text-gray-600'
          }`}>
            Status: {status}
          </p>
        </div>

        <Link
          href={`/plans/${id}`}
          className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md hover:bg-blue-700 transition"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default PlanCard;