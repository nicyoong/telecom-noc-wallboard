import React from 'react';
import { NetworkTopologyGraph } from '@/components/features/network-topology-graph';
import { SectionHeading } from '@/components/ui/section-heading';
import { StatCard } from '@/components/ui/stat-card';
import { MOCK_NETWORK_HEALTH } from '@/data/mock';

export function TopologyView() {
  const health = MOCK_NETWORK_HEALTH;
  const bandwidthUtil = Math.round(
    (health.utilized_bandwidth_gbps / health.total_bandwidth_gbps) * 100,
  );

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Overview"
        title="Network Topology"
        subtitle="Real-time topology map with device health status"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <StatCard
          value={health.score}
          unit="%"
          label="Network Health Score"
          status={health.score >= 90 ? 'healthy' : health.score >= 70 ? 'warning' : 'critical'}
        />
        <StatCard
          value={health.avg_latency_ms}
          unit="ms"
          label="Avg Latency"
          trend="down"
          trendValue="0.3ms"
          status="healthy"
        />
        <StatCard
          value={health.avg_jitter_ms}
          unit="ms"
          label="Avg Jitter"
          status="healthy"
        />
        <StatCard
          value={health.packet_loss_percent}
          unit="%"
          label="Packet Loss"
          status={
            health.packet_loss_percent > 0.1
              ? 'critical'
              : health.packet_loss_percent > 0.01
                ? 'warning'
                : 'healthy'
          }
        />
        <StatCard
          value={bandwidthUtil}
          unit="%"
          label="Bandwidth Util."
          subtitle={`${health.utilized_bandwidth_gbps} / ${health.total_bandwidth_gbps} Gbps`}
          trend="up"
          trendValue="+2.1%"
          status="healthy"
        />
      </div>

      <NetworkTopologyGraph />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          value={health.total_devices}
          unit="total"
          label="Total Devices"
          subtitle={`${health.online_devices} online`}
          status="healthy"
        />
        <StatCard
          value={health.critical_incidents}
          unit="active"
          label="Critical Incidents"
          status="critical"
        />
        <StatCard
          value={health.degraded_incidents}
          unit="active"
          label="Degraded Incidents"
          status="warning"
        />
      </div>
    </div>
  );
}
