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

    const Thrower = (): React.JSX.Element => {
      throw new Error('Intentional error');
    };

    render(
      <ErrorBoundary fallback={customFallback}>
        <Thrower />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
    expect(screen.getByText('Custom Fallback')).toBeInTheDocument();
  });

  it('renders default error UI when child throws', () => {
    const Thrower = (): React.JSX.Element => {
      throw new Error('Render error');
    };

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.env as any).NODE_ENV = 'development';

    const Thrower = (): React.JSX.Element => {
      throw new Error('Dev error message');
    };

    render(
      <ErrorBoundary>
        <Thrower />
      </ErrorBoundary>
    );

    expect(screen.getByText('Dev error message')).toBeInTheDocument();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.env as any).NODE_ENV = originalEnv;
  });

  it('does not render error message in production mode', () => {
    const originalEnv = process.env.NODE_ENV;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.env as any).NODE_ENV = 'production';

    const Thrower = (): React.JSX.Element => {
      throw new Error('Should not be visible');
    };

    render(
      <ErrorBoundary>
        <Thrower />
      </ErrorBoundary>
    );

    expect(screen.queryByText('Should not be visible')).not.toBeInTheDocument();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (process.env as any).NODE_ENV = originalEnv;
  });

  it('has Back to Dashboard link pointing to /dashboard', () => {
    const Thrower = (): React.JSX.Element => {
      throw new Error('Test');
    };

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
