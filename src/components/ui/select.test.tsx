/**
 * Tests for Select component
 * 
 * Risk: Select components are used for filtering and configuration.
 * Incorrect behavior could cause wrong filter selection.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from '@/components/ui/select';

describe('Select', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('should render select with options', () => {
    render(<Select label="Test Select" options={options} />);
    expect(screen.getByLabelText('Test Select')).toBeInTheDocument();
  });

  it('should display all options', () => {
    render(<Select label="Test Select" options={options} />);
    
    options.forEach((opt) => {
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    });
  });

  it('should call onChange when value changes', () => {
    const handleChange = jest.fn();
    render(<Select label="Test Select" options={options} onChange={handleChange} />);
    
    const select = screen.getByLabelText('Test Select');
    fireEvent.change(select, { target: { value: 'option2' } });
    
    expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: 'option2' } }));
  });

  it('should show error when provided', () => {
    render(<Select label="Test Select" options={options} error="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    const { container } = render(<Select label="Test Select" options={options} className="custom-select" />);
    expect(container.querySelector('select')).toHaveClass('custom-select');
  });

  it('should have default value', () => {
    render(<Select label="Test Select" options={options} defaultValue="option2" />);
    
    const select = screen.getByLabelText('Test Select');
    expect(select).toHaveValue('option2');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Select label="Test Select" options={options} disabled />);
    expect(screen.getByLabelText('Test Select')).toBeDisabled();
  });
});
