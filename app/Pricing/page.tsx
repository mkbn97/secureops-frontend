'use client';

import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$0',
    description: 'For individuals getting started with security automation.',
    features: [
      'Basic patching tools',
      'Community support',
      '1 system scan per month',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: '$29/mo',
    description: 'For small teams that want streamlined patch workflows.',
    features: [
      'Unlimited patch plans',
      'Real-time vulnerability alerts',
      'Email support',
      'Up to 10 systems',
    ],
    cta: 'Upgrade to Pro',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    description: 'For security teams managing dozens of deployments.',
    features: [
      'Custom integrations',
      'Dedicated agent coordination',
      'Audit & compliance dashboard',
      'Priority support',
    ],
    cta: 'Request a Demo',
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Pricing Plans</h1>
        <p className="text-gray-600 text-lg">
          Choose a plan that fits your security operations needs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 max-w-7xl mx-auto">
        {pricingPlans.map((plan) => (
          <div
            key={plan.name}
            className={`border rounded-xl p-6 bg-white shadow-sm flex flex-col ${
              plan.highlight ? 'border-blue-600 shadow-md' : ''
            }`}
          >
            <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
            <p className="text-3xl font-bold mb-4">{plan.price}</p>
            <p className="text-gray-600 mb-6">{plan.description}</p>
            <ul className="space-y-3 mb-6 text-sm">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="mt-auto">{plan.cta}</Button>
          </div>
        ))}
      </div>
    </main>
  );
}