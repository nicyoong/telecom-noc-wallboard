import React, { useState, useCallback } from 'react';
import { MOCK_INCIDENTS } from '@/data/mock';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { DataTable } from '@/components/ui/data-table';
import { SeverityIndicator } from '@/components/ui/severity-indicator';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/toast';
import type { Incident } from '@/types';

export function IncidentsView() {
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [escalationNote, setEscalationNote] = useState('');
  const { addToast } = useToast();

  const activeIncidents = MOCK_INCIDENTS.filter(
    (i) => i.status === 'active' || i.status === 'acknowledged' || i.status === 'investigating',
  );

  const handleAcknowledge = useCallback(
    (incident: Incident) => {
      addToast({
        type: 'success',
        title: 'Incident Acknowledged',
        message: `${incident.id} has been acknowledged by ${incident.assigned_to}`,
      });
    },
    [addToast],
  );

  const handleRowClick = useCallback(
    (row: Incident) => {
      setSelectedIncident(row);
    },
    [],
  );

  const columns = [
    {
      key: 'severity',
      label: 'Severity',
      render: (row: Incident) => <SeverityIndicator severity={row.severity} />,
    },
    {
      key: 'title',
      label: 'Incident',
      render: (row: Incident) => (
        <div>
          <p className="text-body-md font-medium text-white">{row.title}</p>
          <p className="text-body-sm text-base-muted font-mono mt-0.5">{row.id}</p>
        </div>
      ),
    },
    {
      key: 'region',
      label: 'Region',
      render: (row: Incident) => (
        <span className="text-body-sm capitalize">{row.region.replace('_', ' ')}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row: Incident) => (
        <Badge
          status={
            row.status === 'investigating'
              ? 'degraded'
              : row.status === 'resolved'
                ? 'online'
                : 'online'
          }
          label={row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        />
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
      render: (row: Incident) => (
        <span className="font-mono text-body-sm text-base-muted">
          {new Date(row.created_at).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      ),
    },
    {
      key: 'assigned_to',
      label: 'Assigned',
      render: (row: Incident) => (
        <span className="font-mono text-body-sm text-brand-blue">
          {row.assigned_to || 'Unassigned'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="Operations"
        title="Active Incidents"
        subtitle={`${activeIncidents.length} incidents currently active`}
      />

      <Card>
        <DataTable<Incident>
          columns={columns}
          data={activeIncidents}
          onRowClick={handleRowClick}
          emptyMessage="No active incidents. All systems nominal."
        />
      </Card>

      <Dialog
        isOpen={!!selectedIncident}
        onClose={() => setSelectedIncident(null)}
        title={selectedIncident?.title || ''}
        description={`${selectedIncident?.id} | Severity: ${selectedIncident?.severity} | Region: ${selectedIncident?.region}`}
        footer={
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setSelectedIncident(null)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (selectedIncident) handleAcknowledge(selectedIncident);
              }}
            >
              Acknowledge
            </Button>
            <Button
              variant="outline"
              className="border-status-critical text-status-critical hover:bg-status-critical/10"
              onClick={() => setSelectedIncident(selectedIncident!)}
            >
              Escalate
            </Button>
          </div>
        }
      >
        {selectedIncident && (
          <div className="space-y-6">
            <div>
              <h4 className="text-body-sm font-medium text-base-muted mb-2">Description</h4>
              <p className="text-body-md text-white font-mono leading-relaxed">
                {selectedIncident.description}
              </p>
            </div>

            <div>
              <h4 className="text-body-sm font-medium text-base-muted mb-2">Affected Services</h4>
              <div className="flex flex-wrap gap-2">
                {selectedIncident.affected_services.map((svc) => (
                  <span
                    key={svc}
                    className="px-2.5 py-1 bg-base-surface-light border border-base-border rounded text-body-sm font-mono text-brand-blue"
                  >
                    {svc}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-body-sm font-medium text-base-muted mb-2">Timeline</h4>
              <div className="space-y-2">
                {selectedIncident.timeline.map((event, i) => (
                  <div key={i} className="flex items-start gap-3 text-body-sm">
                    <span className="font-mono text-base-muted shrink-0 w-32">
                      {new Date(event.timestamp).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span className="text-white">{event.action}</span>
                    <span className="font-mono text-brand-blue shrink-0">— {event.author}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-body-sm font-medium text-base-muted mb-2">Escalation Note</h4>
              <Textarea
                placeholder="Add notes for escalation..."
                value={escalationNote}
                onChange={(e) => setEscalationNote(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
