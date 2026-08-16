import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePage from '@/app/profile/page';

// Mock useAuth
const mockLogout = jest.fn();
jest.mock('@/contexts/auth-context', () => ({
  useAuth: jest.fn(() => ({
    user: { name: 'Marcus Chen', email: 'marcus@netwatchnoc.com', role: 'noc_lead' },
    logout: mockLogout,
  })),
}));

// Mock dependencies - use simple div wrappers that preserve children
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className, ...props }: any) => (
    <div className={className} {...props}>{children}</div>
  ),
}));
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, className, ...props }: any) => (
    <button className={className} {...props}>{children}</button>
  ),
}));
jest.mock('@/components/ui/badge', () => ({
  Badge: ({ label }: any) => <span>{label}</span>,
}));

describe('ProfilePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user profile with name and email', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Marcus Chen')).toBeInTheDocument();
    expect(screen.getByText('marcus@netwatchnoc.com')).toBeInTheDocument();
  });

  it('shows User Profile heading', () => {
    render(<ProfilePage />);
    expect(screen.getByText('User Profile')).toBeInTheDocument();
    expect(screen.getByText('Manage your account settings and preferences')).toBeInTheDocument();
  });

  it('renders Sign Out button that calls logout', () => {
    render(<ProfilePage />);
    const signOutBtn = screen.getByText('Sign Out');
    fireEvent.click(signOutBtn);
    expect(mockLogout).toHaveBeenCalled();
  });

  it('shows edit mode when Edit button is clicked', () => {
    render(<ProfilePage />);
    const editBtn = screen.getByText('Edit');
    fireEvent.click(editBtn);
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('shows contact information fields', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
  });

  it('disables input fields when not in edit mode', () => {
    render(<ProfilePage />);
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
    expect(emailInput?.disabled).toBe(true);
  });

  it('enables input fields when in edit mode', () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByText('Edit'));
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
    expect(emailInput?.disabled).toBe(false);
  });

  it('shows shift information', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Shift Information')).toBeInTheDocument();
    expect(screen.getByText('Day Shift')).toBeInTheDocument();
    expect(screen.getByText('Station A - Main Console')).toBeInTheDocument();
    expect(screen.getByText('07:00 UTC')).toBeInTheDocument();
    expect(screen.getByText('19:00 UTC')).toBeInTheDocument();
  });

  it('shows certifications list', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Certifications & Training')).toBeInTheDocument();
    expect(screen.getByText('CCNA')).toBeInTheDocument();
    expect(screen.getByText('JNCIA')).toBeInTheDocument();
    expect(screen.getByText('ITIL v4')).toBeInTheDocument();
  });

  it('shows recent activity', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    expect(screen.getByText('Acknowledged incident INC-001')).toBeInTheDocument();
    expect(screen.getByText('Updated device CR-001 configuration')).toBeInTheDocument();
  });

  it('toggles password change form', () => {
    render(<ProfilePage />);
    expect(screen.queryByText('Current Password')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Change Password'));
    expect(screen.getByText('Current Password')).toBeInTheDocument();
    expect(screen.getByText('New Password')).toBeInTheDocument();
    expect(screen.getByText('Confirm New Password')).toBeInTheDocument();
    expect(screen.getByText('Update Password')).toBeInTheDocument();
  });

  it('hides password change form when toggled off', () => {
    render(<ProfilePage />);
    fireEvent.click(screen.getByText('Change Password'));
    expect(screen.getByText('Current Password')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Change Password'));
    expect(screen.queryByText('Current Password')).not.toBeInTheDocument();
  });
});
