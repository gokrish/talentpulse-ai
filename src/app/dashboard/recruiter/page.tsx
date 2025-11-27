import React, { useState } from 'react';
import {
  Briefcase, Users, DollarSign, TrendingUp, Clock, Target, Calendar,
  CheckCircle, AlertCircle, Phone, Mail, Video, Send, Eye, Edit2,
  Filter, Search, Plus, MoreVertical, Flag, Star, MessageSquare,
  FileText, Download, Bell, Settings, ChevronRight, Activity,
  BarChart3, PieChart, Award, Zap, RefreshCw, ArrowUp, ArrowDown,
  UserCheck, ClipboardCheck, PhoneCall, MapPin, DollarSignIcon,
  Globe, Building2, PlayCircle, PauseCircle, XCircle, Circle
} from 'lucide-react';

// ============================================================================
// ROLE-BASED DASHBOARD ROUTER
// ============================================================================
export default function DashboardRouter({ userRole }: { userRole: 'recruiter' | 'team_lead' | 'owner' }) {
  switch (userRole) {
    case 'recruiter':
      return <RecruiterDashboard />;
    case 'team_lead':
      return <TeamLeadDashboard />;
    case 'owner':
      return <OwnerDashboard />;
    default:
      return <RecruiterDashboard />;
  }
}

// ============================================================================
// RECRUITER DASHBOARD
// ============================================================================
function RecruiterDashboard() {
  const recruiterData = {
    name: "Sarah Johnson",
    metrics: {
      active_jobs: 8,
      submissions_this_week: 12,
      interviews_scheduled: 2,
      pending_followups: 5,
      screening_calls_today: 3,
      awaiting_review: 4
    },
    activeJobs: [
      {
        id: 'JOB-045',
        title: 'Senior Java Developer',
        client: 'TechCorp Solutions',
        priority: 'high',
        submissions: 3,
        interviews: 1,
        last_action: '2 hours ago',
        status: 'active',
        health_score: 85,
        deadline: '2025-01-20',
        pipeline: { sourced: 8, screening: 3, submitted: 3, interview: 1, offer: 0 }
      },
      {
        id: 'JOB-038',
        title: 'Senior DevOps Engineer',
        client: 'DataFlow Inc',
        priority: 'medium',
        submissions: 0,
        interviews: 0,
        last_action: '3 days ago',
        status: 'active',
        health_score: 45,
        deadline: '2025-01-25',
        pipeline: { sourced: 2, screening: 0, submitted: 0, interview: 0, offer: 0 }
      }
    ],
    todayTasks: [
      { id: '1', type: 'call', candidate: 'Mike Chen', action: 'Rate confirmation', priority: 'high', time: '10:00 AM', done: false },
      { id: '2', type: 'email', candidate: 'Jane Doe', action: 'Interview feedback follow-up', priority: 'medium', time: '2:00 PM', done: false },
      { id: '3', type: 'submit', candidate: 'Tom Wilson', action: 'Submit to Acme Corp', priority: 'high', time: '4:00 PM', done: false },
      { id: '4', type: 'screen', candidate: 'Lisa Park', action: 'Initial phone screen', priority: 'medium', time: '11:00 AM', done: true }
    ],
    upcomingInterviews: [
      { id: '1', date: 'Mon 11/18', time: '2:00 PM', candidate: 'John Doe', job: 'Java Developer', client: 'TechCorp' },
      { id: '2', date: 'Tue 11/19', time: '10:00 AM', candidate: 'Jane Smith', job: 'DevOps Engineer', client: 'DataFlow' }
    ],
    pendingReviews: [
      { id: '1', candidate: 'Mike Chen', job: 'Java Developer', submitted: '2 hours ago', status: 'pending_team_review' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="p-6 max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Welcome back, {recruiterData.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium">
                <Plus className="w-5 h-5" />
                Quick Match
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <MetricCard
              icon={Briefcase}
              label="Active Jobs"
              value={recruiterData.metrics.active_jobs}
              color="blue"
            />
            <MetricCard
              icon={Send}
              label="Submissions"
              value={recruiterData.metrics.submissions_this_week}
              color="green"
              subtitle="this week"
            />
            <MetricCard
              icon={Video}
              label="Interviews"
              value={recruiterData.metrics.interviews_scheduled}
              color="purple"
              subtitle="scheduled"
            />
            <MetricCard
              icon={Clock}
              label="Follow-ups"
              value={recruiterData.metrics.pending_followups}
              color="orange"
              alert={recruiterData.metrics.pending_followups > 3}
            />
            <MetricCard
              icon={PhoneCall}
              label="Screens Today"
              value={recruiterData.metrics.screening_calls_today}
              color="teal"
            />
            <MetricCard
              icon={AlertCircle}
              label="Awaiting Review"
              value={recruiterData.metrics.awaiting_review}
              color="yellow"
              alert={recruiterData.metrics.awaiting_review > 0}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Jobs & Tasks */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Jobs */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  My Active Jobs
                </h2>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All →
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                {recruiterData.activeJobs.map(job => (
                  <RecruiterJobCard key={job.id} job={job} />
                ))}
              </div>
            </div>

            {/* Today's Tasks */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Today's Follow-Ups
                </h2>
                <span className="text-sm text-gray-500">
                  {recruiterData.todayTasks.filter(t => !t.done).length} pending
                </span>
              </div>
              <div className="p-4 space-y-3">
                {recruiterData.todayTasks.map(task => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Interviews & Pending */}
          <div className="space-y-6">
            {/* Upcoming Interviews */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Upcoming Interviews
                </h2>
              </div>
              <div className="p-4 space-y-3">
                {recruiterData.upcomingInterviews.map(interview => (
                  <InterviewCard key={interview.id} interview={interview} />
                ))}
              </div>
            </div>

            {/* Pending Reviews */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  Pending Reviews
                </h2>
              </div>
              <div className="p-4 space-y-3">
                {recruiterData.pendingReviews.map(review => (
                  <PendingReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-left font-medium transition-colors">
                  📋 Match Candidates to Jobs
                </button>
                <button className="w-full px-4 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-left font-medium transition-colors">
                  📊 My Weekly Report
                </button>
                <button className="w-full px-4 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-left font-medium transition-colors">
                  📞 Schedule Screening Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TEAM LEAD DASHBOARD
// ============================================================================
function TeamLeadDashboard() {
  const teamData = {
    name: "Mike Thompson",
    team_name: "IT Recruitment Team",
    metrics: {
      team_jobs: 24,
      team_submissions: 45,
      pending_reviews: 8,
      team_placements: 5,
      avg_time_to_fill: 18,
      team_revenue: 125000
    },
    teamMembers: [
      { id: '1', name: 'Sarah Johnson', jobs: 8, submissions: 12, placements: 3, trend: 'up' },
      { id: '2', name: 'Tom Wilson', jobs: 6, submissions: 8, placements: 2, trend: 'down' },
      { id: '3', name: 'Lisa Chen', jobs: 10, submissions: 15, placements: 4, trend: 'up' }
    ],
    pendingApprovals: [
      {
        id: '1',
        recruiter: 'Sarah Johnson',
        candidate: 'Mike Chen',
        job: 'Java Developer',
        client: 'TechCorp',
        submitted: '2 hours ago',
        screening_complete: true,
        rate_confirmed: true,
        availability_ok: true
      },
      {
        id: '2',
        recruiter: 'Tom Wilson',
        candidate: 'Jane Doe',
        job: 'DevOps Engineer',
        client: 'DataFlow',
        submitted: '5 hours ago',
        screening_complete: false,
        rate_confirmed: true,
        availability_ok: true
      }
    ],
    jobsNeedingAttention: [
      { id: 'JOB-045', title: 'Java Developer', days_open: 15, submissions: 0, assigned_to: 'Sarah Johnson' },
      { id: 'JOB-038', title: 'Product Manager', days_open: 3, submissions: 5, assigned_to: 'Team A' }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="p-6 max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Team Lead Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">{teamData.team_name} • {teamData.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {teamData.metrics.pending_reviews}
                </span>
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium">
                <Download className="w-5 h-5" />
                Team Report
              </button>
            </div>
          </div>

          {/* Team Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <MetricCard
              icon={Briefcase}
              label="Team Jobs"
              value={teamData.metrics.team_jobs}
              color="blue"
            />
            <MetricCard
              icon={Send}
              label="Submissions"
              value={teamData.metrics.team_submissions}
              color="green"
              subtitle="last 30 days"
            />
            <MetricCard
              icon={AlertCircle}
              label="Pending Reviews"
              value={teamData.metrics.pending_reviews}
              color="yellow"
              alert={true}
            />
            <MetricCard
              icon={Award}
              label="Placements"
              value={teamData.metrics.team_placements}
              color="purple"
              subtitle="this month"
            />
            <MetricCard
              icon={Clock}
              label="Avg Time to Fill"
              value={`${teamData.metrics.avg_time_to_fill}d`}
              color="orange"
            />
            <MetricCard
              icon={DollarSign}
              label="Revenue"
              value={`$${(teamData.metrics.team_revenue / 1000).toFixed(0)}K`}
              color="green"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending Approvals */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-yellow-600" />
                  Pending Submission Approvals ({teamData.metrics.pending_reviews})
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {teamData.pendingApprovals.map(approval => (
                  <SubmissionApprovalCard key={approval.id} approval={approval} />
                ))}
              </div>
            </div>

            {/* Team Performance */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Team Performance
                </h2>
              </div>
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-semibold text-gray-600 uppercase">
                      <th className="pb-3">Recruiter</th>
                      <th className="pb-3">Jobs</th>
                      <th className="pb-3">Submissions</th>
                      <th className="pb-3">Placements</th>
                      <th className="pb-3">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {teamData.teamMembers.map(member => (
                      <tr key={member.id} className="hover:bg-gray-50">
                        <td className="py-3 font-medium text-gray-900">{member.name}</td>
                        <td className="py-3 text-gray-600">{member.jobs}</td>
                        <td className="py-3 text-gray-600">{member.submissions}</td>
                        <td className="py-3 text-gray-600">{member.placements}</td>
                        <td className="py-3">
                          {member.trend === 'up' ? (
                            <span className="text-green-600 flex items-center gap-1">
                              <ArrowUp className="w-4 h-4" />
                              <span className="text-xs font-medium">Up</span>
                            </span>
                          ) : (
                            <span className="text-red-600 flex items-center gap-1">
                              <ArrowDown className="w-4 h-4" />
                              <span className="text-xs font-medium">Down</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Jobs Needing Attention */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Flag className="w-5 h-5 text-red-600" />
                  Needs Attention
                </h2>
              </div>
              <div className="p-4 space-y-3">
                {teamData.jobsNeedingAttention.map(job => (
                  <AlertJobCard key={job.id} job={job} />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Team Actions</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-left font-medium transition-colors">
                  📊 Generate Team Report
                </button>
                <button className="w-full px-4 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-left font-medium transition-colors">
                  👥 Assign Jobs to Team
                </button>
                <button className="w-full px-4 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-left font-medium transition-colors">
                  📈 View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// OWNER/ADMIN DASHBOARD
// ============================================================================
function OwnerDashboard() {
  const ownerData = {
    name: "John Anderson",
    metrics: {
      total_jobs: 45,
      total_submissions: 127,
      placements_this_month: 23,
      monthly_revenue: 125000,
      active_recruiters: 12,
      avg_time_to_fill: 21
    },
    topPerformers: [
      { name: 'Lisa Chen', placements: 8, revenue: 45000 },
      { name: 'Sarah Johnson', placements: 6, revenue: 32000 },
      { name: 'Tom Wilson', placements: 5, revenue: 28000 }
    ],
    clientMetrics: [
      { name: 'TechCorp Solutions', jobs: 12, placements: 5, revenue: 62000, status: 'excellent' },
      { name: 'DataFlow Inc', jobs: 8, placements: 3, revenue: 28000, status: 'good' },
      { name: 'StartupX', jobs: 5, placements: 2, revenue: 18000, status: 'fair' }
    ],
    revenueByMonth: [
      { month: 'Jul', revenue: 95000 },
      { month: 'Aug', revenue: 110000 },
      { month: 'Sep', revenue: 105000 },
      { month: 'Oct', revenue: 120000 },
      { month: 'Nov', revenue: 125000 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="p-6 max-w-[1920px] mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Executive Dashboard</h1>
              <p className="text-blue-100 mt-1">Company Overview • {ownerData.name}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg flex items-center gap-2 font-medium transition-colors">
                <Download className="w-5 h-5" />
                Export Report
              </button>
              <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2 font-medium">
                <Settings className="w-5 h-5" />
                Settings
              </button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <ExecutiveMetricCard
              icon={Briefcase}
              label="Open Jobs"
              value={ownerData.metrics.total_jobs}
              subtitle="Last 30 days"
            />
            <ExecutiveMetricCard
              icon={Send}
              label="Submissions"
              value={ownerData.metrics.total_submissions}
              subtitle="Last 30 days"
            />
            <ExecutiveMetricCard
              icon={Award}
              label="Placements"
              value={ownerData.metrics.placements_this_month}
              subtitle="This month"
            />
            <ExecutiveMetricCard
              icon={DollarSign}
              label="Revenue"
              value={`$${(ownerData.metrics.monthly_revenue / 1000).toFixed(0)}K`}
              subtitle="This month"
            />
            <ExecutiveMetricCard
              icon={Users}
              label="Active Recruiters"
              value={ownerData.metrics.active_recruiters}
              subtitle="Team size"
            />
            <ExecutiveMetricCard
              icon={Clock}
              label="Avg Fill Time"
              value={`${ownerData.metrics.avg_time_to_fill}d`}
              subtitle="Time to fill"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Revenue Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Revenue Trend (Last 5 Months)
              </h2>
              <RevenueChart data={ownerData.revenueByMonth} />
            </div>

            {/* Top Clients */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Top Clients Performance
                </h2>
              </div>
              <div className="p-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-semibold text-gray-600 uppercase">
                      <th className="pb-3">Client</th>
                      <th className="pb-3">Jobs</th>
                      <th className="pb-3">Placements</th>
                      <th className="pb-3">Revenue</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {ownerData.clientMetrics.map((client, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="py-3 font-medium text-gray-900">{client.name}</td>
                        <td className="py-3 text-gray-600">{client.jobs}</td>
                        <td className="py-3 text-gray-600">{client.placements}</td>
                        <td className="py-3 text-gray-900 font-semibold">
                          ${(client.revenue / 1000).toFixed(0)}K
                        </td>
                        <td className="py-3">
                          <ClientHealthBadge status={client.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Top Performers */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  Top Performers
                </h2>
              </div>
              <div className="p-4 space-y-3">
                {ownerData.topPerformers.map((performer, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                        idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-gray-400' : 'bg-orange-600'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{performer.name}</div>
                        <div className="text-xs text-gray-500">{performer.placements} placements</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        ${(performer.revenue / 1000).toFixed(0)}K
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-green-600 to-teal-600 rounded-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">This Month</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Total Jobs</span>
                  <span className="text-2xl font-bold">45</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Placements</span>
                  <span className="text-2xl font-bold">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Success Rate</span>
                  <span className="text-2xl font-bold">51%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// SCREENING CHECKLIST MODAL
// ============================================================================
function ScreeningChecklistModal({ candidate, job, onClose, onSubmit }: any) {
  const [checklist, setChecklist] = useState({
    // Pre-screening
    phone_screen_done: false,
    phone_screen_date: '',
    phone_screen_notes: '',
    
    // Rate & Availability
    rate_discussed: false,
    candidate_rate: '',
    rate_matches_budget: false,
    
    // RTR (Right to Represent)
    rtr_confirmed: false,
    rtr_expiry_date: '',
    exclusive_with_us: false,
    
    // Other Submissions
    other_submissions_checked: false,
    no_conflicts: false,
    conflict_details: '',
    
    // Availability
    availability_confirmed: false,
    available_date: '',
    notice_period: '',
    
    // Visa/Legal
    visa_status_checked: false,
    work_authorized: false,
    visa_type: '',
    visa_expiry: '',
    
    // Technical
    skills_verified: false,
    experience_verified: false,
    references_available: false,
    
    // Additional
    location_acceptable: false,
    commute_discussed: false,
    additional_notes: ''
  });

  const isComplete = () => {
    return checklist.phone_screen_done &&
           checklist.rate_discussed &&
           checklist.rtr_confirmed &&
           checklist.other_submissions_checked &&
           checklist.availability_confirmed &&
           checklist.visa_status_checked;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h2 className="text-2xl font-bold mb-2">Pre-Submission Screening Checklist</h2>
          <p className="text-blue-100">
            Candidate: <span className="font-semibold">{candidate.name}</span> for{' '}
            <span className="font-semibold">{job.title}</span>
          </p>
        </div>

        {/* Checklist Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Phone Screen */}
            <ChecklistSection
              title="📞 Phone Screening (Mandatory)"
              required
            >
              <div className="space-y-3">
                <CheckboxItem
                  label="Phone screen completed"
                  checked={checklist.phone_screen_done}
                  onChange={(val) => setChecklist({...checklist, phone_screen_done: val})}
                />
                {checklist.phone_screen_done && (
                  <>
                    <InputField
                      label="Screen Date"
                      type="date"
                      value={checklist.phone_screen_date}
                      onChange={(val) => setChecklist({...checklist, phone_screen_date: val})}
                    />
                    <TextAreaField
                      label="Screening Notes"
                      value={checklist.phone_screen_notes}
                      onChange={(val) => setChecklist({...checklist, phone_screen_notes: val})}
                      placeholder="Key discussion points, candidate impressions..."
                    />
                  </>
                )}
              </div>
            </ChecklistSection>

            {/* Rate & Budget */}
            <ChecklistSection
              title="💰 Rate & Budget Alignment (Mandatory)"
              required
            >
              <div className="space-y-3">
                <CheckboxItem
                  label="Rate discussed with candidate"
                  checked={checklist.rate_discussed}
                  onChange={(val) => setChecklist({...checklist, rate_discussed: val})}
                />
                {checklist.rate_discussed && (
                  <>
                    <InputField
                      label="Candidate's Rate Expectation"
                      placeholder="e.g., €650/day"
                      value={checklist.candidate_rate}
                      onChange={(val) => setChecklist({...checklist, candidate_rate: val})}
                    />
                    <CheckboxItem
                      label={`Rate matches budget (${job.rate_range})`}
                      checked={checklist.rate_matches_budget}
                      onChange={(val) => setChecklist({...checklist, rate_matches_budget: val})}
                    />
                  </>
                )}
              </div>
            </ChecklistSection>

            {/* RTR */}
            <ChecklistSection
              title="✍️ Right to Represent (Mandatory)"
              required
            >
              <div className="space-y-3">
                <CheckboxItem
                  label="RTR confirmed with candidate"
                  checked={checklist.rtr_confirmed}
                  onChange={(val) => setChecklist({...checklist, rtr_confirmed: val})}
                />
                {checklist.rtr_confirmed && (
                  <>
                    <InputField
                      label="RTR Expiry Date"
                      type="date"
                      value={checklist.rtr_expiry_date}
                      onChange={(val) => setChecklist({...checklist, rtr_expiry_date: val})}
                    />
                    <CheckboxItem
                      label="Exclusive representation (no other agencies)"
                      checked={checklist.exclusive_with_us}
                      onChange={(val) => setChecklist({...checklist, exclusive_with_us: val})}
                    />
                  </>
                )}
              </div>
            </ChecklistSection>

            {/* Other Submissions */}
            <ChecklistSection
              title="🔍 Other Submissions Check (Mandatory)"
              required
            >
              <div className="space-y-3">
                <CheckboxItem
                  label="Checked for other submissions to this client"
                  checked={checklist.other_submissions_checked}
                  onChange={(val) => setChecklist({...checklist, other_submissions_checked: val})}
                />
                <CheckboxItem
                  label="No conflicts found"
                  checked={checklist.no_conflicts}
                  onChange={(val) => setChecklist({...checklist, no_conflicts: val})}
                />
                {!checklist.no_conflicts && checklist.other_submissions_checked && (
                  <TextAreaField
                    label="Conflict Details"
                    value={checklist.conflict_details}
                    onChange={(val) => setChecklist({...checklist, conflict_details: val})}
                    placeholder="Describe the conflict..."
                  />
                )}
              </div>
            </ChecklistSection>

            {/* Availability */}
            <ChecklistSection
              title="📅 Availability (Mandatory)"
              required
            >
              <div className="space-y-3">
                <CheckboxItem
                  label="Availability confirmed"
                  checked={checklist.availability_confirmed}
                  onChange={(val) => setChecklist({...checklist, availability_confirmed: val})}
                />
                {checklist.availability_confirmed && (
                  <>
                    <InputField
                      label="Available Start Date"
                      type="date"
                      value={checklist.available_date}
                      onChange={(val) => setChecklist({...checklist, available_date: val})}
                    />
                    <InputField
                      label="Notice Period"
                      placeholder="e.g., Immediately, 2 weeks, 1 month"
                      value={checklist.notice_period}
                      onChange={(val) => setChecklist({...checklist, notice_period: val})}
                    />
                  </>
                )}
              </div>
            </ChecklistSection>

            {/* Visa/Legal */}
            <ChecklistSection
              title="🛂 Visa & Work Authorization (Mandatory)"
              required
            >
              <div className="space-y-3">
                <CheckboxItem
                  label="Visa status checked"
                  checked={checklist.visa_status_checked}
                  onChange={(val) => setChecklist({...checklist, visa_status_checked: val})}
                />
                <CheckboxItem
                  label="Authorized to work in {job.location}"
                  checked={checklist.work_authorized}
                  onChange={(val) => setChecklist({...checklist, work_authorized: val})}
                />
                {checklist.visa_status_checked && (
                  <>
                    <InputField
                      label="Visa Type"
                      placeholder="e.g., EU Citizen, Work Permit, Blue Card"
                      value={checklist.visa_type}
                      onChange={(val) => setChecklist({...checklist, visa_type: val})}
                    />
                    {checklist.visa_type && checklist.visa_type !== 'EU Citizen' && (
                      <InputField
                        label="Visa Expiry Date"
                        type="date"
                        value={checklist.visa_expiry}
                        onChange={(val) => setChecklist({...checklist, visa_expiry: val})}
                      />
                    )}
                  </>
                )}
              </div>
            </ChecklistSection>

            {/* Optional Checks */}
            <ChecklistSection
              title="📋 Additional Verification (Optional)"
              required={false}
            >
              <div className="space-y-3">
                <CheckboxItem
                  label="Technical skills verified"
                  checked={checklist.skills_verified}
                  onChange={(val) => setChecklist({...checklist, skills_verified: val})}
                />
                <CheckboxItem
                  label="Experience level verified"
                  checked={checklist.experience_verified}
                  onChange={(val) => setChecklist({...checklist, experience_verified: val})}
                />
                <CheckboxItem
                  label="References available"
                  checked={checklist.references_available}
                  onChange={(val) => setChecklist({...checklist, references_available: val})}
                />
                <CheckboxItem
                  label="Location/commute discussed"
                  checked={checklist.commute_discussed}
                  onChange={(val) => setChecklist({...checklist, commute_discussed: val})}
                />
              </div>
            </ChecklistSection>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={checklist.additional_notes}
                onChange={(e) => setChecklist({...checklist, additional_notes: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Any other relevant information..."
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
          <div>
            {!isComplete() && (
              <p className="text-sm text-red-600 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Please complete all mandatory checks
              </p>
            )}
            {isComplete() && (
              <p className="text-sm text-green-600 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                All mandatory checks completed
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-white font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit(checklist)}
              disabled={!isComplete()}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
            >
              Submit for Team Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================
function MetricCard({ icon: Icon, label, value, color, subtitle, alert }: any) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    teal: 'bg-teal-50 text-teal-600 border-teal-200',
    yellow: 'bg-yellow-50 text-yellow-600 border-yellow-200'
  };

  return (
    <div className={`rounded-lg border p-4 ${alert ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
        {alert && <AlertCircle className="w-4 h-4 text-red-600" />}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-600 mt-1">{label}</div>
      {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
    </div>
  );
}

function ExecutiveMetricCard({ icon: Icon, label, value, subtitle }: any) {
  return (
    <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-2 opacity-90">
        <Icon className="w-4 h-4" />
      </div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm opacity-90">{label}</div>
      <div className="text-xs opacity-75">{subtitle}</div>
    </div>
  );
}

function RecruiterJobCard({ job }: any) {
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900">{job.id}</span>
            <span className="text-gray-400">•</span>
            <h3 className="font-semibold text-gray-900">{job.title}</h3>
            {job.priority === 'high' && (
              <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                High Priority
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">{job.client}</p>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className={`w-5 h-5 ${
            job.health_score >= 70 ? 'text-green-600' :
            job.health_score >= 40 ? 'text-yellow-600' : 'text-red-600'
          }`} />
          <span className="text-sm font-semibold text-gray-900">{job.health_score}%</span>
        </div>
      </div>

      {/* Pipeline Mini */}
      <div className="mb-3">
        <div className="flex gap-1 mb-1">
          {Object.entries(job.pipeline).map(([stage, count]: any) => (
            <div
              key={stage}
              className="flex-1 h-2 rounded bg-blue-600"
              style={{ opacity: count > 0 ? 1 : 0.2 }}
              title={`${stage}: ${count}`}
            />
          ))}
        </div>
        <div className="text-xs text-gray-600">
          {job.submissions} submissions • {job.interviews} interviews • Last: {job.last_action}
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
          Match Candidates
        </button>
        <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-white text-sm font-medium">
          View Details
        </button>
      </div>
    </div>
  );
}

function TaskItem({ task }: any) {
  const icons = {
    call: PhoneCall,
    email: Mail,
    submit: Send,
    screen: UserCheck
  };
  const Icon = icons[task.type as keyof typeof icons];

  return (
    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
      <input
        type="checkbox"
        checked={task.done}
        className="w-5 h-5 text-blue-600 rounded"
      />
      <div className={`p-2 rounded-lg ${task.done ? 'bg-gray-100' : 'bg-blue-50'}`}>
        <Icon className={`w-4 h-4 ${task.done ? 'text-gray-400' : 'text-blue-600'}`} />
      </div>
      <div className="flex-1">
        <div className={`font-medium ${task.done ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
          {task.action}
        </div>
        <div className="text-xs text-gray-500">{task.candidate} • {task.time}</div>
      </div>
      {task.priority === 'high' && !task.done && (
        <Flag className="w-4 h-4 text-red-600" />
      )}
    </div>
  );
}

function InterviewCard({ interview }: any) {
  return (
    <div className="p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-purple-50 rounded-lg">
          <Video className="w-4 h-4 text-purple-600" />
        </div>
        <div className="flex-1">
          <div className="font-medium text-gray-900">{interview.candidate}</div>
          <div className="text-xs text-gray-500">{interview.job}</div>
        </div>
      </div>
      <div className="text-sm text-gray-600">
        {interview.date} • {interview.time}
      </div>
      <div className="text-xs text-gray-500 mt-1">Client: {interview.client}</div>
    </div>
  );
}

function PendingReviewCard({ review }: any) {
  return (
    <div className="p-3 border border-yellow-200 bg-yellow-50 rounded-lg">
      <div className="font-medium text-gray-900 mb-1">{review.candidate}</div>
      <div className="text-sm text-gray-600 mb-2">{review.job}</div>
      <div className="text-xs text-gray-500 mb-2">Submitted {review.submitted}</div>
      <div className="flex gap-2">
        <button className="flex-1 px-3 py-1 bg-green-600 text-white rounded text-xs font-medium">
          View
        </button>
      </div>
    </div>
  );
}

function SubmissionApprovalCard({ approval }: any) {
  return (
    <div className="p-4 hover:bg-gray-50">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-semibold text-gray-900 mb-1">
            {approval.candidate} → {approval.job}
          </div>
          <div className="text-sm text-gray-600">
            Client: {approval.client} • Submitted by: {approval.recruiter}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {approval.submitted}
          </div>
        </div>
      </div>

      {/* Checklist Status */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <CheckStatus label="Screening" complete={approval.screening_complete} />
        <CheckStatus label="Rate OK" complete={approval.rate_confirmed} />
        <CheckStatus label="Available" complete={approval.availability_ok} />
      </div>

      <div className="flex gap-2">
        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          Approve
        </button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium flex items-center gap-2">
          <XCircle className="w-4 h-4" />
          Reject
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white text-sm font-medium">
          View Details
        </button>
      </div>
    </div>
  );
}

function AlertJobCard({ job }: any) {
  return (
    <div className="p-3 border border-red-200 bg-red-50 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <AlertCircle className="w-4 h-4 text-red-600" />
        <span className="font-medium text-red-900">{job.id}</span>
      </div>
      <div className="text-sm text-gray-900 font-medium mb-1">{job.title}</div>
      <div className="text-xs text-gray-600 mb-2">
        {job.days_open} days open • {job.submissions} submissions
      </div>
      <div className="text-xs text-gray-500">
        Assigned: {job.assigned_to}
      </div>
    </div>
  );
}

function CheckStatus({ label, complete }: any) {
  return (
    <div className={`p-2 rounded text-center text-xs font-medium ${
      complete ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
    }`}>
      {complete ? '✓' : '○'} {label}
    </div>
  );
}

function ClientHealthBadge({ status }: any) {
  const config = {
    excellent: { label: 'Excellent', color: 'bg-green-100 text-green-700' },
    good: { label: 'Good', color: 'bg-blue-100 text-blue-700' },
    fair: { label: 'Fair', color: 'bg-yellow-100 text-yellow-700' },
    poor: { label: 'Poor', color: 'bg-red-100 text-red-700' }
  };
  const { label, color } = config[status as keyof typeof config];
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
      {label}
    </span>
  );
}

function RevenueChart({ data }: any) {
  const maxRevenue = Math.max(...data.map((d: any) => d.revenue));
  
  return (
    <div className="flex items-end justify-between gap-2 h-48">
      {data.map((item: any, idx: number) => (
        <div key={idx} className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full bg-blue-600 rounded-t hover:bg-blue-700 transition-colors relative group"
               style={{ height: `${(item.revenue / maxRevenue) * 100}%` }}>
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
              ${(item.revenue / 1000).toFixed(0)}K
            </div>
          </div>
          <div className="text-xs text-gray-600 font-medium">{item.month}</div>
        </div>
      ))}
    </div>
  );
}

function ChecklistSection({ title, required, children }: any) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        {title}
        {required && <span className="text-xs text-red-600">(Required)</span>}
      </h3>
      {children}
    </div>
  );
}

function CheckboxItem({ label, checked, onChange }: any) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

function InputField({ label, type = 'text', value, onChange, placeholder, min }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function TextAreaField({ label, value, onChange, placeholder }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        rows={3}
      />
    </div>
  );
}

// Export all components
export {
  RecruiterDashboard,
  TeamLeadDashboard,
  OwnerDashboard,
  ScreeningChecklistModal
};