import React, { useState, useEffect } from 'react';
import {
  Building2, FileText, Upload, Link2, Sparkles, Save,
  AlertCircle, CheckCircle, Loader2, Mail, Linkedin, Globe,
  Tag, User, Calendar, DollarSign, MapPin, Clock, Plus, Search,
  Users, Briefcase, X, ChevronDown
} from 'lucide-react';

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function JobIntakeRedesigned() {
  const [step, setStep] = useState<'source' | 'extract' | 'review'>('source');
  const [jobData, setJobData] = useState<any>(null);
  const [sourceType, setSourceType] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Minimal Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">New Job</h1>
          <p className="text-sm text-gray-500 mt-1">Add job details in 3 simple steps</p>
        </div>

        {/* Progress Pills */}
        <div className="flex items-center gap-3 mb-8">
          <StepPill number={1} label="Source" active={step === 'source'} completed={step !== 'source'} />
          <div className="h-px bg-gray-300 flex-1 max-w-20"></div>
          <StepPill number={2} label="Details" active={step === 'extract'} completed={step === 'review'} />
          <div className="h-px bg-gray-300 flex-1 max-w-20"></div>
          <StepPill number={3} label="Review" active={step === 'review'} />
        </div>

        {/* Step Content */}
        {step === 'source' && (
          <SourceStep 
            sourceType={sourceType}
            setSourceType={setSourceType}
            onNext={() => setStep('extract')}
          />
        )}

        {step === 'extract' && (
          <ExtractStep
            sourceType={sourceType}
            onExtracted={(data) => {
              setJobData(data);
              setStep('review');
            }}
            onBack={() => setStep('source')}
          />
        )}

        {step === 'review' && jobData && (
          <ReviewStep
            data={jobData}
            sourceType={sourceType}
            onBack={() => setStep('extract')}
          />
        )}
      </div>
    </div>
  );
}

// ============================================================================
// STEP PILL COMPONENT
// ============================================================================
function StepPill({ number, label, active, completed }: any) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
        active ? 'bg-blue-600 text-white' : 
        completed ? 'bg-green-600 text-white' :
        'bg-gray-200 text-gray-500'
      }`}>
        {completed ? '✓' : number}
      </div>
      <span className={`text-sm font-medium ${active ? 'text-gray-900' : 'text-gray-500'}`}>
        {label}
      </span>
    </div>
  );
}

// ============================================================================
// STEP 1: SOURCE SELECTION (Simplified)
// ============================================================================
function SourceStep({ sourceType, setSourceType, onNext }: any) {
  const sources = [
    { 
      value: 'direct_client', 
      label: 'Direct Client', 
      icon: Building2, 
      desc: 'Job from your client company',
      color: 'blue' 
    },
    { 
      value: 'consultancy', 
      label: 'Consultancy/Agency', 
      icon: Users, 
      desc: 'Job from another agency',
      color: 'purple' 
    },
    { 
      value: 'job_board', 
      label: 'Job Board', 
      icon: Globe, 
      desc: 'LinkedIn, Indeed, etc.',
      color: 'green' 
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Where is this job from?</h2>
        <p className="text-sm text-gray-500 mt-1">This determines what information we'll need</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {sources.map(({ value, label, icon: Icon, desc, color }) => (
          <button
            key={value}
            onClick={() => setSourceType(value)}
            className={`p-6 rounded-lg border-2 transition-all text-left ${
              sourceType === value
                ? 'border-blue-500 bg-blue-50 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <Icon className={`w-8 h-8 mb-3 ${
              sourceType === value ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <div className="font-semibold text-gray-900 mb-1">{label}</div>
            <div className="text-xs text-gray-500">{desc}</div>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!sourceType}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium transition-colors"
      >
        Continue
      </button>
    </div>
  );
}

// ============================================================================
// STEP 2: EXTRACTION (Simplified Input)
// ============================================================================
function ExtractStep({ sourceType, onExtracted, onBack }: any) {
  const [input, setInput] = useState('');
  const [extracting, setExtracting] = useState(false);

  const handleExtract = async () => {
    if (!input.trim()) {
      alert('Please paste job description');
      return;
    }

    setExtracting(true);
    
    // Simulate AI extraction
    await new Promise(resolve => setTimeout(resolve, 1500));

    const extracted = {
      // Core fields (always present)
      job_title: 'Senior Full Stack Developer',
      location: 'Remote (EU)',
      contract_type: 'freelance',
      num_positions: 1,
      
      // Conditional on source type
      ...(sourceType === 'direct_client' && {
        client_id: null, // To be selected
        client_name: '',
        client_contact: '',
        client_email: ''
      }),
      
      ...(sourceType === 'consultancy' && {
        agency_id: null,
        agency_name: '',
        agency_contact: '',
        agency_email: ''
      }),
      
      // Contract-specific fields
      duration: '6 months',
      start_date: 'January 2025',
      daily_rate: '€600-700',
      
      // Skills
      required_skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
      optional_skills: ['AWS', 'Docker'],
      experience_years: '5+',
      
      // Metadata
      description: input,
      source_type: sourceType,
      extracted_at: new Date().toISOString()
    };

    onExtracted(extracted);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <button 
          onClick={onBack} 
          className="text-sm text-blue-600 hover:text-blue-700 mb-3 flex items-center gap-1"
        >
          ← Change source
        </button>
        <h2 className="text-lg font-semibold text-gray-900">Paste Job Description</h2>
        <p className="text-sm text-gray-500 mt-1">AI will extract key details automatically</p>
      </div>

      {/* Input */}
      <div className="p-6">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste complete job description here...

Example:
We are looking for a Senior Full Stack Developer...
Location: Remote (Belgium/Netherlands)
Rate: €600-700/day
Start: January 2025
..."
          className="w-full h-80 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-gray-500">
            {input.length} characters {input.length < 100 && '(minimum 100)'}
          </p>
          {input.length >= 100 && (
            <span className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Ready to extract
            </span>
          )}
        </div>
      </div>

      {/* Extract Button */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
        <button
          onClick={handleExtract}
          disabled={extracting || input.length < 100}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2 transition-colors"
        >
          {extracting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Extracting with AI...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Extract Job Details
            </>
          )}
        </button>

        {extracting && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">AI is reading the job description... ~2 seconds</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// STEP 3: REVIEW (Context-Aware Form)
// ============================================================================
function ReviewStep({ data, sourceType, onBack }: any) {
  const [form, setForm] = useState(data);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Job saved successfully!');
    window.location.href = '/jobs';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      {/* Header with AI Badge */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-900">Review & Complete</h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs font-medium text-green-700">AI Extracted</span>
          </div>
        </div>
        <p className="text-sm text-gray-500">Review details and fill in missing information</p>
      </div>

      <div className="p-6 space-y-8">
        {/* SECTION 1: Client/Agency Selection (Context-Dependent) */}
        {sourceType === 'direct_client' && (
          <ClientSelector form={form} setForm={setForm} />
        )}

        {sourceType === 'consultancy' && (
          <AgencySelector form={form} setForm={setForm} />
        )}

        {/* SECTION 2: Job Basics (Always) */}
        <FormSection title="Job Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField 
              label="Job Title" 
              required
              value={form.job_title}
              onChange={(val) => setForm({...form, job_title: val})}
            />
            <FormField 
              label="Location" 
              required
              value={form.location}
              onChange={(val) => setForm({...form, location: val})}
              placeholder="e.g., Remote, Belgium, Hybrid Brussels"
            />
            <FormField 
              label="Number of Positions" 
              type="number"
              value={form.num_positions}
              onChange={(val) => setForm({...form, num_positions: val})}
              min={1}
            />
            <FormSelect
              label="Job Category"
              value={form.job_category || 'it_software'}
              onChange={(val) => setForm({...form, job_category: val})}
              options={[
                { value: 'it_software', label: 'IT & Software' },
                { value: 'sap', label: 'SAP' },
                { value: 'data', label: 'Data & Analytics' },
                { value: 'finance', label: 'Finance' },
                { value: 'other', label: 'Other' }
              ]}
            />
          </div>
        </FormSection>

        {/* SECTION 3: Contract (Conditional Fields) */}
        <FormSection title="Contract Type">
          <ContractTypeSelector form={form} setForm={setForm} />
        </FormSection>

        {/* SECTION 4: Skills */}
        <FormSection title="Skills & Experience">
          <div className="space-y-4">
            <SkillTags 
              label="Required Skills (Must Have)" 
              skills={form.required_skills || []}
              onChange={(skills) => setForm({...form, required_skills: skills})}
              color="red"
            />
            <SkillTags 
              label="Optional Skills (Nice to Have)" 
              skills={form.optional_skills || []}
              onChange={(skills) => setForm({...form, optional_skills: skills})}
              color="blue"
            />
            <div className="max-w-xs">
              <FormField 
                label="Experience Required" 
                value={form.experience_years}
                onChange={(val) => setForm({...form, experience_years: val})}
                placeholder="e.g., 5+ years, 3-5 years"
              />
            </div>
          </div>
        </FormSection>

        {/* SECTION 5: Internal (Collapsed by Default) */}
        <InternalSection form={form} setForm={setForm} />
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-gray-200 bg-gray-50 flex items-center gap-3">
        <button
          onClick={onBack}
          className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-white text-sm font-medium transition-colors"
        >
          ← Back
        </button>
        <button
          className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-white text-sm font-medium transition-colors"
        >
          Save as Draft
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 font-medium transition-colors"
        >
          {saving ? 'Saving...' : 'Save Job'}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// CLIENT SELECTOR (with dropdown + add new)
// ============================================================================
function ClientSelector({ form, setForm }: any) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddNew, setShowAddNew] = useState(false);

  // Mock client database
  const clients = [
    { id: '1', name: 'TechCorp Solutions', contact: 'John Smith', email: 'john@techcorp.com' },
    { id: '2', name: 'DataFlow Inc', contact: 'Sarah Lee', email: 'sarah@dataflow.com' },
    { id: '3', name: 'CloudTech Systems', contact: 'Mike Johnson', email: 'mike@cloudtech.com' }
  ];

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectClient = (client: any) => {
    setForm({
      ...form,
      client_id: client.id,
      client_name: client.name,
      client_contact: client.contact,
      client_email: client.email
    });
    setShowDropdown(false);
    setSearchQuery('');
  };

  return (
    <FormSection title="Client Information" icon={Building2}>
      {!showAddNew ? (
        <>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Client <span className="text-red-500">*</span>
          </label>
          
          <div className="relative">
            {!form.client_id ? (
              <>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400 transition-colors"
                >
                  <span className="text-gray-500">Search and select client...</span>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>

                {showDropdown && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="p-2 border-b">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Type to search..."
                        className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        autoFocus
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {filteredClients.map(client => (
                        <button
                          key={client.id}
                          onClick={() => selectClient(client)}
                          className="w-full p-3 text-left hover:bg-blue-50 border-b last:border-b-0 transition-colors"
                        >
                          <div className="font-medium text-sm text-gray-900">{client.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {client.contact} • {client.email}
                          </div>
                        </button>
                      ))}
                      {filteredClients.length === 0 && (
                        <div className="p-4 text-center text-sm text-gray-500">
                          No clients found
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setShowAddNew(true);
                        setShowDropdown(false);
                      }}
                      className="w-full p-3 text-left border-t hover:bg-green-50 text-green-600 font-medium flex items-center gap-2 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add New Client
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{form.client_name}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {form.client_contact} • {form.client_email}
                    </div>
                  </div>
                  <button
                    onClick={() => setForm({...form, client_id: null, client_name: '', client_contact: '', client_email: ''})}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Add New Client</h4>
            <button
              onClick={() => setShowAddNew(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField 
              label="Company Name" 
              required
              value={form.client_name || ''}
              onChange={(val) => setForm({...form, client_name: val})}
            />
            <FormField 
              label="Contact Person" 
              required
              value={form.client_contact || ''}
              onChange={(val) => setForm({...form, client_contact: val})}
            />
            <FormField 
              label="Email" 
              type="email"
              required
              value={form.client_email || ''}
              onChange={(val) => setForm({...form, client_email: val})}
            />
            <FormField 
              label="Phone" 
              value={form.client_phone || ''}
              onChange={(val) => setForm({...form, client_phone: val})}
            />
          </div>
          <button
            onClick={() => {
              // Save logic here
              setShowAddNew(false);
            }}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium"
          >
            Save Client
          </button>
        </div>
      )}
    </FormSection>
  );
}

// ============================================================================
// AGENCY SELECTOR (Similar to Client)
// ============================================================================
function AgencySelector({ form, setForm }: any) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddNew, setShowAddNew] = useState(false);

  const agencies = [
    { id: '1', name: 'Randstad Belgium', contact: 'Anna Wilson', email: 'anna@randstad.be' },
    { id: '2', name: 'Robert Half', contact: 'Tom Brown', email: 'tom@roberthalf.com' }
  ];

  const selectAgency = (agency: any) => {
    setForm({
      ...form,
      agency_id: agency.id,
      agency_name: agency.name,
      agency_contact: agency.contact,
      agency_email: agency.email
    });
    setShowDropdown(false);
  };

  return (
    <FormSection title="Agency/Consultancy Information" icon={Users}>
      {!showAddNew ? (
        <>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Agency <span className="text-red-500">*</span>
          </label>
          
          {!form.agency_id ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full p-3 border border-gray-300 rounded-lg text-left flex items-center justify-between hover:border-gray-400"
              >
                <span className="text-gray-500">Select agency or consultancy...</span>
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </button>

              {showDropdown && (
                <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg">
                  <div className="max-h-60 overflow-y-auto">
                    {agencies.map(agency => (
                      <button
                        key={agency.id}
                        onClick={() => selectAgency(agency)}
                        className="w-full p-3 text-left hover:bg-purple-50 border-b last:border-b-0"
                      >
                        <div className="font-medium text-sm">{agency.name}</div>
                        <div className="text-xs text-gray-500">{agency.contact} • {agency.email}</div>
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setShowAddNew(true);
                      setShowDropdown(false);
                    }}
                    className="w-full p-3 text-left border-t hover:bg-green-50 text-green-600 font-medium flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add New Agency
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 border border-purple-200 bg-purple-50 rounded-lg">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{form.agency_name}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {form.agency_contact} • {form.agency_email}
                  </div>
                </div>
                <button
                  onClick={() => setForm({...form, agency_id: null})}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="border border-gray-300 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-900">Add New Agency</h4>
            <button
              onClick={() => setShowAddNew(false)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Agency Name" required />
            <FormField label="Contact Person" required />
            <FormField label="Email" type="email" required />
            <FormField label="Phone" />
          </div>
        </div>
      )}
    </FormSection>
  );
}

// ============================================================================
// CONTRACT TYPE SELECTOR (Conditional Fields)
// ============================================================================
function ContractTypeSelector({ form, setForm }: any) {
  const contractTypes = [
    { value: 'freelance', label: 'Freelance/Contract', icon: Briefcase },
    { value: 'permanent', label: 'Permanent', icon: Building2 }
  ];

  return (
    <div className="space-y-4">
      {/* Contract Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Contract Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {contractTypes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setForm({...form, contract_type: value})}
              className={`p-4 rounded-lg border-2 flex items-center gap-3 transition-all ${
                form.contract_type === value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <Icon className={`w-5 h-5 ${
                form.contract_type === value ? 'text-blue-600' : 'text-gray-400'
              }`} />
              <span className="font-medium text-sm">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Conditional Fields */}
      {form.contract_type === 'freelance' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <FormField 
            label="Duration" 
            value={form.duration}
            onChange={(val) => setForm({...form, duration: val})}
            placeholder="e.g., 6 months"
          />
          <FormField 
            label="Start Date" 
            value={form.start_date}
            onChange={(val) => setForm({...form, start_date: val})}
            placeholder="e.g., ASAP, Jan 2025"
          />
          <FormField 
            label="Daily Rate" 
            value={form.daily_rate}
            onChange={(val) => setForm({...form, daily_rate: val})}
            placeholder="e.g., €600-700"
          />
        </div>
      )}

      {form.contract_type === 'permanent' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <FormField 
            label="Start Date" 
            value={form.start_date}
            onChange={(val) => setForm({...form, start_date: val})}
            placeholder="e.g., ASAP, February 2025"
          />
          <FormField 
            label="Annual Salary" 
            value={form.annual_salary}
            onChange={(val) => setForm({...form, annual_salary: val})}
            placeholder="e.g., €50,000-60,000"
          />
        </div>
      )}
    </div>
  );
}

// ============================================================================
// SKILL TAGS COMPONENT
// ============================================================================
function SkillTags({ label, skills, onChange, color }: any) {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onChange([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter((s: string) => s !== skillToRemove));
  };

  const colorClasses = {
    red: 'bg-red-100 text-red-800 border-red-200',
    blue: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {skills.map((skill: string, idx: number) => (
          <span
            key={idx}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border flex items-center gap-2 ${colorClasses[color]}`}
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="hover:opacity-70"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
          placeholder="Type skill and press Enter"
          className="flex-1 p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          onClick={addSkill}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
        >
          Add
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// INTERNAL SECTION (Collapsible)
// ============================================================================
function InternalSection({ form, setForm }: any) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 bg-gray-50 hover:bg-gray-100 flex items-center justify-between transition-colors"
      >
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-900">Internal Settings</span>
          <span className="text-xs text-gray-500">(Optional)</span>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      {expanded && (
        <div className="p-4 space-y-4 border-t">
          <div className="grid grid-cols-2 gap-4">
            <FormSelect
              label="Priority"
              value={form.priority || 'medium'}
              onChange={(val) => setForm({...form, priority: val})}
              options={[
                { value: 'low', label: '🟢 Low' },
                { value: 'medium', label: '🟡 Medium' },
                { value: 'high', label: '🔴 High' }
              ]}
            />
            <FormSelect
              label="Assign To"
              value={form.assigned_to || ''}
              onChange={(val) => setForm({...form, assigned_to: val})}
              options={[
                { value: '', label: 'Unassigned' },
                { value: 'team_it', label: 'IT Team' },
                { value: 'sarah', label: 'Sarah Johnson' },
                { value: 'mike', label: 'Mike Thompson' }
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Internal Notes</label>
            <textarea
              value={form.internal_notes || ''}
              onChange={(e) => setForm({...form, internal_notes: e.target.value})}
              placeholder="Private notes for internal team..."
              className="w-full p-3 border border-gray-300 rounded-lg text-sm"
              rows={3}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// REUSABLE FORM COMPONENTS
// ============================================================================
function FormSection({ title, icon: Icon, children }: any) {
  return (
    <section className="pb-6 border-b border-gray-200 last:border-b-0">
      <div className="flex items-center gap-2 mb-4">
        {Icon && <Icon className="w-5 h-5 text-gray-600" />}
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function FormField({ label, value, onChange, type = 'text', required = false, placeholder = '', min }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        min={min}
        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}

function FormSelect({ label, value, onChange, options, required = false }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}