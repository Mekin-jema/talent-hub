// components/jobs/ApplicationDialog.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle, Upload } from "lucide-react";
import { applicationFormSchema, ApplicationFormValues } from "@/validation/application.validation";
import { useApplicationStore } from "@/store/useApplicationStore";
import { Job } from "@/types";


interface ApplicationDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  applicationStep: number;
  setApplicationStep: (step: number) => void;
  job: Job;
  resume: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCloseForm: () => void;
  onApplicationSubmit: () => void;
}

export function ApplicationDialog({
  open,
  setOpen,
  applicationStep,
  setApplicationStep,
  job,
  resume,
  handleFileChange,
  handleCloseForm,
  onApplicationSubmit
}: ApplicationDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {applyForJob}=useApplicationStore()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedIn: "",
      portfolio: "",
      coverLetter: "",
      salaryExpectation: "",
      noticePeriod: "immediately",
      source: ""
    }
  });

  const onSubmit = async (data: ApplicationFormValues) => {
          // const resumeUrl = await uploadFileToCloudinary(resume);
      
      // Update form data with resume URL
      // const applicationData = {
      //   ...data,
      //   resumeUrl,
      
      // };
    applyForJob(data,job.id)

    setIsSubmitting(true);
    setApplicationStep(2);
    
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setApplicationStep(3);
    onApplicationSubmit();
  };

  const handleClose = () => {
    handleCloseForm();
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {applicationStep === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Apply for {job.title}</DialogTitle>
              <DialogDescription>
                Complete the following form to apply for this position at {job.aboutCompany}.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    {...register("fullName")}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500">{errors.fullName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    {...register("location")}
                  />
                  {errors.location && (
                    <p className="text-sm text-red-500">{errors.location.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedIn">LinkedIn Profile</Label>
                  <Input
                    id="linkedIn"
                    {...register("linkedIn")}
                  />
                  {errors.linkedIn && (
                    <p className="text-sm text-red-500">{errors.linkedIn.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portfolio">Portfolio Website</Label>
                  <Input
                    id="portfolio"
                    {...register("portfolio")}
                  />
                  {errors.portfolio && (
                    <p className="text-sm text-red-500">{errors.portfolio.message}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="resume">Resume/CV *</Label>
                <div className="flex items-center gap-2">
                  <Label
                    htmlFor="resume-upload"
                    className="flex flex-1 items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
                  >
                    <Upload className="h-4 w-4" />
                    {resume ? resume.name : "Upload file"}
                  </Label>
                  <Input
                    id="resume-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Accepted formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter *</Label>
                <Textarea
                  id="coverLetter"
                  placeholder="Why are you interested in this position?"
                  rows={4}
                  {...register("coverLetter")}
                />
                {errors.coverLetter && (
                  <p className="text-sm text-red-500">{errors.coverLetter.message}</p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salaryExpectation">Salary Expectation *</Label>
                  <Input
                    id="salaryExpectation"
                    placeholder="e.g. $50,000 - $60,000"
                    {...register("salaryExpectation")}
                  />
                  {errors.salaryExpectation && (
                    <p className="text-sm text-red-500">{errors.salaryExpectation.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="noticePeriod">Notice Period *</Label>
                  <Select onValueChange={(value) => setValue("noticePeriod", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select notice period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediately">Immediately</SelectItem>
                      <SelectItem value="1 week">1 week</SelectItem>
                      <SelectItem value="2 weeks">2 weeks</SelectItem>
                      <SelectItem value="1 month">1 month</SelectItem>
                      <SelectItem value="2 months">2 months</SelectItem>
                      <SelectItem value="3 months">3 months</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.noticePeriod && (
                    <p className="text-sm text-red-500">{errors.noticePeriod.message}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="source">How did you hear about us? *</Label>
                <Select onValueChange={(value) => setValue("source", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent align="end">
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="job-board">Job Board</SelectItem>
                    <SelectItem value="company-website">Company Website</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.source && (
                  <p className="text-sm text-red-500">{errors.source.message}</p>
                )}
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={!resume || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
        
        {applicationStep === 2 && (
          <div className="flex flex-col items-center text-center py-8">
            <div className="rounded-full bg-primary/10 p-3 mb-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
            <DialogTitle className="mb-2">Submitting Application</DialogTitle>
            <DialogDescription>
              Please wait while we process your application for {job.title}.
            </DialogDescription>
          </div>
        )}
        
        {applicationStep === 3 && (
          <div className="flex flex-col items-center text-center py-8">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <DialogTitle className="mb-2">Application Submitted!</DialogTitle>
            <DialogDescription className="mb-4">
              Thank you for applying to the {job.title} position at {job.aboutCompany}. 
              We&apos;ll review your application and get back to you soon.
            </DialogDescription>
            <Button onClick={handleClose}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}