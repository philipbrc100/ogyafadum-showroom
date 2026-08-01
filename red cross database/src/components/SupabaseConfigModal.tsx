import React, { useState } from 'react';
import { SupabaseConfig } from '../types';
import { saveCredentials, getSavedCredentials, resetSupabaseClient, isRealSupabaseConfigured } from '../lib/supabase';
import { SUPABASE_SQL_SCHEMA } from '../lib/constants';
import { Database, Key, CheckCircle2, AlertCircle, Copy, Check, X, Shield, ExternalLink, RefreshCw } from 'lucide-react';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SupabaseConfig;
  onConfigUpdated: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose,
  config,
  onConfigUpdated,
}) => {
  const currentCreds = getSavedCredentials();
  const [urlInput, setUrlInput] = useState(currentCreds.url);
  const [anonKeyInput, setAnonKeyInput] = useState(currentCreds.anonKey);
  const [copiedSql, setCopiedSql] = useState(false);
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    saveCredentials(urlInput, anonKeyInput);
    resetSupabaseClient();
    onConfigUpdated();
    setTimeout(() => {
      setSaving(false);
      onClose();
    }, 500);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-xs z-50 flex items-center justify-center p-4 no-print overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-red-600 max-w-2xl w-full my-8 overflow-hidden">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-white/10 rounded-xl">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold font-heading text-lg">
                Supabase Backend Database Setup
              </h3>
              <p className="text-xs text-red-100">
                Connect your Supabase project or use Local Prototype storage
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white hover:bg-red-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Active Status Banner */}
          <div
            className={`p-4 rounded-xl border flex items-start gap-3 ${
              config.isConnected
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}
          >
            {config.isConnected ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="text-xs sm:text-sm">
              <span className="font-bold block text-base font-heading">
                {config.isConnected
                  ? 'Connected to Supabase Database'
                  : 'Operating in Local Prototype Mode'}
              </span>
              {config.isConnected ? (
                <p>
                  All queries, inserts, and payment status toggles are synced live to your Supabase <strong>members</strong> table.
                </p>
              ) : (
                <p>
                  No active Supabase credentials configured yet. The portal is currently running with persistent Local Storage. Paste your Supabase URL & Anon Key below to connect live!
                </p>
              )}
            </div>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleSave} className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase text-gray-700 tracking-wider">
              1. Supabase Project Credentials
            </h4>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-red-600" />
                SUPABASE_URL
              </label>
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://your-project.supabase.co"
                className="w-full px-3.5 py-2.5 bg-gray-50 border-2 border-gray-300 rounded-xl font-mono text-xs text-gray-900 focus:outline-none focus:border-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                <Key className="w-3.5 h-3.5 text-red-600" />
                SUPABASE_ANON_KEY
              </label>
              <textarea
                rows={2}
                value={anonKeyInput}
                onChange={(e) => setAnonKeyInput(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full px-3.5 py-2 bg-gray-50 border-2 border-gray-300 rounded-xl font-mono text-xs text-gray-900 focus:outline-none focus:border-red-600"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  setUrlInput('');
                  setAnonKeyInput('');
                }}
                className="text-xs text-gray-500 hover:text-red-700 font-bold underline"
              >
                Reset to Default
              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md cursor-pointer transition-all"
              >
                {saving ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                <span>Save Credentials & Reconnect</span>
              </button>
            </div>
          </form>

          {/* Step 2: Supabase SQL Generator */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-extrabold uppercase text-gray-700 tracking-wider flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-red-600" />
                2. Copy Supabase SQL Table Setup Script
              </h4>
              <button
                onClick={handleCopySql}
                className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
              >
                {copiedSql ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied SQL!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-red-600" />
                    <span>Copy SQL Query</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-gray-600 mb-3">
              Run this SQL script in your Supabase SQL Editor to create the <strong>members</strong> table, enable Row Level Security, create indexes, and insert sample data:
            </p>

            <pre className="p-4 bg-gray-900 text-gray-100 rounded-xl text-[11px] font-mono overflow-x-auto max-h-48 border border-gray-800">
              {SUPABASE_SQL_SCHEMA}
            </pre>

            <div className="mt-3 text-right">
              <a
                href="https://supabase.com/dashboard"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-red-700 font-bold hover:underline"
              >
                <span>Open Supabase Dashboard</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
