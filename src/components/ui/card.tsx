import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'status' | 'metric';
  status?: 'online' | 'degraded' | 'critical' | 'offline' | 'maintenance';
  glow?: boolean;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function Card({
  variant = 'default',
  status,
  glow = false,
  title,
  subtitle,
  action,
  children,
  className = '',
  ...props
}: CardProps) {
  const glowClass = glow && status ? `glow-${status}` : '';

  const variantClasses = {
    default: 'bg-base-surface border-base-border',
    status: status
      ? `bg-base-surface border ${
          status === 'critical'
            ? 'border-status-critical/50'
            : status === 'degraded'
              ? 'border-status-degraded/50'
              : 'border-base-border'
        }`
      : 'bg-base-surface border-base-border',
    metric: 'bg-base-surface border-base-border',
  };

  return (
    <div
      className={`rounded-lg border ${variantClasses[variant]} ${glowClass} overflow-hidden ${className}`}
      {...props}
    >
      {(title || subtitle || action) && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-base-border">
          <div>
            {title && <h3 className="text-body-md font-semibold text-white">{title}</h3>}
            {subtitle && <p className="text-body-sm text-base-muted mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
