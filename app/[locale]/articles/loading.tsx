import Skeleton from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-secondary">
      <section className="bg-primary border-b border-light py-16">
        <div className="container-grid">
          <div className="max-w-3xl space-y-4">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        </div>
      </section>

      <div className="container-grid py-12">
        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={`article-${index}`} className="card space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-7 w-3/4" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
              <div className="flex items-center gap-3 pt-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-40" />
              </div>
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
