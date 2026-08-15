'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { MOCK_DEVICES, MOCK_INCIDENTS, MOCK_BANDWIDTH } from '@/data/mock';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const VIEWS = [
  { id: 'topology', label: 'Network Topology' },
  { id: 'devices', label: 'Device Health' },
  { id: 'incidents', label: 'Active Incidents' },
  { id: 'bandwidth', label: 'Bandwidth Monitor' },
];

export default function WallboardPage() {
  const [currentView, setCurrentView] = useState(0);
  const [cycleInterval, setCycleInterval] = useState(30);
  const [isCycling, setIsCycling] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!isCycling) return;
    const timer = setInterval(() => {
      setCurrentView(prev => (prev + 1) % VIEWS.length);
    }, cycleInterval * 1000);
    return () => clearInterval(timer);
  }, [isCycling, cycleInterval]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      window.location.href = '/dashboard';
    }
    if (e.key === ' ') {
      e.preventDefault();
      setIsCycling(prev => !prev);
    }
    if (e.key === 'f') {
      toggleFullscreen();
    }
  }, [toggleFullscreen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const activeIncidents = MOCK_INCIDENTS.filter(i => i.status !== 'resolved');
  const criticalIncidents = activeIncidents.filter(i => i.severity === 'P1');

  const getStatusColor = (status: 'online' | 'degraded' | 'critical' | 'offline' | 'maintenance') => {
    switch (status) {
      case 'online': return 'text-status-online';
      case 'degraded': return 'text-status-degraded';
      case 'critical': return 'text-status-critical';
      case 'offline': return 'text-status-offline';
      case 'maintenance': return 'text-status-maintenance';
      default: return 'text-white';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-6xl font-bold font-mono text-white">NetWatch NOC</h1>
          <p className="text-2xl text-slate-400 mt-2">Network Operations Center - Wallboard Mode</p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold font-mono text-white">
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div className="text-2xl text-slate-400 mt-2">
            {currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div className="text-xl text-slate-500 mt-1">
            {currentTime.getUTCHours() >= 7 && currentTime.getUTCHours() < 19 ? 'DAY SHIFT' : 'NIGHT SHIFT'}
          </div>
        </div>
      </div>

      {/* Critical Incident Alert */}
      {criticalIncidents.length > 0 && (
        <div className="mb-8 p-6 bg-red-900/30 border-2 border-red-500 rounded-lg animate-pulse">
          <div className="flex items-center gap-4">
            <span className="text-6xl">🚨</span>
            <div>
              <div className="text-3xl font-bold text-red-400 mb-2">CRITICAL INCIDENTS DETECTED</div>
              <div className="text-2xl text-white font-mono">{criticalIncidents.length} P1 incidents active</div>
              <div className="text-xl text-red-300 mt-1">
                {criticalIncidents.map(i => i.title).join(' | ')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Content */}
      <div className="mb-8">
        <div className="text-4xl font-bold font-mono mb-6 text-blue-400">
          {VIEWS[currentView].label}
        </div>

        {currentView === 0 && (
          <div className="grid grid-cols-5 gap-6">
            {MOCK_DEVICES.slice(0, 10).map(device => (
              <Card key={device.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-mono text-white truncate">{device.hostname}</span>
                  <Badge status={device.status as any} label={device.status} />
                </div>
                <div className="text-3xl font-bold font-mono text-white">{device.ip_address}</div>
                <div className="text-lg text-slate-400 mt-2">{device.region.replace(/_/g, ' ')}</div>
                <div className="text-lg text-slate-400">Uptime: {device.uptime_hours.toLocaleString()}h</div>
                <div className="text-lg text-slate-400">CPU: <span className={getStatusColor(device.cpu_utilization > 80 ? 'critical' : 'online')}>{device.cpu_utilization}%</span></div>
              </Card>
            ))}
          </div>
        )}

        {currentView === 1 && (
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="text-3xl font-bold font-mono mb-4">Active Incidents ({activeIncidents.length})</div>
              <div className="space-y-4">
                {activeIncidents.map(incident => (
                  <div key={incident.id} className={`p-4 border-l-4 ${
                    incident.severity === 'P1' ? 'border-red-500 bg-red-900/20' :
                    incident.severity === 'P2' ? 'border-amber-500 bg-amber-900/20' :
                    'border-blue-500 bg-blue-900/20'
                  }`}>
                    <div className="flex items-center gap-4">
                      <span className={`text-2xl font-bold font-mono ${
                        incident.severity === 'P1' ? 'text-red-400' :
                        incident.severity === 'P2' ? 'text-amber-400' :
                        'text-blue-400'
                      }`}>{incident.severity}</span>
                      <div className="flex-1">
                        <div className="text-xl text-white font-mono">{incident.title}</div>
                        <div className="text-lg text-slate-400 mt-1">
                          {incident.affected_services.join(', ')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg text-white font-mono">{incident.assigned_to}</div>
                        <div className="text-sm text-slate-500 mt-1">
                          {Math.floor((Date.now() - new Date(incident.created_at).getTime()) / 3600000)}h {Math.floor(((Date.now() - new Date(incident.created_at).getTime()) % 3600000) / 60000)}m
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold font-mono mb-4">Quick Stats</div>
              <div className="space-y-4">
                <div className="p-4 bg-slate-900 rounded">
                  <div className="text-slate-400 text-lg">Total Devices</div>
                  <div className="text-5xl font-bold text-white font-mono">{MOCK_DEVICES.length}</div>
                </div>
                <div className="p-4 bg-slate-900 rounded">
                  <div className="text-slate-400 text-lg">Online</div>
                  <div className="text-5xl font-bold text-status-online font-mono">
                    {MOCK_DEVICES.filter(d => d.status === 'online').length}
                  </div>
                </div>
                <div className="p-4 bg-slate-900 rounded">
                  <div className="text-slate-400 text-lg">Critical</div>
                  <div className="text-5xl font-bold text-status-critical font-mono">
                    {MOCK_DEVICES.filter(d => d.status === 'critical').length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 2 && (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-3xl font-bold font-mono mb-4">Bandwidth by Region</div>
              <div className="space-y-4">
                {[
                  { region: 'Northeast', utilization: 72, capacity: 40 },
                  { region: 'West Coast', utilization: 85, capacity: 40 },
                  { region: 'Midwest', utilization: 45, capacity: 30 },
                  { region: 'Southeast', utilization: 63, capacity: 25 },
                  { region: 'Southwest', utilization: 38, capacity: 20 },
                ].map(region => (
                  <div key={region.region} className="p-4 bg-slate-900 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl text-white font-mono">{region.region}</span>
                      <span className="text-xl text-white font-mono">{region.utilization}G/{region.capacity}G</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-6">
                      <div
                        className={`h-6 rounded-full ${region.utilization > 80 ? 'bg-red-500' : region.utilization > 60 ? 'bg-amber-500' : 'bg-green-500'}`}
                        style={{ width: `${(region.utilization / region.capacity) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold font-mono mb-4">Top Talkers</div>
              <div className="space-y-3">
                {[
                  { source: '10.0.1.1', destination: '10.0.2.1', bandwidth: '850 Mbps' },
                  { source: '10.0.1.2', destination: '10.0.3.5', bandwidth: '420 Mbps' },
                  { source: '10.0.2.1', destination: '10.0.4.8', bandwidth: '380 Mbps' },
                  { source: '10.0.3.3', destination: '10.0.5.2', bandwidth: '290 Mbps' },
                  { source: '10.0.4.1', destination: '10.0.6.1', bandwidth: '150 Mbps' },
                ].map((talker, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-900 rounded">
                    <div>
                      <div className="text-lg text-white font-mono">{talker.source} → {talker.destination}</div>
                    </div>
                    <span className="text-2xl font-bold text-blue-400 font-mono">{talker.bandwidth}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 3 && (
          <div className="grid grid-cols-4 gap-6">
            {MOCK_DEVICES.slice(0, 8).map(device => (
              <Card key={device.id} className="p-6">
                <div className="text-2xl font-bold text-white font-mono mb-2">{device.hostname}</div>
                <div className="text-lg text-slate-400 mb-4">{device.ip_address}</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">CPU</span>
                    <span className={`text-xl font-mono ${device.cpu_utilization > 80 ? 'text-red-400' : 'text-white'}`}>{device.cpu_utilization}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3">
                    <div className={`h-3 rounded-full ${device.cpu_utilization > 80 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${device.cpu_utilization}%` }} />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-slate-400">Memory</span>
                    <span className="text-xl font-mono text-white">{device.memory_utilization}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3">
                    <div className="h-3 rounded-full bg-amber-500" style={{ width: `${device.memory_utilization}%` }} />
                  </div>
                </div>
                <div className="mt-4 text-lg text-slate-400">Uptime: {device.uptime_hours.toLocaleString()}h</div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-2xl text-slate-400">
            Auto-cycle: <span className={isCycling ? 'text-green-400' : 'text-slate-500'}>{isCycling ? 'ON' : 'OFF'}</span>
          </div>
          <div className="text-2xl text-slate-400">
            Interval: <span className="text-white font-mono">{cycleInterval}s</span>
          </div>
          <div className="text-2xl text-slate-400">
            View: <span className="text-white font-mono">{currentView + 1}/{VIEWS.length}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCycling(!isCycling)}
            className="px-6 py-3 bg-slate-800 border border-slate-700 rounded text-2xl text-white hover:bg-slate-700 transition-colors"
          >
            {isCycling ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={toggleFullscreen}
            className="px-6 py-3 bg-slate-800 border border-slate-700 rounded text-2xl text-white hover:bg-slate-700 transition-colors"
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="px-6 py-3 bg-red-600/20 border border-red-600/50 rounded text-2xl text-red-400 hover:bg-red-600/30 transition-colors"
          >
            Exit Wallboard
          </button>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="mt-8 text-center text-slate-500 text-lg">
        <span className="mx-4"><kbd className="px-2 py-1 bg-slate-800 rounded text-white">ESC</kbd> Exit</span>
        <span className="mx-4"><kbd className="px-2 py-1 bg-slate-800 rounded text-white">SPACE</kbd> Pause/Play</span>
        <span className="mx-4"><kbd className="px-2 py-1 bg-slate-800 rounded text-white">F</kbd> Toggle Fullscreen</span>
      </div>
    </div>
  );
}
