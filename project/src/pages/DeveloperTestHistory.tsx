import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Award, Calendar, CheckCircle, TrendingUp, Clock, BarChart3 } from 'lucide-react';

interface TestScore {
  _id: string;
  userId: string;
  recruiterId: string;
  testId: string;
  score: number;
  total: number;
  createdAt: string;
}

function DeveloperTestHistory() {
  const navigate = useNavigate();
  const [tests, setTests] = useState<TestScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTestHistory();
  }, []);

  const fetchTestHistory = async () => {
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
        `http://localhost:4000/scores/user/${user._id || user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log('📊 API Response:', response.data);
      setTests(response.data.scores || []);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load test history');
    } finally {
      setLoading(false);
    }
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
    if (tests.length === 0) return { average: 0, highest: 0, completed: 0 };

    const percentages = tests.map(t => calculatePercentage(t.score, t.total));
    const average = Math.round(percentages.reduce((a, b) => a + b, 0) / percentages.length);
    const highest = Math.max(...percentages);

    return {
      average,
      highest,
      completed: tests.length
    };
  };

  const stats = calculateStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading test history...</p>
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
              onClick={() => navigate('/developer-dashboard')}
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
                <BarChart3 size={32} className="text-black" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
                  My Test History 📊
                </h1>
                <p className="text-gray-300 text-lg">Track your assessment performance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-400">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <CheckCircle size={24} className="text-yellow-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.completed}</span>
            </div>
            <p className="text-gray-700 font-semibold">Tests Completed</p>
            <p className="text-xs text-gray-500 mt-1">Total assessments taken</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-400">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-3 rounded-lg">
                <TrendingUp size={24} className="text-green-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.average}%</span>
            </div>
            <p className="text-gray-700 font-semibold">Average Score</p>
            <p className="text-xs text-gray-500 mt-1">Across all tests</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-400">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Award size={24} className="text-purple-600" />
              </div>
              <span className="text-3xl font-bold text-gray-900">{stats.highest}%</span>
            </div>
            <p className="text-gray-700 font-semibold">Highest Score</p>
            <p className="text-xs text-gray-500 mt-1">Best performance</p>
          </div>
        </div>

        {/* Tests List */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {tests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Tests Yet</h3>
            <p className="text-gray-600 mb-6">You haven't taken any assessments yet.</p>
            <button
              onClick={() => navigate('/jobs')}
              className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Browse Jobs & Apply
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">All Test Results</h2>
              <p className="text-sm text-gray-600 mt-1">Your complete assessment history</p>
            </div>

            <div className="divide-y divide-gray-200">
              {tests.map((test) => {
                const percentage = calculatePercentage(test.score, test.total);
                return (
                  <div key={test._id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className={`px-4 py-2 rounded-lg border-2 ${getScoreBgColor(percentage)}`}>
                            <div className="text-center">
                              <div className={`text-2xl font-bold ${getScoreColor(percentage)}`}>
                                {percentage}%
                              </div>
                              <div className="text-xs text-gray-600 mt-1">
                                {test.score}/{test.total}
                              </div>
                            </div>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-3 py-1 bg-gray-900 text-yellow-400 text-xs font-semibold rounded-full">
                                Test ID: {test.testId.slice(-8)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              <span className="font-medium text-gray-900">Recruiter ID:</span> {test.recruiterId.slice(0, 8)}...
                            </p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Calendar size={14} />
                              <span>
                                {new Date(test.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                              <span className="mx-2">•</span>
                              <Clock size={14} />
                              <span>
                                {new Date(test.createdAt).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {percentage >= 80 && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                            <Award size={16} />
                            <span>Excellent</span>
                          </div>
                        )}
                        {percentage >= 60 && percentage < 80 && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                            <CheckCircle size={16} />
                            <span>Good</span>
                          </div>
                        )}
                        {percentage < 60 && (
                          <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
                            <TrendingUp size={16} />
                            <span>Keep Trying</span>
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

        {/* Performance Tips */}
        {tests.length > 0 && stats.average < 80 && (
          <div className="mt-8 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <TrendingUp size={20} className="text-yellow-600" />
              Tips to Improve Your Score
            </h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• 📚 Review the basics before taking assessments</p>
              <p>• ⏰ Take your time and read questions carefully</p>
              <p>• 💪 Practice coding regularly to build confidence</p>
              <p>• 🎯 Focus on understanding concepts, not just memorizing</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeveloperTestHistory;

