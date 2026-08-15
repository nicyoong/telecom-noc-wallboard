/**
 * Tests for BandwidthView component
 * 
 * Risk: Bandwidth view shows network utilization metrics. Incorrect
 * display could hide bandwidth saturation issues.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BandwidthView } from '@/components/views/bandwidth-view';
import { MOCK_NETWORK_HEALTH } from '@/data/mock';

describe('BandwidthView', () => {
  it('should render section heading', () => {
    render(<BandwidthView />);
    expect(screen.getByText('Bandwidth Monitor')).toBeInTheDocument();
  });

  it('should show total utilization', () => {
    render(<BandwidthView />);
    const utilization = Math.round(
      (MOCK_NETWORK_HEALTH.utilized_bandwidth_gbps / MOCK_NETWORK_HEALTH.total_bandwidth_gbps) * 100
    );
    expect(screen.getByText(`${utilization}%`)).toBeInTheDocument();
  });

  it('should show available capacity', () => {
    render(<BandwidthView />);
    const available = MOCK_NETWORK_HEALTH.total_bandwidth_gbps - MOCK_NETWORK_HEALTH.utilized_bandwidth_gbps;
    expect(screen.getByText(`${available} Gbps`)).toBeInTheDocument();
  });

  it('should show average latency', () => {
    render(<BandwidthView />);
    expect(screen.getByText(`${MOCK_NETWORK_HEALTH.avg_latency_ms} ms`)).toBeInTheDocument();
  });

  it('should show packet loss', () => {
    render(<BandwidthView />);
    expect(screen.getByText(`${MOCK_NETWORK_HEALTH.packet_loss_percent}%`)).toBeInTheDocument();
  });

  it('should render heatmap', () => {
    render(<BandwidthView />);
    expect(screen.getByText('Bandwidth Utilization Heatmap')).toBeInTheDocument();
  });

  it('should show bandwidth label', () => {
    render(<BandwidthView />);
    expect(screen.getByText('Total Utilization')).toBeInTheDocument();
  });
});
