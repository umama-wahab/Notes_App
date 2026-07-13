const SkeletonCard = () => (
  <div className="card p-5 space-y-3 animate-pulse">
    <div className="h-4 bg-light-border dark:bg-dark-border rounded w-3/4" />
    <div className="space-y-2">
      <div className="h-3 bg-light-border dark:bg-dark-border rounded" />
      <div className="h-3 bg-light-border dark:bg-dark-border rounded w-5/6" />
      <div className="h-3 bg-light-border dark:bg-dark-border rounded w-2/3" />
    </div>
    <div className="flex justify-between pt-2 border-t border-light-border dark:border-dark-border">
      <div className="h-3 bg-light-border dark:bg-dark-border rounded w-24" />
      <div className="flex gap-2">
        <div className="h-6 w-6 bg-light-border dark:bg-dark-border rounded" />
        <div className="h-6 w-6 bg-light-border dark:bg-dark-border rounded" />
      </div>
    </div>
  </div>
);

const SkeletonGrid = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
  </div>
);

export { SkeletonCard, SkeletonGrid };
