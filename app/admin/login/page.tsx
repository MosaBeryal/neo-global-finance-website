'use client';

import React from "react"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [dbError, setDbError] = useState('');
  const [showSetupGuide, setShowSetupGuide] = useState(false);

  useEffect(() => {
    const checkDatabase = async () => {
      try {
        const response = await fetch('/api/admin/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'test', password: 'test' }),
        });
        const data = await response.json();
        if (data.dbError) {
          setDbError(data.dbError);
          setShowSetupGuide(true);
        }
      } catch (err) {
        // Silently fail on network errors during check
      }
    };
    checkDatabase();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 bg-gradient-to-br from-background to-secondary/20">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 space-y-2">
          <div className="flex justify-center">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-primary">Neo Global</h1>
          <p className="text-foreground/70">Admin Dashboard</p>
        </div>

        {/* Database Error Alert */}
        {showSetupGuide && (
          <div className="mb-6 p-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
            <div className="flex gap-3 mb-3">
              <AlertCircle className="text-yellow-700 flex-shrink-0 mt-0.5" size={24} />
              <div>
                <h3 className="font-bold text-yellow-900 mb-2">Database Setup Required</h3>
                <p className="text-sm text-yellow-800 mb-4">
                  MySQL is not connected. To use the admin dashboard, you need to:
                </p>
                <ol className="text-xs text-yellow-800 space-y-1 ml-4 list-decimal">
                  <li>Install MySQL and ensure it's running on localhost:3306</li>
                  <li>Copy .env.example to .env.local</li>
                  <li>Add your MySQL credentials to .env.local</li>
                  <li>Run: mysql -u root -p neo_finance {'<'} scripts/init-database.sql</li>
                  <li>Restart your dev server</li>
                </ol>
                <p className="text-xs text-yellow-700 mt-3">
                  See ADMIN_SETUP.md for complete instructions
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Login Card */}
        <div className="bg-white rounded-2xl p-10 border border-border shadow-lg">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">Admin Login</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-primary">Username</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-primary/50" size={20} />
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-12 text-base"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-primary">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-primary/50" size={20} />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 text-base"
                  disabled={loading}
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all duration-300"
            >
              {loading ? 'Logging in...' : 'Login to Dashboard'}
            </Button>
          </form>

          {/* Info Text */}
          <p className="text-xs text-foreground/60 text-center mt-6">
            First login with any credentials will create your admin account
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-foreground/50 text-sm mt-8">
          Neo Global Finance Admin Portal
        </p>
      </div>
    </div>
  );
}
