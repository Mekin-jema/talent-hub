import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JobFormValues } from "@/validation/job.validation";
import { Plus, X } from "lucide-react";
import { FieldErrors } from "react-hook-form";

interface JobRequirementsProps {
  requirements: string[];
  errors: FieldErrors<JobFormValues>;
  addRequirement: () => void;
  removeRequirement: (index: number) => void;
  updateRequirement: (index: number, value: string) => void;
}

export default function JobRequirements({
  requirements,
  errors,
  addRequirement,
  removeRequirement,
  updateRequirement,
}: JobRequirementsProps) {
  return (
    <div className="space-y-4">
      <Label>Requirements *</Label>
      {requirements.map((_, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={requirements[index]}
            onChange={(e) => updateRequirement(index, e.target.value)}
            placeholder={`Requirement ${index + 1}`}
          />
          {requirements.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeRequirement(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addRequirement}>
        <Plus className="h-4 w-4 mr-2" />
        Add Requirement
      </Button>
      {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements.message}</p>}
    </div>
  );
}