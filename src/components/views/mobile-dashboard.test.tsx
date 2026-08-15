/**
 * Tests for MobileDashboard component
 * 
 * Risk: Mobile dashboard provides on-the-go monitoring. Incorrect
 * rendering could prevent mobile access to critical information.
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { MobileDashboard } from '@/components/views/mobile-dashboard';
import { MOCK_DEVICES } from '@/data/mock';

describe('MobileDashboard', () => {
  it('should show loading state initially', () => {
    render(<MobileDashboard />);
    // Should show skeleton loaders
    expect(screen.getByText('NetWatch NOC')).toBeInTheDocument();
  });

  it('should render dashboard after loading', async () => {
    await act(async () => {
      render(<MobileDashboard />);
      // Wait for loading state
      await new Promise(resolve => setTimeout(resolve, 100));
    });
    
    expect(screen.getByText('NetWatch NOC')).toBeInTheDocument();
    expect(screen.getByText('Mobile Dashboard')).toBeInTheDocument();
  });

  it('should show health score', () => {
    render(<MobileDashboard />);
    expect(screen.getByText('Health Score')).toBeInTheDocument();
  });

  it('should show active incident count', () => {
    render(<MobileDashboard />);
    expect(screen.getByText('Active Incidents')).toBeInTheDocument();
  });

  it('should show online device count', () => {
    render(<MobileDashboard />);
    expect(screen.getByText('Online Devices')).toBeInTheDocument();
  });

  it('should show latency', () => {
    render(<MobileDashboard />);
    expect(screen.getByText('Latency')).toBeInTheDocument();
  });

  it('should display device list', () => {
    render(<MobileDashboard />);
    
    // Should show at least 5 devices
    const deviceElements = document.querySelectorAll('.font-mono.text-body-md');
    expect(deviceElements.length).toBeGreaterThan(0);
  });

  it('should show critical incident alert', () => {
    const { container } = render(<MobileDashboard />);
    
    // Check for critical styling
    const criticalElements = container.querySelectorAll('.bg-status-critical');
    expect(criticalElements.length).toBeGreaterThan(0);
  });
});
