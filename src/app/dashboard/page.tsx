'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Header } from '@/components/layout/header';
import { HealthBar } from '@/components/layout/health-bar';
import { TabNav } from '@/components/layout/tab-nav';
import { Sidebar } from '@/components/layout/sidebar';
import { Footer } from '@/components/layout/footer';
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav';
import { AlertTicker } from '@/components/ui/alert-ticker';
import { TopologyView } from '@/components/views/topology-view';
import { DeviceHealthView } from '@/components/views/device-health-view';
import { BandwidthView } from '@/components/views/bandwidth-view';
import { IncidentsView } from '@/components/views/incidents-view';
import { ShiftLogView } from '@/components/views/shift-log-view';
import { MobileDashboard } from '@/components/views/mobile-dashboard';
import { MOCK_NETWORK_HEALTH, MOCK_INCIDENTS } from '@/data/mock';

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('topology');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    const onResize = () => checkMobile();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
    setSidebarOpen(false);
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-brand-blue border-t-transparent rounded-full animate-spin" />
          <p className="text-base-muted font-mono text-body-md">Loading NetWatch NOC...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-brand-blue/10 border border-brand-blue/30 flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-brand-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-display-md font-bold text-white">NetWatch NOC</h1>
          <p className="text-body-md text-base-muted">Authentication required</p>
          <p className="text-body-sm text-base-muted">Please sign in to access the monitoring dashboard.</p>
          <div className="pt-4">
            <a
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-blue text-base font-medium rounded-lg hover:bg-brand-blue/90 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Sign In
            </a>
          </div>
        </div>
      </div>
    );
  }

  const renderView = () => {
    if (isMobile) {
      return <MobileDashboard />;
    }

    switch (activeTab) {
      case 'topology':
        return <TopologyView />;
      case 'devices':
        return <DeviceHealthView />;
      case 'bandwidth':
        return <BandwidthView />;
      case 'incidents':
        return <IncidentsView />;
      case 'shift':
        return <ShiftLogView />;
      default:
        return <TopologyView />;
    }
  };

  return (
    <div className="min-h-screen bg-base flex flex-col">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <AlertTicker />
      <HealthBar health={MOCK_NETWORK_HEALTH} incidents={MOCK_INCIDENTS} />
      <TabNav activeTab={activeTab} onTabChange={handleTabChange} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {renderView()}
        </main>
      </div>

      <Footer />
      <MobileBottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}
