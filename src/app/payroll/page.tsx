'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { payrollRecords, samplePayslip, payrollAnalytics } from '@/data/payroll';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  Wallet, TrendingUp, TrendingDown, Users, IndianRupee,
  Download, Eye, Printer, FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const payStatusColors: Record<string, string> = {
  paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  pending: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  processing: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
};

export default function PayrollPage() {
  const [showPayslip, setShowPayslip] = useState(false);

  const totalGross = payrollRecords.reduce((s, r) => s + r.grossSalary, 0);
  const totalNet = payrollRecords.reduce((s, r) => s + r.netSalary, 0);
  const totalDeductions = payrollRecords.reduce((s, r) => s + r.deductions + r.tax + r.pf, 0);

  return (
    <PageWrapper title="Payroll" subtitle="Salary management and payslip generation">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: 'Total Payroll', value: `₹${(totalGross / 100000).toFixed(1)}L`, icon: Wallet, color: '#6366F1', trend: '+3.2%' },
          { title: 'Net Disbursed', value: `₹${(totalNet / 100000).toFixed(1)}L`, icon: IndianRupee, color: '#10B981', trend: '+2.8%' },
          { title: 'Total Deductions', value: `₹${(totalDeductions / 100000).toFixed(1)}L`, icon: TrendingDown, color: '#EF4444', trend: '-1.5%' },
          { title: 'Employees Paid', value: `${payrollRecords.filter((r) => r.status === 'paid').length}/${payrollRecords.length}`, icon: Users, color: '#8B5CF6' },
        ].map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="neu-flat p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.title}</p>
                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                {stat.trend && (
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-emerald-500" />
                    <span className="text-xs text-emerald-600 dark:text-emerald-400">{stat.trend}</span>
                  </div>
                )}
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="neu-flat p-5 mb-6"
      >
        <h3 className="text-sm font-semibold mb-4">Monthly Payroll Analytics</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={payrollAnalytics} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
              <Tooltip contentStyle={{ background: 'var(--neu-surface)', border: 'none', borderRadius: '12px', boxShadow: 'var(--neu-shadow-sm)', fontSize: '12px' }} formatter={(value: unknown) => [`₹${((value as number) / 100000).toFixed(1)}L`, '']} />
              <Legend wrapperStyle={{ fontSize: '11px' }} />
              <Bar dataKey="salary" fill="#6366F1" radius={[4, 4, 0, 0]} name="Salary" />
              <Bar dataKey="bonus" fill="#10B981" radius={[4, 4, 0, 0]} name="Bonus" />
              <Bar dataKey="deductions" fill="#EF4444" radius={[4, 4, 0, 0]} name="Deductions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="neu-flat overflow-hidden"
      >
        <div className="p-5 border-b border-border/50 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Employee Salary Table — June 2024</h3>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium neu-btn">
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Employee</th>
                <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Department</th>
                <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Gross</th>
                <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Deductions</th>
                <th className="text-right p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Net Pay</th>
                <th className="text-center p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-center p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payrollRecords.map((record, i) => (
                <motion.tr
                  key={record.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="border-b border-border/20 hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={record.employeeAvatar} />
                        <AvatarFallback className="text-xs">{record.employeeName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{record.employeeName}</p>
                        <p className="text-xs text-muted-foreground">{record.designation}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground hidden md:table-cell">{record.department}</td>
                  <td className="p-4 text-right hidden lg:table-cell">₹{record.grossSalary.toLocaleString('en-IN')}</td>
                  <td className="p-4 text-right text-red-500 hidden lg:table-cell">-₹{(record.deductions + record.tax + record.pf).toLocaleString('en-IN')}</td>
                  <td className="p-4 text-right font-semibold">₹{record.netSalary.toLocaleString('en-IN')}</td>
                  <td className="p-4 text-center">
                    <Badge className={cn('text-[10px] border-0 capitalize', payStatusColors[record.status])}>
                      {record.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => setShowPayslip(true)} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="View Payslip">
                        <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Download">
                        <Download className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <Dialog open={showPayslip} onOpenChange={setShowPayslip}>
        <DialogContent className="sm:max-w-2xl neu-flat border-0 p-0 overflow-hidden">
          <div className="gradient-primary p-6 text-white">
            <DialogTitle className="text-lg font-bold text-white">Payslip — {samplePayslip.month} {samplePayslip.year}</DialogTitle>
            <p className="text-white/80 text-sm mt-1">{samplePayslip.employeeName} • {samplePayslip.employeeId}</p>
            <p className="text-white/60 text-xs mt-0.5">{samplePayslip.designation} • {samplePayslip.department}</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Earnings</h4>
                {samplePayslip.earnings.map((e) => (
                  <div key={e.label} className="flex justify-between py-1.5 text-sm border-b border-border/20">
                    <span className="text-muted-foreground">{e.label}</span>
                    <span className="font-medium">₹{e.amount.toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div className="flex justify-between py-2 text-sm font-bold mt-1">
                  <span>Gross Earnings</span>
                  <span className="text-emerald-600">₹{samplePayslip.grossEarnings.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Deductions</h4>
                {samplePayslip.deductions.map((d) => (
                  <div key={d.label} className="flex justify-between py-1.5 text-sm border-b border-border/20">
                    <span className="text-muted-foreground">{d.label}</span>
                    <span className="font-medium text-red-500">-₹{d.amount.toLocaleString('en-IN')}</span>
                  </div>
                ))}
                <div className="flex justify-between py-2 text-sm font-bold mt-1">
                  <span>Total Deductions</span>
                  <span className="text-red-500">-₹{samplePayslip.totalDeductions.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 rounded-xl gradient-primary text-white flex items-center justify-between">
              <span className="font-semibold">Net Pay</span>
              <span className="text-2xl font-bold">₹{samplePayslip.netPay.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex gap-2 mt-4 justify-end">
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl neu-btn text-sm font-medium">
                <Printer className="w-4 h-4" /> Print
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-medium hover:opacity-90 shadow-lg">
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageWrapper>
  );
}
