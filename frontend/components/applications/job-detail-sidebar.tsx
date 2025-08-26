import { Button } from "@/components/ui/button";
import { useApplicationStore } from "@/store/useApplicationStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Job } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface JobDetailSidebarProps {
  job: Job;
  saved: boolean;
  applied: boolean;
  onSave: () => void;
  onApply: () => void;
}

export function JobDetailSidebar({ job, saved, applied, onSave, onApply }: JobDetailSidebarProps) {
  const { checkIfApplied } = useApplicationStore();
  const { user } = useAuthStore();

  const getButtonLabel = () => {
    if (!user?.user) return "Login to Apply"; // user not logged in
    return checkIfApplied(job.id) ? "Applied" : "Apply Now"; // user logged in
  };
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
          disabled={checkIfApplied(job.id)}
        >
          {getButtonLabel()}
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
            alt={job.companyName}
            className="w-12 h-12 rounded-xl object-cover border shadow-sm"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-company.png";
            }}
          />
          <h4 className="font-medium">{job.aboutCompany}</h4>
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
            <span className="font-medium">
              {job.posted
                ? formatDistanceToNow(new Date(job.posted), { addSuffix: true })
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
