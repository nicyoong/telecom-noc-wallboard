import React from 'react';
import { DEVICE_STATUS_LABELS } from '@/constants';
import type { DeviceStatus } from '@/types';

interface BadgeProps {
  status: DeviceStatus;
  label?: string;
  className?: string;
}

export function Badge({ status, label, className = '' }: BadgeProps) {
  const text = label || DEVICE_STATUS_LABELS[status];
  const colorMap: Record<DeviceStatus, string> = {
    online: 'bg-status-online/15 text-status-online border-status-online/30',
    degraded: 'bg-status-degraded/15 text-status-degraded border-status-degraded/30',
    critical: 'bg-status-critical/15 text-status-critical border-status-critical/30 pulse-critical',
    offline: 'bg-base-border/30 text-base-muted border-base-border/50',
    maintenance: 'bg-status-maintenance/15 text-status-maintenance border-status-maintenance/30',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 text-body-sm font-mono font-medium border rounded-full ${colorMap[status]} ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === 'critical' ? 'bg-status-critical animate-pulse' : 'bg-current'
        }`}
      />
      {text}
    </span>
  );
}
