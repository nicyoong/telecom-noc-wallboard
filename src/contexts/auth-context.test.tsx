/**
 * Tests for auth context
 * 
 * Risk: Authentication and authorization are security-critical. 
 * Incorrect role-based access could expose sensitive NOC data.
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/contexts/auth-context';
import type { Role } from '@/types/auth';

// Helper component to test auth context
function TestAuthDisplay() {
  const { user, isLoading, hasPermission } = useAuth();
  return (
    <div>
      <div data-testid="loading">{isLoading ? 'loading' : 'not-loading'}</div>
      <div data-testid="user">{user ? user.name : 'none'}</div>
      <div data-testid="role">{user ? user.role : 'none'}</div>
      <div data-testid="permission">{hasPermission('engineer') ? 'allowed' : 'denied'}</div>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should show loading state initially', () => {
    render(
      <AuthProvider>
        <TestAuthDisplay />
      </AuthProvider>
    );
    
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('should have no user initially', async () => {
    render(
      <AuthProvider>
        <TestAuthDisplay />
      </AuthProvider>
    );
    
    // Wait for initial load
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    expect(screen.getByTestId('user')).toHaveTextContent('none');
  });

  it('should authenticate with valid credentials', async () => {
    render(
      <AuthProvider>
        <TestAuthDisplay />
      </AuthProvider>
    );

    const { login } = useAuth();
    
    await act(async () => {
      await login('marcus@netwatchnoc.com', 'password');
    });

    expect(screen.getByTestId('user')).toHaveTextContent('Marcus Chen');
    expect(screen.getByTestId('role')).toHaveTextContent('noc_lead');
  });

  it('should deny permission for insufficient role', async () => {
    render(
      <AuthProvider>
        <TestAuthDisplay />
      </AuthProvider>
    );

    await act(async () => {
      await (window as any).__authContext?.login('guest@netwatchnoc.com', 'password');
    });

    // Viewer should not have engineer permissions
    expect(screen.getByTestId('permission')).toHaveTextContent('denied');
  });

  it('should persist auth state in localStorage', async () => {
    const { login } = (AuthProvider as any).__testGetAuth;
    
    await act(async () => {
      await login('torres@netwatchnoc.com', 'password');
    });

    const stored = localStorage.getItem('noc_auth_user');
    expect(stored).toBeTruthy();
    expect(JSON.parse(stored).email).toBe('torres@netwatchnoc.com');
  });

  it('should restore auth state from localStorage on reload', async () => {
    // Pre-populate localStorage
    const user = { id: 'USR-001', name: 'Test User', email: 'test@test.com', role: 'viewer', shift: 'day', station: 'Test Station' };
    localStorage.setItem('noc_auth_user', JSON.stringify(user));

    render(
      <AuthProvider>
        <TestAuthDisplay />
      </AuthProvider>
    );

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(screen.getByTestId('user')).toHaveTextContent('Test User');
  });

  it('should handle logout', async () => {
    render(
      <AuthProvider>
        <TestAuthDisplay />
      </AuthProvider>
    );

    const { logout } = useAuth();
    
    await act(async () => {
      await logout();
    });

    expect(screen.getByTestId('user')).toHaveTextContent('none');
    expect(localStorage.getItem('noc_auth_user')).toBeNull();
  });

  it('should throw error when used outside AuthProvider', () => {
    function TestWithoutProvider() {
      useAuth();
      return <div>test</div>;
    }

    expect(() => render(<TestWithoutProvider />)).toThrow('useAuth must be used within an AuthProvider');
  });
});
