import React, { useState } from 'react';
import { CertificateRecord } from '../types';
import { fetchCertificateBySerial } from '../lib/supabase';
import { Award, Search, CheckCircle2, AlertTriangle, Calendar, Clock, RefreshCw, ShieldCheck, Copy, Check, UserCheck, Briefcase } from 'lucide-react';

export const CertChecker: React.FC = () => {
  const [serialInput, setSerialInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [foundCert, setFoundCert] = useState<CertificateRecord | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isFromSupabase, setIsFromSupabase] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanSerial = serialInput.trim();
    if (!cleanSerial) {
      setErrorMsg('Please enter a certificate serial number.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSearched(true);
    setFoundCert(null);

    const result = await fetchCertificateBySerial(cleanSerial);
    setLoading(false);
    setIsFromSupabase(result.isFromSupabase);

    if (result.certificate && result.certificate.cert_serial_number) {
      setFoundCert(result.certificate);
    } else {
      setErrorMsg('Invalid Serial Number. No matching First Aid certificate record found in database.');
    }
  };

  const handleQuickFill = (serial: string) => {
    setSerialInput(serial);
    setErrorMsg(null);
  };

  // Expiration Logic: Exactly 2 years (730 days) from cert_issue_date
  const calculateCertValidity = (issueDateStr?: string | null) => {
    if (!issueDateStr) return null;
    const issueDate = new Date(issueDateStr);
    if (isNaN(issueDate.getTime())) return null;

    // Add exactly 2 years
    const expiryDate = new Date(issueDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + 2);

    const now = new Date();
    const isExpired = now.getTime() > expiryDate.getTime();

    // Calculate time remaining if valid
    const diffMs = expiryDate.getTime() - now.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    let countdownText = '';
    if (totalDays > 0) {
      const months = Math.floor(totalDays / 30);
      const remainingDays = totalDays % 30;
      if (months > 0) {
        countdownText = `${months} Month${months > 1 ? 's' : ''}, ${remainingDays} Day${remainingDays !== 1 ? 's' : ''}`;
      } else {
        countdownText = `${totalDays} Day${totalDays !== 1 ? 's' : ''}`;
      }
    } else {
      countdownText = 'Expires Today';
    }

    return {
      issueDateFormatted: issueDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      expiryDateFormatted: expiryDate.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      isExpired,
      totalDaysRemaining: totalDays,
      countdownText,
    };
  };

  const certValidity = foundCert ? calculateCertValidity(foundCert.cert_issue_date) : null;

  const handleCopyDetails = () => {
    if (!foundCert || !certValidity) return;
    const text = `GHANA RED CROSS SOCIETY FIRST AID CERTIFICATE VERIFICATION:
Serial Number: ${foundCert.cert_serial_number}
Holder Name: ${foundCert.full_name}
Profile Type: ${foundCert.profile_type === 'member' ? 'GRCS Member' : 'Non-Member External Practitioner'}
Training Region: ${foundCert.training_region || 'Greater Accra'}
Instructor: ${foundCert.instructor_name || 'Red Cross Master Instructor'}
Issue Date: ${certValidity.issueDateFormatted}
Expiry Date: ${certValidity.expiryDateFormatted}
Status: ${certValidity.isExpired ? 'EXPIRED (Recertification Required)' : 'VALID & ACTIVE'}
Time Remaining: ${certValidity.isExpired ? 'Expired' : certValidity.countdownText}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* Top Header */}
      <div className="text-center mb-8 no-print">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-700 rounded-full mb-3 shadow-inner border border-red-200">
          <Award className="w-9 h-9 text-red-600" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 tracking-tight">
          First Aid Certificate Validity Checker
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mt-2">
          Verify Ghana Red Cross Society official First Aid certification status, issue date, and 2-year expiration validity.
        </p>
      </div>

      {/* Main Search Card */}
      <div className="bg-white rounded-2xl border-2 border-red-200 shadow-xl overflow-hidden mb-8 no-print">
        <div className="bg-gradient-to-r from-red-700 to-red-800 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-white rounded-full animate-ping"></span>
            <span className="font-bold text-sm tracking-wider uppercase font-heading">
              Official Certification Verification
            </span>
          </div>
          <span className="text-xs bg-red-900/60 px-3 py-1 rounded-full text-red-100 border border-red-500/30 font-mono">
            2-Year Validity Rule
          </span>
        </div>

        <div className="p-6 sm:p-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <label
              htmlFor="serial-input"
              className="block text-sm font-bold text-gray-800 uppercase tracking-wide flex items-center gap-1.5"
            >
              Certificate Serial Number
              <span className="text-red-600 font-normal text-xs">(Format: FA-YYYY-XXXX)</span>
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  id="serial-input"
                  type="text"
                  value={serialInput}
                  onChange={(e) => setSerialInput(e.target.value)}
                  placeholder="e.g. FA-2025-9901"
                  className="w-full px-4 py-3.5 pl-11 bg-gray-50 text-gray-900 border-2 border-gray-300 rounded-xl font-mono text-lg font-bold uppercase tracking-wider focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-600 transition-all placeholder:font-sans placeholder:text-gray-400 placeholder:normal-case placeholder:text-base"
                />
                <Award className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-red-600/30 transition-all flex items-center justify-center gap-2 text-base cursor-pointer disabled:opacity-50 min-w-[140px]"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Verify Cert</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick test buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span className="font-medium text-gray-600">Quick Test Serials:</span>
              <button
                type="button"
                onClick={() => handleQuickFill('FA-2025-9901')}
                className="px-2.5 py-1 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-md font-mono font-bold transition-colors cursor-pointer"
              >
                FA-2025-9901 (Valid)
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('FA-2023-1102')}
                className="px-2.5 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 rounded-md font-mono font-bold transition-colors cursor-pointer"
              >
                FA-2023-1102 (Expired)
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results Section */}
      {searched && (
        <div className="space-y-6">
          {errorMsg && (
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6 text-center animate-shake shadow-md">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded-full mb-3">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-red-800">Invalid Serial Number</h3>
              <p className="text-sm text-red-600 mt-1 max-w-md mx-auto">{errorMsg}</p>
              <p className="text-xs text-gray-500 mt-3 font-mono">
                Ensure serial numbers start with "FA-" (e.g. FA-2025-9901)
              </p>
            </div>
          )}

          {foundCert && certValidity && (
            <div className="bg-white rounded-2xl border-2 border-red-200 shadow-2xl overflow-hidden transform transition-all">
              {/* Status Banner */}
              {certValidity.isExpired ? (
                <div className="bg-red-600 text-white p-5 text-center animate-pulse border-b-4 border-red-800">
                  <div className="inline-flex items-center justify-center gap-2 text-xl font-black font-heading tracking-wide">
                    <AlertTriangle className="w-7 h-7" />
                    <span>❌ EXPIRED. Recertification Required.</span>
                  </div>
                  <p className="text-xs text-red-100 font-medium mt-1">
                    First Aid certificates issued by Ghana Red Cross Society expire exactly 2 years (730 days) from training completion.
                  </p>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white p-5 text-center border-b-4 border-emerald-800 shadow-inner">
                  <div className="inline-flex items-center justify-center gap-2 text-xl font-black font-heading tracking-wide">
                    <CheckCircle2 className="w-7 h-7" />
                    <span>🟢 VALID & ACTIVE FIRST AID CERTIFICATE</span>
                  </div>
                  <p className="text-xs text-emerald-100 font-medium mt-1">
                    Official Ghana Red Cross Society First Aid Practitioner Qualification
                  </p>
                </div>
              )}

              {/* Certificate Details Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between border-b border-gray-200 pb-6 gap-6">
                  {/* Photo & Main Details */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left w-full">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-red-600 overflow-hidden shadow-lg bg-gray-100 shrink-0">
                      {foundCert.profile_picture_url ? (
                        <img
                          src={foundCert.profile_picture_url}
                          alt={foundCert.full_name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : null}
                      {!foundCert.profile_picture_url && (
                        <div className="w-full h-full bg-red-50 flex items-center justify-center text-red-600 font-bold text-2xl font-heading">
                          {foundCert.full_name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold uppercase text-red-600 tracking-wider">
                          Verified Practitioner
                        </span>
                        {/* Dynamic Profile Type Badge */}
                        {foundCert.profile_type === 'member' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-red-100 text-red-800 border border-red-200">
                            <UserCheck className="w-3.5 h-3.5" /> 👥 MEMBER
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-slate-100 text-slate-800 border border-slate-300">
                            <Briefcase className="w-3.5 h-3.5" /> 💼 NON-MEMBER
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-2xl font-black text-gray-900 font-heading mt-1">
                        {foundCert.full_name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-0.5">
                        {foundCert.associated_member_id ? (
                          <>Associated Member ID: <span className="font-mono font-bold text-gray-800">{foundCert.associated_member_id}</span> • </>
                        ) : (
                          <>Independent First Aid Training Recipient • </>
                        )}
                        Region: <span className="font-semibold text-gray-800">{foundCert.training_region || 'Greater Accra'}</span>
                      </p>

                      <div className="mt-2.5 inline-flex flex-wrap gap-2 text-xs">
                        <span className="px-2.5 py-1 bg-red-100 text-red-800 rounded-md font-bold">
                          📜 {foundCert.cert_type || 'Basic First Aid'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 px-5 py-3 rounded-xl text-center md:text-right shrink-0 w-full md:w-auto">
                    <span className="text-xs text-gray-500 block uppercase font-bold">Serial Number</span>
                    <span className="font-mono font-extrabold text-xl text-red-700">
                      {foundCert.cert_serial_number}
                    </span>
                  </div>
                </div>

                {/* Comprehensive Certificate Specifics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-red-50/50 p-4 rounded-xl border border-red-100 text-xs">
                  <div>
                    <span className="text-gray-500 uppercase font-bold text-[10px] block">Qualification Type</span>
                    <span className="font-bold text-gray-900 text-sm">
                      {foundCert.cert_type || 'Basic First Aid'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 uppercase font-bold text-[10px] block">Certified Instructor</span>
                    <span className="font-bold text-gray-900 text-sm">
                      {foundCert.instructor_name || 'Red Cross Master Instructor'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 uppercase font-bold text-[10px] block">Training Location/Region</span>
                    <span className="font-bold text-gray-900 text-sm">
                      {foundCert.training_region || 'Greater Accra'} Region
                    </span>
                  </div>
                </div>

                {/* Dates & Expiration Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center space-x-3">
                    <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase text-gray-500">Issue Date</span>
                      <p className="text-base font-bold text-gray-900">
                        {certValidity.issueDateFormatted}
                      </p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-xl border flex items-center space-x-3 ${
                    certValidity.isExpired
                      ? 'bg-red-50 border-red-300'
                      : 'bg-emerald-50 border-emerald-300'
                  }`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      certValidity.isExpired ? 'bg-red-200 text-red-700' : 'bg-emerald-200 text-emerald-700'
                    }`}>
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase text-gray-500">2-Year Expiration Date</span>
                      <p className={`text-base font-bold ${
                        certValidity.isExpired ? 'text-red-700' : 'text-emerald-800'
                      }`}>
                        {certValidity.expiryDateFormatted}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Live Countdown Box */}
                {!certValidity.isExpired ? (
                  <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl p-5 shadow-lg border-2 border-red-500 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-white/20 text-white rounded-full flex items-center justify-center">
                        <Clock className="w-6 h-6 animate-pulse" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-red-100 block">
                          ⏰ Time Remaining Until Expiration
                        </span>
                        <span className="text-xl sm:text-2xl font-black font-mono">
                          {certValidity.countdownText}
                        </span>
                      </div>
                    </div>
                    <span className="hidden sm:inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                      {certValidity.totalDaysRemaining} Days Left
                    </span>
                  </div>
                ) : (
                  <div className="bg-red-100 border-2 border-red-300 text-red-900 rounded-xl p-5 flex items-center space-x-3">
                    <AlertTriangle className="w-7 h-7 text-red-600 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-sm">Recertification Action Required</h4>
                      <p className="text-xs text-red-700">
                        This certificate expired on {certValidity.expiryDateFormatted}. Please contact your Ghana Red Cross Society regional office to register for refresher training.
                      </p>
                    </div>
                  </div>
                )}

                {/* Footer Actions */}
                <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 no-print">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Database Status: {isFromSupabase ? 'Supabase Cloud Synced' : 'Local Storage Verified'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Print Certificate Check
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyDetails}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Status</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
