'use client';

import React, { useState } from 'react';
import { MOCK_INCIDENTS } from '@/data/mock';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Incident } from '@/types';

export default function IncidentDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<{ text: string; author: string; time: string }[]>([
    { text: 'Initial investigation started. Checking MPLS circuit status.', author: 'Marcus Chen', time: '2024-01-15 10:05' },
    { text: 'Confirmed LOS on circuit CIR-4421. Dispatching field crew.', author: 'Maria Torres', time: '2024-01-15 10:23' },
  ]);
  const incident = MOCK_INCIDENTS.find(i => i.id === params.id) || MOCK_INCIDENTS[0];
  if (!incident) return <div>Incident not found</div>;

  const handleAddNote = () => {
    if (noteText.trim()) {
      setNotes(prev => [...prev, { text: noteText, author: 'Current User', time: new Date().toLocaleString() }]);
      setNoteText('');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'devices', label: 'Affected Devices' },
    { id: 'notes', label: 'Notes' },
    { id: 'postmortem', label: 'Post-Mortem' },
  ];

  return (
    <div className="space-y-6">
      <nav className="text-sm text-slate-400">
        <a href="/incidents" className="hover:text-white">Incidents</a>
        <span className="mx-2">/</span>
        <span className="text-white">{incident.id}</span>
      </nav>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-white font-mono">{incident.title}</h1>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${incident.severity === 'P1' ? 'bg-red-900/30 text-red-400' : 'bg-amber-900/30 text-amber-400'}`}>{incident.severity}</span>
            <Badge status={incident.status === 'investigating' ? 'degraded' : 'online'} label={incident.status} />
          </div>
          <div className="text-sm text-slate-400">
            Opened: {new Date(incident.created_at).toLocaleString()} ·
            Region: {incident.region.replace(/_/g, ' ')} ·
            Duration: {Math.floor((Date.now() - new Date(incident.created_at).getTime()) / 3600000)}h {Math.floor(((Date.now() - new Date(incident.created_at).getTime()) % 3600000) / 60000)}m
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Assign</Button>
          <Button variant="outline" className="border-amber-600 text-amber-400 hover:bg-amber-900/20">Escalate</Button>
          <Button variant="outline" className="border-green-600 text-green-400 hover:bg-green-900/20">Resolve</Button>
        </div>
      </div>

      <Card>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h3 className="text-xs text-slate-500 uppercase mb-2">Description</h3>
            <p className="text-sm text-white font-mono">{incident.description}</p>
          </div>
          <div>
            <h3 className="text-xs text-slate-500 uppercase mb-2">Affected Services</h3>
            <div className="flex flex-wrap gap-1">
              {incident.affected_services.map(s => (
                <span key={s} className="px-2 py-0.5 bg-slate-800 rounded text-xs font-mono text-blue-400">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs text-slate-500 uppercase mb-2">SLA Countdown</h3>
            <div className="text-2xl font-bold text-red-400 font-mono">2h 15m</div>
            <div className="text-xs text-slate-500 mt-1">Until P1 SLA breach</div>
          </div>
        </div>
      </Card>

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

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 min-h-64">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Incident Overview</h3>
            <div className="grid grid-cols-2 gap-4">
              <div><span className="text-slate-500 text-sm">Priority</span><div className="text-white font-mono">{incident.severity}</div></div>
              <div><span className="text-slate-500 text-sm">Status</span><div className="text-white capitalize">{incident.status}</div></div>
              <div><span className="text-slate-500 text-sm">Assigned To</span><div className="text-white font-mono">{incident.assigned_to || 'Unassigned'}</div></div>
              <div><span className="text-slate-500 text-sm">Opened By</span><div className="text-white font-mono">{incident.timeline[0]?.author}</div></div>
            </div>
          </div>
        )}
        {activeTab === 'timeline' && (
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-white">Event Timeline</h3>
            {incident.timeline.map((event, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-slate-800/50">
                <span className="text-xs text-slate-500 font-mono w-32 shrink-0">{new Date(event.timestamp).toLocaleString()}</span>
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                <div>
                  <div className="text-sm text-white">{event.action}</div>
                  <div className="text-xs text-slate-500">by {event.author}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'devices' && (
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Affected Devices</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 text-xs uppercase border-b border-slate-800">
                  <th className="text-left py-2 px-3">Hostname</th>
                  <th className="text-left py-2 px-3">IP Address</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-left py-2 px-3">Region</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_INCIDENTS[0]?.device_id && (
                  <tr className="border-b border-slate-800/50">
                    <td className="py-2 px-3 text-white font-mono">core-rtr-nyc-01</td>
                    <td className="py-2 px-3 text-slate-400 font-mono">10.0.1.1</td>
                    <td className="py-2 px-3"><Badge status="critical" label="Critical" /></td>
                    <td className="py-2 px-3 text-slate-400">Northeast</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'notes' && (
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Internal Notes</h3>
            <div className="space-y-3 mb-4">
              {notes.map((note, i) => (
                <div key={i} className="p-3 bg-slate-800 rounded border border-slate-700">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-blue-400 font-mono">{note.author}</span>
                    <span className="text-xs text-slate-500">{note.time}</span>
                  </div>
                  <p className="text-sm text-white">{note.text}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <textarea
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder="Add a note..."
                className="flex-1 bg-slate-950 border border-slate-700 rounded p-3 text-sm text-white placeholder-slate-500"
                rows={3}
              />
              <Button onClick={handleAddNote} variant="primary" className="self-end">Add Note</Button>
            </div>
          </div>
        )}
        {activeTab === 'postmortem' && (
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Post-Mortem</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-slate-400 mb-2">Root Cause</h4>
                <p className="text-sm text-white">Fiber cut on MPLS circuit CIR-4421 between NYC and Chicago hubs. Estimated repair time: 4 hours.</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-400 mb-2">Lessons Learned</h4>
                <ul className="text-sm text-white list-disc list-inside space-y-1">
                  <li>Redundant path was not automatically failovering due to BGP timer misconfiguration</li>
                  <li>Field crew dispatch was delayed by 15 minutes due to missing contact info</li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-400 mb-2">Action Items</h4>
                <ul className="text-sm text-white list-disc list-inside space-y-1">
                  <li>Review and fix BGP timer configuration across all core routers</li>
                  <li>Update escalation matrix with field crew contact details</li>
                  <li>Schedule post-mortem review meeting</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <Card>
        <h3 className="text-sm font-bold text-slate-300 mb-3">Escalation Matrix</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-slate-800 rounded">
            <div className="text-xs text-slate-500">P1 - Immediate</div>
            <div className="text-sm text-white mt-1">NOC Lead: Marcus Chen</div>
            <div className="text-xs text-slate-400">📞 1-800-NOC-WATCH</div>
          </div>
          <div className="p-3 bg-slate-800 rounded">
            <div className="text-xs text-slate-500">P1 - 30 min</div>
            <div className="text-sm text-white mt-1">Network Manager: Sarah Johnson</div>
            <div className="text-xs text-slate-400">📞 1-800-NOC-WATCH</div>
          </div>
          <div className="p-3 bg-slate-800 rounded">
            <div className="text-xs text-slate-500">P1 - 1 hour</div>
            <div className="text-sm text-white mt-1">VP Engineering: David Park</div>
            <div className="text-xs text-slate-400">📞 1-800-NOC-WATCH</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
