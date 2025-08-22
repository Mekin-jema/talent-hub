// app/jobs/create/page.tsx
"use client";

import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";
import CreateJobForm from "@/components/jobs/create-job-form";

export default function CreateJobPage() {
//   const { data: session, status } = useSession();
  // const router = useRouter();
  // const [isEmployer, setIsEmployer] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);



//   if (status === "loading" || isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <Loader2 className="h-8 w-8 animate-spin" />
//       </div>
//     );
//   }

//   if (!isEmployer) {
//     return (
//       <div className="max-w-4xl mx-auto p-6">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
//           <p className="text-muted-foreground mb-6">
//             Only employers can create job postings.
//           </p>
//           <Button onClick={() => router.push("/jobs")}>
//             <ArrowLeft className="h-4 w-4 mr-2" />
//             Back to Jobs
//           </Button>
//         </div>
//       </div>
//     );
//   }

  return <CreateJobForm />;
}