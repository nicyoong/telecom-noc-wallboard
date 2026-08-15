import React from 'react';
import type { KpiMetric } from '@/types';

interface StatCardProps {
  value: string | number;
  unit?: string;
  label: string;
  subtitle?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  status?: 'healthy' | 'warning' | 'critical';
  className?: string;
  metric?: KpiMetric;
}

const STATUS_COLORS: Record<string, string> = {
  healthy: 'text-status-online',
  warning: 'text-status-degraded',
  critical: 'text-status-critical',
};

const STATUS_GLOW: Record<string, string> = {
  healthy: 'glow-cyan',
  warning: 'glow-amber',
  critical: 'glow-red',
};

export function StatCard({
  value,
  unit,
  label,
  subtitle,
  trend,
  trendValue,
  status = 'healthy',
  className = '',
}: StatCardProps) {
  const colorClass = STATUS_COLORS[status];
  const glowClass = STATUS_GLOW[status];

  return (
    <div className={`noc-card ${glowClass} ${className}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1 flex-1 min-w-0">
          <p className="text-label text-base-muted uppercase tracking-wider">{label}</p>
          <div className="flex items-baseline gap-1">
            <span className={`metric-value ${colorClass}`}>{value}</span>
            {unit && <span className="text-body-sm text-base-muted font-mono">{unit}</span>}
          </div>
          {subtitle && <p className="text-body-sm text-base-muted">{subtitle}</p>}
        </div>
        {trend && (
          <div className="shrink-0 ml-4">
            <span
              className={`text-body-sm ${
                trend === 'up'
                  ? 'text-status-degraded'
                  : trend === 'down'
                    ? 'text-status-online'
                    : 'text-base-muted'
              }`}
            >
              {trend === 'up' && '↑'}
              {trend === 'down' && '↓'}
              {trend === 'stable' && '→'}
              {trendValue && ` ${trendValue}`}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
