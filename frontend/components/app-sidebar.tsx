"use client"

import React from "react"
import {
  Briefcase,
  Users,
  Bell,
  CreditCard,
  Star,
  MapPin,
  FileText,
  Building2,
  ClipboardList,
  LucideIcon,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { TeamSwitcher } from "./team-switcher"
import { NavMain } from "./nav-main"
import { NavProjects } from "./nav-projects"
import { NavUser } from "./nav-user"

/* -------------------- Types -------------------- */

// User (manager, admin, etc.)
export interface User {
  name: string
  email: string
  avatar: string
}

// Branch/Team for switching
export interface Branch {
  id: number
  name: string
  type: string
  location: string
  logo: LucideIcon
  plan: string
  manager: User
}

// Sidebar navigation item
export interface NavItem {
  id: string
  title: string
  url: string
  icon?: LucideIcon
  isExternal?: boolean
  items?: NavItem[] // nested submenus
  isActive?: boolean
}

// Project/shortcut links (bottom section)
export interface Project {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

// Full sidebar data
export interface SidebarData {
  branches: Branch[]
  navMain: NavItem[]
  projects: Project[]
}


/* -------------------- Data -------------------- */

export interface NavGroup{
  id :string,
  title: string,
  url: string,
  icon: LucideIcon,
  isActive?: boolean,
}

export const sidebarData: SidebarData = {
  branches: [
    {
      id: 1,
      name: "Job Portal HQ",
      type: "Recruitment Agency",
      location: "Addis Ababa, Ethiopia",
      logo: Briefcase,
      plan: "Enterprise",
      manager: {
        name: "Admin Recruiter",
        email: "admin@jobportal.com",
        avatar: "/avatars/recruiter.png",
      },
    },
    {
      id: 2,
      name: "Tech Jobs Hub",
      type: "Tech Recruiting",
      location: "Remote",
      logo: Building2,
      plan: "Pro",
      manager: {
        name: "Tech Recruiter",
        email: "tech@jobportal.com",
        avatar: "/avatars/tech.png",
      },
    },
  ],

  navMain: [
    {
      id: "dashboard",
      title: "Dashboard",
      url: "/admin",
      icon: Briefcase,
      isActive: true,
    },
    {
      id: "jobs",
      title: "Jobs",
      url: "/admin/jobs",
      icon: ClipboardList,
    },
    {
      id: "candidates",
      title: "Candidates",
      url: "/admin/candidates",
      icon: Users,
    },
    {
      id: "companies",
      title: "Companies",
      url: "/admin/companies",
      icon: Building2,
    },
    {
      id: "applications",
      title: "Applications",
      url: "/admin/applications",
      icon: FileText,
    },
    {
      id: "payments",
      title: "Payments",
      url: "/admin/payments",
      icon: CreditCard,
    },
  ],

  projects: [
    {
      id: "promotions",
      name: "Job Promotions",
      url: "/admin/promotions",
      icon: Star,
    },
    {
      id: "job-fairs",
      name: "Job Fairs",
      url: "/admin/job-fairs",
      icon: MapPin,
    },
    {
      id: "notifications",
      name: "Notifications",
      url: "/admin/notifications",
      icon: Bell,
    },
  ],
}

/* -------------------- Component -------------------- */

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.branches} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
        <NavProjects projects={sidebarData.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.branches[0]?.manager} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
