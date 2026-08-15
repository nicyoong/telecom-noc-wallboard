import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [regionFilter, setRegionFilter] = React.useState('all');
  const [deviceTypeFilter, setDeviceTypeFilter] = React.useState('all');
  const [severityFilter, setSeverityFilter] = React.useState('all');
  const [timeRange, setTimeRange] = React.useState('1h');

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-base-surface border-r border-base-border z-50
          transform transition-transform duration-300 lg:translate-x-0 lg:static lg:h-auto lg:border-r lg:bg-transparent
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-label="Filter sidebar"
      >
        <div className="flex items-center justify-between p-4 border-b border-base-border lg:hidden">
          <h2 className="text-body-md font-semibold text-white">Filters</h2>
          <button onClick={onClose} className="text-base-muted hover:text-white" aria-label="Close sidebar">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-6">
          <div>
            <label className="block text-body-sm font-medium text-base-muted mb-2">Region</label>
            <select
              className="w-full bg-base-surface-light border border-base-border rounded-lg px-3 py-2 text-body-md text-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              aria-label="Filter by region"
            >
              <option value="all">All Regions</option>
              <option value="northeast">Northeast</option>
              <option value="southeast">Southeast</option>
              <option value="midwest">Midwest</option>
              <option value="southwest">Southwest</option>
              <option value="west_coast">West Coast</option>
            </select>
          </div>

          <div>
            <label className="block text-body-sm font-medium text-base-muted mb-2">Device Type</label>
            <select
              className="w-full bg-base-surface-light border border-base-border rounded-lg px-3 py-2 text-body-md text-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
              value={deviceTypeFilter}
              onChange={(e) => setDeviceTypeFilter(e.target.value)}
              aria-label="Filter by device type"
            >
              <option value="all">All Types</option>
              <option value="core_router">Core Router</option>
              <option value="distribution_switch">Distribution Switch</option>
              <option value="access_switch">Access Switch</option>
              <option value="optical_terminal">Optical Terminal</option>
              <option value="olt">OLT</option>
              <option value="firewall">Firewall</option>
              <option value="load_balancer">Load Balancer</option>
            </select>
          </div>

          <div>
            <label className="block text-body-sm font-medium text-base-muted mb-2">Severity</label>
            <select
              className="w-full bg-base-surface-light border border-base-border rounded-lg px-3 py-2 text-body-md text-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              aria-label="Filter by severity"
            >
              <option value="all">All Severities</option>
              <option value="P1">P1 - Critical</option>
              <option value="P2">P2 - High</option>
              <option value="P3">P3 - Medium</option>
              <option value="P4">P4 - Low</option>
            </select>
          </div>

          <div>
            <label className="block text-body-sm font-medium text-base-muted mb-2">Time Range</label>
            <select
              className="w-full bg-base-surface-light border border-base-border rounded-lg px-3 py-2 text-body-md text-white focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              aria-label="Filter by time range"
            >
              <option value="5m">Last 5 minutes</option>
              <option value="15m">Last 15 minutes</option>
              <option value="1h">Last 1 hour</option>
              <option value="6h">Last 6 hours</option>
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
            </select>
          </div>

          <button
            className="w-full py-2 text-body-sm text-base-muted hover:text-white border border-base-border rounded-lg hover:bg-base-surface-light transition-colors"
            onClick={() => {
              setRegionFilter('all');
              setDeviceTypeFilter('all');
              setSeverityFilter('all');
              setTimeRange('1h');
            }}
          >
            Reset Filters
          </button>
        </div>
      </aside>
    </>
  );
}
