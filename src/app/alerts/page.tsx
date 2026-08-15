'use client';

import React, { useState } from 'react';
import { MOCK_INCIDENTS } from '@/data/mock';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Incident } from '@/types';

const MOCK_ALERTS = [
  { id: 'ALT-001', source: 'Nagios', severity: 'P1' as const, message: 'MPLS circuit CIR-4421 down - LOS alarm', triggered: '2024-01-15T09:45:00Z', status: 'active' },
  { id: 'ALT-002', source: 'Zabbix', severity: 'P2' as const, message: 'High CPU on dist-swh-chi-01 (92%)', triggered: '2024-01-15T10:12:00Z', status: 'acknowledged' },
  { id: 'ALT-003', source: 'SolarWinds', severity: 'P3' as const, message: 'Memory threshold warning on fw-east-01', triggered: '2024-01-15T08:30:00Z', status: 'active' },
  { id: 'ALT-004', source: 'Prometheus', severity: 'P2' as const, message: 'Latency spike detected on West Coast links', triggered: '2024-01-15T07:15:00Z', status: 'active' },
  { id: 'ALT-005', source: 'Nagios', severity: 'P4' as const, message: 'DNS response time degraded on dns-primary', triggered: '2024-01-15T06:00:00Z', status: 'resolved' },
  { id: 'ALT-006', source: 'Prometheus', severity: 'P1' as const, message: 'BGP session down with AS65001', triggered: '2024-01-15T05:30:00Z', status: 'acknowledged' },
  { id: 'ALT-007', source: 'SolarWinds', severity: 'P3' as const, message: 'Temperature warning on acc-swh-dal-01', triggered: '2024-01-14T22:00:00Z', status: 'resolved' },
  { id: 'ALT-008', source: 'Zabbix', severity: 'P2' as const, message: 'SNMP poll timeout on olt-miami-01', triggered: '2024-01-14T20:30:00Z', status: 'active' },
];

type AlertStatus = 'active' | 'acknowledged' | 'resolved';

const severityColors: Record<string, string> = {
  P1: '#EF4444',
  P2: '#F97316',
  P3: '#F59E0B',
  P4: '#38BDF8',
};

export default function AlertsView() {
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedAlert, setSelectedAlert] = useState<any | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const filtered = MOCK_ALERTS.filter((a: any) => {
    if (severityFilter !== 'all' && a.severity !== severityFilter) return false;
    if (statusFilter !== 'all' && a.status !== statusFilter) return false;
    if (search && !a.message.toLowerCase().includes(search.toLowerCase()) && !a.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono">Alert Management</h1>
          <p className="text-sm text-slate-400 mt-1">{MOCK_ALERTS.filter((a: any) => a.status !== 'resolved').length} active alerts</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${isMuted ? 'bg-red-600 text-white' : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'}`}
          >
            {isMuted ? '🔇 Alerts Muted' : '🔔 Alerts Active'}
          </button>
          <button className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-white hover:bg-slate-700">Configure Rules</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-red-500">
          <div className="text-xs text-slate-500">P1 Active</div>
          <div className="text-3xl font-bold text-red-400 font-mono mt-1">{MOCK_ALERTS.filter((a: any) => a.severity === 'P1' && a.status !== 'resolved').length}</div>
        </Card>
        <Card className="p-4 border-l-4 border-l-orange-500">
          <div className="text-xs text-slate-500">P2 Active</div>
          <div className="text-3xl font-bold text-orange-400 font-mono mt-1">{MOCK_ALERTS.filter((a: any) => a.severity === 'P2' && a.status !== 'resolved').length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-slate-500">Acknowledged</div>
          <div className="text-3xl font-bold text-amber-400 font-mono mt-1">{MOCK_ALERTS.filter((a: any) => a.status === 'acknowledged').length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-slate-500">Resolved Today</div>
          <div className="text-3xl font-bold text-green-400 font-mono mt-1">{MOCK_ALERTS.filter((a: any) => a.status === 'resolved').length}</div>
        </Card>
      </div>

      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search alerts..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 bg-slate-900 border border-slate-700 rounded text-sm text-white placeholder-slate-500 w-64"
        />
        <select value={severityFilter} onChange={e => setSeverityFilter(e.target.value)} className="px-3 py-2 bg-slate-900 border border-slate-700 rounded text-sm text-white">
          <option value="all">All Severity</option>
          <option value="P1">P1 Critical</option>
          <option value="P2">P2 High</option>
          <option value="P3">P3 Medium</option>
          <option value="P4">P4 Low</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 bg-slate-900 border border-slate-700 rounded text-sm text-white">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="acknowledged">Acknowledged</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <Card>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-500 text-xs uppercase border-b border-slate-800">
              <th className="text-left py-3 px-4">Alert ID</th>
              <th className="text-left py-3 px-4">Severity</th>
              <th className="text-left py-3 px-4">Source</th>
              <th className="text-left py-3 px-4">Message</th>
              <th className="text-left py-3 px-4">Triggered</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((alert: any) => (
              <tr key={alert.id} className="border-b border-slate-800/50 hover:bg-slate-900/50 cursor-pointer" onClick={() => setSelectedAlert(alert)}>
                <td className="py-3 px-4 text-white font-mono text-xs">{alert.id}</td>
                <td className="py-3 px-4">
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-bold"
                    style={{ backgroundColor: `${severityColors[alert.severity]}20`, color: severityColors[alert.severity] }}
                  >
                    {alert.severity}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-400 text-xs">{alert.source}</td>
                <td className="py-3 px-4 text-white max-w-xs truncate">{alert.message}</td>
                <td className="py-3 px-4 text-slate-400 font-mono text-xs">{new Date(alert.triggered).toLocaleTimeString()}</td>
                <td className="py-3 px-4">
                  <Badge
                    status={alert.status === 'active' ? 'critical' : alert.status === 'acknowledged' ? 'degraded' : 'online'}
                    label={alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                  />
                </td>
                <td className="py-3 px-4 text-right">
                  <div className="flex gap-1 justify-end">
                    {alert.status !== 'resolved' && alert.status !== 'acknowledged' && (
                      <button
                        onClick={e => { e.stopPropagation(); setSelectedAlert(alert); }}
                        className="px-2 py-1 bg-amber-900/30 rounded text-xs text-amber-400 hover:bg-amber-900/50"
                      >
                        Ack
                      </button>
                    )}
                    <button
                      onClick={e => { e.stopPropagation(); setSelectedAlert(alert); }}
                      className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 hover:bg-slate-700"
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="py-12 text-center text-slate-500">No alerts match the current filters</div>}
      </Card>

      {selectedAlert && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setSelectedAlert(null)}>
          <div className="bg-slate-900 border border-slate-700 rounded-lg w-full max-w-lg m-4 p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-mono">{selectedAlert.id}</h3>
                <p className="text-sm text-slate-400 mt-1">{selectedAlert.message}</p>
              </div>
              <button onClick={() => setSelectedAlert(null)} className="text-slate-400 hover:text-white text-2xl">×</button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-xs text-slate-500">Severity</div>
                <span
                  className="inline-block mt-1 px-2 py-0.5 rounded-full text-sm font-bold"
                  style={{ backgroundColor: `${severityColors[selectedAlert.severity]}20`, color: severityColors[selectedAlert.severity] }}
                >
                  {selectedAlert.severity}
                </span>
              </div>
              <div>
                <div className="text-xs text-slate-500">Status</div>
                <div className="mt-1 capitalize text-white">{selectedAlert.status}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Source</div>
                <div className="mt-1 text-white font-mono">{selectedAlert.source}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Triggered</div>
                <div className="mt-1 text-white font-mono">{new Date(selectedAlert.triggered).toLocaleString()}</div>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-xs text-slate-500 mb-2">Recommended Action</div>
              <div className="p-3 bg-slate-800 rounded text-sm text-white">
                {selectedAlert.severity === 'P1' && 'Immediately investigate the affected circuit. Check BGP sessions and verify redundant path status.'}
                {selectedAlert.severity === 'P2' && 'Review device metrics and check for recent changes. Monitor for further degradation.'}
                {selectedAlert.severity === 'P3' && 'Investigate during current shift. Check device logs and configuration.'}
                {selectedAlert.severity === 'P4' && 'Monitor and investigate during business hours.'}
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setSelectedAlert(null)}>Close</Button>
              {selectedAlert.status !== 'acknowledged' && (
                <Button variant="outline" className="border-amber-600 text-amber-400 hover:bg-amber-900/20" onClick={() => setSelectedAlert(null)}>Acknowledge</Button>
              )}
              {selectedAlert.status === 'acknowledged' && (
                <Button variant="outline" className="border-green-600 text-green-400 hover:bg-green-900/20" onClick={() => setSelectedAlert(null)}>Resolve</Button>
              )}
            </div>
          </div>
        </div>
      )}

      <Card>
        <h3 className="text-sm font-bold text-slate-300 mb-4">Alert Rules Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-800/50 rounded border border-slate-700">
            <div className="text-sm text-white font-medium mb-2">Notification Channels</div>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500" /> Email: noc-team@netwatch.example.com</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500" /> SMS: +1-800-NOC-WATCH</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500" /> PagerDuty: NetWatch NOC</div>
            </div>
          </div>
          <div className="p-4 bg-slate-800/50 rounded border border-slate-700">
            <div className="text-sm text-white font-medium mb-2">Suppression Rules</div>
            <div className="text-xs text-slate-400 space-y-1">
              <div>Maintenance window: ACC-SWH-DAL-01 (until 18:00)</div>
              <div>Snoozed: P4 alerts for 2 hours</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
