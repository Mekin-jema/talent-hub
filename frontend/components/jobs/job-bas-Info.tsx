import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
const categories = ["Engineering", "Design", "Marketing", "Sales", "Support", "Writing", "HR", "Other"];

interface JobBasicInfoProps {
  register: any;
  errors: any;
  setValue: any;
}

export default function JobBasicInfo({ register, errors, setValue }: JobBasicInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="title">Job Title *</Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="e.g. Senior Frontend Developer"
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Job Type *</Label>
        <Select onValueChange={(value) => setValue("type", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select job type" />
          </SelectTrigger>
          <SelectContent>
            {jobTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <Input
          id="location"
          {...register("location")}
          placeholder="e.g. Remote, Addis Ababa, Hybrid"
        />
        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="salary">Salary Range *</Label>
        <Input
          id="salary"
          {...register("salary")}
          placeholder="e.g. $4000 - $6000"
        />
        {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <Select onValueChange={(value) => setValue("category", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="logo">Company Logo URL</Label>
        <Input
          id="logo"
          {...register("logo")}
          placeholder="https://example.com/logo.png"
        />
        {errors.logo && <p className="text-red-500 text-sm">{errors.logo.message}</p>}
      </div>
    </div>
  );
}