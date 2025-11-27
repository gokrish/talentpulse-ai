import React, { useState } from 'react';
import {
  Briefcase, Search, Target, Users, Send, CheckCircle, Eye, Edit2,
  MoreVertical, Plus, MapPin, DollarSign, Calendar, TrendingUp, Zap,
  Play, Pause, AlertCircle, User, Building2, ExternalLink, Chrome,
  Linkedin, Globe, Star, MessageSquare, History, Clock, FileText,
  Filter, Download, Upload, Settings, Bell, ArrowRight, ThumbsUp,
  ThumbsDown, RefreshCw, Mail, Phone, Video, Link2, Copy, Share2,
  Sparkles, Award, Tag, Flag, ChevronRight, X
} from 'lucide-react';

// ============================================================================
// ENHANCED JOB CARD WITH MATCH BUTTON
// ============================================================================
function EnhancedJobCard({ job, onMatch, onClick }: any) {
  const [showQuickActions, setShowQuickActions] = useState(false);

  return (
    <div
      className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-lg transition-all cursor-pointer group relative"
      onClick={onClick}
    >
      {/* Priority Flag */}
      {job.priority === 'urgent' && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
          <Flag className="w-3 h-3" />
          URGENT
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {job.is_featured && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
            <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-blue-600">
              {job.title}
            </h4>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Building2 className="w-3 h-3" />
            <span>{job.client.name}</span>
            <span>•</span>
            <span className="capitalize">{job.source.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Quick Actions Dropdown */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowQuickActions(!showQuickActions);
            }}
            className="p-1 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>

          {showQuickActions && (
            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-xl z-50 w-48 py-1">
              <QuickActionItem icon={Eye} label="View Details" />
              <QuickActionItem icon={Edit2} label="Edit Job" />
              <QuickActionItem icon={Copy} label="Duplicate" />
              <QuickActionItem icon={Share2} label="Share" />
              <QuickActionItem icon={Mail} label="Email Client" />
              <div className="border-t border-gray-200 my-1"></div>
              <QuickActionItem icon={AlertCircle} label="Mark Urgent" danger />
            </div>
          )}
        </div>
      </div>

      {/* Status & Tags */}
      <div className="flex flex-wrap gap-2 mb-3">
        <StatusBadge status={job.status} />
        <PriorityBadge priority={job.priority} />
        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
          {job.contract_type}
        </span>
        {job.approval_status && (
          <ApprovalBadge status={job.approval_status} />
        )}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="w-3 h-3" />
          <span>{job.rate_range || job.salary_range}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{job.start_date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3" />
          <span>{job.filled_positions}/{job.num_positions} filled</span>
        </div>
      </div>

      {/* Candidate Pipeline with Stages */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
          <span className="font-medium">Candidate Pipeline</span>
          <span className="text-gray-900 font-semibold">{job.candidates_count} total</span>
        </div>
        <CandidatePipelineMini pipeline={job.pipeline_stages} />
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Position Progress</span>
          <span className="font-semibold text-gray-900">
            {Math.round((job.filled_positions / job.num_positions) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              job.filled_positions === job.num_positions ? 'bg-green-600' : 'bg-blue-600'
            }`}
            style={{ width: `${(job.filled_positions / job.num_positions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="flex gap-2 mb-3">
        {/* MATCH/SOURCE BUTTON - PRIMARY ACTION */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMatch(job);
          }}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 font-medium text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
        >
          <Target className="w-4 h-4" />
          Match Candidates
        </button>

        {/* Submit for Review (if pending) */}
        {job.approval_status === 'draft' && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Submit for review logic
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium text-sm flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Submit
          </button>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        {/* Assigned To */}
        <div className="flex items-center gap-2">
          {job.assigned_to ? (
            <>
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-medium text-blue-600">
                {job.assigned_to.name.charAt(0)}
              </div>
              <span className="text-xs text-gray-600 truncate max-w-[100px]">
                {job.assigned_to.name}
              </span>
            </>
          ) : (
            <span className="text-xs text-gray-400">Unassigned</span>
          )}
        </div>

        {/* Health & Activity */}
        <div className="flex items-center gap-3">
          {job.notes_count > 0 && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <MessageSquare className="w-3 h-3" />
              <span>{job.notes_count}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <TrendingUp className={`w-4 h-4 ${
              job.health_score >= 70 ? 'text-green-600' :
              job.health_score >= 40 ? 'text-yellow-600' : 'text-red-600'
            }`} />
            <span className="text-xs font-semibold text-gray-900">{job.health_score}%</span>
          </div>
        </div>
      </div>

      {/* Last Activity */}
      <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
        <Clock className="w-3 h-3" />
        <span>Updated {job.last_activity}</span>
      </div>
    </div>
  );
}

// ============================================================================
// CANDIDATE PIPELINE MINI VISUALIZATION
// ============================================================================
function CandidatePipelineMini({ pipeline }: any) {
  const stages = [
    { key: 'sourced', label: 'Sourced', color: 'bg-gray-400' },
    { key: 'screening', label: 'Screening', color: 'bg-blue-400' },
    { key: 'submitted', label: 'Submitted', color: 'bg-purple-400' },
    { key: 'interview', label: 'Interview', color: 'bg-orange-400' },
    { key: 'offer', label: 'Offer', color: 'bg-green-400' }
  ];

  return (
    <div className="flex gap-1">
      {stages.map((stage) => {
        const count = pipeline[stage.key] || 0;
        return (
          <div
            key={stage.key}
            className="flex-1 relative group"
            title={`${stage.label}: ${count}`}
          >
            <div className={`h-2 rounded ${count > 0 ? stage.color : 'bg-gray-200'}`}></div>
            {count > 0 && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {stage.label}: {count}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// MATCH/SOURCE CANDIDATES MODAL
// ============================================================================
function MatchCandidatesModal({ job, onClose }: any) {
  const [activeTab, setActiveTab] = useState<'internal' | 'linkedin' | 'jobboards'>('internal');
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState<any[]>([]);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);

  // Auto-populate search from job skills
  React.useEffect(() => {
    const skillsQuery = job.required_skills.slice(0, 3).join(' ');
    setSearchQuery(skillsQuery);
  }, [job]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Match Candidates</h2>
              <p className="text-sm text-gray-600">
                For: <span className="font-semibold">{job.title}</span> at {job.client.name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by skills, experience, location..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
              Search
            </button>
          </div>
        </div>

        {/* Source Tabs */}
        <div className="flex border-b border-gray-200 px-6 bg-gray-50">
          <SourceTab
            icon={Users}
            label="Internal Database"
            active={activeTab === 'internal'}
            onClick={() => setActiveTab('internal')}
            badge="245 candidates"
          />
          <SourceTab
            icon={Linkedin}
            label="LinkedIn"
            active={activeTab === 'linkedin'}
            onClick={() => setActiveTab('linkedin')}
            badge="Chrome Extension"
          />
          <SourceTab
            icon={Globe}
            label="Job Boards"
            active={activeTab === 'jobboards'}
            onClick={() => setActiveTab('jobboards')}
            badge="Indeed, Monster"
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'internal' && (
            <InternalCandidateMatches 
              job={job}
              searchQuery={searchQuery}
              selectedCandidates={selectedCandidates}
              onToggleCandidate={(id) => {
                setSelectedCandidates(prev =>
                  prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
                );
              }}
            />
          )}

          {activeTab === 'linkedin' && (
            <LinkedInSourceTab job={job} />
          )}

          {activeTab === 'jobboards' && (
            <JobBoardsTab job={job} />
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {selectedCandidates.length} candidate(s) selected
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-white font-medium"
            >
              Cancel
            </button>
            <button
              disabled={selectedCandidates.length === 0}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add {selectedCandidates.length > 0 && `(${selectedCandidates.length})`} to Job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// INTERNAL CANDIDATE MATCHES
// ============================================================================
function InternalCandidateMatches({ job, searchQuery, selectedCandidates, onToggleCandidate }: any) {
  // Mock candidates with match scores
  const candidates = [
    {
      id: 'C1',
      name: 'John Doe',
      title: 'Senior Full Stack Developer',
      location: 'Brussels, Belgium',
      experience: '6 years',
      skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
      match_score: 95,
      availability: 'Available immediately',
      rate: '€650/day',
      last_active: '2 days ago',
      status: 'Active',
      avatar: null
    },
    {
      id: 'C2',
      name: 'Jane Smith',
      title: 'Full Stack Developer',
      location: 'Amsterdam, Netherlands',
      experience: '5 years',
      skills: ['React', 'Node.js', 'JavaScript', 'MongoDB', 'Docker'],
      match_score: 88,
      availability: 'Available in 2 weeks',
      rate: '€600/day',
      last_active: '1 week ago',
      status: 'Active',
      avatar: null
    },
    {
      id: 'C3',
      name: 'Mike Johnson',
      title: 'Backend Developer',
      location: 'Remote',
      experience: '7 years',
      skills: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'GraphQL'],
      match_score: 82,
      availability: 'Available next month',
      rate: '€620/day',
      last_active: '3 days ago',
      status: 'Active',
      avatar: null
    }
  ];

  return (
    <div>
      {/* Match Summary */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">AI-Powered Matching</h3>
        </div>
        <p className="text-sm text-blue-800">
          Found <span className="font-bold">{candidates.length} candidates</span> matching job requirements.
          Sorted by relevance score based on skills, experience, and availability.
        </p>
      </div>

      {/* Candidate Cards */}
      <div className="space-y-4">
        {candidates.map((candidate) => (
          <CandidateMatchCard
            key={candidate.id}
            candidate={candidate}
            job={job}
            selected={selectedCandidates.includes(candidate.id)}
            onToggle={() => onToggleCandidate(candidate.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// CANDIDATE MATCH CARD
// ============================================================================
function CandidateMatchCard({ candidate, job, selected, onToggle }: any) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`border-2 rounded-lg p-4 transition-all ${
      selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'
    }`}>
      <div className="flex gap-4">
        {/* Checkbox */}
        <div className="flex items-start pt-1">
          <input
            type="checkbox"
            checked={selected}
            onChange={onToggle}
            className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
          {candidate.name.charAt(0)}
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-gray-900 text-lg">{candidate.name}</h4>
              <p className="text-sm text-gray-600">{candidate.title}</p>
            </div>

            {/* Match Score */}
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 border border-green-300 rounded-full">
              <Award className="w-4 h-4 text-green-600" />
              <span className="font-bold text-green-700">{candidate.match_score}%</span>
              <span className="text-xs text-green-600">match</span>
            </div>
          </div>

          {/* Key Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{candidate.location}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Briefcase className="w-4 h-4" />
              <span>{candidate.experience}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <DollarSign className="w-4 h-4" />
              <span>{candidate.rate}</span>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>{candidate.availability}</span>
            </div>
          </div>

          {/* Skills Match */}
          <div className="mb-3">
            <div className="text-xs text-gray-600 mb-2 font-medium">Skills Match:</div>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill: string, idx: number) => {
                const isRequired = job.required_skills.includes(skill);
                return (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      isRequired
                        ? 'bg-green-100 text-green-700 border border-green-300'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {skill}
                    {isRequired && ' ✓'}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-1">
              <Eye className="w-4 h-4" />
              View Profile
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-1">
              <Mail className="w-4 h-4" />
              Email
            </button>
            <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-1">
              <Phone className="w-4 h-4" />
              Call
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium flex items-center gap-1"
            >
              <ChevronRight className={`w-4 h-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
              {expanded ? 'Less' : 'More'} Info
            </button>
          </div>

          {/* Expanded Details */}
          {expanded && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className="ml-2 font-medium text-gray-900">{candidate.status}</span>
                </div>
                <div>
                  <span className="text-gray-600">Last Active:</span>
                  <span className="ml-2 font-medium text-gray-900">{candidate.last_active}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// LINKEDIN SOURCE TAB
// ============================================================================
function LinkedInSourceTab({ job }: any) {
  return (
    <div className="space-y-6">
      {/* Chrome Extension Promo */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white bg-opacity-20 rounded-lg">
            <Chrome className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">LinkedIn Chrome Extension</h3>
            <p className="text-blue-100 mb-4">
              Source candidates directly from LinkedIn with one click. Auto-import profiles, 
              send InMails, and track engagement - all without leaving LinkedIn.
            </p>
            <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 font-medium flex items-center gap-2">
              <Chrome className="w-5 h-5" />
              Install Extension
            </button>
          </div>
        </div>
      </div>

      {/* LinkedIn Recruiter Integration */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Linkedin className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">LinkedIn Recruiter</h3>
        </div>
        <p className="text-gray-600 mb-4">
          Connect your LinkedIn Recruiter account to search millions of professionals
          and automatically import candidates to this job.
        </p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          Connect LinkedIn Recruiter
        </button>
      </div>

      {/* Search Builder */}
      <div className="border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Build LinkedIn Search</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
            <input
              type="text"
              placeholder={job.required_skills.join(' OR ')}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              placeholder={job.location}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2">
            <ExternalLink className="w-5 h-5" />
            Open in LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// JOB BOARDS TAB
// ============================================================================
function JobBoardsTab({ job }: any) {
  const jobBoards = [
    { name: 'Indeed', icon: Globe, connected: true },
    { name: 'Monster', icon: Globe, connected: true },
    { name: 'Glassdoor', icon: Globe, connected: false },
    { name: 'Dice', icon: Globe, connected: false }
  ];

  return (
    <div className="space-y-6">
      {/* Auto-Post Feature */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-6 h-6 text-purple-600" />
          <h3 className="text-lg font-semibold text-purple-900">Multi-Channel Broadcasting</h3>
        </div>
        <p className="text-purple-800 mb-4">
          Post this job to multiple job boards with one click. Automatically sync applications back to your ATS.
        </p>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
          Post to All Boards
        </button>
      </div>

      {/* Connected Boards */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Job Boards</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobBoards.map((board) => (
            <div
              key={board.name}
              className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <board.icon className="w-6 h-6 text-gray-600" />
                <div>
                  <div className="font-medium text-gray-900">{board.name}</div>
                  <div className="text-xs text-gray-500">
                    {board.connected ? 'Connected' : 'Not connected'}
                  </div>
                </div>
              </div>
              <button
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  board.connected
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {board.connected ? 'Post Job' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// APPROVAL WORKFLOW BADGE & PANEL
// ============================================================================
function ApprovalBadge({ status }: { status: 'draft' | 'pending_review' | 'approved' | 'rejected' }) {
  const config = {
    draft: { label: 'Draft', color: 'bg-gray-100 text-gray-700 border-gray-300' },
    pending_review: { label: 'Pending Review', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    approved: { label: 'Approved', color: 'bg-green-100 text-green-700 border-green-300' },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700 border-red-300' }
  };

  const { label, color } = config[status];

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${color} flex items-center gap-1`}>
      <Clock className="w-3 h-3" />
      {label}
    </span>
  );
}

function ApprovalWorkflowPanel({ job, onSubmitForReview, onApprove, onReject }: any) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-blue-600" />
        Approval Workflow
      </h3>

      {/* Current Status */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Current Status:</span>
          <ApprovalBadge status={job.approval_status} />
        </div>
        {job.approval_history && job.approval_history.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="text-xs text-gray-600">
              Last action: {job.approval_history[0].action} by {job.approval_history[0].user}
              <br />
              {job.approval_history[0].timestamp}
            </div>
          </div>
        )}
      </div>

      {/* Actions based on status */}
      {job.approval_status === 'draft' && (
        <div>
          <p className="text-sm text-gray-600 mb-4">
            This job is in draft. Submit it for manager review before activating.
          </p>
          <button
            onClick={onSubmitForReview}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Submit for Review
          </button>
        </div>
      )}

      {job.approval_status === 'pending_review' && (
        <div>
          <p className="text-sm text-gray-600 mb-4">
            Waiting for manager approval. You'll be notified once reviewed.
          </p>
          <div className="flex gap-3">
            <button
              onClick={onApprove}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center justify-center gap-2"
            >
              <ThumbsUp className="w-5 h-5" />
              Approve
            </button>
            <button
              onClick={onReject}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium flex items-center justify-center gap-2"
            >
              <ThumbsDown className="w-5 h-5" />
              Reject
            </button>
          </div>
        </div>
      )}

      {job.approval_status === 'approved' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <div className="font-medium text-green-900">Approved</div>
            <div className="text-sm text-green-700">Job is active and visible to candidates</div>
          </div>
        </div>
      )}

      {job.approval_status === 'rejected' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-6 h-6 text-red-600" />
            <div className="font-medium text-red-900">Rejected</div>
          </div>
          <p className="text-sm text-red-700 mb-3">
            {job.rejection_reason || 'This job requires changes before approval.'}
          </p>
          <button
            onClick={onSubmitForReview}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium text-sm"
          >
            Resubmit after Changes
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================
function QuickActionItem({ icon: Icon, label, danger = false }: any) {
  return (
    <button
      onClick={(e) => e.stopPropagation()}
      className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-sm ${
        danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}

function SourceTab({ icon: Icon, label, active, onClick, badge }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 flex items-center gap-2 border-b-2 transition-colors ${
        active
          ? 'border-blue-600 text-blue-600 bg-white'
          : 'border-transparent text-gray-600 hover:text-gray-900'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
      {badge && (
        <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
          {badge}
        </span>
      )}
    </button>
  );
}

function StatusBadge({ status }: any) {
  const colors = {
    new: 'bg-blue-100 text-blue-700 border-blue-300',
    active: 'bg-green-100 text-green-700 border-green-300',
    in_progress: 'bg-purple-100 text-purple-700 border-purple-300',
    on_hold: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    filled: 'bg-teal-100 text-teal-700 border-teal-300',
    closed: 'bg-gray-100 text-gray-700 border-gray-300'
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${colors[status]}`}>
      {status.replace('_', ' ')}
    </span>
  );
}

function PriorityBadge({ priority }: any) {
  const colors = {
    low: 'bg-gray-100 text-gray-700 border-gray-300',
    medium: 'bg-blue-100 text-blue-700 border-blue-300',
    high: 'bg-orange-100 text-orange-700 border-orange-300',
    urgent: 'bg-red-100 text-red-700 border-red-300'
  };

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${colors[priority]}`}>
      {priority}
    </span>
  );
}

// ============================================================================
// EXPORT
// ============================================================================
export {
  EnhancedJobCard,
  MatchCandidatesModal,
  ApprovalWorkflowPanel,
  CandidatePipelineMini
};