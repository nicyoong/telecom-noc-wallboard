'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ESCALATION_LEVELS = [
  {
    level: 1,
    name: 'Level 1 - NOC Engineer',
    contacts: [
      { name: 'Marcus Chen', role: 'NOC Lead', phone: '+1-800-NOC-0001', email: 'marcus@netwatchnoc.com', availability: '24/7' },
      { name: 'Maria Torres', role: 'Engineer', phone: '+1-800-NOC-0002', email: 'maria@netwatchnoc.com', availability: '24/7' },
      { name: 'James Wilson', role: 'Engineer', phone: '+1-800-NOC-0003', email: 'james@netwatchnoc.com', availability: '24/7' },
    ],
  },
  {
    level: 2,
    name: 'Level 2 - Network Manager',
    contacts: [
      { name: 'Sarah Johnson', role: 'Network Manager', phone: '+1-800-NOC-1001', email: 'sarah@netwatchnoc.com', availability: 'Business Hours' },
      { name: 'David Park', role: 'Senior Engineer', phone: '+1-800-NOC-1002', email: 'david@netwatchnoc.com', availability: 'On-Call' },
    ],
  },
  {
    level: 3,
    name: 'Level 3 - VP Engineering',
    contacts: [
      { name: 'Robert Chen', role: 'VP Engineering', phone: '+1-800-NOC-2001', email: 'robert@netwatchnoc.com', availability: 'Emergency Only' },
    ],
  },
  {
    level: 'exec',
    name: 'Executive',
    contacts: [
      { name: 'Lisa Wang', role: 'CTO', phone: '+1-800-NOC-3001', email: 'lisa@netwatchnoc.com', availability: 'Critical Only' },
    ],
  },
];

const SEVERITY_MAP = [
  { severity: 'P1', level: 1, responseTime: '15 min', resolutionTime: '4 hours' },
  { severity: 'P2', level: 2, responseTime: '30 min', resolutionTime: '8 hours' },
  { severity: 'P3', level: 2, responseTime: '1 hour', resolutionTime: '24 hours' },
  { severity: 'P4', level: 1, responseTime: '4 hours', resolutionTime: '72 hours' },
];

const ESCALATION_HISTORY = [
  { time: '2026-08-15 22:32:00', incident: 'INC-001', from: 'Level 1', to: 'Level 2', reason: 'No response in 15 minutes' },
  { time: '2026-08-15 22:15:00', incident: 'INC-002', from: 'Level 1', to: 'Level 1', reason: 'Auto-created' },
  { time: '2026-08-14 18:45:00', incident: 'INC-003', from: 'Level 2', to: 'Level 3', reason: 'SLA breach imminent' },
];

const AFTER_HOURS_CONTACTS = [
  { name: 'On-Call Engineer', phone: '+1-800-NOC-9999', email: 'oncall@netwatchnoc.com' },
  { name: 'NOC Supervisor', phone: '+1-800-NOC-8888', email: 'supervisor@netwatchnoc.com' },
];

const VENDOR_CONTACTS = [
  { vendor: 'Cisco TAC', phone: '+1-800-553-2447', email: 'tac@cisco.com', supportLevel: 'P1/P2' },
  { vendor: 'Juniper Support', phone: '+1-866-327-4737', email: 'support@juniper.net', supportLevel: 'P1/P2' },
  { vendor: 'F5 Support', phone: '+1-877-435-3847', email: 'support@f5.com', supportLevel: 'P1' },
];

export default function EscalationPage() {
  const [activeTab, setActiveTab] = useState<'matrix' | 'history' | 'afterhours' | 'vendors'>('matrix');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono">Escalation Matrix</h1>
          <p className="text-sm text-slate-400 mt-1">Incident escalation contacts and procedures</p>
        </div>
        <Button variant="outline">Test Escalation</Button>
      </div>

      <div className="flex gap-1 border-b border-slate-800">
        {[
          { id: 'matrix', label: 'Escalation Matrix' },
          { id: 'history', label: 'History' },
          { id: 'afterhours', label: 'After Hours' },
          { id: 'vendors', label: 'Vendors' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Severity to Level Mapping</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-500 text-xs uppercase border-b border-slate-800">
                  <th className="text-left py-2 px-3">Severity</th>
                  <th className="text-left py-2 px-3">Escalation Level</th>
                  <th className="text-left py-2 px-3">Response Time</th>
                  <th className="text-left py-2 px-3">Resolution Time</th>
                </tr>
              </thead>
              <tbody>
                {SEVERITY_MAP.map(row => (
                  <tr key={row.severity} className="border-b border-slate-800/50">
                    <td className="py-2 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        row.severity === 'P1' ? 'bg-red-900/30 text-red-400' :
                        row.severity === 'P2' ? 'bg-amber-900/30 text-amber-400' :
                        row.severity === 'P3' ? 'bg-blue-900/30 text-blue-400' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {row.severity}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-white font-mono">Level {row.level}</td>
                    <td className="py-2 px-3 text-slate-300">{row.responseTime}</td>
                    <td className="py-2 px-3 text-slate-300">{row.resolutionTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ESCALATION_LEVELS.map(level => (
              <Card key={level.level}>
                <h3 className="text-sm font-bold text-slate-300 mb-4">{level.name}</h3>
                <div className="space-y-3">
                  {level.contacts.map((contact, i) => (
                    <div key={i} className="p-3 bg-slate-800/50 rounded">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm font-medium">{contact.name}</span>
                        <Badge status="online" label={contact.availability} />
                      </div>
                      <div className="text-xs text-slate-500">{contact.role}</div>
                      <div className="text-xs text-slate-400 font-mono mt-1">{contact.phone}</div>
                      <div className="text-xs text-slate-500 font-mono">{contact.email}</div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Escalation Path Visualization</h3>
            <div className="flex items-center justify-center gap-4 py-8">
              {ESCALATION_LEVELS.map((level, i) => (
                <div key={level.level} className="flex items-center">
                  <div className="text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-white ${
                      level.level === 1 ? 'bg-blue-500' :
                      level.level === 2 ? 'bg-amber-500' :
                      level.level === 3 ? 'bg-red-500' :
                      'bg-purple-500'
                    }`}>
                      L{level.level}
                    </div>
                    <div className="text-xs text-slate-400 mt-2">{level.name.split(' - ')[1]}</div>
                  </div>
                  {i < ESCALATION_LEVELS.length - 1 && (
                    <svg className="w-8 h-8 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'history' && (
        <Card>
          <h3 className="text-sm font-bold text-slate-300 mb-4">Escalation History</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-500 text-xs uppercase border-b border-slate-800">
                <th className="text-left py-2 px-3">Time</th>
                <th className="text-left py-2 px-3">Incident</th>
                <th className="text-left py-2 px-3">From</th>
                <th className="text-left py-2 px-3">To</th>
                <th className="text-left py-2 px-3">Reason</th>
              </tr>
            </thead>
            <tbody>
              {ESCALATION_HISTORY.map((entry, i) => (
                <tr key={i} className="border-b border-slate-800/50">
                  <td className="py-2 px-3 text-slate-400 font-mono text-xs">{entry.time}</td>
                  <td className="py-2 px-3 text-white font-mono text-xs">{entry.incident}</td>
                  <td className="py-2 px-3 text-slate-300">{entry.from}</td>
                  <td className="py-2 px-3 text-white font-mono">{entry.to}</td>
                  <td className="py-2 px-3 text-slate-400 text-xs">{entry.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {activeTab === 'afterhours' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AFTER_HOURS_CONTACTS.map((contact, i) => (
            <Card key={i}>
              <h3 className="text-sm font-bold text-slate-300 mb-4">{contact.name}</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Phone</span>
                  <span className="text-white font-mono text-sm">{contact.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">Email</span>
                  <span className="text-white font-mono text-sm">{contact.email}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'vendors' && (
        <Card>
          <h3 className="text-sm font-bold text-slate-300 mb-4">Vendor Support Contacts</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-500 text-xs uppercase border-b border-slate-800">
                <th className="text-left py-2 px-3">Vendor</th>
                <th className="text-left py-2 px-3">Phone</th>
                <th className="text-left py-2 px-3">Email</th>
                <th className="text-left py-2 px-3">Support Level</th>
              </tr>
            </thead>
            <tbody>
              {VENDOR_CONTACTS.map((vendor, i) => (
                <tr key={i} className="border-b border-slate-800/50">
                  <td className="py-2 px-3 text-white font-medium">{vendor.vendor}</td>
                  <td className="py-2 px-3 text-slate-400 font-mono text-sm">{vendor.phone}</td>
                  <td className="py-2 px-3 text-slate-400 font-mono text-sm">{vendor.email}</td>
                  <td className="py-2 px-3">
                    <span className="px-2 py-0.5 rounded text-xs bg-blue-900/30 text-blue-400">{vendor.supportLevel}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
