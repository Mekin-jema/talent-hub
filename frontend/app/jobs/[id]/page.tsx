// app/jobs/[id]/page.tsx
"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Building2, MapPin, DollarSign, Clock, ArrowLeft, Bookmark, BookmarkCheck, Share, CheckCircle, X, Upload, FileText } from "lucide-react";
import ApplicationDialog from "@/components/applications/application-dialog";

// Mock job data - in a real app this would come from an API
const allJobs = [
    {
        id: "job_1",
        title: "Frontend Developer",
        company: "TechCorp",
        logo: "https://logo.clearbit.com/reactjs.org",
        location: "Remote",
        salary: "$4000 - $6000",
        type: "Full-time",
        posted: "2 days ago",
        skills: ["React", "TypeScript", "Tailwind"],
        featured: true,
        category: "Engineering",
        description: "We're looking for a talented Frontend Developer to join our team. You'll be responsible for building user interfaces and implementing designs.",
        requirements: ["3+ years of React experience", "Strong TypeScript skills", "Experience with responsive design"],
        responsibilities: ["Develop new user-facing features", "Build reusable components and front-end libraries", "Optimize applications for maximum performance"],
        aboutCompany: "TechCorp is a leading technology company focused on creating innovative solutions for businesses worldwide. We value creativity, collaboration, and cutting-edge technology."
    },
    {
        id: "job_2",
        title: "Backend Developer",
        company: "SoftNet",
        logo: "https://logo.clearbit.com/nodejs.org",
        location: "Addis Ababa",
        salary: "$3500 - $5000",
        type: "Full-time",
        posted: "5 days ago",
        skills: ["Node.js", "Express", "MongoDB", "Docker"],
        featured: false,
        category: "Engineering",
        description: "Join our backend team to build scalable APIs and services for our growing user base.",
        requirements: ["Experience with Node.js and Express", "Database design skills", "Knowledge of containerization"],
        responsibilities: ["Design and implement RESTful APIs", "Develop and maintain server-side logic", "Ensure high performance and responsiveness to requests"],
        aboutCompany: "SoftNet specializes in creating robust backend solutions for enterprises. Our team is passionate about building scalable and efficient systems."
    },
    {
        id: "job_3",
        title: "Full-Stack React Native web app developer",
        company: "Private Client",
        logo: "https://logo.clearbit.com/reactjs.org",
        location: "Addis Ababa, Ethiopia",
        salary: "$5000 - $8000",
        type: "Contractual",
        posted: "1 day ago",
        skills: ["React Native", "Firebase", "Node.js", "Web Development"],
        featured: true,
        category: "Engineering",
        description: "We're looking for a talented full-stack React Native developer to build a web app football fan engagement app with live scores, real-time chat, and quizzes.",
        requirements: ["3+ years React Native experience", "Backend development skills", "Experience with real-time applications", "Knowledge of Firebase"],
        responsibilities: ["Develop a cross-platform mobile app using React Native", "Implement real-time features", "Create engaging user interfaces", "Integrate with third-party APIs"],
        aboutCompany: "We are a sports technology startup focused on enhancing fan engagement through innovative digital experiences."
    }
];

export default function JobDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [saved, setSaved] = useState(false);
    const [applied, setApplied] = useState(false);
    const [applicationFormOpen, setApplicationFormOpen] = useState(false);
    const [applicationStep, setApplicationStep] = useState(1);
    const [resume, setResume] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        linkedIn: "",
        portfolio: "",
        coverLetter: "",
        salaryExpectation: "",
        noticePeriod: "",
        source: ""
    });

    const jobId = params.id as string;
    const job = allJobs.find(job => job.id === jobId);

    if (!job) {
        return (
            <div className="max-w-4xl mx-auto p-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Job Not Found</h1>
                <Button onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
                </Button>
            </div>
        );
    }

    const handleSave = () => {
        setSaved(!saved);
    };

    const handleApply = () => {
        setApplicationFormOpen(true);
    };

    const handleApplicationSubmit = () => {
        setApplied(true);
        setApplicationFormOpen(false);
        setApplicationStep(1);
        setFormData({
            fullName: "",
            email: "",
            phone: "",
            location: "",
            linkedIn: "",
            portfolio: "",
            coverLetter: "",
            salaryExpectation: "",
            noticePeriod: "",
            source: ""
        });
        setResume(null);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: job.title,
                text: `Check out this job: ${job.title} at ${job.company}`,
                url: window.location.href,
            })
                .catch((error) => console.log('Error sharing', error));
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResume(e.target.files[0]);
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real application, you would submit the form data to your backend
        console.log("Application submitted:", { job, formData, resume });
        handleApplicationSubmit();
        setApplicationStep(3); // Show success step
    };

    const resetForm = () => {
        setFormData({
            fullName: "",
            email: "",
            phone: "",
            location: "",
            linkedIn: "",
            portfolio: "",
            coverLetter: "",
            salaryExpectation: "",
            noticePeriod: "",
            source: ""
        });
        setResume(null);
        setApplicationStep(1);
    };

    const handleCloseForm = () => {
        setApplicationFormOpen(false);
        setTimeout(() => {
            resetForm();
        }, 300);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            {/* Header with Back Button */}
            <Button
                variant="ghost"
                className="mb-6"
                onClick={() => router.back()}
            >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Jobs
            </Button>

            {/* Job Header */}
            <div className="bg-card rounded-lg p-6 mb-6 shadow-sm border">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                    <div className="flex items-start space-x-4">
                        <img
                            src={job.logo}
                            alt={job.company}
                            className="w-16 h-16 rounded-lg object-cover border"
                        />
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">{job.title}</h1>
                            <div className="flex items-center text-muted-foreground mb-2">
                                <Building2 className="w-4 h-4 mr-2" />
                                {job.company}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="flex items-center">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {job.location}
                                </Badge>
                                <Badge variant="outline">{job.type}</Badge>
                                {job.featured && (
                                    <Badge variant="default">Featured</Badge>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-2 mt-4 md:mt-0">
                        <Button variant="outline" size="icon" onClick={handleSave}>
                            {saved ? (
                                <BookmarkCheck className="h-4 w-4 text-primary fill-primary" />
                            ) : (
                                <Bookmark className="h-4 w-4" />
                            )}
                        </Button>
                        <Button variant="outline" size="icon" onClick={handleShare}>
                            <Share className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                    <div className="flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Salary</p>
                            <p className="font-medium">{job.salary}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Posted</p>
                            <p className="font-medium">{job.posted}</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-muted-foreground" />
                        <div>
                            <p className="text-sm text-muted-foreground">Category</p>
                            <p className="font-medium">{job.category}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Job Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Job Description */}
                    <div className="bg-card rounded-lg p-6 shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">Job Description</h2>
                        <p className="text-muted-foreground">{job.description}</p>
                    </div>

                    {/* Responsibilities */}
                    <div className="bg-card rounded-lg p-6 shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">Responsibilities</h2>
                        <ul className="space-y-2">
                            {job.responsibilities.map((responsibility, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 mr-3 flex-shrink-0"></div>
                                    <span className="text-muted-foreground">{responsibility}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Requirements */}
                    <div className="bg-card rounded-lg p-6 shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                        <ul className="space-y-2">
                            {job.requirements.map((requirement, index) => (
                                <li key={index} className="flex items-start">
                                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 mr-3 flex-shrink-0"></div>
                                    <span className="text-muted-foreground">{requirement}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Skills */}
                    <div className="bg-card rounded-lg p-6 shadow-sm border">
                        <h2 className="text-xl font-semibold mb-4">Skills Required</h2>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className="text-sm">
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Apply Box */}
                    <div className="bg-card rounded-lg p-6 shadow-sm border sticky top-6">
                        <div className="text-center mb-6">
                            <h3 className="font-semibold text-lg mb-2">Interested in this job?</h3>
                            <p className="text-muted-foreground text-sm">
                                {applied ? "You've already applied to this position" : "Submit your application now"}
                            </p>
                        </div>
                        <Button
                            className="w-full mb-4"
                            size="lg"
                            onClick={handleApply}
                            disabled={applied}
                        >
                            {applied ? "Applied" : "Apply Now"}
                        </Button>
                        <Button variant="outline" className="w-full" size="lg" onClick={handleSave}>
                            {saved ? "Saved" : "Save for Later"}
                        </Button>
                    </div>

                    {/* About Company */}
                    <div className="bg-card rounded-lg p-6 shadow-sm border">
                        <h3 className="font-semibold text-lg mb-4">About the Company</h3>
                        <div className="flex items-center mb-4">
                            <img
                                src={job.logo}
                                alt={job.company}
                                className="w-10 h-10 rounded-lg object-cover border mr-3"
                            />
                            <h4 className="font-medium">{job.company}</h4>
                        </div>
                        <p className="text-muted-foreground text-sm">{job.aboutCompany}</p>
                    </div>

                    {/* Job Overview */}
                    <div className="bg-card rounded-lg p-6 shadow-sm border">
                        <h3 className="font-semibold text-lg mb-4">Job Overview</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Job Type:</span>
                                <span className="font-medium">{job.type}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Location:</span>
                                <span className="font-medium">{job.location}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Salary:</span>
                                <span className="font-medium">{job.salary}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Posted:</span>
                                <span className="font-medium">{job.posted}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Application Form Dialog */}
            <ApplicationDialog
                open={applicationFormOpen}
                setOpen={setApplicationFormOpen}
                applicationStep={applicationStep}
                setApplicationStep={setApplicationStep}
                job={job}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                resume={resume}
                handleFileChange={handleFileChange}
                handleFormSubmit={handleFormSubmit}
                handleCloseForm={handleCloseForm}
            />

        </div>
    );
}