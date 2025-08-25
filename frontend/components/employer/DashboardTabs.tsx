// components/employer/DashboardTabs.tsx
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Users, Bell, BarChart3 } from 'lucide-react';
import StatsOverview from './StatsOverview';
import JobsManager from './JobsManager';
import ApplicationManager from './ApplicationManager';
import NotificationPanel from './NotificationPanel';


interface DashboardTabsProps {
  jobs: any[];
  applications: any[];
  notifications: any[];
  stats: {
    totalJobs: number;
    totalApplications: number;
    unreadNotifications: number;
  };
}

const DashboardTabs = ({ jobs, applications, notifications, stats }: DashboardTabsProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <TabsList className="relative grid grid-cols-4 gap-4 w-3xl right-0 ">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="jobs" className="flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          Jobs
        </TabsTrigger>
        <TabsTrigger value="applications" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          Applications
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Notifications
          {stats.unreadNotifications > 0 && (
            <Badge variant="destructive" className="ml-1">
              {stats.unreadNotifications}
            </Badge>
          )}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        {/* <StatsOverview stats={stats} jobs={jobs} applications={applications} /> */}
        <StatsOverview
          stats={{
            totalJobs: jobs.length,
            totalApplications: applications.length,
            unreadNotifications: notifications.filter(n => !n.isRead).length,
          }}
          jobs={jobs}
          applications={applications}
          notifications={notifications} // ✅ added
        />

      </TabsContent>

      <TabsContent value="jobs" className="space-y-6">
        <JobsManager
          jobs={jobs}
          onSelectJob={setSelectedJobId}
          selectedJobId={selectedJobId}
        />
      </TabsContent>

      <TabsContent value="applications" className="space-y-6">
        <ApplicationManager
          applications={applications}
          jobs={jobs}
          selectedJobId={selectedJobId}
          onJobSelect={setSelectedJobId}
        />
      </TabsContent>

      <TabsContent value="notifications" className="space-y-6">
        <NotificationPanel notifications={notifications} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;