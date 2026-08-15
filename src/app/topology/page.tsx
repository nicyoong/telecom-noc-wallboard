'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MOCK_DEVICES } from '@/data/mock';
import type { Device } from '@/types';

const NODE_TYPES = {
  core_router: { label: 'Core Router', color: '#38BDF8', radius: 28 },
  distribution_switch: { label: 'Distribution Switch', color: '#22D3EE', radius: 22 },
  access_switch: { label: 'Access Switch', color: '#34D399', radius: 18 },
  optical_terminal: { label: 'Optical Terminal', color: '#A78BFA', radius: 14 },
  olt: { label: 'OLT', color: '#F59E0B', radius: 20 },
  firewall: { label: 'Firewall', color: '#EF4444', radius: 24 },
  load_balancer: { label: 'Load Balancer', color: '#38BDF8', radius: 20 },
  dns_server: { label: 'DNS Server', color: '#94A3B8', radius: 16 },
  ups: { label: 'UPS', color: '#94A3B8', radius: 14 },
} as const;

const STATUS_COLORS: Record<string, string> = {
  online: '#22D3EE',
  degraded: '#F59E0B',
  critical: '#EF4444',
  offline: '#94A3B8',
  maintenance: '#A78BFA',
};

interface Link {
  source: string;
  target: string;
  bandwidth: number;
}

interface Node {
  id: string;
  device: Device;
  x: number;
  y: number;
}

export default function TopologyView() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const devices = MOCK_DEVICES.slice(0, 20);
    const initialNodes: Node[] = devices.map((d, i) => {
      const typeConfig = NODE_TYPES[d.device_type as keyof typeof NODE_TYPES] || NODE_TYPES.access_switch;
      const angle = (i / devices.length) * Math.PI * 2;
      const radius = 150 + Math.random() * 200;
      return { id: d.id, device: d, x: 400 + Math.cos(angle) * radius, y: 300 + Math.sin(angle) * radius };
    });
    const initialLinks: Link[] = [];
    for (let i = 0; i < initialNodes.length - 1; i++) {
      initialLinks.push({ source: initialNodes[i].id, target: initialNodes[i + 1].id, bandwidth: 40 + Math.random() * 60 });
    }
    setNodes(initialNodes);
    setLinks(initialLinks);
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);

    links.forEach((link) => {
      const src = nodes.find(n => n.id === link.source);
      const tgt = nodes.find(n => n.id === link.target);
      if (!src || !tgt) return;

      const utilization = link.bandwidth / 100;
      const r = Math.round(34 + utilization * 205);
      const g = Math.round(211 - utilization * 100);
      const b = Math.round(238 - utilization * 150);

      ctx.beginPath();
      ctx.moveTo(src.x, src.y);
      ctx.lineTo(tgt.x, tgt.y);
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.3 + utilization * 0.4})`;
      ctx.lineWidth = 1 + utilization * 2;
      ctx.stroke();
    });

    nodes.forEach((node) => {
      const typeConfig = NODE_TYPES[node.device.device_type as keyof typeof NODE_TYPES] || NODE_TYPES.access_switch;
      const statusColor = STATUS_COLORS[node.device.status] || '#94A3B8';
      const isHovered = hoveredNode === node.id;
      const isSelected = selectedNode?.id === node.id;
      const radius = typeConfig.radius * (isHovered ? 1.2 : 1) * (isSelected ? 1.3 : 1);

      if (node.device.status === 'critical' || node.device.status === 'degraded') {
        const pulse = Math.sin(Date.now() * 0.002) * 0.3 + 0.3;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 8, 0, Math.PI * 2);
        ctx.fillStyle = `${statusColor}${Math.round(pulse * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = '#0F172A';
      ctx.fill();
      ctx.strokeStyle = statusColor;
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(node.x, node.y, radius * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = statusColor;
      ctx.fill();

      ctx.font = '10px monospace';
      ctx.fillStyle = '#94A3B8';
      ctx.textAlign = 'center';
      ctx.fillText(node.device.hostname.substring(0, 12), node.x, node.y + radius + 14);

      ctx.beginPath();
      ctx.arc(node.x + radius * 0.7, node.y - radius * 0.7, 4, 0, Math.PI * 2);
      ctx.fillStyle = statusColor;
      ctx.fill();
    });

    ctx.restore();
    animRef.current = requestAnimationFrame(draw);
  }, [nodes, links, offset, scale, selectedNode, hoveredNode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = canvas.parentElement?.clientWidth || 1280;
    canvas.height = canvas.parentElement?.clientHeight || 720;
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - offset.x) / scale;
    const y = (e.clientY - rect.top - offset.y) / scale;

    const clicked = nodes.find(n => {
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) < 30;
    });
    setSelectedNode(clicked || null);
  }, [nodes, offset, scale]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(s => Math.min(Math.max(s * delta, 0.3), 3));
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  }, [offset]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white font-mono">Network Topology</h1>
          <p className="text-sm text-slate-400 mt-1">
            {nodes.length} nodes · {links.length} links · Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            {Object.entries(STATUS_COLORS).map(([status, color]) => (
              <div key={status} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-slate-400 capitalize">{status}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-sm text-white hover:bg-slate-700 transition-colors"
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>

      <div className="flex gap-4 flex-1 min-h-0">
        <div className="flex-1 relative bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={(e) => {
              if (isDragging) {
                setOffset({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
                return;
              }
              const canvas = canvasRef.current;
              if (!canvas) return;
              const rect = canvas.getBoundingClientRect();
              const x = (e.clientX - rect.left - offset.x) / scale;
              const y = (e.clientY - rect.top - offset.y) / scale;
              const hovered = nodes.find(n => {
                const dx = n.x - x;
                const dy = n.y - y;
                return Math.sqrt(dx * dx + dy * dy) < 30;
              });
              setHoveredNode(hovered?.id || null);
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            className="w-full h-full cursor-crosshair"
          />
          <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur border border-slate-700 rounded-lg p-3 text-xs">
            <div className="text-slate-400 mb-1">Controls:</div>
            <div className="text-slate-300">Scroll to zoom · Drag to pan · Click node for details</div>
          </div>
        </div>

        {selectedNode && (
          <div className="w-80 bg-slate-900 border border-slate-800 rounded-lg p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white font-mono">{selectedNode.device.hostname}</h3>
              <button onClick={() => setSelectedNode(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Status</span>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: `${STATUS_COLORS[selectedNode.device.status]}20`,
                    color: STATUS_COLORS[selectedNode.device.status] || '#94A3B8',
                  }}
                >
                  {selectedNode.device.status.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">IP Address</span>
                <span className="text-white font-mono">{selectedNode.device.ip_address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Device Type</span>
                <span className="text-white capitalize">{selectedNode.device.device_type.replace(/_/g, ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Region</span>
                <span className="text-white">{selectedNode.device.region.replace(/_/g, ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Uptime</span>
                <span className="text-white font-mono">{selectedNode.device.uptime_hours.toLocaleString()}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">CPU</span>
                <span className={`font-mono ${selectedNode.device.cpu_utilization > 80 ? 'text-red-400' : 'text-white'}`}>
                  {selectedNode.device.cpu_utilization}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Memory</span>
                <span className="text-white font-mono">{selectedNode.device.memory_utilization}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Firmware</span>
                <span className="text-white font-mono text-xs">{selectedNode.device.firmware_version}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Serial</span>
                <span className="text-white font-mono text-xs">{selectedNode.device.serial_number}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
