/**
 * Tests for Toast notification system
 * 
 * Risk: Toast notifications are the primary alert mechanism for NOC engineers.
 * Missing or incorrect notifications could delay incident response.
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { ToastProvider, useToast } from '@/components/ui/toast';

function TestToastConsumer() {
  const { addToast } = useToast();
  
  return (
    <div>
      <button onClick={() => addToast({ type: 'success', title: 'Success Toast' })}>
        Show Success
      </button>
      <button onClick={() => addToast({ type: 'error', title: 'Error Toast' })}>
        Show Error
      </button>
      <button onClick={() => addToast({ type: 'warning', title: 'Warning Toast' })}>
        Show Warning
      </button>
      <button onClick={() => addToast({ type: 'info', title: 'Info Toast' })}>
        Show Info
      </button>
      <button onClick={() => addToast({ type: 'success', title: 'Auto-dismiss', duration: 100 })}>
        Auto Dismiss
      </button>
    </div>
  );
}

describe('Toast System', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render toast provider', () => {
    render(
      <ToastProvider>
        <TestToastConsumer />
      </ToastProvider>
    );
    expect(screen.getByText('Show Success')).toBeInTheDocument();
  });

  it('should show success toast', () => {
    render(
      <ToastProvider>
        <TestToastConsumer />
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Show Success').click();
    });

    expect(screen.getByText('Success Toast')).toBeInTheDocument();
  });

  it('should show error toast', () => {
    render(
      <ToastProvider>
        <TestToastConsumer />
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Show Error').click();
    });

    expect(screen.getByText('Error Toast')).toBeInTheDocument();
  });

  it('should show warning toast', () => {
    render(
      <ToastProvider>
        <TestToastConsumer />
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Show Warning').click();
    });

    expect(screen.getByText('Warning Toast')).toBeInTheDocument();
  });

  it('should show info toast', () => {
    render(
      <ToastProvider>
        <TestToastConsumer />
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Show Info').click();
    });

    expect(screen.getByText('Info Toast')).toBeInTheDocument();
  });

  it('should auto-dismiss toast after duration', () => {
    render(
      <ToastProvider>
        <TestToastConsumer />
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Auto Dismiss').click();
    });

    expect(screen.getByText('Auto-dismiss')).toBeInTheDocument();

    // Advance time by 100ms
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(screen.queryByText('Auto-dismiss')).not.toBeInTheDocument();
  });

  it('should dismiss toast on close button click', () => {
    render(
      <ToastProvider>
        <TestToastConsumer />
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Show Success').click();
    });

    expect(screen.getByText('Success Toast')).toBeInTheDocument();

    // Find and click dismiss button
    const dismissButtons = screen.getAllByLabelText('Dismiss notification');
    act(() => {
      dismissButtons[0].click();
    });

    expect(screen.queryByText('Success Toast')).not.toBeInTheDocument();
  });

  it('should show multiple toasts', () => {
    render(
      <ToastProvider>
        <TestToastConsumer />
      </ToastProvider>
    );

    act(() => {
      screen.getByText('Show Success').click();
      screen.getByText('Show Error').click();
    });

    expect(screen.getByText('Success Toast')).toBeInTheDocument();
    expect(screen.getByText('Error Toast')).toBeInTheDocument();
  });

  it('should throw error when used outside ToastProvider', () => {
    function TestWithoutProvider() {
      useToast();
      return <div>test</div>;
    }

    expect(() => render(<TestWithoutProvider />)).toThrow('useToast must be used within ToastProvider');
  });
});
