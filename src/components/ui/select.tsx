import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export function Select({ label, error, options, className = '', ...props }: SelectProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-body-sm font-medium text-base-muted">{label}</label>}
      <select
        className={`w-full bg-base-surface-light border border-base-border rounded-lg px-3 py-2 text-white text-body-md focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors appearance-none ${
          error ? 'border-status-critical' : ''
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-body-sm text-status-critical">{error}</p>}
    </div>
  );
}
