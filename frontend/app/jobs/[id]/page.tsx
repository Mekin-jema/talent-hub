// app/jobs/[id]/page.tsx
"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ApplicationDialog, JobDetailContent, JobDetailHeader, JobDetailSidebar } from "@/components/applications";


// Mock job data - in a real app this would come from an API
const allJobs = [
  {
    id: "job_1",
    title: "Frontend Developer",
    company: "TechCorp",
    logo: "https://logo.clearbit.com/reactjs.org",
    location: "Remote",
    salary: "$4000 - $6000",
    type: "Full-time",
    posted: "2 days ago",
    skills: ["React", "TypeScript", "Tailwind"],
    featured: true,
    category: "Engineering",
    description: "We're looking for a talented Frontend Developer to join our team. You'll be responsible for building user interfaces and implementing designs.",
    requirements: ["3+ years of React experience", "Strong TypeScript skills", "Experience with responsive design"],
    responsibilities: ["Develop new user-facing features", "Build reusable components and front-end libraries", "Optimize applications for maximum performance"],
    aboutCompany: "TechCorp is a leading technology company focused on creating innovative solutions for businesses worldwide. We value creativity, collaboration, and cutting-edge technology."
  },
  {
    id: "job_2",
    title: "Backend Developer",
    company: "SoftNet",
    logo: "https://logo.clearbit.com/nodejs.org",
    location: "Addis Ababa",
    salary: "$3500 - $5000",
    type: "Full-time",
    posted: "5 days ago",
    skills: ["Node.js", "Express", "MongoDB", "Docker"],
    featured: false,
    category: "Engineering",
    description: "Join our backend team to build scalable APIs and services for our growing user base.",
    requirements: ["Experience with Node.js and Express", "Database design skills", "Knowledge of containerization"],
    responsibilities: ["Design and implement RESTful APIs", "Develop and maintain server-side logic", "Ensure high performance and responsiveness to requests"],
    aboutCompany: "SoftNet specializes in creating robust backend solutions for enterprises. Our team is passionate about building scalable and efficient systems."
  },
  {
    id: "job_3",
    title: "Full-Stack React Native web app developer",
    company: "Private Client",
    logo: "https://logo.clearbit.com/reactjs.org",
    location: "Addis Ababa, Ethiopia",
    salary: "$5000 - $8000",
    type: "Contractual",
    posted: "1 day ago",
    skills: ["React Native", "Firebase", "Node.js", "Web Development"],
    featured: true,
    category: "Engineering",
    description: "We're looking for a talented full-stack React Native developer to build a web app football fan engagement app with live scores, real-time chat, and quizzes.",
    requirements: ["3+ years React Native experience", "Backend development skills", "Experience with real-time applications", "Knowledge of Firebase"],
    responsibilities: ["Develop a cross-platform mobile app using React Native", "Implement real-time features", "Create engaging user interfaces", "Integrate with third-party APIs"],
    aboutCompany: "We are a sports technology startup focused on enhancing fan engagement through innovative digital experiences."
  }
];

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);
  const [applicationFormOpen, setApplicationFormOpen] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);
  const [resume, setResume] = useState<File | null>(null);

  const jobId = params.id as string;
  const job = allJobs.find(job => job.id === jobId);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
        </Button>
      </div>
    );
  }

  const handleSave = () => {
    setSaved(!saved);
  };

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
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job: ${job.title} at ${job.company}`,
        url: window.location.href,
      })
        .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
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
      {/* Header with Back Button */}
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => router.back()}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
      </Button>

      <JobDetailHeader
        job={job}
        saved={saved}
        onSave={handleSave}
        onShare={handleShare}
        onBack={() => router.back()}
      />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <JobDetailContent job={job} />
        
        <JobDetailSidebar
          job={job}
          saved={saved}
          applied={applied}
          onSave={handleSave}
          onApply={handleApply}
        />
      </div>

      {/* Application Form Dialog */}
      <ApplicationDialog
        open={applicationFormOpen}
        setOpen={setApplicationFormOpen}
        applicationStep={applicationStep}
        setApplicationStep={setApplicationStep}
        job={job}
        resume={resume}
        handleFileChange={handleFileChange}
        handleCloseForm={handleCloseForm}
        onApplicationSubmit={handleApplicationSubmit}
      />
    </div>
  );
}