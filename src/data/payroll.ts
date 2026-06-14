import { PayrollRecord, PayslipData, SubscriptionPlan, Payment, Invoice } from '@/types';

export const payrollRecords: PayrollRecord[] = [
  {
    id: 'pay-1', employeeId: '1', employeeName: 'Rajesh Kumar', employeeAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Rajesh',
    department: 'Engineering', designation: 'Senior Software Engineer', month: 'June', year: 2024,
    basicSalary: 62500, hra: 25000, da: 12500, ta: 5000, bonus: 10000, deductions: 5000, tax: 12500, pf: 7500,
    netSalary: 100000, grossSalary: 125000, status: 'paid', paymentDate: '2024-06-01',
  },
  {
    id: 'pay-2', employeeId: '2', employeeName: 'Priya Sharma', employeeAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Priya',
    department: 'Engineering', designation: 'Engineering Manager', month: 'June', year: 2024,
    basicSalary: 92500, hra: 37000, da: 18500, ta: 7000, bonus: 15000, deductions: 8000, tax: 22000, pf: 11100,
    netSalary: 143900, grossSalary: 185000, status: 'paid', paymentDate: '2024-06-01',
  },
  {
    id: 'pay-3', employeeId: '3', employeeName: 'Amit Patel', employeeAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Amit',
    department: 'Design', designation: 'UI/UX Designer', month: 'June', year: 2024,
    basicSalary: 47500, hra: 19000, da: 9500, ta: 4000, bonus: 5000, deductions: 3000, tax: 8500, pf: 5700,
    netSalary: 73300, grossSalary: 95000, status: 'paid', paymentDate: '2024-06-01',
  },
  {
    id: 'pay-4', employeeId: '5', employeeName: 'Vikram Singh', employeeAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Vikram',
    department: 'Product', designation: 'Product Manager', month: 'June', year: 2024,
    basicSalary: 75000, hra: 30000, da: 15000, ta: 6000, bonus: 12000, deductions: 6000, tax: 16000, pf: 9000,
    netSalary: 119000, grossSalary: 150000, status: 'processing',
  },
  {
    id: 'pay-5', employeeId: '9', employeeName: 'Kavita Deshmukh', employeeAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Kavita',
    department: 'Human Resources', designation: 'HR Director', month: 'June', year: 2024,
    basicSalary: 100000, hra: 40000, da: 20000, ta: 8000, bonus: 20000, deductions: 10000, tax: 28000, pf: 12000,
    netSalary: 150000, grossSalary: 200000, status: 'pending',
  },
  {
    id: 'pay-6', employeeId: '12', employeeName: 'Sanjay Verma', employeeAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sanjay',
    department: 'Finance', designation: 'CFO', month: 'June', year: 2024,
    basicSalary: 175000, hra: 70000, da: 35000, ta: 12000, bonus: 30000, deductions: 15000, tax: 55000, pf: 21000,
    netSalary: 259000, grossSalary: 350000, status: 'paid', paymentDate: '2024-06-01',
  },
];

export const samplePayslip: PayslipData = {
  employeeName: 'Rajesh Kumar',
  employeeId: 'EMP-001',
  designation: 'Senior Software Engineer',
  department: 'Engineering',
  month: 'June',
  year: 2024,
  earnings: [
    { label: 'Basic Salary', amount: 62500 },
    { label: 'House Rent Allowance', amount: 25000 },
    { label: 'Dearness Allowance', amount: 12500 },
    { label: 'Transport Allowance', amount: 5000 },
    { label: 'Performance Bonus', amount: 10000 },
    { label: 'Special Allowance', amount: 10000 },
  ],
  deductions: [
    { label: 'Income Tax', amount: 12500 },
    { label: 'Provident Fund', amount: 7500 },
    { label: 'Professional Tax', amount: 200 },
    { label: 'Insurance Premium', amount: 2500 },
    { label: 'Other Deductions', amount: 2300 },
  ],
  grossEarnings: 125000,
  totalDeductions: 25000,
  netPay: 100000,
};

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'plan-1', name: 'Starter', price: 499, period: 'monthly', isPopular: false, color: '#64748B', employeeLimit: 25,
    features: ['Up to 25 employees', 'Basic attendance', 'Leave management', 'Email support', 'Basic reports'],
  },
  {
    id: 'plan-2', name: 'Professional', price: 1499, period: 'monthly', isPopular: true, color: '#6366F1', employeeLimit: 100,
    features: ['Up to 100 employees', 'Advanced attendance', 'Leave management', 'Payroll module', 'Performance tracking', 'Priority support', 'Custom reports', 'API access'],
  },
  {
    id: 'plan-3', name: 'Enterprise', price: 3999, period: 'monthly', isPopular: false, color: '#8B5CF6', employeeLimit: 500,
    features: ['Unlimited employees', 'All modules', 'Custom integrations', 'Dedicated support', 'White labeling', 'SSO & SAML', 'Advanced analytics', 'SLA guarantee', 'On-premise option'],
  },
];

export const paymentHistory: Payment[] = [
  { id: 'pmt-1', orderId: 'ORD-2024-001', amount: 1499, currency: 'INR', status: 'success', method: 'Credit Card', gateway: 'stripe', date: '2024-06-01', description: 'Professional Plan — June 2024' },
  { id: 'pmt-2', orderId: 'ORD-2024-002', amount: 1499, currency: 'INR', status: 'success', method: 'UPI', gateway: 'razorpay', date: '2024-05-01', description: 'Professional Plan — May 2024' },
  { id: 'pmt-3', orderId: 'ORD-2024-003', amount: 1499, currency: 'INR', status: 'success', method: 'Net Banking', gateway: 'razorpay', date: '2024-04-01', description: 'Professional Plan — April 2024' },
  { id: 'pmt-4', orderId: 'ORD-2024-004', amount: 499, currency: 'INR', status: 'failed', method: 'Credit Card', gateway: 'stripe', date: '2024-03-01', description: 'Starter Plan — March 2024' },
  { id: 'pmt-5', orderId: 'ORD-2024-005', amount: 499, currency: 'INR', status: 'success', method: 'UPI', gateway: 'razorpay', date: '2024-03-02', description: 'Starter Plan — March 2024 (Retry)' },
  { id: 'pmt-6', orderId: 'ORD-2024-006', amount: 1499, currency: 'INR', status: 'refunded', method: 'Credit Card', gateway: 'stripe', date: '2024-02-15', description: 'Upgrade difference refund' },
];

export const invoices: Invoice[] = [
  {
    id: 'inv-1', invoiceNumber: 'INV-2024-0612', date: '2024-06-01', dueDate: '2024-06-15', amount: 1499, tax: 270, total: 1769, status: 'paid',
    items: [{ description: 'Professional Plan — Monthly Subscription', quantity: 1, rate: 1499, amount: 1499 }],
  },
  {
    id: 'inv-2', invoiceNumber: 'INV-2024-0501', date: '2024-05-01', dueDate: '2024-05-15', amount: 1499, tax: 270, total: 1769, status: 'paid',
    items: [{ description: 'Professional Plan — Monthly Subscription', quantity: 1, rate: 1499, amount: 1499 }],
  },
  {
    id: 'inv-3', invoiceNumber: 'INV-2024-0401', date: '2024-04-01', dueDate: '2024-04-15', amount: 1499, tax: 270, total: 1769, status: 'paid',
    items: [{ description: 'Professional Plan — Monthly Subscription', quantity: 1, rate: 1499, amount: 1499 }],
  },
];

export const payrollAnalytics = [
  { name: 'Jan', salary: 15200000, bonus: 500000, deductions: 3800000 },
  { name: 'Feb', salary: 15500000, bonus: 200000, deductions: 3900000 },
  { name: 'Mar', salary: 15800000, bonus: 1200000, deductions: 4000000 },
  { name: 'Apr', salary: 16200000, bonus: 300000, deductions: 4100000 },
  { name: 'May', salary: 16500000, bonus: 400000, deductions: 4200000 },
  { name: 'Jun', salary: 16800000, bonus: 600000, deductions: 4300000 },
];
