import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DeveloperDashboard from './pages/DeveloperDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';
import JobsList from './pages/JobsList';
import CreateJob from './pages/CreateJob';
import JobDetails from './pages/JobDetails';
import TakeTest from './pages/TakeTest';
import TestResults from './pages/TestResults';
import DeveloperTestHistory from './pages/DeveloperTestHistory';
import RecruiterCandidates from './pages/RecruiterCandidates';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/developer-dashboard" element={<DeveloperDashboard />} />
        <Route path="/developer-dashboard/test-history" element={<DeveloperTestHistory />} />
        <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter-dashboard/candidates" element={<RecruiterCandidates />} />
        <Route path="/jobs" element={<JobsList isRecruiter={false} />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/recruiter-dashboard/jobs" element={<JobsList isRecruiter={true} />} />
        <Route path="/recruiter-dashboard/post-job" element={<CreateJob />} />
        <Route path="/test/:testId" element={<TakeTest />} />
        <Route path="/test-results" element={<TestResults />} />
      </Routes>
    </Router>
  );
}

export default App;
