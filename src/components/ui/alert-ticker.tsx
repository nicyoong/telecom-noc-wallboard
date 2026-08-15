import React from 'react';
import { MOCK_INCIDENTS } from '@/data/mock';
import { SeverityBadge } from './severity-indicator';
import type { Incident } from '@/types';

interface AlertTickerProps {
  incidents?: Incident[];
}

export function AlertTicker({ incidents = MOCK_INCIDENTS.filter((i) => i.severity === 'P1') }: AlertTickerProps) {
  if (incidents.length === 0) return null;

  const messages = incidents.map((inc) => `${inc.severity} ${inc.title}`);

  return (
    <div
      className="bg-status-critical/10 border-y border-status-critical/30 py-1.5 overflow-hidden"
      role="alert"
      aria-live="polite"
      aria-label="Critical alerts"
    >
      <div className="ticker-wrap">
        <div className="ticker-content font-mono text-body-sm text-status-critical">
          <span className="inline-flex items-center gap-6">
            {messages.map((msg, i) => (
              <span key={i} className="inline-flex items-center gap-2 shrink-0">
                <span className="inline-flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-status-critical animate-pulse" />
                  <SeverityBadge severity="P1" />
                </span>
                {msg}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
