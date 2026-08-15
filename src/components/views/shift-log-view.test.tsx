/**
 * Tests for ShiftLogView component
 * 
 * Risk: Shift log view tracks operator handovers. Incorrect display
 * could cause missed handover information.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { ShiftLogView } from '@/components/views/shift-log-view';
import { MOCK_SHIFT_LOGS } from '@/data/mock';

describe('ShiftLogView', () => {
  it('should render section heading', () => {
    render(<ShiftLogView />);
    expect(screen.getByText('Shift Handover Log')).toBeInTheDocument();
  });

  it('should show shift log table', () => {
    render(<ShiftLogView />);
    
    // Check for column headers
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Shift')).toBeInTheDocument();
    expect(screen.getByText('Operator')).toBeInTheDocument();
    expect(screen.getByText('Station')).toBeInTheDocument();
  });

  it('should display operator names', () => {
    render(<ShiftLogView />);
    
    MOCK_SHIFT_LOGS.forEach((log) => {
      expect(screen.getByText(log.operator)).toBeInTheDocument();
    });
  });

  it('should display shift types', () => {
    render(<ShiftLogView />);
    
    // Should show day and/or night shifts
    expect(screen.getByText(/day|night/i)).toBeInTheDocument();
  });

  it('should display incident counts', () => {
    render(<ShiftLogView />);
    
    // Should show some incident count
    expect(screen.getByText(/\d+/)).toBeInTheDocument();
  });

  it('should show handover log panel', () => {
    render(<ShiftLogView />);
    
    expect(screen.getByText('Current Shift Handover')).toBeInTheDocument();
  });

  it('should show entry/exit times', () => {
    render(<ShiftLogView />);
    
    // Should show time format
    expect(screen.getByText(/\d{2}:\d{2}/)).toBeInTheDocument();
  });

  it('should handle empty shift logs', () => {
    jest.spyOn(require('@/data/mock'), 'MOCK_SHIFT_LOGS', 'get').mockReturnValue([]);
    
    render(<ShiftLogView />);
    expect(screen.getByText('No shift logs recorded.')).toBeInTheDocument();
  });
});
