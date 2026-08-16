import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EscalationPage from '@/app/escalation/page';

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

describe('EscalationPage', () => {
  it('renders the page title and description', () => {
    render(<EscalationPage />);
    expect(screen.getByText('Escalation Matrix')).toBeInTheDocument();
    expect(screen.getByText('Incident escalation contacts and procedures')).toBeInTheDocument();
  });

  it('renders all four tabs', () => {
    render(<EscalationPage />);
    expect(screen.getByText('Escalation Matrix')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('After Hours')).toBeInTheDocument();
    expect(screen.getByText('Vendors')).toBeInTheDocument();
  });

  it('shows Escalation Matrix tab by default', () => {
    render(<EscalationPage />);
    expect(screen.getByText('Severity to Level Mapping')).toBeInTheDocument();
    expect(screen.getByText('Level 1 - NOC Engineer')).toBeInTheDocument();
  });

  it('displays severity-to-level mapping table', () => {
    render(<EscalationPage />);
    expect(screen.getByText('P1')).toBeInTheDocument();
    expect(screen.getByText('P2')).toBeInTheDocument();
    expect(screen.getByText('P3')).toBeInTheDocument();
    expect(screen.getByText('P4')).toBeInTheDocument();
    expect(screen.getByText('15 min')).toBeInTheDocument();
    expect(screen.getByText('4 hours')).toBeInTheDocument();
  });

  it('shows all escalation levels with contacts', () => {
    render(<EscalationPage />);
    expect(screen.getByText('Level 1 - NOC Engineer')).toBeInTheDocument();
    expect(screen.getByText('Level 2 - Network Manager')).toBeInTheDocument();
    expect(screen.getByText('Level 3 - VP Engineering')).toBeInTheDocument();
    expect(screen.getByText('Executive')).toBeInTheDocument();

    // Contacts
    expect(screen.getByText('Marcus Chen')).toBeInTheDocument();
    expect(screen.getByText('Sarah Johnson')).toBeInTheDocument();
    expect(screen.getByText('Robert Chen')).toBeInTheDocument();
    expect(screen.getByText('Lisa Wang')).toBeInTheDocument();
  });

  it('switches to History tab', () => {
    render(<EscalationPage />);
    fireEvent.click(screen.getByText('History'));
    expect(screen.getByText('Escalation History')).toBeInTheDocument();
    expect(screen.getByText('INC-001')).toBeInTheDocument();
    expect(screen.getByText('INC-002')).toBeInTheDocument();
  });

  it('switches to After Hours tab', () => {
    render(<EscalationPage />);
    fireEvent.click(screen.getByText('After Hours'));
    expect(screen.getByText('On-Call Engineer')).toBeInTheDocument();
    expect(screen.getByText('NOC Supervisor')).toBeInTheDocument();
  });

  it('switches to Vendors tab', () => {
    render(<EscalationPage />);
    fireEvent.click(screen.getByText('Vendors'));
    expect(screen.getByText('Vendor Support Contacts')).toBeInTheDocument();
    expect(screen.getByText('Cisco TAC')).toBeInTheDocument();
    expect(screen.getByText('Juniper Support')).toBeInTheDocument();
    expect(screen.getByText('F5 Support')).toBeInTheDocument();
  });

  it('shows escalation path visualization', () => {
    render(<EscalationPage />);
    expect(screen.getByText('Escalation Path Visualization')).toBeInTheDocument();
    expect(screen.getByText('L1')).toBeInTheDocument();
    expect(screen.getByText('L2')).toBeInTheDocument();
    expect(screen.getByText('L3')).toBeInTheDocument();
  });

  it('shows availability badges for contacts', () => {
    render(<EscalationPage />);
    expect(screen.getByText('24/7')).toBeInTheDocument();
    expect(screen.getByText('Business Hours')).toBeInTheDocument();
    expect(screen.getByText('On-Call')).toBeInTheDocument();
    expect(screen.getByText('Emergency Only')).toBeInTheDocument();
    expect(screen.getByText('Critical Only')).toBeInTheDocument();
  });

  it('has Test Escalation button', () => {
    render(<EscalationPage />);
    expect(screen.getByText('Test Escalation')).toBeInTheDocument();
  });
});
