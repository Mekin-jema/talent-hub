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

import { loginFormType, loginSchema } from "@/validation/login.validation";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGithubPending, startGithubTransition] = useTransition();
  const [isGooglePending, startGoogleTransition] = useTransition();
  const router = useRouter();

  // import user store
  const {login} = useAuthStore();

  const form = useForm<loginFormType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // ---- Auth Handlers ----
  const signInWithGithub = async () => {
    startGithubTransition(async () => {
  
    });
  };

  const signInWithGoogle = async () => {
    startGoogleTransition(async () => {

    });
  };

  const onSubmit = async (data: loginFormType) => {
    try {
      login(data);
      router.push("/profile");

      form.reset();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex h-screen bg-zinc-50 px-4 py-2  dark:bg-transparent">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="bg-card m-auto h-fit w-full max-w-sm rounded-[calc(var(--radius)+.125rem)] border p-0.5 shadow-md dark:[--color-muted:var(--color-zinc-900)]"
        >
          <div className="px-8 py-2 pb-6">
            <div className="flex flex-col items-center ">
               <Link href="/" aria-label="go home">
                 <Image src="/logo.png" alt="Logo" width={100} height={100} />
               </Link>
              <h1 className="mb-1 mt-4 text-xl font-semibold">
                Sign In to TalenJob
              </h1>
            </div>

            {/* Social Login */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              {/* Google */}
              <Button
                type="button"
                variant="outline"
                onClick={signInWithGoogle}
                disabled={isGooglePending}
                className="flex items-center gap-2"
              >
                        <GoogleIcon className="h-4 w-4" />
                
                <span>Google</span>
              </Button>

              {/* GitHub */}
              <Button
                type="button"
                variant="outline"
                onClick={signInWithGithub}
                disabled={isGithubPending}
                className="flex items-center gap-2"
              >
                <GithubIcon className="h-4 w-4" />
                <span>GitHub</span>
              </Button>
            </div>

            <hr className="my-4 border-dashed" />

            {/* Form Fields */}
            <div className="space-y-6">
              <div className="space-y-2">
                <InputField
                  control={form.control}
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm">
                    Password
                  </Label>
                  <Button asChild variant="link" size="sm">
                    <Link href="/forget-password" className="text-sm">
                      Forgot your Password?
                    </Link>
                  </Button>
                </div>
                <InputField
                  control={form.control}
                  name="password"
                  type="password"
                  label=""
                  placeholder="At least 8 characters"
                  showPasswordToggle
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full cursor-pointer dark:text-white"
              >
                {isLoading ? "Logging in..." : "Sign In"}
              </Button>
            </div>
          </div>

          {/* <div className="bg-muted rounded-(--radius) border p-3"> */}
            <p className=" text-center text-sm p-3">
              Don&apos;t have an account?{" "}
              <Button asChild variant="link" className="px-2">
                <Link href="/register">Create account</Link>
              </Button>
            </p>
          {/* </div> */}
        </form>
      </Form>
    </section>
  );
}
