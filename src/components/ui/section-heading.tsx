import React from 'react';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeading({ eyebrow, title, subtitle, action, className = '' }: SectionHeadingProps) {
  return (
    <div className={`flex items-start justify-between gap-4 mb-6 ${className}`}>
      <div className="space-y-1">
        {eyebrow && (
          <p className="text-label font-medium tracking-wider text-brand-blue uppercase">
            {eyebrow}
          </p>
        )}
        <h2 className="text-display-sm font-bold text-white leading-tight">{title}</h2>
        {subtitle && <p className="text-body-md text-base-muted">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
