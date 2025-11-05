import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Briefcase } from 'lucide-react';
import InputField from '../components/InputField';
import Button from '../components/Button';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      const response = await axios.post('http://localhost:4000/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      const userRole = response.data.user.role;
      navigate(userRole === 'developer' ? '/developer-dashboard' : '/recruiter-dashboard');
    } catch (error: any) {
      if (error.response) {
        setApiError(error.response.data.message || 'Login failed');
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
            <p className="text-gray-600 mt-2">Welcome back</p>
          </div>

          <div className="flex border-b border-gray-200 mb-6">
            <Link
              to="/login"
              className="flex-1 text-center py-3 font-medium text-yellow-500 border-b-2 border-yellow-400"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="flex-1 text-center py-3 font-medium text-gray-500 hover:text-gray-700 transition-colors"
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
              placeholder="Enter your password"
              required
              error={errors.password}
            />

            <div className="flex items-center justify-end mb-6">
              <a
                href="#"
                className="text-sm text-yellow-500 hover:text-yellow-600 transition-colors"
              >
                Forgot Password?
              </a>
            </div>

            <Button type="submit" loading={loading} fullWidth variant="primary">
              Login
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-yellow-500 hover:text-yellow-600 font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
