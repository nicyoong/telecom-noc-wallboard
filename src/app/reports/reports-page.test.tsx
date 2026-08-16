import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReportsPage from '@/app/reports/page';

// Mock dependencies
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

describe('ReportsPage', () => {
  it('renders the page title and subtitle', () => {
    render(<ReportsPage />);
    expect(screen.getByText('Reports')).toBeInTheDocument();
    expect(screen.getByText('Generate and manage NOC reports')).toBeInTheDocument();
  });

  it('renders all report type buttons', () => {
    render(<ReportsPage />);
    expect(screen.getByText('Daily Summary')).toBeInTheDocument();
    expect(screen.getByText('Weekly Summary')).toBeInTheDocument();
    expect(screen.getByText('Monthly Summary')).toBeInTheDocument();
    expect(screen.getByText('Incident Report')).toBeInTheDocument();
    expect(screen.getByText('SLA Report')).toBeInTheDocument();
    expect(screen.getByText('Capacity Report')).toBeInTheDocument();
  });

  it('renders date range inputs', () => {
    render(<ReportsPage />);
    expect(screen.getByLabelText('Start Date')).toBeInTheDocument();
    expect(screen.getByLabelText('End Date')).toBeInTheDocument();
  });

  it('renders output format buttons', () => {
    render(<ReportsPage />);
    expect(screen.getByText('PDF')).toBeInTheDocument();
    expect(screen.getByText('CSV')).toBeInTheDocument();
    expect(screen.getByText('Excel')).toBeInTheDocument();
  });

  it('renders Generate Report and Preview buttons', () => {
    render(<ReportsPage />);
    expect(screen.getByText('Generate Report')).toBeInTheDocument();
    expect(screen.getByText('Preview')).toBeInTheDocument();
  });

  it('renders report history table', () => {
    render(<ReportsPage />);
    expect(screen.getByText('Report History')).toBeInTheDocument();
    expect(screen.getByText('RPT-001')).toBeInTheDocument();
  });

  it('renders scheduled reports section', () => {
    render(<ReportsPage />);
    expect(screen.getByText('Scheduled Reports')).toBeInTheDocument();
  });

  it('renders report templates', () => {
    render(<ReportsPage />);
    expect(screen.getByText('Report Templates')).toBeInTheDocument();
    expect(screen.getByText('Standard Daily Report')).toBeInTheDocument();
  });

  it('renders distribution list textarea', () => {
    render(<ReportsPage />);
    expect(screen.getByText('Distribution List')).toBeInTheDocument();
    const textarea = screen.getByPlaceholderText(/Enter email addresses/i);
    expect(textarea).toBeInTheDocument();
  });
});
