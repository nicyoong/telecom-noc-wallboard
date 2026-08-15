/**
 * Tests for AlertTicker component
 * 
 * Risk: Alert ticker displays critical notifications. Missing or incorrect
 * alerts could delay response to network emergencies.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { AlertTicker } from '@/components/ui/alert-ticker';
import { MOCK_INCIDENTS } from '@/data/mock';

describe('AlertTicker', () => {
  it('should render with default incidents (P1 only)', () => {
    const p1Incidents = MOCK_INCIDENTS.filter((i) => i.severity === 'P1');
    render(<AlertTicker />);
    
    // Should show P1 incidents
    p1Incidents.forEach((incident) => {
      expect(screen.getByText(incident.title)).toBeInTheDocument();
    });
  });

  it('should render with custom incidents', () => {
    render(<AlertTicker incidents={MOCK_INCIDENTS} />);
    
    // Should show all incidents
    expect(screen.getByText(MOCK_INCIDENTS[0].title)).toBeInTheDocument();
  });

  it('should not render when no incidents', () => {
    render(<AlertTicker incidents={[]} />);
    
    expect(screen.queryByText(/ticker/i)).not.toBeInTheDocument();
  });

  it('should have ARIA attributes for accessibility', () => {
    render(<AlertTicker />);
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByLabelText('Critical alerts')).toBeInTheDocument();
  });

  it('should have ticker animation classes', () => {
    const { container } = render(<AlertTicker />);
    
    expect(container.querySelector('.ticker-wrap')).toBeInTheDocument();
    expect(container.querySelector('.ticker-content')).toBeInTheDocument();
  });

  it('should render P1 severity badges', () => {
    render(<AlertTicker />);
    
    // Check for P1 badges in ticker
    const p1Badges = document.querySelectorAll('[style*="background-color"]');
    expect(p1Badges.length).toBeGreaterThan(0);
  });
});
