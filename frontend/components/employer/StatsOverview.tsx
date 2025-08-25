// components/employer/StatsOverview.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, Calendar, Bell } from 'lucide-react';
import { Badge } from '../ui/badge';

interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface StatsOverviewProps {
  stats: {
    totalJobs: number;
    totalApplications: number;
    unreadNotifications: number;
  };
  jobs: any[];
  applications: any[];
  notifications: Notification[]; // ✅ Added here
}

const StatsOverview = ({ stats, jobs, applications, notifications }: StatsOverviewProps) => {
  const activeJobs = jobs.filter(job => job.status === 'active').length;
  const interviewCount = applications.filter(app => app.status === 'interview').length;
  const interviewRate = applications.length > 0 
    ? Math.round((interviewCount / applications.length) * 100) 
    : 0;

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobs}</div>
            <p className="text-xs text-muted-foreground">
              {activeJobs} active jobs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              +5 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interview Rate</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interviewRate}%</div>
            <p className="text-xs text-muted-foreground">
              {interviewCount} interviews scheduled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unreadNotifications}</div>
            <p className="text-xs text-muted-foreground">
              Unread notifications
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Applications & Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>
              Latest job applications from candidates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applications.slice(0, 3).map((application) => (
                <div key={application.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{application.applicantName}</p>
                    <p className="text-sm text-muted-foreground">{application.jobTitle}</p>
                  </div>
                  <Badge variant={
                    application.status === 'shortlisted' ? 'default' :
                    application.status === 'interview' ? 'secondary' :
                    application.status === 'rejected' ? 'destructive' : 'outline'
                  }>
                    {application.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>
              Your latest notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.slice(0, 3).map((notification) => (
                <div key={notification.id} className={`p-3 border rounded-lg ${!notification.isRead ? 'bg-muted/50' : ''}`}>
                  <p className="font-medium">{notification.message}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default StatsOverview;
