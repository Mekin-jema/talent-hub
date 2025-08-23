// components/jobs/JobDetailSidebar.tsx
import { Button } from "@/components/ui/button";

interface JobDetailSidebarProps {
  job: any;
  saved: boolean;
  applied: boolean;
  onSave: () => void;
  onApply: () => void;
}

export function JobDetailSidebar({ job, saved, applied, onSave, onApply }: JobDetailSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Apply Box */}
      <div className="bg-card rounded-lg p-6 shadow-sm border sticky top-6">
        <div className="text-center mb-6">
          <h3 className="font-semibold text-lg mb-2">Interested in this job?</h3>
          <p className="text-muted-foreground text-sm">
            {applied ? "You've already applied to this position" : "Submit your application now"}
          </p>
        </div>
        <Button
          className="w-full mb-4"
          size="lg"
          onClick={onApply}
          disabled={applied}
        >
          {applied ? "Applied" : "Apply Now"}
        </Button>
        <Button variant="outline" className="w-full" size="lg" onClick={onSave}>
          {saved ? "Saved" : "Save for Later"}
        </Button>
      </div>

      {/* About Company */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <h3 className="font-semibold text-lg mb-4">About the Company</h3>
        <div className="flex items-center mb-4">
          <img
            src={job.logo}
            alt={job.company}
            className="w-10 h-10 rounded-lg object-cover border mr-3"
          />
          <h4 className="font-medium">{job.company}</h4>
        </div>
        <p className="text-muted-foreground text-sm">{job.aboutCompany}</p>
      </div>

      {/* Job Overview */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <h3 className="font-semibold text-lg mb-4">Job Overview</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Job Type:</span>
            <span className="font-medium">{job.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span className="font-medium">{job.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Salary:</span>
            <span className="font-medium">{job.salary}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Posted:</span>
            <span className="font-medium">{job.posted}</span>
          </div>
        </div>
      </div>
    </div>
  );
}