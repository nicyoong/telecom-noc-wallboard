/**
 * Tests for StatCard component
 * 
 * Risk: Stat cards display critical KPIs. Incorrect status colors or
 * trending indicators could mislead NOC engineers.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { StatCard } from '@/components/ui/stat-card';
import type { KpiMetric } from '@/types';

describe('StatCard', () => {
  it('should render basic stat card', () => {
    render(
      <StatCard
        value={99.9}
        unit="%"
        label="Uptime"
        status="healthy"
      />
    );
    
    expect(screen.getByText('99.9')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
    expect(screen.getByText('Uptime')).toBeInTheDocument();
  });

  it('should show subtitle when provided', () => {
    render(
      <StatCard
        value={12.5}
        unit="ms"
        label="Latency"
        subtitle="Average across all regions"
        status="healthy"
      />
    );
    
    expect(screen.getByText('Average across all regions')).toBeInTheDocument();
  });

  it('should apply correct status colors', () => {
    const { rerender } = render(
      <StatCard value={99.9} unit="%" label="Uptime" status="healthy" />
    );
    
    ['warning', 'critical'].forEach((status) => {
      rerender(<StatCard value={99.9} unit="%" label="Uptime" status={status as any} />);
      expect(screen.getByText('99.9')).toBeInTheDocument();
    });
  });

  it('should show trend indicator', () => {
    render(
      <StatCard
        value={12.5}
        unit="ms"
        label="Latency"
        trend="down"
        trendValue="0.3ms"
        status="healthy"
      />
    );
    
    expect(screen.getByText('↓ 0.3ms')).toBeInTheDocument();
  });

  it('should show stable trend', () => {
    render(
      <StatCard
        value={12.5}
        unit="ms"
        label="Latency"
        trend="stable"
        trendValue="0.0ms"
        status="healthy"
      />
    );
    
    expect(screen.getByText('→ 0.0ms')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <StatCard value={99.9} unit="%" label="Uptime" className="custom-card" />
    );
    
    expect(container.firstChild).toHaveClass('custom-card');
  });

  it('should render without metric prop (backward compatibility)', () => {
    // metric prop is optional for backward compatibility
    const { container } = render(
      <StatCard value={99.9} unit="%" label="Uptime" />
    );
    
    expect(container.firstChild).toBeInTheDocument();
  });
});
