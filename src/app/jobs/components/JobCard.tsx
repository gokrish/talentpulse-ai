import Link from 'next/link';
import { 
  Briefcase, MapPin, DollarSign, Calendar, Users, 
  TrendingUp, MoreVertical, Eye, Edit2, Target 
} from 'lucide-react';
import { Job } from '@/lib/types';

interface JobCardProps {
  job: Job;
  viewMode: 'grid' | 'list' | 'kanban';
}

export default function JobCard({ job, viewMode }: JobCardProps) {
  if (viewMode === 'list') {
    return <JobListItem job={job} />;
  }
  
  return <JobGridItem job={job} />;
}

function JobGridItem({ job }: { job: Job }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
            {job.title}
          </h3>
          {job.company && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Briefcase className="w-4 h-4" />
              <span>{job.company}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            job.status === 'active' ? 'bg-green-100 text-green-700' :
            job.status === 'draft' ? 'bg-gray-100 text-gray-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {job.status}
          </span>
        </div>
      </div>

      {/* Quick Info */}
      <div className="space-y-2 mb-3 text-sm text-gray-600">
        {job.locations.length > 0 && (
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{job.locations[0]}</span>
            {job.locations.length > 1 && (
              <span className="text-xs text-gray-500">+{job.locations.length - 1} more</span>
            )}
          </div>
        )}
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          <span className="capitalize">{job.seniority_level}</span>
          <span>•</span>
          <span className="capitalize">{job.location_type}</span>
        </div>
      </div>

      {/* Skills */}
      {job.required_skills.length > 0 && (
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {job.required_skills.slice(0, 3).map(skill => (
              <span key={skill} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded border border-red-200">
                {skill}
              </span>
            ))}
            {job.required_skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{job.required_skills.length - 3}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="w-3 h-3" />
          <span>{new Date(job.created_at).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <Link 
            href={`/match?jobId=${job.id}`}
            className="p-1 hover:bg-blue-50 rounded transition"
            title="Match Candidates"
          >
            <Target className="w-4 h-4 text-blue-600" />
          </Link>
          <Link 
            href={`/jobs/${job.id}`}
            className="p-1 hover:bg-gray-50 rounded transition"
            title="View Details"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function JobListItem({ job }: { job: Job }) {
  return (
    <div className="bg-white border-b hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between p-4">
        <div className="flex-1 grid grid-cols-12 gap-4 items-center">
          {/* Title & Company */}
          <div className="col-span-4">
            <h3 className="font-semibold text-gray-900">{job.title}</h3>
            {job.company && (
              <p className="text-sm text-gray-600">{job.company}</p>
            )}
          </div>

          {/* Location */}
          <div className="col-span-2">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{job.locations[0] || 'Remote'}</span>
            </div>
          </div>

          {/* Seniority */}
          <div className="col-span-2">
            <span className="text-sm text-gray-600 capitalize">
              {job.seniority_level}
            </span>
          </div>

          {/* Status */}
          <div className="col-span-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              job.status === 'active' ? 'bg-green-100 text-green-700' :
              job.status === 'draft' ? 'bg-gray-100 text-gray-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {job.status}
            </span>
          </div>

          {/* Actions */}
          <div className="col-span-2 flex justify-end gap-2">
            <Link 
              href={`/match?jobId=${job.id}`}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition"
            >
              Match
            </Link>
            <Link 
              href={`/jobs/${job.id}`}
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}