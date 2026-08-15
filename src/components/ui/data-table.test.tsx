/**
 * Tests for DataTable component
 * 
 * Risk: Data tables display critical incident and device information.
 * Incorrect rendering could hide important operational data.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { DataTable } from '@/components/ui/data-table';

interface TestDevice {
  id: string;
  hostname: string;
  ip_address: string;
  status: string;
}

const MOCK_DEVICES: TestDevice[] = [
  { id: '1', hostname: 'core-rtr-nyc-01', ip_address: '10.0.1.1', status: 'online' },
  { id: '2', hostname: 'dist-swh-chi-01', ip_address: '10.0.2.1', status: 'degraded' },
  { id: '3', hostname: 'acc-swh-dal-01', ip_address: '10.0.3.1', status: 'critical' },
];

describe('DataTable', () => {
  const columns = [
    { key: 'hostname', label: 'Hostname' },
    { key: 'ip_address', label: 'IP Address' },
    { key: 'status', label: 'Status' },
  ];

  it('should render table with data', () => {
    render(<DataTable<TestDevice> columns={columns} data={MOCK_DEVICES} />);
    
    expect(screen.getByText('core-rtr-nyc-01')).toBeInTheDocument();
    expect(screen.getByText('10.0.1.1')).toBeInTheDocument();
    expect(screen.getByText('dist-swh-chi-01')).toBeInTheDocument();
    expect(screen.getByText('acc-swh-dal-01')).toBeInTheDocument();
  });

  it('should show empty state when no data', () => {
    render(<DataTable<TestDevice> columns={columns} data={[]} />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('should show custom empty message', () => {
    render(<DataTable<TestDevice> columns={columns} data={[]} emptyMessage="No devices found" />);
    
    expect(screen.getByText('No devices found')).toBeInTheDocument();
  });

  it('should render column headers', () => {
    render(<DataTable<TestDevice> columns={columns} data={MOCK_DEVICES} />);
    
    expect(screen.getByText('Hostname')).toBeInTheDocument();
    expect(screen.getByText('IP Address')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('should call onRowClick when row is clicked', () => {
    const handleClick = jest.fn();
    render(<DataTable<TestDevice> columns={columns} data={MOCK_DEVICES} onRowClick={handleClick} />);
    
    const firstRow = screen.getByText('core-rtr-nyc-01').closest('tr');
    firstRow?.click();
    
    expect(handleClick).toHaveBeenCalledWith(MOCK_DEVICES[0], 0);
  });

  it('should render custom column content', () => {
    const customColumns = [
      ...columns,
      { 
        key: 'custom', 
        label: 'Custom',
        render: (row: TestDevice) => <span data-testid={`custom-${row.id}`}>{row.hostname.toUpperCase()}</span>
      },
    ];
    
    render(<DataTable<TestDevice> columns={customColumns} data={MOCK_DEVICES} />);
    
    expect(screen.getByTestId('custom-1')).toHaveTextContent('CORE-RTR-NYC-01');
  });

  it('should apply custom className', () => {
    const { container } = render(
      <DataTable<TestDevice> columns={columns} data={MOCK_DEVICES} className="custom-table" />
    );
    
    expect(container.firstChild).toHaveClass('custom-table');
  });
});
