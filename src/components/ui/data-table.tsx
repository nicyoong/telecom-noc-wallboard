import React from 'react';

interface DataTableProps<T extends Record<string, unknown>> {
  columns: {
    key: string;
    label: string;
    render?: (_row: T, _index: number) => React.ReactNode;
  }[];
  data: T[];
  onRowClick?: (_row: T, _index: number) => void;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
  emptyMessage = 'No data available',
  className = '',
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 text-base-muted">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-base-border">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-label font-medium text-base-muted uppercase tracking-wider whitespace-nowrap"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-base-border">
          {data.map((row, index) => (
            <tr
              key={index}
              onClick={() => onRowClick?.(row, index)}
              className={`hover:bg-base-surface-light/50 transition-colors cursor-default ${
                onRowClick ? 'cursor-pointer' : ''
              }`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-body-md text-white font-mono">
                  {col.render ? col.render(row, index) : String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
