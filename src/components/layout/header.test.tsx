import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from './header';

describe('Header', () => {
  it('renders the NetWatch NOC title', () => {
    render(<Header />);
    expect(screen.getByText('NetWatch NOC')).toBeInTheDocument();
    expect(screen.getByText('Network Operations Center')).toBeInTheDocument();
  });

  it('shows mobile menu toggle button', () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Toggle menu');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton.tagName).toBe('BUTTON');
  });

  it('calls onMenuToggle when menu button is clicked', () => {
    const handleToggle = jest.fn();
    render(<Header onMenuToggle={handleToggle} />);
    fireEvent.click(screen.getByLabelText('Toggle menu'));
    expect(handleToggle).toHaveBeenCalled();
  });

  it('displays shift indicator', () => {
    render(<Header />);
    // Shift indicator is either DAY SHIFT or NIGHT SHIFT
    const shiftText = screen.getByText(/DAY SHIFT|NIGHT SHIFT/);
    expect(shiftText).toBeInTheDocument();
  });

  it('displays the current time', () => {
    render(<Header />);
    // Time should be displayed in the header
    expect(screen.getByText(/\d{2}:\d{2}:\d{2}/)).toBeInTheDocument();
  });

  it('has an aria-live region for critical alerts', () => {
    render(<Header />);
    const liveRegion = document.querySelector('[aria-live="polite"]');
    expect(liveRegion).toBeInTheDocument();
  });

  it('shows user info on the right side', () => {
    render(<Header />);
    expect(screen.getByText('Marcus Chen')).toBeInTheDocument();
    expect(screen.getByText('noc_lead')).toBeInTheDocument();
  });

  it('has a sign-out link', () => {
    render(<Header />);
    const signOutLink = screen.getByLabelText('Sign out');
    expect(signOutLink).toBeInTheDocument();
    expect(signOutLink.getAttribute('href')).toBe('/login');
  });

  it('displays timezone', () => {
    render(<Header />);
    // Timezone should be shown (e.g., UTC or a specific timezone)
    const timezoneEl = screen.getByText(/\w+\/\w+|UTC/);
    expect(timezoneEl).toBeInTheDocument();
  });
});
