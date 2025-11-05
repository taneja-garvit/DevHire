import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Briefcase, Clock, Target, Zap } from 'lucide-react';

function DeveloperDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Dev<span className="text-yellow-500">Hire</span>
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Welcome Section */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-xl p-8 md:p-12 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-400 rounded-full opacity-10 blur-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-yellow-400 p-4 rounded-xl shadow-lg">
                <User size={32} className="text-black" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">
                  Welcome back, {user.name}! 👋
                </h1>
                <p className="text-gray-300 text-lg">{user.email}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-6">
              <div className="bg-yellow-400 bg-opacity-20 backdrop-blur-sm border border-yellow-400 border-opacity-30 px-4 py-2 rounded-lg">
                <span className="text-yellow-400 font-semibold text-sm">Developer Account</span>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 px-4 py-2 rounded-lg">
                <span className="text-white font-medium text-sm">🎯 Ready to apply</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-400">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Briefcase size={20} className="text-yellow-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">0</span>
            </div>
            <p className="text-gray-600 text-sm font-medium">Applications</p>
            <p className="text-xs text-gray-500 mt-1">Start applying today</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-400">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle size={20} className="text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">0</span>
            </div>
            <p className="text-gray-600 text-sm font-medium">Tests Completed</p>
            <p className="text-xs text-gray-500 mt-1">Take assessments</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-400">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 p-2 rounded-lg">
                <TrendingUp size={20} className="text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">0%</span>
            </div>
            <p className="text-gray-600 text-sm font-medium">Success Rate</p>
            <p className="text-xs text-gray-500 mt-1">Build your record</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-400">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Award size={20} className="text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-900">0</span>
            </div>
            <p className="text-gray-600 text-sm font-medium">Offers Received</p>
            <p className="text-xs text-gray-500 mt-1">Land your dream job</p>
          </div>
        </div> */}

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all cursor-pointer border border-gray-100 hover:border-yellow-400">
              <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <User size={24} className="text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Profile</h3>
              <p className="text-gray-600 text-sm mb-4">
                Add your skills, experience, and resume
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-2">30% complete</p>
            </div>

            <div
              onClick={() => navigate('/jobs')}
              className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer transform hover:scale-105"
            >
              <div className="bg-white bg-opacity-30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Briefcase size={24} className="text-black" />
              </div>
              <h3 className="text-lg font-semibold text-black mb-2">Browse Jobs</h3>
              <p className="text-black text-opacity-80 text-sm mb-4">
                Find opportunities that match your skills
              </p>
              <div className="flex items-center gap-2 text-black font-medium text-sm">
                <span>Explore now</span>
                <span>→</span>
              </div>
            </div>

            <div
              onClick={() => navigate('/developer-dashboard/test-history')}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all cursor-pointer border border-gray-100 hover:border-yellow-400"
            >
              <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Clock size={24} className="text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">My Test History</h3>
              <p className="text-gray-600 text-sm mb-4">
                View all tests and scores
              </p>
              <span className="text-yellow-600 font-medium text-sm">View all →</span>
            </div>
          </div>
        </div>

        {/* Get Started Guide */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Target size={24} className="text-yellow-500" />
            Get Started with DevHire
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="bg-yellow-400 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Complete Your Profile</h4>
                <p className="text-gray-600 text-sm">Add your skills, experience, and upload your resume to stand out</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-yellow-400 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Browse & Apply to Jobs</h4>
                <p className="text-gray-600 text-sm">Find opportunities matching your expertise and submit applications</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-yellow-400 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Take Skill Assessments</h4>
                <p className="text-gray-600 text-sm">Complete coding tests to showcase your technical abilities</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-yellow-400 text-black font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">Get Hired!</h4>
                <p className="text-gray-600 text-sm">Receive offers from top companies and start your new career</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap size={24} className="text-yellow-500" />
            Pro Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <span className="text-yellow-500 text-xl">💡</span>
              <div>
                <p className="font-medium text-gray-900 text-sm">Complete your profile first</p>
                <p className="text-gray-600 text-xs mt-1">Recruiters are 3x more likely to view complete profiles</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <span className="text-yellow-500 text-xl">⚡</span>
              <div>
                <p className="font-medium text-gray-900 text-sm">Apply to jobs regularly</p>
                <p className="text-gray-600 text-xs mt-1">Set aside time each day to browse new opportunities</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <span className="text-yellow-500 text-xl">🎯</span>
              <div>
                <p className="font-medium text-gray-900 text-sm">Take tests seriously</p>
                <p className="text-gray-600 text-xs mt-1">Prepare well before starting skill assessments</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <span className="text-yellow-500 text-xl">📊</span>
              <div>
                <p className="font-medium text-gray-900 text-sm">Track your progress</p>
                <p className="text-gray-600 text-xs mt-1">Monitor applications and follow up when needed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeveloperDashboard;
