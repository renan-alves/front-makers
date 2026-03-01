import Skeleton from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-secondary">
      <section className="bg-primary border-b border-light section-padding">
        <div className="container-grid">
          <div className="max-w-4xl space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-5 w-4/5" />
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
            <div className="card space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Skeleton className="h-9 w-24 rounded-full" />
                <Skeleton className="h-9 w-24 rounded-full" />
              </div>

              <div className="grid gap-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <Skeleton key={`social-${index}`} className="h-11 w-full rounded-lg" />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="h-px bg-[var(--color-border)] flex-1" />
                <Skeleton className="h-3 w-20" />
                <span className="h-px bg-[var(--color-border)] flex-1" />
              </div>

              <div className="space-y-4">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-11 w-full rounded-lg" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-11 w-full rounded-lg" />
                <Skeleton className="h-11 w-full rounded-lg" />
              </div>
            </div>

            <aside className="card space-y-4">
              <Skeleton className="h-7 w-2/3" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Skeleton key={`benefit-${index}`} className="h-4 w-full" />
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
