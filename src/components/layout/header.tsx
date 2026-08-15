import React from 'react';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const now = new Date();
  const isDayShift = now.getUTCHours() >= 7 && now.getUTCHours() < 19;
  const timezone = typeof Intl !== 'undefined' ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC';

  return (
    <header className="bg-base-surface border-b border-base-border px-4 py-3 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden text-base-muted hover:text-white p-1"
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center">
            <svg className="w-5 h-5 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h1 className="text-body-lg font-bold text-white leading-none">NetWatch NOC</h1>
            <p className="text-body-xs text-base-muted font-mono">Network Operations Center</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 text-body-sm">
          <span className={`px-2.5 py-1 rounded-full font-mono text-body-xs font-bold ${isDayShift ? 'bg-status-degraded/20 text-status-degraded' : 'bg-brand-cyan/20 text-brand-cyan'}`}>
            {isDayShift ? 'DAY SHIFT' : 'NIGHT SHIFT'}
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-body-sm font-mono text-base-muted">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
          <span className="text-base-border">|</span>
          <span className="text-base-muted">{timezone}</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-base-border">
          <div className="text-right">
            <p className="text-body-sm font-medium text-white">Marcus Chen</p>
            <p className="text-body-xs text-base-muted font-mono capitalize">noc_lead</p>
          </div>
          <a
            href="/login"
            className="text-body-sm text-base-muted hover:text-status-critical transition-colors"
            aria-label="Sign out"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
