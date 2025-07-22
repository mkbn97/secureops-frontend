'use client';

import { User, Mail, ShieldCheck } from 'lucide-react';

type Agent = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AgentListProps = {
  agents: Agent[];
};

const AgentList: React.FC<AgentListProps> = ({ agents }) => {
  if (agents.length === 0) {
    return <p className="text-gray-500 text-sm">No agents found.</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="bg-white border shadow-sm rounded-lg p-5 space-y-3 hover:shadow-md transition"
        >
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
      ))}
    </div>
  );
};

export default AgentList;