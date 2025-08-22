"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React from "react";

interface StepOneProps {
  formData: any;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  setApplicationStep: (step: number) => void;
}

export default function StepOneDetails({ formData, handleInputChange, handleSelectChange, setApplicationStep }: StepOneProps) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); setApplicationStep(2); }} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" value={formData.location} onChange={handleInputChange} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedIn">LinkedIn</Label>
          <Input id="linkedIn" name="linkedIn" value={formData.linkedIn} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio</Label>
          <Input id="portfolio" name="portfolio" value={formData.portfolio} onChange={handleInputChange} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverLetter">Cover Letter</Label>
        <Textarea id="coverLetter" name="coverLetter" value={formData.coverLetter} onChange={handleInputChange} rows={4} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="salaryExpectation">Salary Expectation</Label>
          <Input id="salaryExpectation" name="salaryExpectation" value={formData.salaryExpectation} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="noticePeriod">Notice Period</Label>
          <Select value={formData.noticePeriod} onValueChange={(val) => handleSelectChange("noticePeriod", val)}>
            <SelectTrigger><SelectValue placeholder="Select notice period" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="immediately">Immediately</SelectItem>
              <SelectItem value="1week">1 week</SelectItem>
              <SelectItem value="2weeks">2 weeks</SelectItem>
              <SelectItem value="1month">1 month</SelectItem>
              <SelectItem value="2months">2 months</SelectItem>
              <SelectItem value="3months">3 months</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="source">How did you hear about this position?</Label>
        <Select value={formData.source} onValueChange={(val) => handleSelectChange("source", val)}>
          <SelectTrigger><SelectValue placeholder="Select source" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="linkedin">LinkedIn</SelectItem>
            <SelectItem value="jobboard">Job Board</SelectItem>
            <SelectItem value="companywebsite">Company Website</SelectItem>
            <SelectItem value="referral">Referral</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end pt-4">
        <Button type="submit">Next: Upload Resume</Button>
      </div>
    </form>
  );
}
