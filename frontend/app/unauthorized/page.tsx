"use client";

import Link from "next/link";
import { Lock, Home, Shield, AlertTriangle, MoveLeft } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-md w-full">
        {/* Animated Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 p-8 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 dark:bg-gray-800/95 dark:border-gray-700">
          {/* Icon Container */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center shadow-inner dark:from-red-900/30 dark:to-red-800/30">
                <div className="w-16 h-16 bg-gradient-to-br from-red-200 to-red-300 rounded-full flex items-center justify-center shadow-md dark:from-red-700/50 dark:to-red-600/50">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Lock className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Floating warning icon */}
              <div className="absolute -top-2 -right-2 bg-amber-500 rounded-full p-1 shadow-lg animate-bounce">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent dark:from-red-400 dark:to-red-500">
                Access Denied
              </h1>
              <p className="text-gray-600 text-lg font-medium dark:text-gray-300">
                Unauthorized Access
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                You don't have permission to view this page. Please contact your administrator if you believe this is an error.
              </p>
            </div>

            {/* Security Tips */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 text-left dark:bg-blue-900/20 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5 dark:text-blue-400" />
                <div>
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Security Notice</p>
                  <p className="text-xs text-blue-600 dark:text-blue-300">
                    This area requires special permissions. Ensure you're logged in with the correct account.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1E40AF] to-[#1E40AF]/90 text-white rounded-full font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 hover:from-[#1E40AF] hover:to-[#1E40AF] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              <MoveLeft className="h-5 w-5" />
              Go Back Home
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need help?{" "}
            <Link 
              href="/contact" 
              className="text-[#1E40AF] hover:text-[#1E40AF]/80 font-medium underline-offset-4 hover:underline dark:text-blue-400"
            >
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}