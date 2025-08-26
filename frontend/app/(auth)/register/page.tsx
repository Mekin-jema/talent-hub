"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/FormFields";

import { SignupFormType, signupSchema } from "@/validation/signup.validation";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { GithubIcon } from "@/components/icons/GithubIcon";
import Image from "next/image";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubPending, startGithubTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();
  const router = useRouter();

  const form = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });
  // auth sore
  const {signup}=useAuthStore()

  // ---- Social Logins ----
  const signUpWithGithub = async () => {
    startGithubTransition(async () => {
      //  Social Auth  implementation 
    });
  };

  const signUpWithGoogle = async () => {
    startGoogleTransition(async () => {
      //  Social Auth  implementation
    });
  };

  // ---- Email Signup ----
  const onSubmit = async (data: SignupFormType) => {
    try {
      //  Email Signup implementation
      console.log("Signing up...",data);
     const result = await signup(data);
     if(result?.message){

      form.reset();
          // toast.success("Account created successfully!");
        router.push("/login");
     }
    } catch (error) {
      console.error(error)
      toast.error("Unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex h-screen bg-zinc-50 px-4 py-2 dark:bg-transparent">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
        >
          <div className="px-8 py-2">
            <div className="flex flex-col items-center ">
              <Link href="/" aria-label="go home">
                <Image src="/logo.png" alt="Logo" width={100} height={100} />
              </Link>
              <h1 className="text-lg font-semibold mt-2 text-center">
                Sign up for <span className="font-bold">TalenJob</span>
              </h1>
            </div>


            {/* Social Signup */}
            <div className=" grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={signUpWithGoogle}
                disabled={isGooglePending}
                className="flex gap-2"
              >
                <GoogleIcon className="h-4 w-4" />
                <span>Google</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={signUpWithGithub}
                disabled={isGithubPending}
                className="flex gap-2"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub</span>
              </Button>
            </div>

            <hr className="my-4 border-dashed" />

            {/* Form Fields */}
            <div className="space-y-6">
              <InputField
                control={form.control}
                name="fullName"
                type="text"
                label="Full Name"
                placeholder="Enter your full name"
              />

              <InputField
                control={form.control}
                name="email"
                type="email"
                label="Email"
                placeholder="Enter your email"
              />

              <div className="space-y-0.5">
                <Label htmlFor="password" className="text-sm">
                  Password
                </Label>
                <InputField
                  control={form.control}
                  name="password"
                  type="password"
                  label=""
                  placeholder="At least 8 characters"
                  showPasswordToggle
                />
              </div>

              {/* Role Select */}
              <div className="space-y-0.5">
                <Label htmlFor="role" className="text-sm">
                  I am a
                </Label>
                <Select
                  onValueChange={(value) => form.setValue("role", value as SignupFormType["role"])}
                  defaultValue={form.getValues("role")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent align="start">
                    <SelectItem value="DEVELOPER">Developer</SelectItem>
                    <SelectItem value="EMPLOYER">Employer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full ">
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </div>
          </div>

          {/* <div className="bg-muted rounded-(--radius) border p-3"> */}
          <p className=" text-center text-sm p-3">
            Already have an account? {" "}
            <Button asChild variant="link" className="px-2">
              <Link href="/login">Sign In</Link>
            </Button>
          </p>
          {/* </div> */}
        </form>
      </Form>
    </section>
  );
}
