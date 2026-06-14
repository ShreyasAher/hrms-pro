'use client';

import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { StatCard } from '@/components/dashboard/stat-card';
import { DepartmentChart } from '@/components/dashboard/department-chart';
import { GrowthChart } from '@/components/dashboard/growth-chart';
import { ActivityTimeline } from '@/components/dashboard/activity-timeline';
import { UpcomingEvents, Announcements } from '@/components/dashboard/events-announcements';
import { dashboardStats } from '@/data/dashboard';
import {
  Users,
  UserCheck,
  UserPlus,
  UserMinus,
  CalendarCheck,
  Wallet,
} from 'lucide-react';

export default function DashboardPage() {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <PageWrapper>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl p-6 md:p-8 mb-6 animated-gradient text-white"
      >
        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold">
            {greeting()}, Admin! 👋
          </h1>
          <p className="text-white/80 mt-1.5 text-sm md:text-base max-w-lg">
            Here&apos;s what&apos;s happening with your team today. You have{' '}
            <span className="font-semibold text-white">3 pending</span> leave requests and{' '}
            <span className="font-semibold text-white">2 interviews</span> scheduled.
          </p>
        </div>
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -right-4 -bottom-12 w-32 h-32 rounded-full bg-white/5" />
        <div className="absolute right-24 top-4 w-16 h-16 rounded-full bg-white/10" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <StatCard
          title="Total Employees"
          value={dashboardStats.totalEmployees}
          icon={Users}
          color="#6366F1"
          trend={{ value: 5.2, label: 'vs last month' }}
          delay={0.1}
        />
        <StatCard
          title="Active"
          value={dashboardStats.activeEmployees}
          icon={UserCheck}
          color="#10B981"
          trend={{ value: 2.1, label: 'vs last month' }}
          delay={0.15}
        />
        <StatCard
          title="New Joinees"
          value={dashboardStats.newJoinees}
          icon={UserPlus}
          color="#8B5CF6"
          subtitle="This month"
          delay={0.2}
        />
        <StatCard
          title="On Leave"
          value={dashboardStats.onLeave}
          icon={UserMinus}
          color="#F59E0B"
          subtitle="Today"
          delay={0.25}
        />
        <StatCard
          title="Attendance"
          value={`${dashboardStats.attendancePercentage}%`}
          icon={CalendarCheck}
          color="#EC4899"
          trend={{ value: 1.5, label: 'vs last week' }}
          delay={0.3}
        />
        <StatCard
          title="Payroll"
          value={`₹${(dashboardStats.payrollTotal / 100000).toFixed(1)}L`}
          icon={Wallet}
          color="#14B8A6"
          subtitle="This month"
          delay={0.35}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        <div className="lg:col-span-2">
          <DepartmentChart />
        </div>
        <div className="lg:col-span-3">
          <GrowthChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ActivityTimeline />
        <UpcomingEvents />
        <Announcements />
      </div>
    </PageWrapper>
  );
}
