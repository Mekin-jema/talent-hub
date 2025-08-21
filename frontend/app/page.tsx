import { ArrowRight, ArrowUpRight, MapPin, Building2, DollarSign, Clock, Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

const Hero = ({
  badge = "🚀 Featured Jobs",
  heading = "Find Your Dream Tech Job",
  description = "Discover thousands of job opportunities from top companies. Whether you're a developer, designer, or product manager, we've got the perfect role for you.",
  buttons = {
    primary: {
      text: "Browse All Jobs",
      url: "/jobs",
    },
    secondary: {
      text: "Post a Job",
      url: "/employer/post-job",
    },
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
  return (
    <section className="w-full bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Main Hero Content */}
        <div className="grid items-center gap-12 lg:grid-cols-2 mb-16">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {badge && (
              <Badge variant="secondary" className="mb-4 md:mb-6 px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm">
                {badge}
                <ArrowUpRight className="ml-1 md:ml-2 size-3 md:size-4" />
              </Badge>
            )}
            <h1 className="my-4 md:my-6 text-pretty text-3xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              {heading}
            </h1>
            <p className="text-muted-foreground mb-6 md:mb-8 max-w-xl text-base md:text-lg lg:text-xl">
              {description}
            </p>
            
            <div className="flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              {buttons.primary && (
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a href={buttons.primary.url}>
                    {buttons.primary.text}
                    <ArrowRight className="ml-2 size-4" />
                  </a>
                </Button>
              )}
              {buttons.secondary && (
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                  <a href={buttons.secondary.url}>
                    {buttons.secondary.text}
                  </a>
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
           {/* Featured Jobs Section */}
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
                          <Building2 className="w-3 h-3 md:w-4 md:h-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{job.company}</span>
                        </p>
                      </div>
                    </div>
                    {job.featured && (
                      <Badge variant="default" className="ml-2 text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-2">
                  <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>
                  <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                    <DollarSign className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                    {job.salary}
                  </div>
                  <div className="flex items-center text-xs md:text-sm text-muted-foreground">
                    <Clock className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
                    {job.type} • {job.posted}
                  </div>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-1 pt-2">
                    {job.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
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

                <CardFooter className="flex justify-between items-center pt-4 gap-2">
                  <Button variant="outline" size="sm" className="text-xs flex-1">
                    Save
                  </Button>
                  <Button size="sm" className="text-xs flex-1">
                    Apply
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* View More Jobs Button */}
          <div className="text-center mt-8">
            <Button variant="ghost" className="group">
              View All Featured Jobs
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-12 md:py-16">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Trusted by Thousands</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
              Join thousands of job seekers and employers who have found success with our platform
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start mb-4">
                    <Quote className="h-6 w-6 text-primary/60 flex-shrink-0" />
                    <div className="ml-2">
                      {/* Rating Stars */}
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < testimonial.rating
                                ? "text-yellow-400 fill-current"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground italic">
                        "{testimonial.content}"
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4 pt-4 border-t">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <h4 className="text-sm font-semibold">{testimonial.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

     
      </div>
    </section>
  );
};

export default Hero;