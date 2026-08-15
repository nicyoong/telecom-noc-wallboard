/**
 * Tests for constants
 * 
 * Risk: Constants define critical color mappings and labels. Incorrect
 * values could cause visual confusion or incorrect status display.
 */

import {
  ROLE_COLORS,
  DEVICE_STATUS_COLORS,
  DEVICE_STATUS_LABELS,
  SEVERITY_COLORS,
  REGION_LABELS,
  DEVICE_TYPE_LABELS,
} from '@/constants';
import type { DeviceStatus, Severity, Region, DeviceType } from '@/types';

describe('Constants', () => {
  describe('ROLE_COLORS', () => {
    it('should have colors for all roles', () => {
      expect(ROLE_COLORS.noc_lead).toBeDefined();
      expect(ROLE_COLORS.engineer).toBeDefined();
      expect(ROLE_COLORS.viewer).toBeDefined();
    });

    it('should have valid hex color values', () => {
      Object.values(ROLE_COLORS).forEach((color) => {
        expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });
    });
  });

  describe('DEVICE_STATUS_COLORS', () => {
    it('should have colors for all status types', () => {
      const statuses: DeviceStatus[] = ['online', 'degraded', 'critical', 'offline', 'maintenance'];
      statuses.forEach((status) => {
        expect(DEVICE_STATUS_COLORS[status]).toBeDefined();
      });
    });

    it('should have distinct colors for different statuses', () => {
      const colors = Object.values(DEVICE_STATUS_COLORS);
      const uniqueColors = new Set(colors);
      expect(uniqueColors.size).toBe(colors.length);
    });
  });

  describe('DEVICE_STATUS_LABELS', () => {
    it('should have labels for all status types', () => {
      const statuses: DeviceStatus[] = ['online', 'degraded', 'critical', 'offline', 'maintenance'];
      statuses.forEach((status) => {
        expect(DEVICE_STATUS_LABELS[status]).toBeDefined();
        expect(typeof DEVICE_STATUS_LABELS[status]).toBe('string');
      });
    });

    it('should have human-readable labels', () => {
      expect(DEVICE_STATUS_LABELS.online).toBe('Online');
      expect(DEVICE_STATUS_LABELS.critical).toBe('Critical');
      expect(DEVICE_STATUS_LABELS.degraded).toBe('Degraded');
    });
  });

  describe('SEVERITY_COLORS', () => {
    it('should have colors for all severity levels', () => {
      const severities: Severity[] = ['P1', 'P2', 'P3', 'P4'];
      severities.forEach((severity) => {
        expect(SEVERITY_COLORS[severity]).toBeDefined();
      });
    });

    it('should have critical color for P1', () => {
      expect(SEVERITY_COLORS.P1).toBe('#EF4444');
    });

    it('should have distinct colors for each severity', () => {
      const colors = Object.values(SEVERITY_COLORS);
      const uniqueColors = new Set(colors);
      expect(uniqueColors.size).toBe(colors.length);
    });
  });

  describe('REGION_LABELS', () => {
    it('should have labels for all regions', () => {
      const regions: Region[] = ['northeast', 'southeast', 'midwest', 'southwest', 'west_coast'];
      regions.forEach((region) => {
        expect(REGION_LABELS[region]).toBeDefined();
      });
    });

    it('should have readable region names', () => {
      expect(REGION_LABELS.northeast).toBe('Northeast');
      expect(REGION_LABELS.west_coast).toBe('West Coast');
    });
  });

  describe('DEVICE_TYPE_LABELS', () => {
    it('should have labels for all device types', () => {
      const types: DeviceType[] = [
        'core_router',
        'distribution_switch',
        'access_switch',
        'optical_terminal',
        'olt',
        'firewall',
        'load_balancer',
        'dns_server',
        'ups',
      ];
      types.forEach((type) => {
        expect(DEVICE_TYPE_LABELS[type]).toBeDefined();
      });
    });

    it('should have readable device type names', () => {
      expect(DEVICE_TYPE_LABELS.core_router).toBe('Core Router');
      expect(DEVICE_TYPE_LABELS.olt).toBe('OLT');
    });
  });
});
