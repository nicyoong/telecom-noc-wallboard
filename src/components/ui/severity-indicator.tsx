import React from 'react';
import { SEVERITY_COLORS } from '@/constants';
import type { Severity } from '@/types';

interface SeverityIndicatorProps {
  severity: Severity;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function SeverityIndicator({
  severity,
  size = 'md',
  showLabel = true,
  className = '',
}: SeverityIndicatorProps) {
  const color = SEVERITY_COLORS[severity];
  const sizeClasses = {
    sm: 'w-5 h-5 text-body-xs',
    md: 'w-7 h-7 text-body-sm',
    lg: 'w-9 h-9 text-body-md',
  };

  return (
    <span
      className={`inline-flex items-center justify-center font-mono font-bold rounded-full border-2 ${sizeClasses[size]} ${className}`}
      style={{ color, borderColor: color }}
      title={`Severity ${severity}`}
    >
      {severity}
      {showLabel && <span className="sr-only">{severity} severity</span>}
    </span>
  );
}

interface SeverityBadgeProps {
  severity: Severity;
  className?: string;
}

export function SeverityBadge({ severity, className = '' }: SeverityBadgeProps) {
  const color = SEVERITY_COLORS[severity];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-mono font-bold text-body-sm ${className}`}
      style={{ color, backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
    >
      {severity}
    </span>
  );
}
