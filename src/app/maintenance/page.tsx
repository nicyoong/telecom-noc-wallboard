'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const MAINTENANCE_WINDOWS = [
  { id: 'MW-001', description: 'CR-001 Firmware Upgrade', start: '2026-08-16 02:00 UTC', end: '2026-08-16 04:00 UTC', systems: 'Core Router CR-001', status: 'scheduled', requestedBy: 'Marcus Chen' },
  { id: 'MW-002', description: 'DS-001 Port Replacement', start: '2026-08-17 22:00 UTC', end: '2026-08-18 02:00 UTC', systems: 'Distribution Switch DS-001', status: 'scheduled', requestedBy: 'Maria Torres' },
  { id: 'MW-003', description: 'OT-001 Optical Module Swap', start: '2026-08-20 03:00 UTC', end: '2026-08-20 05:00 UTC', systems: 'Optical Terminal OT-001', status: 'scheduled', requestedBy: 'James Wilson' },
  { id: 'MW-004', description: 'LB-001 Firmware Upgrade', start: '2026-08-15 20:00 UTC', end: '2026-08-15 23:00 UTC', systems: 'Load Balancer LB-001', status: 'completed', requestedBy: 'Marcus Chen' },
  { id: 'MW-005', description: 'FW-001 Rule Update', start: '2026-08-14 10:00 UTC', end: '2026-08-14 11:00 UTC', systems: 'Firewall FW-001', status: 'completed', requestedBy: 'Sarah Johnson' },
];

const STATUS_COLORS: Record<string, string> = {
  scheduled: 'blue',
  in_progress: 'amber',
  completed: 'green',
  canceled: 'gray',
};

export default function MaintenancePage() {
  const [filter, setFilter] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedWindow, setSelectedWindow] = useState<typeof MAINTENANCE_WINDOWS[0] | null>(null);

  const filteredWindows = MAINTENANCE_WINDOWS.filter(w => filter === 'all' || w.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono">Maintenance Windows</h1>
          <p className="text-sm text-slate-400 mt-1">Schedule and manage planned maintenance</p>
        </div>
        <Button variant="primary" onClick={() => setShowCreateForm(!showCreateForm)}>+ New Window</Button>
      </div>

      {showCreateForm && (
        <Card>
          <h3 className="text-sm font-bold text-slate-300 mb-4">Create Maintenance Window</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Description</label>
              <input type="text" placeholder="e.g., Firmware upgrade for CR-001" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Start Time</label>
                <input type="datetime-local" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">End Time</label>
                <input type="datetime-local" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Affected Systems</label>
              <input type="text" placeholder="e.g., Core Router CR-001, BGP sessions" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Impact Assessment</label>
              <textarea placeholder="Describe the expected impact..." className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm min-h-20" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Rollback Plan</label>
              <textarea placeholder="Describe rollback procedures..." className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm min-h-20" />
            </div>
            <div className="flex gap-3">
              <Button variant="primary">Create Window</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
            </div>
          </div>
        </Card>
      )}

      <div className="flex gap-2">
        {['all', 'scheduled', 'in_progress', 'completed', 'canceled'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-1.5 rounded text-sm font-mono transition-colors ${
              filter === status
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
            }`}
          >
            {status.replace('_', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      <Card>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-500 text-xs uppercase border-b border-slate-800">
              <th className="text-left py-2 px-3">Window ID</th>
              <th className="text-left py-2 px-3">Description</th>
              <th className="text-left py-2 px-3">Start</th>
              <th className="text-left py-2 px-3">End</th>
              <th className="text-left py-2 px-3">Status</th>
              <th className="text-left py-2 px-3">Requested By</th>
              <th className="text-right py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredWindows.map(window => (
              <tr key={window.id} className="border-b border-slate-800/50 hover:bg-slate-900/50 cursor-pointer" onClick={() => setSelectedWindow(window)}>
                <td className="py-2 px-3 text-white font-mono text-xs">{window.id}</td>
                <td className="py-2 px-3 text-white">{window.description}</td>
                <td className="py-2 px-3 text-slate-400 font-mono text-xs">{window.start}</td>
                <td className="py-2 px-3 text-slate-400 font-mono text-xs">{window.end}</td>
                <td className="py-2 px-3">
                  <span className={`px-2 py-0.5 rounded text-xs bg-${STATUS_COLORS[window.status]}-900/30 text-${STATUS_COLORS[window.status]}-400`}>
                    {window.status.replace('_', ' ').toUpperCase()}
                  </span>
                </td>
                <td className="py-2 px-3 text-slate-400 text-xs">{window.requestedBy}</td>
                <td className="py-2 px-3 text-right">
                  <button className="text-xs text-blue-400 hover:text-blue-300 mr-2">View</button>
                  {window.status === 'scheduled' && (
                    <>
                      <button className="text-xs text-green-400 hover:text-green-300 mr-2">Approve</button>
                      <button className="text-xs text-red-400 hover:text-red-300">Cancel</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {selectedWindow && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setSelectedWindow(null)}>
          <div className="bg-slate-900 border border-slate-700 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto m-4" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white font-mono">{selectedWindow.id}</h2>
                  <p className="text-sm text-slate-400 mt-1">{selectedWindow.description}</p>
                </div>
                <button onClick={() => setSelectedWindow(null)} className="text-slate-400 hover:text-white text-2xl">×</button>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-800 rounded p-3">
                  <div className="text-xs text-slate-500">Start Time</div>
                  <div className="text-white font-mono text-sm mt-1">{selectedWindow.start}</div>
                </div>
                <div className="bg-slate-800 rounded p-3">
                  <div className="text-xs text-slate-500">End Time</div>
                  <div className="text-white font-mono text-sm mt-1">{selectedWindow.end}</div>
                </div>
                <div className="bg-slate-800 rounded p-3">
                  <div className="text-xs text-slate-500">Status</div>
                  <div className="mt-1"><span className={`px-2 py-0.5 rounded text-xs bg-${STATUS_COLORS[selectedWindow.status]}-900/30 text-${STATUS_COLORS[selectedWindow.status]}-400`}>{selectedWindow.status.replace('_', ' ').toUpperCase()}</span></div>
                </div>
                <div className="bg-slate-800 rounded p-3">
                  <div className="text-xs text-slate-500">Requested By</div>
                  <div className="text-white font-mono text-sm mt-1">{selectedWindow.requestedBy}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">Affected Systems</h4>
                  <p className="text-sm text-white">{selectedWindow.systems}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">Notifications Sent</h4>
                  <div className="flex gap-2">
                    <Badge status="online" label="Email" />
                    <Badge status="online" label="SMS" />
                    <Badge status="online" label="Slack" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-400 mb-2">Checklist</h4>
                  <div className="space-y-2">
                    {['Pre-maintenance backup completed', 'Rollback plan reviewed', 'Stakeholders notified', 'Monitoring active'].map((item, i) => (
                      <label key={i} className="flex items-center gap-3 p-2 bg-slate-800/50 rounded">
                        <input type="checkbox" className="accent-blue-500" />
                        <span className="text-sm text-white">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Card>
        <h3 className="text-sm font-bold text-slate-300 mb-4">Maintenance History</h3>
        <div className="space-y-3">
          {MAINTENANCE_WINDOWS.filter(w => w.status === 'completed').map(window => (
            <div key={window.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
              <div>
                <div className="text-white text-sm">{window.description}</div>
                <div className="text-xs text-slate-500">{window.start} - {window.end}</div>
              </div>
              <span className="text-xs text-green-400">Completed</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
