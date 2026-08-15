/**
 * Tests for DeviceHealthView component
 * 
 * Risk: Device health view shows device status and metrics. Incorrect
 * filtering could hide degraded or critical devices.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { DeviceHealthView } from '@/components/views/device-health-view';
import { MOCK_DEVICES } from '@/data/mock';

describe('DeviceHealthView', () => {
  it('should render section heading', () => {
    render(<DeviceHealthView />);
    expect(screen.getByText('Device Health')).toBeInTheDocument();
  });

  it('should show device count', () => {
    render(<DeviceHealthView />);
    expect(screen.getByText(/Showing \d+ of \d+ devices/)).toBeInTheDocument();
  });

  it('should render device table', () => {
    render(<DeviceHealthView />);
    
    // Check for column headers
    expect(screen.getByText('Hostname')).toBeInTheDocument();
    expect(screen.getByText('IP Address')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('should display device hostnames', () => {
    render(<DeviceHealthView />);
    
    MOCK_DEVICES.forEach((device) => {
      expect(screen.getByText(device.hostname)).toBeInTheDocument();
    });
  });

  it('should display IP addresses', () => {
    render(<DeviceHealthView />);
    
    MOCK_DEVICES.forEach((device) => {
      expect(screen.getByText(device.ip_address)).toBeInTheDocument();
    });
  });

  it('should show device status badges', () => {
    render(<DeviceHealthView />);
    
    // Should show at least one status badge
    expect(screen.getByText(/Online|Degraded|Critical|Offline|Maintenance/)).toBeInTheDocument();
  });

  it('should display CPU utilization', () => {
    render(<DeviceHealthView />);
    
    // Should show some CPU percentage
    const cpuText = screen.getByText(/\d+%/);
    expect(cpuText).toBeInTheDocument();
  });

  it('should display uptime', () => {
    render(<DeviceHealthView />);
    
    // Should show uptime in hours
    expect(screen.getByText(/\d+h/)).toBeInTheDocument();
  });

  it('should show empty state when no devices match', () => {
    // Mock with empty devices
    const originalDevices = MOCK_DEVICES;
    jest.spyOn(require('@/data/mock'), 'MOCK_DEVICES', 'get').mockReturnValue([]);
    
    render(<DeviceHealthView />);
    expect(screen.getByText('No devices match the current filters.')).toBeInTheDocument();
  });
});
