/**
 * Tests for IncidentsView component
 * 
 * Risk: Incidents view displays active incidents. Incorrect filtering
 * or rendering could hide critical issues from engineers.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IncidentsView } from '@/components/views/incidents-view';
import { MOCK_INCIDENTS } from '@/data/mock';

describe('IncidentsView', () => {
  it('should render section heading', () => {
    render(<IncidentsView />);
    expect(screen.getByText('Active Incidents')).toBeInTheDocument();
  });

  it('should show incident count', () => {
    render(<IncidentsView />);
    const activeCount = MOCK_INCIDENTS.filter(
      (i) => i.status === 'active' || i.status === 'acknowledged' || i.status === 'investigating'
    ).length;
    expect(screen.getByText(`${activeCount} incidents currently active`)).toBeInTheDocument();
  });

  it('should render incident table', () => {
    render(<IncidentsView />);
    
    // Check for column headers
    expect(screen.getByText('Severity')).toBeInTheDocument();
    expect(screen.getByText('Incident')).toBeInTheDocument();
    expect(screen.getByText('Region')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('should display incident titles', () => {
    render(<IncidentsView />);
    
    const activeIncidents = MOCK_INCIDENTS.filter(
      (i) => i.status === 'active' || i.status === 'acknowledged' || i.status === 'investigating'
    );
    
    activeIncidents.forEach((incident) => {
      expect(screen.getByText(incident.title)).toBeInTheDocument();
    });
  });

  it('should show severity indicators', () => {
    render(<IncidentsView />);
    
    // P1 incidents should have severity badges
    expect(screen.getByText(/P1/)).toBeInTheDocument();
  });

  it('should show empty state when no active incidents', () => {
    // Mock empty incidents
    jest.spyOn(require('@/data/mock'), 'MOCK_INCIDENTS', 'get').mockReturnValue([]);
    
    render(<IncidentsView />);
    expect(screen.getByText('No active incidents. All systems nominal.')).toBeInTheDocument();
  });

  it('should render table with all columns', () => {
    render(<IncidentsView />);
    
    expect(screen.getByText('Created')).toBeInTheDocument();
    expect(screen.getByText('Assigned')).toBeInTheDocument();
  });
});
