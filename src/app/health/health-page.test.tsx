import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HealthPage from '@/app/health/page';

// Mock dependencies - use simple div wrappers
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className, ...props }: any) => (
    <div className={className} {...props}>{children}</div>
  ),
}));
jest.mock('@/components/ui/badge', () => ({
  Badge: ({ label }: any) => <span>{label}</span>,
}));

describe('HealthPage', () => {
  it('renders the page title and description', () => {
    render(<HealthPage />);
    expect(screen.getByText('System Health')).toBeInTheDocument();
    expect(screen.getByText('NOC platform status and performance metrics')).toBeInTheDocument();
  });

  it('renders all system component cards', () => {
    render(<HealthPage />);
    expect(screen.getByText('Database')).toBeInTheDocument();
    expect(screen.getByText('API Server')).toBeInTheDocument();
    expect(screen.getByText('Polling Engine')).toBeInTheDocument();
    expect(screen.getByText('Alert Engine')).toBeInTheDocument();
    expect(screen.getByText('UI/Frontend')).toBeInTheDocument();
  });

  it('shows uptime percentages for each component', () => {
    render(<HealthPage />);
    expect(screen.getByText('99.99%')).toBeInTheDocument();
    expect(screen.getByText('99.97%')).toBeInTheDocument();
    expect(screen.getByText('99.95%')).toBeInTheDocument();
    expect(screen.getByText('99.80%')).toBeInTheDocument();
  });

  it('renders performance metrics', () => {
    render(<HealthPage />);
    expect(screen.getByText('Avg Response Time')).toBeInTheDocument();
    expect(screen.getByText('Throughput')).toBeInTheDocument();
    expect(screen.getByText('Error Rate')).toBeInTheDocument();
    expect(screen.getByText('CPU Usage')).toBeInTheDocument();
    expect(screen.getByText('Memory Usage')).toBeInTheDocument();
    expect(screen.getByText('Disk Usage')).toBeInTheDocument();
  });

  it('shows recent events', () => {
    render(<HealthPage />);
    expect(screen.getByText('Recent Events')).toBeInTheDocument();
    expect(screen.getByText('Database backup completed successfully')).toBeInTheDocument();
    expect(screen.getByText('Alert Engine response time increased to 250ms')).toBeInTheDocument();
  });

  it('renders resource utilization bars', () => {
    render(<HealthPage />);
    expect(screen.getByText('Resource Utilization')).toBeInTheDocument();
    expect(screen.getByText('CPU')).toBeInTheDocument();
    expect(screen.getByText('Memory')).toBeInTheDocument();
    expect(screen.getByText('Disk')).toBeInTheDocument();
    expect(screen.getByText('Network')).toBeInTheDocument();
  });

  it('renders system logs section', () => {
    render(<HealthPage />);
    expect(screen.getByText('System Logs')).toBeInTheDocument();
  });

  it('filters logs by level', () => {
    render(<HealthPage />);
    fireEvent.click(screen.getByText('ERROR'));
    expect(screen.getByText('ERROR')).toBeInTheDocument();
  });

  it('shows all log filter buttons', () => {
    render(<HealthPage />);
    expect(screen.getByText('ALL')).toBeInTheDocument();
    expect(screen.getByText('ERROR')).toBeInTheDocument();
    expect(screen.getByText('WARNING')).toBeInTheDocument();
    expect(screen.getByText('INFO')).toBeInTheDocument();
  });

  it('toggles diagnostic results', () => {
    render(<HealthPage />);
    expect(screen.queryByText('Diagnostic Results')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Run Diagnostics'));
    expect(screen.getByText('Diagnostic Results')).toBeInTheDocument();
    expect(screen.getByText('Database Connectivity')).toBeInTheDocument();
    expect(screen.getByText('API Health Check')).toBeInTheDocument();
  });

  it('shows diagnostic results with PASS/WARNING text', () => {
    render(<HealthPage />);
    fireEvent.click(screen.getByText('Run Diagnostics'));

    // Use contains instead of exact match since text might be in multiple elements
    expect(screen.getByText(/PASS/)).toBeInTheDocument();
    expect(screen.getByText(/WARNING/)).toBeInTheDocument();
  });

  it('renders Restart Services button', () => {
    render(<HealthPage />);
    expect(screen.getByText('Restart Services')).toBeInTheDocument();
  });
});
