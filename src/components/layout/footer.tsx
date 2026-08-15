import React from 'react';

interface FooterProps {
  currentYear?: number;
}

export function Footer({ currentYear = new Date().getFullYear() }: FooterProps) {
  return (
    <footer className="bg-base-surface border-t border-base-border px-4 py-3 mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-body-sm">
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <div className="flex items-center gap-2 text-base-muted">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>NOC Hotline: <span className="font-mono text-brand-blue">1-800-NOC-WATCH</span></span>
          </div>
          <div className="flex items-center gap-2 text-base-muted">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Escalation: <span className="font-mono text-status-degraded">P1 → NOC Lead (2min) → Director (5min)</span></span>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-status-optimal" />
            <span className="text-base-muted">System: <span className="text-status-optimal font-mono">Operational</span></span>
          </div>
          <span className="text-base-border">|</span>
          <span className="text-base-muted font-mono">v2.4.1</span>
          <span className="text-base-border">|</span>
          <span className="text-base-muted">© {currentYear} NetWatch Inc. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
