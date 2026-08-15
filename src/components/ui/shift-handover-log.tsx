import React from 'react';
import { MOCK_SHIFT_LOGS } from '@/data/mock';
import type { ShiftLog } from '@/types';

interface ShiftHandoverLogProps {
  logs?: ShiftLog[];
}

export function ShiftHandoverLog({ logs = MOCK_SHIFT_LOGS }: ShiftHandoverLogProps) {
  const latestLog = logs[0];

  if (!latestLog) {
    return (
      <div className="noc-card">
        <div className="flex items-center justify-center py-8 text-base-muted">
          <p>No shift logs available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="noc-card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-body-md font-semibold text-white">Current Shift Handover</h3>
        <span className="text-body-sm font-mono text-base-muted">
          {new Date(latestLog.entry_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-body-sm">
        <div>
          <p className="text-base-muted mb-1">Operator</p>
          <p className="font-mono text-white">{latestLog.operator}</p>
        </div>
        <div>
          <p className="text-base-muted mb-1">Station</p>
          <p className="font-mono text-white">{latestLog.station}</p>
        </div>
        <div>
          <p className="text-base-muted mb-1">Shift</p>
          <p className="font-mono text-white capitalize">{latestLog.shift}</p>
        </div>
        <div>
          <p className="text-base-muted mb-1">Incidents Handled</p>
          <p className="font-mono text-white">{latestLog.incidents_handled}</p>
        </div>
      </div>

      {latestLog.equipment_issues.length > 0 && (
        <div>
          <p className="text-base-muted text-body-sm mb-2">Equipment Issues</p>
          <ul className="space-y-1">
            {latestLog.equipment_issues.map((issue, i) => (
              <li key={i} className="flex items-start gap-2 text-body-sm font-mono text-status-degraded">
                <span className="w-1.5 h-1.5 rounded-full bg-status-degraded mt-1.5 shrink-0" />
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {latestLog.notes && (
        <div>
          <p className="text-base-muted text-body-sm mb-2">Handover Notes</p>
          <p className="text-body-sm text-white bg-base-surface-light rounded-lg p-3 font-mono leading-relaxed">
            {latestLog.notes}
          </p>
        </div>
      )}
    </div>
  );
}
