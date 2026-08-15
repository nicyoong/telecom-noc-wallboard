export type DeviceStatus = 'online' | 'degraded' | 'critical' | 'offline' | 'maintenance';
export type Severity = 'P1' | 'P2' | 'P3' | 'P4';
export type IncidentType =
  | 'link_failure'
  | 'device_fault'
  | 'bandwidth_saturation'
  | 'power_failure'
  | 'fiber_cut'
  | 'routing_instability'
  | 'dns_failure'
  | 'ssl_expiry'
  | 'latency_spike'
  | 'packet_loss'
  | 'config_drift'
  | 'firmware_failure';
export type Region =
  | 'northeast'
  | 'southeast'
  | 'midwest'
  | 'southwest'
  | 'west_coast'
  | 'international';
export type DeviceType =
  | 'core_router'
  | 'distribution_switch'
  | 'access_switch'
  | 'optical_terminal'
  | 'olt'
  | 'router_edge'
  | 'firewall'
  | 'load_balancer'
  | 'dns_server'
  | 'ntp_server'
  | 'power_distribution'
  | 'ups';

export interface Device {
  id: string;
  hostname: string;
  ip_address: string;
  device_type: DeviceType;
  status: DeviceStatus;
  region: Region;
  location: string;
  last_seen: string;
  uptime_hours: number;
  cpu_utilization: number;
  memory_utilization: number;
  port_utilization: Record<string, number>;
  firmware_version: string;
  serial_number: string;
  [key: string]: unknown;
}

export interface Incident {
  id: string;
  severity: Severity;
  title: string;
  description: string;
  device_id?: string;
  region: Region;
  status: 'active' | 'acknowledged' | 'investigating' | 'resolved' | 'escalated';
  created_at: string;
  acknowledged_at?: string;
  resolved_at?: string;
  assigned_to?: string;
  affected_services: string[];
  timeline: IncidentEvent[];
  [key: string]: unknown;
}

export interface IncidentEvent {
  timestamp: string;
  action: string;
  author: string;
}

export interface ShiftLog {
  id: string;
  shift: 'day' | 'night';
  date: string;
  operator: string;
  station: string;
  entry_time: string;
  exit_time?: string;
  notes: string;
  incidents_handled: number;
  equipment_issues: string[];
  [key: string]: unknown;
}

export interface BandwidthMetric {
  interface: string;
  region: Region;
  utilization: number;
  peak_utilization: number;
  average_utilization: number;
  trend: 'up' | 'down' | 'stable';
  last_updated: string;
}

export interface NetworkHealth {
  score: number;
  total_devices: number;
  online_devices: number;
  critical_incidents: number;
  degraded_incidents: number;
  avg_latency_ms: number;
  avg_jitter_ms: number;
  packet_loss_percent: number;
  total_bandwidth_gbps: number;
  utilized_bandwidth_gbps: number;
  last_updated: string;
}

export type KpiMetric = 'uptime' | 'latency' | 'jitter' | 'packet_loss' | 'bandwidth';
