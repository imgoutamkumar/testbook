import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import StudentSidebar from './StudentSidebar';
import StudentNavbar from './StudentNavbar';

const StudentLayout = () => {
  return (
    <SidebarProvider>
      {/* Shadcn automatically handles mobile sliding & backdrop overlay here */}
      <StudentSidebar />
      
      {/* SidebarInset ensures content shifts correctly on desktop when sidebar opens/closes */}
      <SidebarInset className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden bg-[#f8fafc] dark:bg-zinc-950">
        
        <StudentNavbar />
        
        {/* Main scrollable content area */}
        <main className="flex-1 w-full overflow-y-auto overflow-x-hidden scroll-smooth">
          {/* We keep the max-w-7xl here so your dashboard component stays perfectly centered */}
          <div className="w-full h-full">
            <Outlet />
          </div>
        </main>

      </SidebarInset>
    </SidebarProvider>
  );
};

export default StudentLayout;