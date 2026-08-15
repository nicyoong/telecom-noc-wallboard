/**
 * Tests for login page
 * 
 * Risk: Login page controls access to the NOC system. Incorrect behavior
 * could prevent legitimate access or allow unauthorized access.
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LoginPage } from '@/components/views/login-page';
import { useAuth } from '@/contexts/auth-context';

// Mock the auth context
jest.mock('@/contexts/auth-context', () => ({
  useAuth: jest.fn(),
}));

describe('LoginPage', () => {
  const mockLogin = jest.fn();
  const mockAddToast = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
    });
  });

  it('should render login form', () => {
    render(<LoginPage />);
    expect(screen.getByText('NetWatch NOC')).toBeInTheDocument();
  });

  it('should show portal description', () => {
    render(<LoginPage />);
    expect(screen.getByText('Network Operations Center — Secure Access Portal')).toBeInTheDocument();
  });

  it('should have email input', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
  });

  it('should have password input', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('should have sign in button', () => {
    render(<LoginPage />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('should show demo credentials', () => {
    render(<LoginPage />);
    expect(screen.getByText('marcus@netwatchnoc.com')).toBeInTheDocument();
    expect(screen.getByText('torres@netwatchnoc.com')).toBeInTheDocument();
    expect(screen.getByText('guest@netwatchnoc.com')).toBeInTheDocument();
  });

  it('should call login on form submit', async () => {
    mockLogin.mockResolvedValueOnce(undefined);
    
    render(<LoginPage />);
    
    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    });
    
    await act(async () => {
      fireEvent.submit(screen.getByRole('form'));
    });
    
    expect(mockLogin).toHaveBeenCalledWith('test@example.com', '');
  });

  it('should show error toast on login failure', async () => {
    mockLogin.mockRejectedValueOnce(new Error('Invalid credentials'));
    
    render(<LoginPage />);
    
    // Mock useToast
    jest.spyOn(require('@/components/ui/toast'), 'useToast').mockReturnValue({
      addToast: mockAddToast,
      toasts: [],
      removeToast: () => {},
    });
    
    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'bad@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrong' },
    });
    
    await act(async () => {
      fireEvent.submit(screen.getByRole('form'));
    });
    
    expect(mockAddToast).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'error' })
    );
  });

  it('should show success toast on login', async () => {
    mockLogin.mockResolvedValueOnce(undefined);
    
    jest.spyOn(require('@/components/ui/toast'), 'useToast').mockReturnValue({
      addToast: mockAddToast,
      toasts: [],
      removeToast: () => {},
    });
    
    render(<LoginPage />);
    
    fireEvent.change(screen.getByLabelText('Email Address'), {
      target: { value: 'good@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    });
    
    await act(async () => {
      fireEvent.submit(screen.getByRole('form'));
    });
    
    expect(mockAddToast).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'success' })
    );
  });

  it('should disable submit when loading', () => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: true,
    });
    
    render(<LoginPage />);
    expect(screen.getByText('Sign In')).toBeDisabled();
  });
});
