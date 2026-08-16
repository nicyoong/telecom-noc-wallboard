import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SettingsPage from '@/app/settings/page';

// Mock useToast
const mockAddToast = jest.fn();
jest.mock('@/components/ui/toast', () => ({
  useToast: () => ({ addToast: mockAddToast }),
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

describe('SettingsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page title and subtitle', () => {
    render(<SettingsPage />);
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Configure your NOC monitoring environment')).toBeInTheDocument();
  });

  it('renders all six settings tabs', () => {
    render(<SettingsPage />);
    expect(screen.getByText('Display')).toBeInTheDocument();
    expect(screen.getByText('Alerts')).toBeInTheDocument();
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Data Sources')).toBeInTheDocument();
    expect(screen.getByText('Maintenance')).toBeInTheDocument();
  });

  it('shows Display tab content by default', () => {
    render(<SettingsPage />);
    expect(screen.getByText('Theme')).toBeInTheDocument();
    expect(screen.getByText('Dark Theme')).toBeInTheDocument();
    expect(screen.getByText('Light Theme')).toBeInTheDocument();
    expect(screen.getByText('Auto-Refresh')).toBeInTheDocument();
    expect(screen.getByText('Wallboard Mode')).toBeInTheDocument();
    expect(screen.getByText('Font Size')).toBeInTheDocument();
    expect(screen.getByText('Color Scheme')).toBeInTheDocument();
  });

  it('switches to Alerts tab when clicked', () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getByText('Alerts'));
    expect(screen.getByText('Alert Thresholds')).toBeInTheDocument();
    expect(screen.getByText('Severity Mapping')).toBeInTheDocument();
    expect(screen.getByText('Escalation Rules')).toBeInTheDocument();
    expect(screen.getByText('Suppression Windows')).toBeInTheDocument();
  });

  it('switches to Notifications tab when clicked', () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getByText('Notifications'));
    expect(screen.getByText('Email Alerts')).toBeInTheDocument();
    expect(screen.getByText('SMS Alerts')).toBeInTheDocument();
    expect(screen.getByText('PagerDuty Integration')).toBeInTheDocument();
    expect(screen.getByText('Slack Webhooks')).toBeInTheDocument();
  });

  it('switches to Users tab when clicked', () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getByText('Users'));
    expect(screen.getByText('User Management')).toBeInTheDocument();
    expect(screen.getByText('Shift Assignments')).toBeInTheDocument();
  });

  it('switches to Data Sources tab when clicked', () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getByText('Data Sources'));
    expect(screen.getByText('SNMP Configuration')).toBeInTheDocument();
    expect(screen.getByText('API Endpoints')).toBeInTheDocument();
  });

  it('switches to Maintenance tab when clicked', () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getByText('Maintenance'));
    expect(screen.getByText('Maintenance Windows')).toBeInTheDocument();
    expect(screen.getByText('Scheduled Tasks')).toBeInTheDocument();
    expect(screen.getByText('Backup Settings')).toBeInTheDocument();
  });

  it('Save Changes button triggers toast', () => {
    render(<SettingsPage />);
    fireEvent.click(screen.getByText('Save Changes'));
    expect(mockAddToast).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'success',
        title: 'Settings Saved',
      })
    );
  });

  it('has refresh interval select', () => {
    render(<SettingsPage />);
    const select = document.querySelector('select') as HTMLSelectElement;
    expect(select).toBeInTheDocument();
    expect(select?.value).toBe('30');
  });
});
