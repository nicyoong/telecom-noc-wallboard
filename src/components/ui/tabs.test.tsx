/**
 * Tests for Tabs component
 * 
 * Risk: Tabs control navigation between monitoring views. Incorrect
 * behavior could prevent access to critical monitoring data.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tabs } from '@/components/ui/tabs';

describe('Tabs', () => {
  const tabs = [
    { id: 'topology', label: 'Topology' },
    { id: 'devices', label: 'Device Health', count: 15 },
    { id: 'incidents', label: 'Incidents', count: 3 },
  ];

  it('should render all tabs', () => {
    render(<Tabs activeTab="topology" onTabChange={() => {}} tabs={tabs} />);
    
    expect(screen.getByText('Topology')).toBeInTheDocument();
    expect(screen.getByText('Device Health')).toBeInTheDocument();
    expect(screen.getByText('Incidents')).toBeInTheDocument();
  });

  it('should highlight active tab', () => {
    render(<Tabs activeTab="devices" onTabChange={() => {}} tabs={tabs} />);
    
    const devicesTab = screen.getByText('Device Health');
    expect(devicesTab).toHaveClass('text-brand-blue');
  });

  it('should show count badges', () => {
    render(<Tabs activeTab="topology" onTabChange={() => {}} tabs={tabs} />);
    
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('should call onTabChange when tab clicked', () => {
    const handleChange = jest.fn();
    render(<Tabs activeTab="topology" onTabChange={handleChange} tabs={tabs} />);
    
    fireEvent.click(screen.getByText('Incidents'));
    expect(handleChange).toHaveBeenCalledWith('incidents');
  });

  it('should have ARIA attributes', () => {
    render(<Tabs activeTab="topology" onTabChange={() => {}} tabs={tabs} />);
    
    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getAllByRole('tab').length).toBe(3);
  });

  it('should apply custom className', () => {
    const { container } = render(
      <Tabs activeTab="topology" onTabChange={() => {}} tabs={tabs} className="custom-tabs" />
    );
    
    expect(container.firstChild).toHaveClass('custom-tabs');
  });

  it('should not show count badge when count is 0', () => {
    const tabsWithoutCount = [
      ...tabs,
      { id: 'reports', label: 'Reports', count: 0 },
    ];
    
    render(<Tabs activeTab="topology" onTabChange={() => {}} tabs={tabsWithoutCount} />);
    
    // Count of 0 should not be displayed
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });
});
