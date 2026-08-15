import React from 'react';
import { MOCK_INCIDENTS } from '@/data/mock';

interface TabNavProps {
  activeTab: string;
  onTabChange: (_tabId: string) => void;
}

export function TabNav({ activeTab, onTabChange }: TabNavProps) {
  const incidentCount = MOCK_INCIDENTS.filter((i) => i.status !== 'resolved').length;
  const criticalCount = MOCK_INCIDENTS.filter((i) => i.severity === 'P1' && i.status !== 'resolved').length;

  const tabs = [
    { id: 'topology', label: 'Topology', minRole: 'viewer' as const },
    { id: 'devices', label: 'Device Health', minRole: 'viewer' as const },
    { id: 'bandwidth', label: 'Bandwidth', minRole: 'viewer' as const },
    { id: 'incidents', label: 'Active Incidents', minRole: 'viewer' as const, count: incidentCount, critical: criticalCount > 0 },
    { id: 'shift', label: 'Shift Log', minRole: 'engineer' as const },
    { id: 'reports', label: 'Reports', minRole: 'noc_lead' as const },
  ];

  const accessibleTabs = tabs;

  return (
    <nav className="bg-base-surface border-b border-base-border" role="navigation" aria-label="Main navigation">
      <div className="flex overflow-x-auto">
        {accessibleTabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-5 py-3.5 text-body-md font-medium whitespace-nowrap transition-all duration-150
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-base
                ${isActive
                  ? 'text-brand-blue border-b-2 border-brand-blue bg-brand-blue/5'
                  : 'text-base-muted hover:text-white hover:bg-base-surface-light'
                }
              `}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-body-xs font-mono font-bold ${
                  tab.critical ? 'bg-status-critical/20 text-status-critical' : 'bg-base-border text-base-muted'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
