import React from 'react';

interface NetworkTopologyGraphProps {
  className?: string;
}

export function NetworkTopologyGraph({ className = '' }: NetworkTopologyGraphProps) {
  return (
    <div className={`noc-card ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-body-md font-semibold text-white">Network Topology</h3>
        <span className="text-body-xs font-mono text-base-muted">SVG Placeholder</span>
      </div>
      <div className="relative h-80 bg-base-surface-light rounded-lg overflow-hidden flex items-center justify-center">
        {/* Simplified topology visualization with CSS/SVG */}
        <svg viewBox="0 0 800 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Core routers */}
          <circle cx="400" cy="40" r="24" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
          <text x="400" y="45" textAnchor="middle" fill="#22D3EE" fontSize="10" fontFamily="monospace">CR-NYC</text>

          <circle cx="200" cy="40" r="24" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
          <text x="200" y="45" textAnchor="middle" fill="#22D3EE" fontSize="10" fontFamily="monospace">CR-LA</text>

          <circle cx="600" cy="40" r="24" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
          <text x="600" y="45" textAnchor="middle" fill="#22D3EE" fontSize="10" fontFamily="monospace">CR-SF</text>

          {/* Distribution switches */}
          <circle cx="120" cy="140" r="20" fill="#0F172A" stroke="#F59E0B" strokeWidth="2" />
          <text x="120" y="145" textAnchor="middle" fill="#F59E0B" fontSize="9" fontFamily="monospace">DS-CHI</text>

          <circle cx="280" cy="140" r="20" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
          <text x="280" y="145" textAnchor="middle" fill="#22D3EE" fontSize="9" fontFamily="monospace">DS-MIA</text>

          <circle cx="520" cy="140" r="20" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
          <text x="520" y="145" textAnchor="middle" fill="#22D3EE" fontSize="9" fontFamily="monospace">DS-SEA</text>

          <circle cx="680" cy="140" r="20" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
          <text x="680" y="145" textAnchor="middle" fill="#22D3EE" fontSize="9" fontFamily="monospace">DS-DEN</text>

          {/* Access layer */}
          <circle cx="60" cy="240" r="16" fill="#0F172A" stroke="#EF4444" strokeWidth="2" />
          <text x="60" y="245" textAnchor="middle" fill="#EF4444" fontSize="8" fontFamily="monospace">AS-DAL</text>

          <circle cx="180" cy="240" r="16" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
          <text x="180" y="245" textAnchor="middle" fill="#22D3EE" fontSize="8" fontFamily="monospace">OT-ATL</text>

          <circle cx="340" cy="240" r="16" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
          <text x="340" y="245" textAnchor="middle" fill="#22D3EE" fontSize="8" fontFamily="monospace">OLT-SEA</text>

          <circle cx="460" cy="240" r="16" fill="#0F172A" stroke="#A78BFA" strokeWidth="2" />
          <text x="460" y="245" textAnchor="middle" fill="#A78BFA" fontSize="8" fontFamily="monospace">LB-DEN</text>

          <circle cx="580" cy="240" r="16" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
          <text x="580" y="245" textAnchor="middle" fill="#22D3EE" fontSize="8" fontFamily="monospace">FW-BOS</text>

          <circle cx="720" cy="240" r="16" fill="#0F172A" stroke="#22D3EE" strokeWidth="2" />
          <text x="720" y="245" textAnchor="middle" fill="#22D3EE" fontSize="8" fontFamily="monospace">DNS-PHL</text>

          {/* Links */}
          <line x1="224" y1="55" x2="176" y2="55" stroke="#334155" strokeWidth="1.5" />
          <line x1="424" y1="55" x2="576" y2="55" stroke="#334155" strokeWidth="1.5" />
          <line x1="224" y1="40" x2="376" y2="40" stroke="#334155" strokeWidth="1.5" />

          <line x1="180" y1="64" x2="140" y2="120" stroke="#334155" strokeWidth="1" />
          <line x1="220" y1="64" x2="260" y2="120" stroke="#334155" strokeWidth="1" />
          <line x1="400" y1="64" x2="290" y2="120" stroke="#334155" strokeWidth="1" />
          <line x1="400" y1="64" x2="510" y2="120" stroke="#334155" strokeWidth="1" />
          <line x1="580" y1="64" x2="540" y2="120" stroke="#334155" strokeWidth="1" />
          <line x1="620" y1="64" x2="660" y2="120" stroke="#334155" strokeWidth="1" />

          {/* Cross-links */}
          <line x1="140" y1="160" x2="260" y2="160" stroke="#334155" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="300" y1="160" x2="500" y2="160" stroke="#334155" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="540" y1="160" x2="660" y2="160" stroke="#334155" strokeWidth="1" strokeDasharray="4 2" />

          <line x1="100" y1="160" x2="80" y2="224" stroke="#334155" strokeWidth="1" />
          <line x1="140" y1="160" x2="160" y2="224" stroke="#334155" strokeWidth="1" />
          <line x1="300" y1="160" x2="320" y2="224" stroke="#334155" strokeWidth="1" />
          <line x1="540" y1="160" x2="480" y2="224" stroke="#334155" strokeWidth="1" />
          <line x1="560" y1="160" x2="560" y2="224" stroke="#334155" strokeWidth="1" />
          <line x1="700" y1="160" x2="600" y2="224" stroke="#334155" strokeWidth="1" />

          {/* Cross-links access */}
          <line x1="100" y1="256" x2="320" y2="256" stroke="#334155" strokeWidth="1" strokeDasharray="4 2" />
          <line x1="360" y1="256" x2="560" y2="256" stroke="#334155" strokeWidth="1" strokeDasharray="4 2" />
        </svg>

        {/* Legend */}
        <div className="absolute bottom-2 right-2 flex gap-3 text-body-xs font-mono">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-status-online" /> Online</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-status-degraded" /> Degraded</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-status-critical" /> Critical</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-status-maintenance" /> Maintenance</span>
        </div>
      </div>
    </div>
  );
}
