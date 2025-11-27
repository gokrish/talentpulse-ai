import React, { useState, useEffect } from 'react';
import {
  Building2, Users, Mail, Phone, MapPin, Calendar, Briefcase,
  Plus, Search, Edit2, Trash2, Eye, ChevronDown, ChevronRight,
  ExternalLink, AlertCircle, CheckCircle, Clock, DollarSign,
  Filter, MoreVertical, X, Save, ArrowLeft, FileText, Tag,
  TrendingUp, Activity, User, Globe, Link2, Star
} from 'lucide-react';

// ============================================================================
// CLIENT TYPES & INTERFACES
// ============================================================================
interface Client {
  id: string;
  name: string;
  type: 'direct' | 'agency';
  status: 'active' | 'inactive' | 'prospect';
  
  // Primary Contact
  primary_contact_name: string;
  primary_contact_email: string;
  primary_contact_phone?: string;
  primary_contact_title?: string;
  
  // Additional Contacts
  additional_contacts?: Contact[];
  
  // Company Info
  industry?: string;
  company_size?: string;
  website?: string;
  address?: string;
  city?: string;
  country?: string;
  
  // Relationship Metrics
  total_jobs: number;
  active_jobs: number;
  total_placements: number;
  total_revenue?: number;
  
  // Metadata
  created_at: string;
  last_contact?: string;
  notes?: string;
  tags?: string[];
}

interface Contact {
  id: string;
  name: string;
  title: string;
  email: string;
  phone?: string;
  is_primary: boolean;
}

interface Job {
  id: string;
  title: string;
  status: 'active' | 'closed' | 'on_hold';
  created_at: string;
  positions: number;
  filled: number;
}

// ============================================================================
// MAIN CLIENT MANAGEMENT COMPONENT
// ============================================================================
export default function ClientManagementSystem() {
  const [view, setView] = useState<'list' | 'detail' | 'add' | 'edit'>('list');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>(mockClients);

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setView('detail');
  };

  const handleAddClient = () => {
    setView('add');
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setView('edit');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedClient(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {view === 'list' && (
        <ClientList 
          clients={clients}
          onViewClient={handleViewClient}
          onAddClient={handleAddClient}
          onEditClient={handleEditClient}
        />
      )}

      {view === 'detail' && selectedClient && (
        <ClientDetail 
          client={selectedClient}
          onBack={handleBackToList}
          onEdit={() => handleEditClient(selectedClient)}
        />
      )}

      {(view === 'add' || view === 'edit') && (
        <ClientForm
          client={view === 'edit' ? selectedClient : null}
          onBack={handleBackToList}
          onSave={(client) => {
            if (view === 'edit') {
              setClients(clients.map(c => c.id === client.id ? client : c));
            } else {
              setClients([...clients, { ...client, id: Date.now().toString() }]);
            }
            handleBackToList();
          }}
        />
      )}
    </div>
  );
}

// ============================================================================
// CLIENT LIST VIEW
// ============================================================================
function ClientList({ clients, onViewClient, onAddClient, onEditClient }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'direct' | 'agency'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'prospect'>('all');

  const filteredClients = clients.filter((client: Client) => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.primary_contact_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || client.type === filterType;
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Stats
  const stats = {
    total: clients.length,
    active: clients.filter((c: Client) => c.status === 'active').length,
    totalJobs: clients.reduce((sum: number, c: Client) => sum + c.total_jobs, 0),
    totalRevenue: clients.reduce((sum: number, c: Client) => sum + (c.total_revenue || 0), 0)
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your clients and track relationships</p>
          </div>
          <button
            onClick={onAddClient}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Client
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={Building2}
            label="Total Clients"
            value={stats.total}
            color="blue"
          />
          <StatCard
            icon={CheckCircle}
            label="Active Clients"
            value={stats.active}
            color="green"
          />
          <StatCard
            icon={Briefcase}
            label="Total Jobs"
            value={stats.totalJobs}
            color="purple"
          />
          <StatCard
            icon={DollarSign}
            label="Total Revenue"
            value={`€${(stats.totalRevenue / 1000).toFixed(0)}K`}
            color="orange"
          />
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clients by name or contact..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="direct">Direct Clients</option>
              <option value="agency">Agencies</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="prospect">Prospect</option>
            </select>
          </div>
        </div>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredClients.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No clients found matching your filters</p>
          </div>
        ) : (
          filteredClients.map((client: Client) => (
            <ClientCard
              key={client.id}
              client={client}
              onView={() => onViewClient(client)}
              onEdit={() => onEditClient(client)}
            />
          ))
        )}
      </div>
    </div>
  );
}

// ============================================================================
// CLIENT CARD COMPONENT
// ============================================================================
function ClientCard({ client, onView, onEdit }: any) {
  const statusColors = {
    active: 'bg-green-100 text-green-800 border-green-200',
    inactive: 'bg-gray-100 text-gray-800 border-gray-200',
    prospect: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  const typeIcons = {
    direct: Building2,
    agency: Users
  };

  const TypeIcon = typeIcons[client.type];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        {/* Left Side - Main Info */}
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <TypeIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-gray-900">{client.name}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[client.status]}`}>
                  {client.status}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                  {client.type === 'direct' ? 'Direct Client' : 'Agency'}
                </span>
              </div>
              
              {/* Primary Contact */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{client.primary_contact_name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>{client.primary_contact_email}</span>
                </div>
                {client.primary_contact_phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    <span>{client.primary_contact_phone}</span>
                  </div>
                )}
              </div>

              {/* Location */}
              {client.city && (
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{client.city}, {client.country}</span>
                </div>
              )}
            </div>
          </div>

          {/* Metrics */}
          <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{client.active_jobs}</span> active
                <span className="text-gray-400 mx-1">/</span>
                <span className="text-gray-500">{client.total_jobs} total jobs</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{client.total_placements}</span> placements
              </span>
            </div>
            {client.total_revenue && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">€{(client.total_revenue / 1000).toFixed(0)}K</span> revenue
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          {client.tags && client.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {client.tags.slice(0, 3).map((tag, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  {tag}
                </span>
              ))}
              {client.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                  +{client.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right Side - Actions */}
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={onView}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={onEdit}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Edit Client"
          >
            <Edit2 className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CLIENT DETAIL VIEW
// ============================================================================
function ClientDetail({ client, onBack, onEdit }: any) {
  const [activeTab, setActiveTab] = useState<'overview' | 'contacts' | 'jobs' | 'activity'>('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto p-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Clients
          </button>

          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
                  <StatusBadge status={client.status} />
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium capitalize">
                    {client.type === 'direct' ? 'Direct Client' : 'Agency'}
                  </span>
                </div>
                {client.industry && (
                  <p className="text-gray-600">{client.industry}</p>
                )}
                {client.website && (
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 mt-1"
                  >
                    <Globe className="w-4 h-4" />
                    {client.website}
                  </a>
                )}
              </div>
            </div>

            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit Client
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <QuickStat label="Active Jobs" value={client.active_jobs} icon={Briefcase} />
            <QuickStat label="Total Jobs" value={client.total_jobs} icon={FileText} />
            <QuickStat label="Placements" value={client.total_placements} icon={CheckCircle} />
            <QuickStat 
              label="Revenue" 
              value={client.total_revenue ? `€${(client.total_revenue / 1000).toFixed(0)}K` : '€0'} 
              icon={DollarSign} 
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-6 mt-6 border-b border-gray-200">
            <TabButton
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
              label="Overview"
            />
            <TabButton
              active={activeTab === 'contacts'}
              onClick={() => setActiveTab('contacts')}
              label="Contacts"
              badge={client.additional_contacts?.length || 1}
            />
            <TabButton
              active={activeTab === 'jobs'}
              onClick={() => setActiveTab('jobs')}
              label="Jobs"
              badge={client.total_jobs}
            />
            <TabButton
              active={activeTab === 'activity'}
              onClick={() => setActiveTab('activity')}
              label="Activity"
            />
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto p-6">
        {activeTab === 'overview' && <OverviewTab client={client} />}
        {activeTab === 'contacts' && <ContactsTab client={client} />}
        {activeTab === 'jobs' && <JobsTab client={client} />}
        {activeTab === 'activity' && <ActivityTab client={client} />}
      </div>
    </div>
  );
}

// ============================================================================
// OVERVIEW TAB
// ============================================================================
function OverviewTab({ client }: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Info */}
      <div className="lg:col-span-2 space-y-6">
        {/* Primary Contact */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary Contact</h3>
          <div className="space-y-3">
            <InfoRow icon={User} label="Name" value={client.primary_contact_name} />
            {client.primary_contact_title && (
              <InfoRow icon={Briefcase} label="Title" value={client.primary_contact_title} />
            )}
            <InfoRow icon={Mail} label="Email" value={client.primary_contact_email} />
            {client.primary_contact_phone && (
              <InfoRow icon={Phone} label="Phone" value={client.primary_contact_phone} />
            )}
          </div>
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
          <div className="space-y-3">
            {client.industry && <InfoRow icon={Tag} label="Industry" value={client.industry} />}
            {client.company_size && <InfoRow icon={Users} label="Company Size" value={client.company_size} />}
            {client.website && (
              <InfoRow 
                icon={Globe} 
                label="Website" 
                value={
                  <a href={client.website} target="_blank" className="text-blue-600 hover:text-blue-700">
                    {client.website}
                  </a>
                } 
              />
            )}
            {client.address && <InfoRow icon={MapPin} label="Address" value={client.address} />}
            {client.city && (
              <InfoRow icon={MapPin} label="Location" value={`${client.city}, ${client.country}`} />
            )}
          </div>
        </div>

        {/* Notes */}
        {client.notes && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{client.notes}</p>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Relationship Health */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Relationship Health</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Activity Score</span>
                <span className="font-semibold text-green-600">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Last Contact</span>
                <span className="text-gray-900 font-medium">2 days ago</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Client Since</span>
                <span className="text-gray-900 font-medium">
                  {new Date(client.created_at).toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tags */}
        {client.tags && client.tags.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {client.tags.map((tag: string, idx: number) => (
                <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm border border-blue-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 rounded-lg flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Job
            </button>
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 rounded-lg flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Send Email
            </button>
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 rounded-lg flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CONTACTS TAB
// ============================================================================
function ContactsTab({ client }: any) {
  const allContacts = [
    {
      id: '1',
      name: client.primary_contact_name,
      title: client.primary_contact_title || 'Primary Contact',
      email: client.primary_contact_email,
      phone: client.primary_contact_phone,
      is_primary: true
    },
    ...(client.additional_contacts || [])
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">All Contacts</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" />
          Add Contact
        </button>
      </div>
      <div className="divide-y divide-gray-200">
        {allContacts.map((contact) => (
          <div key={contact.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                    {contact.is_primary && (
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                        Primary
                      </span>
                    )}
                  </div>
                  {contact.title && (
                    <p className="text-sm text-gray-600 mb-2">{contact.title}</p>
                  )}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <a href={`mailto:${contact.email}`} className="hover:text-blue-600">
                        {contact.email}
                      </a>
                    </div>
                    {contact.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${contact.phone}`} className="hover:text-blue-600">
                          {contact.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Edit2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// JOBS TAB (Linked Jobs)
// ============================================================================
function JobsTab({ client }: any) {
  const linkedJobs = mockJobs.filter(job => job.client_id === client.id);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Jobs from {client.name}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {linkedJobs.filter(j => j.status === 'active').length} active • {linkedJobs.length} total
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Job for {client.name}
        </button>
      </div>

      {linkedJobs.length === 0 ? (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 mb-4">No jobs yet for this client</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Create First Job
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {linkedJobs.map((job) => (
            <LinkedJobCard key={job.id} job={job} client={client} />
          ))}
        </div>
      )}
    </div>
  );
}

function LinkedJobCard({ job, client }: any) {
  const statusColors = {
    active: 'bg-green-100 text-green-800 border-green-200',
    closed: 'bg-gray-100 text-gray-800 border-gray-200',
    on_hold: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h4 className="font-semibold text-gray-900">{job.title}</h4>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[job.status]}`}>
              {job.status.replace('_', ' ')}
            </span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>Posted {new Date(job.created_at).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{job.filled}/{job.positions} positions filled</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${(job.filled / job.positions) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>ID: {job.id}</span>
            <span>•</span>
            <span>{job.positions - job.filled} positions remaining</span>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Eye className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ExternalLink className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ACTIVITY TAB
// ============================================================================
function ActivityTab({ client }: any) {
  const activities = [
    {
      id: '1',
      type: 'job_created',
      description: 'New job "Senior Full Stack Developer" created',
      timestamp: '2025-01-10T14:30:00Z',
      user: 'Sarah Johnson'
    },
    {
      id: '2',
      type: 'email_sent',
      description: 'Email sent to primary contact',
      timestamp: '2025-01-08T09:15:00Z',
      user: 'Mike Thompson'
    },
    {
      id: '3',
      type: 'placement',
      description: 'Candidate placed for "DevOps Engineer" role',
      timestamp: '2025-01-05T16:45:00Z',
      user: 'Anna Williams'
    }
  ];

  const activityIcons = {
    job_created: Briefcase,
    email_sent: Mail,
    placement: CheckCircle,
    note_added: FileText,
    contact_updated: User
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.type as keyof typeof activityIcons] || Activity;
          return (
            <div key={activity.id} className="p-6">
              <div className="flex gap-4">
                <div className="p-2 bg-blue-50 rounded-lg h-fit">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 mb-1">{activity.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{activity.user}</span>
                    <span>•</span>
                    <span>{new Date(activity.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// CLIENT FORM (Add/Edit)
// ============================================================================
function ClientForm({ client, onBack, onSave }: any) {
  const [formData, setFormData] = useState<Partial<Client>>(
    client || {
      name: '',
      type: 'direct',
      status: 'active',
      primary_contact_name: '',
      primary_contact_email: '',
      primary_contact_phone: '',
      primary_contact_title: '',
      industry: '',
      company_size: '',
      website: '',
      address: '',
      city: '',
      country: '',
      notes: '',
      tags: []
    }
  );

  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSave({
      ...formData,
      id: client?.id || Date.now().toString(),
      total_jobs: client?.total_jobs || 0,
      active_jobs: client?.active_jobs || 0,
      total_placements: client?.total_placements || 0,
      created_at: client?.created_at || new Date().toISOString()
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            {client ? 'Edit Client' : 'Add New Client'}
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., TechCorp Solutions"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="direct">Direct Client</option>
                    <option value="agency">Agency/Consultancy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="prospect">Prospect</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Technology, Finance"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                  <select
                    value={formData.company_size}
                    onChange={(e) => setFormData({ ...formData, company_size: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501+">501+ employees</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Primary Contact */}
            <section className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Primary Contact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.primary_contact_name}
                    onChange={(e) => setFormData({ ...formData, primary_contact_name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title/Position</label>
                  <input
                    type="text"
                    value={formData.primary_contact_title}
                    onChange={(e) => setFormData({ ...formData, primary_contact_title: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., HR Manager"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.primary_contact_email}
                    onChange={(e) => setFormData({ ...formData, primary_contact_email: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.primary_contact_phone}
                    onChange={(e) => setFormData({ ...formData, primary_contact_phone: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="+32 2 123 4567"
                  />
                </div>
              </div>
            </section>

            {/* Company Details */}
            <section className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Street address"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Brussels"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Belgium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={4}
                    placeholder="Any additional notes about this client..."
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Actions */}
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3">
            <button
              type="button"
              onClick={onBack}
              className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-white font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 font-medium"
            >
              {saving ? 'Saving...' : client ? 'Update Client' : 'Add Client'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================================
// HELPER COMPONENTS
// ============================================================================
function StatCard({ icon: Icon, label, value, color }: any) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: any) {
  const statusConfig = {
    active: { label: 'Active', color: 'bg-green-100 text-green-800 border-green-200' },
    inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-800 border-gray-200' },
    prospect: { label: 'Prospect', color: 'bg-blue-100 text-blue-800 border-blue-200' }
  };

  const config = statusConfig[status as keyof typeof statusConfig];

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
      {config.label}
    </span>
  );
}

function QuickStat({ label, value, icon: Icon }: any) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
      <Icon className="w-6 h-6 text-gray-400 mx-auto mb-2" />
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}

function TabButton({ active, onClick, label, badge }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
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

function InfoRow({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="w-5 h-5 text-gray-400 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-sm text-gray-900 font-medium">{typeof value === 'string' ? value : value}</p>
      </div>
    </div>
  );
}

// ============================================================================
// MOCK DATA
// ============================================================================
const mockClients: Client[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    type: 'direct',
    status: 'active',
    primary_contact_name: 'John Smith',
    primary_contact_email: 'john@techcorp.com',
    primary_contact_phone: '+32 2 123 4567',
    primary_contact_title: 'HR Director',
    industry: 'Technology',
    company_size: '201-500',
    website: 'https://techcorp.com',
    city: 'Brussels',
    country: 'Belgium',
    total_jobs: 15,
    active_jobs: 5,
    total_placements: 8,
    total_revenue: 125000,
    created_at: '2024-03-15T10:00:00Z',
    tags: ['Key Account', 'IT Sector', 'High Priority']
  },
  {
    id: '2',
    name: 'DataFlow Inc',
    type: 'direct',
    status: 'active',
    primary_contact_name: 'Sarah Lee',
    primary_contact_email: 'sarah@dataflow.com',
    primary_contact_phone: '+31 20 345 6789',
    primary_contact_title: 'Talent Manager',
    industry: 'Data Analytics',
    company_size: '51-200',
    website: 'https://dataflow.com',
    city: 'Amsterdam',
    country: 'Netherlands',
    total_jobs: 8,
    active_jobs: 3,
    total_placements: 5,
    total_revenue: 78000,
    created_at: '2024-06-20T14:30:00Z',
    tags: ['Data Science', 'Growth Client']
  },
  {
    id: '3',
    name: 'Randstad Belgium',
    type: 'agency',
    status: 'active',
    primary_contact_name: 'Anna Wilson',
    primary_contact_email: 'anna@randstad.be',
    primary_contact_phone: '+32 2 987 6543',
    industry: 'Staffing & Recruiting',
    company_size: '501+',
    city: 'Antwerp',
    country: 'Belgium',
    total_jobs: 22,
    active_jobs: 8,
    total_placements: 12,
    total_revenue: 95000,
    created_at: '2024-01-10T09:00:00Z',
    tags: ['Agency Partner', 'Volume']
  }
];

const mockJobs = [
  {
    id: 'JOB-001',
    client_id: '1',
    title: 'Senior Full Stack Developer',
    status: 'active',
    created_at: '2025-01-10T10:00:00Z',
    positions: 2,
    filled: 0
  },
  {
    id: 'JOB-002',
    client_id: '1',
    title: 'DevOps Engineer',
    status: 'active',
    created_at: '2025-01-05T14:30:00Z',
    positions: 1,
    filled: 1
  },
  {
    id: 'JOB-003',
    client_id: '1',
    title: 'React Developer',
    status: 'closed',
    created_at: '2024-12-15T09:00:00Z',
    positions: 3,
    filled: 3
  }
];