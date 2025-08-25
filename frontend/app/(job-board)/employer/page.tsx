// components/employer/dashboard.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Bell,
  Briefcase,
  Users,
  BarChart3,
  Search,
  Plus,
  Mail,
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import DashboardTabs from '@/components/employer/DashboardTabs';

// Mock data types
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

interface Application {
  id: string;
  jobId: string;
  applicantName: string;
  applicantEmail: string;
  appliedDate: string;
  status: 'applied' | 'shortlisted' | 'rejected' | 'interview';
  resumeUrl: string;
  coverLetter: string;
  jobTitle: string;
}

interface Notification {
  id: string;
  message: string;
  type: 'application' | 'system' | 'message';
  isRead: boolean;
  createdAt: string;
  applicationId?: string;
}

// Mock data
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    companyName: 'Tech Innovations Inc.',
    type: 'Full-time',
    location: 'Remote',
    posted: '2023-10-15',
    applications: 24,
    status: 'active'
  },
  {
    id: '2',
    title: 'Product Designer',
    companyName: 'Tech Innovations Inc.',
    type: 'Full-time',
    location: 'San Francisco, CA',
    posted: '2023-09-20',
    applications: 18,
    status: 'active'
  },
  {
    id: '3',
    title: 'Backend Engineer',
    companyName: 'Tech Innovations Inc.',
    type: 'Contract',
    location: 'New York, NY',
    posted: '2023-08-05',
    applications: 32,
    status: 'closed'
  },
  {
    id: '4',
    title: 'DevOps Specialist',
    companyName: 'Tech Innovations Inc.',
    type: 'Full-time',
    location: 'Remote',
    posted: '2023-11-01',
    applications: 0,
    status: 'draft'
  }
];

const mockApplications: Application[] = [
  {
    id: '1',
    jobId: '1',
    jobTitle: 'Senior Frontend Developer',
    applicantName: 'Alex Johnson',
    applicantEmail: 'alex.johnson@example.com',
    appliedDate: '2023-10-20',
    status: 'shortlisted',
    resumeUrl: '/resumes/alex-johnson.pdf',
    coverLetter: 'I am excited to apply for this position with 5 years of React experience...'
  },
  {
    id: '2',
    jobId: '1',
    jobTitle: 'Senior Frontend Developer',
    applicantName: 'Maria Garcia',
    applicantEmail: 'maria.garcia@example.com',
    appliedDate: '2023-10-18',
    status: 'applied',
    resumeUrl: '/resumes/maria-garcia.pdf',
    coverLetter: 'As a frontend developer with expertise in modern JavaScript frameworks...'
  },
  {
    id: '3',
    jobId: '2',
    jobTitle: 'Product Designer',
    applicantName: 'James Wilson',
    applicantEmail: 'james.wilson@example.com',
    appliedDate: '2023-09-25',
    status: 'interview',
    resumeUrl: '/resumes/james-wilson.pdf',
    coverLetter: 'I have been designing user-centered products for over 6 years...'
  },
  {
    id: '4',
    jobId: '2',
    jobTitle: 'Product Designer',
    applicantName: 'Sarah Chen',
    applicantEmail: 'sarah.chen@example.com',
    appliedDate: '2023-09-22',
    status: 'rejected',
    resumeUrl: '/resumes/sarah-chen.pdf',
    coverLetter: 'My design philosophy focuses on simplicity and functionality...'
  }
];

const mockNotifications: Notification[] = [
  {
    id: '1',
    message: 'New application for Senior Frontend Developer',
    type: 'application',
    isRead: false,
    createdAt: '2023-10-20T14:30:00Z',
    applicationId: '1'
  },
  {
    id: '2',
    message: 'Your job posting for Product Designer has been approved',
    type: 'system',
    isRead: true,
    createdAt: '2023-10-18T09:15:00Z'
  },
  {
    id: '3',
    message: 'Interview scheduled with James Wilson for Product Designer position',
    type: 'message',
    isRead: false,
    createdAt: '2023-10-05T16:45:00Z',
    applicationId: '3'
  }
];

const EmployerDashboard = () => {
  const stats = {
    totalJobs: mockJobs.length,
    totalApplications: mockApplications.length,
    unreadNotifications: mockNotifications.filter(n => !n.isRead).length
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Employer Dashboard</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Post New Job
        </Button>
      </div>

      <DashboardTabs 
        jobs={mockJobs}
        applications={mockApplications}
        notifications={mockNotifications}
        stats={stats}
      />
    </div>
  );
};

export default EmployerDashboard;