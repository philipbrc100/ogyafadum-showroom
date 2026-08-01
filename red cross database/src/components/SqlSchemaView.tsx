import React, { useState } from 'react';
import { SUPABASE_SQL_SCHEMA } from '../lib/constants';
import { Database, Copy, Check, ExternalLink, Terminal, ShieldAlert } from 'lucide-react';

export const SqlSchemaView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 text-red-700 rounded-full mb-3 border border-red-200">
          <Database className="w-7 h-7 text-red-600" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 tracking-tight">
          Supabase Database Schema Setup
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mt-1">
          Complete SQL queries to initialize the 'members' table in Supabase.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border-2 border-red-100 overflow-hidden">
        <div className="bg-gradient-to-r from-red-700 to-red-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-5 h-5 text-red-200" />
            <span className="font-bold text-sm tracking-wider uppercase font-heading">
              SQL Migration Script
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-white text-red-700 hover:bg-red-50 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Copied SQL Script!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy SQL Code</span>
              </>
            )}
          </button>
        </div>

        <div className="p-6">
          <div className="bg-red-50/70 border border-red-200 p-4 rounded-xl text-xs sm:text-sm text-red-900 mb-6 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-red-950">
                Instructions for Supabase SQL Editor
              </span>
              1. Open your <a href="https://supabase.com/dashboard" target="_blank" rel="noreferrer" className="underline font-bold">Supabase Project Dashboard</a>.<br />
              2. Go to <strong>SQL Editor</strong> in the left menu.<br />
              3. Paste the SQL query below and click <strong>Run</strong>.<br />
              4. Copy your Project URL and Anon Key into the portal configuration!
            </div>
          </div>

          <pre className="p-6 bg-gray-900 text-emerald-400 rounded-xl text-xs sm:text-sm font-mono overflow-x-auto border border-gray-800 leading-relaxed">
            {SUPABASE_SQL_SCHEMA}
          </pre>

          <div className="mt-6 flex justify-between items-center text-xs text-gray-500">
            <span>Table Name: <strong>public.members</strong></span>
            <a
              href="https://supabase.com/dashboard"
              target="_blank"
              rel="noreferrer"
              className="text-red-700 font-bold hover:underline flex items-center gap-1"
            >
              <span>Go to Supabase Dashboard</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
