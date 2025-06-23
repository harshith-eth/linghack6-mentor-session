"use client"

import * as React from "react"
import {
  IconBell,
  IconCalendar,
  IconChartBar,
  IconClock,
  IconFileText,
  IconInnerShadowTop,
  IconMessage,
  IconSettings,
  IconStar,
  IconUser,
  IconActivity,
  IconTrendingUp,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/user.jpg",
  },
  navMain: [
    {
      title: "Activity",
      url: "#",
      icon: IconActivity,
    },
    {
      title: "Notifications",
      url: "#",
      icon: IconBell,
    },
    {
      title: "Messages",
      url: "#",
      icon: IconMessage,
    },
    {
      title: "Calendar",
      url: "#",
      icon: IconCalendar,
    },
    {
      title: "Performance",
      url: "#",
      icon: IconTrendingUp,
    },
  ],
  navSecondary: [
    {
      title: "Recent Items",
      url: "#",
      icon: IconClock,
    },
    {
      title: "Favorites",
      url: "#",
      icon: IconStar,
    },
    {
      title: "Profile",
      url: "#",
      icon: IconUser,
    },
  ],
  documents: [
    {
      name: "Quick Notes",
      url: "#",
      icon: IconFileText,
    },
    {
      name: "Analytics",
      url: "#",
      icon: IconChartBar,
    },
    {
      name: "Settings",
      url: "#",
      icon: IconSettings,
    },
  ],
}

export function AppSidebarRight({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" side="right" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Assistant</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
} 