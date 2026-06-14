'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '@/hooks/use-sidebar';
import { notifications as initialNotifications } from '@/data/dashboard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Menu, Search, Sun, Moon, Bell, ChevronDown,
  User, Settings, LogOut, HelpCircle, CheckCheck,
  X, Briefcase,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Notification } from '@/types';

const currentUser = {
  name: 'Rajesh Kumar',
  role: 'HR Administrator',
  email: 'rajesh.kumar@hrms.pro',
  avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Rajesh',
  employeeId: 'EMP-001',
};

const notifTypeColors: Record<string, string> = {
  success: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400',
  info:    'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400',
  warning: 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400',
  error:   'bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400',
};

function timeAgo(ts: string) {
  const diff = Date.now() - new Date(ts).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function NotificationsPanel({
  items,
  onMarkAll,
  onMarkOne,
  onClose,
}: {
  items: Notification[];
  onMarkAll: () => void;
  onMarkOne: (id: string) => void;
  onClose: () => void;
}) {
  const unread = items.filter((n) => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute right-0 top-full mt-2 w-80 z-50 rounded-2xl neu-flat overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
        <div>
          <p className="text-sm font-semibold">Notifications</p>
          {unread > 0 && (
            <p className="text-xs text-muted-foreground">{unread} unread</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unread > 0 && (
            <button
              onClick={onMarkAll}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] text-primary hover:bg-primary/10 transition-colors font-medium"
            >
              <CheckCheck className="w-3.5 h-3.5" /> Mark all
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-border/20">
        {items.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            All caught up! 🎉
          </div>
        ) : (
          items.map((n) => (
            <button
              key={n.id}
              onClick={() => onMarkOne(n.id)}
              className={cn(
                'w-full text-left px-4 py-3 hover:bg-muted/40 transition-colors flex items-start gap-3',
                !n.read && 'bg-primary/5'
              )}
            >
              <span
                className={cn(
                  'mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold',
                  notifTypeColors[n.type]
                )}
              >
                {n.type === 'success' ? '✓' : n.type === 'warning' ? '!' : n.type === 'error' ? '✕' : 'i'}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className={cn('text-xs font-semibold truncate', !n.read && 'text-foreground')}>{n.title}</p>
                  {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{n.message}</p>
                <p className="text-[10px] text-muted-foreground/70 mt-1">{timeAgo(n.timestamp)}</p>
              </div>
            </button>
          ))
        )}
      </div>

      <div className="px-4 py-2.5 border-t border-border/40">
        <Link
          href="/profile"
          onClick={onClose}
          className="text-xs text-primary font-medium hover:underline"
        >
          View all notifications →
        </Link>
      </div>
    </motion.div>
  );
}

function ProfileDropdown({ onClose }: { onClose: () => void }) {
  const menuItems = [
    { label: 'My Profile', icon: User, href: '/profile' },
    { label: 'My Work', icon: Briefcase, href: '/performance' },
    { label: 'Settings', icon: Settings, href: '/settings' },
    { label: 'Help & Support', icon: HelpCircle, href: '#' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="absolute right-0 top-full mt-2 w-64 z-50 rounded-2xl neu-flat overflow-hidden"
    >
      <div className="px-4 py-3 border-b border-border/40 flex items-center gap-3">
        <Avatar className="w-10 h-10 ring-2 ring-primary/20">
          <AvatarImage src={currentUser.avatar} />
          <AvatarFallback className="text-sm gradient-primary text-white">
            {currentUser.name[0]}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">{currentUser.name}</p>
          <p className="text-[11px] text-muted-foreground truncate">{currentUser.role}</p>
        </div>
      </div>

      <div className="py-1.5">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted/50 transition-colors"
          >
            <item.icon className="w-4 h-4 text-muted-foreground" />
            {item.label}
          </Link>
        ))}
      </div>

      <div className="border-t border-border/40 py-1.5">
        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </motion.div>
  );
}

export function Topbar() {
  const { setMobileOpen } = useSidebar();
  const { resolvedTheme, setTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

  const markAll = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markOne = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const closeAll = () => {
    setNotifOpen(false);
    setProfileOpen(false);
  };

  return (
    <>
      {(notifOpen || profileOpen) && (
        <div className="fixed inset-0 z-40" onClick={closeAll} />
      )}

      <header
        className="h-16 flex items-center gap-3 px-4 md:px-6 border-b border-border/40 shrink-0"
        style={{ background: 'var(--neu-surface)' }}
      >
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl neu-btn"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="flex-1 max-w-md">
          <AnimatePresence initial={false} mode="wait">
            {searchOpen ? (
              <motion.div
                key="open"
                initial={{ width: 48, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                exit={{ width: 48, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search employees, modules…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => { setSearchOpen(false); setSearchQuery(''); }}
                  className="w-full pl-9 pr-10 py-2 text-sm rounded-xl neu-input focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.button
                key="closed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl neu-btn text-sm text-muted-foreground w-full max-w-xs"
              >
                <Search className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline text-sm">Search…</span>
                <kbd className="ml-auto hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] border border-border/50 font-mono">
                  ⌘K
                </kbd>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl neu-btn relative overflow-hidden"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              {resolvedTheme === 'dark' ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-4.5 h-4.5 text-amber-500 w-[18px] h-[18px]" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-[18px] h-[18px] text-indigo-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <div className="relative">
            <button
              onClick={() => { setNotifOpen((v) => !v); setProfileOpen(false); }}
              className="p-2 rounded-xl neu-btn relative"
              aria-label="Notifications"
            >
              <Bell className="w-[18px] h-[18px] text-muted-foreground" />
              {unreadCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </motion.span>
              )}
            </button>
            <AnimatePresence>
              {notifOpen && (
                <NotificationsPanel
                  items={notifications}
                  onMarkAll={markAll}
                  onMarkOne={markOne}
                  onClose={() => setNotifOpen(false)}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              onClick={() => { setProfileOpen((v) => !v); setNotifOpen(false); }}
              className="flex items-center gap-2 px-2 py-1.5 rounded-xl neu-btn"
              aria-label="Profile menu"
            >
              <Avatar className="w-7 h-7">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback className="text-xs gradient-primary text-white">
                  {currentUser.name[0]}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold leading-tight">{currentUser.name.split(' ')[0]}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">{currentUser.role}</p>
              </div>
              <ChevronDown
                className={cn(
                  'w-3.5 h-3.5 text-muted-foreground hidden md:block transition-transform duration-200',
                  profileOpen && 'rotate-180'
                )}
              />
            </button>
            <AnimatePresence>
              {profileOpen && (
                <ProfileDropdown onClose={() => setProfileOpen(false)} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </>
  );
}
