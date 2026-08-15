/**
 * Tests for Skeleton and EmptyState components
 * 
 * Risk: These components handle loading and empty states. Incorrect
 * behavior could confuse users about data availability.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Skeleton, SkeletonCard } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';

describe('Skeleton', () => {
  it('should render single skeleton line', () => {
    const { container } = render(<Skeleton />);
    expect(container.querySelector('.skeleton')).toBeInTheDocument();
  });

  it('should render multiple skeleton lines', () => {
    const { container } = render(<Skeleton lines={3} />);
    const skeletons = container.querySelectorAll('.skeleton');
    expect(skeletons.length).toBe(3);
  });

  it('should apply custom className', () => {
    const { container } = render(<Skeleton className="custom-skeleton" />);
    expect(container.firstChild).toHaveClass('custom-skeleton');
  });
});

describe('SkeletonCard', () => {
  it('should render skeleton card', () => {
    const { container } = render(<SkeletonCard />);
    expect(container.querySelector('.noc-card')).toBeInTheDocument();
  });

  it('should show multiple skeleton lines', () => {
    const { container } = render(<SkeletonCard />);
    const skeletons = container.querySelectorAll('.skeleton');
    expect(skeletons.length).toBeGreaterThan(2);
  });

  it('should apply custom className', () => {
    const { container } = render(<SkeletonCard className="custom-skeleton-card" />);
    expect(container.firstChild).toHaveClass('custom-skeleton-card');
  });
});

describe('EmptyState', () => {
  it('should render title and description', () => {
    render(
      <EmptyState
        title="No Data"
        description="There is no data to display"
      />
    );
    
    expect(screen.getByText('No Data')).toBeInTheDocument();
    expect(screen.getByText('There is no data to display')).toBeInTheDocument();
  });

  it('should render custom icon', () => {
    const { container } = render(
      <EmptyState
        title="No Data"
        description="There is no data to display"
        icon={<span data-testid="custom-icon">Icon</span>}
      />
    );
    
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('should render action when provided', () => {
    render(
      <EmptyState
        title="No Data"
        description="There is no data to display"
        action={<button>Try Again</button>}
      />
    );
    
    expect(screen.getByText('Try Again')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(
      <EmptyState
        title="No Data"
        description="There is no data to display"
        className="custom-empty-state"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-empty-state');
  });
});
