'use client';

import { motion } from 'framer-motion';
import { upcomingEvents, announcements } from '@/data/dashboard';
import { Calendar, Clock, Video, Cake, Palmtree, GraduationCap, PartyPopper, AlertTriangle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const eventIcons: Record<string, typeof Calendar> = {
  meeting: Video,
  birthday: Cake,
  holiday: Palmtree,
  training: GraduationCap,
  event: PartyPopper,
};

const eventColors: Record<string, string> = {
  meeting: '#6366F1',
  birthday: '#F97316',
  holiday: '#10B981',
  training: '#3B82F6',
  event: '#EC4899',
};

const priorityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400',
  medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400',
  low: 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400',
  critical: 'bg-red-200 text-red-800 dark:bg-red-600/20 dark:text-red-300',
};

export function UpcomingEvents() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      className="neu-flat p-5"
    >
      <h3 className="text-sm font-semibold mb-4">Upcoming Events</h3>
      <div className="space-y-2.5">
        {upcomingEvents.slice(0, 4).map((event) => {
          const Icon = eventIcons[event.type] || Calendar;
          const color = eventColors[event.type] || '#6366F1';

          return (
            <div
              key={event.id}
              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${color}15` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{event.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {event.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export function Announcements() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.7 }}
      className="neu-flat p-5"
    >
      <h3 className="text-sm font-semibold mb-4">Company Announcements</h3>
      <div className="space-y-3">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className="p-3 rounded-xl border border-border/40 hover:border-primary/30 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                {ann.priority === 'high' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                ) : (
                  <Info className="w-4 h-4 text-blue-500 shrink-0" />
                )}
                <h4 className="text-sm font-medium">{ann.title}</h4>
              </div>
              <Badge variant="secondary" className={`text-[10px] ${priorityColors[ann.priority]}`}>
                {ann.priority}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{ann.content}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[11px] text-muted-foreground">{ann.author}</span>
              <span className="text-[11px] text-muted-foreground">
                {new Date(ann.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
