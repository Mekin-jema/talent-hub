// components/jobs/JobDetailContent.tsx
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types";

interface JobDetailContentProps {
  job: Job;
}

export function JobDetailContent({ job }: JobDetailContentProps) {
  console.log("Job in Content", job);
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Job Description */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Job Description</h2>
        <p className="text-muted-foreground">{job.description}</p>
      </div>

      {/* Responsibilities */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
        <ul className="space-y-2">
          {job.responsibilities.map((responsibility: string, index: number) => (
            <li key={index} className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 mr-3 flex-shrink-0"></div>
              <span className="text-muted-foreground">{responsibility}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Requirements */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Requirements</h2>
        <ul className="space-y-2">
          {job.requirements.map((requirement: string, index: number) => (
            <li key={index} className="flex items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 mr-3 flex-shrink-0"></div>
              <span className="text-muted-foreground">{requirement}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Skills */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Skills Required</h2>
        <div className="flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <Badge key={String(skill.id)} variant="secondary" className="text-sm">
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}