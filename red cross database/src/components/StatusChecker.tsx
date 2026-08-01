import React, { useState } from 'react';
import { Member } from '../types';
import { fetchMemberByMemberId } from '../lib/supabase';
import { Search, ShieldAlert, CheckCircle2, XCircle, Printer, Copy, Check, Sparkles, RefreshCw, MapPin, Mail, Calendar, ArrowRight, Clock } from 'lucide-react';

interface StatusCheckerProps {
  onGoToRegister: () => void;
  onOpenSampleId?: (id: string) => void;
}

function getDuesExpirationDetails(member: Member) {
  if (member.payment_status !== 'verified' || !member.dues_paid_date) {
    return {
      isVerified: false,
      isExpired: true,
      countdownText: 'Annual dues have expired. Please renew.',
      daysRemaining: 0,
    };
  }

  const paidDate = new Date(member.dues_paid_date);
  if (isNaN(paidDate.getTime())) {
    return {
      isVerified: false,
      isExpired: true,
      countdownText: 'Annual dues have expired. Please renew.',
      daysRemaining: 0,
    };
  }

  const expireDate = new Date(paidDate.getTime() + 365 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const diffMs = expireDate.getTime() - now.getTime();

  if (diffMs <= 0) {
    return {
      isVerified: false,
      isExpired: true,
      countdownText: 'Annual dues have expired. Please renew.',
      daysRemaining: 0,
    };
  }

  const totalDaysRemaining = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const months = Math.floor(totalDaysRemaining / 30);
  const days = totalDaysRemaining % 30;

  let countdownText = '';
  if (months > 0) {
    countdownText = `⏰ Dues Expire In: ${months} Month${months > 1 ? 's' : ''}, ${days} Day${days !== 1 ? 's' : ''}`;
  } else {
    countdownText = `⏰ Dues Expire In: ${days} Day${days !== 1 ? 's' : ''}`;
  }

  return {
    isVerified: true,
    isExpired: false,
    countdownText,
    daysRemaining: totalDaysRemaining,
    paidDateStr: member.dues_paid_date,
    expireDateStr: expireDate.toISOString().slice(0, 10),
  };
}

export const StatusChecker: React.FC<StatusCheckerProps> = ({ onGoToRegister }) => {
  const [memberIdInput, setMemberIdInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [foundMember, setFoundMember] = useState<Member | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFromSupabase, setIsFromSupabase] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSearch = async (e?: React.FormEvent, searchOverride?: string) => {
    if (e) e.preventDefault();
    const queryId = searchOverride || memberIdInput;
    if (!queryId.trim()) return;

    setLoading(true);
    setSearched(true);
    setErrorMessage(null);
    setFoundMember(null);

    try {
      const res = await fetchMemberByMemberId(queryId);
      setIsFromSupabase(res.isFromSupabase);

      if (res.member) {
        setFoundMember(res.member);
      } else {
        setErrorMessage('Member ID not found. Please check and try again.');
      }
    } catch (err: any) {
      setErrorMessage('Failed to query database. Please check connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (sampleId: string) => {
    setMemberIdInput(sampleId);
    handleSearch(undefined, sampleId);
  };

  const handleCopyDetails = () => {
    if (!foundMember) return;
    const expInfo = getDuesExpirationDetails(foundMember);
    const text = `GHANA RED CROSS SOCIETY MEMBERSHIP DUES STATUS:
Member ID: ${foundMember.member_id}
Name: ${foundMember.full_name}
Region: ${foundMember.region}
Dues Clearance: ${expInfo.isVerified ? 'VERIFIED' : 'NOT ACTIVE / EXPIRED'}
Dues Paid Date: ${foundMember.dues_paid_date || 'N/A'}
Status Countdown: ${expInfo.countdownText}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  const duesInfo = foundMember ? getDuesExpirationDetails(foundMember) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      {/* Top Header & Crest */}
      <div className="text-center mb-8 no-print">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-700 rounded-full mb-3 shadow-inner border border-red-200">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <div className="absolute w-8 h-2 bg-red-600 rounded-xs"></div>
            <div className="absolute h-8 w-2 bg-red-600 rounded-xs"></div>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900 tracking-tight">
          Public Annual Dues Clearance Checker
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto mt-2">
          Verify Ghana Red Cross Society annual dues clearance, 1-year automated validity timers, and member clearance status.
        </p>
      </div>

      {/* Main Examination-Style Card Container */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-red-100 overflow-hidden">
        {/* Red Header Bar */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white px-6 py-4 flex items-center justify-between no-print">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 bg-white rounded-full animate-ping"></span>
            <span className="font-bold text-sm tracking-wider uppercase font-heading">
              Official Ghana Red Cross Society Portal
            </span>
          </div>
          <span className="text-xs bg-red-900/60 px-3 py-1 rounded-full text-red-100 border border-red-500/30">
            {isFromSupabase ? 'Database: Supabase' : 'Database: Local Prototype'}
          </span>
        </div>

        <div className="p-6 sm:p-10">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="no-print mb-6">
            <label
              htmlFor="member_id_input"
              className="block text-sm font-bold text-gray-800 mb-2 uppercase tracking-wide flex items-center gap-1.5"
            >
              Enter Member ID Number
              <span className="text-red-600 font-normal text-xs">(Format: GRCS-YYYY-XXXX)</span>
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  id="member_id_input"
                  type="text"
                  value={memberIdInput}
                  onChange={(e) => setMemberIdInput(e.target.value)}
                  placeholder="e.g. GRCS-2026-1042"
                  className="w-full px-4 py-3.5 pl-11 bg-gray-50 text-gray-900 border-2 border-gray-300 rounded-xl font-mono text-lg font-bold uppercase tracking-wider focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-600 transition-all placeholder:font-sans placeholder:text-gray-400 placeholder:normal-case placeholder:text-base"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                {memberIdInput && (
                  <button
                    type="button"
                    onClick={() => setMemberIdInput('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !memberIdInput.trim()}
                className="px-8 py-3.5 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg hover:shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 text-base font-heading"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Searching...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Check Status</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Demo Sample IDs */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span className="font-semibold text-gray-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Demo Sample IDs:
              </span>
              <button
                type="button"
                onClick={() => handleQuickFill('GRCS-2026-1042')}
                className="px-2.5 py-1 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-md font-mono font-bold transition-colors cursor-pointer"
              >
                GRCS-2026-1042 (Verified Dues)
              </button>
              <button
                type="button"
                onClick={() => handleQuickFill('GRCS-2026-8819')}
                className="px-2.5 py-1 bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 rounded-md font-mono font-bold transition-colors cursor-pointer"
              >
                GRCS-2026-8819 (Expired Dues)
              </button>
            </div>
          </form>

          {/* Search Result Output Display */}
          {searched && (
            <div className="mt-8 transition-all">
              {/* FOUND MEMBER CASE */}
              {foundMember && duesInfo ? (
                <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl border-2 border-red-600 p-6 sm:p-8 shadow-xl relative overflow-hidden">
                  {/* Decorative background watermark */}
                  <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none text-red-900">
                    <ShieldAlert className="w-64 h-64" />
                  </div>

                  {/* Header Result Slip Title */}
                  <div className="border-b border-gray-200 pb-6 mb-6">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      {/* LEFT COLUMN: Profile Picture inside a Red Circular Frame */}
                      <div className="flex flex-col items-center shrink-0">
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-red-600 overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
                          {foundMember.profile_picture_url ? (
                            <img
                              src={foundMember.profile_picture_url}
                              alt={foundMember.full_name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Fallback icon on image load failure
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          ) : null}
                          {/* Fallback avatar if no URL or error */}
                          {!foundMember.profile_picture_url && (
                            <div className="w-full h-full bg-red-50 flex items-center justify-center text-red-600 font-bold text-3xl font-heading">
                              {foundMember.full_name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <span className="mt-2 text-[11px] font-bold text-gray-500 uppercase tracking-wider font-mono">
                          Member Avatar
                        </span>
                      </div>

                      {/* RIGHT COLUMN: Member Details and Status Badge */}
                      <div className="flex-1 w-full text-center md:text-left">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                          <div>
                            <span className="text-xs font-extrabold uppercase tracking-widest text-red-600 block">
                              OFFICIAL DUES CLEARANCE SLIP
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-black font-heading text-gray-900">
                              {foundMember.full_name}
                            </h3>
                          </div>

                          {/* Prominent Status Badge */}
                          <div className="shrink-0 self-center md:self-start">
                            {duesInfo.isVerified ? (
                              <div className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-full font-black text-sm tracking-wide shadow-md border-2 border-red-700 animate-pulse">
                                <CheckCircle2 className="w-5 h-5 text-white" />
                                <span>🔴 VERIFIED</span>
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2.5 rounded-full font-bold text-sm tracking-wide border-2 border-gray-300">
                                <XCircle className="w-5 h-5 text-gray-500" />
                                <span>⚪ NOT ACTIVE</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Summary Badges */}
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-gray-700">
                          <span className="bg-red-50 border border-red-200 text-red-800 px-3 py-1 rounded-lg font-mono font-bold">
                            ID: {foundMember.member_id}
                          </span>
                          <span className="bg-gray-100 border border-gray-200 text-gray-800 px-3 py-1 rounded-lg font-bold flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-red-600" />
                            {foundMember.region} Region
                          </span>
                          <span className="bg-gray-100 border border-gray-200 text-gray-800 px-3 py-1 rounded-lg flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5 text-red-600" />
                            {foundMember.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dues Expire Countdown Bar */}
                  <div className="mb-6 p-4 rounded-xl border flex items-center justify-between flex-wrap gap-3 bg-red-50/70 border-red-200">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-red-600 shrink-0" />
                      <span className="font-bold text-sm text-red-950 font-mono">
                        {duesInfo.countdownText}
                      </span>
                    </div>
                    {duesInfo.paidDateStr && (
                      <span className="text-xs text-gray-600">
                        Dues Paid On: <strong>{duesInfo.paidDateStr}</strong> (1-Year Validity)
                      </span>
                    )}
                  </div>

                  {/* Member Detailed Information Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-6">
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-start gap-3">
                      <div className="p-2 bg-red-50 text-red-600 rounded-lg shrink-0">
                        <Search className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
                          Member ID Number
                        </span>
                        <span className="text-base font-mono font-black text-gray-900 tracking-wider">
                          {foundMember.member_id}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-start gap-3">
                      <div className="p-2 bg-red-50 text-red-600 rounded-lg shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
                          Assigned Ghana Region
                        </span>
                        <span className="text-base font-bold text-gray-900">
                          {foundMember.region}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-start gap-3">
                      <div className="p-2 bg-red-50 text-red-600 rounded-lg shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
                          Registered Email
                        </span>
                        <span className="text-base font-medium text-gray-900 break-all">
                          {foundMember.email}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-start gap-3">
                      <div className="p-2 bg-red-50 text-red-600 rounded-lg shrink-0">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
                          Gender & Education
                        </span>
                        <span className="text-base font-bold text-gray-900">
                          {foundMember.gender || 'N/A'} • {foundMember.education_level || 'N/A'}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-start gap-3">
                      <div className="p-2 bg-red-50 text-red-600 rounded-lg shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
                          Profession / Position
                        </span>
                        <span className="text-base font-bold text-gray-900">
                          {foundMember.profession || foundMember.society_position || 'Member'}
                        </span>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex items-start gap-3">
                      <div className="p-2 bg-red-50 text-red-600 rounded-lg shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
                          Years Served in Society
                        </span>
                        <span className="text-base font-black text-red-700">
                          {foundMember.date_joined
                            ? `${Math.max(0, new Date().getFullYear() - new Date(foundMember.date_joined).getFullYear())} Years Served`
                            : 'Active Member'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Notes & Instructions */}
                  {duesInfo.isVerified ? (
                    <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-emerald-900 text-xs sm:text-sm mb-6 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-emerald-950">
                          Good Standing Confirmed
                        </span>
                        This member has fully cleared annual membership dues within the required 365-day period. Full volunteer and regional voting privileges are active.
                      </div>
                    </div>
                  ) : (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-amber-900 text-xs sm:text-sm mb-6 flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block text-amber-950">
                          Annual Dues Expired Notice: Annual dues have expired. Please renew.
                        </span>
                        Membership dues are either inactive or more than 365 days past due. Please contact your regional administrator or pay annual dues to renew status.
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-200 no-print">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyDetails}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 text-gray-600" />
                            <span>Copy Details</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handlePrintSlip}
                        className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold rounded-lg text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Printer className="w-4 h-4 text-red-600" />
                        <span>Print Slip</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSearched(false)}
                      className="text-xs text-gray-500 hover:text-red-700 font-bold underline cursor-pointer"
                    >
                      Search Another Member
                    </button>
                  </div>
                </div>
              ) : (
                /* NOT FOUND ERROR CASE */
                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 sm:p-8 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 text-red-600 rounded-full mb-3">
                    <XCircle className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold font-heading text-red-900 mb-1">
                    Member ID Not Found
                  </h4>
                  <p className="text-sm text-red-700 max-w-md mx-auto mb-6">
                    {errorMessage || 'Member ID not found. Please check and try again.'}
                  </p>

                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSearched(false)}
                      className="px-5 py-2.5 bg-white text-gray-800 font-bold rounded-xl border border-gray-300 text-sm hover:bg-gray-50 transition-all cursor-pointer shadow-sm"
                    >
                      Try Again
                    </button>

                    <button
                      type="button"
                      onClick={onGoToRegister}
                      className="px-5 py-2.5 bg-red-600 text-white font-bold rounded-xl text-sm hover:bg-red-700 transition-all cursor-pointer shadow-md flex items-center gap-1.5"
                    >
                      <span>Register New Member</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Initial State Helper Box if not searched yet */}
          {!searched && (
            <div className="mt-6 p-6 bg-red-50/50 rounded-xl border border-red-100 text-center">
              <h4 className="text-sm font-bold text-red-900 font-heading uppercase tracking-wider mb-2">
                How Dues Verification Works
              </h4>
              <p className="text-xs text-gray-600 max-w-lg mx-auto">
                Members are issued a unique <strong>GRCS-YYYY-XXXX</strong> identification code. Annual dues remain active for exactly <strong>365 days</strong> from the payment date.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

