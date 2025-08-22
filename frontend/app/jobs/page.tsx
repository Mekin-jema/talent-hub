"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Building2, MapPin, DollarSign, Clock, Search, Bookmark, BookmarkCheck, Filter, X, ChevronDown, ChevronUp } from "lucide-react";

// Mock all jobs
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
    requirements: ["3+ years of React experience", "Strong TypeScript skills", "Experience with responsive design"]
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
    requirements: ["Experience with Node.js and Express", "Database design skills", "Knowledge of containerization"]
  },
  {
    id: "job_3",
    title: "Fullstack Developer",
    company: "InnoTech",
    logo: "https://logo.clearbit.com/github.com",
    location: "Hybrid",
    salary: "$4500 - $7000",
    type: "Contract",
    posted: "1 week ago",
    skills: ["React", "Node.js", "GraphQL"],
    featured: true,
    category: "Engineering",
    description: "We need a fullstack developer to help us build end-to-end features for our platform.",
    requirements: ["Experience with both frontend and backend", "GraphQL knowledge", "Problem-solving skills"]
  },
  {
    id: "job_4",
    title: "Data Scientist",
    company: "DataWiz",
    logo: "https://logo.clearbit.com/python.org",
    location: "Remote",
    salary: "$5000 - $7500",
    type: "Full-time",
    posted: "3 days ago",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    featured: false,
    category: "Data Science",
    description: "Join our data team to extract insights from large datasets and build predictive models.",
    requirements: ["Advanced degree in a quantitative field", "Experience with ML frameworks", "SQL proficiency"]
  },
  {
    id: "job_5",
    title: "UI/UX Designer",
    company: "DesignPro",
    logo: "https://logo.clearbit.com/figma.com",
    location: "Addis Ababa",
    salary: "$3000 - $4500",
    type: "Full-time",
    posted: "1 week ago",
    skills: ["Figma", "Adobe XD", "Prototyping"],
    featured: false,
    category: "Design",
    description: "We're looking for a creative UI/UX designer to create beautiful and intuitive interfaces.",
    requirements: ["Portfolio demonstrating UI/UX skills", "Proficiency in design tools", "Understanding of user research"]
  },
  {
    id: "job_6",
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
    requirements: ["3+ years React Native experience", "Backend development skills", "Experience with real-time applications"]
  }
];

// Extract unique categories, locations, and job types for filters
const categories = [...new Set(allJobs.map(job => job.category))];
const locations = [...new Set(allJobs.map(job => job.location))];
const jobTypes = [...new Set(allJobs.map(job => job.type))];

export default function AllJobsPage() {
  const router = useRouter();
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    type: "",
    remote: "",
  });
  const [expandedFilters, setExpandedFilters] = useState({
    sector: true,
    jobType: true,
    experience: true,
  });

  const handleApply = (jobId: string) => {
    if (appliedJobs.includes(jobId)) {
      alert("You already applied for this job!");
      return;
    }
    setAppliedJobs([...appliedJobs, jobId]);
    alert("Application submitted!");
  };

  const handleSave = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      location: "",
      type: "",
      remote: "",
    });
  };

  const toggleFilterSection = (section: string) => {
    setExpandedFilters({
      ...expandedFilters,
      [section]: !expandedFilters[section as keyof typeof expandedFilters],
    });
  };

  // Filter jobs by search term and filters
  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some(skill => 
        skill.toLowerCase().includes(search.toLowerCase())
      );

    const matchesCategory = filters.category ? job.category === filters.category : true;
    const matchesLocation = filters.location ? job.location === filters.location : true;
    const matchesType = filters.type ? job.type === filters.type : true;
    const matchesRemote = filters.remote ? 
      (filters.remote === "remote" ? job.location === "Remote" : 
       filters.remote === "onsite" ? job.location !== "Remote" && job.location !== "Hybrid" :
       filters.remote === "hybrid" ? job.location === "Hybrid" : true) : true;

    return matchesSearch && matchesCategory && matchesLocation && matchesType && matchesRemote;
  });

  const activeFiltersCount = Object.values(filters).filter(value => value !== "").length;

  const viewJobDetails = (jobId: string) => {
    router.push(`/jobs/${jobId}`);
  };

  return (
    <div className="max-w-7xl mx-auto bg-background text-foreground min-h-screen">
      {/* Page Header */}
      <div className="p-4 md:p-8 pb-0">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Find Your Dream Job</h2>
        <p className="text-muted-foreground max-w-2xl">
          Browse through our curated list of opportunities and find the perfect match for your skills.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="p-4 md:p-8 pb-0">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search jobs, companies, or skills..."
            className="pl-10 pr-4 py-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row p-4 md:p-8 gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Filter Jobs</h3>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
                Clear all
              </Button>
            )}
          </div>

          {/* Sector Filter */}
          <div className="border rounded-lg p-4">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFilterSection('sector')}
            >
              <h4 className="font-medium">Sector</h4>
              {expandedFilters.sector ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {expandedFilters.sector && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sector-all" 
                    checked={filters.category === ""}
                    onCheckedChange={() => handleFilterChange("category", "")}
                  />
                  <Label htmlFor="sector-all" className="text-sm">All sectors</Label>
                </div>
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`sector-${category}`} 
                      checked={filters.category === category}
                      onCheckedChange={() => handleFilterChange("category", category)}
                    />
                    <Label htmlFor={`sector-${category}`} className="text-sm">{category}</Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Job Type Filter */}
          <div className="border rounded-lg p-4">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFilterSection('jobType')}
            >
              <h4 className="font-medium">Job Types</h4>
              {expandedFilters.jobType ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {expandedFilters.jobType && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="type-all" 
                    checked={filters.type === ""}
                    onCheckedChange={() => handleFilterChange("type", "")}
                  />
                  <Label htmlFor="type-all" className="text-sm">All types</Label>
                </div>
                {jobTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`type-${type}`} 
                      checked={filters.type === type}
                      onCheckedChange={() => handleFilterChange("type", type)}
                    />
                    <Label htmlFor={`type-${type}`} className="text-sm">{type}</Label>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Experience Level Filter */}
          <div className="border rounded-lg p-4">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFilterSection('experience')}
            >
              <h4 className="font-medium">Experience Level</h4>
              {expandedFilters.experience ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {expandedFilters.experience && (
              <div className="mt-3 space-y-2">
                {["Entry Level", "Mid Level", "Senior", "Executive"].map((level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox id={`level-${level}`} />
                    <Label htmlFor={`level-${level}`} className="text-sm">{level}</Label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Job Listings */}
        <div className="w-full md:w-3/4">
          {/* Results Count */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-muted-foreground">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select defaultValue="recent">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most recent</SelectItem>
                  <SelectItem value="salary">Salary (high to low)</SelectItem>
                  <SelectItem value="relevant">Most relevant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Job List */}
          {filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => {
                const applied = appliedJobs.includes(job.id);
                const saved = savedJobs.includes(job.id);

                return (
                  <Card 
                    key={job.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => viewJobDetails(job.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-3">
                          <img
                            src={job.logo}
                            alt={job.company}
                            className="w-12 h-12 rounded-lg object-cover border"
                          />
                          <div>
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <p className="text-muted-foreground flex items-center text-sm">
                              <Building2 className="w-4 h-4 mr-1" />
                              {job.company}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSave(job.id);
                          }}
                        >
                          {saved ? (
                            <BookmarkCheck className="h-4 w-4 text-primary fill-primary" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="pb-3">
                      <p className="text-sm line-clamp-2">{job.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline" className="flex items-center text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          {job.location}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {job.type}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {job.category}
                        </Badge>
                        {job.featured && (
                          <Badge variant="default" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </CardContent>

                    <CardFooter className="flex justify-between items-center pt-3 border-t">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {job.salary}
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4 mr-1" />
                        Posted {job.posted}
                      </div>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApply(job.id);
                        }}
                        disabled={applied}
                      >
                        {applied ? "Applied" : "Apply Now"}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-muted/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-lg mb-2">No jobs found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Try adjusting your search or filter criteria to find more jobs.
              </p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}