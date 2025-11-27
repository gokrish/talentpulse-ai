import { Job } from '@/lib/types';
import JobCard from './JobCard';

interface ListViewProps {
  jobs: Job[];
  loading?: boolean;
}

export default function ListView({ jobs, loading = false }: ListViewProps) {
  if (loading) {
    return <ListViewSkeleton />;
  }

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b text-xs font-semibold text-gray-700 uppercase">
        <div className="col-span-4">Position</div>
        <div className="col-span-2">Location</div>
        <div className="col-span-2">Level</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>
      <div className="divide-y">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} viewMode="list" />
        ))}
      </div>
    </div>
  );
}

function ListViewSkeleton() {
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b text-xs font-semibold text-gray-700 uppercase">
        <div className="col-span-4">Position</div>
        <div className="col-span-2">Location</div>
        <div className="col-span-2">Level</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2 text-right">Actions</div>
      </div>
      <div className="divide-y">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 animate-pulse">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="col-span-2">
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="col-span-2">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="col-span-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <div className="h-8 bg-gray-200 rounded w-16"></div>
                <div className="h-8 bg-gray-200 rounded w-12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}