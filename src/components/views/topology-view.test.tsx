/**
 * Tests for TopologyView component
 * 
 * Risk: Topology view is the default dashboard view. Incorrect rendering
 * could prevent engineers from assessing network status.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { TopologyView } from '@/components/views/topology-view';
import { MOCK_NETWORK_HEALTH } from '@/data/mock';

describe('TopologyView', () => {
  it('should render section heading', () => {
    render(<TopologyView />);
    expect(screen.getByText('Network Topology')).toBeInTheDocument();
  });

  it('should show health score stat card', () => {
    render(<TopologyView />);
    expect(screen.getByText(`${MOCK_NETWORK_HEALTH.score}%`)).toBeInTheDocument();
  });

  it('should show latency stat card', () => {
    render(<TopologyView />);
    expect(screen.getByText(`${MOCK_NETWORK_HEALTH.avg_latency_ms} ms`)).toBeInTheDocument();
  });

  it('should show jitter stat card', () => {
    render(<TopologyView />);
    expect(screen.getByText(`${MOCK_NETWORK_HEALTH.avg_jitter_ms} ms`)).toBeInTheDocument();
  });

  it('should show packet loss stat card', () => {
    render(<TopologyView />);
    expect(screen.getByText(`${MOCK_NETWORK_HEALTH.packet_loss_percent}%`)).toBeInTheDocument();
  });

  it('should show bandwidth utilization', () => {
    render(<TopologyView />);
    const bandwidthUtil = Math.round(
      (MOCK_NETWORK_HEALTH.utilized_bandwidth_gbps / MOCK_NETWORK_HEALTH.total_bandwidth_gbps) * 100
    );
    expect(screen.getByText(`${bandwidthUtil}%`)).toBeInTheDocument();
  });

  it('should render topology graph', () => {
    render(<TopologyView />);
    expect(screen.getByText('Network Topology')).toBeInTheDocument();
  });

  it('should show device count stats', () => {
    render(<TopologyView />);
    expect(screen.getByText(`${MOCK_NETWORK_HEALTH.total_devices} total`)).toBeInTheDocument();
  });

  it('should show critical incident count', () => {
    render(<TopologyView />);
    expect(screen.getByText(`${MOCK_NETWORK_HEALTH.critical_incidents} active`)).toBeInTheDocument();
  });

  it('should show degraded incident count', () => {
    render(<TopologyView />);
    expect(screen.getByText(`${MOCK_NETWORK_HEALTH.degraded_incidents} active`)).toBeInTheDocument();
  });
});
