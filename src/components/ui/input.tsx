import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  prefix?: string;
  suffix?: string;
}

export function Input({ label, error, helper, prefix, suffix, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-body-sm font-medium text-base-muted">
          {label}
        </label>
      )}
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-muted font-mono text-body-sm">
            {prefix}
          </span>
        )}
        <input
          className={`w-full bg-base-surface-light border border-base-border rounded-lg px-3 py-2 text-white placeholder-base-muted/50 text-body-md focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors ${
            prefix ? 'pl-12' : ''
          } ${suffix ? 'pr-12' : ''} ${error ? 'border-status-critical' : ''} ${className}`}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base-muted font-mono text-body-sm">
            {suffix}
          </span>
        )}
      </div>
      {error && <p className="text-body-sm text-status-critical">{error}</p>}
      {helper && !error && <p className="text-body-sm text-base-muted">{helper}</p>}
    </div>
  );
}
