"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRole?: "DEVELOPER" | "EMPLOYER" | "ADMIN";
}

const PrivateRoute = ({ children, allowedRole }: PrivateRouteProps) => {
  const { user, isCheckingAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isCheckingAuth) return; // wait until auth state is loaded

    // Not logged in
    if (!user || !user.user) {
      router.push("/login");
      return;
    }

    // Role check
    if (allowedRole && user.user.role !== allowedRole) {
      router.push("/unauthorized");
      return;
    }
  }, [user, isCheckingAuth, router, allowedRole]);

  // Show loader while auth state is being checked
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader size={24} className="animate-spin" />
      </div>
    );
  }

  if (!user || !user.user) return null;
  if (allowedRole && user.user.role !== allowedRole) return null;

  return <>{children}</>;
};

export default PrivateRoute;
