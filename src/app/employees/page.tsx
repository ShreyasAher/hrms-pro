'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { employees } from '@/data/employees';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Search,
  LayoutGrid,
  List,
  Plus,
  Mail,
  Phone,
  MapPin,
  Building2,
  Calendar,
  Filter,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { EmptyState } from '@/components/shared/empty-state';
import type { Employee } from '@/types';

const statusColors: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400',
  inactive: 'bg-gray-100 text-gray-600 dark:bg-gray-500/10 dark:text-gray-400',
  'on-leave': 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  terminated: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
};

const departments = [...new Set(employees.map((e) => e.department))];

export default function EmployeesPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const filtered = employees.filter((emp) => {
    const matchesSearch =
      `${emp.firstName} ${emp.lastName} ${emp.designation} ${emp.employeeId}`
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesDept = departmentFilter === 'all' || emp.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  return (
    <PageWrapper title="Employees" subtitle="Manage your organization's workforce">
      
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, designation, ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl neu-input focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={departmentFilter} onValueChange={(value) => setDepartmentFilter(value ?? "all")}>
            <SelectTrigger className="w-[160px] rounded-xl neu-flat-sm border-0 text-sm h-[42px]">
              <Building2 className="w-4 h-4 mr-1 text-muted-foreground" />
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent className="neu-flat border-0">
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter}  onValueChange={(value) => setStatusFilter(value ?? "all")}>
            <SelectTrigger className="w-[130px] rounded-xl neu-flat-sm border-0 text-sm h-[42px]">
              <Filter className="w-4 h-4 mr-1 text-muted-foreground" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="neu-flat border-0">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="on-leave">On Leave</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center rounded-xl overflow-hidden neu-flat-sm">
            <button
              onClick={() => setView('grid')}
              className={cn('p-2.5 transition-all', view === 'grid' ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground')}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={cn('p-2.5 transition-all', view === 'list' ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground')}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Employee</span>
          </button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mb-4">{filtered.length} employees found</p>

      {filtered.length === 0 && (
        <EmptyState
          variant="search"
          title={search || departmentFilter !== 'all' || statusFilter !== 'all' ? 'No employees match your filters' : 'No employees yet'}
          description={search ? `No results for "${search}". Try a different search term.` : 'Try adjusting your filters or add a new employee.'}
          action={filtered.length === 0 && !search ? { label: 'Add Employee', onClick: () => setShowAddForm(true) } : undefined}
        />
      )}

      {view === 'grid' && filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filtered.map((emp, i) => (
              <motion.div
                key={emp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                onClick={() => setSelectedEmployee(emp)}
                className="neu-flat p-5 cursor-pointer group hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-16 h-16 ring-2 ring-border/50 group-hover:ring-primary/30 transition-all">
                    <AvatarImage src={emp.avatar} />
                    <AvatarFallback className="gradient-primary text-white text-lg">
                      {emp.firstName[0]}{emp.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold mt-3 text-sm">
                    {emp.firstName} {emp.lastName}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{emp.designation}</p>
                  <Badge variant="secondary" className="mt-2 text-[10px]">
                    {emp.department}
                  </Badge>
                  <Badge className={cn('mt-1.5 text-[10px] border-0', statusColors[emp.status])}>
                    {emp.status}
                  </Badge>
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/40 w-full justify-center">
                    <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Email">
                      <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Call">
                      <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                    <Link href={`/employees/${emp.id}`} className="p-1.5 rounded-lg hover:bg-muted transition-colors" title="Profile">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {view === 'list' && filtered.length > 0 && (
        <div className="neu-flat overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Employee</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Designation</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Department</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Joining Date</th>
                  <th className="text-left p-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((emp, i) => (
                  <motion.tr
                    key={emp.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelectedEmployee(emp)}
                    className="border-b border-border/30 hover:bg-muted/30 cursor-pointer transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9">
                          <AvatarImage src={emp.avatar} />
                          <AvatarFallback className="text-xs">{emp.firstName[0]}{emp.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{emp.firstName} {emp.lastName}</p>
                          <p className="text-xs text-muted-foreground">{emp.employeeId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{emp.designation}</td>
                    <td className="p-4 hidden lg:table-cell">
                      <Badge variant="secondary" className="text-[10px]">{emp.department}</Badge>
                    </td>
                    <td className="p-4 text-muted-foreground hidden lg:table-cell">
                      {new Date(emp.joiningDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="p-4">
                      <Badge className={cn('text-[10px] border-0', statusColors[emp.status])}>{emp.status}</Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Dialog open={!!selectedEmployee} onOpenChange={() => setSelectedEmployee(null)}>
        <DialogContent className="sm:max-w-lg neu-flat border-0 p-0 overflow-hidden">
          {selectedEmployee && (
            <>
              <div className="gradient-primary p-6 text-white">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 ring-2 ring-white/30">
                    <AvatarImage src={selectedEmployee.avatar} />
                    <AvatarFallback className="bg-white/20 text-white text-xl">
                      {selectedEmployee.firstName[0]}{selectedEmployee.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-xl font-bold text-white">
                      {selectedEmployee.firstName} {selectedEmployee.lastName}
                    </DialogTitle>
                    <p className="text-white/80 text-sm">{selectedEmployee.designation}</p>
                    <Badge className="mt-1 bg-white/20 text-white border-0 text-xs">
                      {selectedEmployee.employeeId}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <InfoItem icon={Building2} label="Department" value={selectedEmployee.department} />
                  <InfoItem icon={MapPin} label="Location" value={`${selectedEmployee.city}, ${selectedEmployee.state}`} />
                  <InfoItem icon={Mail} label="Email" value={selectedEmployee.email} />
                  <InfoItem icon={Phone} label="Phone" value={selectedEmployee.phone} />
                  <InfoItem icon={Calendar} label="Joined" value={new Date(selectedEmployee.joiningDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} />
                  <InfoItem icon={Filter} label="Status" value={selectedEmployee.status} />
                </div>
                {selectedEmployee.skills.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedEmployee.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex gap-2 pt-2">
                  <Link
                    href={`/employees/${selectedEmployee.id}`}
                    className="flex-1 py-2.5 rounded-xl gradient-primary text-white text-sm font-medium text-center hover:opacity-90 transition-opacity"
                  >
                    View Full Profile
                  </Link>
                  <button className="flex-1 py-2.5 rounded-xl neu-btn text-sm font-medium text-center">
                    Edit Employee
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="sm:max-w-2xl neu-flat border-0">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">First Name</label>
              <input className="w-full mt-1 px-3 py-2.5 text-sm rounded-xl neu-input focus:outline-none" placeholder="Enter first name" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Last Name</label>
              <input className="w-full mt-1 px-3 py-2.5 text-sm rounded-xl neu-input focus:outline-none" placeholder="Enter last name" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Email</label>
              <input className="w-full mt-1 px-3 py-2.5 text-sm rounded-xl neu-input focus:outline-none" type="email" placeholder="email@company.com" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Phone</label>
              <input className="w-full mt-1 px-3 py-2.5 text-sm rounded-xl neu-input focus:outline-none" placeholder="+91 XXXXX XXXXX" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Department</label>
              <select className="w-full mt-1 px-3 py-2.5 text-sm rounded-xl neu-input focus:outline-none">
                <option value="">Select department</option>
                {departments.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Designation</label>
              <input className="w-full mt-1 px-3 py-2.5 text-sm rounded-xl neu-input focus:outline-none" placeholder="Job title" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Joining Date</label>
              <input className="w-full mt-1 px-3 py-2.5 text-sm rounded-xl neu-input focus:outline-none" type="date" />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Salary</label>
              <input className="w-full mt-1 px-3 py-2.5 text-sm rounded-xl neu-input focus:outline-none" type="number" placeholder="Monthly salary" />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button onClick={() => setShowAddForm(false)} className="px-5 py-2.5 rounded-xl neu-btn text-sm font-medium">
              Cancel
            </button>
            <button className="px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg">
              Add Employee
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </PageWrapper>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
      <div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-sm font-medium mt-0.5 break-all">{value}</p>
      </div>
    </div>
  );
}
