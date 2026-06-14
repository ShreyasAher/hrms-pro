import { EmployeeGridSkeleton, PageHeaderSkeleton } from '@/components/shared/skeletons';

export default function Loading() {
  return (
    <div className="page-container">
      <PageHeaderSkeleton />
      
      <div className="flex gap-3 mb-6">
        <div className="animate-pulse h-10 flex-1 rounded-xl bg-muted/60 max-w-md" />
        <div className="animate-pulse h-10 w-36 rounded-xl bg-muted/60" />
        <div className="animate-pulse h-10 w-28 rounded-xl bg-muted/60" />
        <div className="animate-pulse h-10 w-24 rounded-xl bg-muted/60" />
      </div>
      <EmployeeGridSkeleton count={12} />
    </div>
  );
}
