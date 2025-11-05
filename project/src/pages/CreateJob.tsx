import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, X } from 'lucide-react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import SkillTag from '../components/SkillTag';

function CreateJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: 'Remote',
    experienceLevel: 'Junior',
    skills: [] as string[],
    salaryRange: '',
    description: '',
  });

  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    const user = JSON.parse(userData);
    if (user.role !== 'recruiter') {
      navigate('/developer-dashboard');
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    if (formData.skills.length === 0) {
      newErrors.skills = 'Add at least one skill';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && skillInput.trim()) {
      e.preventDefault();
      const newSkill = skillInput.trim().replace(/,/, '');
      if (!formData.skills.includes(newSkill)) {
        setFormData({
          ...formData,
          skills: [...formData.skills, newSkill],
        });
      }
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');
    setSuccessMessage('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4000/jobs', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccessMessage('Job posted successfully!');
      setTimeout(() => {
        navigate('/recruiter-dashboard/jobs');
      }, 2000);
    } catch (error: any) {
      setApiError(
        error.response?.data?.message || 'Failed to post job'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <button
              onClick={() => navigate('/recruiter-dashboard/jobs')}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Dev<span className="text-yellow-500">Hire</span>
            </h1>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Post a New Job</h2>
          <p className="text-gray-600">
            Fill in the details to post your job listing
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          {apiError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{apiError}</p>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-600">{successMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <InputField
                label="Job Title"
                type="text"
                value={formData.title}
                onChange={(value) =>
                  setFormData({ ...formData, title: value })
                }
                placeholder="e.g., Senior React Developer"
                required
                error={errors.title}
              />

              <InputField
                label="Company Name"
                type="text"
                value={formData.company}
                onChange={(value) =>
                  setFormData({ ...formData, company: value })
                }
                placeholder="Your company name"
                required
                error={errors.company}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <InputField
                label="Location"
                type="text"
                value={formData.location}
                onChange={(value) =>
                  setFormData({ ...formData, location: value })
                }
                placeholder="e.g., Remote, New York"
                required
                error={errors.location}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience Level
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  value={formData.experienceLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      experienceLevel: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all bg-white"
                >
                  <option value="Fresher">Fresher</option>
                  <option value="Junior">Junior</option>
                  <option value="Mid">Mid</option>
                  <option value="Senior">Senior</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills Required
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="mb-3 p-4 bg-gray-50 rounded-lg border border-gray-300 min-h-24">
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.skills.map((skill) => (
                    <div key={skill} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                  placeholder="Type skill and press Enter or comma"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
              </div>
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills}</p>
              )}
              <p className="text-xs text-gray-500">
                Press Enter or comma to add skills
              </p>
            </div>

            <InputField
              label="Salary Range (Optional)"
              type="text"
              value={formData.salaryRange}
              onChange={(value) =>
                setFormData({ ...formData, salaryRange: value })
              }
              placeholder="e.g., $80,000 - $120,000"
            />

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe the job role, responsibilities, and requirements (minimum 50 characters)"
                rows={8}
                className={`w-full px-4 py-3 border ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none`}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  Minimum 50 characters required
                </p>
                <p
                  className={`text-sm font-medium ${
                    formData.description.length >= 50
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }`}
                >
                  {formData.description.length}/50
                </p>
              </div>
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                loading={loading}
                fullWidth
                variant="primary"
              >
                Post Job
              </Button>
              <Button
                type="button"
                onClick={() => navigate('/recruiter-dashboard/jobs')}
                fullWidth
                variant="secondary"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateJob;
