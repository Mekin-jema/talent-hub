import React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/dashboard/header";
import { SearchProvider } from "@/components/dashboard/seach-context";
import PrivateRoute, { Role } from "@/components/PrivateRoute";

const DashboardLayout=({children}:{children:React.ReactNode})=> {
  return (
      <PrivateRoute allowedRoles={[Role.EMPLOYER, Role.ADMIN]}>

          <SearchProvider>
    <SidebarProvider>

      <AppSidebar />
      <SidebarInset>
          <Header/>
    
            {children}
      </SidebarInset>

    </SidebarProvider>
          </SearchProvider>
      </PrivateRoute>
  )
}

export default DashboardLayout