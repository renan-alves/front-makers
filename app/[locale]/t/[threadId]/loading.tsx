import Skeleton from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <main className="min-h-screen bg-primary section-padding">
      <div className="container-grid">
        <div className="max-w-[720px] mx-auto space-y-10">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-4 w-24" />
          </div>

          <article className="card space-y-6">
            <div className="flex items-center gap-3 flex-wrap">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>

            <Skeleton className="h-8 w-5/6" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />

            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-16 rounded-lg" />
              <Skeleton className="h-9 w-12 rounded-lg" />
            </div>
          </article>

          <section className="space-y-4">
            <Skeleton className="h-7 w-32" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={`reply-${index}`} className="card space-y-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-16 rounded-lg" />
                    <Skeleton className="h-8 w-12 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
