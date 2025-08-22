import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail,
  MapPin,
  Phone,
  Heart,
  LinkedinIcon
} from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background mt-20">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
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
              <Button variant="outline" size="icon" className="rounded-full">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <LinkedinIcon  className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/jobs" className="block text-muted-foreground hover:text-primary transition-colors">
                Browse Jobs
              </Link>
              <Link href="/companies" className="block text-muted-foreground hover:text-primary transition-colors">
                Companies
              </Link>
              <Link href="/post-job" className="block text-muted-foreground hover:text-primary transition-colors">
                Post a Job
              </Link>
              <Link href="/career-advice" className="block text-muted-foreground hover:text-primary transition-colors">
                Career Advice
              </Link>
            </div>
          </div>

          {/* For Job Seekers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">For Job Seekers</h3>
            <div className="space-y-2">
              <Link href="/create-profile" className="block text-muted-foreground hover:text-primary transition-colors">
                Create Profile
              </Link>
              <Link href="/job-alerts" className="block text-muted-foreground hover:text-primary transition-colors">
                Job Alerts
              </Link>
              <Link href="/resume-builder" className="block text-muted-foreground hover:text-primary transition-colors">
                Resume Builder
              </Link>
              <Link href="/salary-guide" className="block text-muted-foreground hover:text-primary transition-colors">
                Salary Guide
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for the latest job opportunities and career tips.
            </p>
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full"
              />
              <Button className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t pt-8 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>123 Job Street, Career City, CC 12345</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>hello@TalentHub.com</span>
            </div>
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
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/sitemap" className="hover:text-primary transition-colors">
              Sitemap
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}