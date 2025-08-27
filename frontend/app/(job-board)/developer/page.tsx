"use client"
import { Application, useApplicationStore } from '@/store/useApplicationStore'
import { Loader, Calendar, Building2, MapPin, Clock, CheckCircle, XCircle, Clock4, UserCheck, Circle, Filter, Search, FileText, ChevronDown, ChevronUp, BarChart3, ArrowRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'

// Status badge component to show application status with appropriate styling
const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
    APPLIED: { 
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', 
      icon: <Clock4 size={14} /> 
    },
    SHORTLISTED: { 
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300', 
      icon: <UserCheck size={14} /> 
    },
    INTERVIEW: { 
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300', 
      icon: <Calendar size={14} /> 
    },
    REJECTED: { 
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', 
      icon: <XCircle size={14} /> 
    },
    HIRED: { 
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', 
      icon: <CheckCircle size={14} /> 
    },
  }

  const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300', icon: <Circle size={14} /> }

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
      {config.icon}
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  )
}

// Application Card Component
const ApplicationCard = ({ application }: { application: Application }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden transition-all hover:shadow-md">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-card-foreground">{application.job.title}</h3>
              <StatusBadge status={application.status} />
            </div>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <Building2 size={16} className="mr-2" />
                <span>{application.job.companyName || 'Private Company'}</span>
              </div>
              
              {application.job.location && (
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  <span>{application.job.location}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>Applied on {new Date(application.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            {(application.salaryExpectation || application.noticePeriod) && (
              <div className="flex flex-wrap gap-4 text-sm mb-4">
                {application.salaryExpectation && (
                  <div className="bg-muted/50 px-3 py-1.5 rounded-lg">
                    <span className="font-medium text-card-foreground">Salary: </span>
                    <span className="text-muted-foreground">{application.salaryExpectation}</span>
                  </div>
                )}
                
                {application.noticePeriod && (
                  <div className="bg-muted/50 px-3 py-1.5 rounded-lg">
                    <span className="font-medium text-card-foreground">Notice: </span>
                    <span className="text-muted-foreground">{application.noticePeriod}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {application.coverLetter && (
          <div className="mt-4">
            <button 
              onClick={() => setExpanded(!expanded)}
              className="flex items-center text-sm text-primary font-medium"
            >
              {expanded ? (
                <>
                  <ChevronUp size={16} className="mr-1" />
                  Hide Cover Letter
                </>
              ) : (
                <>
                  <ChevronDown size={16} className="mr-1" />
                  View Cover Letter
                </>
              )}
            </button>
            
            {expanded && (
              <div className="mt-3 p-4 bg-muted/30 rounded-lg border border-border">
                <div className="flex items-center mb-2">
                  <FileText size={16} className="mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium text-card-foreground">Cover Letter</span>
                </div>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{application.coverLetter}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const DeveloperDashboard = () => {
  const { fetchUserApplications,  userApplications, loading } = useApplicationStore();
  const [filter, setFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    
      fetchUserApplications();
    
  }, []);

  // Filter userApplications based on selected status and search query
  const filteredApplications = userApplications.filter(app => {
    const matchesStatus = filter === 'ALL' || app.status === filter;
    const matchesSearch = searchQuery === '' || 
      app.job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.job.companyName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  // Count userApplications by status for the stats cards
  const applicationStats = {
    total: userApplications.length,
    applied: userApplications.filter(app => app.status === 'APPLIED').length,
    shortlisted: userApplications.filter(app => app.status === 'SHORTLISTED').length,
    interview: userApplications.filter(app => app.status === 'INTERVIEW').length,
    hired: userApplications.filter(app => app.status === 'HIRED').length,
    rejected: userApplications.filter(app => app.status === 'REJECTED').length,
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className='animate-spin size-8 text-primary' />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-card-foreground mb-2">Application Dashboard</h1>
          <p className="text-muted-foreground">Track all your job userApplications in one place</p>
        </div>
        
        <div className="mt-4 md:mt-0 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Search jobs or companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full md:w-64"
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <div 
          className={`bg-card p-5 rounded-xl border border-border transition-all cursor-pointer ${filter === 'ALL' ? 'ring-2 ring-primary/20 border-primary' : 'hover:border-primary/50'}`}
          onClick={() => setFilter('ALL')}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-card-foreground">{applicationStats.total}</h3>
            <div className="p-2 bg-primary/10 rounded-lg">
              <BarChart3 size={20} className="text-primary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Total Applications</p>
        </div>
        
        <div 
          className={`bg-card p-5 rounded-xl border border-border transition-all cursor-pointer ${filter === 'APPLIED' ? 'ring-2 ring-blue-500/20 border-blue-500' : 'hover:border-blue-500/50'}`}
          onClick={() => setFilter('APPLIED')}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-card-foreground">{applicationStats.applied}</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Clock4 size={20} className="text-blue-500" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Applied</p>
        </div>
        
        <div 
          className={`bg-card p-5 rounded-xl border border-border transition-all cursor-pointer ${filter === 'SHORTLISTED' ? 'ring-2 ring-purple-500/20 border-purple-500' : 'hover:border-purple-500/50'}`}
          onClick={() => setFilter('SHORTLISTED')}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-card-foreground">{applicationStats.shortlisted}</h3>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <UserCheck size={20} className="text-purple-500" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Shortlisted</p>
        </div>
        
        <div 
          className={`bg-card p-5 rounded-xl border border-border transition-all cursor-pointer ${filter === 'INTERVIEW' ? 'ring-2 ring-yellow-500/20 border-yellow-500' : 'hover:border-yellow-500/50'}`}
          onClick={() => setFilter('INTERVIEW')}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-card-foreground">{applicationStats.interview}</h3>
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Calendar size={20} className="text-yellow-500" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Interview</p>
        </div>
        
        <div 
          className={`bg-card p-5 rounded-xl border border-border transition-all cursor-pointer ${filter === 'HIRED' ? 'ring-2 ring-green-500/20 border-green-500' : 'hover:border-green-500/50'}`}
          onClick={() => setFilter('HIRED')}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-card-foreground">{applicationStats.hired}</h3>
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircle size={20} className="text-green-500" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Hired</p>
        </div>
        
        <div 
          className={`bg-card p-5 rounded-xl border border-border transition-all cursor-pointer ${filter === 'REJECTED' ? 'ring-2 ring-red-500/20 border-red-500' : 'hover:border-red-500/50'}`}
          onClick={() => setFilter('REJECTED')}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-bold text-card-foreground">{applicationStats.rejected}</h3>
            <div className="p-2 bg-red-500/10 rounded-lg">
              <XCircle size={20} className="text-red-500" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Rejected</p>
        </div>
      </div>

      {/* Applications List Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-card-foreground mb-2 md:mb-0">
          {filter === 'ALL' ? 'All Applications' : `${filter} Applications`}
          <span className="text-muted-foreground ml-2">({filteredApplications.length})</span>
        </h2>
        
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filter by:</span>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-card border border-border rounded-lg py-1.5 px-3 text-sm text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="ALL">All Statuses</option>
            <option value="APPLIED">Applied</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="INTERVIEW">Interview</option>
            <option value="HIRED">Hired</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>
{/* Applications List */}
{filteredApplications.length === 0 ? (
  <div className="text-center py-16 bg-card rounded-xl border border-border">
    <div className="text-muted-foreground mb-4">
      {filter === 'ALL' ? (
        <div>
          <Building2 size={64} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium text-card-foreground mb-2">No applications yet</p>
          <p className="text-muted-foreground">Start applying to jobs below</p>
        </div>
      ) : (
        <div>
          <Clock size={64} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium text-card-foreground mb-2">No {filter.toLowerCase()} applications</p>
          <p className="text-muted-foreground"> You Don&apos;t have any applications with this status</p>
        </div>
      )}
    </div>
    {/* Apply Button */}
    <button
      onClick={() => window.location.href = '/jobs'}
      className="mt-4 px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/80 transition"
    >
      Apply Here
    </button>
  </div>
) : (
  <>
    <div className="grid grid-cols-1 gap-5">
      {filteredApplications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>

    {/* Apply More Button */}
<div className="mt-6 flex justify-center">
  <button
    onClick={() => window.location.href = '/jobs'}
    className="px-6 py-2 rounded-lg bg-primary text-black dark:text-black hover:bg-primary/80 transition flex items-center"
  >
    Apply More
    <ArrowRight size={16} className="ml-1" />
  </button>
</div>

  </>
)}


    </div>
  )
}

export default DeveloperDashboard