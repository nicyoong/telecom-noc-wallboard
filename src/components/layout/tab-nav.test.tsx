import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TabNav } from './tab-nav';

// Mock mock data to control incident counts
jest.mock('@/data/mock', () => ({
  MOCK_INCIDENTS: [
    { id: 'INC-001', severity: 'P1', status: 'active' },
    { id: 'INC-002', severity: 'P2', status: 'active' },
    { id: 'INC-003', severity: 'P1', status: 'resolved' },
  ],
}));

describe('TabNav', () => {
  const mockOnTabChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all navigation tabs', () => {
    render(<TabNav activeTab="topology" onTabChange={mockOnTabChange} />);
    expect(screen.getByText('Topology')).toBeInTheDocument();
    expect(screen.getByText('Device Health')).toBeInTheDocument();
    expect(screen.getByText('Bandwidth')).toBeInTheDocument();
    expect(screen.getByText('Active Incidents')).toBeInTheDocument();
    expect(screen.getByText('Shift Log')).toBeInTheDocument();
    expect(screen.getByText('Reports')).toBeInTheDocument();
    expect(screen.getByText('Maintenance')).toBeInTheDocument();
    expect(screen.getByText('Escalation')).toBeInTheDocument();
    expect(screen.getByText('System Health')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Wallboard')).toBeInTheDocument();
  });

  it('marks the active tab with active styles', () => {
    render(<TabNav activeTab="incidents" onTabChange={mockOnTabChange} />);
    const incidentsTab = screen.getByText('Active Incidents').closest('button');
    expect(incidentsTab).toHaveClass('text-brand-blue');
  });

  it('calls onTabChange with the correct tab id when clicked', () => {
    render(<TabNav activeTab="topology" onTabChange={mockOnTabChange} />);
    fireEvent.click(screen.getByText('Devices'));
    expect(mockOnTabChange).toHaveBeenCalledWith('devices');
  });

  it('shows incident count badge when there are active incidents', () => {
    render(<TabNav activeTab="topology" onTabChange={mockOnTabChange} />);
    // 2 active incidents (INC-001 and INC-002)
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('shows critical badge styling for active P1 incidents', () => {
    render(<TabNav activeTab="topology" onTabChange={mockOnTabChange} />);
    const badge = screen.getByText('2').closest('span');
    expect(badge).toHaveClass('text-status-critical');
  });

  it('has ARIA roles for tabs', () => {
    render(<TabNav activeTab="topology" onTabChange={mockOnTabChange} />);
    const tabs = document.querySelectorAll('[role="tab"]');
    expect(tabs.length).toBeGreaterThan(0);
  });

  it('sets aria-selected on the active tab', () => {
    render(<TabNav activeTab="devices" onTabChange={mockOnTabChange} />);
    const devicesTab = screen.getByText('Device Health').closest('button');
    expect(devicesTab).toHaveAttribute('aria-selected', 'true');

    const topologyTab = screen.getByText('Topology').closest('button');
    expect(topologyTab).toHaveAttribute('aria-selected', 'false');
  });

  it('has a navigation role on the nav element', () => {
    render(<TabNav activeTab="topology" onTabChange={mockOnTabChange} />);
    const nav = document.querySelector('nav');
    expect(nav).toHaveAttribute('role', 'navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });
});
