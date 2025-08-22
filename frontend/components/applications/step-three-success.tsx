"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface StepThreeProps {
  job: any;
  handleCloseForm: () => void;
}

export default function StepThreeSuccess({ job, handleCloseForm }: StepThreeProps) {
  return (
    <div className="text-center py-8">
      <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
      <h3 className="text-xl font-semibold mb-2">Application Submitted!</h3>
      <p className="text-muted-foreground mb-6">
        Your application for {job.title} at {job.company} has been successfully submitted.
      </p>
      <Button onClick={handleCloseForm}>Close</Button>
    </div>
  );
}
