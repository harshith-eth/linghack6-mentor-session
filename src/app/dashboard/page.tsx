import { AppSidebar } from "@/components/app-sidebar"
import { AppSidebarRight } from "@/components/app-sidebar-right"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { RightSidebarProvider, RightSidebarTrigger } from "@/components/ui/dual-sidebar"

import data from "./data.json"

export default function Page() {
  return (
    <RightSidebarProvider defaultOpen={false}>
      <SidebarProvider
        defaultOpen={false}
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
        className="pt-16 pb-5 h-screen overflow-hidden"
      >
        <RightSidebarTrigger className="fixed top-4 right-4 z-50 size-7 -mr-1" />
        
        <AppSidebar variant="inset" />
        <SidebarInset className="flex flex-col h-full">
          <SiteHeader />
          <div className="flex-1 overflow-hidden">
            <div className="@container/main h-full flex flex-col">
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                  <SectionCards />
                  <div className="px-4 lg:px-6">
                    <ChartAreaInteractive />
                  </div>
                  <DataTable data={data} />
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
        <AppSidebarRight />
      </SidebarProvider>
    </RightSidebarProvider>
  )
}
