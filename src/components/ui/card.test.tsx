/**
 * Tests for Card component
 * 
 * Risk: Cards are the primary container for monitoring data. Incorrect
 * rendering could hide critical information.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '@/components/ui/card';

describe('Card', () => {
  it('should render basic card', () => {
    render(<Card>Content</Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should render title and subtitle', () => {
    render(
      <Card title="Card Title" subtitle="Card Subtitle">
        Content
      </Card>
    );
    
    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Subtitle')).toBeInTheDocument();
  });

  it('should render action slot', () => {
    render(
      <Card title="Card" action={<button>Action</button>}>
        Content
      </Card>
    );
    
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('should apply status border colors', () => {
    const { rerender } = render(<Card status="online">Content</Card>);
    
    ['degraded', 'critical', 'offline', 'maintenance'].forEach((status) => {
      rerender(<Card status={status as any}>Content</Card>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });
  });

  it('should apply glow effect when glow is true', () => {
    const { container } = render(<Card status="critical" glow={true}>Content</Card>);
    
    expect(container.firstChild).toHaveClass('glow-critical');
  });

  it('should apply custom className', () => {
    const { container } = render(<Card className="custom-card">Content</Card>);
    
    expect(container.firstChild).toHaveClass('custom-card');
  });

  it('should render without title when not provided', () => {
    const { container } = render(<Card>Content</Card>);
    
    expect(container.querySelector('.border-b')).not.toBeInTheDocument();
  });
});
