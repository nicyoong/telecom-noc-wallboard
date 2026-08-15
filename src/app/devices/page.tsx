'use client';

import React, { useState } from 'react';
import { MOCK_DEVICES, MOCK_INCIDENTS } from '@/data/mock';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import type { Device, DeviceStatus } from '@/types';

type SortField = 'status' | 'uptime' | 'cpu' | 'memory' | 'last_check';
type SortDir = 'asc' | 'desc';

export default function DevicesView() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('status');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const filtered = React.useMemo(() => {
    const result = MOCK_DEVICES.filter(d => {
      if (statusFilter !== 'all' && d.status !== statusFilter) return false;
      if (typeFilter !== 'all' && d.device_type !== typeFilter) return false;
      if (regionFilter !== 'all' && d.region !== regionFilter) return false;
      if (debouncedSearch && !d.hostname.toLowerCase().includes(debouncedSearch.toLowerCase()) && !d.ip_address.includes(debouncedSearch)) return false;
      return true;
    });

    result.sort((a, b) => {
      let aVal: number | string = 0;
      let bVal: number | string = 0;
      switch (sortField) {
        case 'status': aVal = ['online', 'degraded', 'critical', 'offline', 'maintenance'].indexOf(a.status); bVal = ['online', 'degraded', 'critical', 'offline', 'maintenance'].indexOf(b.status); break;
        case 'uptime': aVal = a.uptime_hours; bVal = b.uptime_hours; break;
        case 'cpu': aVal = a.cpu_utilization; bVal = b.cpu_utilization; break;
        case 'memory': aVal = a.memory_utilization; bVal = b.memory_utilization; break;
        case 'last_check': aVal = new Date(a.last_seen).getTime(); bVal = new Date(b.last_seen).getTime(); break;
      }
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [debouncedSearch, statusFilter, typeFilter, regionFilter, sortField, sortDir]);

  const statusCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    MOCK_DEVICES.forEach(d => { counts[d.status] = (counts[d.status] || 0) + 1; });
    return counts;
  }, []);

  const topCpu = React.useMemo(() => [...MOCK_DEVICES].sort((a, b) => b.cpu_utilization - a.cpu_utilization).slice(0, 5), []);
  const topMemory = React.useMemo(() => [...MOCK_DEVICES].sort((a, b) => b.memory_utilization - a.memory_utilization).slice(0, 5), []);
  const offlineDevices = React.useMemo(() => MOCK_DEVICES.filter(d => d.status === 'offline' || d.status === 'critical'), []);

  const handleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono">Device Health</h1>
          <p className="text-sm text-slate-400 mt-1">{MOCK_DEVICES.length} devices monitored across {new Set(MOCK_DEVICES.map(d => d.region)).size} regions</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-white hover:bg-slate-700">Export</button>
          <button className="px-3 py-1.5 bg-blue-600 rounded text-sm text-white hover:bg-blue-500">+ Add Device</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <Card key={status} className="p-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: status === 'online' ? '#22D3EE' : status === 'critical' ? '#EF4444' : status === 'degraded' ? '#F59E0B' : status === 'offline' ? '#94A3B8' : '#A78BFA' }} />
              <span className="text-sm text-slate-400 capitalize">{status}</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono mt-1">{count}</div>
          </Card>
        ))}
      </div>

      {offlineDevices.length > 0 && (
        <Card className="border-red-500/30">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h3 className="text-sm font-bold text-red-400">Offline / Critical Devices</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {offlineDevices.map(d => (
              <div key={d.id} className="flex items-center gap-3 p-2 bg-slate-900/50 rounded border border-slate-800">
                <span className={`w-2 h-2 rounded-full ${d.status === 'critical' ? 'bg-red-500 animate-pulse' : 'bg-slate-500'}`} />
                <div>
                  <div className="text-sm text-white font-mono">{d.hostname}</div>
                  <div className="text-xs text-slate-500">{d.ip_address} · {d.region.replace(/_/g, ' ')}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by name or IP..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 bg-slate-900 border border-slate-700 rounded text-sm text-white placeholder-slate-500 w-64"
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2 bg-slate-900 border border-slate-700 rounded text-sm text-white">
          <option value="all">All Status</option>
          <option value="online">Online</option>
          <option value="degraded">Degraded</option>
          <option value="critical">Critical</option>
          <option value="offline">Offline</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2 bg-slate-900 border border-slate-700 rounded text-sm text-white">
          <option value="all">All Types</option>
          {Array.from(new Set(MOCK_DEVICES.map(d => d.device_type))).map(t => (
            <option key={t} value={t}>{t.replace(/_/g, ' ')}</option>
          ))}
        </select>
        <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)} className="px-3 py-2 bg-slate-900 border border-slate-700 rounded text-sm text-white">
          <option value="all">All Regions</option>
          {Array.from(new Set(MOCK_DEVICES.map(d => d.region))).map(r => (
            <option key={r} value={r}>{r.replace(/_/g, ' ')}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase">
                  <th className="text-left py-3 px-4">Device</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-right py-3 px-4 cursor-pointer" onClick={() => handleSort('cpu')}>CPU {sortField === 'cpu' ? (sortDir === 'asc' ? '↑' : '↓') : ''}</th>
                  <th className="text-right py-3 px-4 cursor-pointer" onClick={() => handleSort('memory')}>Mem {sortField === 'memory' ? (sortDir === 'asc' ? '↑' : '↓') : ''}</th>
                  <th className="text-right py-3 px-4 cursor-pointer" onClick={() => handleSort('uptime')}>Uptime {sortField === 'uptime' ? (sortDir === 'asc' ? '↑' : '↓') : ''}</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(d => (
                  <tr key={d.id} className="border-b border-slate-800/50 hover:bg-slate-900/50 cursor-pointer" onClick={() => setSelectedDevice(d)}>
                    <td className="py-3 px-4">
                      <div className="text-white font-mono font-medium">{d.hostname}</div>
                      <div className="text-slate-500 text-xs font-mono">{d.ip_address}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-300 text-xs capitalize">{d.device_type.replace(/_/g, ' ')}</td>
                    <td className="py-3 px-4"><Badge status={d.status as DeviceStatus} /></td>
                    <td className="py-3 px-4 text-right font-mono">
                      <span className={d.cpu_utilization > 80 ? 'text-red-400' : d.cpu_utilization > 60 ? 'text-amber-400' : 'text-white'}>{d.cpu_utilization}%</span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-white">{d.memory_utilization}%</td>
                    <td className="py-3 px-4 text-right font-mono text-slate-300">{d.uptime_hours.toLocaleString()}h</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-1 justify-end">
                        <button className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 hover:bg-slate-700">Ping</button>
                        <button className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 hover:bg-slate-700">⋯</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="py-12 text-center text-slate-500">No devices match the current filters</div>}
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-3">Top CPU Usage</h3>
            <div className="space-y-2">
              {topCpu.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-slate-500 text-xs w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-white font-mono truncate">{d.hostname}</div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1">
                      <div className="bg-red-500 h-1.5 rounded-full" style={{ width: `${d.cpu_utilization}%` }} />
                    </div>
                  </div>
                  <span className={`text-xs font-mono ${d.cpu_utilization > 80 ? 'text-red-400' : 'text-slate-400'}`}>{d.cpu_utilization}%</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-3">Top Memory Usage</h3>
            <div className="space-y-2">
              {topMemory.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-slate-500 text-xs w-4">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-white font-mono truncate">{d.hostname}</div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${d.memory_utilization}%` }} />
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-400">{d.memory_utilization}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {selectedDevice && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setSelectedDevice(null)}>
          <div className="bg-slate-900 border border-slate-700 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto m-4" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white font-mono">{selectedDevice.hostname}</h2>
                  <p className="text-sm text-slate-400">{selectedDevice.ip_address} · {selectedDevice.region.replace(/_/g, ' ')}</p>
                </div>
                <button onClick={() => setSelectedDevice(null)} className="text-slate-400 hover:text-white text-2xl">×</button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-800 rounded p-3">
                  <div className="text-xs text-slate-500">Status</div>
                  <Badge status={selectedDevice.status as DeviceStatus} className="mt-1" />
                </div>
                <div className="bg-slate-800 rounded p-3">
                  <div className="text-xs text-slate-500">Uptime</div>
                  <div className="text-2xl font-bold text-white font-mono mt-1">{selectedDevice.uptime_hours.toLocaleString()}h</div>
                </div>
                <div className="bg-slate-800 rounded p-3">
                  <div className="text-xs text-slate-500">CPU</div>
                  <div className={`text-2xl font-bold font-mono mt-1 ${selectedDevice.cpu_utilization > 80 ? 'text-red-400' : 'text-white'}`}>{selectedDevice.cpu_utilization}%</div>
                </div>
                <div className="bg-slate-800 rounded p-3">
                  <div className="text-xs text-slate-500">Memory</div>
                  <div className="text-2xl font-bold text-white font-mono mt-1">{selectedDevice.memory_utilization}%</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded text-sm text-white hover:bg-slate-700">Ping</button>
                <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded text-sm text-white hover:bg-slate-700">Traceroute</button>
                <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded text-sm text-white hover:bg-slate-700">View Alerts</button>
                <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded text-sm text-white hover:bg-slate-700">Schedule Maintenance</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
