import React, { ReactNode } from "react";

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/dashboard/header";
import { SearchProvider } from "@/components/dashboard/seach-context";

const DashboardLayout=({children}:{children:React.ReactNode})=> {
  return (
          <SearchProvider>
    <SidebarProvider>

      <AppSidebar />
      <SidebarInset>
          <Header/>
    
            {children}
      </SidebarInset>

    </SidebarProvider>
          </SearchProvider>
  )
}

export default DashboardLayout