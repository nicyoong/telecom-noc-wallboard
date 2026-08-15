/**
 * Tests for TabNav component
 * 
 * Risk: Tab navigation controls access to different monitoring views.
 * Incorrect filtering could hide critical monitoring tabs.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TabNav } from '@/components/layout/tab-nav';

describe('TabNav', () => {
  const tabs = [
    { id: 'topology', label: 'Topology' },
    { id: 'devices', label: 'Device Health' },
    { id: 'incidents', label: 'Active Incidents', count: 5 },
  ];

  it('should render all tabs', () => {
    render(<TabNav activeTab="topology" onTabChange={() => {}} tabs={tabs} />);
    
    expect(screen.getByText('Topology')).toBeInTheDocument();
    expect(screen.getByText('Device Health')).toBeInTheDocument();
    expect(screen.getByText('Active Incidents')).toBeInTheDocument();
  });

  it('should highlight active tab', () => {
    render(<TabNav activeTab="devices" onTabChange={() => {}} tabs={tabs} />);
    
    const devicesTab = screen.getByText('Device Health');
    expect(devicesTab).toHaveClass('text-brand-blue');
  });

  it('should show incident count badge', () => {
    render(<TabNav activeTab="topology" onTabChange={() => {}} tabs={tabs} />);
    
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('should call onTabChange when tab clicked', () => {
    const handleChange = jest.fn();
    render(<TabNav activeTab="topology" onTabChange={handleChange} tabs={tabs} />);
    
    fireEvent.click(screen.getByText('Active Incidents'));
    expect(handleChange).toHaveBeenCalledWith('incidents');
  });

  it('should not show count badge when count is 0', () => {
    const tabsWithoutCount = [
      { id: 'topology', label: 'Topology' },
      { id: 'incidents', label: 'Active Incidents', count: 0 },
    ];
    
    render(<TabNav activeTab="topology" onTabChange={() => {}} tabs={tabsWithoutCount} />);
    
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('should have proper ARIA attributes', () => {
    render(<TabNav activeTab="topology" onTabChange={() => {}} tabs={tabs} />);
    
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab').length).toBe(3);
  });
});
