/**
 * Tests for HealthBar component
 * 
 * Risk: Health bar shows overall network health and active incidents.
 * Incorrect calculation could mask network-wide issues.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { HealthBar } from '@/components/layout/health-bar';
import type { NetworkHealth, Incident } from '@/types';

const MOCK_HEALTH: NetworkHealth = {
  score: 87,
  total_devices: 150,
  online_devices: 142,
  critical_incidents: 3,
  degraded_incidents: 5,
  avg_latency_ms: 12.4,
  avg_jitter_ms: 2.1,
  packet_loss_percent: 0.02,
  total_bandwidth_gbps: 100,
  utilized_bandwidth_gbps: 65,
  last_updated: '2024-01-15T10:30:00Z',
};

const MOCK_INCIDENTS: Incident[] = [
  {
    id: 'INC-001',
    severity: 'P1',
    title: 'MPLS Circuit Down',
    description: 'Primary MPLS circuit to Chicago hub is down',
    region: 'midwest',
    status: 'investigating',
    created_at: '2024-01-15T10:00:00Z',
    affected_services: ['MPLS', 'VoIP'],
    timeline: [],
  },
  {
    id: 'INC-002',
    severity: 'P2',
    title: 'High Latency',
    description: 'Elevated latency on West Coast links',
    region: 'west_coast',
    status: 'active',
    created_at: '2024-01-15T09:30:00Z',
    affected_services: ['Internet'],
    timeline: [],
  },
];

describe('HealthBar', () => {
  it('should render health score', () => {
    render(<HealthBar health={MOCK_HEALTH} incidents={MOCK_INCIDENTS} />);
    expect(screen.getByText('87%')).toBeInTheDocument();
  });

  it('should show active incident count', () => {
    render(<HealthBar health={MOCK_HEALTH} incidents={MOCK_INCIDENTS} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should show P1 count when critical incidents exist', () => {
    render(<HealthBar health={MOCK_HEALTH} incidents={MOCK_INCIDENTS} />);
    expect(screen.getByText('1 P1')).toBeInTheDocument();
  });

  it('should show health score bar', () => {
    const { container } = render(<HealthBar health={MOCK_HEALTH} incidents={MOCK_INCIDENTS} />);
    const progressBar = container.querySelector('[style*="width: 87%"]');
    expect(progressBar).toBeInTheDocument();
  });

  it('should show last sync time', () => {
    render(<HealthBar health={MOCK_HEALTH} incidents={MOCK_INCIDENTS} />);
    expect(screen.getByText(/Last sync:/)).toBeInTheDocument();
  });

  it('should show all systems nominal status', () => {
    render(<HealthBar health={MOCK_HEALTH} incidents={MOCK_INCIDENTS} />);
    expect(screen.getByText('All systems nominal')).toBeInTheDocument();
  });

  it('should handle empty incidents', () => {
    render(<HealthBar health={MOCK_HEALTH} incidents={[]} />);
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.queryByText(/P1/)).not.toBeInTheDocument();
  });

  it('should handle multiple P1 incidents', () => {
    const incidentsWithMultipleP1: Incident[] = [
      MOCK_INCIDENTS[0],
      { ...MOCK_INCIDENTS[1], severity: 'P1' },
    ];
    render(<HealthBar health={MOCK_HEALTH} incidents={incidentsWithMultipleP1} />);
    expect(screen.getByText('2 P1')).toBeInTheDocument();
  });
});
