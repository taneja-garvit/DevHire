import { useState } from 'react';
import { X, AlertCircle, ChevronDown, Check } from 'lucide-react';
import axios from 'axios';
import Button from './Button';

interface StartTestModalProps {
  jobTitle: string;
  jobId: string;
  recruiterId: string;
  onTestStarted: (testId: string, questions: any[], recruiterId: string) => void;
  onClose: () => void;
}

const AVAILABLE_SKILLS = [
  'REACT',
  'JAVASCRIPT',
  'NODE',
  'PYTHON',
  'JAVA',
  'MONGO',
  'GOLANG',
  'TYPESCRIPT',
  'HTML',
  'CSS',
  'NEXTJS',
  'EXPRESS',
  'POSTGRESQL',
  'MYSQL',
  'REDIS',
  'DOCKER',
  'KUBERNETES',
  'AWS',
  'AZURE',
  'GCP',
  'GRAPHQL',
  'RESTAPI',
  'SASS',
  'VITE',
  'WEBPACK',
  'VUE',
  'ANGULAR',
  'FLASK',
  'DJANGO',
  'TAILWIND',
  'FIGMA',
];


function StartTestModal({
  jobTitle,
  jobId,
  recruiterId,
  onTestStarted,
  onClose,
}: StartTestModalProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(prev => prev.filter(s => s !== skill));
  };

  const formatSkillName = (skill: string) => {
    return skill.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleStartTest = async () => {
    if (selectedSkills.length === 0) {
      setError('Please select at least one skill category');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (!token || !user) {
        setError('Authentication required');
        return;
      }

      const userData = JSON.parse(user);

      // Send all selected skills to backend
      const response = await axios.post(
        'http://localhost:4000/assessments',
        {
          candidateId: userData._id,
          jobId,
          skillCategories: selectedSkills, // Send array of all selected skills
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { testId, questions } = response.data;
      onTestStarted(testId, questions, recruiterId);
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Failed to start test. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 animate-in">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Ready to Start?
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-700 mb-6">
          You're about to take the assessment for{' '}
          <strong>{jobTitle}</strong>. This test will help the recruiter
          understand your skills.
        </p>

        {/* Multi-Select Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Skills <span className="text-red-500">*</span>
          </label>
          
          {/* Dropdown Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            >
              <span className={selectedSkills.length === 0 ? 'text-gray-400' : 'text-gray-900'}>
                {selectedSkills.length === 0
                  ? 'Select skill categories...'
                  : `${selectedSkills.length} skill${selectedSkills.length > 1 ? 's' : ''} selected`}
              </span>
              <ChevronDown
                size={20}
                className={`text-gray-400 transition-transform ${
                  isDropdownOpen ? 'transform rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                {AVAILABLE_SKILLS.map((skill) => (
                  <div
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <span className="text-gray-700">{formatSkillName(skill)}</span>
                    {selectedSkills.includes(skill) && (
                      <Check size={18} className="text-blue-600" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Skills Tags */}
          {selectedSkills.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <div
                  key={skill}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  <span>{formatSkillName(skill)}</span>
                  <button
                    onClick={() => removeSkill(skill)}
                    className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {error && selectedSkills.length === 0 && (
            <p className="mt-2 text-sm text-red-600">Skill category is required</p>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">
                Important
              </p>
              <p className="text-sm text-blue-800">
                You'll have 30 minutes to complete the test. Make sure you're in
                a quiet place and ready to focus.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <div className="flex-1">
            <Button
              onClick={handleStartTest}
              loading={loading}
              fullWidth
              variant="primary"
            >
              Start Test
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartTestModal;
