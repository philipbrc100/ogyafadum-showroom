import React from 'react';
import { ActiveTab, SupabaseConfig } from '../types';
import { UserPlus, Search, Lock, Database, CheckCircle2, AlertCircle, Award, Vote } from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  supabaseConfig: SupabaseConfig;
  onOpenConfigModal: () => void;
  isAdminLoggedIn: boolean;
  onLogoutAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  supabaseConfig,
  onOpenConfigModal,
  isAdminLoggedIn,
  onLogoutAdmin,
}) => {
  return (
    <header className="bg-red-700 text-white shadow-md sticky top-0 z-40 no-print border-b border-red-800">
      {/* Top Announcement / Mode Banner */}
      <div className="bg-red-900/90 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-red-800/80">
        <div className="flex items-center space-x-2">
          <span className="inline-block w-2 h-2 rounded-full bg-red-400 animate-pulse"></span>
          <span className="font-medium tracking-wide">
            Ghana Red Cross Society — Official Membership Dues & Volunteer Verification Portal
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenConfigModal}
            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              supabaseConfig.isConnected
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-amber-500/30 hover:bg-amber-500/50 text-amber-100 border border-amber-400/40'
            }`}
            title="Click to view or update Supabase backend settings"
          >
            {supabaseConfig.isConnected ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Supabase Live DB</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-amber-300" />
                <span>Prototype (Local Storage)</span>
              </>
            )}
            <Database className="w-3 h-3 ml-0.5 opacity-80" />
          </button>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Branding */}
          <div
            onClick={() => setActiveTab('checker')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white text-red-600 rounded-xl flex items-center justify-center font-bold shadow-md group-hover:scale-105 transition-transform border-2 border-red-100 relative">
              {/* Red Cross Emblem Symbol */}
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="absolute w-6 h-2 bg-red-600 rounded-xs"></div>
                <div className="absolute h-6 w-2 bg-red-600 rounded-xs"></div>
              </div>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold font-heading tracking-tight leading-none text-white flex items-center gap-2">
                GHANA RED CROSS SOCIETY
              </h1>
              <p className="text-xs text-red-200 mt-0.5 font-medium">
                Membership Dues & Regional Directory Portal
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('checker')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'checker'
                  ? 'bg-white text-red-700 shadow-sm'
                  : 'text-white hover:bg-red-600/80 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Dues Checker</span>
            </button>

            <button
              onClick={() => setActiveTab('cert-checker')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'cert-checker'
                  ? 'bg-white text-red-700 shadow-sm'
                  : 'text-white hover:bg-red-600/80 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>First Aid Checker</span>
            </button>

            <button
              onClick={() => setActiveTab('register')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'register'
                  ? 'bg-white text-red-700 shadow-sm'
                  : 'text-white hover:bg-red-600/80 hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Register Member</span>
            </button>

            <button
              onClick={() => setActiveTab('cert-register')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'cert-register'
                  ? 'bg-white text-red-700 shadow-sm'
                  : 'text-white hover:bg-red-600/80 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Issue Cert</span>
            </button>

            <button
              onClick={() => setActiveTab('voting')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'voting'
                  ? 'bg-white text-red-700 shadow-sm'
                  : 'text-white hover:bg-red-600/80 hover:text-white'
              }`}
            >
              <Vote className="w-4 h-4 text-emerald-300" />
              <span>Voting Portal</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-all ${
                activeTab === 'admin'
                  ? 'bg-white text-red-700 shadow-sm'
                  : 'text-white hover:bg-red-600/80 hover:text-white'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>
                {isAdminLoggedIn ? 'Admin Dashboard' : 'Admin Login'}
              </span>
              {isAdminLoggedIn && (
                <span className="ml-1 w-2 h-2 rounded-full bg-emerald-400"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('sql')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-all ${
                activeTab === 'sql'
                  ? 'bg-white text-red-700 shadow-sm'
                  : 'text-red-100 bg-red-800/60 hover:bg-red-800 hover:text-white border border-red-600/40'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Supabase SQL</span>
            </button>
          </nav>

          {/* Mobile Admin Logout / Quick Action */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenConfigModal}
              className="p-2 bg-red-800 text-white rounded-lg hover:bg-red-600"
              title="Database Settings"
            >
              <Database className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="md:hidden bg-red-800 border-t border-red-900 px-2 py-2 flex items-center justify-around text-xs">
        <button
          onClick={() => setActiveTab('checker')}
          className={`px-2 py-1.5 rounded-md font-semibold flex items-center space-x-1 ${
            activeTab === 'checker' ? 'bg-white text-red-700' : 'text-red-100'
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Dues</span>
        </button>

        <button
          onClick={() => setActiveTab('cert-checker')}
          className={`px-2 py-1.5 rounded-md font-semibold flex items-center space-x-1 ${
            activeTab === 'cert-checker' ? 'bg-white text-red-700' : 'text-red-100'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-amber-300" />
          <span>Cert</span>
        </button>

        <button
          onClick={() => setActiveTab('register')}
          className={`px-2 py-1.5 rounded-md font-semibold flex items-center space-x-1 ${
            activeTab === 'register' ? 'bg-white text-red-700' : 'text-red-100'
          }`}
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>Register</span>
        </button>

        <button
          onClick={() => setActiveTab('admin')}
          className={`px-3 py-1.5 rounded-md font-semibold flex items-center space-x-1 ${
            activeTab === 'admin' ? 'bg-white text-red-700' : 'text-red-100'
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Admin</span>
        </button>

        <button
          onClick={() => setActiveTab('sql')}
          className={`px-3 py-1.5 rounded-md font-semibold flex items-center space-x-1 ${
            activeTab === 'sql' ? 'bg-white text-red-700' : 'text-red-100'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>SQL</span>
        </button>
      </div>
    </header>
  );
};
