'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { departmentDistribution } from '@/data/dashboard';

const COLORS = departmentDistribution.map((d) => d.color as string);

export function DepartmentChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="neu-flat p-5"
    >
      <h3 className="text-sm font-semibold mb-4">Department Distribution</h3>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={departmentDistribution}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {departmentDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'var(--neu-surface)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: 'var(--neu-shadow-sm)',
                  fontSize: '12px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-2 w-full">
          {departmentDistribution.map((dept) => (
            <div key={dept.name} className="flex items-center gap-2 text-xs">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: dept.color as string }}
              />
              <span className="text-muted-foreground truncate">{dept.name}</span>
              <span className="font-semibold ml-auto">{dept.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
