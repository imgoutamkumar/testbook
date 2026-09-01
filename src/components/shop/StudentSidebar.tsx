import * as React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Compass,
  Package,
  History,
  BarChart2,
  CreditCard,
  Settings,
  GraduationCap,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar, // <-- Added this hook to control mobile state
} from "@/components/ui/sidebar";
import { NavMain } from "../admin/NavMain";

const data = {
  navGroups: [
    {
      label: "Learning & Practice",
      items: [
        { title: "Home", url: "/", icon: LayoutDashboard },
        { title: "Explore Exams", url: "/explore-exams", icon: Compass },
        { title: "Subscriptions", url: "/subscriptions", icon: Package },
      ],
    },
    {
      label: "Performance",
      items: [
        { title: "Attempt History", url: "/attempt-history", icon: History },
        { title: "Scoreboard & Ranks", url: "/liveleaderboard", icon: BarChart2 },
      ],
    },
    {
      label: "Account",
      items: [
        { title: "Billing & Transactions", url: "/purchase-history", icon: CreditCard },
        { title: "Settings", url: "/dashboard/settings", icon: Settings },
      ],
    },
  ],
};

const StudentSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  // Pull mobile state controller from Shadcn
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar 
      className="border-r border-sidebar-border/30 bg-sidebar/95 backdrop-blur-xl shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.2)]" 
      {...props}
    >
      {/* HEADER */}
      <SidebarHeader className="px-5 pt-6 pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="group h-auto hover:bg-transparent">
              <Link 
                to="/student-dashboard" 
                className="flex items-center gap-3 px-1"
                onClick={() => setOpenMobile(false)} // Close on mobile if logo is clicked
              >
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20 transition-transform duration-300 group-hover:scale-105">
                  <GraduationCap size={22} className="opacity-95" strokeWidth={1.5} />
                </div>
                <div className="grid flex-1 text-left">
                  <span className="truncate text-lg font-bold tracking-tight text-foreground">
                    PrepMaster
                  </span>
                  <span className="truncate text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mt-0.5">
                    Student Portal
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      
      {/* CONTENT */}
      <SidebarContent className="px-3 gap-y-6 mt-4">
        {data.navGroups.map((group) => (
          /* Wrap NavMain in a div to intercept clicks and auto-close the mobile sidebar */
          <div key={group.label} onClick={() => setOpenMobile(false)}>
            <NavMain label={group.label} items={group.items} />
          </div>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};

export default StudentSidebar;