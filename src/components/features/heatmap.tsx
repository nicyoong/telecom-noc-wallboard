import React from 'react';
import { MOCK_BANDWIDTH } from '@/data/mock';
import type { BandwidthMetric } from '@/types';

interface HeatmapProps {
  data?: BandwidthMetric[];
  className?: string;
}

function getCellColor(utilization: number): string {
  if (utilization >= 90) return '#EF4444';
  if (utilization >= 75) return '#F59E0B';
  if (utilization >= 50) return '#38BDF8';
  return '#22D3EE';
}

function getCellOpacity(utilization: number): number {
  return 0.3 + (utilization / 100) * 0.7;
}

export function Heatmap({ data = MOCK_BANDWIDTH }: HeatmapProps) {
  const regions = [...new Set(data.map((d) => d.region))] as const;
  const interfaces = [...new Set(data.map((d) => d.interface))];

  return (
    <div className="noc-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-body-md font-semibold text-white">Bandwidth Utilization Heatmap</h3>
        <span className="text-body-xs font-mono text-base-muted">Last 24h snapshot</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-body-xs font-mono">
          <thead>
            <tr>
              <th className="px-2 py-2 text-left text-base-muted font-medium w-32">Interface</th>
              {regions.map((region) => (
                <th key={region} className="px-2 py-2 text-center text-base-muted font-medium">
                  {region.replace('_', ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {interfaces.map((iface) => (
              <tr key={iface} className="border-t border-base-border/50">
                <td className="px-2 py-2 text-white font-medium">{iface}</td>
                {regions.map((region) => {
                  const metric = data.find((d) => d.interface === iface && d.region === region);
                  if (!metric) {
                    return (
                      <td key={region} className="px-2 py-2 text-center">
                        <div className="w-full h-8 bg-base-surface-light rounded" />
                      </td>
                    );
                  }
                  return (
                    <td key={region} className="px-2 py-2 text-center">
                      <div className="flex flex-col gap-0.5">
                        <div
                          className="h-6 rounded transition-all"
                          style={{
                            width: `${Math.max(metric.utilization, 8)}%`,
                            backgroundColor: getCellColor(metric.utilization),
                            opacity: getCellOpacity(metric.utilization),
                          }}
                          title={`${iface} ${region}: ${metric.utilization}%`}
                        />
                        <span
                          className="text-center"
                          style={{ color: getCellColor(metric.utilization) }}
                        >
                          {metric.utilization}%
                        </span>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-end gap-2 mt-3 text-body-xs font-mono text-base-muted">
        <span>Low</span>
        <div className="flex gap-0.5">
          {['#22D3EE', '#38BDF8', '#F59E0B', '#EF4444'].map((c, i) => (
            <div key={i} className="w-4 h-3 rounded-sm" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span>High</span>
      </div>
    </div>
  );
}
