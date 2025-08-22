import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface JobResponsibilitiesProps {
  responsibilities: string[];
  errors: any;
  addResponsibility: () => void;
  removeResponsibility: (index: number) => void;
  updateResponsibility: (index: number, value: string) => void;
}

export default function JobResponsibilities({
  responsibilities,
  errors,
  addResponsibility,
  removeResponsibility,
  updateResponsibility,
}: JobResponsibilitiesProps) {
  return (
    <div className="space-y-4">
      <Label>Responsibilities *</Label>
      {responsibilities.map((_, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={responsibilities[index]}
            onChange={(e) => updateResponsibility(index, e.target.value)}
            placeholder={`Responsibility ${index + 1}`}
          />
          {responsibilities.length > 1 && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeResponsibility(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addResponsibility}>
        <Plus className="h-4 w-4 mr-2" />
        Add Responsibility
      </Button>
      {errors.responsibilities && <p className="text-red-500 text-sm">{errors.responsibilities.message}</p>}
    </div>
  );
}