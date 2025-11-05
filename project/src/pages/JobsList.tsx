import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, LogOut } from 'lucide-react';
import JobCard from '../components/JobCard';
import FilterBar from '../components/FilterBar';
import EmptyState from '../components/EmptyState';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  experienceLevel: string;
  skills: string[];
  salaryRange?: string;
  description: string;
  createdAt: string;
  postedBy: string;
}

interface JobsListProps {
  isRecruiter?: boolean;
}

function JobsList({ isRecruiter = false }: JobsListProps) {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [skillSearch, setSkillSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [experienceLevelFilter, setExperienceLevelFilter] = useState('');

  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setCurrentUser(JSON.parse(userData));
    fetchJobs(token);
  }, [navigate]);

  const fetchJobs = async (token: string) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('http://localhost:4000/jobs', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setJobs(response.data.jobs || []);
      setFilteredJobs(response.data.jobs || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = () => {
    let filtered = [...jobs];

    if (skillSearch) {
      filtered = filtered.filter((job) =>
        job.skills.some((skill) =>
          skill.toLowerCase().includes(skillSearch.toLowerCase())
        )
      );
    }

    if (locationFilter) {
      filtered = filtered.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (experienceLevelFilter) {
      filtered = filtered.filter(
        (job) => job.experienceLevel === experienceLevelFilter
      );
    }

    setFilteredJobs(filtered);
  };

  const handleReset = () => {
    setSkillSearch('');
    setLocationFilter('');
    setExperienceLevelFilter('');
    setFilteredJobs(jobs);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1
              onClick={() => navigate('/developer-dashboard')}
              className="text-2xl font-bold text-gray-900 cursor-pointer hover:text-yellow-500 transition-colors"
            >
              Dev<span className="text-yellow-500">Hire</span>
            </h1>

            <div className="flex items-center gap-4">
              {isRecruiter && (
                <button
                  onClick={() => navigate('/recruiter-dashboard/post-job')}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Plus size={20} />
                  Post Job
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Available Jobs</h2>
          <p className="text-gray-600">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <FilterBar
          skillSearch={skillSearch}
          onSkillSearchChange={setSkillSearch}
          locationFilter={locationFilter}
          onLocationFilterChange={setLocationFilter}
          experienceLevelFilter={experienceLevelFilter}
          onExperienceLevelFilterChange={setExperienceLevelFilter}
          onApplyFilters={handleApplyFilters}
          onReset={handleReset}
        />

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400" />
          </div>
        ) : filteredJobs.length === 0 ? (
          <EmptyState
            title="No jobs found"
            description={
              jobs.length === 0
                ? 'No jobs available at the moment. Check back soon!'
                : 'No jobs match your filters. Try adjusting your search.'
            }
            actionText={jobs.length === 0 ? undefined : 'Reset Filters'}
            onAction={jobs.length === 0 ? undefined : handleReset}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job._id}
                id={job._id}
                title={job.title}
                company={job.company}
                location={job.location}
                experienceLevel={job.experienceLevel}
                skills={job.skills}
                salaryRange={job.salaryRange}
                createdAt={job.createdAt}
                postedByCurrentUser={isRecruiter && job.postedBy === currentUser?._id}
                showApplyButton={!isRecruiter}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobsList;
