import React from 'react';
import { MOCK_SHIFT_LOGS } from '@/data/mock';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { DataTable } from '@/components/ui/data-table';
import { ShiftHandoverLog } from '@/components/ui/shift-handover-log';
import type { ShiftLog } from '@/types';

export function ShiftLogView() {
  const columns = [
    {
      key: 'date',
      label: 'Date',
      render: (row: ShiftLog) => (
        <span className="font-mono text-body-md">
          {new Date(row.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      ),
    },
    {
      key: 'shift',
      label: 'Shift',
      render: (row: ShiftLog) => (
        <span
          className={`font-mono text-body-md capitalize ${
            row.shift === 'day' ? 'text-status-degraded' : 'text-brand-cyan'
          }`}
        >
          {row.shift}
        </span>
      ),
    },
    {
      key: 'operator',
      label: 'Operator',
      render: (row: ShiftLog) => (
        <span className="font-mono text-body-md text-brand-blue">{row.operator}</span>
      ),
    },
    {
      key: 'station',
      label: 'Station',
      render: (row: ShiftLog) => <span className="text-body-sm">{row.station}</span>,
    },
    {
      key: 'entry_time',
      label: 'In / Out',
      render: (row: ShiftLog) => (
        <span className="font-mono text-body-sm text-base-muted">
          {new Date(row.entry_time).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
          {row.exit_time
            ? ` — ${new Date(row.exit_time).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}`
            : ' — Active'}
        </span>
      ),
    },
    {
      key: 'incidents_handled',
      label: 'Incidents',
      render: (row: ShiftLog) => (
        <span className="font-mono text-body-md">{row.incidents_handled}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Personnel"
        title="Shift Handover Log"
        subtitle="Operator shift records and handover notes"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <DataTable<ShiftLog>
              columns={columns}
              data={MOCK_SHIFT_LOGS}
              emptyMessage="No shift logs recorded."
            />
          </Card>
        </div>
        <div>
          <ShiftHandoverLog />
        </div>
      </div>
    </div>
  );
}
