// components/employer/ApplicationManager.tsx
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Mail, Download } from 'lucide-react';
import { Job } from '@/types';
import { Application } from '@/store/useApplicationStore';

interface ApplicationManagerProps {
  applications: Application[];
  jobs: Job[];
  selectedJobId: string | null;
  onJobSelect: (jobId: string | null) => void;
}

const ApplicationManager = ({ applications, jobs, selectedJobId, onJobSelect }: ApplicationManagerProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter applications based on selected job
  const filteredApplications = selectedJobId
    ? applications.filter(app => app.job.id=== selectedJobId)
    : applications;

  // Filter applications based on search term
  const searchedApplications = filteredApplications.filter(app =>
    app.applicant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Applications</CardTitle>
        <CardDescription>
          Review and manage all applications
        </CardDescription>
        
        {/* Job filter */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            variant={selectedJobId === null ? "default" : "outline"}
            size="sm"
            onClick={() => onJobSelect(null)}
          >
            All Jobs
          </Button>
          {jobs.map(job => (
            <Button
              key={job.id}
              variant={selectedJobId === job.id ? "default" : "outline"}
              size="sm"
              onClick={() => onJobSelect(job.id)}
            >
              {job.title}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search applications..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="space-y-4">
          {searchedApplications.map((application) => (
            <div key={application.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{application.applicant.fullName}</h3>
                  <p className="text-sm text-muted-foreground">{application.applicant.email}</p>
                  <p className="text-sm mt-1">Applied for: {application.job.title}</p>
                  <p className="text-sm">Applied on: {new Date(application.createdAt).toLocaleDateString()}</p>
                </div>
                <Badge variant={
                  application.status === 'shortlisted' ? 'default' :
                  application.status === 'interview' ? 'secondary' :
                  application.status === 'rejected' ? 'destructive' : 'outline'
                }>
                  {application.status}
                </Badge>
              </div>
              
              <div className="mt-4 flex gap-2 flex-wrap">
                <Button variant="outline" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
                <div className="flex gap-1 ml-auto flex-wrap">
                  <Button variant="outline" size="sm">Shortlist</Button>
                  <Button variant="outline" size="sm">Reject</Button>
                  <Button size="sm">Schedule Interview</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationManager;