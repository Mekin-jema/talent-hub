"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-bold text-primary">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">
        Oops! The page you are looking for doesn’t exist.
      </p>

      <div className="mt-6">
        <Button asChild>
          <Link href="/" className="flex items-center">
            <Home className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
