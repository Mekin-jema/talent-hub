// components/jobs/JobDetailContent.tsx
import { Badge } from "@/components/ui/badge";
import { Job } from "@/types";

interface JobDetailContentProps {
  job?: Job | null;
}

export function JobDetailContent({ job }: JobDetailContentProps) {
  console.log("Job in Content", job);

  if (!job) {
    return (
      <div className="lg:col-span-2 p-6 bg-card rounded-lg shadow-sm border text-center text-muted-foreground">
        Job details are not available.
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Job Description */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Job Description</h2>
        <p className="text-muted-foreground">{job.description || "No description provided."}</p>
      </div>

      {/* Responsibilities */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
        {job.responsibilities?.length > 0 ? (
          <ul className="space-y-2">
            {job.responsibilities.map((responsibility, index) => (
              <li key={index} className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 mr-3 flex-shrink-0"></div>
                <span className="text-muted-foreground">{responsibility}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No responsibilities listed.</p>
        )}
      </div>

      {/* Requirements */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Requirements</h2>
        {job.requirements?.length > 0 ? (
          <ul className="space-y-2">
            {job.requirements.map((requirement, index) => (
              <li key={index} className="flex items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 mr-3 flex-shrink-0"></div>
                <span className="text-muted-foreground">{requirement}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No requirements listed.</p>
        )}
      </div>

      {/* Skills */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <h2 className="text-xl font-semibold mb-4">Skills Required</h2>
        <div className="flex flex-wrap gap-2">
          {job.skills?.length > 0 ? (
            job.skills.map((skill) => (
              <Badge key={String(skill.id)} variant="secondary" className="text-sm">
                {skill.name}
              </Badge>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No skills listed</p>
          )}
        </div>
      </div>
    </div>
  );
}
