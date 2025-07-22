'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from './supabaseClient';

interface RoleGuardProps {
  allowedRoles: string[];
  fallback?: ReactNode;
  children: ReactNode;
}

export default function RoleGuard({ allowedRoles, fallback = null, children }: RoleGuardProps) {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      if (!user) {
        router.push('/login'); // Redirect to login if no user
        return;
      }

      // Fetch user profile/role from Supabase (you should have a 'profiles' table or JWT claims)
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error.message);
        setLoading(false);
        return;
      }

      if (profile && allowedRoles.includes(profile.role)) {
        setHasAccess(true);
      }

      setLoading(false);
    };

    checkRole();
  }, [allowedRoles, router]);

  if (loading) return <div className="p-4">Checking permissions...</div>;
  return hasAccess ? <>{children}</> : fallback;
}