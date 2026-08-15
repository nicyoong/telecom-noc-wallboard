'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const REPORT_TYPES = [
  { id: 'daily', label: 'Daily Summary' },
  { id: 'weekly', label: 'Weekly Summary' },
  { id: 'monthly', label: 'Monthly Summary' },
  { id: 'incident', label: 'Incident Report' },
  { id: 'sla', label: 'SLA Report' },
  { id: 'capacity', label: 'Capacity Report' },
];

const REPORT_FORMATS = ['PDF', 'CSV', 'Excel'];

const REPORT_HISTORY = [
  { id: 'RPT-001', type: 'Daily Summary', date: '2026-08-15', generated: '2026-08-16 00:00', status: 'Completed' },
  { id: 'RPT-002', type: 'Weekly Summary', date: '2026-08-08 to 2026-08-14', generated: '2026-08-15 06:00', status: 'Completed' },
  { id: 'RPT-003', type: 'SLA Report', date: 'July 2026', generated: '2026-08-01 06:00', status: 'Completed' },
  { id: 'RPT-004', type: 'Incident Report', date: '2026-08-15', generated: '2026-08-15 23:00', status: 'Completed' },
];

export default function ReportsPage() {
  const [reportType, setReportType] = useState('daily');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [format, setFormat] = useState('PDF');
  const [includeSections, setIncludeSections] = useState(['summary', 'incidents', 'bandwidth']);
  const [scheduledReports, setScheduledReports] = useState([
    { id: 1, type: 'Daily Summary', schedule: 'Daily at 00:00', recipients: 'noc-team@netwatch.example.com' },
    { id: 2, type: 'Weekly Summary', schedule: 'Monday at 06:00', recipients: 'management@netwatch.example.com' },
  ]);

  const toggleSection = (section: string) => {
    setIncludeSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono">Reports</h1>
          <p className="text-sm text-slate-400 mt-1">Generate and manage NOC reports</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Report Generator</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Report Type</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {REPORT_TYPES.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setReportType(type.id)}
                      className={`p-3 rounded border text-left transition-colors ${
                        reportType === type.id
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-sm font-medium">{type.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={e => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={e => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Output Format</label>
                <div className="flex gap-2">
                  {REPORT_FORMATS.map(f => (
                    <button
                      key={f}
                      onClick={() => setFormat(f)}
                      className={`px-4 py-2 rounded border text-sm transition-colors ${
                        format === f
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:text-white'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Include Sections</label>
                <div className="space-y-2">
                  {[
                    { id: 'summary', label: 'Executive Summary' },
                    { id: 'incidents', label: 'Incident Details' },
                    { id: 'bandwidth', label: 'Bandwidth Statistics' },
                    { id: 'devices', label: 'Device Health' },
                    { id: 'sla', label: 'SLA Metrics' },
                    { id: 'appendix', label: 'Appendix' },
                  ].map(section => (
                    <label key={section.id} className="flex items-center gap-3 p-2 rounded hover:bg-slate-800/50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeSections.includes(section.id)}
                        onChange={() => toggleSection(section.id)}
                        className="accent-blue-500"
                      />
                      <span className="text-white text-sm">{section.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="primary">Generate Report</Button>
                <Button variant="outline">Preview</Button>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Report History</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 text-xs uppercase border-b border-slate-800">
                  <th className="text-left py-2 px-3">Report ID</th>
                  <th className="text-left py-2 px-3">Type</th>
                  <th className="text-left py-2 px-3">Date Range</th>
                  <th className="text-left py-2 px-3">Generated</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-right py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {REPORT_HISTORY.map(report => (
                  <tr key={report.id} className="border-b border-slate-800/50 hover:bg-slate-900/50">
                    <td className="py-2 px-3 text-white font-mono text-xs">{report.id}</td>
                    <td className="py-2 px-3 text-slate-300">{report.type}</td>
                    <td className="py-2 px-3 text-slate-400 text-xs">{report.date}</td>
                    <td className="py-2 px-3 text-slate-400 font-mono text-xs">{report.generated}</td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-0.5 rounded text-xs bg-green-900/30 text-green-400">{report.status}</span>
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button className="text-xs text-blue-400 hover:text-blue-300 mr-2">Download</button>
                      <button className="text-xs text-slate-400 hover:text-white">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-300">Scheduled Reports</h3>
              <Button variant="outline" size="sm">+ Add</Button>
            </div>
            <div className="space-y-3">
              {scheduledReports.map(report => (
                <div key={report.id} className="p-3 bg-slate-800/50 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white text-sm font-medium">{report.type}</span>
                    <Badge status="online" label="Active" />
                  </div>
                  <div className="text-xs text-slate-500">{report.schedule}</div>
                  <div className="text-xs text-slate-500 mt-1">{report.recipients}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Report Templates</h3>
            <div className="space-y-2">
              {[
                'Standard Daily Report',
                'Executive Summary',
                'Incident Analysis',
                'SLA Compliance',
                'Capacity Planning',
              ].map(template => (
                <button key={template} className="w-full text-left px-3 py-2 bg-slate-800/50 rounded text-sm text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors">
                  {template}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Distribution List</h3>
            <div className="space-y-3">
              <textarea
                placeholder="Enter email addresses (comma separated)"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm min-h-20 resize-none"
                defaultValue="noc-team@netwatch.example.com, management@netwatch.example.com"
              />
              <Button variant="outline" size="sm" className="w-full">Update List</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
