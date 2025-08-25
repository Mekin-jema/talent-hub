import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Job, Skill } from '@/types';

interface JobsManagerProps {
  jobs: Job[];
  selectedJobId: string | null;
  onSelectJob: (jobId: string) => void;
}

const JobsManager = ({ jobs, selectedJobId, onSelectJob }: JobsManagerProps) => {
  const selectedJob = jobs.find((job) => job.id === selectedJobId);

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
            <div
              key={job.id}
              className={`flex items-center justify-between p-4 border rounded-lg ${
                selectedJobId === job.id ? "border-blue-500 bg-blue-50" : ""
              }`}
            >
              <div>
                <h3 className="font-semibold">{job.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {job.type} • {job.location} • Posted on{" "}
                  {new Date(job.posted).toLocaleDateString()}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-medium">{job.applications.length}</span>{" "}
                  applications
                </p>
              </div>
              <div className="flex items-center gap-2">
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

        {selectedJob && (
          <div className="mt-6 p-4 border rounded-lg bg-muted">
            <h2 className="text-xl font-bold mb-2">{selectedJob.title}</h2>
            <p className="text-sm text-muted-foreground mb-2">
              {selectedJob.type} • {selectedJob.location} • Posted on{" "}
              {new Date(selectedJob.posted).toLocaleDateString()}
            </p>
            <p className="mb-4">{selectedJob.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {selectedJob.skills?.map((skill: Skill) => (
                <Badge key={skill.id.toString()} variant="secondary">{skill.name}</Badge>
              ))}
            </div>

            <p className="text-sm">
              <span className="font-medium">{selectedJob.applications.length}</span> applications received
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobsManager;
