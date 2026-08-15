# NetWatch NOC - Network Operations Center

A production-grade Next.js 14 application for telecom network monitoring and operations.

## Overview

NetWatch NOC is a comprehensive Network Operations Center (NOC) monitoring platform designed for 24/7 telecom infrastructure management. The application provides real-time visibility into network topology, device health, bandwidth utilization, and active incidents.

### Key Features

- **Network Topology Visualization** - Interactive canvas-based network graph with zoom/pan controls
- **Device Health Monitoring** - Real-time device status with filtering, search, and sorting
- **Incident Management** - Complete incident lifecycle from detection to resolution
- **Bandwidth Monitoring** - Utilization metrics, top talkers, and congestion alerts
- **Shift Handover** - Digital shift log with handover notes and open items
- **Alert Management** - Multi-channel alerting with acknowledgment and resolution
- **Wallboard Mode** - Full-screen display optimized for large monitors
- **Reports** - Automated report generation with scheduling

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3 with custom design system
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint flat config + Prettier
- **Icons**: Lucide React
- **Fonts**: Inter (sans-serif) + JetBrains Mono (monospace)

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd telecom-noc-wallboard

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

### Run Tests

```bash
npm test
npm run test:coverage
```

### Lint Code

```bash
npm run lint
```

## Feature List

### Pages

| Route | Description |
|-------|-------------|
| `/dashboard` | Main monitoring dashboard with tabs |
| `/topology` | Network topology visualization |
| `/devices` | Device health monitoring |
| `/devices/[id]` | Device detail page |
| `/bandwidth` | Bandwidth utilization monitor |
| `/incidents` | Active incidents management |
| `/incidents/[id]` | Incident detail page |
| `/shift-log` | Shift handover log |
| `/alerts` | Alert management |
| `/settings` | System settings configuration |
| `/profile` | User profile management |
| `/reports` | Report generation and management |
| `/maintenance` | Maintenance window scheduling |
| `/escalation` | Escalation matrix configuration |
| `/health` | System health monitoring |
| `/wallboard` | Full-screen wallboard display |
| `/login` | Authentication |

### Components

- **Layout**: Header, Sidebar, TabNav, Footer, MobileBottomNav, HealthBar
- **UI**: Badge, Button, Card, DataTable, Dialog, Drawer, Input, Select, Tabs, Toast, Skeleton, StatCard
- **Views**: TopologyView, DeviceHealthView, BandwidthView, IncidentsView, ShiftLogView
- **Features**: NetworkTopologyGraph, Heatmap

## Folder Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/
│   ├── topology/
│   ├── devices/
│   ├── bandwidth/
│   ├── incidents/
│   ├── shift-log/
│   ├── alerts/
│   ├── settings/
│   ├── profile/
│   ├── reports/
│   ├── maintenance/
│   ├── escalation/
│   ├── health/
│   ├── wallboard/
│   ├── login/
│   ├── error/             # Error pages
│   ├── not-found/         # 404 page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── layout/            # Layout components
│   ├── ui/                # Reusable UI components
│   ├── features/          # Feature-specific components
│   ├── views/             # Page view components
│   └── errors/            # Error boundaries
├── contexts/              # React contexts
├── data/                  # Mock data
├── types/                 # TypeScript types
├── constants/             # App constants
├── hooks/                 # Custom React hooks
└── __test__/              # Test utilities
```

## Design System

### Colors

- **Base**: `#000000` (background), `#0F172A` (surface), `#1E293B` (surface light)
- **Brand**: `#38BDF8` (blue), `#22D3EE` (cyan)
- **Status**: `#22D3EE` (online), `#F59E0B` (degraded), `#EF4444` (critical), `#94A3B8` (offline), `#A78BFA` (maintenance)

### Typography

- **Sans**: Inter
- **Mono**: JetBrains Mono

### Spacing

Based on 4px grid system with Tailwind's default spacing scale.

## Wallboard Deployment Guide

### Full-Screen Mode

1. Navigate to `/wallboard`
2. Press `F` to toggle fullscreen
3. Use `SPACE` to pause/play auto-cycling
4. Press `ESC` to exit wallboard mode

### Multi-Monitor Setup

The wallboard mode supports:
- Single large monitor (1920x1080)
- Multi-monitor setups (3840x2160 4K)
- Projector displays

### Browser Requirements

- Chrome 90+ (recommended)
- Firefox 88+
- Safari 14+
- Edge 90+

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `ESC` | Exit wallboard mode |
| `SPACE` | Pause/play auto-cycling |
| `F` | Toggle fullscreen |
| `←` `→` | Navigate between views |

## Accessibility

- WCAG AA compliant color contrast
- Keyboard navigation support
- ARIA labels on all interactive elements
- Skip-to-content link
- Reduced motion support
- Focus visible states
- Screen reader friendly

## Performance

- Font optimization with `next/font`
- Code splitting with Next.js App Router
- Memoized computations with `useMemo`
- Debounced search inputs
- Efficient re-rendering for real-time updates

## Testing

Run the test suite:

```bash
npm test
```

View coverage report:

```bash
npm run test:coverage
```

## License

MIT

## Support

For support, email noc-support@netwatch.example.com or call 1-800-NOC-WATCH.
