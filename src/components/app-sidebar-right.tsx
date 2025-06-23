"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RightSidebar } from "@/components/ui/dual-sidebar"
import {
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { 
  Paperclip, 
  Mic,
  Sparkles,
  LayoutGrid,
  ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"

export function AppSidebarRight({ ...props }: React.ComponentProps<typeof RightSidebar>) {
  const [message, setMessage] = React.useState("")
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleFileUpload = () => {
    fileInputRef.current?.click()
  }

  const quickActions = [
    "Organize my inbox",
    "Find urgent emails", 
    "Plan my day"
  ]

  return (
    <RightSidebar {...props}>
      {/* Header */}
      <SidebarHeader className="p-0">
      </SidebarHeader>
      
      <SidebarContent className="flex flex-col p-0">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-md space-y-6">
            {/* Welcome Message */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-6">
                How can I help you today?
              </h3>
            </div>

            {/* Input Area */}
            <div className="w-full border border-input rounded-lg bg-background p-4 space-y-3">
              <div className="relative">
                <textarea
                  placeholder="Find, write, schedule, organize, ask anything..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full min-h-[80px] px-0 py-2 text-sm border-none resize-none focus:outline-none bg-transparent placeholder:text-muted-foreground"
                  rows={3}
                />
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-1">
                  {/* File Upload */}
                  <div className="flex items-center">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleFileUpload}
                      className="p-2 h-8 w-8 hover:bg-accent"
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Sparkles Button */}
                  <Button variant="ghost" size="sm" className="p-2 h-8 w-8 hover:bg-accent">
                    <Sparkles className="h-4 w-4" />
                  </Button>

                  {/* Grid/Integrations Button */}
                  <Button variant="ghost" size="sm" className="p-2 h-8 w-8 hover:bg-accent">
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Model Selector */}
                  <Button variant="ghost" size="sm" className="px-3 py-1 h-7 text-xs hover:bg-accent">
                    <span>Standard</span>
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>

                  {/* Microphone */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 h-7 w-7 hover:bg-accent"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "text-xs px-3 py-2 h-auto rounded-full border border-border hover:bg-accent hover:text-accent-foreground",
                    index === 0 && "bg-accent text-accent-foreground"
                  )}
                >
                  {action}
                </Button>
              ))}
            </div>

            {/* What can I ask section */}
            <div className="pt-6">
              <h6 className="text-sm font-medium text-muted-foreground mb-2">
                What can I ask?
              </h6>
            </div>
          </div>
        </div>
      </SidebarContent>
      
      {/* Footer */}
      <SidebarFooter className="p-3 border-t">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              You are on the Premier plan
            </span>
            <span className="text-xs">🎉</span>
          </div>
        </div>
      </SidebarFooter>
    </RightSidebar>
  )
} 