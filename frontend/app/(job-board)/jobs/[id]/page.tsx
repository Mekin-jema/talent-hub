// app/jobs/[id]/page.tsx
import JobDetailClient from "@/components/jobs/job-detail-client";
import React from "react";

interface JobPageProps {
  params: Promise<{ id: string }>;
}


// Server Component
export default async function JobDetailPage({ params }: JobPageProps) {
  const { id } = await params;
  return <JobDetailClient id={id} />;
}
