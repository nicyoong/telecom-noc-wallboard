'use client';

import React from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';

export function LoginPage() {
  const { login, isLoading } = useAuth();
  const { addToast } = useToast();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      addToast({ type: 'error', title: 'Authentication Failed', message: 'Please enter both email and password.' });
      return;
    }
    try {
      await login(email, '');
      addToast({ type: 'success', title: 'Login Successful', message: `Welcome, ${email.split('@')[0]}` });
    } catch {
      addToast({ type: 'error', title: 'Login Failed', message: 'Invalid credentials. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-base flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-blue/10 border border-brand-blue/30 mb-4">
            <svg className="w-8 h-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-display-md font-bold text-white">NetWatch NOC</h1>
          <p className="text-body-md text-base-muted">Network Operations Center — Secure Access Portal</p>
        </div>

        <Card className="p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="operator@netwatchnoc.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>

          <div className="pt-4 border-t border-base-border">
            <p className="text-body-sm text-base-muted text-center mb-3">Demo credentials:</p>
            <div className="space-y-2 text-body-sm font-mono">
              <p className="flex justify-between text-base-muted">
                <span>NOC Lead:</span>
                <span className="text-brand-blue">marcus@netwatchnoc.com</span>
              </p>
              <p className="flex justify-between text-base-muted">
                <span>Engineer:</span>
                <span className="text-brand-blue">torres@netwatchnoc.com</span>
              </p>
              <p className="flex justify-between text-base-muted">
                <span>Viewer:</span>
                <span className="text-brand-blue">guest@netwatchnoc.com</span>
              </p>
            </div>
          </div>
        </Card>

        <p className="text-body-xs text-base-muted text-center">
          NetWatch NOC v2.4.1 · Authorized access only · All activity is monitored and logged
        </p>
      </div>
    </div>
  );
}
