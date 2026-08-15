export const ROLES = {
  noc_lead: 'NOC Lead',
  engineer: 'Engineer',
  viewer: 'Viewer',
} as const;

export const SEVERITY_COLORS = {
  P1: '#EF4444',
  P2: '#F59E0B',
  P3: '#38BDF8',
  P4: '#94A3B8',
} as const;

export const DEVICE_STATUS_COLORS = {
  online: '#22D3EE',
  degraded: '#F59E0B',
  critical: '#EF4444',
  offline: '#94A3B8',
  maintenance: '#A78BFA',
} as const;

export const DEVICE_STATUS_LABELS = {
  online: 'Online',
  degraded: 'Degraded',
  critical: 'Critical',
  offline: 'Offline',
  maintenance: 'Maintenance',
} as const;

export const REGION_LABELS = {
  northeast: 'Northeast',
  southeast: 'Southeast',
  midwest: 'Midwest',
  southwest: 'Southwest',
  west_coast: 'West Coast',
  international: 'International',
} as const;

export const DEVICE_TYPE_LABELS = {
  core_router: 'Core Router',
  distribution_switch: 'Distribution Switch',
  access_switch: 'Access Switch',
  optical_terminal: 'Optical Terminal',
  olt: 'OLT',
  router_edge: 'Edge Router',
  firewall: 'Firewall',
  load_balancer: 'Load Balancer',
  dns_server: 'DNS Server',
  ntp_server: 'NTP Server',
  power_distribution: 'Power Distribution',
  ups: 'UPS',
} as const;
