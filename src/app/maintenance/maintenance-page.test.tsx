import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MaintenancePage from '@/app/maintenance/page';

// Mock dependencies - use simple div wrappers
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className, ...props }: any) => (
    <div className={className} {...props}>{children}</div>
  ),
}));
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, className, ...props }: any) => (
    <button className={className} {...props}>{children}</button>
  ),
}));
jest.mock('@/components/ui/badge', () => ({
  Badge: ({ label }: any) => <span>{label}</span>,
}));

describe('MaintenancePage', () => {
  it('renders the page title and description', () => {
    render(<MaintenancePage />);
    expect(screen.getByText('Maintenance Windows')).toBeInTheDocument();
    expect(screen.getByText('Schedule and manage planned maintenance')).toBeInTheDocument();
  });

  it('has a New Window button that toggles the create form', () => {
    render(<MaintenancePage />);
    expect(screen.queryByText('Create Maintenance Window')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('+ New Window'));
    expect(screen.getByText('Create Maintenance Window')).toBeInTheDocument();
  });

  it('shows create form fields when toggled on', () => {
    render(<MaintenancePage />);
    fireEvent.click(screen.getByText('+ New Window'));

    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Start Time')).toBeInTheDocument();
    expect(screen.getByLabelText('End Time')).toBeInTheDocument();
    expect(screen.getByLabelText('Affected Systems')).toBeInTheDocument();
    expect(screen.getByLabelText('Impact Assessment')).toBeInTheDocument();
    expect(screen.getByLabelText('Rollback Plan')).toBeInTheDocument();
  });

  it('closes create form when Cancel is clicked', () => {
    render(<MaintenancePage />);
    fireEvent.click(screen.getByText('+ New Window'));
    fireEvent.click(screen.getByText('Cancel'));

    expect(screen.queryByText('Create Maintenance Window')).not.toBeInTheDocument();
  });

  it('renders filter buttons for all statuses', () => {
    render(<MaintenancePage />);
    expect(screen.getByText('ALL')).toBeInTheDocument();
    expect(screen.getByText('SCHEDULED')).toBeInTheDocument();
    expect(screen.getByText('IN PROGRESS')).toBeInTheDocument();
    expect(screen.getByText('COMPLETED')).toBeInTheDocument();
    expect(screen.getByText('CANCELED')).toBeInTheDocument();
  });

  it('filters maintenance windows by status', () => {
    render(<MaintenancePage />);
    // By default all windows are shown
    expect(screen.getByText('MW-001')).toBeInTheDocument();
    expect(screen.getByText('MW-004')).toBeInTheDocument();

    // Filter to completed
    fireEvent.click(screen.getByText('COMPLETED'));
    expect(screen.getByText('MW-004')).toBeInTheDocument();
    expect(screen.getByText('MW-005')).toBeInTheDocument();
    expect(screen.queryByText('MW-001')).not.toBeInTheDocument();
  });

  it('shows all maintenance windows by default', () => {
    render(<MaintenancePage />);
    expect(screen.getByText('MW-001')).toBeInTheDocument();
    expect(screen.getByText('MW-002')).toBeInTheDocument();
    expect(screen.getByText('MW-003')).toBeInTheDocument();
    expect(screen.getByText('MW-004')).toBeInTheDocument();
    expect(screen.getByText('MW-005')).toBeInTheDocument();
  });

  it('renders table headers', () => {
    render(<MaintenancePage />);
    expect(screen.getByText('Window ID')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('End')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Requested By')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });

  it('opens detail modal when a window row is clicked', () => {
    render(<MaintenancePage />);
    fireEvent.click(screen.getByText('MW-001'));

    expect(screen.getByText('MW-001')).toBeInTheDocument();
    expect(screen.getByText('CR-001 Firmware Upgrade')).toBeInTheDocument();
    expect(screen.getByText('Core Router CR-001')).toBeInTheDocument();
  });

  it('closes detail modal when backdrop is clicked', () => {
    render(<MaintenancePage />);
    fireEvent.click(screen.getByText('MW-001'));
    expect(screen.getByText('CR-001 Firmware Upgrade')).toBeInTheDocument();

    // Click backdrop (outside the modal content)
    fireEvent.click(document.querySelector('.fixed.inset-0')!);
    expect(screen.queryByText('CR-001 Firmware Upgrade')).not.toBeInTheDocument();
  });

  it('shows Approve and Cancel actions for scheduled windows', () => {
    render(<MaintenancePage />);
    // Scheduled windows should show Approve and Cancel
    expect(screen.getByText('Approve')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('shows Maintenance History section', () => {
    render(<MaintenancePage />);
    expect(screen.getByText('Maintenance History')).toBeInTheDocument();
  });
});
