'use client';

import { User, Mail, ShieldCheck } from 'lucide-react';

type Agent = {
  id: string;
  name: string;
  email: string;
  role: string;
};

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  return (
    <div className="bg-white border shadow-sm rounded-lg p-5 space-y-3 hover:shadow-md transition">
      <div className="flex items-center gap-2 text-gray-700 font-medium">
        <User className="w-4 h-4 text-blue-600" />
        {agent.name}
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Mail className="w-4 h-4" />
        {agent.email}
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <ShieldCheck className="w-4 h-4 text-green-600" />
        Role: {agent.role}
      </div>
    </div>
  );
};

export default AgentCard;