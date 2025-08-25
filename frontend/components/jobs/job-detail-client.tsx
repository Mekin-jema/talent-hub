"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader } from "lucide-react";
import {
  ApplicationDialog,
  JobDetailContent,
  JobDetailHeader,
  JobDetailSidebar,
} from "@/components/applications";
import { useJobStore } from "@/store/useJobStore";
import { toast } from "sonner";

export default function JobDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);
  const [applicationFormOpen, setApplicationFormOpen] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);
  const [resume, setResume] = useState<File | null>(null);
  console.log(resume)

  const { currentJob, getJobById, loading} = useJobStore();
  

  // Fetch job on mount
  useEffect(() => {
    if (id) getJobById(id);
  }, [id, getJobById]);

  // Show loading state
  if (loading && !currentJob) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <Loader className="h-8 w-8 mx-auto animate-spin text-muted-foreground" />
      </div>
    );
  }


  const handleSave = () => setSaved(!saved);
  const handleApply = () => {
    setApplicationFormOpen(true);
    setApplicationStep(1);
  };
  const handleApplicationSubmit = () => {
    setApplied(true);
    setApplicationFormOpen(false);
    setApplicationStep(1);
    setResume(null);
  };
  const handleShare = () => {
    if (!currentJob) return;
    if (navigator.share) {
      navigator
        .share({
          title: currentJob.title,
          text: `Check out this job: ${currentJob.title} at ${currentJob.aboutCompany}`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (e.target.files && e.target.files[0]) setResume(e.target.files[0]);
      const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      toast.error("Please upload a PDF, DOC, or DOCX file");
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setResume(file);
  };
  const handleCloseForm = () => {
    setApplicationFormOpen(false);
    setTimeout(() => {
      setApplicationStep(1);
      setResume(null);
    }, 300);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
      </Button>

      <JobDetailHeader
        job={currentJob}
        saved={saved}
        onSave={handleSave}
        onShare={handleShare}
        onBack={() => router.back()}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <JobDetailContent job={currentJob} />

        <JobDetailSidebar
          job={currentJob}
          saved={saved}
          applied={applied}
          onSave={handleSave}
          onApply={handleApply}
        />
      </div>

      <ApplicationDialog
        open={applicationFormOpen}
        setOpen={setApplicationFormOpen}
        applicationStep={applicationStep}
        setApplicationStep={setApplicationStep}
        job={currentJob}
        resume={resume}
        handleFileChange={handleFileChange}
        handleCloseForm={handleCloseForm}
        onApplicationSubmit={handleApplicationSubmit}
      />
    </div>
  );
}
