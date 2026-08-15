'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SYSTEM_COMPONENTS = [
  { name: 'Database', status: 'online', uptime: '99.99%', responseTime: '12ms', errorRate: '0.01%' },
  { name: 'API Server', status: 'online', uptime: '99.97%', responseTime: '45ms', errorRate: '0.03%' },
  { name: 'Polling Engine', status: 'online', uptime: '99.95%', responseTime: '120ms', errorRate: '0.05%' },
  { name: 'Alert Engine', status: 'degraded', uptime: '99.80%', responseTime: '250ms', errorRate: '0.15%' },
  { name: 'UI/Frontend', status: 'online', uptime: '99.99%', responseTime: '85ms', errorRate: '0.01%' },
];

const PERFORMANCE_METRICS = [
  { name: 'Avg Response Time', value: '86ms', trend: 'stable' },
  { name: 'Throughput', value: '1,247 req/s', trend: 'up' },
  { name: 'Error Rate', value: '0.05%', trend: 'down' },
  { name: 'CPU Usage', value: '42%', trend: 'stable' },
  { name: 'Memory Usage', value: '68%', trend: 'up' },
  { name: 'Disk Usage', value: '54%', trend: 'stable' },
];

const RECENT_EVENTS = [
  { time: '22:47:58', level: 'info', message: 'Database backup completed successfully' },
  { time: '22:45:00', level: 'warning', message: 'Alert Engine response time increased to 250ms' },
  { time: '22:30:00', level: 'info', message: 'Polling engine restarted after scheduled update' },
  { time: '22:15:00', level: 'error', message: 'API Server timeout on /api/v1/devices endpoint' },
  { time: '22:00:00', level: 'info', message: 'Daily health check completed - all systems nominal' },
];

const LOG_ENTRIES = [
  { time: '22:47:58', level: 'INFO', component: 'Database', message: 'Backup completed successfully' },
  { time: '22:47:45', level: 'INFO', component: 'API', message: 'Request processed: GET /api/v1/incidents (200)' },
  { time: '22:47:30', level: 'WARNING', component: 'AlertEngine', message: 'Response time threshold exceeded: 250ms > 200ms' },
  { time: '22:47:15', level: 'INFO', component: 'Polling', message: 'SNMP poll completed for 248 devices' },
  { time: '22:47:00', level: 'ERROR', component: 'API', message: 'Timeout on /api/v1/devices endpoint (5000ms)' },
  { time: '22:46:45', level: 'INFO', component: 'Database', message: 'Connection pool status: 45/100 active' },
];

export default function HealthPage() {
  const [logFilter, setLogFilter] = useState('all');
  const [showDiagnostic, setShowDiagnostic] = useState(false);

  const filteredLogs = logFilter === 'all'
    ? LOG_ENTRIES
    : LOG_ENTRIES.filter(log => log.level.toLowerCase() === logFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono">System Health</h1>
          <p className="text-sm text-slate-400 mt-1">NOC platform status and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-white hover:bg-slate-700">
            Run Diagnostics
          </button>
          <button className="px-3 py-1.5 bg-red-600/20 border border-red-600/50 rounded text-sm text-red-400 hover:bg-red-600/30">
            Restart Services
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {SYSTEM_COMPONENTS.map(component => (
          <Card key={component.name} className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${
                component.status === 'online' ? 'bg-status-online' :
                component.status === 'degraded' ? 'bg-status-degraded' :
                'bg-status-critical'
              }`} />
              <span className="text-sm text-slate-300">{component.name}</span>
            </div>
            <div className="text-2xl font-bold text-white font-mono">{component.uptime}</div>
            <div className="text-xs text-slate-500 mt-1">Uptime</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {PERFORMANCE_METRICS.map(metric => (
          <Card key={metric.name} className="p-4">
            <div className="text-xs text-slate-500 mb-1">{metric.name}</div>
            <div className="text-xl font-bold text-white font-mono">{metric.value}</div>
            <div className={`text-xs mt-1 ${
              metric.trend === 'up' ? 'text-red-400' :
              metric.trend === 'down' ? 'text-green-400' :
              'text-slate-400'
            }`}>
              {metric.trend === 'up' ? '↑' : metric.trend === 'down' ? '↓' : '→'} {metric.trend}
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-sm font-bold text-slate-300 mb-4">Recent Events</h3>
          <div className="space-y-2">
            {RECENT_EVENTS.map((event, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-800/50 last:border-0">
                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  event.level === 'error' ? 'bg-red-500' :
                  event.level === 'warning' ? 'bg-amber-500' :
                  'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white">{event.message}</div>
                  <div className="text-xs text-slate-500 font-mono">{event.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-300">Resource Utilization</h3>
          </div>
          <div className="space-y-4">
            {[
              { name: 'CPU', value: 42, color: 'bg-blue-500' },
              { name: 'Memory', value: 68, color: 'bg-amber-500' },
              { name: 'Disk', value: 54, color: 'bg-blue-500' },
              { name: 'Network', value: 35, color: 'bg-green-500' },
            ].map(resource => (
              <div key={resource.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-300">{resource.name}</span>
                  <span className="text-sm text-white font-mono">{resource.value}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${resource.color}`}
                    style={{ width: `${resource.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-300">System Logs</h3>
          <div className="flex gap-2">
            {['all', 'error', 'warning', 'info'].map(filter => (
              <button
                key={filter}
                onClick={() => setLogFilter(filter)}
                className={`px-2 py-1 rounded text-xs font-mono transition-colors ${
                  logFilter === filter
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                    : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
                }`}
              >
                {filter.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {filteredLogs.map((log, i) => (
            <div key={i} className="flex items-center gap-4 py-1.5 px-2 rounded hover:bg-slate-800/50 font-mono text-xs">
              <span className="text-slate-500 w-16 shrink-0">{log.time}</span>
              <span className={`w-12 shrink-0 ${
                log.level === 'ERROR' ? 'text-red-400' :
                log.level === 'WARNING' ? 'text-amber-400' :
                'text-blue-400'
              }`}>{log.level}</span>
              <span className="text-slate-400 w-24 shrink-0">{log.component}</span>
              <span className="text-white flex-1">{log.message}</span>
            </div>
          ))}
        </div>
      </Card>

      {showDiagnostic && (
        <Card>
          <h3 className="text-sm font-bold text-slate-300 mb-4">Diagnostic Results</h3>
          <div className="space-y-3">
            {[
              { test: 'Database Connectivity', result: 'PASS', details: 'Response time: 12ms' },
              { test: 'API Health Check', result: 'PASS', details: 'All endpoints responsive' },
              { test: 'Polling Engine Status', result: 'PASS', details: '248 devices polled successfully' },
              { test: 'Alert Engine Status', result: 'WARNING', details: 'Response time above threshold' },
              { test: 'Disk Space', result: 'PASS', details: '46% available' },
              { test: 'Memory Usage', result: 'PASS', details: '68% utilized' },
            ].map((diagnostic, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
                <span className="text-white text-sm">{diagnostic.test}</span>
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-mono ${
                    diagnostic.result === 'PASS' ? 'text-green-400' :
                    diagnostic.result === 'WARNING' ? 'text-amber-400' :
                    'text-red-400'
                  }`}>{diagnostic.result}</span>
                  <span className="text-xs text-slate-500">{diagnostic.details}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
