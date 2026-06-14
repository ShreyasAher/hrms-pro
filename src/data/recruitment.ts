import { JobListing, Candidate, InterviewSchedule } from '@/types';

export const jobListings: JobListing[] = [
  {
    id: 'job-1', title: 'Senior Frontend Developer', department: 'Engineering', location: 'Bangalore, India',
    type: 'full-time', experience: '4-6 years', salary: '₹18L - ₹28L',
    description: 'We are looking for a senior frontend developer to build and maintain our next-generation web applications.',
    requirements: ['React/Next.js expertise', 'TypeScript proficiency', '4+ years experience', 'System design knowledge', 'Team collaboration'],
    postedDate: '2024-05-15', closingDate: '2024-07-15', applicants: 45, status: 'open',
  },
  {
    id: 'job-2', title: 'Product Designer', department: 'Design', location: 'Mumbai, India',
    type: 'full-time', experience: '3-5 years', salary: '₹12L - ₹20L',
    description: 'Join our design team to create beautiful, intuitive experiences for our SaaS platform.',
    requirements: ['Figma mastery', 'Design systems experience', 'User research skills', 'Prototyping', 'Portfolio required'],
    postedDate: '2024-06-01', closingDate: '2024-07-31', applicants: 32, status: 'open',
  },
  {
    id: 'job-3', title: 'DevOps Engineer', department: 'Engineering', location: 'Remote',
    type: 'full-time', experience: '3-5 years', salary: '₹15L - ₹25L',
    description: 'Manage and improve our cloud infrastructure and CI/CD pipelines.',
    requirements: ['AWS/GCP experience', 'Docker & Kubernetes', 'Terraform', 'CI/CD pipelines', 'Monitoring tools'],
    postedDate: '2024-06-05', closingDate: '2024-07-20', applicants: 28, status: 'open',
  },
  {
    id: 'job-4', title: 'Marketing Intern', department: 'Marketing', location: 'Delhi, India',
    type: 'internship', experience: '0-1 years', salary: '₹15K - ₹25K/month',
    description: 'Great opportunity for freshers to learn digital marketing and content creation.',
    requirements: ['Marketing knowledge', 'Social media savvy', 'Good communication', 'Creative thinking', 'Currently pursuing degree'],
    postedDate: '2024-06-10', closingDate: '2024-06-30', applicants: 78, status: 'open',
  },
  {
    id: 'job-5', title: 'Data Scientist', department: 'Analytics', location: 'Hyderabad, India',
    type: 'full-time', experience: '2-4 years', salary: '₹14L - ₹22L',
    description: 'Apply ML and statistical methods to solve complex business problems.',
    requirements: ['Python & R', 'Machine Learning', 'SQL', 'Statistics', 'Communication skills'],
    postedDate: '2024-04-20', closingDate: '2024-06-01', applicants: 56, status: 'closed',
  },
];

export const candidates: Candidate[] = [
  {
    id: 'cand-1', name: 'Aditya Chopra', email: 'aditya.c@gmail.com', phone: '+91 99887 76655',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Aditya', position: 'Senior Frontend Developer',
    experience: '5 years', skills: ['React', 'TypeScript', 'Next.js', 'GraphQL'], stage: 'interview',
    rating: 4.5, appliedDate: '2024-05-20', resume: 'resume_aditya.pdf',
  },
  {
    id: 'cand-2', name: 'Riya Bhatia', email: 'riya.b@gmail.com', phone: '+91 99887 76656',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Riya', position: 'Product Designer',
    experience: '4 years', skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'], stage: 'screening',
    rating: 4.2, appliedDate: '2024-06-02', resume: 'resume_riya.pdf',
  },
  {
    id: 'cand-3', name: 'Mohit Taneja', email: 'mohit.t@gmail.com', phone: '+91 99887 76657',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Mohit', position: 'Senior Frontend Developer',
    experience: '6 years', skills: ['React', 'Vue.js', 'Node.js', 'AWS'], stage: 'offer',
    rating: 4.8, appliedDate: '2024-05-18', resume: 'resume_mohit.pdf',
  },
  {
    id: 'cand-4', name: 'Simran Kaur', email: 'simran.k@gmail.com', phone: '+91 99887 76658',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Simran', position: 'DevOps Engineer',
    experience: '3 years', skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins'], stage: 'applied',
    rating: 3.8, appliedDate: '2024-06-08', resume: 'resume_simran.pdf',
  },
  {
    id: 'cand-5', name: 'Harsh Vardhan', email: 'harsh.v@gmail.com', phone: '+91 99887 76659',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Harsh', position: 'Senior Frontend Developer',
    experience: '4 years', skills: ['React', 'TypeScript', 'Tailwind', 'Testing'], stage: 'rejected',
    rating: 3.2, appliedDate: '2024-05-22', resume: 'resume_harsh.pdf',
  },
  {
    id: 'cand-6', name: 'Divya Menon', email: 'divya.m@gmail.com', phone: '+91 99887 76660',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Divya', position: 'Marketing Intern',
    experience: 'Fresher', skills: ['Social Media', 'Content Writing', 'Canva', 'SEO'], stage: 'screening',
    rating: 4.0, appliedDate: '2024-06-11', resume: 'resume_divya.pdf',
  },
  {
    id: 'cand-7', name: 'Pranav Desai', email: 'pranav.d@gmail.com', phone: '+91 99887 76661',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Pranav', position: 'DevOps Engineer',
    experience: '5 years', skills: ['Terraform', 'AWS', 'Docker', 'Monitoring'], stage: 'interview',
    rating: 4.3, appliedDate: '2024-06-06', resume: 'resume_pranav.pdf',
  },
];

export const interviewSchedules: InterviewSchedule[] = [
  {
    id: 'int-1', candidateId: 'cand-1', candidateName: 'Aditya Chopra',
    candidateAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Aditya',
    position: 'Senior Frontend Developer', date: '2024-06-18', time: '10:00 AM',
    type: 'video', interviewer: 'Rajesh Kumar', status: 'scheduled',
  },
  {
    id: 'int-2', candidateId: 'cand-7', candidateName: 'Pranav Desai',
    candidateAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Pranav',
    position: 'DevOps Engineer', date: '2024-06-19', time: '2:00 PM',
    type: 'video', interviewer: 'Arjun Nair', status: 'scheduled',
  },
  {
    id: 'int-3', candidateId: 'cand-3', candidateName: 'Mohit Taneja',
    candidateAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Mohit',
    position: 'Senior Frontend Developer', date: '2024-06-14', time: '11:00 AM',
    type: 'in-person', interviewer: 'Priya Sharma', status: 'completed',
    notes: 'Strong candidate. Excellent system design skills.',
  },
];

export const hiringPipelineData = [
  { stage: 'Applied', count: 12 },
  { stage: 'Screening', count: 8 },
  { stage: 'Interview', count: 5 },
  { stage: 'Offer', count: 2 },
  { stage: 'Hired', count: 1 },
];
