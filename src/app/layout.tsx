import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SidebarProvider } from "@/hooks/use-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { MobileNav } from "@/components/layout/mobile-nav";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HRMS Pro — Employee Management System",
  description:
    "A premium, enterprise-grade Human Resource Management System with modern Neumorphic UI design. Manage employees, attendance, payroll, and more.",
  keywords: ["HRMS", "Employee Management", "HR Software", "Payroll", "Attendance"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full font-sans">
        <ThemeProvider>
          <SidebarProvider>
            <TooltipProvider delayDuration={200}>
              <div className="flex h-screen overflow-hidden">
                <Sidebar />

                <MobileNav />

                <div className="flex-1 flex flex-col overflow-hidden">
                  <Topbar />
                  <main className="flex-1 overflow-y-auto">
                    {children}
                  </main>
                </div>
              </div>
            </TooltipProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
