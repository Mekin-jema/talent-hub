// app/unauthorized/page.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
        <ShieldAlert className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page. Please contact an administrator if you believe this is an error.
        </p>
        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/">Go to Homepage</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/auth/login">Sign in with different account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;