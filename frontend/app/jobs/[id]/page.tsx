// app/jobs/[id]/page.tsx
import JobDetailClient from "@/components/jobs/job-detail-client";
import React from "react";

interface JobPageProps {
  params: { id: string };
}

// Server Component
export default function JobDetailPage({ params }: JobPageProps) {
  const { id } = params;
  return <JobDetailClient id={id} />;
}
