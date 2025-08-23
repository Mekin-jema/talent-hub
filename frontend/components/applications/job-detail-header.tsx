// components/jobs/JobDetailHeader.tsx
import { Building2, MapPin, DollarSign, Clock, CheckCircle, Bookmark, BookmarkCheck, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface JobDetailHeaderProps {
  job: any;
  saved: boolean;
  onSave: () => void;
  onShare: () => void;
  onBack: () => void;
}

export function JobDetailHeader({ job, saved, onSave, onShare, onBack }: JobDetailHeaderProps) {
  return (
    <div className="bg-card rounded-lg p-6 mb-6 shadow-sm border">
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
        <div className="flex items-start space-x-4">
          <img
            src={job.logo}
            alt={job.company}
            className="w-16 h-16 rounded-lg object-cover border"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{job.title}</h1>
            <div className="flex items-center text-muted-foreground mb-2">
              <Building2 className="w-4 h-4 mr-2" />
              {job.company}
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {job.location}
              </Badge>
              <Badge variant="outline">{job.type}</Badge>
              {job.featured && (
                <Badge variant="default">Featured</Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button variant="outline" size="icon" onClick={onSave}>
            {saved ? (
              <BookmarkCheck className="h-4 w-4 text-primary fill-primary" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
          </Button>
          <Button variant="outline" size="icon" onClick={onShare}>
            <Share className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
        <div className="flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Salary</p>
            <p className="font-medium">{job.salary}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Posted</p>
            <p className="font-medium">{job.posted}</p>
          </div>
        </div>
        <div className="flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Category</p>
            <p className="font-medium">{job.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
}