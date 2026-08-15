'use client';

import React, { useState, useCallback } from 'react';
import { MOCK_DEVICES } from '@/data/mock';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { DataTable } from '@/components/ui/data-table';
import { useToast } from '@/components/ui/toast';
import type { Device } from '@/types';

export function DeviceHealthView() {
  const [deviceTypeFilter] = useState<string>('all');
  const [regionFilter] = useState<string>('all');
  const [statusFilter] = useState<string>('all');
  const { addToast } = useToast();

  const filteredDevices = MOCK_DEVICES.filter((d) => {
    if (deviceTypeFilter !== 'all' && d.device_type !== deviceTypeFilter) return false;
    if (regionFilter !== 'all' && d.region !== regionFilter) return false;
    if (statusFilter !== 'all' && d.status !== statusFilter) return false;
    return true;
  });

  const handleRowClick = useCallback(
    (row: Device) => {
      addToast({
        type: 'info',
        title: `Device: ${row.hostname}`,
        message: `IP: ${row.ip_address} | Status: ${row.status} | Uptime: ${row.uptime_hours.toLocaleString()}h`,
      });
    },
    [addToast],
  );

  const columns = [
    {
      key: 'hostname',
      label: 'Hostname',
      render: (row: Device) => (
        <span className="font-mono text-brand-cyan">{row.hostname}</span>
      ),
    },
    {
      key: 'ip_address',
      label: 'IP Address',
      render: (row: Device) => (
        <span className="font-mono text-base-muted">{row.ip_address}</span>
      ),
    },
    {
      key: 'device_type',
      label: 'Type',
      render: (row: Device) => (
        <span className="text-body-sm">{row.device_type.replace(/_/g, '-')}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row: Device) => <Badge status={row.status} />,
    },
    {
      key: 'region',
      label: 'Region',
      render: (row: Device) => (
        <span className="text-body-sm capitalize">{row.region.replace('_', ' ')}</span>
      ),
    },
    {
      key: 'cpu',
      label: 'CPU %',
      render: (row: Device) => (
        <span
          className={
            row.cpu_utilization > 85
              ? 'text-status-critical'
              : row.cpu_utilization > 70
                ? 'text-status-degraded'
                : 'text-white'
          }
        >
          {row.cpu_utilization}%
        </span>
      ),
    },
    {
      key: 'uptime',
      label: 'Uptime',
      render: (row: Device) => (
        <span className="font-mono text-body-sm">{row.uptime_hours.toLocaleString()}h</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Infrastructure"
        title="Device Health"
        subtitle={`Showing ${filteredDevices.length} of ${MOCK_DEVICES.length} devices`}
      />

      <Card>
        <DataTable<Device>
          columns={columns}
          data={filteredDevices}
          onRowClick={handleRowClick}
          emptyMessage="No devices match the current filters."
        />
      </Card>
    </div>
  );
}
