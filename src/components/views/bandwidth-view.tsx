'use client';

import React from 'react';
import { Heatmap } from '@/components/features/heatmap';
import { StatCard } from '@/components/ui/stat-card';
import { SectionHeading } from '@/components/ui/section-heading';
import { MOCK_NETWORK_HEALTH } from '@/data/mock';

export function BandwidthView() {
  const health = MOCK_NETWORK_HEALTH;
  const utilization = Math.round((health.utilized_bandwidth_gbps / health.total_bandwidth_gbps) * 100);

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Traffic"
        title="Bandwidth Monitor"
        subtitle="Interface-level bandwidth utilization across all regions"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          metric="bandwidth"
          value={utilization}
          unit="%"
          label="Total Utilization"
          subtitle={`${health.utilized_bandwidth_gbps} / ${health.total_bandwidth_gbps} Gbps`}
          status={utilization > 80 ? 'critical' : utilization > 60 ? 'warning' : 'healthy'}
        />
        <StatCard
          metric="bandwidth"
          value={health.total_bandwidth_gbps - health.utilized_bandwidth_gbps}
          unit="Gbps"
          label="Available Capacity"
          status="healthy"
        />
        <StatCard
          metric="bandwidth"
          value={health.avg_latency_ms}
          unit="ms"
          label="Avg Latency"
          trend="stable"
          status="healthy"
        />
        <StatCard
          metric="bandwidth"
          value={health.packet_loss_percent}
          unit="%"
          label="Packet Loss"
          status={health.packet_loss_percent > 0.1 ? 'critical' : health.packet_loss_percent > 0.01 ? 'warning' : 'healthy'}
        />
      </div>

      <Heatmap />
    </div>
  );
}
