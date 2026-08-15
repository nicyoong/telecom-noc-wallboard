'use client';

import React, { useState } from 'react';
import { MOCK_DEVICES, MOCK_INCIDENTS } from '@/data/mock';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { Device } from '@/types';

export default function DeviceDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showConfirm, setShowConfirm] = useState(false);
  
  const device = MOCK_DEVICES.find(d => d.id === params.id) || MOCK_DEVICES[0];
  if (!device) return <div>Device not found</div>;

  const incident = MOCK_INCIDENTS.find(i => i.device_id === device.id);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'interfaces', label: 'Interfaces' },
    { id: 'metrics', label: 'Metrics' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'config', label: 'Configuration' },
    { id: 'history', label: 'History' },
  ];

  return (
    <div className="space-y-6">
      <nav className="text-sm text-slate-400">
        <a href="/devices" className="hover:text-white">Devices</a>
        <span className="mx-2">/</span>
        <span className="text-white">{device.hostname}</span>
      </nav>

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
            <span className="text-2xl">🖧</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white font-mono">{device.hostname}</h1>
            <div className="flex items-center gap-3 mt-1">
              <Badge status={device.status} />
              <span className="text-sm text-slate-400 font-mono">{device.ip_address}</span>
              <span className="text-sm text-slate-500">{device.location}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-white hover:bg-slate-700">Ping</button>
          <button className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-white hover:bg-slate-700">Traceroute</button>
          <button onClick={() => setShowConfirm(true)} className="px-3 py-1.5 bg-amber-600/20 border border-amber-600/50 rounded text-sm text-amber-400 hover:bg-amber-600/30">Restart</button>
          <button className="px-3 py-1.5 bg-red-600/20 border border-red-600/50 rounded text-sm text-red-400 hover:bg-red-600/30">Open Incident</button>
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-lg p-6 w-96">
            <h3 className="text-lg font-bold text-white mb-2">Confirm Restart</h3>
            <p className="text-sm text-slate-400 mb-4">Are you sure you want to restart {device.hostname}? This will cause a brief outage.</p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 bg-slate-800 rounded text-sm text-white">Cancel</button>
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 bg-red-600 rounded text-sm text-white">Restart Now</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-xs text-slate-500">Uptime</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">{device.uptime_hours.toLocaleString()}h</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-slate-500">CPU</div>
          <div className={`text-2xl font-bold font-mono mt-1 ${device.cpu_utilization > 80 ? 'text-red-400' : 'text-white'}`}>{device.cpu_utilization}%</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-slate-500">Memory</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">{device.memory_utilization}%</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-slate-500">Last Check</div>
          <div className="text-lg font-bold text-white font-mono mt-1">{new Date(device.last_seen).toLocaleTimeString()}</div>
        </Card>
      </div>

      <div className="flex gap-1 border-b border-slate-800">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.id ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-white'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 min-h-96">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Device Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><span className="text-slate-500 text-sm">Device Type</span><div className="text-white font-mono">{device.device_type.replace(/_/g, ' ')}</div></div>
              <div><span className="text-slate-500 text-sm">Region</span><div className="text-white">{device.region.replace(/_/g, ' ')}</div></div>
              <div><span className="text-slate-500 text-sm">Location</span><div className="text-white">{device.location}</div></div>
              <div><span className="text-slate-500 text-sm">Firmware</span><div className="text-white font-mono text-sm">{device.firmware_version}</div></div>
              <div><span className="text-slate-500 text-sm">Serial Number</span><div className="text-white font-mono text-sm">{device.serial_number}</div></div>
              <div><span className="text-slate-500 text-sm">Last Seen</span><div className="text-white font-mono text-sm">{new Date(device.last_seen).toLocaleString()}</div></div>
            </div>
            {incident && (
              <div className="mt-4 p-3 bg-red-900/20 border border-red-800/50 rounded">
                <div className="text-sm text-red-400 font-medium">Active Incident: {incident.title}</div>
                <div className="text-xs text-red-300/70 mt-1">{incident.description}</div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'interfaces' && (
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Interface Status</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 text-xs uppercase border-b border-slate-800">
                  <th className="text-left py-2 px-3">Interface</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-right py-2 px-3">Speed</th>
                  <th className="text-right py-2 px-3">In Traffic</th>
                  <th className="text-right py-2 px-3">Out Traffic</th>
                  <th className="text-right py-2 px-3">Errors</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(device.port_utilization).map(([port, util]) => (
                  <tr key={port} className="border-b border-slate-800/50">
                    <td className="py-2 px-3 text-white font-mono">{port}</td>
                    <td className="py-2 px-3"><span className={`px-2 py-0.5 rounded text-xs ${util > 80 ? 'bg-red-900/30 text-red-400' : 'bg-green-900/30 text-green-400'}`}>{util > 80 ? 'Critical' : 'Up'}</span></td>
                    <td className="py-2 px-3 text-slate-300 text-right font-mono">1 Gbps</td>
                    <td className="py-2 px-3 text-slate-300 text-right font-mono">{(util * 10).toFixed(1)} Mbps</td>
                    <td className="py-2 px-3 text-slate-300 text-right font-mono">{(util * 8).toFixed(1)} Mbps</td>
                    <td className="py-2 px-3 text-slate-300 text-right font-mono">{util > 80 ? '12' : '0'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'metrics' && (
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 rounded p-4">
                <div className="text-sm text-slate-400">CPU Utilization</div>
                <div className="w-full bg-slate-700 rounded-full h-4 mt-2">
                  <div className={`h-4 rounded-full ${device.cpu_utilization > 80 ? 'bg-red-500' : device.cpu_utilization > 60 ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${device.cpu_utilization}%` }} />
                </div>
                <div className="text-right text-sm font-mono mt-1 text-white">{device.cpu_utilization}%</div>
              </div>
              <div className="bg-slate-800 rounded p-4">
                <div className="text-sm text-slate-400">Memory Utilization</div>
                <div className="w-full bg-slate-700 rounded-full h-4 mt-2">
                  <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${device.memory_utilization}%` }} />
                </div>
                <div className="text-right text-sm font-mono mt-1 text-white">{device.memory_utilization}%</div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'alerts' && (
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Alerts</h3>
            {incident ? (
              <div className="p-4 bg-red-900/20 border border-red-800/50 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <Badge status="critical" />
                  <span className="text-white font-medium">{incident.title}</span>
                </div>
                <p className="text-sm text-slate-400">{incident.description}</p>
                <div className="text-xs text-slate-500 mt-2">Opened: {new Date(incident.created_at).toLocaleString()}</div>
              </div>
            ) : (
              <div className="text-slate-500 text-center py-8">No active alerts for this device</div>
            )}
          </div>
        )}
        {activeTab === 'config' && (
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Configuration</h3>
            <pre className="bg-slate-950 border border-slate-800 rounded p-4 text-xs text-green-400 font-mono overflow-x-auto">
{`hostname ${device.hostname}
!
interface GigabitEthernet0/0
 ip address ${device.ip_address} 255.255.255.0
 no shutdown
!
interface GigabitEthernet0/1
 ip address 10.0.0.1 255.255.255.0
 no shutdown
!
router ospf 1
 network 10.0.0.0 0.0.0.255 area 0
!
end
`}</pre>
          </div>
        )}
        {activeTab === 'history' && (
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Event History</h3>
            <div className="space-y-2">
              {[
                { time: new Date(Date.now() - 3600000).toLocaleString(), event: 'CPU threshold warning', severity: 'warning' },
                { time: new Date(Date.now() - 7200000).toLocaleString(), event: 'Interface Gi0/1 flapping', severity: 'critical' },
                { time: new Date(Date.now() - 86400000).toLocaleString(), event: 'Firmware updated to v2.4.1', severity: 'info' },
                { time: new Date(Date.now() - 172800000).toLocaleString(), event: 'Device added to monitoring', severity: 'info' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-2 border-b border-slate-800/50">
                  <span className="text-xs text-slate-500 font-mono w-40">{item.time}</span>
                  <span className={`w-2 h-2 rounded-full ${item.severity === 'critical' ? 'bg-red-500' : item.severity === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                  <span className="text-sm text-white">{item.event}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
