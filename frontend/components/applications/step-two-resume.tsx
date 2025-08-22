"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText } from "lucide-react";

interface StepTwoProps {
  resume: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setApplicationStep: (step: number) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
}

export default function StepTwoResume({ resume, handleFileChange, setApplicationStep, handleFormSubmit }: StepTwoProps) {
  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div className="border-2 border-dashed rounded-lg p-6 text-center">
        <Input type="file" id="resume" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        <Label htmlFor="resume" className="cursor-pointer">
          {resume ? (
            <div className="flex flex-col items-center">
              <FileText className="h-12 w-12 text-primary mb-2" />
              <p className="font-medium">{resume.name}</p>
              <p className="text-sm text-muted-foreground">{(resume.size / 1024).toFixed(2)} KB</p>
              <Button variant="outline" className="mt-4">Change File</Button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="font-medium">Upload your resume</p>
              <p className="text-sm text-muted-foreground">PDF, DOC or DOCX (Max 5MB)</p>
              <Button variant="outline" className="mt-4">Select File</Button>
            </div>
          )}
        </Label>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" type="button" onClick={() => setApplicationStep(1)}>Back</Button>
        <Button type="submit" disabled={!resume}>Submit Application</Button>
      </div>
    </form>
  );
}
