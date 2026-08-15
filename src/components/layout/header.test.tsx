/**
 * Tests for Header component
 * 
 * Risk: Header displays shift information, health score, and incident count.
 * Incorrect rendering could cause confusion during shift changes.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/layout/header';

describe('Header', () => {
  it('should render portal name', () => {
    render(<Header />);
    expect(screen.getByText('NetWatch NOC')).toBeInTheDocument();
  });

  it('should show day shift badge during day hours', () => {
    // Mock date to be during day shift (7am-7pm UTC)
    const originalDate = global.Date;
    global.Date = class extends originalDate {
      constructor() {
        super();
      }
      getUTCHours() {
        return 12; // Noon UTC = day shift
      }
    } as any;

    render(<Header />);
    expect(screen.getByText('DAY SHIFT')).toBeInTheDocument();

    global.Date = originalDate;
  });

  it('should show night shift badge during night hours', () => {
    const originalDate = global.Date;
    global.Date = class extends originalDate {
      constructor() {
        super();
      }
      getUTCHours() {
        return 3; // 3am UTC = night shift
      }
    } as any;

    render(<Header />);
    expect(screen.getByText('NIGHT SHIFT')).toBeInTheDocument();

    global.Date = originalDate;
  });

  it('should show clock with timezone', () => {
    render(<Header />);
    expect(screen.getByText(/UTC|America\/|Europe\/|Asia\//)).toBeInTheDocument();
  });

  it('should render menu toggle button on mobile', () => {
    const { container } = render(<Header />);
    expect(container.querySelector('button[aria-label="Toggle menu"]')).toBeInTheDocument();
  });

  it('should call onMenuToggle when menu button clicked', () => {
    const handleToggle = jest.fn();
    render(<Header onMenuToggle={handleToggle} />);
    
    const menuButton = document.querySelector('button[aria-label="Toggle menu"]');
    (menuButton as HTMLButtonElement)?.click();
    
    expect(handleToggle).toHaveBeenCalledTimes(1);
  });

  it('should show sign out link', () => {
    render(<Header />);
    expect(screen.getByLabelText('Sign out')).toBeInTheDocument();
  });
});
