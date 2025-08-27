"use client"
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Mail, Download, ChevronDown, ChevronUp, FileText, Calendar, MapPin, Building2, Clock4, UserCheck, XCircle, CheckCircle, Circle } from 'lucide-react';
import { useApplicationStore } from '@/store/useApplicationStore';
import { Application, Job } from '@/types';
import { toast } from 'sonner';

// Status badge component to show application status with appropriate styling
const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
    APPLIED: { 
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', 
      icon: <Clock4 size={14} /> 
    },
    SHORTLISTED: { 
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300', 
      icon: <UserCheck size={14} /> 
    },
    INTERVIEW: { 
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300', 
      icon: <Calendar size={14} /> 
    },
    REJECTED: { 
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', 
      icon: <XCircle size={14} /> 
    },
    HIRED: { 
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', 
      icon: <CheckCircle size={14} /> 
    },
  }

  const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300', icon: <Circle  size={14} /> }

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.icon}
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  )
}

interface ApplicationManagerProps {
  applications: Application[];
  jobs:Job[];
  selectedJobId: string | null;
  onJobSelect: (jobId: string | null) => void;
}

const ApplicationManager = ({ applications, jobs, selectedJobId, onJobSelect }: ApplicationManagerProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedApplications, setExpandedApplications] = useState<Set<string>>(new Set());
  const { updateApplicationStatus, loading } = useApplicationStore();

  // Filter applications based on selected job
  const filteredApplications = selectedJobId
    ? applications.filter(app => app.job.id === selectedJobId)
    : applications;

  // Filter applications based on search term
  const searchedApplications = filteredApplications.filter(app =>
    app.applicant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleApplicationExpansion = (applicationId: string) => {
    const newExpanded = new Set(expandedApplications);
    if (newExpanded.has(applicationId)) {
      newExpanded.delete(applicationId);
    } else {
      newExpanded.add(applicationId);
    }
    setExpandedApplications(newExpanded);
  };

  const handleStatusUpdate = async (applicationId: string, newStatus: string) => {
    try {
      await updateApplicationStatus(applicationId, newStatus);
      toast.success(`Application status updated to ${newStatus.toLowerCase()}`);
    } catch (error) {
      console.error('Error updating application status:', error);
      toast.error('Failed to update application status');
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-card-foreground">Job Applications</CardTitle>
        <CardDescription className="text-muted-foreground">
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
              className="pl-8 bg-background border-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="border-border">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="space-y-4">
          {searchedApplications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm || selectedJobId ? 'No applications match your search criteria' : 'No applications yet'}
            </div>
          ) : (
            searchedApplications.map((application) => (
              <div key={application.id} className="p-4 border border-border rounded-lg bg-card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-semibold text-card-foreground">{application.applicant.fullName}</h3>
                      <StatusBadge status={application.status} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{application.applicant.email}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-3">
                      <div className="flex items-center">
                        <Building2 size={14} className="mr-1" />
                        <span>{application.job.companyName || 'Private Company'}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        <span>{application.job.location || 'Remote'}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        <span>Applied on {new Date(application.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    {(application.salaryExpectation || application.noticePeriod) && (
                      <div className="flex flex-wrap gap-3 text-sm mt-3">
                        {application.salaryExpectation && (
                          <div className="bg-muted/30 px-2.5 py-1 rounded-md">
                            <span className="font-medium text-card-foreground">Salary: </span>
                            <span className="text-muted-foreground">{application.salaryExpectation}</span>
                          </div>
                        )}
                        
                        {application.noticePeriod && (
                          <div className="bg-muted/30 px-2.5 py-1 rounded-md">
                            <span className="font-medium text-card-foreground">Notice: </span>
                            <span className="text-muted-foreground">{application.noticePeriod}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                {application.coverLetter && (
                  <div className="mt-4">
                    <button 
                      onClick={() => toggleApplicationExpansion(application.id)}
                      className="flex items-center text-sm text-primary font-medium"
                    >
                      {expandedApplications.has(application.id) ? (
                        <>
                          <ChevronUp size={16} className="mr-1" />
                          Hide Cover Letter
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} className="mr-1" />
                          View Cover Letter
                        </>
                      )}
                    </button>
                    
                    {expandedApplications.has(application.id) && (
                      <div className="mt-3 p-4 bg-muted/20 rounded-lg border border-border">
                        <div className="flex items-center mb-2">
                          <FileText size={16} className="mr-2 text-muted-foreground" />
                          <span className="text-sm font-medium text-card-foreground">Cover Letter</span>
                        </div>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{application.coverLetter}</p>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="border-border">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                  {application.resumeUrl && (
                    <Button variant="outline" size="sm" className="border-border">
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </Button>
                  )}
                  <div className="flex flex-wrap gap-2 ml-auto">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-border"
                      onClick={() => handleStatusUpdate(application.id, 'SHORTLISTED')}
                      disabled={loading}
                    >
                      Shortlist
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-border text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleStatusUpdate(application.id, 'REJECTED')}
                      disabled={loading}
                    >
                      Reject
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleStatusUpdate(application.id, 'INTERVIEW')}
                      disabled={loading}
                    >
                      Schedule Interview
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};




export default ApplicationManager;