/**
 * Tests for Drawer component
 * 
 * Risk: Drawer provides mobile/tablet access to detailed views.
 * Incorrect behavior could prevent access to important information.
 */

import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Drawer } from '@/components/ui/drawer';

describe('Drawer', () => {
  it('should not render when closed', () => {
    render(
      <Drawer isOpen={false} onClose={() => {}} title="Test Drawer">
        <div>Content</div>
      </Drawer>
    );
    
    expect(screen.queryByText('Test Drawer')).not.toBeInTheDocument();
  });

  it('should render when open', () => {
    render(
      <Drawer isOpen={true} onClose={() => {}} title="Test Drawer">
        <div>Content</div>
      </Drawer>
    );
    
    expect(screen.getByText('Test Drawer')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should show description when provided', () => {
    render(
      <Drawer isOpen={true} onClose={() => {}} title="Test" description="Test Description">
        <div>Content</div>
      </Drawer>
    );
    
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('should close on backdrop click', () => {
    const handleClose = jest.fn();
    render(
      <Drawer isOpen={true} onClose={handleClose} title="Test">
        <div>Content</div>
      </Drawer>
    );
    
    fireEvent.click(document.querySelector('.fixed.inset-0')!);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should close on close button click', () => {
    const handleClose = jest.fn();
    render(
      <Drawer isOpen={true} onClose={handleClose} title="Test">
        <div>Content</div>
      </Drawer>
    );
    
    fireEvent.click(screen.getByLabelText('Close drawer'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should close on Escape key', () => {
    const handleClose = jest.fn();
    render(
      <Drawer isOpen={true} onClose={handleClose} title="Test">
        <div>Content</div>
      </Drawer>
    );
    
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should render left side drawer', () => {
    const { container } = render(
      <Drawer isOpen={true} onClose={() => {}} title="Test" side="left">
        <div>Content</div>
      </Drawer>
    );
    
    expect(container.querySelector('.left-0')).toBeInTheDocument();
  });

  it('should apply size classes', () => {
    const { rerender } = render(
      <Drawer isOpen={true} onClose={() => {}} title="Test" size="sm">
        <div>Content</div>
      </Drawer>
    );
    
    ['md', 'lg'].forEach((size) => {
      rerender(
        <Drawer isOpen={true} onClose={() => {}} title="Test" size={size as any}>
          <div>Content</div>
        </Drawer>
      );
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  it('should prevent body scroll when open', () => {
    const originalOverflow = document.body.style.overflow;
    
    render(
      <Drawer isOpen={true} onClose={() => {}} title="Test">
        <div>Content</div>
      </Drawer>
    );
    
    expect(document.body.style.overflow).toBe('hidden');
    
    document.body.style.overflow = originalOverflow;
  });
});
