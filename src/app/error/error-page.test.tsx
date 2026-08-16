import React from 'react';
import { render, screen } from '@testing-library/react';
import ServerErrorPage from '@/app/error/page';
import NotFoundPage from '@/app/not-found/page';

describe('ServerErrorPage', () => {
  it('renders the server error heading', () => {
    render(<ServerErrorPage />);
    expect(screen.getByText('Server Error')).toBeInTheDocument();
  });

  it('displays the error message', () => {
    render(<ServerErrorPage />);
    expect(
      screen.getByText('An unexpected error occurred on the server. The NOC team has been notified.')
    ).toBeInTheDocument();
  });

  it('has a Back to Dashboard link', () => {
    render(<ServerErrorPage />);
    const link = screen.getByText('Back to Dashboard');
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/dashboard');
  });

  it('shows the NOC contact phone number', () => {
    render(<ServerErrorPage />);
    expect(screen.getByText('1-800-NOC-WATCH')).toBeInTheDocument();
    expect(screen.getByText(/If the problem persists/i)).toBeInTheDocument();
  });
});

describe('NotFoundPage', () => {
  it('renders the 404 heading', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('displays the not found message', () => {
    render(<NotFoundPage />);
    expect(
      screen.getByText("The page you're looking for doesn't exist or has been moved.")
    ).toBeInTheDocument();
  });

  it('has a Back to Dashboard link', () => {
    render(<NotFoundPage />);
    const link = screen.getByText('Back to Dashboard');
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/dashboard');
  });

  it('has a View Topology link', () => {
    render(<NotFoundPage />);
    const link = screen.getByText('View Topology');
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/topology');
  });

  it('displays the 404 number prominently', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });
});
