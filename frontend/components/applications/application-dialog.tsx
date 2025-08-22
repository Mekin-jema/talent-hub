"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import StepOneDetails from "./stepOne-details";
import StepTwoResume from "./step-two-resume";
import StepThreeSuccess from "./step-three-success";

export default function ApplicationDialog({
  open,
  setOpen,
  applicationStep,
  setApplicationStep,
  job,
  formData,
  handleInputChange,
  handleSelectChange,
  resume,
  handleFileChange,
  handleFormSubmit,
  handleCloseForm,
}: any) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Apply for {job.title}</span>
            <Button variant="ghost" size="icon" onClick={handleCloseForm}>
            </Button>
          </DialogTitle>
          <DialogDescription>Apply to {job.company} by filling out the form below.</DialogDescription>
        </DialogHeader>

        {applicationStep === 1 && (
          <StepOneDetails
            formData={formData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            setApplicationStep={setApplicationStep}
          />
        )}

        {applicationStep === 2 && (
          <StepTwoResume
            resume={resume}
            handleFileChange={handleFileChange}
            setApplicationStep={setApplicationStep}
            handleFormSubmit={handleFormSubmit}
          />
        )}

        {applicationStep === 3 && (
          <StepThreeSuccess job={job} handleCloseForm={handleCloseForm} />
        )}
      </DialogContent>
    </Dialog>
  );
}
