'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { attendanceRecords, attendanceSummary, monthlyAttendance, weeklyAttendanceStats } from '@/data/attendance';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  Clock, LogIn, LogOut, CalendarDays, Users, AlertTriangle, CheckCircle2,
  Timer, TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const statusStyles: Record<string, { bg: string; text: string; dot: string }> = {
  present: { bg: 'bg-emerald-100 dark:bg-emerald-500/10', text: 'text-emerald-700 dark:text-emerald-400', dot: 'bg-emerald-500' },
  absent: { bg: 'bg-red-100 dark:bg-red-500/10', text: 'text-red-700 dark:text-red-400', dot: 'bg-red-500' },
  late: { bg: 'bg-amber-100 dark:bg-amber-500/10', text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-500' },
  'half-day': { bg: 'bg-blue-100 dark:bg-blue-500/10', text: 'text-blue-700 dark:text-blue-400', dot: 'bg-blue-500' },
  holiday: { bg: 'bg-purple-100 dark:bg-purple-500/10', text: 'text-purple-700 dark:text-purple-400', dot: 'bg-purple-500' },
  weekend: { bg: 'bg-gray-100 dark:bg-gray-500/10', text: 'text-gray-500 dark:text-gray-400', dot: 'bg-gray-400' },
};

export default function AttendancePage() {
  const [clockedIn, setClockedIn] = useState(false);

  return (
    <PageWrapper title="Attendance" subtitle="Track and manage employee attendance">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 neu-flat p-6 flex flex-col items-center justify-center"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
            {clockedIn ? 'Currently Working' : 'Not Clocked In'}
          </p>
          <p className="text-4xl font-bold font-mono tabular-nums mb-4">
            {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setClockedIn(!clockedIn)}
            className={cn(
              'w-32 h-32 rounded-full flex flex-col items-center justify-center text-white font-semibold transition-all shadow-xl',
              clockedIn
                ? 'bg-linear-to-br from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700'
                : 'bg-linear-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 glow-pulse'
            )}
          >
            {clockedIn ? <LogOut className="w-8 h-8 mb-1" /> : <LogIn className="w-8 h-8 mb-1" />}
            <span className="text-sm">{clockedIn ? 'Clock Out' : 'Clock In'}</span>
          </motion.button>
          {clockedIn && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-muted-foreground mt-3"
            >
              Clocked in at 09:05 AM • 4h 25m elapsed
            </motion.p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          <MiniStat icon={CheckCircle2} label="Present" value={attendanceSummary.present} total={attendanceSummary.totalDays} color="#10B981" />
          <MiniStat icon={AlertTriangle} label="Absent" value={attendanceSummary.absent} total={attendanceSummary.totalDays} color="#EF4444" />
          <MiniStat icon={Clock} label="Half Day" value={attendanceSummary.halfDay} total={attendanceSummary.totalDays} color="#3B82F6" />
          <MiniStat icon={Timer} label="Late" value={attendanceSummary.late} total={attendanceSummary.totalDays} color="#F59E0B" />
          <MiniStat icon={CalendarDays} label="Holidays" value={attendanceSummary.holidays} total={attendanceSummary.totalDays} color="#8B5CF6" />
          <div className="neu-flat p-4 flex flex-col items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary mb-1" />
            <p className="text-2xl font-bold">{attendanceSummary.percentage}%</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">This Month</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="neu-flat p-5 mb-6"
      >
        <h3 className="text-sm font-semibold mb-4">Monthly Attendance — June 2024</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs text-muted-foreground font-medium py-1">{day}</div>
          ))}
          {/* Offset for June 2024 starting Saturday */}
          {[...Array(6)].map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {monthlyAttendance.map((day) => {
            const style = statusStyles[day.status];
            const dayNum = new Date(day.date).getDate();
            return (
              <motion.div
                key={day.date}
                whileHover={{ scale: 1.1 }}
                className={cn(
                  'aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all text-xs',
                  style?.bg, style?.text
                )}
              >
                <span className="font-semibold">{dayNum}</span>
                <div className={cn('w-1.5 h-1.5 rounded-full mt-0.5', style?.dot)} />
              </motion.div>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-border/30">
          {Object.entries(statusStyles).map(([status, style]) => (
            <div key={status} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className={cn('w-2.5 h-2.5 rounded-full', style.dot)} />
              <span className="capitalize">{status}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="neu-flat p-5 mb-6"
      >
        <h3 className="text-sm font-semibold mb-4">Weekly Attendance Analytics</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyAttendanceStats} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'var(--neu-surface)', border: 'none', borderRadius: '12px', boxShadow: 'var(--neu-shadow-sm)', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="present" fill="#10B981" radius={[4, 4, 0, 0]} name="Present" />
              <Bar dataKey="late" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Late" />
              <Bar dataKey="absent" fill="#EF4444" radius={[4, 4, 0, 0]} name="Absent" />
              <Bar dataKey="halfDay" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Half Day" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="neu-flat overflow-hidden"
      >
        <div className="p-5 border-b border-border/50">
          <h3 className="text-sm font-semibold">Today&apos;s Attendance — Employee Presence Overview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Employee</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Clock In</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Clock Out</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Hours</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, i) => {
                const style = statusStyles[record.status];
                return (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.03 }}
                    className="border-b border-border/20 hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${record.employeeName.split(' ')[0]}`} />
                          <AvatarFallback className="text-xs">{record.employeeName[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{record.employeeName}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{record.clockIn}</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{record.clockOut}</td>
                    <td className="p-4 hidden lg:table-cell">
                      {record.hoursWorked > 0 ? (
                        <span className="font-medium">{record.hoursWorked}h</span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                      {record.overtime > 0 && (
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 ml-1">+{record.overtime}h OT</span>
                      )}
                    </td>
                    <td className="p-4">
                      <Badge className={cn('text-[10px] border-0 capitalize', style?.bg, style?.text)}>
                        {record.status}
                      </Badge>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </PageWrapper>
  );
}

function MiniStat({ icon: Icon, label, value, total, color }: { icon: typeof Clock; label: string; value: number; total: number; color: string }) {
  return (
    <div className="neu-flat p-4 flex flex-col items-center">
      <Icon className="w-5 h-5 mb-1" style={{ color }} />
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">{label}</p>
      <Progress value={(value / total) * 100} className="h-1 mt-2 w-full" />
    </div>
  );
}
