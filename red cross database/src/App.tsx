import React, { useState, useEffect } from 'react';
import { ActiveTab, SupabaseConfig } from './types';
import { getSavedCredentials, isRealSupabaseConfigured, getSupabaseClient } from './lib/supabase';
import { Navbar } from './components/Navbar';
import { StatusChecker } from './components/StatusChecker';
import { CertChecker } from './components/CertChecker';
import { MemberRegistration } from './components/MemberRegistration';
import { CertificateRegistration } from './components/CertificateRegistration';
import { VotingPortal } from './components/VotingPortal';
import { AdminDashboard } from './components/AdminDashboard';
import { SqlSchemaView } from './components/SqlSchemaView';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';
import { ShieldCheck, Heart, Database, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('checker');
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(true); // Default enabled for instant prototype evaluation

  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfig>({
    url: '',
    anonKey: '',
    isConnected: false,
    isMockFallback: true,
  });

  const updateConfigStatus = () => {
    const creds = getSavedCredentials();
    const isReal = isRealSupabaseConfigured(creds.url, creds.anonKey);
    setSupabaseConfig({
      url: creds.url,
      anonKey: creds.anonKey,
      isConnected: isReal,
      isMockFallback: !isReal,
    });
  };

  useEffect(() => {
    updateConfigStatus();
  }, []);

  // Handler when coming from Registration success or Admin list
  const handleGoToCheckerWithId = (memberId?: string) => {
    setActiveTab('checker');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        supabaseConfig={supabaseConfig}
        onOpenConfigModal={() => setIsConfigModalOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onLogoutAdmin={() => setIsAdminLoggedIn(false)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'checker' && (
          <StatusChecker onGoToRegister={() => setActiveTab('register')} />
        )}

        {activeTab === 'cert-checker' && <CertChecker />}

        {activeTab === 'register' && (
          <MemberRegistration onGoToChecker={handleGoToCheckerWithId} />
        )}

        {activeTab === 'cert-register' && (
          <CertificateRegistration
            currentRole="main_admin"
            onSuccess={() => setActiveTab('cert-checker')}
          />
        )}

        {activeTab === 'voting' && <VotingPortal />}

        {activeTab === 'admin' && (
          <AdminDashboard
            isAdminLoggedIn={isAdminLoggedIn}
            setIsAdminLoggedIn={setIsAdminLoggedIn}
            onGoToCheckerWithId={handleGoToCheckerWithId}
          />
        )}

        {activeTab === 'sql' && <SqlSchemaView />}
      </main>

      {/* Footer - Red & White Branding */}
      <footer className="bg-red-950 text-white border-t-4 border-red-600 py-10 mt-12 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-red-900">
            {/* Ghana Red Cross Society Branding */}
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-9 h-9 bg-white text-red-600 rounded-lg flex items-center justify-center font-bold shadow-sm">
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <div className="absolute w-5 h-1.5 bg-red-600 rounded-xs"></div>
                    <div className="absolute h-5 w-1.5 bg-red-600 rounded-xs"></div>
                  </div>
                </div>
                <span className="font-extrabold font-heading text-lg tracking-tight text-white">
                  GHANA RED CROSS SOCIETY
                </span>
              </div>
              <p className="text-xs text-red-200/80 leading-relaxed">
                Official Ghana Red Cross Society membership dues & First Aid certification portal. Synchronized with Supabase cloud database for instant regional clearance checks across all 16 regions of Ghana.
              </p>
            </div>

            {/* Quick Navigation Links */}
            <div>
              <h4 className="text-xs font-extrabold uppercase font-heading text-red-400 tracking-wider mb-3">
                Portal Sections
              </h4>
              <ul className="space-y-2 text-xs font-medium text-red-200">
                <li>
                  <button
                    onClick={() => setActiveTab('checker')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    🔍 Dues Clearance Checker
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('cert-checker')}
                    className="hover:text-white transition-colors text-amber-300 font-bold cursor-pointer"
                  >
                    🏆 First Aid Certificate Checker
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('voting')}
                    className="hover:text-white transition-colors text-emerald-300 font-bold cursor-pointer"
                  >
                    🗳️ Anonymous Voting Portal
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('register')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    📝 Member Registration
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('admin')}
                    className="hover:text-white transition-colors"
                  >
                    🔐 Administrator Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('sql')}
                    className="hover:text-white transition-colors"
                  >
                    ⚡ Supabase SQL Setup Code
                  </button>
                </li>
              </ul>
            </div>

            {/* Backend Integration Status */}
            <div>
              <h4 className="text-xs font-extrabold uppercase font-heading text-red-400 tracking-wider mb-3">
                Database Engine Status
              </h4>
              <div className="bg-red-900/60 p-3.5 rounded-xl border border-red-800 text-xs text-red-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Supabase Sync:</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      supabaseConfig.isConnected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-500/30 text-amber-200 border border-amber-500/40'
                    }`}
                  >
                    {supabaseConfig.isConnected ? 'Connected' : 'Local Prototype'}
                  </span>
                </div>
                <p className="text-[11px] text-red-300">
                  Target Table: <code className="text-white font-mono">public.members</code>
                </p>
                <button
                  onClick={() => setIsConfigModalOpen(true)}
                  className="w-full py-1.5 bg-red-800 hover:bg-red-700 text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>Manage Supabase Keys</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-red-300/80 gap-2">
            <p>© 2026 Ghana Red Cross Society. All Rights Reserved.</p>
            <div className="flex items-center space-x-1">
              <span>National Membership & Dues Directory</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Supabase Config Modal */}
      <SupabaseConfigModal
        isOpen={isConfigModalOpen}
        onClose={() => setIsConfigModalOpen(false)}
        config={supabaseConfig}
        onConfigUpdated={updateConfigStatus}
      />
    </div>
  );
}
