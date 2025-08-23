import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { JobFormValues } from "@/validation/job.validation";
import { UseFormSetValue } from "react-hook-form";

interface JobFeaturedProps {
  featured: boolean;
  setValue: UseFormSetValue<JobFormValues>;
  
}

export default function JobFeatured({ featured, setValue }: JobFeaturedProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="featured"
        checked={featured}
        onCheckedChange={(checked) => setValue("featured", checked === true)}
      />
      <Label htmlFor="featured" className="cursor-pointer">
        Feature this job (highlighted listing)
      </Label>
    </div>
  );
}