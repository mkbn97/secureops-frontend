// app/About/page.tsx

import React from 'react';
// import { ShieldCheck, Cpu, Bot, Terminal } from 'lucide-react'; // optional icons

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">About SecureOps</h1>

      <p className="text-lg mb-4">
        <span className="font-semibold">SecureOps</span> is an AI-powered DevSecOps platform designed to streamline cybersecurity operations with automation, precision, and speed. Our platform empowers security teams to:
      </p>

      <ul className="list-disc list-inside mb-6 space-y-2">
        <li>Scan remote systems and detect vulnerabilities in real-time</li>
        <li>Auto-generate patch plans using secure AI agents</li>
        <li>Execute updates and remediation tasks across connected infrastructure</li>
        <li>Manage key rotation, compliance audits, and CI/CD hardening</li>
      </ul>

      <p className="text-lg mb-4">
        Built with engineers in mind, SecureOps reduces manual overhead and improves system reliability across environments—from cloud-native platforms to on-prem systems.
      </p>

      <p className="text-md text-gray-500 mt-10">
        Engineered for cybersecurity professionals by cybersecurity professionals.
      </p>
    </div>
  );
};

export default AboutPage;