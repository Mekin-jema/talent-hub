'use client';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import DashboardTabs from '@/components/employer/DashboardTabs';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore } from '@/store/useAuthStore';
import { useJobStore } from '@/store/useJobStore';
import { Application, useApplicationStore } from '@/store/useApplicationStore';

// Types (simplified)
interface Job {
  id: string;
  title: string;
  companyName: string;
  type: string;
  location: string;
  posted: string;
  applications: number;
  status: 'active' | 'closed' | 'draft';
}

// interface Application {
//   id: string;
//   jobId: string;
//   jobTitle: string;
//   applicantName: string;
//   applicantEmail: string;
//   appliedDate: string;
//   status: 'applied' | 'shortlisted' | 'rejected' | 'interview';
//   resumeUrl: string;
//   coverLetter: string;
// }

const EmployerDashboard = () => {
  const { user } = useAuthStore();
  console.log(user);
  const { jobs, loading: jobsLoading, fetchJobs } = useJobStore();
  const { applications, loading: appsLoading, fetchJobApplications } = useApplicationStore();

  // Fetch all jobs for this employer
  useEffect(() => {
    if (user?.id) {
      fetchJobs();
    }
  }, [user?.id, fetchJobs]);

  // Fetch applications for only this employer’s jobs
  useEffect(() => {
    if (jobs.length > 0 && user?.id) {
      jobs
        .filter((job) => job.userId === user.user.id) // ✅ schema says Job.userId is the employer
        .forEach((job) => fetchJobApplications(job.id));
    }
  }, [jobs, user?.user.id, fetchJobApplications]);

  // Filter jobs that belong to this employer
  const employerJobs = useMemo(
    () => jobs.filter((job) => job.userId === user?.user.id),
    [jobs, user?.user.id]
  );

  // Transform jobs
  const transformedJobs: Job[] = employerJobs.map(job => ({
    id: job.id,
    title: job.title,
    companyName: job.companyName || 'Private Company',
    type: job.type || 'Full-time',
    location: job.location || 'Remote',
    posted: job.posted
      ? new Date(job.posted).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0],
    applications: job._count?.applications || 0,
    status: job.featured ? 'active' : 'draft',
  }));

  // Filter applications that belong only to this employer’s jobs
  const employerApplications = useMemo(
    () => applications.filter(app => employerJobs.some(job => job.id === app.job.id)),
    [applications, employerJobs]
  );

  // Transform applications (preserve required fields from Application)
  const transformedApplications: Application[] = employerApplications.map(app => ({
    ...app, // includes createdAt, updatedAt, job, applicant, etc.
    id: app.id,
    jobId: app.job.id,
    jobTitle: app.job?.title || 'Unknown Job',
    applicantName: app.applicant?.fullName || 'Unknown Applicant',
    applicantEmail: app.applicant?.email || 'No email',
    appliedDate: new Date(app.createdAt).toISOString().split('T')[0],
    status: app.status as Application['status'],
    resumeUrl: app.resumeUrl || '',
    coverLetter: app.coverLetter || '',
  }));

  const stats = {
    totalJobs: transformedJobs.length,
    totalApplications: transformedApplications.length,
    unreadNotifications: 0, // replace when notifications API is ready
  };

  if (jobsLoading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-40" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Employer Dashboard</h1>
        <Button asChild variant="default">
          <Link href="/jobs/create" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Link>
        </Button>
      </div>

      <DashboardTabs
        jobs={transformedJobs}
        applications={transformedApplications}
        notifications={[]} // add real notifications later
        stats={stats}
        loading={appsLoading}
      />
    </div>
  );
};

export default EmployerDashboard;
