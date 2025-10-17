"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuthStore } from '@/store/useAuthStore';
import { useAdminStore } from '@/store/useAdminStore';
import { ApplicationStatus, Role } from '@/types';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const { 
    allApplications, 
    allJobs, 
    // recentJobs, 
    analytics, 
    loading, 
    fetchAllApplications, 
    fetchAllJobs, 
    fetchRecentJobs, 
    fetchAnalytics, 
    updateApplicationStatus, 
    deleteJob 
  } = useAdminStore();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [currentPage, setCurrentPage] = useState({
    applications: 1,
    jobs: 1
  });

  useEffect(() => {
    if (user?.user.role === Role.ADMIN) {
      fetchAllApplications();
      fetchAllJobs();
      fetchRecentJobs();
      fetchAnalytics();
    }
  }, [user, fetchAllApplications, fetchAllJobs, fetchRecentJobs, fetchAnalytics]);

  const handleStatusChange = async (applicationId: string, newStatus: ApplicationStatus) => {
    try {
      await updateApplicationStatus(applicationId, newStatus);
    } catch (error) {
      console.error('Failed to update application status:', error);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      await deleteJob(jobId);
    } catch (error) {
      console.error('Failed to delete job:', error);
    }
  };

  const handlePageChange = (type: string, page: number | undefined) => {
    setCurrentPage(prev => ({ ...prev, [type]: page }));
    if (type === 'applications') {
      fetchAllApplications(page);
    } else {
      fetchAllJobs(page);
    }
  };

  const jobApplicationsData = allJobs.map(job => ({
    name: job.title.length > 20 ? job.title.substring(0, 20) + '...' : job.title,
    applications: job._count?.applications || 0
  }));

  const applicationStatusData = analytics ? [
    { name: 'Pending', value: analytics.pendingApplications || 0 },
    { name: 'Accepted', value: analytics.acceptedApplications || 0 },
    { name: 'Rejected', value: analytics.rejectedApplications || 0 }
  ] : [];

  const recentApplications = allApplications
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  if (user?.user.role !== Role.ADMIN) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You need administrator privileges to access this dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading && !analytics) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.user.fullName}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Job Management</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics?.totalJobs || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics?.totalApplications || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics?.pendingApplications || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics?.totalUsers || 0}</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Applications by Job</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={jobApplicationsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="applications" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={applicationStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      // label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {applicationStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>The most recent job applications submitted</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">
                        {application.applicant?.fullName || 'N/A'}
                      </TableCell>
                      <TableCell>{application.job?.title || 'N/A'}</TableCell>
                      <TableCell>
                        {new Date(application.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            application.status === ApplicationStatus.APPLIED
                              ? 'default'
                              : application.status === ApplicationStatus.REJECTED
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={application.status}
                          onValueChange={(value: ApplicationStatus) => handleStatusChange(application.id, value)}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Change status" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(ApplicationStatus).map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Job Management</CardTitle>
              <CardDescription>Manage all job postings</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Posted Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.aboutCompany || 'N/A'}</TableCell>
                      <TableCell>{job.type}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job._count?.applications || 0}</TableCell>
                      <TableCell>
                        {new Date(job.posted).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="mr-2">
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteJob(job.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between mt-4">
                <Button 
                  variant="outline" 
                  disabled={currentPage.jobs === 1}
                  onClick={() => handlePageChange('jobs', currentPage.jobs - 1)}
                >
                  Previous
                </Button>
                <span>Page {currentPage.jobs}</span>
                <Button 
                  variant="outline"
                  onClick={() => handlePageChange('jobs', currentPage.jobs + 1)}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>All Applications</CardTitle>
              <CardDescription>Manage job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Applied On</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">
                        {application.applicant?.fullName || 'N/A'}
                      </TableCell>
                      <TableCell>{application.applicant?.email || 'N/A'}</TableCell>
                      <TableCell>{application.job?.title || 'N/A'}</TableCell>
                      <TableCell>{application.job?.aboutCompany || 'N/A'}</TableCell>
                      <TableCell>
                        {new Date(application.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            application.status === ApplicationStatus.APPLIED
                              ? 'default'
                              : application.status === ApplicationStatus.REJECTED
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={application.status}
                          onValueChange={(value) => handleStatusChange(application.id, value as ApplicationStatus)}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue placeholder="Change status" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(ApplicationStatus).map((status) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between mt-4">
                <Button 
                  variant="outline" 
                  disabled={currentPage.applications === 1}
                  onClick={() => handlePageChange('applications', currentPage.applications - 1)}
                >
                  Previous
                </Button>
                <span>Page {currentPage.applications}</span>
                <Button 
                  variant="outline"
                  onClick={() => handlePageChange('applications', currentPage.applications + 1)}
                >
                  Next
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Applications by Job</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={jobApplicationsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="applications" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Application Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={applicationStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {applicationStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;