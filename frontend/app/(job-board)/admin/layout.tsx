import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
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