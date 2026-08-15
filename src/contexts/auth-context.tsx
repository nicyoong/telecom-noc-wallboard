'use client';

import React, { useState, useEffect, useCallback } from 'react';
import type { Role, User, AuthContextType } from '@/types/auth';

const MOCK_USERS: Record<string, Omit<User, 'id'>> = {
  'marcus@netwatchnoc.com': { name: 'Marcus Chen', role: 'noc_lead', shift: 'day', station: 'Station A - Main Console', email: 'marcus@netwatchnoc.com' },
  'torres@netwatchnoc.com': { name: 'Maria Torres', role: 'engineer', shift: 'day', station: 'Station B - Monitoring Wing', email: 'torres@netwatchnoc.com' },
  'guest@netwatchnoc.com': { name: 'Guest User', role: 'viewer', shift: 'day', station: 'Public View', email: 'guest@netwatchnoc.com' },
};

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('noc_auth_user') : null;
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser = MOCK_USERS[email];
    if (!mockUser) {
      setIsLoading(false);
      throw new Error('Invalid credentials');
    }

    const userObj: User = {
      id: 'USR-001',
      ...mockUser,
    };

    setUser(userObj);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('noc_auth_user', JSON.stringify(userObj));
    }
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('noc_auth_user');
    }
  }, []);

  const hasPermission = useCallback(
    (_requiredRole: Role) => {
      if (!user) return false;
      const roles: Role[] = ['viewer', 'engineer', 'noc_lead'];
      return roles.indexOf(user.role) >= roles.indexOf(_requiredRole);
    },
    [user],
  );

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
