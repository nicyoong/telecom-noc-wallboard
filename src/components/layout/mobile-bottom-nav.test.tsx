/**
 * Tests for MobileBottomNav component
 * 
 * Risk: Mobile navigation provides emergency escalation access.
 * Incorrect navigation could prevent rapid incident response on mobile devices.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav';

describe('MobileBottomNav', () => {
  const tabs = [
    { id: 'health', label: 'Health' },
    { id: 'incidents', label: 'Incidents' },
    { id: 'devices', label: 'Devices' },
    { id: 'log', label: 'Log' },
    { id: 'profile', label: 'Profile' },
  ];

  it('should render all mobile tabs', () => {
    render(<MobileBottomNav activeTab="health" onTabChange={() => {}} tabs={tabs} />);
    
    expect(screen.getByText('Health')).toBeInTheDocument();
    expect(screen.getByText('Incidents')).toBeInTheDocument();
    expect(screen.getByText('Devices')).toBeInTheDocument();
    expect(screen.getByText('Log')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('should highlight active tab', () => {
    render(<MobileBottomNav activeTab="incidents" onTabChange={() => {}} tabs={tabs} />);
    
    const incidentsTab = screen.getByText('Incidents');
    expect(incidentsTab).toHaveClass('text-brand-blue');
  });

  it('should show emergency escalation button', () => {
    render(<MobileBottomNav activeTab="health" onTabChange={() => {}} tabs={tabs} />);
    
    expect(screen.getByText('EMERGENCY ESCALATION')).toBeInTheDocument();
  });

  it('should call onTabChange when tab clicked', () => {
    const handleChange = jest.fn();
    render(<MobileBottomNav activeTab="health" onTabChange={handleChange} tabs={tabs} />);
    
    fireEvent.click(screen.getByText('Devices'));
    expect(handleChange).toHaveBeenCalledWith('devices');
  });

  it('should have ARIA attributes', () => {
    render(<MobileBottomNav activeTab="health" onTabChange={() => {}} tabs={tabs} />);
    
    expect(screen.getByLabelText('Mobile navigation')).toBeInTheDocument();
  });

  it('should not show count badges (mobile simplified)', () => {
    render(<MobileBottomNav activeTab="health" onTabChange={() => {}} tabs={tabs} />);
    
    // No count badges should be present in mobile nav
    expect(screen.queryByText(/\d/)).not.toBeInTheDocument();
  });
});
