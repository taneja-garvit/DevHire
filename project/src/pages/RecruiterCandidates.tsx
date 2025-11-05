import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Users, TrendingUp, Award, Calendar, Clock, CheckCircle, BarChart3, Search } from 'lucide-react';

interface CandidateScore {
  _id: string;
  userId: string;
  recruiterId: string;
  testId: string;
  score: number;
  total: number;
  createdAt: string;
}

interface UserDetails {
  _id: string;
  name: string;
  email: string;
  role: string;
}

function RecruiterCandidates() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState<CandidateScore[]>([]);
  const [filteredCandidates, setFilteredCandidates] = useState<CandidateScore[]>([]);
  const [userDetails, setUserDetails] = useState<Record<string, UserDetails>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterScore, setFilterScore] = useState<'all' | 'excellent' | 'good' | 'average'>('all');

  useEffect(() => {
    fetchCandidates();
  }, []);

  useEffect(() => {
    filterCandidates();
  }, [searchTerm, filterScore, candidates, userDetails]);

  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');

      if (!token || !userData) {
        navigate('/login');
        return;
      }

      const user = JSON.parse(userData);
      console.log('👤 User object:', user);
      console.log('🆔 User ID:', user._id || user.id);
      
      const response = await axios.get(
        `http://localhost:4000/scores/recruiter/${user._id || user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log('📊 API Response:', response.data);
      const scores = response.data.scores || [];
      setCandidates(scores);
      setFilteredCandidates(scores);

      // Fetch user details for all unique candidate IDs
      if (scores.length > 0) {
        await fetchUserDetails(scores, token);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load candidates');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDetails = async (scores: CandidateScore[], token: string) => {
    try {
      // Get unique user IDs
      const uniqueUserIds = [...new Set(scores.map(s => s.userId))];
      console.log('👥 Fetching details for users:', uniqueUserIds);

      // Fetch details for each user
      const userDetailsMap: Record<string, UserDetails> = {};
      
      await Promise.all(
        uniqueUserIds.map(async (userId) => {
          try {
            const response = await axios.get(
              `http://localhost:4000/auth/user/${userId}`,
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            );
            userDetailsMap[userId] = response.data;
            console.log(`✅ Fetched details for ${userId}:`, response.data.name);
          } catch (err) {
            console.error(`❌ Failed to fetch details for ${userId}:`, err);
            // Set a fallback name if fetch fails
            userDetailsMap[userId] = {
              _id: userId,
              name: 'Unknown User',
              email: '',
              role: 'developer'
            };
          }
        })
      );

      setUserDetails(userDetailsMap);
    } catch (err) {
      console.error('Error fetching user details:', err);
    }
  };

  const filterCandidates = () => {
    let filtered = candidates;

    // Filter by search term (name, email, userId or testId)
    if (searchTerm) {
      filtered = filtered.filter(
        c =>
          c.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.testId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          userDetails[c.userId]?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          userDetails[c.userId]?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by score range
    if (filterScore !== 'all') {
      filtered = filtered.filter(c => {
        const percentage = calculatePercentage(c.score, c.total);
        if (filterScore === 'excellent') return percentage >= 80;
        if (filterScore === 'good') return percentage >= 60 && percentage < 80;
        if (filterScore === 'average') return percentage < 60;
        return true;
      });
    }

    setFilteredCandidates(filtered);
  };

  const calculatePercentage = (score: number, total: number) => {
    return Math.round((score / total) * 100);
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 80) return 'bg-green-50 border-green-200';
    if (percentage >= 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  const calculateStats = () => {
    if (candidates.length === 0) return { total: 0, average: 0, excellent: 0 };

    const percentages = candidates.map(c => calculatePercentage(c.score, c.total));
    const average = Math.round(percentages.reduce((a, b) => a + b, 0) / percentages.length);
    const excellent = percentages.filter(p => p >= 80).length;

    return {
      total: candidates.length,
      average,
      excellent
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading candidates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Dev<span className="text-yellow-500">Hire</span>
            </h1>
            <button
              onClick={() => navigate('/recruiter-dashboard')}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-xl p-8 md:p-12 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400 rounded-full opacity-10 blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-yellow-400 p-4 rounded-xl shadow-lg">
                <Users size={32} className="text-black" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
                  Candidate Results 🎯
                </h1>
                <p className="text-gray-300 text-lg">Review test performance and scores</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-400">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Users size={24} className="text-yellow-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.total}</span>
            </div>
            <p className="text-gray-700 font-semibold">Total Candidates</p>
            <p className="text-xs text-gray-500 mt-1">Who took assessments</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-400">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-3 rounded-lg">
                <Award size={24} className="text-green-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.excellent}</span>
            </div>
            <p className="text-gray-700 font-semibold">High Performers</p>
            <p className="text-xs text-gray-500 mt-1">Scored 80% or above</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-400">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 p-3 rounded-lg">
                <BarChart3 size={24} className="text-blue-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.average}%</span>
            </div>
            <p className="text-gray-700 font-semibold">Average Score</p>
            <p className="text-xs text-gray-500 mt-1">Across all candidates</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Filters and Search */}
        {candidates.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by name, email, candidate ID or test ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              <div>
                <select
                  value={filterScore}
                  onChange={(e) => setFilterScore(e.target.value as any)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                >
                  <option value="all">All Scores</option>
                  <option value="excellent">Excellent (80%+)</option>
                  <option value="good">Good (60-79%)</option>
                  <option value="average">Below Average (&lt;60%)</option>
                </select>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredCandidates.length}</span> of{' '}
              <span className="font-semibold text-gray-900">{candidates.length}</span> candidates
            </div>
          </div>
        )}

        {/* Candidates List */}
        {candidates.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Candidates Yet</h3>
            <p className="text-gray-600 mb-6">
              No developers have taken tests for your jobs yet.
            </p>
            <button
              onClick={() => navigate('/create-job')}
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Post a New Job
            </button>
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Matching Results</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Candidate Test Results</h2>
              <p className="text-sm text-gray-600 mt-1">Complete assessment history</p>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredCandidates.map((candidate) => {
                const percentage = calculatePercentage(candidate.score, candidate.total);
                return (
                  <div key={candidate._id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className={`px-4 py-2 rounded-lg border-2 ${getScoreBgColor(percentage)}`}>
                            <div className="text-center">
                              <div className={`text-2xl font-bold ${getScoreColor(percentage)}`}>
                                {percentage}%
                              </div>
                              <div className="text-xs text-gray-600 mt-1">
                                {candidate.score}/{candidate.total}
                              </div>
                            </div>
                          </div>

                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="px-3 py-1 bg-yellow-400 text-black text-xs font-semibold rounded-full">
                                👤 {userDetails[candidate.userId]?.name || 'Loading...'}
                              </span>
                              {userDetails[candidate.userId]?.email && (
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                                  ✉️ {userDetails[candidate.userId].email}
                                </span>
                              )}
                              <span className="px-3 py-1 bg-gray-900 text-yellow-400 text-xs font-semibold rounded-full">
                                Test: {candidate.testId.slice(-8)}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                              <Calendar size={14} />
                              <span>
                                {new Date(candidate.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                              <span className="mx-2">•</span>
                              <Clock size={14} />
                              <span>
                                {new Date(candidate.createdAt).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>

                            {percentage >= 80 && (
                              <div className="flex items-center gap-2 text-sm text-green-700">
                                <CheckCircle size={14} />
                                <span className="font-medium">Strong candidate - Consider for interview</span>
                              </div>
                            )}
                            {percentage >= 60 && percentage < 80 && (
                              <div className="flex items-center gap-2 text-sm text-yellow-700">
                                <TrendingUp size={14} />
                                <span className="font-medium">Good performance - Worth reviewing</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {percentage >= 80 && (
                          <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                            <Award size={16} />
                            <span>Excellent</span>
                          </div>
                        )}
                        {percentage >= 60 && percentage < 80 && (
                          <div className="flex items-center gap-2 px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                            <CheckCircle size={16} />
                            <span>Good</span>
                          </div>
                        )}
                        {percentage < 60 && (
                          <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                            <BarChart3 size={16} />
                            <span>Average</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Hiring Tips */}
        {stats.excellent > 0 && (
          <div className="mt-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Award size={20} className="text-green-600" />
              You have {stats.excellent} high-performing candidate{stats.excellent !== 1 ? 's' : ''}!
            </h3>
            <p className="text-sm text-gray-700">
              These candidates scored 80% or above. Consider reaching out to them for interviews or next steps in your hiring process.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecruiterCandidates;

