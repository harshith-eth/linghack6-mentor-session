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

  return (
    <>
      {/* Sidebar gap */}
      <div
        className={cn(
          "relative w-80 bg-transparent transition-[width] duration-200 ease-linear",
          state === "collapsed" && "w-12"
        )}
      />
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-10 hidden h-svh w-80 transition-[right,width] duration-200 ease-linear md:flex",
          state === "collapsed" && "right-[calc(20rem*-1)] w-12",
          "bg-sidebar",
          "flex flex-col",
          className
        )}
        data-sidebar="right-sidebar"
        data-state={state}
        data-side="right"
        {...props}
      >
        {children}
      </div>
    </>
  )
} 