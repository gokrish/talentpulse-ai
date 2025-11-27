import { Job } from '@/lib/types';
import JobCard from './JobCard';

interface GridViewProps {
  jobs: Job[];
  loading?: boolean;
}

export default function GridView({ jobs, loading = false }: GridViewProps) {
  if (loading) {
    return <GridViewSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} viewMode="grid" />
      ))}
    </div>
  );
}

function GridViewSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-xl border shadow-sm p-5 animate-pulse">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="h-6 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="space-y-2 mb-3">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
          <div className="flex gap-1 mb-3">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-6 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="flex justify-between pt-3 border-t">
            <div className="h-3 bg-gray-200 rounded w-20"></div>
            <div className="flex gap-2">
              <div className="h-6 bg-gray-200 rounded w-6"></div>
              <div className="h-6 bg-gray-200 rounded w-6"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}