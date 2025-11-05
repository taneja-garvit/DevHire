import { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import axios from 'axios';
import InputField from './InputField';
import Button from './Button';

interface StartTestModalProps {
  jobTitle: string;
  jobId: string;
  recruiterId: string;
  onTestStarted: (testId: string, questions: any[], recruiterId: string) => void;
  onClose: () => void;
}

function StartTestModal({
  jobTitle,
  jobId,
  recruiterId,
  onTestStarted,
  onClose,
}: StartTestModalProps) {
  const [skillCategory, setSkillCategory] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStartTest = async () => {
    if (!skillCategory.trim()) {
      setError('Please enter a skill category');
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

      const response = await axios.post(
        'http://localhost:4000/assessments',
        {
          candidateId: userData._id,
          jobId,
          skillCategory: skillCategory.trim(),
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

        <InputField
          label="Skill Category"
          type="text"
          value={skillCategory}
          onChange={setSkillCategory}
          placeholder="e.g., JavaScript, React, Node.js"
          required
          error={error && !skillCategory ? 'Skill category is required' : ''}
        />

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-900 mb-1">
                Important
              </p>
              <p className="text-sm text-yellow-800">
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
