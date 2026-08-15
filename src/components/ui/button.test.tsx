/**
 * Tests for Button component
 * 
 * Risk: Buttons are primary interaction points. Incorrect variants or
 * states could prevent critical actions like incident escalation.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('should render primary button', () => {
    render(<Button variant="primary">Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('should render all variants', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    
    ['secondary', 'outline', 'ghost'].forEach((variant) => {
      rerender(<Button variant={variant as any}>Test</Button>);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  it('should support all sizes', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    
    ['md', 'lg'].forEach((size) => {
      rerender(<Button size={size as any}>Test</Button>);
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  it('should be disabled when isLoading is true', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByText('Loading')).toBeDisabled();
  });

  it('should show loading spinner', () => {
    const { container } = render(<Button isLoading>Loading</Button>);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<Button className="custom-btn">Test</Button>);
    expect(container.firstChild).toHaveClass('custom-btn');
  });

  it('should call onClick handler', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should render icon on left', () => {
    const { container } = render(
      <Button icon={<span data-testid="icon">Icon</span>} iconPosition="left">
        Test
      </Button>
    );
    
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should render icon on right', () => {
    const { container } = render(
      <Button icon={<span data-testid="icon">Icon</span>} iconPosition="right">
        Test
      </Button>
    );
    
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });
});
