/**
 * Tests for Footer component
 * 
 * Risk: Footer displays critical contact and escalation information.
 * Missing or incorrect information could delay incident response.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/footer';

describe('Footer', () => {
  it('should render NOC hotline number', () => {
    render(<Footer />);
    expect(screen.getByText('1-800-NOC-WATCH')).toBeInTheDocument();
  });

  it('should render escalation matrix', () => {
    render(<Footer />);
    expect(screen.getByText(/P1 → NOC Lead/)).toBeInTheDocument();
  });

  it('should show system as operational', () => {
    render(<Footer />);
    expect(screen.getByText('Operational')).toBeInTheDocument();
  });

  it('should show copyright with current year', () => {
    const currentYear = new Date().getFullYear();
    render(<Footer />);
    expect(screen.getByText(`© ${currentYear} NetWatch Inc.`)).toBeInTheDocument();
  });

  it('should accept custom year prop', () => {
    render(<Footer currentYear={2025} />);
    expect(screen.getByText('© 2025 NetWatch Inc.')).toBeInTheDocument();
  });

  it('should show version number', () => {
    render(<Footer />);
    expect(screen.getByText('v2.4.1')).toBeInTheDocument();
  });

  it('should have system status indicator', () => {
    const { container } = render(<Footer />);
    const statusIndicator = container.querySelector('.bg-status-optimal');
    expect(statusIndicator).toBeInTheDocument();
  });
});
