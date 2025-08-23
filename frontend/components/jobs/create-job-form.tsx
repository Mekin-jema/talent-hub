"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { jobFormSchema, JobFormValues } from "@/validation/job.validation";
import JobBasicInfo from "./job-bas-Info";
import JobDescription from "./job-description";
import JobRequirements from "./job-requirements";
import JobResponsibilities from "./job-responsibilities";
import JobSkills from "./job-skills";
import JobFeatured from "./job-featured";
import { useJobStore } from "@/store/useJobStore";

export default function CreateJobForm() {
  const [skillInput, setSkillInput] = useState("");
  const { createJob } = useJobStore();

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      type: "",
      description: "",
      requirements: [""],
      responsibilities: [""],
      location: "",
      aboutCompany: "",
      salary: "",
      category: "",
      featured: false,
      skills: [],
      logo: "",
    },
  });

  const requirements = watch("requirements") ?? [];
  const responsibilities = watch("responsibilities") ?? [];
  const skills = watch("skills") ?? [];
  const featured = watch("featured") ?? false;

  const addRequirement = () => {
    setValue("requirements", [...requirements, ""]);
  };

  const removeRequirement = (index: number) => {
    setValue(
      "requirements",
      requirements.filter((_, i) => i !== index)
    );
  };

  const updateRequirement = (index: number, value: string) => {
    const updated = [...requirements];
    updated[index] = value;
    setValue("requirements", updated);
  };

  const addResponsibility = () => {
    setValue("responsibilities", [...responsibilities, ""]);
  };

  const removeResponsibility = (index: number) => {
    setValue(
      "responsibilities",
      responsibilities.filter((_, i) => i !== index)
    );
  };

  const updateResponsibility = (index: number, value: string) => {
    const updated = [...responsibilities];
    updated[index] = value;
    setValue("responsibilities", updated);
  };

  const addSkill = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setValue("skills", [...skills, skill]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setValue(
      "skills",
      skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const onSubmit = async (data: JobFormValues) => {

    // Call the createJob function from the job store
    createJob(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto p-6">
      <div>
        <h1 className="text-3xl font-bold mb-6">Create New Job Posting</h1>
      </div>

      <JobBasicInfo
        register={register}
        errors={errors}
        setValue={setValue}
      />

      <JobDescription
        register={register}
        errors={errors}
      />

      <JobRequirements
        requirements={requirements}
        errors={errors}
        addRequirement={addRequirement}
        removeRequirement={removeRequirement}
        updateRequirement={updateRequirement}
      />

      <JobResponsibilities
        responsibilities={responsibilities}
        errors={errors}
        addResponsibility={addResponsibility}
        removeResponsibility={removeResponsibility}
        updateResponsibility={updateResponsibility}
      />

      <JobSkills
        skills={skills}
        skillInput={skillInput}
        setSkillInput={setSkillInput}
        errors={errors}
        addSkill={addSkill}
        removeSkill={removeSkill}
      />

      <JobFeatured
        featured={featured}
        setValue={setValue}
      />

      <Button type="submit" className="w-full">
        Create Job Posting
      </Button>
    </form>
  );
}