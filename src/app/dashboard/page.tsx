import { AppSidebar } from "@/components/app-sidebar"
import { AppSidebarRight } from "@/components/app-sidebar-right"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { RightSidebarProvider, RightSidebarTrigger, ResizableWrapper } from "@/components/ui/dual-sidebar"

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
        <RightSidebarTrigger className="fixed top-4 right-5 z-50 -mr-1" />
        
        <AppSidebar variant="inset" />
        
        <ResizableWrapper>
          <SidebarInset className="flex flex-col h-full">
            <SiteHeader />
            <div className="flex-1 overflow-hidden">
              <div className="@container/main h-full flex flex-col">
                <div className="flex-1 overflow-y-auto">
                  <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    {/* Dashboard content removed - now empty */}
                  </div>
                </div>
              </div>
            </div>
          </SidebarInset>
          <AppSidebarRight />
        </ResizableWrapper>
      </SidebarProvider>
    </RightSidebarProvider>
  )
}
