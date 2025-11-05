import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, LogOut } from 'lucide-react';
import ResultsCard from '../components/ResultsCard';
import Button from '../components/Button';
import { useState } from 'react';

interface Result {
  questionId: string;
  correct: boolean;
  pointsReceived: number;
}

function TestResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());

  const { score, totalQuestions, results } = location.state || {
    score: 0,
    totalQuestions: 0,
    results: [],
  };

  if (!location.state) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full text-center">
          <p className="text-gray-600 mb-4">Results not found</p>
          <button
            onClick={() => navigate('/jobs')}
            className="text-yellow-500 hover:text-yellow-600 font-medium"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const toggleResultExpanded = (questionId: string) => {
    const newExpanded = new Set(expandedResults);
    if (newExpanded.has(questionId)) {
      newExpanded.delete(questionId);
    } else {
      newExpanded.add(questionId);
    }
    setExpandedResults(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">
              Dev<span className="text-yellow-500">Hire</span>
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Assessment Complete!
          </h1>
          <p className="text-gray-600">
            Your results have been submitted to the recruiter
          </p>
        </div>

        <ResultsCard score={score} totalQuestions={totalQuestions} />

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <p className="text-gray-700 text-center">
            Your results have been sent to the recruiter. We'll notify you of
            their decision soon. In the meantime, you can continue browsing
            other job listings.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Question Breakdown
            </h2>
            <p className="text-sm text-gray-600">
              Click to view details
            </p>
          </div>

          <div className="space-y-3">
            {results.map((result: Result, index: number) => {
              const isExpanded = expandedResults.has(result.questionId);

              return (
                <button
                  key={result.questionId}
                  onClick={() => toggleResultExpanded(result.questionId)}
                  className={`w-full text-left bg-white border rounded-lg p-4 transition-all ${
                    result.correct
                      ? 'border-green-200 hover:border-green-300'
                      : 'border-red-200 hover:border-red-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {result.correct ? (
                          <CheckCircle size={20} className="text-green-600" />
                        ) : (
                          <XCircle size={20} className="text-red-600" />
                        )}
                        <span className="font-medium text-gray-900">
                          Question {index + 1}
                        </span>
                      </div>

                      {isExpanded && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>Result:</strong>{' '}
                            <span
                              className={
                                result.correct
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }
                            >
                              {result.correct ? 'Correct' : 'Incorrect'}
                            </span>
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Points:</strong> {result.pointsReceived}/1
                          </p>
                        </div>
                      )}
                    </div>

                    <div className={`ml-4 text-sm font-semibold ${
                      result.correct ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {result.correct ? '+1' : '0'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate('/jobs')}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Jobs
          </button>
          <button
            onClick={() => navigate('/developer-dashboard')}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestResults;
