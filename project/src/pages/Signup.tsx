import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Briefcase } from 'lucide-react';
import InputField from '../components/InputField';
import Button from '../components/Button';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4000/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      const userRole = response.data.user.role;
      navigate(userRole === 'developer' ? '/developer-dashboard' : '/recruiter-dashboard');
    } catch (error: any) {
      if (error.response) {
        setApiError(error.response.data.message || 'Signup failed');
      } else {
        setApiError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 transform transition-all">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-yellow-400 p-3 rounded-xl mb-4">
              <Briefcase size={32} className="text-black" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">DevHire</h1>
            <p className="text-gray-600 mt-2">Create your account</p>
          </div>

          <div className="flex border-b border-gray-200 mb-6">
            <Link
              to="/login"
              className="flex-1 text-center py-3 font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="flex-1 text-center py-3 font-medium text-yellow-500 border-b-2 border-yellow-400"
            >
              Sign Up
            </Link>
          </div>

          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <InputField
              label="Name"
              type="text"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
              placeholder="Enter your full name"
              required
              error={errors.name}
            />

            <InputField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(value) => setFormData({ ...formData, email: value })}
              placeholder="Enter your email"
              required
              error={errors.email}
            />

            <InputField
              label="Password"
              type="password"
              value={formData.password}
              onChange={(value) => setFormData({ ...formData, password: value })}
              placeholder="Create a password (min 6 characters)"
              required
              error={errors.password}
            />

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="flex gap-4">
                <label
                  className={`flex-1 flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.role === 'developer'
                      ? 'border-yellow-400 bg-yellow-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="developer"
                    checked={formData.role === 'developer'}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="sr-only"
                  />
                  <span
                    className={`font-medium ${
                      formData.role === 'developer'
                        ? 'text-gray-900'
                        : 'text-gray-600'
                    }`}
                  >
                    Developer
                  </span>
                </label>

                <label
                  className={`flex-1 flex items-center justify-center px-4 py-3 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.role === 'recruiter'
                      ? 'border-yellow-400 bg-yellow-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={formData.role === 'recruiter'}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="sr-only"
                  />
                  <span
                    className={`font-medium ${
                      formData.role === 'recruiter'
                        ? 'text-gray-900'
                        : 'text-gray-600'
                    }`}
                  >
                    Recruiter
                  </span>
                </label>
              </div>
              {errors.role && (
                <p className="mt-1 text-sm text-red-500">{errors.role}</p>
              )}
            </div>

            <Button type="submit" loading={loading} fullWidth variant="primary">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-yellow-500 hover:text-yellow-600 font-medium transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
