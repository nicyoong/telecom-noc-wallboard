'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';

type TabId = 'display' | 'alerts' | 'notifications' | 'users' | 'datasources' | 'maintenance';

const TABS: { id: TabId; label: string }[] = [
  { id: 'display', label: 'Display' },
  { id: 'alerts', label: 'Alerts' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'users', label: 'Users' },
  { id: 'datasources', label: 'Data Sources' },
  { id: 'maintenance', label: 'Maintenance' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('display');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [refreshInterval, setRefreshInterval] = useState('30');
  const [wallboardMode, setWallboardMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium');
  const [colorScheme, setColorScheme] = useState('default');
  const { addToast } = useToast();

  const handleSave = () => {
    addToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'Your settings have been updated successfully.',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono">Settings</h1>
          <p className="text-sm text-slate-400 mt-1">Configure your NOC monitoring environment</p>
        </div>
        <Button onClick={handleSave} variant="primary">Save Changes</Button>
      </div>

      <div className="flex gap-1 border-b border-slate-800 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'display' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Theme</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 bg-slate-800/50 rounded border border-slate-700 cursor-pointer">
                <input type="radio" checked={theme === 'dark'} onChange={() => setTheme('dark')} className="accent-blue-500" />
                <div>
                  <div className="text-white text-sm">Dark Theme</div>
                  <div className="text-xs text-slate-500">Optimized for NOC environments</div>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 bg-slate-800/50 rounded border border-slate-700 cursor-pointer">
                <input type="radio" checked={theme === 'light'} onChange={() => setTheme('light')} className="accent-blue-500" />
                <div>
                  <div className="text-white text-sm">Light Theme</div>
                  <div className="text-xs text-slate-500">Standard light mode</div>
                </div>
              </label>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Auto-Refresh</h3>
            <div className="space-y-3">
              <label className="block text-sm text-slate-400">Refresh Interval (seconds)</label>
              <select
                value={refreshInterval}
                onChange={e => setRefreshInterval(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm"
              >
                <option value="10">10 seconds</option>
                <option value="30">30 seconds</option>
                <option value="60">1 minute</option>
                <option value="300">5 minutes</option>
                <option value="600">10 minutes</option>
              </select>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Wallboard Mode</h3>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-white">Enable Wallboard Mode</div>
                <div className="text-xs text-slate-500 mt-1">Full-screen display for large monitors</div>
              </div>
              <button
                onClick={() => setWallboardMode(!wallboardMode)}
                className={`w-12 h-6 rounded-full transition-colors ${wallboardMode ? 'bg-blue-500' : 'bg-slate-700'}`}
              >
                <span className={`block w-5 h-5 bg-white rounded-full transition-transform ${wallboardMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Font Size</h3>
            <div className="space-y-2">
              {(['small', 'medium', 'large'] as const).map(size => (
                <label key={size} className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-slate-800/50">
                  <input type="radio" checked={fontSize === size} onChange={() => setFontSize(size)} className="accent-blue-500" />
                  <span className="text-white text-sm capitalize">{size}</span>
                </label>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Color Scheme</h3>
            <div className="space-y-2">
              {(['default', 'high-contrast', 'colorblind'] as const).map(scheme => (
                <label key={scheme} className="flex items-center gap-3 p-2 rounded cursor-pointer hover:bg-slate-800/50">
                  <input type="radio" checked={colorScheme === scheme} onChange={() => setColorScheme(scheme)} className="accent-blue-500" />
                  <span className="text-white text-sm capitalize">{scheme.replace('-', ' ')}</span>
                </label>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Alert Thresholds</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">CPU Utilization Warning (%)</label>
                <input type="number" defaultValue="70" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">CPU Utilization Critical (%)</label>
                <input type="number" defaultValue="90" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Memory Utilization Warning (%)</label>
                <input type="number" defaultValue="75" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Memory Utilization Critical (%)</label>
                <input type="number" defaultValue="95" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Bandwidth Utilization Warning (%)</label>
                <input type="number" defaultValue="80" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Severity Mapping</h3>
            <div className="space-y-3">
              {[
                { severity: 'P1', color: 'red', label: 'Critical' },
                { severity: 'P2', color: 'amber', label: 'High' },
                { severity: 'P3', color: 'blue', label: 'Medium' },
                { severity: 'P4', color: 'gray', label: 'Low' },
              ].map(item => (
                <div key={item.severity} className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full bg-${item.color}-500`} />
                    <span className="text-white text-sm font-mono">{item.severity}</span>
                    <span className="text-slate-400 text-sm">{item.label}</span>
                  </div>
                  <select className="px-2 py-1 bg-slate-950 border border-slate-700 rounded text-xs text-white">
                    <option>Auto-detect</option>
                    <option>Manual</option>
                  </select>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Escalation Rules</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
                <div>
                  <div className="text-white text-sm">P1 Auto-Escalate</div>
                  <div className="text-xs text-slate-500">Escalate after 15 minutes</div>
                </div>
                <input type="checkbox" defaultChecked className="accent-blue-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
                <div>
                  <div className="text-white text-sm">P2 Auto-Escalate</div>
                  <div className="text-xs text-slate-500">Escalate after 30 minutes</div>
                </div>
                <input type="checkbox" defaultChecked className="accent-blue-500" />
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
                <div>
                  <div className="text-white text-sm">P3 Auto-Escalate</div>
                  <div className="text-xs text-slate-500">Escalate after 1 hour</div>
                </div>
                <input type="checkbox" className="accent-blue-500" />
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Suppression Windows</h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-800/50 rounded">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white text-sm">Maintenance Window - AS-001</span>
                  <span className="text-xs text-green-400">Active</span>
                </div>
                <div className="text-xs text-slate-500">Until: 18:00 UTC today</div>
              </div>
              <button className="w-full py-2 border border-dashed border-slate-700 rounded text-sm text-slate-400 hover:border-slate-500 hover:text-white transition-colors">
                + Add Suppression Window
              </button>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Email Alerts</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">SMTP Server</label>
                <input type="text" defaultValue="smtp.netwatch.example.com" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Notification Email</label>
                <input type="email" defaultValue="noc-team@netwatch.example.com" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">Enable Email Alerts</span>
                <input type="checkbox" defaultChecked className="accent-blue-500" />
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">SMS Alerts</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">SMS Provider</label>
                <select className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm">
                  <option>Twilio</option>
                  <option>AWS SNS</option>
                  <option>Twilio</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Phone Number</label>
                <input type="tel" defaultValue="+1-800-NOC-WATCH" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">Enable SMS Alerts</span>
                <input type="checkbox" defaultChecked className="accent-blue-500" />
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">PagerDuty Integration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Service API Key</label>
                <input type="password" defaultValue="••••••••••••••••" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Integration Key</label>
                <input type="password" defaultValue="••••••••••••••••" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">Enable PagerDuty</span>
                <input type="checkbox" defaultChecked className="accent-blue-500" />
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Slack Webhooks</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Webhook URL</label>
                <input type="url" defaultValue="https://hooks.slack.com/services/••••••••••••••••" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Channel</label>
                <input type="text" defaultValue="#noc-alerts" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">Enable Slack Notifications</span>
                <input type="checkbox" defaultChecked className="accent-blue-500" />
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-300">User Management</h3>
              <Button variant="outline" size="sm">+ Add User</Button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 text-xs uppercase border-b border-slate-800">
                  <th className="text-left py-2 px-3">Name</th>
                  <th className="text-left py-2 px-3">Email</th>
                  <th className="text-left py-2 px-3">Role</th>
                  <th className="text-left py-2 px-3">Shift</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-right py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Marcus Chen', email: 'marcus@netwatchnoc.com', role: 'NOC Lead', shift: 'Day', status: 'Active' },
                  { name: 'Maria Torres', email: 'maria@netwatchnoc.com', role: 'Engineer', shift: 'Night', status: 'Active' },
                  { name: 'James Wilson', email: 'james@netwatchnoc.com', role: 'Engineer', shift: 'Day', status: 'Active' },
                  { name: 'Sarah Johnson', email: 'sarah@netwatchnoc.com', role: 'NOC Lead', shift: 'Night', status: 'Inactive' },
                ].map((user, i) => (
                  <tr key={i} className="border-b border-slate-800/50">
                    <td className="py-2 px-3 text-white font-mono">{user.name}</td>
                    <td className="py-2 px-3 text-slate-400 text-xs">{user.email}</td>
                    <td className="py-2 px-3 text-slate-300">{user.role}</td>
                    <td className="py-2 px-3 text-slate-400 text-xs">{user.shift}</td>
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded text-xs ${user.status === 'Active' ? 'bg-green-900/30 text-green-400' : 'bg-slate-800 text-slate-500'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button className="text-xs text-blue-400 hover:text-blue-300 mr-2">Edit</button>
                      <button className="text-xs text-red-400 hover:text-red-300">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Shift Assignments</h3>
            <div className="space-y-3">
              {[
                { shift: 'Day (07:00-19:00)', operator: 'Marcus Chen', station: 'A' },
                { shift: 'Night (19:00-07:00)', operator: 'Maria Torres', station: 'B' },
                { shift: 'Day (07:00-19:00)', operator: 'James Wilson', station: 'C' },
              ].map((assignment, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
                  <div>
                    <div className="text-white text-sm">{assignment.shift}</div>
                    <div className="text-xs text-slate-500">Station {assignment.station}</div>
                  </div>
                  <div className="text-sm text-blue-400 font-mono">{assignment.operator}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'datasources' && (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-300">SNMP Configuration</h3>
              <Button variant="outline" size="sm">+ Add Source</Button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 text-xs uppercase border-b border-slate-800">
                  <th className="text-left py-2 px-3">Source</th>
                  <th className="text-left py-2 px-3">Type</th>
                  <th className="text-left py-2 px-3">Polling Interval</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-right py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { source: 'Nagios Core', type: 'SNMP', interval: '30s', status: 'Connected' },
                  { source: 'Zabbix Server', type: 'SNMP', interval: '60s', status: 'Connected' },
                  { source: 'SolarWinds', type: 'API', interval: '30s', status: 'Connected' },
                  { source: 'Prometheus', type: 'HTTP', interval: '15s', status: 'Connected' },
                ].map((source, i) => (
                  <tr key={i} className="border-b border-slate-800/50">
                    <td className="py-2 px-3 text-white font-mono">{source.source}</td>
                    <td className="py-2 px-3 text-slate-400">{source.type}</td>
                    <td className="py-2 px-3 text-slate-400 font-mono text-xs">{source.interval}</td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-0.5 rounded text-xs bg-green-900/30 text-green-400">{source.status}</span>
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button className="text-xs text-blue-400 hover:text-blue-300 mr-2">Edit</button>
                      <button className="text-xs text-red-400 hover:text-red-300">Test</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">API Endpoints</h3>
            <div className="space-y-3">
              {[
                { name: 'NetBox API', url: 'https://netbox.netwatch.example.com/api', status: 'Active' },
                { name: 'Ansible Tower', url: 'https://ansible.netwatch.example.com/api', status: 'Active' },
                { name: 'ServiceNow', url: 'https://service NOW.netwatch.example.com/api', status: 'Active' },
              ].map((endpoint, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
                  <div>
                    <div className="text-white text-sm">{endpoint.name}</div>
                    <div className="text-xs text-slate-500 font-mono">{endpoint.url}</div>
                  </div>
                  <span className="text-xs text-green-400">{endpoint.status}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'maintenance' && (
        <div className="space-y-6">
          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Maintenance Windows</h3>
            <div className="space-y-3">
              {[
                { name: 'CR-001 Firmware Upgrade', start: '2026-08-16 02:00', end: '2026-08-16 04:00', status: 'Scheduled' },
                { name: 'DS-001 Port Replacement', start: '2026-08-17 22:00', end: '2026-08-18 02:00', status: 'Scheduled' },
                { name: 'OT-001 Optical Module Swap', start: '2026-08-20 03:00', end: '2026-08-20 05:00', status: 'Scheduled' },
              ].map((window, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
                  <div>
                    <div className="text-white text-sm">{window.name}</div>
                    <div className="text-xs text-slate-500">{window.start} - {window.end}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-xs bg-blue-900/30 text-blue-400">{window.status}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Scheduled Tasks</h3>
            <div className="space-y-3">
              {[
                { task: 'Daily Health Check', schedule: '00:00 UTC', status: 'Active' },
                { task: 'Weekly Report Generation', schedule: 'Monday 06:00 UTC', status: 'Active' },
                { task: 'Database Backup', schedule: '03:00 UTC Daily', status: 'Active' },
                { task: 'Log Rotation', schedule: '01:00 UTC Daily', status: 'Active' },
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
                  <div className="text-white text-sm">{task.task}</div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500 font-mono">{task.schedule}</span>
                    <span className="text-xs text-green-400">{task.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Backup Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Backup Location</label>
                <input type="text" defaultValue="/backup/noc-data" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">Enable Automated Backups</span>
                <input type="checkbox" defaultChecked className="accent-blue-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white">Retention Period (days)</span>
                <input type="number" defaultValue="30" className="w-24 px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm text-right" />
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
