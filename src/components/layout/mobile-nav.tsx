'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '@/hooks/use-sidebar';
import {
  LayoutDashboard, Users, CalendarCheck, CalendarOff, Wallet, CreditCard,
  Building2, Award, UserPlus, GraduationCap, BarChart3, UserCircle, Settings, X, Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'Employees', href: '/employees', icon: Users },
  { label: 'Attendance', href: '/attendance', icon: CalendarCheck },
  { label: 'Leave', href: '/leave', icon: CalendarOff },
  { label: 'Payroll', href: '/payroll', icon: Wallet },
  { label: 'Payments', href: '/payments', icon: CreditCard },
  { label: 'Departments', href: '/departments', icon: Building2 },
  { label: 'Performance', href: '/performance', icon: Award },
  { label: 'Recruitment', href: '/recruitment', icon: UserPlus },
  { label: 'Training', href: '/training', icon: GraduationCap },
  { label: 'Reports', href: '/reports', icon: BarChart3 },
  { label: 'Profile', href: '/profile', icon: UserCircle },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();
  const { mobileOpen, setMobileOpen } = useSidebar();

  return (
    <AnimatePresence>
      {mobileOpen && (
        <>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 lg:hidden backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-[280px] z-50 lg:hidden overflow-y-auto"
            style={{ background: 'var(--neu-surface)' }}
          >
            <div className="flex items-center justify-between h-16 px-4 border-b border-border/50">
              <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-linear-to-r from-[#6366F1] to-[#8B5CF6] bg-clip-text text-transparent">
                    HRMS Pro
                  </h1>
                  <p className="text-[10px] text-muted-foreground -mt-0.5">Employee Management</p>
                </div>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-xl hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="py-4 px-3 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200',
                      isActive
                        ? 'text-primary font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                    style={
                      isActive
                        ? { boxShadow: 'var(--neu-shadow-inset-sm)', background: 'var(--neu-surface)' }
                        : undefined
                    }
                  >
                    <Icon className={cn('w-5 h-5', isActive && 'text-primary')} />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
