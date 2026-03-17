'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      setIsAdmin(false);
      if (pathname !== '/admin/login') router.replace('/admin/login');
      return;
    }
    // Check admin custom claim
    user.getIdTokenResult(true).then((result) => {
      if (result.claims.admin === true) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        router.replace('/admin/login');
      }
    });
  }, [user, loading, pathname, router]);

  if (loading || isAdmin === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
      </div>
    );
  }

  if (!isAdmin && pathname !== '/admin/login') return null;

  return <>{children}</>;
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <AdminGuard>{children}</AdminGuard>;
}
