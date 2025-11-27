import { Job } from '@/lib/types';
import { Briefcase, FileText, PauseCircle, Archive } from 'lucide-react';

interface KanbanViewProps {
  jobs: Job[];
}

const statusConfig = {
  active: { label: 'Active', icon: Briefcase, color: 'bg-green-50 border-green-200' },
  draft: { label: 'Draft', icon: FileText, color: 'bg-gray-50 border-gray-200' },
  archived: { label: 'Archived', icon: Archive, color: 'bg-blue-50 border-blue-200' }
};

export default function KanbanView({ jobs }: KanbanViewProps) {
  const jobsByStatus = {
    active: jobs.filter(job => job.status === 'active'),
    draft: jobs.filter(job => job.status === 'draft'),
    archived: jobs.filter(job => job.status === 'archived')
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.entries(statusConfig).map(([status, config]) => {
        const Icon = config.icon;
        return (
          <div key={status} className={`rounded-xl border p-4 ${config.color}`}>
            <div className="flex items-center gap-2 mb-4">
              <Icon className="w-5 h-5" />
              <h3 className="font-semibold text-gray-900">{config.label}</h3>
              <span className="px-2 py-1 bg-white rounded-full text-xs font-semibold text-gray-700">
                {jobsByStatus[status as keyof typeof jobsByStatus].length}
              </span>
            </div>
            
            <div className="space-y-3">
              {jobsByStatus[status as keyof typeof jobsByStatus].map(job => (
                <KanbanJobCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function KanbanJobCard({ job }: { job: Job }) {
  return (
    <div className="bg-white rounded-lg border p-3 shadow-sm hover:shadow-md transition-shadow">
      <h4 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2">
        {job.title}
      </h4>
      
      {job.company && (
        <p className="text-xs text-gray-600 mb-2">{job.company}</p>
      )}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{job.locations[0] || 'Remote'}</span>
        <span className="capitalize">{job.seniority_level}</span>
      </div>

      {job.required_skills.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {job.required_skills.slice(0, 2).map(skill => (
            <span key={skill} className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
              {skill}
            </span>
          ))}
          {job.required_skills.length > 2 && (
            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">
              +{job.required_skills.length - 2}
            </span>
          )}
        </div>
      )}
    </div>
  );
}