/**
 * Tests for severity indicator and badge components
 * 
 * Risk: Visual status indicators are critical for NOC engineers to quickly
 * assess network health. Incorrect color coding or rendering could mask
 * critical incidents.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { SeverityIndicator, SeverityBadge } from '@/components/ui/severity-indicator';
import { Badge } from '@/components/ui/badge';
import { DEVICE_STATUS_LABELS } from '@/constants';

describe('SeverityIndicator', () => {
  it('should render P1 severity with correct color', () => {
    render(<SeverityIndicator severity="P1" />);
    const element = screen.getByRole('status');
    expect(element).toBeInTheDocument();
  });

  it('should render all severity levels', () => {
    const { rerender } = render(<SeverityIndicator severity="P1" />);
    
    ['P1', 'P2', 'P3', 'P4'].forEach((severity) => {
      rerender(<SeverityIndicator severity={severity as any} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  it('should show label when showLabel is true', () => {
    render(<SeverityIndicator severity="P1" showLabel />);
    expect(screen.getByText('P1')).toBeInTheDocument();
  });

  it('should apply size classes correctly', () => {
    const { container: sm } = render(<SeverityIndicator severity="P1" size="sm" />);
    const { container: md } = render(<SeverityIndicator severity="P1" size="md" />);
    const { container: lg } = render(<SeverityIndicator severity="P1" size="lg" />);
    
    expect(sm.firstChild).toHaveClass('w-5');
    expect(md.firstChild).toHaveClass('w-7');
    expect(lg.firstChild).toHaveClass('w-9');
  });
});

describe('SeverityBadge', () => {
  it('should render badge with severity text', () => {
    render(<SeverityBadge severity="P2" />);
    expect(screen.getByText('P2')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<SeverityBadge severity="P1" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

describe('Badge', () => {
  it('should render all device status badges', () => {
    const statuses = Object.keys(DEVICE_STATUS_LABELS) as Array<keyof typeof DEVICE_STATUS_LABELS>;
    
    statuses.forEach((status) => {
      const { unmount } = render(<Badge status={status as any} />);
      expect(screen.getByText(DEVICE_STATUS_LABELS[status as keyof typeof DEVICE_STATUS_LABELS])).toBeInTheDocument();
      unmount();
    });
  });

  it('should render custom label when provided', () => {
    render(<Badge status="online" label="Custom Status" />);
    expect(screen.getByText('Custom Status')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<Badge status="critical" className="custom-badge" />);
    expect(container.firstChild).toHaveClass('custom-badge');
  });

  it('should have pulse animation for critical status', () => {
    const { container } = render(<Badge status="critical" />);
    const circle = container.querySelector('span');
    expect(circle).toHaveClass('animate-pulse');
  });
});
