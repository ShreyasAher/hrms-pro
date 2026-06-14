import { Course, Certification, Skill } from '@/types';

export const courses: Course[] = [
  {
    id: 'course-1', title: 'Advanced React Patterns', description: 'Master advanced React patterns including compound components, render props, and custom hooks for scalable applications.',
    instructor: 'Rajesh Kumar', duration: '8 hours', category: 'Frontend', level: 'advanced',
    enrolled: 28, maxCapacity: 40, rating: 4.8, thumbnail: '', status: 'in-progress', progress: 65, modules: 12, completedModules: 8,
  },
  {
    id: 'course-2', title: 'System Design Fundamentals', description: 'Learn the fundamentals of designing distributed systems at scale.',
    instructor: 'Priya Sharma', duration: '12 hours', category: 'Architecture', level: 'intermediate',
    enrolled: 35, maxCapacity: 50, rating: 4.9, thumbnail: '', status: 'in-progress', progress: 40, modules: 15, completedModules: 6,
  },
  {
    id: 'course-3', title: 'UI/UX Design Masterclass', description: 'Complete guide to creating beautiful, user-centered designs from wireframes to high-fidelity prototypes.',
    instructor: 'Sneha Gupta', duration: '10 hours', category: 'Design', level: 'beginner',
    enrolled: 42, maxCapacity: 50, rating: 4.7, thumbnail: '', status: 'completed', progress: 100, modules: 10, completedModules: 10,
  },
  {
    id: 'course-4', title: 'DevOps with Kubernetes', description: 'Deploy and manage containerized applications using Kubernetes in production environments.',
    instructor: 'Arjun Nair', duration: '15 hours', category: 'DevOps', level: 'advanced',
    enrolled: 18, maxCapacity: 30, rating: 4.6, thumbnail: '', status: 'not-started', modules: 20, completedModules: 0,
  },
  {
    id: 'course-5', title: 'Data Analytics with Python', description: 'Learn data analysis, visualization, and basic ML using Python, Pandas, and Matplotlib.',
    instructor: 'Rohan Mehta', duration: '10 hours', category: 'Data Science', level: 'beginner',
    enrolled: 55, maxCapacity: 60, rating: 4.5, thumbnail: '', status: 'in-progress', progress: 30, modules: 12, completedModules: 4,
  },
  {
    id: 'course-6', title: 'Leadership & Management', description: 'Develop essential leadership skills for effective team management and organizational growth.',
    instructor: 'Kavita Deshmukh', duration: '6 hours', category: 'Soft Skills', level: 'intermediate',
    enrolled: 25, maxCapacity: 35, rating: 4.4, thumbnail: '', status: 'not-started', modules: 8, completedModules: 0,
  },
];

export const certifications: Certification[] = [
  { id: 'cert-1', name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2023-08-15', expiryDate: '2026-08-15', credentialId: 'AWS-SAA-2023-001', status: 'active' },
  { id: 'cert-2', name: 'Google Cloud Professional', issuer: 'Google Cloud', date: '2023-03-20', expiryDate: '2025-03-20', credentialId: 'GCP-PRO-2023-045', status: 'active' },
  { id: 'cert-3', name: 'Certified Scrum Master', issuer: 'Scrum Alliance', date: '2022-11-10', expiryDate: '2024-11-10', credentialId: 'CSM-2022-789', status: 'active' },
  { id: 'cert-4', name: 'Meta Frontend Developer', issuer: 'Meta (Coursera)', date: '2024-01-05', credentialId: 'META-FE-2024-012', status: 'active' },
  { id: 'cert-5', name: 'PMP Certification', issuer: 'PMI', date: '2021-06-15', expiryDate: '2024-06-15', credentialId: 'PMP-2021-456', status: 'expired' },
];

export const skills: Skill[] = [
  { name: 'React', level: 9, maxLevel: 10, category: 'Frontend' },
  { name: 'TypeScript', level: 8, maxLevel: 10, category: 'Frontend' },
  { name: 'Node.js', level: 7, maxLevel: 10, category: 'Backend' },
  { name: 'Python', level: 6, maxLevel: 10, category: 'Backend' },
  { name: 'AWS', level: 7, maxLevel: 10, category: 'Cloud' },
  { name: 'Docker', level: 8, maxLevel: 10, category: 'DevOps' },
  { name: 'SQL', level: 7, maxLevel: 10, category: 'Database' },
  { name: 'System Design', level: 6, maxLevel: 10, category: 'Architecture' },
  { name: 'Figma', level: 5, maxLevel: 10, category: 'Design' },
  { name: 'Leadership', level: 7, maxLevel: 10, category: 'Soft Skills' },
];

export const performanceData = {
  kpis: [
    { id: 'kpi-1', name: 'Task Completion Rate', target: 95, achieved: 92, unit: '%', trend: 'up' as const, color: '#6366F1' },
    { id: 'kpi-2', name: 'Code Review Time', target: 24, achieved: 18, unit: 'hrs', trend: 'up' as const, color: '#10B981' },
    { id: 'kpi-3', name: 'Sprint Velocity', target: 45, achieved: 42, unit: 'pts', trend: 'stable' as const, color: '#F59E0B' },
    { id: 'kpi-4', name: 'Bug Resolution', target: 48, achieved: 36, unit: 'hrs', trend: 'up' as const, color: '#EC4899' },
    { id: 'kpi-5', name: 'Client Satisfaction', target: 90, achieved: 88, unit: '%', trend: 'down' as const, color: '#8B5CF6' },
    { id: 'kpi-6', name: 'Team Engagement', target: 85, achieved: 91, unit: '%', trend: 'up' as const, color: '#14B8A6' },
  ],
  goals: [
    { id: 'goal-1', title: 'Complete Q2 Product Roadmap', description: 'Deliver all planned features for Q2', progress: 78, dueDate: '2024-06-30', priority: 'high' as const, status: 'on-track' as const },
    { id: 'goal-2', title: 'Reduce Page Load Time', description: 'Achieve < 2s load time for all pages', progress: 60, dueDate: '2024-07-15', priority: 'high' as const, status: 'at-risk' as const },
    { id: 'goal-3', title: 'Increase Test Coverage', description: 'Reach 80% unit test coverage', progress: 45, dueDate: '2024-08-01', priority: 'medium' as const, status: 'on-track' as const },
    { id: 'goal-4', title: 'Launch Mobile App Beta', description: 'Release beta version of the mobile app', progress: 30, dueDate: '2024-09-01', priority: 'high' as const, status: 'behind' as const },
    { id: 'goal-5', title: 'Employee Training Program', description: 'Complete 3 training modules for the team', progress: 100, dueDate: '2024-05-31', priority: 'medium' as const, status: 'completed' as const },
  ],
  monthlyRatings: [
    { name: 'Jan', avg: 3.8, max: 5, min: 2.5 },
    { name: 'Feb', avg: 3.9, max: 5, min: 2.8 },
    { name: 'Mar', avg: 4.0, max: 5, min: 3.0 },
    { name: 'Apr', avg: 3.7, max: 4.8, min: 2.5 },
    { name: 'May', avg: 4.1, max: 5, min: 3.2 },
    { name: 'Jun', avg: 4.2, max: 5, min: 3.0 },
  ],
};
