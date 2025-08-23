"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Building2, MapPin, DollarSign, Clock, Search, Bookmark, BookmarkCheck, Filter, X, ChevronDown, ChevronUp, Users } from "lucide-react";
import { useJobStore } from "@/store/useJobStore";
import { useApplicationStore } from "@/store/useApplicationStore";

export default function AllJobsPage() {
  const router = useRouter();
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

  const { fetchJobs, jobs, loading, error } = useJobStore();
  const { checkIfApplied } = useApplicationStore();

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);



  // Extract unique categories, locations, and job types for filters from actual data
  const categories = [...new Set(jobs.map(job => job.category).filter((v): v is string => typeof v === "string" && v.trim() !== ""))];
  const locations = [...new Set(jobs.map(job => job.location).filter((v): v is string => typeof v === "string" && v.trim() !== ""))];
  const jobTypes = [...new Set(jobs.map(job => job.type).filter((v): v is string => typeof v === "string" && v.trim() !== ""))];

  const handleApply = (jobId?: string) => {
    console.log("jobId", jobId);
    if(jobId){

      console.log("check the chekcIfApplied ",checkIfApplied(jobId));
    }
    if (!jobId) return;
    if (checkIfApplied(jobId)) {
      alert("You already applied for this job!");
      return;
    }
    router.push(`/jobs/${jobId}`);
  };

  const handleSave = (jobId?: string) => {
    if (!jobId) return;
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
  const filteredJobs = jobs.filter((job) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      (job.title ?? "").toLowerCase().includes(searchLower) ||
      (typeof job.aboutCompany === "string" && job.aboutCompany.toLowerCase().includes(searchLower)) ||
      (job.skills as (string | { name: string })[] | undefined)?.some(skill =>
        typeof skill === "string"
          ? skill.toLowerCase().includes(searchLower)
          : skill.name.toLowerCase().includes(searchLower)
      );

    const matchesCategory = filters.category ? job.category === filters.category : true;
    const matchesLocation = filters.location ? job.location === filters.location : true;
    const matchesType = filters.type ? job.type === filters.type : true;
    const matchesRemote = filters.remote ?
      (filters.remote === "remote" ? job.location?.toLowerCase().includes("remote") :
        filters.remote === "onsite" ? !job.location?.toLowerCase().includes("remote") && !job.location?.toLowerCase().includes("hybrid") :
          filters.remote === "hybrid" ? job.location?.toLowerCase().includes("hybrid") : true) : true;

    return matchesSearch && matchesCategory && matchesLocation && matchesType && matchesRemote;
  });

  const activeFiltersCount = Object.values(filters).filter(value => value !== "").length;

  const viewJobDetails = (jobId?: string) => {
    if (!jobId) return;
    router.push(`/jobs/${jobId}`);
  };

  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center">
        <div className="text-destructive mb-4">Error: {error}</div>
        <Button onClick={() => fetchJobs()}>Try Again</Button>
      </div>
    );
  }

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

          {/* Location Filter */}
          <div className="border rounded-lg p-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFilterSection('location')}
            >
              <h4 className="font-medium">Location</h4>
              {expandedFilters.experience ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {expandedFilters.experience && (
              <div className="mt-3 space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="location-all"
                    checked={filters.location === ""}
                    onCheckedChange={() => handleFilterChange("location", "")}
                  />
                  <Label htmlFor="location-all" className="text-sm">All locations</Label>
                </div>
                {locations.map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      id={`location-${location}`}
                      checked={filters.location === location}
                      onCheckedChange={() => handleFilterChange("location", location)}
                    />
                    <Label htmlFor={`location-${location}`} className="text-sm">{location}</Label>
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
                if (!job.id) return null; // Skip jobs without an id to satisfy type narrowing
                const saved = savedJobs.includes(job.id);
                // const companyName = job.posted?.fullName || job.company || "Private Company";
                const companyName = "Private Company";

                const logo = job.logo || "/placeholder-company.png";

                return (
                  <Card
                    key={job.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => viewJobDetails(job.id)}
                  >
                    <CardHeader className="pb-4 border-b">
                      <div className="flex justify-between items-start">
                        {/* Logo + Job Info */}
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <img
                              src={logo}
                              alt={companyName}
                              className="w-12 h-12 rounded-xl object-cover border shadow-sm"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder-company.png";
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg leading-snug">{job.title}</h3>
                            <p className="text-muted-foreground flex items-center text-sm mt-1">
                              <Building2 className="w-4 h-4 mr-1 opacity-70" />
                              <span className="truncate">{companyName}</span>
                            </p>
                          </div>
                        </div>

                        {/* Save Button */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full hover:bg-muted"
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
                      {job.skills && job.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {(job.skills as (string | { name: string })[]).slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {typeof skill === 'string' ? skill : skill.name}
                            </Badge>
                          ))}
                          {job.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.skills.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </CardContent>



                    <CardFooter className="flex flex-col md:flex-row justify-between items-center gap-4 pt-3 border-t">
                      {/* Salary & Posted Info */}
                      <div className="flex items-center text-sm text-muted-foreground">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {job.salary ? `$${job.salary}` : 'Salary not specified'}
                        <span className="mx-2">•</span>
                        <Clock className="w-4 h-4 mr-1" />
                        {(job as any).posted ? `Posted ${formatDate((job as any).posted as string)}` : 'Recently posted'}
                      </div>

                      {/* Applications Info */}
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="font-medium text-foreground">{job._count.applications}</span>{" "}
                        {job._count.applications === 1 ? "person has" : "people have"} applied for this job
                      </div>

                      {/* Apply Button */}
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApply(job.id);
                        }}
                        disabled={checkIfApplied(job.id)}
                      >
                     {checkIfApplied(job.id) ? "Already Applied" : "Apply"}
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