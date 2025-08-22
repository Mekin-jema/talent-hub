"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft } from "lucide-react";

export default function NewOrganizationPage() {
  const [companyName, setCompanyName] = useState("");
  const [tradeLicense, setTradeLicense] = useState<File | null>(null);
  const [representative, setRepresentative] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ companyName, tradeLicense, representative });
    // API call to save organization here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <Card className="w-full max-w-4xl shadow-lg border-none">
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Left side illustration */}
          <div className="flex items-center justify-center">
            <img
              src="/illustrations/working-woman.svg"
              alt="Illustration"
              className="max-w-sm"
            />
          </div>

          {/* Right side form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <h1 className="text-xl font-semibold">
              Verification Request Form
            </h1>

            {/* Company Name */}
            <div className="space-y-2">
              <Label htmlFor="companyName">
                Company Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="companyName"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>

            {/* Trade License */}
            <div className="space-y-2">
              <Label htmlFor="tradeLicense">
                Trade License <span className="text-red-500">*</span>
              </Label>
              <Input
                id="tradeLicense"
                type="file"
                onChange={(e) =>
                  setTradeLicense(e.target.files ? e.target.files[0] : null)
                }
                required
              />
            </div>

            {/* Representative */}
            <div className="space-y-2">
              <Label>
                Representative <span className="text-red-500">*</span>
              </Label>
              <RadioGroup
                onValueChange={setRepresentative}
                className="flex items-center justify-between"
                required
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="General Manager" id="gm" />
                  <Label htmlFor="gm">General Manager</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Representative" id="rep" />
                  <Label htmlFor="rep">Representative</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between pt-4">
              <Button
                type="button"
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4" /> Go Back
              </Button>
              <Button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6"
              >
                Continue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
