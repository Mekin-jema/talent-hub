"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Building2,
  DollarSign,
  Clock,
  Star,
  Quote,
  Briefcase,
  LogIn,
  UserPlus,
  Plus,
  Menu,
  X,
  Bell,
  Search,
  LogOut,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  Heart,
  LinkedinIcon
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/mode-toggle";

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

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

interface HeroProps {
  badge?: string;
  heading: string;
  description: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  featuredJobs: Job[];
  testimonials: Testimonial[];
}

// =======================
// Hero Page
// =======================
const Hero = ({
  badge = "🚀 Featured Jobs",
  heading = "Find Your Dream Tech Job",
  description = "Discover thousands of job opportunities from top companies. Whether you're a developer, designer, or product manager, we've got the perfect role for you.",
  buttons = {
    primary: { text: "Browse All Jobs", url: "/jobs" },
    secondary: { text: "Post a Job", url: "/employer/post-job" },
  },
  featuredJobs = [
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
    }
  ],
  testimonials = [
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Frontend Developer",
      company: "Google",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      content: "Found my dream job in just 2 weeks! The application process was smooth and the opportunities were exactly what I was looking for.",
      rating: 5
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Product Manager",
      company: "Microsoft",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      content: "As an employer, the quality of candidates we've found through this platform has been exceptional. Highly recommended!",
      rating: 5
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "Apple",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      content: "The personalized job recommendations helped me discover opportunities I wouldn't have found elsewhere. Landed my perfect role!",
      rating: 5
    }
  ]
}: HeroProps) => {
  // =======================
  // Navbar State
  // =======================
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(true); // logged in mock
  const [userRole, setUserRole] = useState("employer");

  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  };

  const navLinks = [
    { href: "/jobs", label: "Browse Jobs" },
    { href: "/companies", label: "Companies" },
    { href: "/career-advice", label: "Career Advice" },
  ];

  const handleLogout = () => console.log("Logging out...");

  return (
    <>
      {/* ======================= Navbar ======================= */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur border-b supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex items-center justify-between py-3 px-4 md:px-0">
          {/* Logo & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                TalentHub
              </span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search jobs, companies, or skills..." className="pl-10 pr-4" />
            </div>
          </div>

          {/* Desktop Nav */}
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

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

              <div className="flex items-center space-x-2">
                <Button asChild variant="secondary" size="sm">
                  <Link href="/login" className="flex items-center gap-1">
                    <LogIn className="h-4 w-4" /> Login
                  </Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/register" className="flex items-center gap-1">
                    <UserPlus className="h-4 w-4" /> Register
                  </Link>
                </Button>
              </div>
        
          </div>
          <ModeToggle />
        </div>

        {/* Mobile Menu */}
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
                {userRole === "employer" && (
                  <Button asChild size="sm" className="w-full mt-4">
                    <Link href="/employer/post-job" className="flex items-center gap-1">
                      <Plus className="h-4 w-4" /> Post Job
                    </Link>
                  </Button>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* ======================= Hero Section ======================= */}
      <section className="w-full bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 mb-16">
            {/* Text Content */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              {badge && (
                <Badge variant="secondary" className="mb-4 md:mb-6 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm">
                  {badge} <ArrowUpRight className="ml-1 md:ml-2 size-3 md:size-4" />
                </Badge>
              )}
              <h1 className="my-4 md:my-6 text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                {heading}
              </h1>
              <p className="text-muted-foreground mb-6 md:mb-8 max-w-xl text-base md:text-lg lg:text-xl">
                {description}
              </p>

              <div className="flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                {buttons.primary && (
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <a href={buttons.primary.url}>
                      {buttons.primary.text} <ArrowRight className="ml-2 size-4" />
                    </a>
                  </Button>
                )}
                {buttons.secondary && (
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                    <a href={buttons.secondary.url}>{buttons.secondary.text}</a>
                  </Button>
                )}
              </div>

              {/* Stats */}
              <div className="mt-8 md:mt-12 grid grid-cols-3 gap-4 md:gap-8 text-center lg:text-left">
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
          
          {/* ======================= Featured Jobs ======================= */}
          <div className="py-12 md:py-16">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Featured Jobs</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
                Hand-picked opportunities from top companies looking for talent like you
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredJobs.map((job) => (
                <Card key={job.id} className={`group hover:shadow-lg transition-all duration-300 ${job.featured ? 'border-primary/20 ring-1 ring-primary/10' : ''}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={job.logo}
                          alt={job.company}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover border"
                        />
                        <div className="min-w-0">
                          <h3 className="font-semibold text-base md:text-lg group-hover:text-primary transition-colors truncate">
                            {job.title}
                          </h3>
                          <p className="text-muted-foreground flex items-center text-sm">
                            <Building2 className="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0" /> {job.company}
                          </p>
                        </div>
                      </div>
                      {job.featured && <Badge variant="default" className="ml-2 text-xs">Featured</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                      <DollarSign className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" /> {job.salary}
                    </div>
                    <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                      <Clock className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" /> {job.type} • {job.posted}
                    </div>
                    <div className="flex flex-wrap gap-1 pt-2">
                      {job.skills.slice(0, 3).map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                      {job.skills.length > 3 && <Badge variant="outline" className="text-xs">+{job.skills.length - 3} more</Badge>}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center pt-4 gap-2">
                    <Button variant="outline" size="sm" className="text-xs flex-1">Save</Button>
                    <Button size="sm" className="text-xs flex-1">Apply</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="ghost" className="group">
                View All Featured Jobs
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* ======================= Testimonials ======================= */}
          <div className="py-12 md:py-16">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Trusted by Thousands</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
                Join thousands of job seekers and employers who have found success with our platform
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <Card key={t.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start mb-4">
                      <Quote className="h-6 w-6 text-primary/60 flex-shrink-0" />
                      <div className="ml-2">
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < t.rating ? "text-yellow-400 fill-current" : "text-muted-foreground"}`} />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground italic">"{t.content}"</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-4 pt-4 border-t">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={t.avatar} alt={t.name} />
                        <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <h4 className="text-sm font-semibold">{t.name}</h4>
                        <p className="text-xs text-muted-foreground">{t.role} at {t.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================= Footer ======================= */}
      <footer className="w-full border-t bg-background mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">J</span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  TalentHub
                </span>
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
    </>
  );
};

export default Hero;
