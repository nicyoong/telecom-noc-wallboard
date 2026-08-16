import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardPage from '@/app/dashboard/page';

// Mock useAuth
jest.mock('@/contexts/auth-context', () => ({
  useAuth: jest.fn(),
}));

// Mock child view components to keep renders lightweight
jest.mock('@/components/views/topology-view', () => ({
  TopologyView: () => <div data-testid="topology-view">TopologyView</div>,
}));
jest.mock('@/components/views/device-health-view', () => ({
  DeviceHealthView: () => <div data-testid="device-health-view">DeviceHealthView</div>,
}));
jest.mock('@/components/views/bandwidth-view', () => ({
  BandwidthView: () => <div data-testid="bandwidth-view">BandwidthView</div>,
}));
jest.mock('@/components/views/incidents-view', () => ({
  IncidentsView: () => <div data-testid="incidents-view">IncidentsView</div>,
}));
jest.mock('@/components/views/shift-log-view', () => ({
  ShiftLogView: () => <div data-testid="shift-log-view">ShiftLogView</div>,
}));
jest.mock('@/components/views/mobile-dashboard', () => ({
  MobileDashboard: () => <div data-testid="mobile-dashboard">MobileDashboard</div>,
}));
jest.mock('@/components/layout/alert-ticker', () => ({
  AlertTicker: () => <div data-testid="alert-ticker">AlertTicker</div>,
}));
jest.mock('@/components/layout/health-bar', () => ({
  HealthBar: () => <div data-testid="health-bar">HealthBar</div>,
}));
jest.mock('@/components/layout/tab-nav', () => ({
  TabNav: () => <div data-testid="tab-nav">TabNav</div>,
}));
jest.mock('@/components/layout/sidebar', () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar</div>,
}));
jest.mock('@/components/layout/mobile-bottom-nav', () => ({
  MobileBottomNav: () => <div data-testid="mobile-bottom-nav">MobileBottomNav</div>,
}));
jest.mock('@/components/layout/header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));
jest.mock('@/components/layout/footer', () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));

const { useAuth } = jest.requireMock('@/contexts/auth-context');

describe('DashboardPage', () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
    jest.clearAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    jest.clearAllMocks();
  });

  it('shows loading state when auth is loading', () => {
    useAuth.mockReturnValue({ user: null, isLoading: true });

    render(<DashboardPage />);
    expect(screen.getByText('Loading NetWatch NOC...')).toBeInTheDocument();
  });

  it('shows sign-in prompt when user is not authenticated', () => {
    useAuth.mockReturnValue({ user: null, isLoading: false });

    render(<DashboardPage />);
    expect(screen.getByText('NetWatch NOC')).toBeInTheDocument();
    expect(screen.getByText('Authentication required')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });

  it('renders dashboard content when authenticated on desktop', () => {
    useAuth.mockReturnValue({ user: { name: 'Test User', role: 'noc_lead' }, isLoading: false });

    render(<DashboardPage />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('tab-nav')).toBeInTheDocument();
    expect(screen.getByTestId('topology-view')).toBeInTheDocument();
  });

  it('shows mobile dashboard when window is narrow', () => {
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });

    useAuth.mockReturnValue({ user: { name: 'Test User' }, isLoading: false });

    render(<DashboardPage />);
    // Trigger resize handler
    act(() => {
      window.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByTestId('mobile-dashboard')).toBeInTheDocument();
    expect(screen.queryByTestId('topology-view')).not.toBeInTheDocument();
  });

  it('defaults to topology view for unknown tabs', () => {
    useAuth.mockReturnValue({ user: { name: 'Test User' }, isLoading: false });

    render(<DashboardPage />);
    expect(screen.getByTestId('topology-view')).toBeInTheDocument();
  });
});
