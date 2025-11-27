// src/app/jobs/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Briefcase, Plus, Search, Filter, Grid, List, Trello,
  MapPin, DollarSign, Calendar, Users, TrendingUp,
  Building2, Clock, MoreVertical, Eye, Edit2, Trash2,
  Target, CheckCircle, AlertCircle, Play, Pause
} from 'lucide-react';

type ViewMode = 'grid' | 'list' | 'kanban';
type JobStatus = 'all' | 'active' | 'draft' | 'on_hold' | 'closed';

interface Job {
  id: string;
  title: string;
  client: {
    id: string;
    name: string;
  };
  status: 'active' | 'draft' | 'on_hold' | 'closed';
  location: string;
  contract_type: 'freelance' | 'permanent';
  rate_range?: string;
  salary_range?: string;
  num_positions: number;
  filled_positions: number;
  candidates_count: number;
  submissions_count: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created_at: string;
  start_date: string;
  required_skills: string[];
  assigned_to?: {
    id: string;
    name: string;
  };
  health_score: number; // 0-100
}

// This will be replaced with real API data
const PLACEHOLDER_JOBS: Job[] = [];

export default function JobsListPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [statusFilter, setStatusFilter] = useState<JobStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    try {
      setLoading(true);
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data.data || []);
      }
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredJobs = jobs.filter(job => {
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

// Grid View Component
function GridView({ jobs }: { jobs: Job[] }) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {jobs.map((job) => (
        <div
          key={job.id}
          onClick={() => router.push(`/jobs/${job.id}`)}
          className="bg-white rounded-xl border shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-1 line-clamp-1">
                {job.title}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building2 className="w-4 h-4" />
                <span className="truncate">{job.client.name}</span>
              </div>
            </div>
            <StatusBadge status={job.status} />
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              <span className="truncate">{job.rate_range || job.salary_range}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{job.filled_positions}/{job.num_positions} filled</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              <span>{job.candidates_count} candidates</span>
            </div>
          </div>
          {loading ? (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    ) : filteredJobs.length === 0 ? (
      <EmptyState hasJobs={jobs.length > 0} onCreateJob={() => router.push('/jobs/new')} />
    ) : (
      <>
        {viewMode === 'grid' && <GridView jobs={filteredJobs} />}
        {viewMode === 'list' && <ListView jobs={filteredJobs} />}
        {viewMode === 'kanban' && <KanbanView jobs={filteredJobs} />}
      </>
    )}

          {/* Progress */}
          <div className="mb-3">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span className="font-semibold">{Math.round((job.filled_positions / job.num_positions) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${(job.filled_positions / job.num_positions) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t text-xs">
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{new Date(job.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className={`w-4 h-4 ${
                job.health_score >= 70 ? 'text-green-600' : 
                job.health_score >= 40 ? 'text-yellow-600' : 'text-red-600'
              }`} />
              <span className="font-semibold text-gray-900">{job.health_score}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// List View Component
function ListView({ jobs }: { jobs: Job[] }) {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Job Title</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Client</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Progress</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Candidates</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Health</th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {jobs.map((job) => (
            <tr
              key={job.id}
              onClick={() => router.push(`/jobs/${job.id}`)}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-4 py-3">
                <div className="font-medium text-gray-900">{job.title}</div>
                <div className="text-xs text-gray-500">{job.location}</div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{job.client.name}</td>
              <td className="px-4 py-3">
                <StatusBadge status={job.status} />
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(job.filled_positions / job.num_positions) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600">{job.filled_positions}/{job.num_positions}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-sm text-gray-700">{job.candidates_count}</td>
              <td className="px-4 py-3">
                <span className={`text-sm font-semibold ${
                  job.health_score >= 70 ? 'text-green-600' :
                  job.health_score >= 40 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {job.health_score}%
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Actions menu
                  }}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Kanban View Component
function KanbanView({ jobs }: { jobs: Job[] }) {
  const statuses = ['active', 'draft', 'on_hold', 'closed'] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statuses.map((status) => {
        const statusJobs = jobs.filter(j => j.status === status);
        return (
          <div key={status} className="bg-gray-100 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 capitalize">{status.replace('_', ' ')}</h3>
              <span className="px-2 py-1 bg-white rounded-full text-xs font-semibold text-gray-700">
                {statusJobs.length}
              </span>
            </div>
            <div className="space-y-3">
              {statusJobs.map((job) => (
                <KanbanCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function KanbanCard({ job }: { job: Job }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/jobs/${job.id}`)}
      className="bg-white rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200"
    >
      <h4 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2">{job.title}</h4>
      <div className="text-xs text-gray-600 mb-2">{job.client.name}</div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">{job.filled_positions}/{job.num_positions}</span>
        <span className={`font-semibold ${
          job.health_score >= 70 ? 'text-green-600' :
          job.health_score >= 40 ? 'text-yellow-600' : 'text-red-600'
        }`}>
          {job.health_score}%
        </span>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ label, value, icon: Icon, color }: any) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200'
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm p-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Job['status'] }) {
  const config = {
    active: { label: 'Active', color: 'bg-green-100 text-green-700 border-green-300' },
    draft: { label: 'Draft', color: 'bg-gray-100 text-gray-700 border-gray-300' },
    on_hold: { label: 'On Hold', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    closed: { label: 'Closed', color: 'bg-blue-100 text-blue-700 border-blue-300' }
  };

  const { label, color } = config[status];

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${color}`}>
      {label}
    </span>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading jobs...</p>
      </div>
    </div>
  );
}

function EmptyState({ hasJobs, onCreateJob }: { hasJobs: boolean; onCreateJob: () => void }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-16 text-center">
      <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {hasJobs ? 'No jobs match your filters' : 'No jobs yet'}
      </h3>
      <p className="text-gray-600 mb-6">
        {hasJobs ? 'Try adjusting your search or filters' : 'Create your first job to start recruiting'}
      </p>
      <button
        onClick={onCreateJob}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
      >
        <Plus className="w-5 h-5 inline mr-2" />
        Create First Job
      </button>
    </div>
  );
}