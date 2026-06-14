'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { leaveRequests, leaveBalances, holidays } from '@/data/leave';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import {
  CalendarOff, Calendar, Plus, Clock, CheckCircle2, XCircle, AlertCircle,
  Palmtree, Building2, Flag,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const statusIcons: Record<string, typeof Clock> = {
  pending: Clock,
  approved: CheckCircle2,
  rejected: XCircle,
};

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  rejected: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
};

const holidayIcons: Record<string, typeof Flag> = {
  public: Flag,
  optional: AlertCircle,
  company: Building2,
};

export default function LeavePage() {
  const [showApplyForm, setShowApplyForm] = useState(false);

  const pending = leaveRequests.filter((r) => r.status === 'pending');
  const approved = leaveRequests.filter((r) => r.status === 'approved');
  const rejected = leaveRequests.filter((r) => r.status === 'rejected');

  return (
    <PageWrapper title="Leave Management" subtitle="Apply for leave and track requests">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {leaveBalances.map((balance, i) => (
          <motion.div
            key={balance.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="neu-flat p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${balance.color}15` }}>
                <CalendarOff className="w-4 h-4" style={{ color: balance.color }} />
              </div>
              <span className="text-lg font-bold" style={{ color: balance.color }}>{balance.remaining}</span>
            </div>
            <p className="text-xs font-medium truncate">{balance.label}</p>
            <Progress value={(balance.used / balance.total) * 100} className="h-1.5 mt-2" />
            <p className="text-[10px] text-muted-foreground mt-1">{balance.used}/{balance.total} used</p>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <div />
        <button
          onClick={() => setShowApplyForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg"
        >
          <Plus className="w-4 h-4" /> Apply Leave
        </button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="neu-flat-sm p-1 bg-transparent h-auto">
          <TabsTrigger value="all" className="rounded-lg text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">
            All ({leaveRequests.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="rounded-lg text-xs data-[state=active]:bg-amber-500 data-[state=active]:text-white px-4 py-2">
            Pending ({pending.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="rounded-lg text-xs data-[state=active]:bg-emerald-500 data-[state=active]:text-white px-4 py-2">
            Approved ({approved.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="rounded-lg text-xs data-[state=active]:bg-red-500 data-[state=active]:text-white px-4 py-2">
            Rejected ({rejected.length})
          </TabsTrigger>
        </TabsList>

        {['all', 'pending', 'approved', 'rejected'].map((tab) => {
          const data = tab === 'all' ? leaveRequests : tab === 'pending' ? pending : tab === 'approved' ? approved : rejected;
          return (
            <TabsContent key={tab} value={tab}>
              <div className="space-y-3">
                {data.map((request, i) => {
                  const StatusIcon = statusIcons[request.status];
                  return (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="neu-flat p-4 flex items-start gap-4 hover:scale-[1.005] transition-transform"
                    >
                      <Avatar className="w-10 h-10 shrink-0">
                        <AvatarImage src={request.employeeAvatar} />
                        <AvatarFallback className="text-xs">{request.employeeName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium text-sm">{request.employeeName}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Leave • {request.days} day{request.days > 1 ? 's' : ''}
                            </p>
                          </div>
                          <Badge className={cn('text-[10px] border-0 flex items-center gap-1', statusColors[request.status])}>
                            <StatusIcon className="w-3 h-3" />
                            {request.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(request.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} — {new Date(request.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">&ldquo;{request.reason}&rdquo;</p>
                        {request.status === 'pending' && (
                          <div className="flex gap-2 mt-3">
                            <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">
                              Approve
                            </button>
                            <button className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-colors">
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="neu-flat p-5 mt-6"
      >
        <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
          <Palmtree className="w-4 h-4 text-emerald-500" /> Holiday Calendar — 2024
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {holidays.map((holiday) => {
            const Icon = holidayIcons[holiday.type] || Flag;
            return (
              <div key={holiday.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{holiday.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(holiday.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <Badge variant="secondary" className="text-[10px] capitalize">{holiday.type}</Badge>
              </div>
            );
          })}
        </div>
      </motion.div>

      <Dialog open={showApplyForm} onOpenChange={setShowApplyForm}>
        <DialogContent className="sm:max-w-lg neu-flat border-0">
          <DialogHeader>
            <DialogTitle>Apply for Leave</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Leave Type</label>
              <select className="w-full mt-1 px-3 py-2.5 text-sm rounded-xl neu-input focus:outline-none">
                <option value="">Select leave type</option>
                {leaveBalances.map((b) => <option key={b.type} value={b.type}>{b.label} ({b.remaining} remaining)</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">From Date</label>
                <input className="w-full mt-1 px-3 py-2.5 text-sm rounded-xl neu-input focus:outline-none" type="date" />
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground">To Date</label>
                <input className="w-full mt-1 px-3 py-2.5 text-sm rounded-xl neu-input focus:outline-none" type="date" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Reason</label>
              <textarea className="w-full mt-1 px-3 py-2.5 text-sm rounded-xl neu-input focus:outline-none resize-none h-24" placeholder="Enter reason for leave..." />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowApplyForm(false)} className="px-5 py-2.5 rounded-xl neu-btn text-sm font-medium">
                Cancel
              </button>
              <button className="px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg">
                Submit Request
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageWrapper>
  );
}
