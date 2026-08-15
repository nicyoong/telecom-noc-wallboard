import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export function Textarea({ label, error, helper, className = '', ...props }: TextareaProps) {
  return (
    <div className="space-y-1.5">
      {label && <label className="block text-body-sm font-medium text-base-muted">{label}</label>}
      <textarea
        className={`w-full bg-base-surface-light border border-base-border rounded-lg px-3 py-2 text-white placeholder-base-muted/50 text-body-md focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-colors resize-none ${
          error ? 'border-status-critical' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-body-sm text-status-critical">{error}</p>}
      {helper && !error && <p className="text-body-sm text-base-muted">{helper}</p>}
    </div>
  );
}
