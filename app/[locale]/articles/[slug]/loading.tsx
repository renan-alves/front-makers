import Skeleton from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <article className="min-h-screen bg-primary">
      <header className="bg-secondary border-b border-light section-padding">
        <div className="container-grid">
          <div className="max-w-[720px] mx-auto space-y-6">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-4 w-20" />
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-20" />
            </div>

            <Skeleton className="h-10 w-5/6" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-4/5" />

            <div className="flex items-center gap-3 pt-8 border-t border-light">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="section-padding">
        <div className="container-grid">
          <div className="max-w-[720px] mx-auto space-y-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <Skeleton key={`line-${index}`} className="h-4 w-full" />
            ))}

            <div className="my-12">
              <Skeleton className="h-24 w-full rounded-xl" />
            </div>

            <div className="mt-12 pt-8 border-t border-light space-y-3">
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={`tag-${index}`} className="h-6 w-16 rounded-full" />
                ))}
              </div>
            </div>

            <section className="mt-20 pt-10 border-t border-light space-y-6">
              <Skeleton className="h-8 w-40" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-9 w-24 rounded-full" />
                <Skeleton className="h-9 w-36 rounded-full" />
              </div>
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={`thread-${index}`} className="card space-y-3">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}
