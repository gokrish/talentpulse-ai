import React, { useState } from 'react';
import { 
  Building2, Briefcase, MapPin, DollarSign, Calendar, 
  Users, Sparkles, Save, X, Plus, AlertCircle, CheckCircle,
  Loader2, Globe, Clock, Target
} from 'lucide-react';

// Types
interface Client {
  id: string;
  company_name: string;
  country: string;
  contact_person: string;
  contact_email: string;
  contact_phone: string;
  industry: string;
  website: string;
  notes: string;
}

interface JobFormData {
  client_id: string;
  country: string;
  job_description: string;
  duration_months: number;
  daily_rate: number;
  currency: string;
  start_date: string;
  positions_needed: number;
  source: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assigned_to: string[];
  assigned_team_id: string;
  internal_notes: string;
  
  // AI-extracted fields (auto-populated)
  title: string;
  required_skills: string[];
  experience_level: string;
  years_experience: string;
}

// Main Component
export default function JobManagementSystem() {
  const [activeView, setActiveView] = useState<'job' | 'client'>('job');
  const [showClientModal, setShowClientModal] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with Toggle */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Job Management</h1>
          
          <div className="flex gap-2 bg-white p-1 rounded-lg shadow-sm w-fit">
            <button
              onClick={() => setActiveView('job')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeView === 'job'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Briefcase className="w-4 h-4 inline mr-2" />
              Create Job
            </button>
            <button
              onClick={() => setActiveView('client')}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeView === 'client'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Building2 className="w-4 h-4 inline mr-2" />
              Manage Clients
            </button>
          </div>
        </div>

        {/* Content */}
        {activeView === 'job' ? (
          <JobCreationForm onClientAdd={() => setShowClientModal(true)} />
        ) : (
          <ClientManagement />
        )}

        {/* Quick Add Client Modal */}
        {showClientModal && (
          <QuickAddClientModal onClose={() => setShowClientModal(false)} />
        )}
      </div>
    </div>
  );
}

// Job Creation Form Component
function JobCreationForm({ onClientAdd }: { onClientAdd: () => void }) {
  const [formData, setFormData] = useState<JobFormData>({
    client_id: '',
    country: '',
    job_description: '',
    duration_months: 6,
    daily_rate: 0,
    currency: 'EUR',
    start_date: 'ASAP',
    positions_needed: 1,
    source: '',
    priority: 'medium',
    assigned_to: [],
    assigned_team_id: '',
    internal_notes: '',
    // AI-extracted
    title: '',
    required_skills: [],
    experience_level: '',
    years_experience: ''
  });

  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiExtracted, setAiExtracted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [clients, setClients] = useState<Client[]>([
    { id: '1', company_name: 'Acme Corp', country: 'Belgium', contact_person: 'John Doe', 
      contact_email: 'john@acme.com', contact_phone: '+32 2 123 4567', 
      industry: 'Technology', website: 'acme.com', notes: 'Key client' }
  ]);

  // Countries list (European focus)
  const countries = [
    'Belgium', 'Netherlands', 'Luxembourg', 'Germany', 'France',
    'United Kingdom', 'Spain', 'Italy', 'Poland', 'Remote/Any'
  ];

  const currencies = ['EUR', 'USD', 'GBP', 'CHF'];

  // AI Extract from Job Description
  const handleAIExtract = async () => {
    if (!formData.job_description || formData.job_description.length < 100) {
      alert('Please enter at least 100 characters in job description');
      return;
    }

    setAiProcessing(true);
    
    try {
      // Simulate AI extraction (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI extracted data
      const extracted = {
        title: 'Senior Full Stack Developer',
        required_skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
        experience_level: 'Senior',
        years_experience: '5-7 years'
      };
      
      setFormData(prev => ({
        ...prev,
        ...extracted
      }));
      
      setAiExtracted(true);
    } catch (error) {
      alert('AI extraction failed. Please fill manually.');
    } finally {
      setAiProcessing(false);
    }
  };

  // Handle Save
  const handleSave = async () => {
    // Validation
    if (!formData.client_id) {
      alert('Please select a client');
      return;
    }
    if (!formData.country) {
      alert('Please select a country');
      return;
    }
    if (!formData.job_description) {
      alert('Please enter job description');
      return;
    }

    setSaving(true);
    
    try {
      // API call to save job
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Job created successfully!');
      
      // Reset form
      setFormData({
        client_id: '',
        country: '',
        job_description: '',
        duration_months: 6,
        daily_rate: 0,
        currency: 'EUR',
        start_date: 'ASAP',
        positions_needed: 1,
        source: '',
        priority: 'medium',
        assigned_to: [],
        assigned_team_id: '',
        internal_notes: '',
        title: '',
        required_skills: [],
        experience_level: '',
        years_experience: ''
      });
      setAiExtracted(false);
    } catch (error) {
      alert('Failed to create job');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Create New Job</h2>
        <div className="flex gap-2">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <X className="w-4 h-4 inline mr-2" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 inline mr-2" />
            )}
            Create Job
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Basic Information */}
        <section>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Building2 className="w-5 h-5 mr-2 text-blue-600" />
            Basic Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client Selection */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  value={formData.client_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, client_id: e.target.value }))}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select client...</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.company_name} - {client.country}
                    </option>
                  ))}
                </select>
                <button
                  onClick={onClientAdd}
                  className="px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add New
                </button>
              </div>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={formData.country}
                  onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select country...</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Where the position is located (can be different from client location)
              </p>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Source
              </label>
              <input
                type="text"
                value={formData.source}
                onChange={(e) => setFormData(prev => ({ ...prev, source: e.target.value }))}
                placeholder="e.g., Client email, Portal XYZ"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Where did this job come from?
              </p>
            </div>
          </div>
        </section>

        {/* Contract Details */}
        <section className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-green-600" />
            Contract Details
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (months)
              </label>
              <input
                type="number"
                value={formData.duration_months}
                onChange={(e) => setFormData(prev => ({ ...prev, duration_months: parseInt(e.target.value) }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min="1"
                max="60"
              />
            </div>

            {/* Daily Rate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Daily Rate (optional)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={formData.daily_rate || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, daily_rate: parseFloat(e.target.value) }))}
                  placeholder="500"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                  className="w-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  {currencies.map(curr => (
                    <option key={curr} value={curr}>{curr}</option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                What client mentioned (if shared)
              </p>
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="text"
                value={formData.start_date}
                onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                placeholder="ASAP, January 2025, Q1 2025"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Positions Needed */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Positions Needed
            </label>
            <input
              type="number"
              value={formData.positions_needed}
              onChange={(e) => setFormData(prev => ({ ...prev, positions_needed: parseInt(e.target.value) }))}
              className="w-full md:w-48 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="1"
            />
          </div>
        </section>

        {/* Job Description with AI */}
        <section className="border-t pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
              Job Description <span className="text-red-500 ml-1">*</span>
            </h3>
            <button
              onClick={handleAIExtract}
              disabled={aiProcessing || formData.job_description.length < 100}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 flex items-center gap-2"
            >
              {aiProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  AI Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  AI Extract Info
                </>
              )}
            </button>
          </div>

          <textarea
            value={formData.job_description}
            onChange={(e) => setFormData(prev => ({ ...prev, job_description: e.target.value }))}
            placeholder="Paste the complete job description here...

We're looking for a Senior Full-Stack Developer with 5+ years experience in React, Node.js, and PostgreSQL. Must have experience with AWS, Docker, and CI/CD pipelines. Strong communication skills required."
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
          />
          
          <div className="flex items-center justify-between mt-2">
            <span className={`text-sm ${formData.job_description.length >= 100 ? 'text-green-600' : 'text-gray-500'}`}>
              {formData.job_description.length} characters
              {formData.job_description.length < 100 && ' (minimum 100 required for AI extraction)'}
            </span>
            {aiExtracted && (
              <span className="text-sm text-green-600 flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                AI extracted successfully
              </span>
            )}
          </div>

          {/* AI Extracted Fields */}
          {aiExtracted && (
            <div className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
                AI Extracted Information (Review & Edit)
              </h4>
              
              <div className="space-y-4">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
                  />
                </div>

                {/* Required Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Skills
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {formData.required_skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                      >
                        {skill}
                        <button
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            required_skills: prev.required_skills.filter((_, i) => i !== idx)
                          }))}
                          className="hover:text-blue-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <button
                      onClick={() => {
                        const skill = prompt('Add skill:');
                        if (skill) {
                          setFormData(prev => ({
                            ...prev,
                            required_skills: [...prev.required_skills, skill]
                          }));
                        }
                      }}
                      className="px-3 py-1 border-2 border-dashed border-gray-300 rounded-full text-sm hover:border-blue-400 hover:text-blue-600"
                    >
                      <Plus className="w-3 h-3 inline mr-1" />
                      Add Skill
                    </button>
                  </div>
                </div>

                {/* Experience Level & Years */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level
                    </label>
                    <select
                      value={formData.experience_level}
                      onChange={(e) => setFormData(prev => ({ ...prev, experience_level: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
                    >
                      <option value="">Select level...</option>
                      <option value="Junior">Junior</option>
                      <option value="Mid">Mid-level</option>
                      <option value="Senior">Senior</option>
                      <option value="Lead">Lead</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience
                    </label>
                    <input
                      type="text"
                      value={formData.years_experience}
                      onChange={(e) => setFormData(prev => ({ ...prev, years_experience: e.target.value }))}
                      placeholder="e.g., 5-7 years"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Assignment & Priority */}
        <section className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-indigo-600" />
            Assignment & Priority
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <div className="grid grid-cols-4 gap-2">
                {['low', 'medium', 'high', 'urgent'].map(priority => (
                  <button
                    key={priority}
                    onClick={() => setFormData(prev => ({ ...prev, priority: priority as any }))}
                    className={`p-3 rounded-lg font-medium capitalize transition-all ${
                      formData.priority === priority
                        ? priority === 'urgent' ? 'bg-red-600 text-white' :
                          priority === 'high' ? 'bg-orange-600 text-white' :
                          priority === 'medium' ? 'bg-blue-600 text-white' :
                          'bg-gray-600 text-white'
                        : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Internal Notes
              </label>
              <textarea
                value={formData.internal_notes}
                onChange={(e) => setFormData(prev => ({ ...prev, internal_notes: e.target.value }))}
                placeholder="Private notes for your team..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                rows={3}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// Client Management Component
function ClientManagement() {
  const [clients] = useState<Client[]>([
    { 
      id: '1', 
      company_name: 'Acme Corporation', 
      country: 'Belgium',
      contact_person: 'John Doe',
      contact_email: 'john@acme.com',
      contact_phone: '+32 2 123 4567',
      industry: 'Technology',
      website: 'www.acme.com',
      notes: 'Key client - fast response time'
    }
  ]);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm border p-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">Client Database</h3>
          <p className="text-sm text-gray-600">{clients.length} active clients</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4 inline mr-2" />
          Add Client
        </button>
      </div>

      {clients.map(client => (
        <div key={client.id} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{client.company_name}</h3>
              <p className="text-gray-600">{client.industry} • {client.country}</p>
            </div>
            <button className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg text-sm">
              Edit
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Contact:</span>
              <p className="font-medium">{client.contact_person}</p>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <p className="font-medium">{client.contact_email}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Quick Add Client Modal
function QuickAddClientModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    company_name: '',
    country: '',
    contact_person: '',
    contact_email: '',
    contact_phone: '',
    industry: '',
    website: ''
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex items-center justify-between">
          <h3 className="text-xl font-bold">Add New Client</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.company_name}
              onChange={e => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Acme Corporation"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.country}
              onChange={e => setFormData(prev => ({ ...prev, country: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select country...</option>
              <option value="Belgium">Belgium</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person
            </label>
            <input
              type="text"
              value={formData.contact_person}
              onChange={e => setFormData(prev => ({ ...prev, contact_person: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.contact_email}
              onChange={e => setFormData(prev => ({ ...prev, contact_email: e.target.value }))}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="john@acme.com"
            />
          </div>
        </div>

        <div className="p-6 border-t flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Save client logic
              alert('Client saved successfully!');
              onClose();
            }}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Client
          </button>
        </div>
      </div>
    </div>
  );
}