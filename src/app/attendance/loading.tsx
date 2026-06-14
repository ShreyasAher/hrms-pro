import { TableSkeleton, StatCardSkeleton, ChartSkeleton, PageHeaderSkeleton } from '@/components/shared/skeletons';

export default function Loading() {
  return (
    <div className="page-container space-y-4">
      <PageHeaderSkeleton />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
      </div>
      <ChartSkeleton height={260} />
      <TableSkeleton rows={8} cols={5} />
    </div>
  );
}
