import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MapPin, Briefcase, Calendar, LogOut } from 'lucide-react';
import SkillTag from '../components/SkillTag';
import Button from '../components/Button';
import StartTestModal from '../components/StartTestModal';

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

function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isPostedByUser, setIsPostedByUser] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(userData);
    setCurrentUser(user);
    fetchJobDetails(token, id!);
  }, [id, navigate]);

  const fetchJobDetails = async (token: string, jobId: string) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`http://localhost:4000/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const jobData = response.data.job;
      setJob(jobData);

      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setIsPostedByUser(jobData.postedBy === user._id);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const getExperienceBadgeColor = (level: string) => {
    switch (level) {
      case 'Fresher':
        return 'bg-blue-100 text-blue-700';
      case 'Junior':
        return 'bg-green-100 text-green-700';
      case 'Mid':
        return 'bg-yellow-100 text-yellow-700';
      case 'Senior':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleApply = () => {
    setShowTestModal(true);
  };

  const handleTestStarted = (testId: string, questions: any[], recruiterId: string) => {
    navigate(`/test/${testId}`, { state: { questions, recruiterId } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate(-1)}
              className="text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={24} />
              <span className="text-2xl font-bold text-gray-900">
                Dev<span className="text-yellow-500">Hire</span>
              </span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400" />
          </div>
        ) : !job ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-600 mb-4">Job not found</p>
            <button
              onClick={() => navigate(-1)}
              className="text-yellow-500 hover:text-yellow-600 font-medium"
            >
              Go back
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-700">
                  <Briefcase size={20} className="text-yellow-500" />
                  {job.company}
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={20} />
                  <span>{job.location}</span>
                </div>

                <div
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getExperienceBadgeColor(
                    job.experienceLevel
                  )}`}
                >
                  {job.experienceLevel}
                </div>

                {isPostedByUser && (
                  <div className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium">
                    Posted by you
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {job.salaryRange && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Salary Range</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {job.salaryRange}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-gray-600 mb-1">Posted Date</p>
                  <div className="flex items-center gap-2 text-gray-900">
                    <Calendar size={20} />
                    <span className="font-medium">
                      {formatDate(job.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <SkillTag key={skill} skill={skill} />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Job Description
              </h3>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {job.description}
                </p>
              </div>
            </div>

            {currentUser?.role === 'developer' && (
              <div className="flex gap-4">
                <Button
                  onClick={handleApply}
                  fullWidth
                  variant="primary"
                >
                  Apply for this Job
                </Button>
              </div>
            )}
          </div>
        )}

        {showTestModal && job && (
          <StartTestModal
            jobTitle={job.title}
            jobId={job._id}
            recruiterId={job.postedBy}
            onTestStarted={handleTestStarted}
            onClose={() => setShowTestModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default JobDetails;
