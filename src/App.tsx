/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';

// Lazy load pages for better performance
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Login = React.lazy(() => import('./pages/auth/Login'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const UserDashboard = React.lazy(() => import('./pages/user/Dashboard'));
const WhatsAppManagement = React.lazy(() => import('./pages/user/WhatsAppManagement'));
const Campaigns = React.lazy(() => import('./pages/user/Campaigns'));
const Reports = React.lazy(() => import('./pages/user/Reports'));
const ApiDocs = React.lazy(() => import('./pages/user/ApiDocs'));
const Billing = React.lazy(() => import('./pages/user/Billing'));
const Contacts = React.lazy(() => import('./pages/user/ContactManagement'));
const Settings = React.lazy(() => import('./pages/user/UserSettings'));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));

const ProtectedRoute: React.FC<{ children: React.ReactNode; role?: 'admin' | 'user' }> = ({ children, role }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div className="h-screen w-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;

  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <React.Suspense fallback={<div className="h-screen w-screen flex items-center justify-center">Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* User Routes */}
            <Route path="/dashboard" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
            <Route path="/whatsapp" element={<ProtectedRoute role="user"><WhatsAppManagement /></ProtectedRoute>} />
            <Route path="/contacts" element={<ProtectedRoute role="user"><Contacts /></ProtectedRoute>} />
            <Route path="/campaigns" element={<ProtectedRoute role="user"><Campaigns /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute role="user"><Reports /></ProtectedRoute>} />
            <Route path="/api-docs" element={<ProtectedRoute role="user"><ApiDocs /></ProtectedRoute>} />
            <Route path="/billing" element={<ProtectedRoute role="user"><Billing /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute role="user"><Settings /></ProtectedRoute>} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </React.Suspense>
        <Toaster position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}
