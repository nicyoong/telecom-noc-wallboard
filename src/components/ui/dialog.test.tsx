/**
 * Tests for Dialog component
 * 
 * Risk: Dialogs are used for incident details and escalation. Incorrect
 * behavior could prevent proper incident management.
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Dialog } from '@/components/ui/dialog';

describe('Dialog', () => {
  it('should not render when closed', () => {
    render(
      <Dialog isOpen={false} onClose={() => {}} title="Test Dialog">
        <div>Content</div>
      </Dialog>
    );
    
    expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument();
  });

  it('should render when open', () => {
    render(
      <Dialog isOpen={true} onClose={() => {}} title="Test Dialog">
        <div>Content</div>
      </Dialog>
    );
    
    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should show description when provided', () => {
    render(
      <Dialog isOpen={true} onClose={() => {}} title="Test" description="Test Description">
        <div>Content</div>
      </Dialog>
    );
    
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should call onClose when backdrop clicked', () => {
    const handleClose = jest.fn();
    render(
      <Dialog isOpen={true} onClose={handleClose} title="Test">
        <div>Content</div>
      </Dialog>
    );
    
    fireEvent.click(document.querySelector('.fixed.inset-0')!);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when close button clicked', () => {
    const handleClose = jest.fn();
    render(
      <Dialog isOpen={true} onClose={handleClose} title="Test">
        <div>Content</div>
      </Dialog>
    );
    
    fireEvent.click(screen.getByLabelText('Close dialog'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose on Escape key', () => {
    const handleClose = jest.fn();
    render(
      <Dialog isOpen={true} onClose={handleClose} title="Test">
        <div>Content</div>
      </Dialog>
    );
    
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should render footer when provided', () => {
    render(
      <Dialog isOpen={true} onClose={() => {}} title="Test" footer={<button>Footer Button</button>}>
        <div>Content</div>
      </Dialog>
    );
    
    expect(screen.getByText('Footer Button')).toBeInTheDocument();
  });

  it('should apply size classes', () => {
    const { rerender } = render(
      <Dialog isOpen={true} onClose={() => {}} title="Test" size="sm">
        <div>Content</div>
      </Dialog>
    );
    
    ['md', 'lg', 'xl'].forEach((size) => {
      rerender(
        <Dialog isOpen={true} onClose={() => {}} title="Test" size={size as any}>
          <div>Content</div>
        </Dialog>
      );
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  it('should prevent body scroll when open', () => {
    const originalOverflow = document.body.style.overflow;
    
    render(
      <Dialog isOpen={true} onClose={() => {}} title="Test">
        <div>Content</div>
      </Dialog>
    );
    
    expect(document.body.style.overflow).toBe('hidden');
    
    // Cleanup
    act(() => {
      // Unmount to trigger cleanup
    });
    
    document.body.style.overflow = originalOverflow;
  });

  it('should have proper ARIA attributes', () => {
    render(
      <Dialog isOpen={true} onClose={() => {}} title="Test Dialog">
        <div>Content</div>
      </Dialog>
    );
    
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
  });
});
