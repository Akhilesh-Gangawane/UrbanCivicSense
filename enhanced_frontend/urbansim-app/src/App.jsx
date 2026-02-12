import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PricingPage from './pages/PricingPage';
import Dashboard from './pages/citizen/Dashboard';
import IssuesList from './pages/citizen/IssuesList';
import IssueDetails from './pages/citizen/IssueDetails';
import ReportIssue from './pages/citizen/ReportIssue';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMap from './pages/admin/AdminMap';
import Performance from './pages/admin/Performance';
import AIInsights from './pages/admin/AIInsights';

const Placeholder = ({ title }) => <div className="p-10 text-center dark:text-white"><h1>{title}</h1><p>Coming Soon</p></div>;

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/pricing" element={<PricingPage />} />

      {/* Citizen Routes (Protected) */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/issues" element={<ProtectedRoute><IssuesList /></ProtectedRoute>} />
      <Route path="/issues/:id" element={<ProtectedRoute><IssueDetails /></ProtectedRoute>} />
      <Route path="/report-issue" element={<ProtectedRoute><ReportIssue /></ProtectedRoute>} />
      <Route path="/map" element={<ProtectedRoute><Placeholder title="Map View" /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Placeholder title="Settings" /></ProtectedRoute>} />

      {/* Admin Routes (Protected + Admin Only) */}
      <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/map" element={<ProtectedRoute adminOnly><AdminMap /></ProtectedRoute>} />
      <Route path="/admin/performance" element={<ProtectedRoute adminOnly><Performance /></ProtectedRoute>} />
      <Route path="/admin/insights" element={<ProtectedRoute adminOnly><AIInsights /></ProtectedRoute>} />

      <Route path="/features" element={<Placeholder title="Features" />} />
      <Route path="/solutions" element={<Placeholder title="Solutions" />} />
      <Route path="/contact" element={<Placeholder title="Contact" />} />
    </Routes>
  );
}

export default App;
