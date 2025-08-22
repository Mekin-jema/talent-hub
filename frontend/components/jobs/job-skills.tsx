import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

const sampleSkills = ["React", "Node.js", "TypeScript", "Python", "JavaScript", "CSS", "HTML", "GraphQL", "AWS"];

interface JobSkillsProps {
  skills: string[];
  skillInput: string;
  setSkillInput: (value: string) => void;
  errors: any;
  addSkill: (skill: string) => void;
  removeSkill: (skillToRemove: string) => void;
}

export default function JobSkills({
  skills,
  skillInput,
  setSkillInput,
  errors,
  addSkill,
  removeSkill,
}: JobSkillsProps) {
  return (
    <div className="space-y-4">
      <Label>Required Skills *</Label>
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
          >
            {skill}
            <button
              type="button"
              onClick={() => removeSkill(skill)}
              className="text-primary/70 hover:text-primary"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Input
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Add a skill"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addSkill(skillInput);
            }
          }}
        />
        <Button type="button" onClick={() => addSkill(skillInput)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {sampleSkills.map((skill) => (
          <Button
            key={skill}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => addSkill(skill)}
            disabled={skills.includes(skill)}
          >
            {skill}
          </Button>
        ))}
      </div>
      {errors.skills && <p className="text-red-500 text-sm">{errors.skills.message}</p>}
    </div>
  );
}