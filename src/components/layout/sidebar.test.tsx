/**
 * Tests for Sidebar component
 * 
 * Risk: Sidebar provides critical filtering capabilities. Incorrect filter
 * state could hide important devices or incidents.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Sidebar } from '@/components/layout/sidebar';

describe('Sidebar', () => {
  it('should render filter labels', () => {
    render(<Sidebar isOpen={true} onClose={() => {}} />);
    
    expect(screen.getByText('Region')).toBeInTheDocument();
    expect(screen.getByText('Device Type')).toBeInTheDocument();
    expect(screen.getByText('Severity')).toBeInTheDocument();
    expect(screen.getByText('Time Range')).toBeInTheDocument();
  });

  it('should have all region options', () => {
    render(<Sidebar isOpen={true} onClose={() => {}} />);
    
    const regionSelect = screen.getByLabelText('Filter by region');
    expect(regionSelect).toBeInTheDocument();
    
    const options = regionSelect.querySelectorAll('option');
    expect(options.length).toBeGreaterThan(5);
  });

  it('should have all device type options', () => {
    render(<Sidebar isOpen={true} onClose={() => {}} />);
    
    const deviceTypeSelect = screen.getByLabelText('Filter by device type');
    expect(deviceTypeSelect).toBeInTheDocument();
    
    const options = deviceTypeSelect.querySelectorAll('option');
    expect(options.length).toBeGreaterThan(5);
  });

  it('should have severity options', () => {
    render(<Sidebar isOpen={true} onClose={() => {}} />);
    
    const severitySelect = screen.getByLabelText('Filter by severity');
    expect(severitySelect).toBeInTheDocument();
    
    const options = severitySelect.querySelectorAll('option');
    expect(options.length).toBeGreaterThan(3);
  });

  it('should have time range options', () => {
    render(<Sidebar isOpen={true} onClose={() => {}} />);
    
    const timeRangeSelect = screen.getByLabelText('Filter by time range');
    expect(timeRangeSelect).toBeInTheDocument();
    
    const options = timeRangeSelect.querySelectorAll('option');
    expect(options.length).toBeGreaterThan(4);
  });

  it('should have reset filters button', () => {
    render(<Sidebar isOpen={true} onClose={() => {}} />);
    
    expect(screen.getByText('Reset Filters')).toBeInTheDocument();
  });

  it('should call onClose when close button clicked', () => {
    const handleClose = jest.fn();
    render(<Sidebar isOpen={true} onClose={handleClose} />);
    
    const closeButton = document.querySelector('button[aria-label="Close sidebar"]');
    closeButton?.click();
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should render overlay when open on mobile', () => {
    render(<Sidebar isOpen={true} onClose={() => {}} />);
    
    // Check for overlay
    expect(document.querySelector('.fixed.inset-0')).toBeInTheDocument();
  });

  it('should not render when closed', () => {
    render(<Sidebar isOpen={false} onClose={() => {}} />);
    
    expect(screen.queryByText('Region')).not.toBeInTheDocument();
  });
});
