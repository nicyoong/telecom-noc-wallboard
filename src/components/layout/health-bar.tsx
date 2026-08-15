import React from 'react';
import type { NetworkHealth, Incident } from '@/types';

interface HealthBarProps {
  health: NetworkHealth;
  incidents: Incident[];
}

export function HealthBar({ health, incidents }: HealthBarProps) {
  const criticalCount = incidents.filter((i) => i.severity === 'P1').length;
  const now = new Date();

  return (
    <div className="bg-base-surface-light border-b border-base-border px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <span className="text-label text-base-muted uppercase">Network Health</span>
          <div className="flex items-center gap-2">
            <div className="w-32 h-2 bg-base-border rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  health.score >= 90 ? 'bg-status-optimal' : health.score >= 70 ? 'bg-status-degraded' : 'bg-status-critical'
                }`}
                style={{ width: `${health.score}%` }}
              />
            </div>
            <span className={`font-mono text-display-sm font-bold ${
              health.score >= 90 ? 'text-status-optimal' : health.score >= 70 ? 'text-status-degraded' : 'text-status-critical'
            }`}>
              {health.score}%
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <span className="text-label text-base-muted uppercase">Active Incidents</span>
          <span className={`font-mono text-display-sm font-bold ${criticalCount > 0 ? 'text-status-critical' : 'text-status-optimal'}`}>
            {incidents.filter((i) => i.status !== 'resolved').length}
          </span>
          {criticalCount > 0 && (
            <span className="flex items-center gap-1 text-body-sm text-status-critical">
              <span className="w-2 h-2 rounded-full bg-status-critical animate-pulse" />
              {criticalCount} P1
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 text-body-sm font-mono text-base-muted">
        <span className="hidden sm:inline">Last sync: {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-status-optimal animate-pulse" />
          All systems nominal
        </span>
      </div>
    </div>
  );
}
