'use client';

import React, { useState } from 'react';
import { MOCK_SHIFT_LOGS } from '@/data/mock';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { ShiftLog } from '@/types';

const CURRENT_SHIFT: ShiftLog = {
  id: 'SHIFT-001',
  shift: 'day',
  date: new Date().toISOString().split('T')[0],
  operator: 'Marcus Chen',
  station: 'Station A - Main Console',
  entry_time: new Date().toISOString(),
  notes: 'Normal operations. No critical incidents at start of shift.',
  incidents_handled: 3,
  equipment_issues: [],
};

interface OpenItem {
  id: number;
  item: string;
  priority: string;
  status: string;
  assigned: string;
  notes: string;
}

export default function ShiftLogView() {
  const [handoverNotes, setHandoverNotes] = useState('');
  const [openItems, setOpenItems] = useState<OpenItem[]>([
    { id: 1, item: 'Monitor CIR-4421 repair progress', priority: 'P1', status: 'open', assigned: 'Marcus Chen', notes: 'Field crew ETA 14:00' },
    { id: 2, item: 'BGP timer configuration review', priority: 'P2', status: 'in_progress', assigned: 'Maria Torres', notes: 'Scheduled for tomorrow' },
    { id: 3, item: 'Update escalation matrix', priority: 'P3', status: 'open', assigned: 'Unassigned', notes: '' },
  ]);
  const [newItem, setNewItem] = useState('');

  const toggleItemStatus = (id: number) => {
    setOpenItems(prev => prev.map((item: any) =>
      item.id === id
        ? { ...item, status: item.status === 'open' ? 'closed' : 'open' }
        : item
    ));
  };

  const addNewItem = () => {
    if (newItem.trim()) {
      setOpenItems(prev => [...prev, { id: Date.now(), item: newItem, priority: 'P3', status: 'open', assigned: 'Marcus Chen', notes: '' }]);
      setNewItem('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono">Shift Handover Log</h1>
          <p className="text-sm text-slate-400 mt-1">Operator shift records and handover notes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Print Report</Button>
          <Button variant="outline">Archive</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Current Shift</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-slate-500">Shift</div>
                <div className="text-lg font-bold text-white font-mono capitalize">{CURRENT_SHIFT.shift}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Operator</div>
                <div className="text-lg font-bold text-white font-mono">{CURRENT_SHIFT.operator}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Station</div>
                <div className="text-sm font-bold text-white">{CURRENT_SHIFT.station}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Incidents</div>
                <div className="text-2xl font-bold text-white font-mono">{CURRENT_SHIFT.incidents_handled}</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800">
              <div className="text-xs text-slate-500">Entry Time</div>
              <div className="text-sm text-white font-mono">{new Date(CURRENT_SHIFT.entry_time).toLocaleString()}</div>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Shift Activity Log</h3>
            <div className="space-y-2">
              {[
                { time: '09:15', engineer: 'Marcus Chen', action: 'Acknowledged', detail: 'INC-003 - High latency on West Coast links' },
                { time: '08:45', engineer: 'Maria Torres', action: 'Opened', detail: 'INC-003 - Investigating latency spike' },
                { time: '07:30', engineer: 'Marcus Chen', action: 'Shift Start', detail: 'Day shift began - Station A' },
                { time: '07:15', engineer: 'System', action: 'Auto-check', detail: 'All systems nominal' },
              ].map((entry, i) => (
                <div key={i} className="flex items-start gap-4 py-2 border-b border-slate-800/50 last:border-0">
                  <span className="text-xs text-slate-500 font-mono w-12 shrink-0">{entry.time}</span>
                  <span className="text-xs text-blue-400 font-mono w-24 shrink-0">{entry.engineer}</span>
                  <span className="text-xs text-slate-400 w-20 shrink-0">{entry.action}</span>
                  <span className="text-sm text-white">{entry.detail}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Open Items</h3>
            <div className="space-y-2">
              {openItems.map(item => (
                <div key={item.id} className={`flex items-center gap-4 py-2 px-3 rounded ${item.status === 'closed' ? 'bg-slate-900/30' : 'bg-slate-800/50'} ${item.priority === 'P1' ? 'border-l-2 border-l-red-500' : item.priority === 'P2' ? 'border-l-2 border-l-amber-500' : 'border-l-2 border-l-blue-500'}`}>
                  <button onClick={() => toggleItemStatus(item.id)} className={`w-4 h-4 rounded border-2 ${item.status === 'closed' ? 'bg-green-500 border-green-500' : 'border-slate-500'}`} />
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${item.priority === 'P1' ? 'bg-red-900/30 text-red-400' : item.priority === 'P2' ? 'bg-amber-900/30 text-amber-400' : 'bg-blue-900/30 text-blue-400'}`}>{item.priority}</span>
                  <span className={`flex-1 text-sm ${item.status === 'closed' ? 'text-slate-500 line-through' : 'text-white'}`}>{item.item}</span>
                  <span className="text-xs text-slate-400 font-mono">{item.assigned}</span>
                  {item.notes && <span className="text-xs text-slate-500">{item.notes}</span>}
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
                placeholder="Add new item..."
                className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm text-white placeholder-slate-500"
                onKeyDown={e => e.key === 'Enter' && addNewItem()}
              />
              <Button onClick={addNewItem} variant="outline">Add</Button>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Shift Handover</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-500">Outgoing Engineer</label>
                <select className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm text-white">
                  <option>Marcus Chen</option>
                  <option>Maria Torres</option>
                  <option>James Wilson</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500">Incoming Engineer</label>
                <select className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm text-white">
                  <option>Maria Torres</option>
                  <option>James Wilson</option>
                  <option>Sarah Johnson</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500">Handover Notes</label>
                <textarea
                  value={handoverNotes}
                  onChange={e => setHandoverNotes(e.target.value)}
                  placeholder="Enter shift handover notes..."
                  className="w-full mt-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded text-sm text-white placeholder-slate-500 min-h-24"
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">Sign Out</Button>
                <Button variant="primary" className="flex-1">Sign In</Button>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Upcoming Shifts</h3>
            <div className="space-y-3">
              {[
                { shift: 'Day', date: 'Tomorrow', operator: 'Maria Torres', station: 'Station B' },
                { shift: 'Night', date: 'Tonight', operator: 'James Wilson', station: 'Station A' },
                { shift: 'Day', date: 'Jan 17', operator: 'Sarah Johnson', station: 'Station A' },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800/50 last:border-0">
                  <div>
                    <div className="text-sm text-white font-medium">{s.operator}</div>
                    <div className="text-xs text-slate-500">{s.shift} shift · {s.station}</div>
                  </div>
                  <Badge status="online" label={s.date} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="border-amber-500/30">
            <h3 className="text-sm font-bold text-amber-400 mb-3">⚠ Critical Items Requiring Attention</h3>
            <div className="space-y-2">
              <div className="p-2 bg-red-900/20 border border-red-800/50 rounded">
                <div className="text-xs text-red-400 font-medium">CIR-4421 Repair in Progress</div>
                <div className="text-xs text-red-300/70 mt-1">Field crew ETA 14:00 UTC</div>
              </div>
              <div className="p-2 bg-amber-900/20 border border-amber-800/50 rounded">
                <div className="text-xs text-amber-400 font-medium">BGP Timer Review Needed</div>
                <div className="text-xs text-amber-300/70 mt-1">Scheduled for tomorrow</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card>
        <h3 className="text-sm font-bold text-slate-300 mb-4">Historical Shift Logs</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-500 text-xs uppercase border-b border-slate-800">
              <th className="text-left py-2 px-3">Date</th>
              <th className="text-left py-2 px-3">Shift</th>
              <th className="text-left py-2 px-3">Operator</th>
              <th className="text-left py-2 px-3">Station</th>
              <th className="text-right py-2 px-3">Incidents</th>
              <th className="text-left py-2 px-3">Notes</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_SHIFT_LOGS.map(log => (
              <tr key={log.id} className="border-b border-slate-800/50 hover:bg-slate-900/50">
                <td className="py-2 px-3 text-white font-mono">{new Date(log.date).toLocaleDateString()}</td>
                <td className="py-2 px-3"><span className={`capitalize ${log.shift === 'night' ? 'text-blue-400' : 'text-amber-400'}`}>{log.shift}</span></td>
                <td className="py-2 px-3 text-white font-mono">{log.operator}</td>
                <td className="py-2 px-3 text-slate-400">{log.station}</td>
                <td className="py-2 px-3 text-right text-white font-mono">{log.incidents_handled}</td>
                <td className="py-2 px-3 text-slate-400 text-xs truncate max-w-xs">{log.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
