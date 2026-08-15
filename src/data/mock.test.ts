/**
 * Tests for mock data integrity
 * 
 * Risk: Mock data with incorrect telecom terminology, missing required
 * fields, or invalid status values would break UI components that depend
 * on these constants.
 */

import {
  MOCK_DEVICES,
  MOCK_INCIDENTS,
  MOCK_SHIFT_LOGS,
  MOCK_BANDWIDTH,
  MOCK_NETWORK_HEALTH,
} from '@/data/mock';
import type {
  Device,
  Incident,
  ShiftLog,
  BandwidthMetric,
  NetworkHealth,
  Severity,
  DeviceStatus,
  Region,
  DeviceType,
} from '@/types';

describe('Mock Data Integrity', () => {
  describe('MOCK_DEVICES', () => {
    it('should contain at least 10 devices', () => {
      expect(MOCK_DEVICES.length).toBeGreaterThanOrEqual(10);
    });

    it('should have all required device fields', () => {
      MOCK_DEVICES.forEach((device: Device) => {
        expect(device).toHaveProperty('id');
        expect(device).toHaveProperty('hostname');
        expect(device).toHaveProperty('ip_address');
        expect(device).toHaveProperty('device_type');
        expect(device).toHaveProperty('status');
        expect(device).toHaveProperty('region');
        expect(device).toHaveProperty('location');
        expect(device).toHaveProperty('last_seen');
        expect(device).toHaveProperty('uptime_hours');
        expect(device).toHaveProperty('cpu_utilization');
        expect(device).toHaveProperty('memory_utilization');
        expect(device).toHaveProperty('port_utilization');
        expect(device).toHaveProperty('firmware_version');
        expect(device).toHaveProperty('serial_number');
      });
    });

    it('should have valid device status values', () => {
      const validStatuses: DeviceStatus[] = ['online', 'degraded', 'critical', 'offline', 'maintenance'];
      MOCK_DEVICES.forEach((device: Device) => {
        expect(validStatuses).toContain(device.status);
      });
    });

    it('should have valid severity values in incidents', () => {
      const validSeverities: Severity[] = ['P1', 'P2', 'P3', 'P4'];
      MOCK_INCIDENTS.forEach((incident: Incident) => {
        expect(validSeverities).toContain(incident.severity);
      });
    });

    it('should have incidents with timeline events', () => {
      MOCK_INCIDENTS.forEach((incident: Incident) => {
        expect(Array.isArray(incident.timeline)).toBe(true);
        if (incident.timeline.length > 0) {
          expect(incident.timeline[0]).toHaveProperty('timestamp');
          expect(incident.timeline[0]).toHaveProperty('action');
          expect(incident.timeline[0]).toHaveProperty('author');
        }
      });
    });

    it('should have devices across multiple regions', () => {
      const regions = new Set(MOCK_DEVICES.map((d: Device) => d.region));
      expect(regions.size).toBeGreaterThanOrEqual(3);
    });

    it('should have devices across multiple types', () => {
      const types = new Set(MOCK_DEVICES.map((d: Device) => d.device_type));
      expect(types.size).toBeGreaterThanOrEqual(5);
    });

    it('should have realistic IP addresses', () => {
      MOCK_DEVICES.forEach((device: Device) => {
        expect(device.ip_address).toMatch(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/);
      });
    });

    it('should have hostname with NOC-style naming', () => {
      MOCK_DEVICES.forEach((device: Device) => {
        // Hostnames should follow NOC conventions (short, descriptive)
        expect(device.hostname.length).toBeGreaterThan(3);
        expect(device.hostname.length).toBeLessThan(50);
        // Should not contain spaces or special characters
        expect(device.hostname).not.toContain(' ');
        expect(device.hostname).toMatch(/^[a-zA-Z0-9._-]+$/);
      });
    });
  });

  describe('MOCK_INCIDENTS', () => {
    it('should contain at least 5 incidents', () => {
      expect(MOCK_INCIDENTS.length).toBeGreaterThanOrEqual(5);
    });

    it('should have all required incident fields', () => {
      MOCK_INCIDENTS.forEach((incident: Incident) => {
        expect(incident).toHaveProperty('id');
        expect(incident).toHaveProperty('severity');
        expect(incident).toHaveProperty('title');
        expect(incident).toHaveProperty('description');
        expect(incident).toHaveProperty('region');
        expect(incident).toHaveProperty('status');
        expect(incident).toHaveProperty('created_at');
        expect(incident).toHaveProperty('affected_services');
        expect(incident).toHaveProperty('timeline');
      });
    });

    it('should have realistic incident titles with telecom terminology', () => {
      MOCK_INCIDENTS.forEach((incident: Incident) => {
        // Incidents should have meaningful titles
        expect(incident.title.length).toBeGreaterThan(5);
        expect(incident.title.length).toBeLessThan(200);
        // Should not be empty or generic
        expect(incident.title.toLowerCase()).not.toBe('incident');
        expect(incident.title.toLowerCase()).not.toBe('alert');
      });
    });

    it('should have P1 incidents for critical issues', () => {
      const p1Incidents = MOCK_INCIDENTS.filter((i: Incident) => i.severity === 'P1');
      expect(p1Incidents.length).toBeGreaterThanOrEqual(2);
    });

    it('should have active incidents with investigating status', () => {
      const investigating = MOCK_INCIDENTS.filter((i: Incident) => i.status === 'investigating');
      expect(investigating.length).toBeGreaterThan(0);
    });
  });

  describe('MOCK_SHIFT_LOGS', () => {
    it('should contain at least 2 shift logs', () => {
      expect(MOCK_SHIFT_LOGS.length).toBeGreaterThanOrEqual(2);
    });

    it('should have all required shift log fields', () => {
      MOCK_SHIFT_LOGS.forEach((log: ShiftLog) => {
        expect(log).toHaveProperty('id');
        expect(log).toHaveProperty('shift');
        expect(log).toHaveProperty('date');
        expect(log).toHaveProperty('operator');
        expect(log).toHaveProperty('station');
        expect(log).toHaveProperty('entry_time');
        expect(log).toHaveProperty('notes');
        expect(log).toHaveProperty('incidents_handled');
        expect(log).toHaveProperty('equipment_issues');
      });
    });

    it('should have valid shift values', () => {
      MOCK_SHIFT_LOGS.forEach((log: ShiftLog) => {
        expect(['day', 'night']).toContain(log.shift);
      });
    });
  });

  describe('MOCK_BANDWIDTH', () => {
    it('should contain at least 5 bandwidth metrics', () => {
      expect(MOCK_BANDWIDTH.length).toBeGreaterThanOrEqual(5);
    });

    it('should have all required bandwidth fields', () => {
      MOCK_BANDWIDTH.forEach((metric: BandwidthMetric) => {
        expect(metric).toHaveProperty('interface');
        expect(metric).toHaveProperty('region');
        expect(metric).toHaveProperty('utilization');
        expect(metric).toHaveProperty('peak_utilization');
        expect(metric).toHaveProperty('average_utilization');
        expect(metric).toHaveProperty('trend');
        expect(metric).toHaveProperty('last_updated');
      });
    });

    it('should have utilization values between 0 and 100', () => {
      MOCK_BANDWIDTH.forEach((metric: BandwidthMetric) => {
        expect(metric.utilization).toBeGreaterThanOrEqual(0);
        expect(metric.utilization).toBeLessThanOrEqual(100);
      });
    });

    it('should have valid trend values', () => {
      const validTrends = ['up', 'down', 'stable'];
      MOCK_BANDWIDTH.forEach((metric: BandwidthMetric) => {
        expect(validTrends).toContain(metric.trend);
      });
    });
  });

  describe('MOCK_NETWORK_HEALTH', () => {
    it('should have all required health fields', () => {
      const health: NetworkHealth = MOCK_NETWORK_HEALTH;
      expect(health).toHaveProperty('score');
      expect(health).toHaveProperty('total_devices');
      expect(health).toHaveProperty('online_devices');
      expect(health).toHaveProperty('critical_incidents');
      expect(health).toHaveProperty('degraded_incidents');
      expect(health).toHaveProperty('avg_latency_ms');
      expect(health).toHaveProperty('avg_jitter_ms');
      expect(health).toHaveProperty('packet_loss_percent');
      expect(health).toHaveProperty('total_bandwidth_gbps');
      expect(health).toHaveProperty('utilized_bandwidth_gbps');
      expect(health).toHaveProperty('last_updated');
    });

    it('should have a health score between 0 and 100', () => {
      expect(MOCK_NETWORK_HEALTH.score).toBeGreaterThanOrEqual(0);
      expect(MOCK_NETWORK_HEALTH.score).toBeLessThanOrEqual(100);
    });

    it('should have more online devices than total', () => {
      expect(MOCK_NETWORK_HEALTH.online_devices).toBeLessThanOrEqual(MOCK_NETWORK_HEALTH.total_devices);
    });

    it('should have positive latency and jitter values', () => {
      expect(MOCK_NETWORK_HEALTH.avg_latency_ms).toBeGreaterThan(0);
      expect(MOCK_NETWORK_HEALTH.avg_jitter_ms).toBeGreaterThan(0);
    });

    it('should have bandwidth utilization less than total', () => {
      expect(MOCK_NETWORK_HEALTH.utilized_bandwidth_gbps).toBeLessThanOrEqual(
        MOCK_NETWORK_HEALTH.total_bandwidth_gbps
      );
    });
  });
});
