'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Children, useTransition } from 'react';
import Skeleton from '@/components/ui/Skeleton';

type FeedFilter = 'recent' | 'trending' | 'most-read';

type HomeFeedLabels = {
  heroTitle: string;
  heroSubtitle: string;
  filters: {
    recent: string;
    trending: string;
    mostRead: string;
  };
};

interface HomeFeedProps {
  selectedFilter: FeedFilter;
  labels: HomeFeedLabels;
  list: React.ReactNode;
  aside: React.ReactNode;
}

export default function HomeFeed({
  selectedFilter,
  labels,
  list,
  aside,
}: HomeFeedProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const normalizedList = Children.toArray(list);

  const handleFilterChange = (nextFilter: FeedFilter) => {
    if (!pathname || nextFilter === selectedFilter) {
      return;
    }

    const params = new URLSearchParams(searchParams?.toString());
    params.set('filter', nextFilter);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const renderFilterButton = (filter: FeedFilter, label: string) => {
    const isActive = selectedFilter === filter;

    return (
      <button
        key={filter}
        type="button"
        onClick={() => handleFilterChange(filter)}
        aria-pressed={isActive}
        disabled={isPending}
        className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors disabled:opacity-60 ${
          isActive
            ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
            : 'bg-primary text-secondary border-light hover:text-primary'
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="w-full bg-primary min-h-screen">
      <section className="section-padding border-b border-light">
        <div className="container-grid">
          <div className="max-w-4xl mx-auto space-y-5">
            <h1 className="text-balance">{labels.heroTitle}</h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed max-w-3xl">
              {labels.heroSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              {renderFilterButton('recent', labels.filters.recent)}
              {renderFilterButton('trending', labels.filters.trending)}
              {renderFilterButton('most-read', labels.filters.mostRead)}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-grid">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
            <div className="w-full space-y-6">
              {isPending ? <HomeFeedSkeleton /> : normalizedList}
            </div>
            {aside}
          </div>
        </div>
      </section>
    </div>
  );
}

function HomeFeedSkeleton() {
  return (
    <>
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
    </>
  );
}
