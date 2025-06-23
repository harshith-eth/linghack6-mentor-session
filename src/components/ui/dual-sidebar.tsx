"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { PanelLeftIcon, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

// Context for right sidebar
type RightSidebarContextProps = {
  open: boolean
  setOpen: (open: boolean) => void
  toggleSidebar: () => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  state: "expanded" | "collapsed"
}

const RightSidebarContext = React.createContext<RightSidebarContextProps | null>(null)

export function useRightSidebar() {
  const context = React.useContext(RightSidebarContext)
  if (!context) {
    throw new Error("useRightSidebar must be used within a RightSidebarProvider.")
  }
  return context
}

export function RightSidebarProvider({
  defaultOpen = false,
  children,
}: {
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(defaultOpen)
  const [openMobile, setOpenMobile] = React.useState(false)

  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpenMobile])

  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<RightSidebarContextProps>(
    () => ({
      open,
      setOpen,
      toggleSidebar,
      openMobile,
      setOpenMobile,
      isMobile,
      state,
    }),
    [open, setOpen, toggleSidebar, openMobile, setOpenMobile, isMobile, state]
  )

  return (
    <RightSidebarContext.Provider value={contextValue}>
      {children}
    </RightSidebarContext.Provider>
  )
}

export function RightSidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useRightSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <Sparkles className="size-6" strokeWidth={1.5} />
      <span className="sr-only">Toggle Right Sidebar</span>
    </Button>
  )
}

// NEW: Resizable wrapper for the main content and right sidebar
export function ResizableWrapper({ children }: { children: React.ReactNode }) {
  const { state, isMobile } = useRightSidebar()
  
  // If mobile or sidebar is collapsed, don't use resizable wrapper
  if (isMobile || state === "collapsed") {
    return <>{children}</>
  }

  // When sidebar is open on desktop, use resizable panels
  const childrenArray = React.Children.toArray(children)
  const mainContent = childrenArray[0]
  const rightSidebar = childrenArray[1]

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      <ResizablePanel defaultSize={75} minSize={50} className="overflow-hidden">
        {mainContent}
      </ResizablePanel>
      <ResizableHandle withHandle className="bg-border hover:bg-accent" />
      <ResizablePanel defaultSize={25} minSize={20} maxSize={40} className="overflow-hidden">
        {rightSidebar}
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

// NEW: Independent RightSidebar component that doesn't interfere with left sidebar
export function RightSidebar({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { isMobile, state, openMobile, setOpenMobile } = useRightSidebar()

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="right-sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-80 p-0 [&>button]:hidden"
          side="right"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Right Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile right sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  // When collapsed, show the gap like the original
  if (state === "collapsed") {
    return (
      <div
        className="relative w-12 bg-transparent transition-[width] duration-200 ease-linear"
      />
    )
  }

  // When expanded, return the sidebar content for use in ResizableWrapper
  return (
    <div
      className={cn(
        "bg-sidebar text-sidebar-foreground flex flex-col h-full",
        className
      )}
      data-sidebar="right-sidebar"
      data-state={state}
      data-side="right"
      {...props}
    >
      {children}
    </div>
  )
} 