"use client";

import {useState, useEffect} from "react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  Wallet,
  BarChart3,
  Menu,
  X,
  Calculator,
  Clock,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";

const sidebarLinks = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Borrowers",
    href: "/dashboard/borrowers",
    icon: Users,
  },
  {
    title: "Lendings",
    href: "/dashboard/lendings",
    icon: Wallet,
  },
  {
    title: "Calculator",
    href: "/dashboard/calculator",
    icon: Calculator,
  },
  {
    title: "Due Dates",
    href: "/dashboard/due-dates",
    icon: Clock,
  },
  {
    title: "Schedule",
    href: "/dashboard/schedule",
    icon: Calendar,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsSidebarOpen(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Overlay for mobile */}
      {isSidebarOpen && isMobile && (
        <div
          className='fixed inset-0 z-30 bg-black/50 lg:hidden'
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-[280px] transform border-r border-gray-200 bg-white transition-transform duration-200 ease-in-out lg:w-64",
          !isSidebarOpen && "-translate-x-full"
        )}>
        <div className='flex h-16 items-center justify-between border-b border-gray-200 px-4'>
          <h1 className='text-xl font-bold text-gray-900'>Loan Guider</h1>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setIsSidebarOpen(false)}
            className='lg:hidden'>
            <X className='h-5 w-5' />
          </Button>
        </div>
        <nav className='space-y-1 p-4'>
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-gray-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                )}>
                <Icon className='h-5 w-5 flex-shrink-0' />
                <span>{link.title}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div
        className={cn(
          "min-h-screen transition-margin duration-200 ease-in-out",
          isSidebarOpen ? "lg:ml-64" : "ml-0"
        )}>
        {/* Header */}
        <header className='sticky top-0 z-20 border-b border-gray-200 bg-white'>
          <div className='flex h-16 items-center justify-between px-4 sm:px-6'>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className='flex-shrink-0'>
              <Menu className='h-5 w-5' />
            </Button>
            <div className='flex items-center space-x-4'>
              <Button variant='outline' className='hidden sm:inline-flex'>
                Profile
              </Button>
              <Button variant='ghost' size='icon' className='sm:hidden'>
                <Users className='h-5 w-5' />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className='p-4 sm:p-6 lg:p-8'>{children}</main>
      </div>
    </div>
  );
}
