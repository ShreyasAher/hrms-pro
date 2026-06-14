'use client';

import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { employees } from '@/data/employees';
import { skills, certifications } from '@/data/training';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Mail, Phone, MapPin, Building2, Calendar, Briefcase, GraduationCap,
  FileText, Award, Clock, Edit, Camera, Shield,
} from 'lucide-react';

const emp = employees[0]; // Current user profile

export default function ProfilePage() {
  return (
    <PageWrapper title="My Profile" subtitle="View and manage your personal information">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="neu-flat overflow-hidden mb-6">
        <div className="gradient-primary p-8 relative">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              <Avatar className="w-28 h-28 ring-4 ring-white/20">
                <AvatarImage src={emp.avatar} />
                <AvatarFallback className="bg-white/20 text-white text-4xl">{emp.firstName[0]}{emp.lastName[0]}</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors">
                <Camera className="w-4 h-4 text-white" />
              </button>
            </div>
            <div className="text-center md:text-left text-white flex-1">
              <h1 className="text-3xl font-bold">{emp.firstName} {emp.lastName}</h1>
              <p className="text-white/80 mt-1 text-lg">{emp.designation}</p>
              <div className="flex flex-wrap items-center gap-2 mt-3 justify-center md:justify-start">
                <Badge className="bg-white/20 text-white border-0">{emp.employeeId}</Badge>
                <Badge className="bg-white/20 text-white border-0">{emp.department}</Badge>
                <Badge className="bg-white/20 text-white border-0">{emp.role}</Badge>
              </div>
            </div>
            <button className="px-4 py-2 rounded-xl bg-white/20 text-white text-sm font-medium hover:bg-white/30 transition-colors flex items-center gap-2 backdrop-blur-sm">
              <Edit className="w-4 h-4" /> Edit Profile
            </button>
          </div>
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute -right-4 -bottom-12 w-32 h-32 rounded-full bg-white/5" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
          <QuickInfo icon={Mail} label="Email" value={emp.email} />
          <QuickInfo icon={Phone} label="Phone" value={emp.phone} />
          <QuickInfo icon={MapPin} label="Location" value={`${emp.city}, ${emp.state}`} />
          <QuickInfo icon={Calendar} label="Joined" value={new Date(emp.joiningDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} />
        </div>
      </motion.div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList className="neu-flat-sm p-1 bg-transparent h-auto flex flex-wrap gap-1">
          {['personal', 'skills', 'experience', 'documents', 'performance', 'attendance'].map((tab) => (
            <TabsTrigger key={tab} value={tab} className="rounded-lg text-xs capitalize data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2">
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="personal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neu-flat p-5 space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Personal Details</h3>
              <InfoRow label="Full Name" value={`${emp.firstName} ${emp.lastName}`} />
              <InfoRow label="Gender" value={emp.gender} />
              <InfoRow label="Date of Birth" value={new Date(emp.dateOfBirth).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })} />
              <InfoRow label="Email" value={emp.email} />
              <InfoRow label="Phone" value={emp.phone} />
              <InfoRow label="Employee ID" value={emp.employeeId} />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neu-flat p-5 space-y-3">
              <h3 className="font-semibold text-sm flex items-center gap-2"><Building2 className="w-4 h-4 text-primary" /> Work Details</h3>
              <InfoRow label="Department" value={emp.department} />
              <InfoRow label="Designation" value={emp.designation} />
              <InfoRow label="Role" value={emp.role} />
              <InfoRow label="Manager" value={emp.manager || 'None'} />
              <InfoRow label="Address" value={`${emp.address}, ${emp.city}`} />
              <InfoRow label="Country" value={emp.country} />
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="skills">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neu-flat p-5">
              <h3 className="font-semibold text-sm mb-4">My Skills</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {emp.skills.map((skill) => <Badge key={skill} variant="secondary" className="px-3 py-1.5">{skill}</Badge>)}
              </div>
              <h3 className="font-semibold text-sm mb-3">Proficiency</h3>
              <div className="space-y-3">
                {skills.slice(0, 5).map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}/{skill.maxLevel}</span>
                    </div>
                    <Progress value={(skill.level / skill.maxLevel) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neu-flat p-5">
              <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" /> Certifications
              </h3>
              <div className="space-y-3">
                {certifications.filter((c) => c.status === 'active').map((cert) => (
                  <div key={cert.id} className="p-3 rounded-xl border border-border/30">
                    <p className="text-sm font-medium">{cert.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{cert.issuer}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      Issued: {new Date(cert.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                      {cert.expiryDate && ` • Expires: ${new Date(cert.expiryDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}`}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="experience">
          <div className="space-y-4">
            {emp.experience.map((exp) => (
              <motion.div key={exp.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neu-flat p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Briefcase className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">{exp.role}</h4>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(exp.startDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })} — {new Date(exp.endDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}
                  </p>
                  <p className="text-sm mt-2">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <div className="space-y-3">
            {emp.documents.map((doc) => (
              <motion.div key={doc.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neu-flat p-4 flex items-center gap-3 cursor-pointer hover:scale-[1.005] transition-transform">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center"><FileText className="w-5 h-5 text-red-500" /></div>
                <div className="flex-1"><p className="text-sm font-medium">{doc.name}</p><p className="text-xs text-muted-foreground">{doc.size} • {doc.type}</p></div>
                <span className="text-xs text-muted-foreground">{new Date(doc.uploadDate).toLocaleDateString('en-IN')}</span>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neu-flat p-5 text-center">
              <Award className="w-8 h-8 text-primary mx-auto mb-2" /><p className="text-3xl font-bold">4.2</p><p className="text-xs text-muted-foreground mt-1">Overall Rating</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neu-flat p-5 text-center">
              <GraduationCap className="w-8 h-8 text-emerald-500 mx-auto mb-2" /><p className="text-3xl font-bold">3</p><p className="text-xs text-muted-foreground mt-1">Certifications</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neu-flat p-5 text-center">
              <Clock className="w-8 h-8 text-amber-500 mx-auto mb-2" /><p className="text-3xl font-bold">92%</p><p className="text-xs text-muted-foreground mt-1">Task Completion</p>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="attendance">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neu-flat p-5 text-center">
              <p className="text-3xl font-bold text-emerald-500">19</p><p className="text-xs text-muted-foreground mt-1">Present</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neu-flat p-5 text-center">
              <p className="text-3xl font-bold text-red-500">1</p><p className="text-xs text-muted-foreground mt-1">Absent</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neu-flat p-5 text-center">
              <p className="text-3xl font-bold text-amber-500">1</p><p className="text-xs text-muted-foreground mt-1">Late</p>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="neu-flat p-5 text-center">
              <p className="text-3xl font-bold text-primary">90.9%</p><p className="text-xs text-muted-foreground mt-1">Rate</p>
            </motion.div>
          </div>
        </TabsContent>
      </Tabs>
    </PageWrapper>
  );
}

function QuickInfo({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0"><Icon className="w-4 h-4 text-primary" /></div>
      <div className="min-w-0"><p className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</p><p className="text-sm font-medium truncate">{value}</p></div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-1.5 border-b border-border/30 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium capitalize">{value}</span>
    </div>
  );
}
