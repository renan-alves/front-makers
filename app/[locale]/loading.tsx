import Skeleton from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="w-full bg-primary min-h-screen">
      <section className="section-padding border-b border-light">
        <div className="container-grid">
          <div className="max-w-4xl mx-auto space-y-5">
            <Skeleton className="h-10 w-3/4" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Skeleton className="h-9 w-28 rounded-full" />
              <Skeleton className="h-9 w-28 rounded-full" />
              <Skeleton className="h-9 w-28 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
            <div className="w-full space-y-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={`article-${index}`} className="card card-static space-y-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-10" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-7 w-5/6" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-11/12" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                  </div>
                </div>
              ))}
            </div>

            <aside className="lg:sticky lg:top-24">
              <div className="card space-y-4">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-7 w-2/3" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <Skeleton className="h-10 w-full rounded-full" />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
