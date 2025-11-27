import React, { useState } from 'react';
import {
  Send, Calendar, MessageSquare, CheckCircle, XCircle, Clock,
  User, Building2, Phone, Mail, Video, FileText, Edit2, Save,
  AlertCircle, TrendingUp, ArrowLeft, Plus, Download, Eye,
  ThumbsUp, ThumbsDown, Flag, Star, History, Link2, ChevronRight,
  Paperclip, Award, Target, Activity, Bell, RefreshCw, Users
} from 'lucide-react';

// ============================================================================
// SUBMISSION DETAIL PAGE (Complete View)
// ============================================================================
export default function SubmissionDetailPage({ submissionId }: { submissionId: string }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'interviews' | 'feedback' | 'timeline'>('overview');
  
  // Mock submission data
  const submission = {
    id: 'SUB-2024-0123',
    candidate: {
      id: 'C-001',
      name: 'John Doe',
      title: 'Senior Full Stack Developer',
      email: 'john.doe@email.com',
      phone: '+32 478 12 34 56',
      location: 'Brussels, Belgium',
      rate: '€650/day',
      availability: 'Available immediately',
      resume_url: '/files/john-doe-resume.pdf'
    },
    job: {
      id: 'JOB-045',
      title: 'Senior Java Developer',
      client: 'TechCorp Solutions',
      rate_range: '€600-700/day',
      location: 'Brussels',
      contract_type: 'Freelance'
    },
    submission_details: {
      submitted_by: 'Sarah Johnson',
      submitted_date: '2025-01-15T10:30:00Z',
      submission_method: 'Email',
      status: 'submitted', // submitted, shortlisted, interview, rejected, offered, accepted
      priority: 'high'
    },
    client_feedback: {
      status: 'shortlisted',
      feedback_date: '2025-01-16T14:00:00Z',
      feedback_by: 'Mike Anderson (Client)',
      comments: 'Strong technical background. Would like to schedule technical interview.',
      rating: 4
    },
    interviews: [
      {
        id: 'INT-001',
        round: 'Technical Interview',
        type: 'video',
        scheduled_date: '2025-01-20T14:00:00Z',
        duration: '60 minutes',
        interviewer: 'Mike Anderson',
        status: 'scheduled',
        meeting_link: 'https://meet.google.com/abc-defg-hij',
        notes: ''
      }
    ],
    screening_checklist: {
      phone_screen_done: true,
      rate_confirmed: true,
      rtr_confirmed: true,
      availability_ok: true,
      visa_ok: true,
      other_submissions_checked: true
    },
    timeline: [
      { id: '1', date: '2025-01-16T14:00:00Z', event: 'Client Feedback', description: 'Candidate shortlisted for interview', user: 'Mike Anderson' },
      { id: '2', date: '2025-01-15T15:30:00Z', event: 'Email Viewed', description: 'Client viewed submission email', user: 'System' },
      { id: '3', date: '2025-01-15T10:30:00Z', event: 'Submitted to Client', description: 'Candidate profile sent to TechCorp Solutions', user: 'Sarah Johnson' },
      { id: '4', date: '2025-01-15T09:00:00Z', event: 'Team Approved', description: 'Approved for client submission', user: 'Team Lead' },
      { id: '5', date: '2025-01-14T16:45:00Z', event: 'Screening Complete', description: 'All mandatory checks completed', user: 'Sarah Johnson' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="p-6 max-w-7xl mx-auto">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Submissions
          </button>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{submission.candidate.name}</h1>
                <SubmissionStatusBadge status={submission.submission_details.status} />
                {submission.submission_details.priority === 'high' && (
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium flex items-center gap-1">
                    <Flag className="w-4 h-4" />
                    High Priority
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-1">{submission.candidate.title}</p>
              <p className="text-sm text-gray-500">
                For: <span className="font-semibold">{submission.job.title}</span> at{' '}
                <span className="font-semibold">{submission.job.client}</span>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Submission ID: {submission.id} • Submitted {new Date(submission.submission_details.submitted_date).toLocaleDateString()}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Client
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedule Interview
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mt-6 border-b border-gray-200">
            <TabButton
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
              label="Overview"
            />
            <TabButton
              active={activeTab === 'interviews'}
              onClick={() => setActiveTab('interviews')}
              label="Interviews"
              badge={submission.interviews.length}
            />
            <TabButton
              active={activeTab === 'feedback'}
              onClick={() => setActiveTab('feedback')}
              label="Client Feedback"
            />
            <TabButton
              active={activeTab === 'timeline'}
              onClick={() => setActiveTab('timeline')}
              label="Timeline"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {activeTab === 'overview' && <OverviewTab submission={submission} />}
        {activeTab === 'interviews' && <InterviewsTab submission={submission} />}
        {activeTab === 'feedback' && <FeedbackTab submission={submission} />}
        {activeTab === 'timeline' && <TimelineTab submission={submission} />}
      </div>
    </div>
  );
}

// ============================================================================
// OVERVIEW TAB
// ============================================================================
function OverviewTab({ submission }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Candidate & Job Info */}
      <div className="lg:col-span-2 space-y-6">
        {/* Candidate Profile */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Candidate Profile</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              <Eye className="w-4 h-4" />
              View Full Profile
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <InfoRow icon={User} label="Name" value={submission.candidate.name} />
            <InfoRow icon={Building2} label="Current Title" value={submission.candidate.title} />
            <InfoRow icon={Mail} label="Email" value={submission.candidate.email} />
            <InfoRow icon={Phone} label="Phone" value={submission.candidate.phone} />
            <InfoRow icon={Clock} label="Availability" value={submission.candidate.availability} />
            <InfoRow icon={Target} label="Rate" value={submission.candidate.rate} />
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2">
              <Paperclip className="w-4 h-4" />
              View Resume / CV
            </button>
          </div>
        </div>

        {/* Job Details */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <InfoRow label="Job ID" value={submission.job.id} />
            <InfoRow label="Client" value={submission.job.client} />
            <InfoRow label="Position" value={submission.job.title} />
            <InfoRow label="Location" value={submission.job.location} />
            <InfoRow label="Contract Type" value={submission.job.contract_type} />
            <InfoRow label="Rate Range" value={submission.job.rate_range} />
          </div>
        </div>

        {/* Screening Checklist Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Pre-Screening Checklist
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <ChecklistItem label="Phone Screen" checked={submission.screening_checklist.phone_screen_done} />
            <ChecklistItem label="Rate Confirmed" checked={submission.screening_checklist.rate_confirmed} />
            <ChecklistItem label="RTR Confirmed" checked={submission.screening_checklist.rtr_confirmed} />
            <ChecklistItem label="Availability OK" checked={submission.screening_checklist.availability_ok} />
            <ChecklistItem label="Visa Status OK" checked={submission.screening_checklist.visa_ok} />
            <ChecklistItem label="No Conflicts" checked={submission.screening_checklist.other_submissions_checked} />
          </div>
        </div>
      </div>

      {/* Right Column - Status & Actions */}
      <div className="space-y-6">
        {/* Submission Status */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Status</h3>
          <SubmissionProgressTracker status={submission.submission_details.status} />
        </div>

        {/* Latest Feedback */}
        {submission.client_feedback && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Client Feedback</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <SubmissionStatusBadge status={submission.client_feedback.status} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rating</span>
                <StarRating rating={submission.client_feedback.rating} />
              </div>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-700">{submission.client_feedback.comments}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {submission.client_feedback.feedback_by} • {new Date(submission.client_feedback.feedback_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-left font-medium transition-colors">
              📅 Schedule Interview
            </button>
            <button className="w-full px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-left font-medium transition-colors">
              📧 Email Client Update
            </button>
            <button className="w-full px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-left font-medium transition-colors">
              📞 Call Candidate
            </button>
            <button className="w-full px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-left font-medium transition-colors">
              📝 Add Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// INTERVIEWS TAB
// ============================================================================
function InterviewsTab({ submission }: any) {
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Schedule New Interview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Interview Schedule</h2>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Schedule Interview
          </button>
        </div>

        {/* Interview List */}
        {submission.interviews.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">No interviews scheduled yet</p>
            <button
              onClick={() => setShowScheduleModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Schedule First Interview
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {submission.interviews.map((interview: any) => (
              <InterviewCard key={interview.id} interview={interview} />
            ))}
          </div>
        )}
      </div>

      {/* Interview Preparation Checklist */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Preparation</h3>
        <div className="space-y-3">
          <CheckboxItem label="Send interview invite to candidate" />
          <CheckboxItem label="Share job description with candidate" />
          <CheckboxItem label="Brief candidate on company culture" />
          <CheckboxItem label="Confirm candidate availability" />
          <CheckboxItem label="Send reminder 24 hours before" />
          <CheckboxItem label="Prepare interview questions" />
        </div>
      </div>

      {/* Schedule Interview Modal */}
      {showScheduleModal && (
        <ScheduleInterviewModal
          submission={submission}
          onClose={() => setShowScheduleModal(false)}
        />
      )}
    </div>
  );
}

// ============================================================================
// FEEDBACK TAB
// ============================================================================
function FeedbackTab({ submission }: any) {
  const [newFeedback, setNewFeedback] = useState({
    status: 'shortlisted',
    rating: 0,
    comments: ''
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Add New Feedback */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Record Client Feedback</h2>
        
        <div className="space-y-4">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client Decision
            </label>
            <select
              value={newFeedback.status}
              onChange={(e) => setNewFeedback({...newFeedback, status: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="shortlisted">✅ Shortlisted</option>
              <option value="interview">📅 Schedule Interview</option>
              <option value="rejected">❌ Rejected</option>
              <option value="hold">⏸️ On Hold</option>
            </select>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setNewFeedback({...newFeedback, rating})}
                  className={`w-10 h-10 rounded-lg border-2 transition-colors ${
                    newFeedback.rating >= rating
                      ? 'border-yellow-500 bg-yellow-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Star className={`w-6 h-6 mx-auto ${
                    newFeedback.rating >= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feedback Comments
            </label>
            <textarea
              value={newFeedback.comments}
              onChange={(e) => setNewFeedback({...newFeedback, comments: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={6}
              placeholder="Enter client's feedback, concerns, questions..."
            />
          </div>

          {/* Save Button */}
          <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2">
            <Save className="w-5 h-5" />
            Save Feedback
          </button>
        </div>
      </div>

      {/* Feedback History */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Feedback History</h2>
        
        {submission.client_feedback ? (
          <div className="space-y-4">
            <FeedbackHistoryItem feedback={submission.client_feedback} />
          </div>
        ) : (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No feedback recorded yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// TIMELINE TAB
// ============================================================================
function TimelineTab({ submission }: any) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Submission Timeline</h2>
      
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        {/* Timeline Items */}
        <div className="space-y-6">
          {submission.timeline.map((item: any, index: number) => (
            <TimelineItem key={item.id} item={item} isLast={index === submission.timeline.length - 1} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SCHEDULE INTERVIEW MODAL
// ============================================================================
function ScheduleInterviewModal({ submission, onClose }: any) {
  const [interviewData, setInterviewData] = useState({
    round: 'Technical Interview',
    type: 'video',
    date: '',
    time: '',
    duration: '60',
    interviewer: '',
    location: '',
    meeting_link: '',
    notes: ''
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h2 className="text-2xl font-bold mb-2">Schedule Interview</h2>
          <p className="text-blue-100">
            {submission.candidate.name} for {submission.job.title}
          </p>
        </div>

        {/* Form */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-4">
            {/* Interview Round */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interview Round</label>
              <select
                value={interviewData.round}
                onChange={(e) => setInterviewData({...interviewData, round: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option>Phone Screening</option>
                <option>Technical Interview</option>
                <option>Cultural Fit</option>
                <option>Final Interview</option>
                <option>Client Interview</option>
              </select>
            </div>

            {/* Interview Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interview Type</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setInterviewData({...interviewData, type: 'video'})}
                  className={`p-3 border-2 rounded-lg flex flex-col items-center gap-2 ${
                    interviewData.type === 'video' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <Video className="w-5 h-5" />
                  <span className="text-sm font-medium">Video</span>
                </button>
                <button
                  onClick={() => setInterviewData({...interviewData, type: 'phone'})}
                  className={`p-3 border-2 rounded-lg flex flex-col items-center gap-2 ${
                    interviewData.type === 'phone' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-sm font-medium">Phone</span>
                </button>
                <button
                  onClick={() => setInterviewData({...interviewData, type: 'in-person'})}
                  className={`p-3 border-2 rounded-lg flex flex-col items-center gap-2 ${
                    interviewData.type === 'in-person' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span className="text-sm font-medium">In-Person</span>
                </button>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={interviewData.date}
                  onChange={(e) => setInterviewData({...interviewData, date: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input
                  type="time"
                  value={interviewData.time}
                  onChange={(e) => setInterviewData({...interviewData, time: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Duration & Interviewer */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                <select
                  value={interviewData.duration}
                  onChange={(e) => setInterviewData({...interviewData, duration: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="30">30 minutes</option>
                  <option value="60">60 minutes</option>
                  <option value="90">90 minutes</option>
                  <option value="120">120 minutes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Interviewer</label>
                <input
                  type="text"
                  value={interviewData.interviewer}
                  onChange={(e) => setInterviewData({...interviewData, interviewer: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Client contact name"
                />
              </div>
            </div>

            {/* Meeting Link (if video) */}
            {interviewData.type === 'video' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Link</label>
                <input
                  type="url"
                  value={interviewData.meeting_link}
                  onChange={(e) => setInterviewData({...interviewData, meeting_link: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://meet.google.com/..."
                />
              </div>
            )}

            {/* Location (if in-person) */}
            {interviewData.type === 'in-person' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={interviewData.location}
                  onChange={(e) => setInterviewData({...interviewData, location: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Office address"
                />
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interview Notes</label>
              <textarea
                value={interviewData.notes}
                onChange={(e) => setInterviewData({...interviewData, notes: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Any special instructions or topics to cover..."
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-white font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Save interview logic
              onClose();
            }}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center gap-2"
          >
            <Calendar className="w-5 h-5" />
            Schedule Interview
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================
function TabButton({ active, onClick, label, badge }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
        active
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-600 hover:text-gray-900'
      }`}
    >
      {label}
      {badge !== undefined && (
        <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
          {badge}
        </span>
      )}
    </button>
  );
}

function SubmissionStatusBadge({ status }: any) {
  const config = {
    submitted: { label: 'Submitted', color: 'bg-blue-100 text-blue-700 border-blue-300' },
    shortlisted: { label: 'Shortlisted', color: 'bg-green-100 text-green-700 border-green-300' },
    interview: { label: 'Interview', color: 'bg-purple-100 text-purple-700 border-purple-300' },
    rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700 border-red-300' },
    offered: { label: 'Offered', color: 'bg-teal-100 text-teal-700 border-teal-300' },
    accepted: { label: 'Accepted', color: 'bg-green-100 text-green-700 border-green-300' }
  };

  const { label, color } = config[status as keyof typeof config] || config.submitted;

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${color}`}>
      {label}
    </span>
  );
}

function SubmissionProgressTracker({ status }: any) {
  const steps = [
    { key: 'submitted', label: 'Submitted', icon: Send },
    { key: 'shortlisted', label: 'Shortlisted', icon: CheckCircle },
    { key: 'interview', label: 'Interview', icon: Video },
    { key: 'offered', label: 'Offered', icon: Award },
    { key: 'accepted', label: 'Hired', icon: Star }
  ];

  const currentIndex = steps.findIndex(s => s.key === status);

  return (
    <div className="space-y-3">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isComplete = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={step.key} className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isComplete ? 'bg-green-600 text-white' :
              isCurrent ? 'bg-blue-600 text-white' :
              'bg-gray-200 text-gray-400'
            }`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className={`font-medium ${isComplete || isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>
                {step.label}
              </div>
            </div>
            {isComplete && <CheckCircle className="w-5 h-5 text-green-600" />}
          </div>
        );
      })}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-2">
      {Icon && <Icon className="w-4 h-4 text-gray-400 mt-0.5" />}
      <div className="flex-1 min-w-0">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-sm text-gray-900 font-medium truncate">{value}</div>
      </div>
    </div>
  );
}

function ChecklistItem({ label, checked }: any) {
  return (
    <div className={`p-3 rounded-lg border ${
      checked ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
    }`}>
      <div className="flex items-center gap-2">
        {checked ? (
          <CheckCircle className="w-4 h-4 text-green-600" />
        ) : (
          <XCircle className="w-4 h-4 text-gray-400" />
        )}
        <span className={`text-sm font-medium ${checked ? 'text-green-900' : 'text-gray-600'}`}>
          {label}
        </span>
      </div>
    </div>
  );
}

function StarRating({ rating }: any) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

function InterviewCard({ interview }: any) {
  const typeIcons = {
    video: Video,
    phone: Phone,
    'in-person': Users
  };
  const Icon = typeIcons[interview.type as keyof typeof typeIcons];

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Icon className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{interview.round}</h4>
            <p className="text-sm text-gray-600 capitalize">{interview.type} interview</p>
          </div>
        </div>
        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
          {interview.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-3">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          {new Date(interview.scheduled_date).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          {new Date(interview.scheduled_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <User className="w-4 h-4" />
          {interview.interviewer}
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          {interview.duration}
        </div>
      </div>

      {interview.meeting_link && (
        <a
          href={interview.meeting_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          <Link2 className="w-4 h-4" />
          Join Meeting
        </a>
      )}

      <div className="flex gap-2 mt-3">
        <button className="flex-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
          Edit
        </button>
        <button className="flex-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
          Cancel
        </button>
      </div>
    </div>
  );
}

function FeedbackHistoryItem({ feedback }: any) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <SubmissionStatusBadge status={feedback.status} />
          <p className="text-sm text-gray-600 mt-2">{feedback.feedback_by}</p>
          <p className="text-xs text-gray-500">
            {new Date(feedback.feedback_date).toLocaleDateString()}
          </p>
        </div>
        <StarRating rating={feedback.rating} />
      </div>
      <p className="text-sm text-gray-700">{feedback.comments}</p>
    </div>
  );
}

function TimelineItem({ item, isLast }: any) {
  const eventIcons = {
    'Client Feedback': MessageSquare,
    'Email Viewed': Mail,
    'Submitted to Client': Send,
    'Team Approved': CheckCircle,
    'Screening Complete': ClipboardCheck
  };
  const Icon = eventIcons[item.event as keyof typeof eventIcons] || Activity;

  return (
    <div className="relative flex gap-4 pl-2">
      {/* Icon */}
      <div className="relative z-10 flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-blue-50 border-4 border-white flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pb-6">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{item.event}</h4>
            <span className="text-xs text-gray-500">
              {new Date(item.date).toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-gray-700 mb-2">{item.description}</p>
          <p className="text-xs text-gray-500">By: {item.user}</p>
        </div>
      </div>
    </div>
  );
}

function CheckboxItem({ label }: any) {
  return (
    <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
      <input
        type="checkbox"
        className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}