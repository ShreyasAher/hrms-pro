'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export function PageWrapper({ children, title, subtitle }: PageWrapperProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="page-container"
    >
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
          )}
          {subtitle && (
            <p className="text-muted-foreground mt-1 text-sm md:text-base">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </motion.div>
  );
}
