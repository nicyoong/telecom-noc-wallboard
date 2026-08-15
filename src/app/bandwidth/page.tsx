'use client';

import React, { useState, useMemo } from 'react';
import { MOCK_DEVICES, MOCK_BANDWIDTH, MOCK_INCIDENTS } from '@/data/mock';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { BandwidthMetric, Device } from '@/types';

export default function BandwidthView() {
  const [timeRange, setTimeRange] = useState('24h');
  const [congestionOnly, setCongestionOnly] = useState(false);

  const congestedLinks = useMemo(() =>
    MOCK_BANDWIDTH.filter(m => m.utilization > 80),
    []
  );

  const totalUtil = useMemo(() =>
    Math.round(MOCK_BANDWIDTH.reduce((s, m) => s + m.utilization, 0) / MOCK_BANDWIDTH.length),
    []
  );

  const protocolBreakdown = [
    { name: 'HTTPS', percent: 42, color: '#38BDF8' },
    { name: 'HTTP', percent: 18, color: '#22D3EE' },
    { name: 'DNS', percent: 8, color: '#A78BFA' },
    { name: 'VoIP', percent: 15, color: '#34D399' },
    { name: 'Video', percent: 12, color: '#F59E0B' },
    { name: 'Other', percent: 5, color: '#94A3B8' },
  ];

  const regionData = [
    { region: 'Northeast', utilization: 72, capacity: 40 },
    { region: 'West Coast', utilization: 85, capacity: 40 },
    { region: 'Midwest', utilization: 45, capacity: 30 },
    { region: 'Southeast', utilization: 63, capacity: 25 },
    { region: 'Southwest', utilization: 38, capacity: 20 },
  ];

  const topTalkers = [
    { source: '10.0.1.1', destination: '10.0.2.1', protocol: 'HTTPS', bandwidth: '850 Mbps', duration: '2h 15m' },
    { source: '10.0.1.2', destination: '10.0.3.5', protocol: 'VoIP', bandwidth: '420 Mbps', duration: '1h 42m' },
    { source: '10.0.2.1', destination: '10.0.4.8', protocol: 'HTTP', bandwidth: '380 Mbps', duration: '45m' },
    { source: '10.0.3.3', destination: '10.0.5.2', protocol: 'Video', bandwidth: '290 Mbps', duration: '3h 10m' },
    { source: '10.0.4.1', destination: '10.0.6.1', protocol: 'DNS', bandwidth: '150 Mbps', duration: '5m' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono">Bandwidth Monitor</h1>
          <p className="text-sm text-slate-400 mt-1">Real-time bandwidth utilization across all regions</p>
        </div>
        <div className="flex gap-2">
          <select value={timeRange} onChange={e => setTimeRange(e.target.value)} className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-sm text-white">
            <option value="1h">Last 1 Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
          <button className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-white hover:bg-slate-700">Export Report</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-xs text-slate-500">Total Utilization</div>
          <div className="text-3xl font-bold text-white font-mono mt-1">{totalUtil}%</div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${totalUtil}%` }} />
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-slate-500">Available Capacity</div>
          <div className="text-3xl font-bold text-green-400 font-mono mt-1">127 Gbps</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-slate-500">Avg Latency</div>
          <div className="text-3xl font-bold text-white font-mono mt-1">12.4 ms</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-slate-500">Packet Loss</div>
          <div className="text-3xl font-bold text-white font-mono mt-1">0.02%</div>
        </Card>
      </div>

      {congestionOnly && congestedLinks.length > 0 && (
        <Card className="border-amber-500/30">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <h3 className="text-sm font-bold text-amber-400">Congestion Alerts ({'>'}80% utilization)</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {congestedLinks.map((link, i) => (
              <div key={i} className="p-3 bg-slate-900/50 rounded border border-amber-900/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white font-mono">{link.interface}</span>
                  <span className="text-xs text-amber-400 font-bold">{link.utilization}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${link.utilization}%` }} />
                </div>
                <div className="text-xs text-slate-500 mt-1">{link.region.replace(/_/g, ' ')} · Peak: {link.peak_utilization}%</div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-bold text-slate-300 mb-4">Traffic by Protocol</h3>
          <div className="space-y-3">
            {protocolBreakdown.map(p => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                <span className="text-sm text-slate-300 w-16">{p.name}</span>
                <div className="flex-1 bg-slate-800 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: `${p.percent}%`, backgroundColor: p.color }} />
                </div>
                <span className="text-sm text-white font-mono w-12 text-right">{p.percent}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-sm font-bold text-slate-300 mb-4">Region Comparison</h3>
          <div className="space-y-3">
            {regionData.map(r => (
              <div key={r.region} className="flex items-center gap-3">
                <span className="text-sm text-slate-300 w-20">{r.region}</span>
                <div className="flex-1 bg-slate-800 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${r.utilization > 80 ? 'bg-red-500' : r.utilization > 60 ? 'bg-amber-500' : 'bg-green-500'}`}
                    style={{ width: `${(r.utilization / r.capacity) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-white font-mono w-16 text-right">{r.utilization}G/{r.capacity}G</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-300">Top Talkers</h3>
          <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer">
            <input type="checkbox" checked={congestionOnly} onChange={e => setCongestionOnly(e.target.checked)} className="rounded bg-slate-800 border-slate-700" />
            Show congestion only
          </label>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-500 text-xs uppercase border-b border-slate-800">
              <th className="text-left py-2 px-3">Source</th>
              <th className="text-left py-2 px-3">Destination</th>
              <th className="text-left py-2 px-3">Protocol</th>
              <th className="text-right py-2 px-3">Bandwidth</th>
              <th className="text-right py-2 px-3">Duration</th>
            </tr>
          </thead>
          <tbody>
            {topTalkers.map((t, i) => (
              <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-900/50">
                <td className="py-2 px-3 text-white font-mono">{t.source}</td>
                <td className="py-2 px-3 text-white font-mono">{t.destination}</td>
                <td className="py-2 px-3 text-slate-300">{t.protocol}</td>
                <td className="py-2 px-3 text-right text-white font-mono">{t.bandwidth}</td>
                <td className="py-2 px-3 text-right text-slate-400 font-mono">{t.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card>
        <h3 className="text-sm font-bold text-slate-300 mb-4">Interface Utilization</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-500 text-xs uppercase border-b border-slate-800">
              <th className="text-left py-2 px-3">Interface</th>
              <th className="text-left py-2 px-3">Device</th>
              <th className="text-right py-2 px-3">In Traffic</th>
              <th className="text-right py-2 px-3">Out Traffic</th>
              <th className="text-right py-2 px-3">Utilization</th>
              <th className="text-left py-2 px-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_BANDWIDTH.map((m, i) => (
              <tr key={i} className="border-b border-slate-800/50">
                <td className="py-2 px-3 text-white font-mono">{m.interface}</td>
                <td className="py-2 px-3 text-slate-300 text-xs">{MOCK_DEVICES[i % MOCK_DEVICES.length]?.hostname}</td>
                <td className="py-2 px-3 text-right text-white font-mono">{(m.utilization * 1.2).toFixed(1)} Gbps</td>
                <td className="py-2 px-3 text-right text-white font-mono">{(m.utilization * 0.9).toFixed(1)} Gbps</td>
                <td className="py-2 px-3 text-right">
                  <span className={`font-mono ${m.utilization > 80 ? 'text-red-400' : m.utilization > 60 ? 'text-amber-400' : 'text-white'}`}>
                    {m.utilization}%
                  </span>
                </td>
                <td className="py-2 px-3"><Badge status={m.utilization > 80 ? 'critical' : m.utilization > 60 ? 'degraded' : 'online'} label={m.utilization > 80 ? 'Critical' : m.utilization > 60 ? 'Warning' : 'Normal'} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
