/**
 * Tests for Input component
 * 
 * Risk: Input components are used for incident logging and filtering.
 * Incorrect behavior could cause data entry errors.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Input } from '@/components/ui/input';

describe('Input', () => {
  it('should render basic input', () => {
    render(<Input label="Test Input" />);
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<Input className="custom-input" />);
    expect(container.querySelector('input')).toHaveClass('custom-input');
  });

  it('should show helper text', () => {
    render(<Input helper="This is helper text" />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('should show error when provided', () => {
    render(<Input error="This is an error" />);
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('should show prefix', () => {
    render(<Input prefix="https://" />);
    expect(screen.getByText('https://')).toBeInTheDocument();
  });

  it('should show suffix', () => {
    render(<Input suffix=".com" />);
    expect(screen.getByText('.com')).toBeInTheDocument();
  });

  it('should have correct placeholder', () => {
    render(<Input placeholder="Enter text..." />);
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('should support different input types', () => {
    const { rerender } = render(<Input type="email" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    
    rerender(<Input type="password" />);
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});
