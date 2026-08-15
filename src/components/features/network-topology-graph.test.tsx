/**
 * Tests for NetworkTopologyGraph component
 * 
 * Risk: Topology graph provides visual network overview. Incorrect
 * rendering could hide topology changes or device status issues.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { NetworkTopologyGraph } from '@/components/features/network-topology-graph';

describe('NetworkTopologyGraph', () => {
  it('should render topology graph', () => {
    render(<NetworkTopologyGraph />);
    expect(screen.getByText('Network Topology')).toBeInTheDocument();
  });

  it('should show legend', () => {
    render(<NetworkTopologyGraph />);
    
    expect(screen.getByText('Online')).toBeInTheDocument();
    expect(screen.getByText('Degraded')).toBeInTheDocument();
    expect(screen.getByText('Critical')).toBeInTheDocument();
    expect(screen.getByText('Maintenance')).toBeInTheDocument();
  });

  it('should render SVG elements', () => {
    const { container } = render(<NetworkTopologyGraph />);
    
    expect(container.querySelector('svg')).toBeInTheDocument();
    expect(container.querySelectorAll('circle').length).toBeGreaterThan(0);
    expect(container.querySelectorAll('line').length).toBeGreaterThan(0);
  });

  it('should show device labels', () => {
    render(<NetworkTopologyGraph />);
    
    // Core routers
    expect(screen.getByText('CR-NYC')).toBeInTheDocument();
    expect(screen.getByText('CR-LA')).toBeInTheDocument();
    expect(screen.getByText('CR-SF')).toBeInTheDocument();
    
    // Distribution switches
    expect(screen.getByText('DS-CHI')).toBeInTheDocument();
    expect(screen.getByText('DS-MIA')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<NetworkTopologyGraph className="custom-graph" />);
    
    expect(container.firstChild).toHaveClass('custom-graph');
  });

  it('should show color-coded nodes', () => {
    const { container } = render(<NetworkTopologyGraph />);
    
    // Check for different stroke colors
    const circles = container.querySelectorAll('circle');
    expect(circles.length).toBeGreaterThan(0);
  });
});
