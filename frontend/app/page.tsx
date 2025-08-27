"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { 
  ArrowRight, 
  ArrowUpRight, 
  MapPin, 
  DollarSign, 
  LogIn, 
  UserPlus, 
  X, 
  Search, 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  Heart, 
  LinkedinIcon, 
  Menu 
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils";
import Squares from "@/components/animations/square";
import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee";

// =======================
// Interfaces
// =======================
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  logo: string;
  featured?: boolean;
  skills: string[];
}

interface HeroProps {
  badge?: string;
  heading: string;
  description: string;
  buttons?: {
    primary?: { text: string; url: string };
    secondary?: { text: string; url: string };
  };
  featuredJobs: Job[];
}

// =======================
// Mock Data
// =======================
const mockFeaturedJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA (Remote)",
    salary: "$120,000 - $150,000",
    type: "Full-time",
    posted: "2 hours ago",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&fit=crop&crop=face",
    featured: true,
    skills: ["React", "TypeScript", "Next.js", "Tailwind"]
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "New York, NY",
    salary: "$100,000 - $130,000",
    type: "Full-time",
    posted: "5 hours ago",
    logo: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=64&h=64&fit=crop&crop=face",
    skills: ["Node.js", "React", "MongoDB", "AWS"]
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "DesignStudio",
    location: "Austin, TX (Hybrid)",
    salary: "$85,000 - $110,000",
    type: "Full-time",
    posted: "1 day ago",
    logo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=64&h=64&fit=crop&crop=face",
    skills: ["Figma", "Sketch", "Adobe XD", "Prototyping"]
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Remote",
    salary: "$110,000 - $140,000",
    type: "Full-time",
    posted: "3 hours ago",
    logo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=face",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"]
  },
  {
    id: "5",
    title: "Data Scientist",
    company: "DataInsights Inc.",
    location: "Boston, MA",
    salary: "$95,000 - $125,000",
    type: "Full-time",
    posted: "6 hours ago",
    logo: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=64&h=64&fit=crop&crop=face",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow"]
  },
  {
    id: "6",
    title: "Mobile Developer",
    company: "AppWorks",
    location: "Seattle, WA (Hybrid)",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    posted: "4 hours ago",
    logo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=64&h=64&fit=crop&crop=face",
    skills: ["React Native", "iOS", "Android", "JavaScript"]
  },
  {
    id: "7",
    title: "Backend Developer",
    company: "API Masters",
    location: "Remote",
    salary: "$105,000 - $135,000",
    type: "Full-time",
    posted: "Just now",
    logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    skills: ["Node.js", "PostgreSQL", "GraphQL", "REST APIs"]
  },
  {
    id: "8",
    title: "Product Manager",
    company: "InnovateTech",
    location: "Chicago, IL",
    salary: "$115,000 - $145,000",
    type: "Full-time",
    posted: "1 hour ago",
    logo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=64&h=64&fit=crop&crop=face",
    skills: ["Product Strategy", "Agile", "UX", "Market Research"]
  }
];

const testimonials = [
  {
    author: {
      name: "Mekdes Alemu",
      handle: "@mekdesdev",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    text: "Thanks to this platform, I secured a frontend developer position at a top Addis Ababa startup in just 3 weeks!",
    href: "https://twitter.com/mekdesdev"
  },
  {
    author: {
      name: "Abebe Bekele",
      handle: "@abebebiz",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    text: "Our company found highly skilled engineers through this platform, helping us launch our fintech app faster than expected.",
    href: "https://twitter.com/abebebiz"
  },
  {
    author: {
      name: "Sahlework Tadesse",
      handle: "@sahleworkux",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    text: "The recommendations were spot-on! I discovered opportunities in Ethiopia's tech ecosystem that I didn't know existed.",
    href: "https://twitter.com/sahleworkux"
  },
  {
    author: {
      name: "Yonatan Fikre",
      handle: "@yonatancode",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    text: "Using this platform was a game-changer. I received multiple offers from Ethiopian startups within just a month!",
    href: "https://twitter.com/yonatancode"
  },
  {
    author: {
      name: "Eleni Gebre",
      handle: "@elenimarketing",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    text: "As a hiring manager in Addis Ababa, I can confidently say this platform connects us with top local talent faster than anywhere else.",
    href: "https://twitter.com/elenimarketing"
  },
  {
    author: {
      name: "Tesfaye Yohannes",
      handle: "@tesfayedev",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    text: "I was able to join an AI research team in Ethiopia through this platform. It's perfect for tech professionals looking for growth.",
    href: "https://twitter.com/tesfayedev"
  },
  {
    author: {
      name: "Meron Desta",
      handle: "@merondesign",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
    },
    text: "The platform's UX/UI role listings helped me land my dream position at a growing Addis Ababa design studio.",
    href: "https://twitter.com/merondesign"
  }
];


// =======================
// Featured Jobs Carousel Component
// =======================
interface FeaturedJobsCarouselProps {
  jobs: Job[];
}

export function FeaturedJobsCarousel({ jobs }: FeaturedJobsCarouselProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Latest Job Opportunities
      </h2>
      <Carousel className="relative w-full" opts={{ align: "start", loop: true }}>
        <CarouselContent className="flex gap-3">
          {jobs.map((job) => (
            <CarouselItem
              key={job.id}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <Card className="overflow-hidden shadow-md hover:shadow-xl border transition-all duration-300 h-full flex flex-col">
                {/* Logo + Featured Badge */}
                <div className="flex items-center justify-between p-4 border-b bg-muted/30">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.logo}
                      alt={job.company}
                      className="h-10 w-10 rounded-md object-contain border bg-white"
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm">{job.company}</span>
                      <span className="text-xs text-muted-foreground">
                        {job.posted}
                      </span>
                    </div>
                  </div>
                  {job.featured && (
                    <Badge className="bg-primary/90 text-white text-xs">Featured</Badge>
                  )}
                </div>

                {/* Content */}
                <CardContent className="p-5 flex-1 flex flex-col">
                  <h3 className="font-semibold text-lg mb-3 line-clamp-1">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {job.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-semibold text-green-600">
                      {job.salary}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-auto">
                    {job.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {job.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>

                {/* Footer */}
                <CardFooter className="flex justify-between items-center p-5 pt-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs flex items-center"
                  >
                    <Heart className="h-4 w-4 mr-1" /> Save
                  </Button>
                  <Button size="sm" className="text-xs flex items-center">
                    Apply Now <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows */}
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 p-3 bg-background rounded-full shadow-lg border hover:bg-primary hover:text-white transition-all" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-background rounded-full shadow-lg border hover:bg-primary hover:text-white transition-all" />
      </Carousel>
    </div>
  )
}

// =======================
// Footer Component
// =======================
const Footer = () => {
  return (
    <footer className="w-full border-t bg-background mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Logo" width={60} height={60} />
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  TalentHub
                </span>
              </Link>
            </div>
            <p className="text-muted-foreground max-w-xs">
              Connecting talented professionals with amazing opportunities. Find your dream job or the perfect candidate.
            </p>
            <div className="flex space-x-3">
              <Button variant="outline" size="icon" className="rounded-full"><Facebook className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="rounded-full"><Twitter className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="rounded-full"><LinkedinIcon className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="rounded-full"><Instagram className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/jobs" className="block text-muted-foreground hover:text-primary transition-colors">Browse Jobs</Link>
              <Link href="/companies" className="block text-muted-foreground hover:text-primary transition-colors">Companies</Link>
              <Link href="/post-job" className="block text-muted-foreground hover:text-primary transition-colors">Post a Job</Link>
              <Link href="/career-advice" className="block text-muted-foreground hover:text-primary transition-colors">Career Advice</Link>
            </div>
          </div>

          {/* For Job Seekers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Job Seekers</h3>
            <div className="space-y-2">
              <Link href="/create-profile" className="block text-muted-foreground hover:text-primary transition-colors">Create Profile</Link>
              <Link href="/job-alerts" className="block text-muted-foreground hover:text-primary transition-colors">Job Alerts</Link>
              <Link href="/resume-builder" className="block text-muted-foreground hover:text-primary transition-colors">Resume Builder</Link>
              <Link href="/salary-guide" className="block text-muted-foreground hover:text-primary transition-colors">Salary Guide</Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-muted-foreground">Subscribe to our newsletter for the latest job opportunities and career tips.</p>
            <div className="space-y-2">
              <Input type="email" placeholder="Enter your email" className="w-full" />
              <Button className="w-full"><Mail className="h-4 w-4 mr-2" /> Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t pt-8 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-muted-foreground">
            <div className="flex items-center space-x-2"><MapPin className="h-4 w-4" /><span>123 Job Street, Career City, CC 12345</span></div>
            <div className="flex items-center space-x-2"><Phone className="h-4 w-4" /><span>+1 (555) 123-4567</span></div>
            <div className="flex items-center space-x-2"><Mail className="h-4 w-4" /><span>hello@TalentHub.com</span></div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <p>© {new Date().getFullYear()} TalentHub. Made with</p>
            <Heart className="h-4 w-4 mx-1 text-red-500 fill-current" />
            <p>for job seekers and employers.</p>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link href="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

// =======================
// Hero Component
// =======================
const Hero = ({
  badge = "🚀 Featured Jobs",
  heading = "Find Your Dream Tech Job",
  description = "Discover thousands of job opportunities from top companies. Whether you're a developer, designer, or product manager, we've got the perfect role for you.",
  buttons = { 
    primary: { text: "Browse All Jobs", url: "/jobs" }, 
    secondary: { text: "Post a Job", url: "/jobs/create" } 
  },
  featuredJobs = mockFeaturedJobs
}: HeroProps) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/jobs", label: "Browse Jobs" },
  
  ];

  return (
    <div className="relative top-4">
      {/* ======================= Navbar ======================= */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center justify-between py-1 md:px-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link href="/" className="flex items-center gap-2 pl-5">
              <Image src="/logo.png" alt="Logo" width={60} height={60} />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                TalentHub
              </span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search jobs, companies, or skills..." className="pl-10 pr-4" />
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary", 
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="items-center space-x-3 hidden md:flex">
            <div className="flex items-center space-x-2">
              <Button asChild size="sm">
                <Link href="/login" className="flex items-center gap-1 px-5">Login</Link>
              </Button>
              <Button asChild size="sm" variant="outline">
                <Link href="/register" className="flex items-center gap-1 px-6">Register</Link>
              </Button>
            </div>
          </div>

          <ModeToggle />
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="container mx-auto py-4 space-y-4 px-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search jobs..." className="pl-10 pr-4" />
              </div>
              <nav className="space-y-2">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className={cn(
                      "block py-2 text-sm font-medium transition-colors hover:text-primary", 
                      pathname === link.href ? "text-primary" : "text-muted-foreground"
                    )} 
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-4">
                  <Button asChild size="sm" className="w-full">
                    <Link href="/login" className="flex items-center gap-1"><LogIn className="h-4 w-4" /> Login</Link>
                  </Button>
                  <Button asChild size="sm" className="w-full">
                    <Link href="/register" className="flex items-center gap-1"><UserPlus className="h-4 w-4" /> Register</Link>
                  </Button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </header>

      <div className="pointer-events-none absolute inset-0 -z-30"><Squares /></div>

      {/* ======================= Hero Section ======================= */}
      <section className="w-full">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 mb-16 bg-background/60 p-7 rounded-3xl">
            {/* Text */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {badge && (
                <Badge variant="secondary" className="mb-4 md:mb-6 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm">
                  {badge} <ArrowUpRight className="ml-1 md:ml-2 size-3 md:size-4" />
                </Badge>
              )}
              <h1 className="my-4 md:my-6 text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text dark:text-white">
                {heading}
              </h1>
              <p className="mb-6 md:mb-8 max-w-xl text-base md:text-lg lg:text-xl">{description}</p>
              
              {/* Stats */}
              <div className="mt-8 md:mt-12 grid grid-cols-3 gap-4 md:gap-8 text-center lg:text-left mb-6">
                <div>
                  <div className="text-xl md:text-2xl font-bold text-primary">10K+</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Jobs Available</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-primary">500+</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Companies</div>
                </div>
                <div>
                  <div className="text-xl md:text-2xl font-bold text-primary">95%</div>
                  <div className="text-xs md:text-sm text-muted-foreground">Success Rate</div>
                </div>
              </div>
              
              <div className="flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                {buttons.primary && (
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <a href={buttons.primary.url}>{buttons.primary.text} <ArrowRight className="ml-2 size-4" /></a>
                  </Button>
                )}
                {buttons.secondary && (
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                    <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
                  </Button>
                )}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative order-first lg:order-last">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl blur-3xl"></div>
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop" 
                alt="Team collaboration" 
                className="relative rounded-2xl shadow-2xl w-full h-48 md:h-64 lg:h-80 object-cover" 
              />
            </div>
          </div>

          {/* ======================= Featured Jobs Carousel ======================= */}
          <div className="py-12 md:py-16">
            <FeaturedJobsCarousel jobs={featuredJobs} />
          </div>

          {/* ======================= Testimonials Section ======================= */}
          <div className="py-12 md:py-16">
            <TestimonialsSection
              title="Trusted by developers worldwide"
              description="Join thousands of developers who are already building their careers with TalentHub"
              testimonials={testimonials}
              speed={100}
            />
          </div>
        </div>
      </section>

      {/* ======================= Footer ======================= */}
      <Footer />
    </div>
  );
};

export default Hero;