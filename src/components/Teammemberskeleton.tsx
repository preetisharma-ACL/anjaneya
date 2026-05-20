export function TeamMemberSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-32 lg:gap-64 items-start pb-48 border-b border-dashed animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full sm:w-1/2 lg:w-[300px] h-[300px] lg:h-[400px] shrink-0 bg-primary/10 rounded-2xl-32" />

      {/* Content Skeleton */}
      <div className="flex flex-col gap-24 pt-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-16">
          <div className="flex flex-col gap-8">
            <div className="h-8 w-48 bg-primary/10 rounded" />
            <div className="h-5 w-36 bg-primary/10 rounded" />
          </div>
          <div className="flex gap-12">
            <div className="size-32 sm:size-40 rounded-full bg-primary/10" />
            <div className="size-32 sm:size-40 rounded-full bg-primary/10" />
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <div className="h-4 w-full bg-primary/10 rounded" />
          <div className="h-4 w-5/6 bg-primary/10 rounded" />
          <div className="h-4 w-4/6 bg-primary/10 rounded" />
          <div className="h-4 w-full bg-primary/10 rounded mt-4" />
          <div className="h-4 w-3/4 bg-primary/10 rounded" />
        </div>
      </div>
    </div>
  );
}