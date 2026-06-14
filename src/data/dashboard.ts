import { DashboardStats, Activity, Event, Announcement, Notification, ChartDataPoint } from '@/types';

export const dashboardStats: DashboardStats = {
  totalEmployees: 156,
  activeEmployees: 142,
  newJoinees: 12,
  onLeave: 8,
  attendancePercentage: 94.5,
  payrollTotal: 18500000,
};

export const departmentDistribution: ChartDataPoint[] = [
  { name: 'Engineering', value: 45, color: '#6366F1' },
  { name: 'Sales', value: 20, color: '#F97316' },
  { name: 'Design', value: 18, color: '#EC4899' },
  { name: 'Marketing', value: 15, color: '#EF4444' },
  { name: 'Product', value: 12, color: '#8B5CF6' },
  { name: 'HR', value: 10, color: '#10B981' },
  { name: 'Finance', value: 8, color: '#14B8A6' },
  { name: 'Analytics', value: 8, color: '#F59E0B' },
];

export const employeeGrowth: ChartDataPoint[] = [
  { name: 'Jan', value: 120, hired: 8, left: 2 },
  { name: 'Feb', value: 126, hired: 10, left: 4 },
  { name: 'Mar', value: 130, hired: 7, left: 3 },
  { name: 'Apr', value: 135, hired: 9, left: 4 },
  { name: 'May', value: 140, hired: 8, left: 3 },
  { name: 'Jun', value: 142, hired: 6, left: 4 },
  { name: 'Jul', value: 145, hired: 7, left: 4 },
  { name: 'Aug', value: 148, hired: 5, left: 2 },
  { name: 'Sep', value: 150, hired: 6, left: 4 },
  { name: 'Oct', value: 152, hired: 5, left: 3 },
  { name: 'Nov', value: 154, hired: 4, left: 2 },
  { name: 'Dec', value: 156, hired: 5, left: 3 },
];

export const attendanceTrend: ChartDataPoint[] = [
  { name: 'Mon', value: 96 },
  { name: 'Tue', value: 94 },
  { name: 'Wed', value: 97 },
  { name: 'Thu', value: 93 },
  { name: 'Fri', value: 88 },
];

export const recentActivities: Activity[] = [
  {
    id: 'act-1',
    type: 'join',
    title: 'New Employee Joined',
    description: 'Karthik Rajan joined the Engineering team as Backend Developer',
    timestamp: '2024-06-01T09:00:00Z',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Karthik',
  },
  {
    id: 'act-2',
    type: 'promotion',
    title: 'Promotion Announcement',
    description: 'Rajesh Kumar promoted to Senior Software Engineer',
    timestamp: '2024-05-28T14:30:00Z',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Rajesh',
  },
  {
    id: 'act-3',
    type: 'achievement',
    title: 'Team Achievement',
    description: 'Engineering team completed Project Phoenix ahead of schedule',
    timestamp: '2024-05-25T11:00:00Z',
  },
  {
    id: 'act-4',
    type: 'leave',
    title: 'Leave Approved',
    description: 'Arjun Nair\'s vacation leave has been approved for 5 days',
    timestamp: '2024-05-22T16:45:00Z',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Arjun',
  },
  {
    id: 'act-5',
    type: 'birthday',
    title: 'Birthday Celebration',
    description: 'Wish Sneha Gupta a happy birthday today! 🎂',
    timestamp: '2024-05-20T08:00:00Z',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sneha',
  },
  {
    id: 'act-6',
    type: 'announcement',
    title: 'Policy Update',
    description: 'Remote work policy has been updated — hybrid 3 days/week',
    timestamp: '2024-05-18T10:00:00Z',
  },
];

export const upcomingEvents: Event[] = [
  {
    id: 'evt-1',
    title: 'Quarterly Town Hall',
    date: '2024-06-15',
    time: '3:00 PM',
    type: 'meeting',
    description: 'All-hands meeting with leadership team',
  },
  {
    id: 'evt-2',
    title: 'Sneha Gupta\'s Birthday',
    date: '2024-06-18',
    time: 'All Day',
    type: 'birthday',
  },
  {
    id: 'evt-3',
    title: 'React Advanced Workshop',
    date: '2024-06-20',
    time: '10:00 AM',
    type: 'training',
    description: 'Advanced React patterns and performance optimization',
  },
  {
    id: 'evt-4',
    title: 'Independence Day',
    date: '2024-08-15',
    time: 'All Day',
    type: 'holiday',
  },
  {
    id: 'evt-5',
    title: 'Annual Team Outing',
    date: '2024-07-05',
    time: '9:00 AM',
    type: 'event',
    description: 'Team building activities at Wonderla',
  },
];

export const announcements: Announcement[] = [
  {
    id: 'ann-1',
    title: 'New Health Insurance Plan',
    content: 'We are excited to announce our upgraded health insurance plan covering dental and vision for all employees and their families.',
    author: 'Kavita Deshmukh',
    date: '2024-06-10',
    priority: 'high',
    category: 'Benefits',
  },
  {
    id: 'ann-2',
    title: 'Office Renovation — Phase 2',
    content: 'The second phase of office renovation will begin next week. The cafeteria will be temporarily relocated to the 3rd floor.',
    author: 'Admin Team',
    date: '2024-06-08',
    priority: 'medium',
    category: 'Facilities',
  },
  {
    id: 'ann-3',
    title: 'Annual Performance Review Cycle',
    content: 'The annual performance review cycle begins on July 1st. Please ensure all goals are updated in the system.',
    author: 'HR Department',
    date: '2024-06-05',
    priority: 'high',
    category: 'HR',
  },
];

export const notifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'Leave Request Approved',
    message: 'Your casual leave request for June 20-21 has been approved.',
    timestamp: '2024-06-12T10:30:00Z',
    read: false,
    type: 'success',
  },
  {
    id: 'notif-2',
    title: 'Payslip Generated',
    message: 'Your payslip for May 2024 is now available for download.',
    timestamp: '2024-06-01T09:00:00Z',
    read: false,
    type: 'info',
  },
  {
    id: 'notif-3',
    title: 'Training Reminder',
    message: 'React Advanced Workshop starts tomorrow at 10:00 AM.',
    timestamp: '2024-06-11T15:00:00Z',
    read: true,
    type: 'warning',
  },
  {
    id: 'notif-4',
    title: 'System Maintenance',
    message: 'The system will undergo maintenance on Sunday 2:00 AM - 6:00 AM.',
    timestamp: '2024-06-10T12:00:00Z',
    read: true,
    type: 'info',
  },
  {
    id: 'notif-5',
    title: 'New Policy Document',
    message: 'Updated remote work policy has been published. Please review.',
    timestamp: '2024-06-09T11:00:00Z',
    read: true,
    type: 'info',
  },
];

export const payrollSummary: ChartDataPoint[] = [
  { name: 'Jan', value: 17200000, bonus: 500000 },
  { name: 'Feb', value: 17500000, bonus: 0 },
  { name: 'Mar', value: 17800000, bonus: 1200000 },
  { name: 'Apr', value: 18000000, bonus: 0 },
  { name: 'May', value: 18200000, bonus: 300000 },
  { name: 'Jun', value: 18500000, bonus: 0 },
];
