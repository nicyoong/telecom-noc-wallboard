import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import WallboardPage from '@/app/wallboard/page';

// Mock dependencies
jest.mock('@/data/mock', () => ({
  MOCK_DEVICES: [
    { id: '1', hostname: 'RTR-001', ip_address: '10.0.0.1', status: 'online', region: 'US_EAST', uptime_hours: 1000, cpu_utilization: 45, memory_utilization: 60 },
    { id: '2', hostname: 'RTR-002', ip_address: '10.0.0.2', status: 'critical', region: 'US_WEST', uptime_hours: 500, cpu_utilization: 92, memory_utilization: 88 },
  ],
  MOCK_INCIDENTS: [
    { id: 'INC-001', title: 'Core link down', severity: 'P1', status: 'active', assigned_to: 'Marcus', created_at: '2026-08-15T20:00:00Z', affected_services: ['BGP'] },
    { id: 'INC-002', title: 'High latency', severity: 'P2', status: 'active', assigned_to: 'Maria', created_at: '2026-08-15T21:00:00Z', affected_services: ['HTTP'] },
    { id: 'INC-003', title: 'Resolved issue', severity: 'P1', status: 'resolved', assigned_to: 'James', created_at: '2026-08-15T19:00:00Z', affected_services: ['DNS'] },
  ],
  MOCK_BANDWIDTH: [],
}));

describe('WallboardPage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the wallboard header with title', () => {
    render(<WallboardPage />);
    expect(screen.getByText('NetWatch NOC')).toBeInTheDocument();
    expect(screen.getByText('Network Operations Center - Wallboard Mode')).toBeInTheDocument();
  });

  it('shows DAY SHIFT for UTC hours 7-18', () => {
    jest.setSystemTime(new Date('2026-08-16T10:00:00Z'));
    render(<WallboardPage />);
    expect(screen.getByText('DAY SHIFT')).toBeInTheDocument();
  });

  it('shows NIGHT SHIFT for UTC hours outside 7-18', () => {
    jest.setSystemTime(new Date('2026-08-16T03:00:00Z'));
    render(<WallboardPage />);
    expect(screen.getByText('NIGHT SHIFT')).toBeInTheDocument();
  });

  it('shows critical incident alert when P1 incidents are active', () => {
    render(<WallboardPage />);
    // INC-001 is P1 and active
    expect(screen.getByText('CRITICAL INCIDENTS DETECTED')).toBeInTheDocument();
    expect(screen.getByText('1 P1 incidents active')).toBeInTheDocument();
    expect(screen.getByText('Core link down')).toBeInTheDocument();
  });

  it('does not show critical incident alert when no P1 incidents are active', () => {
    jest.mock('@/data/mock', () => ({
      MOCK_DEVICES: [],
      MOCK_INCIDENTS: [
        { id: 'INC-001', title: 'Minor issue', severity: 'P2', status: 'active', assigned_to: 'Marcus', created_at: '2026-08-15T20:00:00Z', affected_services: ['HTTP'] },
      ],
      MOCK_BANDWIDTH: [],
    }));

    // Re-import to pick up new mock
    delete require.cache[require.resolve('@/app/wallboard/page')];
    const { default: WallboardPageAlt } = require('@/app/wallboard/page');

    render(<WallboardPageAlt />);
    expect(screen.queryByText('CRITICAL INCIDENTS DETECTED')).not.toBeInTheDocument();
  });

  it('shows the first view by default', () => {
    render(<WallboardPage />);
    expect(screen.getByText('Network Topology')).toBeInTheDocument();
  });

  it('shows correct view index in footer', () => {
    render(<WallboardPage />);
    expect(screen.getByText('View: 1/4')).toBeInTheDocument();
  });

  it('toggles cycling when play/pause button is clicked', () => {
    render(<WallboardPage />);
    const pauseButton = screen.getByText('Pause');
    expect(pauseButton).toBeInTheDocument();

    fireEvent.click(pauseButton);
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('Auto-cycle: OFF')).toBeInTheDocument();
  });

  it('handles keyboard shortcut for space (pause/play)', () => {
    render(<WallboardPage />);

    fireEvent.keyDown(document, { key: ' ' });
    expect(screen.getByText('Play')).toBeInTheDocument();
  });

  it('handles keyboard shortcut for escape (exit)', () => {
    const locationHrefSpy = jest.spyOn(window.location, 'href', 'get');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Object.defineProperty(window.location, 'href', {
      configurable: true,
      value: 'about:blank',
    });

    render(<WallboardPage />);
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(window.location.href).toBe('/dashboard');
    locationHrefSpy.mockRestore();
  });

  it('displays device info in topology view', () => {
    render(<WallboardPage />);
    expect(screen.getByText('RTR-001')).toBeInTheDocument();
    expect(screen.getByText('10.0.0.1')).toBeInTheDocument();
  });
});
