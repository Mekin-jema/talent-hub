// components/employer/JobsManager.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface JobsManagerProps {
  jobs: any[];
  selectedJobId: string | null;
  onSelectJob: (jobId: string) => void;
}

const JobsManager = ({ jobs, selectedJobId, onSelectJob }: JobsManagerProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Job Postings</CardTitle>
        <CardDescription>
          Manage all your job listings in one place
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {job.type} • {job.location} • Posted on {new Date(job.posted).toLocaleDateString()}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-medium">{job.applications}</span> applications
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={
                  job.status === 'active' ? 'default' :
                  job.status === 'closed' ? 'secondary' : 'outline'
                }>
                  {job.status}
                </Badge>
                <Button variant="outline" size="sm">Edit</Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onSelectJob(job.id)}
                >
                  View Applications
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobsManager;