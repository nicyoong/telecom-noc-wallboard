'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono">User Profile</h1>
          <p className="text-sm text-slate-400 mt-1">Manage your account settings and preferences</p>
        </div>
        <Button variant="outline" onClick={logout}>Sign Out</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-blue-500/20 border-2 border-blue-500/40 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-bold text-blue-400">{user.name.charAt(0)}</span>
            </div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-sm text-slate-400 mt-1">{user.email}</p>
            <Badge status="online" label={user.role.replace('_', ' ')} className="mt-2" />
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-300">Contact Information</h3>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+1-555-0123"
                    disabled={!isEditing}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm disabled:opacity-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Pager</label>
                <input
                  type="text"
                  defaultValue="NOC-001"
                  disabled={!isEditing}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm disabled:opacity-50"
                />
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Shift Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Current Shift</label>
                <div className="text-white font-mono">Day Shift</div>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Station</label>
                <div className="text-white">Station A - Main Console</div>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Shift Start</label>
                <div className="text-white font-mono">07:00 UTC</div>
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">Shift End</label>
                <div className="text-white font-mono">19:00 UTC</div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Certifications & Training</h3>
            <div className="space-y-3">
              {[
                { cert: 'CCNA', issuer: 'Cisco', date: '2024-06-15', expiry: '2026-06-15' },
                { cert: 'JNCIA', issuer: 'Juniper', date: '2024-03-20', expiry: '2026-03-20' },
                { cert: 'ITIL v4', issuer: 'AXELOS', date: '2023-11-10', expiry: '2025-11-10' },
              ].map((cert, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
                  <div>
                    <div className="text-white text-sm font-mono">{cert.cert}</div>
                    <div className="text-xs text-slate-500">{cert.issuer}</div>
                  </div>
                  <div className="text-xs text-slate-400">
                    <div>Issued: {cert.date}</div>
                    <div>Expires: {cert.expiry}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-slate-300 mb-4">Recent Activity</h3>
            <div className="space-y-2">
              {[
                { action: 'Acknowledged incident INC-001', time: '2 minutes ago' },
                { action: 'Updated device CR-001 configuration', time: '15 minutes ago' },
                { action: 'Started shift handover', time: '1 hour ago' },
                { action: 'Logged in', time: '2 hours ago' },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-slate-800/50 last:border-0">
                  <span className="text-sm text-white">{activity.action}</span>
                  <span className="text-xs text-slate-500 font-mono">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-300">Security</h3>
              <Button variant="outline" size="sm" onClick={() => setShowPasswordChange(!showPasswordChange)}>
                Change Password
              </Button>
            </div>
            {showPasswordChange && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Current Password</label>
                  <input type="password" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">New Password</label>
                  <input type="password" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 mb-1">Confirm New Password</label>
                  <input type="password" className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded text-white text-sm" />
                </div>
                <Button variant="primary" size="sm">Update Password</Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
