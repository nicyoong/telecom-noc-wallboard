import React from 'react';
import { MOCK_DEVICES } from '@/data/mock';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { SkeletonCard } from '@/components/ui/skeleton';

export function MobileDashboard() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const onlineCount = MOCK_DEVICES.filter((d) => d.status === 'online').length;
  const criticalCount = MOCK_DEVICES.filter((d) => d.status === 'critical').length;
  const degradedCount = MOCK_DEVICES.filter((d) => d.status === 'degraded').length;

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4 pb-24">
      <div className="text-center py-4">
        <h1 className="text-display-sm font-bold text-white">NetWatch NOC</h1>
        <p className="text-body-sm text-base-muted">Mobile Dashboard</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Card className="text-center">
          <p className="text-label text-base-muted mb-1">Health Score</p>
          <p className="metric-value text-status-online">87%</p>
        </Card>
        <Card className="text-center">
          <p className="text-label text-base-muted mb-1">Active Incidents</p>
          <p className="metric-value text-status-critical">{criticalCount + degradedCount}</p>
        </Card>
        <Card className="text-center">
          <p className="text-label text-base-muted mb-1">Online Devices</p>
          <p className="metric-value text-status-online">{onlineCount}/{MOCK_DEVICES.length}</p>
        </Card>
        <Card className="text-center">
          <p className="text-label text-base-muted mb-1">Latency</p>
          <p className="metric-value text-white">12.4<span className="text-body-sm text-base-muted font-sans"> ms</span></p>
        </Card>
      </div>

      <SectionHeading eyebrow="Quick Status" title="Device Overview" />

      <Card>
        <div className="space-y-3">
          {MOCK_DEVICES.slice(0, 5).map((device) => (
            <div key={device.id} className="flex items-center justify-between py-2 border-b border-base-border/50 last:border-0">
              <div>
                <p className="font-mono text-body-md text-white">{device.hostname}</p>
                <p className="text-body-sm text-base-muted">{device.region.replace('_', ' ')}</p>
              </div>
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  device.status === 'online'
                    ? 'bg-status-online'
                    : device.status === 'critical'
                      ? 'bg-status-critical animate-pulse'
                      : device.status === 'degraded'
                        ? 'bg-status-degraded'
                        : device.status === 'maintenance'
                          ? 'bg-status-maintenance'
                          : 'bg-status-offline'
                }`}
              />
            </div>
          ))}
        </div>
      </Card>

      {criticalCount > 0 && (
        <Card className="border-status-critical/50">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-status-critical animate-pulse shrink-0" />
            <div>
              <p className="text-body-md font-semibold text-status-critical">
                Critical: {MOCK_DEVICES.find((d) => d.status === 'critical')?.hostname}
              </p>
              <p className="text-body-sm text-base-muted">Unresponsive — dispatching field crew</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
