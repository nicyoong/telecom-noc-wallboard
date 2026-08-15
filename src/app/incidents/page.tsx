'use client';

import React, { useState } from 'react';
import { MOCK_INCIDENTS } from '@/data/mock';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { Incident } from '@/types';

export default function IncidentsView() {
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [escalationNote, setEscalationNote] = useState('');
  const [showNewIncident, setShowNewIncident] = useState(false);

  const activeIncidents = MOCK_INCIDENTS.filter((i: Incident) => i.status !== 'resolved');

  const filtered = activeIncidents.filter((i: Incident) => {
    if (severityFilter !== 'all' && i.severity !== severityFilter) return false;
    if (statusFilter !== 'all' && i.status !== statusFilter) return false;
    if (search && !i.title.toLowerCase().includes(search.toLowerCase()) && !i.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    p1: activeIncidents.filter((i: Incident) => i.severity === 'P1').length,
    p2: activeIncidents.filter((i: Incident) => i.severity === 'P2').length,
    mttr: '1h 23m',
    today: MOCK_INCIDENTS.filter((i: Incident) => new Date(i.created_at).toDateString() === new Date().toDateString()).length,
  };

  const severityOrder: Record<string, number> = { P1: 0, P2: 1, P3: 2, P4: 3 };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono">Active Incidents</h1>
          <p className="text-sm text-slate-400 mt-1">{activeIncidents.length} incidents currently active</p>
        </div>
        <Button variant="primary" onClick={() => setShowNewIncident(true)}>+ New Incident</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-red-500">
          <div className="text-xs text-slate-500">Open P1 Critical</div>
          <div className="text-3xl font-bold text-red-400 font-mono mt-1">{stats.p1}</div>
        </Card>
        <Card className="p-4 border-l-4 border-l-amber-500">
          <div className="text-xs text-slate-500">Open P2 High</div>
          <div className="text-3xl font-bold text-amber-400 font-mono mt-1">{stats.p2}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-slate-500">MTTR</div>
          <div className="text-3xl font-bold text-white font-mono mt-1">{stats.mttr}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-slate-500">Today</div>
          <div className="text-3xl font-bold text-white font-mono mt-1">{stats.today}</div>
        </Card>
      </div>

      <div className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Search by ID or keyword..."
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
          <option value="investigating">Investigating</option>
          <option value="acknowledged">Acknowledged</option>
        </select>
      </div>

      <Card>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-500 text-xs uppercase border-b border-slate-800">
              <th className="text-left py-3 px-4">Severity</th>
              <th className="text-left py-3 px-4">Incident</th>
              <th className="text-left py-3 px-4">Region</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Opened</th>
              <th className="text-left py-3 px-4">Duration</th>
              <th className="text-left py-3 px-4">Assigned</th>
              <th className="text-right py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.sort((a: Incident, b: Incident) => (severityOrder[a.severity] ?? 9) - (severityOrder[b.severity] ?? 9)).map((inc: Incident) => (
              <tr key={inc.id} className="border-b border-slate-800/50 hover:bg-slate-900/50 cursor-pointer" onClick={() => setSelectedIncident(inc)}>
                <td className="py-3 px-4"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${inc.severity === 'P1' ? 'bg-red-900/30 text-red-400' : inc.severity === 'P2' ? 'bg-amber-900/30 text-amber-400' : 'bg-blue-900/30 text-blue-400'}`}>{inc.severity}</span></td>
                <td className="py-3 px-4">
                  <div className="text-white font-medium">{inc.title}</div>
                  <div className="text-xs text-slate-500 font-mono">{inc.id}</div>
                </td>
                <td className="py-3 px-4 text-slate-300 text-xs capitalize">{inc.region?.replace(/_/g, ' ')}</td>
                <td className="py-3 px-4"><Badge status={inc.status === 'investigating' ? 'degraded' : 'online'} label={inc.status} /></td>
                <td className="py-3 px-4 text-slate-400 font-mono text-xs">{new Date(inc.created_at).toLocaleTimeString()}</td>
                <td className="py-3 px-4 text-slate-400 font-mono text-xs">{Math.floor((Date.now() - new Date(inc.created_at).getTime()) / 3600000)}h {Math.floor(((Date.now() - new Date(inc.created_at).getTime()) % 3600000) / 60000)}m</td>
                <td className="py-3 px-4 text-slate-300 font-mono text-xs">{inc.assigned_to || 'Unassigned'}</td>
                <td className="py-3 px-4 text-right">
                  <div className="flex gap-1 justify-end">
                    <button className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 hover:bg-slate-700">View</button>
                    <button className="px-2 py-1 bg-slate-800 rounded text-xs text-slate-300 hover:bg-slate-700">Assign</button>
                    <button className="px-2 py-1 bg-red-900/30 rounded text-xs text-red-400 hover:bg-red-900/50">Escalate</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="py-12 text-center text-slate-500">No incidents match the current filters</div>}
      </Card>

      <Dialog
        isOpen={!!selectedIncident}
        onClose={() => setSelectedIncident(null)}
        title={selectedIncident?.title || ''}
        description={`${selectedIncident?.id} | Severity: ${selectedIncident?.severity} | Region: ${selectedIncident?.region}`}
        footer={
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setSelectedIncident(null)}>Close</Button>
            <Button variant="outline" className="border-green-600 text-green-400 hover:bg-green-900/20" onClick={() => { alert('Incident resolved'); setSelectedIncident(null); }}>Resolve</Button>
            <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-900/20" onClick={() => { alert('Incident escalated'); setSelectedIncident(null); }}>Escalate</Button>
          </div>
        }
      >
        {selectedIncident && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium text-slate-400 mb-2">Description</h4>
              <p className="text-sm text-white font-mono leading-relaxed">{selectedIncident.description}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-400 mb-2">Affected Services</h4>
              <div className="flex flex-wrap gap-2">
                {selectedIncident.affected_services.map((s: string) => (
                  <span key={s} className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-blue-400">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-slate-400 mb-2">Escalation Note</h4>
              <Textarea
                placeholder="Add notes for escalation..."
                value={escalationNote}
                onChange={e => setEscalationNote(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
