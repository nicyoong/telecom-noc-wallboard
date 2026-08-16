import React from 'react';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './error-boundary';

describe('ErrorBoundary', () => {
  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Test Child</div>
      </ErrorBoundary>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('renders fallback prop when an error is thrown', () => {
    const customFallback = <div data-testid="fallback">Custom Fallback</div>;

    function Thrower() {
      throw new Error('Intentional error');
    }

    render(
      <ErrorBoundary fallback={customFallback}>
        <Thrower />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
    expect(screen.getByText('Custom Fallback')).toBeInTheDocument();
  });

  it('renders default error UI when child throws', () => {
    function Thrower() {
      throw new Error('Render error');
    }

    render(
      <ErrorBoundary>
        <Thrower />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(
      screen.getByText(
        'An error occurred while rendering this component. Please try refreshing the page.'
      )
    ).toBeInTheDocument();
  });

  it('renders error message in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    function Thrower() {
      throw new Error('Dev error message');
    }

    render(
      <ErrorBoundary>
        <Thrower />
      </ErrorBoundary>
    );

    expect(screen.getByText('Dev error message')).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('does not render error message in production mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    function Thrower() {
      throw new Error('Should not be visible');
    }

    render(
      <ErrorBoundary>
        <Thrower />
      </ErrorBoundary>
    );

    expect(screen.queryByText('Should not be visible')).not.toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('has Back to Dashboard link pointing to /dashboard', () => {
    function Thrower() {
      throw new Error('Test');
    }

    render(
      <ErrorBoundary>
        <Thrower />
      </ErrorBoundary>
    );

    const link = screen.getByText('Back to Dashboard');
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/dashboard');
  });
});
