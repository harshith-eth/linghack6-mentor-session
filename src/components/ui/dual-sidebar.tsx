"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { IconSparkles, IconChevronsRight } from "@tabler/icons-react"
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
  TooltipProvider,
} from "@/components/ui/tooltip"

const SIDEBAR_WIDTH = "20rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"

// Context for right sidebar - matches the left sidebar exactly
type RightSidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
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
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  // Internal state management - matches left sidebar exactly
  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }
    },
    [setOpenProp, open]
  )

  // Toggle function - matches left sidebar exactly
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  // State for CSS targeting - matches left sidebar exactly
  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<RightSidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
  )

  return (
    <RightSidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="right-sidebar-wrapper"
          style={
            {
              "--right-sidebar-width": SIDEBAR_WIDTH,
              "--right-sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/right-sidebar-wrapper has-data-[variant=inset]:bg-sidebar flex min-h-svh w-full",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </RightSidebarContext.Provider>
  )
}

// Right sidebar component - exact copy of left sidebar but for right side
export function RightSidebar({
  side = "right",
  variant = "inset",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useRightSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-slot="right-sidebar"
        className={cn(
          "bg-sidebar text-sidebar-foreground flex h-full w-(--right-sidebar-width) flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="right-sidebar"
          data-slot="right-sidebar"
          data-mobile="true"
          className="bg-sidebar text-sidebar-foreground w-(--right-sidebar-width) p-0 [&>button]:hidden"
          style={
            {
              "--right-sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
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
    <div
      className="group peer-right text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="right-sidebar"
    >
      {/* Gap element - matches left sidebar but for right side */}
      <div
        data-slot="right-sidebar-gap"
        className={cn(
          "relative w-(--right-sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--right-sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--right-sidebar-width-icon)"
        )}
      />
      <div
        data-slot="right-sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh w-(--right-sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--right-sidebar-width)*-1)]",
          // Adjust the padding for floating and inset variants.
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--right-sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--right-sidebar-width-icon) border-l",
          className
        )}
        {...props}
      >
        <div
          data-sidebar="right-sidebar"
          data-slot="right-sidebar-inner"
          className="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export function RightSidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar, state } = useRightSidebar()
  const isOpen = state === "expanded"

  return (
    <Button
      data-sidebar="right-trigger"
      data-slot="right-sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-8", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleSidebar()
      }}
      {...props}
    >
      <div className="relative size-4">
        <IconSparkles 
          className={cn(
            "absolute inset-0 size-4 transition-all duration-300 ease-in-out",
            isOpen ? "opacity-0 rotate-90 scale-90" : "opacity-100 rotate-0 scale-100"
          )} 
          strokeWidth={1.5} 
          fill="currentColor" 
        />
        <IconChevronsRight 
          className={cn(
            "absolute inset-0 size-4 transition-all duration-300 ease-in-out",
            isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-90"
          )} 
          strokeWidth={1.5} 
        />
      </div>
      <span className="sr-only">Toggle Right Sidebar</span>
    </Button>
  )
}

// Enhanced inset that responds to both sidebars
export function DualSidebarInset({
  className,
  ...props
}: React.ComponentProps<"main">) {
  const rightContext = useRightSidebar()  
  const isDesktop = rightContext && !rightContext.isMobile

  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        "bg-background relative flex w-full flex-1 flex-col",
        // Left sidebar peer styling
        "md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2",
        // Right sidebar peer styling - using peer-right
        "md:peer-right-data-[variant=inset]:mr-2 md:peer-right-data-[state=collapsed]:mr-2",
        // Force consistent styling on desktop
        isDesktop ? "md:m-2 md:ml-0 md:rounded-xl md:shadow-sm" : "",
        className
      )}
      {...props}
    />
  )
}

// Sidebar components for right sidebar (same as left sidebar components)
export function RightSidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="right-sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

export function RightSidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="right-sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

export function RightSidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="right-sidebar-content"
      data-sidebar="content"
      className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className)}
      {...props}
    />
  )
} 