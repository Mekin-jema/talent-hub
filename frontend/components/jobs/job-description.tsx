import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { JobFormValues } from "@/validation/job.validation";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface JobDescriptionProps {
  register: UseFormRegister<JobFormValues>;
  errors: FieldErrors<JobFormValues>;
}


export default function JobDescription({ register, errors }: JobDescriptionProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="description">Job Description *</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Describe the role, team, and company culture..."
          rows={4}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="aboutCompany">About Company *</Label>
        <Textarea
          id="aboutCompany"
          {...register("aboutCompany")}
          placeholder="Tell candidates about your company..."
          rows={3}
        />
        {errors.aboutCompany && <p className="text-red-500 text-sm">{errors.aboutCompany.message}</p>}
      </div>
    </>
  );
}