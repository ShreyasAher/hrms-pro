'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Settings2, Palette, Bell, Shield,
  Sun, Moon, Monitor, CheckCircle2, Save,
} from 'lucide-react';
import { cn } from '@/lib/utils';

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="neu-flat p-6">
      <div className="mb-5">
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function ToggleRow({
  id,
  label,
  description,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <Label htmlFor={id} className="text-sm font-medium cursor-pointer">
          {label}
        </Label>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}

function ThemeCard({
  value,
  label,
  icon: Icon,
  selected,
  onClick,
}: {
  value: string;
  label: string;
  icon: typeof Sun;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
        selected
          ? 'border-primary bg-primary/5'
          : 'border-transparent neu-flat-sm hover:border-primary/30'
      )}
    >
      <Icon className={cn('w-5 h-5', selected ? 'text-primary' : 'text-muted-foreground')} />
      <span className={cn('text-xs font-medium', selected ? 'text-primary' : 'text-muted-foreground')}>
        {label}
      </span>
      {selected && <CheckCircle2 className="w-4 h-4 text-primary" />}
    </button>
  );
}

function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-end pt-2">
      <button
        onClick={onClick}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white text-sm font-medium hover:opacity-90 transition-opacity shadow-lg"
      >
        <Save className="w-4 h-4" />
        Save Changes
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  
  const [companyName, setCompanyName] = useState('HRMS Pro Pvt. Ltd.');
  const [companyAddress, setCompanyAddress] = useState('123, Tech Park, Whitefield, Bangalore - 560066');
  const [currency, setCurrency] = useState('INR');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [timezone, setTimezone] = useState('Asia/Kolkata');

 
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [leaveNotifs, setLeaveNotifs] = useState(true);
  const [attendanceNotifs, setAttendanceNotifs] = useState(true);
  const [payrollNotifs, setPayrollNotifs] = useState(true);
  const [announcementNotifs, setAnnouncementNotifs] = useState(false);

  
  const [twoFactor, setTwoFactor] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [passwordExpiry, setPasswordExpiry] = useState(false);

  const showSavedToast = () => {
    
    const el = document.createElement('div');
    el.className = 'fixed bottom-6 right-6 z-[999] px-4 py-3 rounded-xl gradient-primary text-white text-sm font-medium shadow-xl flex items-center gap-2';
    el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Settings saved!';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2500);
  };

  const tabTriggerClass =
    'flex items-center gap-2 px-4 py-2.5 text-sm rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm transition-all';

  return (
    <PageWrapper title="Settings" subtitle="Manage your account and application preferences">
      <Tabs defaultValue="general" orientation="vertical" className="flex flex-col sm:flex-row gap-6">
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="sm:w-52 shrink-0"
        >
          <div className="neu-flat p-2">
            <TabsList className="flex sm:flex-col w-full h-auto bg-transparent gap-1 p-0">
              {[
                { value: 'general', label: 'General', icon: Settings2 },
                { value: 'appearance', label: 'Appearance', icon: Palette },
                { value: 'notifications', label: 'Notifications', icon: Bell },
                { value: 'security', label: 'Security', icon: Shield },
              ].map(({ value, label, icon: Icon }) => (
                <TabsTrigger key={value} value={value} className={tabTriggerClass}>
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </motion.div>

        <div className="flex-1 min-w-0">
          <TabsContent value="general" className="mt-0 space-y-4">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Section
                title="Company Profile"
                description="Basic information about your organisation"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="companyName" className="text-xs text-muted-foreground uppercase tracking-wider">
                      Company Name
                    </Label>
                    <Input
                      id="companyName"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="rounded-xl neu-input border-0 focus-visible:ring-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="timezone" className="text-xs text-muted-foreground uppercase tracking-wider">
                      Timezone
                    </Label>
                    <select
                      id="timezone"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl neu-input focus:outline-none"
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata (IST +05:30)</option>
                      <option value="America/New_York">America/New_York (EST -05:00)</option>
                      <option value="Europe/London">Europe/London (GMT +00:00)</option>
                      <option value="Asia/Dubai">Asia/Dubai (GST +04:00)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="address" className="text-xs text-muted-foreground uppercase tracking-wider">
                    Office Address
                  </Label>
                  <Textarea
                    id="address"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    rows={2}
                    className="rounded-xl neu-input border-0 focus-visible:ring-primary resize-none"
                  />
                </div>
              </Section>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Section title="Locale & Formatting" description="Currency, date format, and language preferences">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider">Currency</Label>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl neu-input focus:outline-none"
                    >
                      <option value="INR">INR — Indian Rupee (₹)</option>
                      <option value="USD">USD — US Dollar ($)</option>
                      <option value="EUR">EUR — Euro (€)</option>
                      <option value="GBP">GBP — British Pound (£)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wider">Date Format</Label>
                    <select
                      value={dateFormat}
                      onChange={(e) => setDateFormat(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-xl neu-input focus:outline-none"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                      <option value="D MMM YYYY">D MMM YYYY</option>
                    </select>
                  </div>
                </div>
              </Section>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <SaveButton onClick={showSavedToast} />
            </motion.div>
          </TabsContent>

          <TabsContent value="appearance" className="mt-0 space-y-4">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Section title="Theme" description="Choose your preferred colour scheme">
                <div className="grid grid-cols-3 gap-3">
                  <ThemeCard
                    value="light"
                    label="Light"
                    icon={Sun}
                    selected={theme === 'light'}
                    onClick={() => setTheme('light')}
                  />
                  <ThemeCard
                    value="dark"
                    label="Dark"
                    icon={Moon}
                    selected={theme === 'dark'}
                    onClick={() => setTheme('dark')}
                  />
                  <ThemeCard
                    value="system"
                    label="System"
                    icon={Monitor}
                    selected={theme === 'system'}
                    onClick={() => setTheme('system')}
                  />
                </div>
              </Section>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Section title="Layout & Behaviour" description="Control how the UI looks and feels">
                <ToggleRow
                  id="sidebar-collapsed"
                  label="Collapsed Sidebar by Default"
                  description="Start with the sidebar in icon-only mode"
                  checked={sidebarCollapsed}
                  onCheckedChange={setSidebarCollapsed}
                />
                <div className="border-t border-border/30" />
                <ToggleRow
                  id="animations"
                  label="Enable Animations"
                  description="Smooth transitions and micro-animations throughout the UI"
                  checked={animations}
                  onCheckedChange={setAnimations}
                />
                <div className="border-t border-border/30" />
                <ToggleRow
                  id="compact"
                  label="Compact Mode"
                  description="Reduce padding for a denser information layout"
                  checked={compactMode}
                  onCheckedChange={setCompactMode}
                />
              </Section>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <SaveButton onClick={showSavedToast} />
            </motion.div>
          </TabsContent>

          <TabsContent value="notifications" className="mt-0 space-y-4">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Section title="Delivery Channels" description="Choose how you receive notifications">
                <ToggleRow
                  id="email-notifs"
                  label="Email Notifications"
                  description="Receive alerts via your registered email address"
                  checked={emailNotifs}
                  onCheckedChange={setEmailNotifs}
                />
                <div className="border-t border-border/30" />
                <ToggleRow
                  id="push-notifs"
                  label="Browser Push Notifications"
                  description="Get real-time alerts in your browser"
                  checked={pushNotifs}
                  onCheckedChange={setPushNotifs}
                />
                <div className="border-t border-border/30" />
                <ToggleRow
                  id="sms-notifs"
                  label="SMS Notifications"
                  description="Receive critical alerts via SMS"
                  checked={smsNotifs}
                  onCheckedChange={setSmsNotifs}
                />
              </Section>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Section title="Alert Types" description="Choose which events trigger notifications">
                <ToggleRow
                  id="leave-notifs"
                  label="Leave Requests"
                  description="When employees apply for or update leave"
                  checked={leaveNotifs}
                  onCheckedChange={setLeaveNotifs}
                />
                <div className="border-t border-border/30" />
                <ToggleRow
                  id="attendance-notifs"
                  label="Attendance Alerts"
                  description="Late clock-ins, absences, and overtime notifications"
                  checked={attendanceNotifs}
                  onCheckedChange={setAttendanceNotifs}
                />
                <div className="border-t border-border/30" />
                <ToggleRow
                  id="payroll-notifs"
                  label="Payroll Processing"
                  description="When payslips are generated or payments are processed"
                  checked={payrollNotifs}
                  onCheckedChange={setPayrollNotifs}
                />
                <div className="border-t border-border/30" />
                <ToggleRow
                  id="announcement-notifs"
                  label="Company Announcements"
                  description="New announcements and policy updates"
                  checked={announcementNotifs}
                  onCheckedChange={setAnnouncementNotifs}
                />
              </Section>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <SaveButton onClick={showSavedToast} />
            </motion.div>
          </TabsContent>

          <TabsContent value="security" className="mt-0 space-y-4">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Section title="Authentication" description="Control how you sign in to HRMS Pro">
                <ToggleRow
                  id="2fa"
                  label="Two-Factor Authentication"
                  description="Require a verification code in addition to your password"
                  checked={twoFactor}
                  onCheckedChange={setTwoFactor}
                />
                {twoFactor && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-2 p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs text-primary"
                  >
                    2FA is enabled. You will be prompted for a verification code on each login.
                  </motion.div>
                )}
                <div className="border-t border-border/30" />
                <ToggleRow
                  id="login-alerts"
                  label="New Login Alerts"
                  description="Get notified when your account is accessed from a new device"
                  checked={loginAlerts}
                  onCheckedChange={setLoginAlerts}
                />
                <div className="border-t border-border/30" />
                <ToggleRow
                  id="password-expiry"
                  label="Password Expiry Reminders"
                  description="Remind you to change your password every 90 days"
                  checked={passwordExpiry}
                  onCheckedChange={setPasswordExpiry}
                />
              </Section>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Section
                title="Session Management"
                description="Control how long your session stays active"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label className="text-sm font-medium">Auto-logout after inactivity</Label>
                    <span className="text-sm font-semibold text-primary">{sessionTimeout} min</span>
                  </div>
                  <Slider
                    value={sessionTimeout}
                    onValueChange={(value: number | readonly number[]) =>
                      setSessionTimeout(Array.isArray(value) ? (value as number[])[0] : (value as number))
                    }
                    min={5}
                    max={120}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1.5">
                    <span>5 min</span>
                    <span>120 min</span>
                  </div>
                </div>

                <div className="border-t border-border/30 pt-4">
                  <p className="text-xs text-muted-foreground mb-3 font-medium">Active Sessions</p>
                  {[
                    { device: 'Chrome on Windows', location: 'Bangalore, IN', current: true, time: 'Active now' },
                    { device: 'Safari on iPhone', location: 'Bangalore, IN', current: false, time: '2 hours ago' },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 border-b border-border/20 last:border-0">
                      <div>
                        <p className="text-xs font-medium flex items-center gap-2">
                          {session.device}
                          {session.current && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 font-semibold">
                              Current
                            </span>
                          )}
                        </p>
                        <p className="text-[11px] text-muted-foreground">{session.location} · {session.time}</p>
                      </div>
                      {!session.current && (
                        <button className="text-xs text-red-500 hover:underline font-medium">
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <SaveButton onClick={showSavedToast} />
            </motion.div>
          </TabsContent>
        </div>
      </Tabs>
    </PageWrapper>
  );
}
