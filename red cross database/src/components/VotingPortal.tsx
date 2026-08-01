import React, { useState, useEffect } from 'react';
import {
  Vote,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  AlertTriangle,
  Award,
  BarChart3,
  Lock,
  Search,
  UserCheck,
  Sparkles,
  RefreshCw,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import { Candidate, Member, SystemSettings } from '../types';
import {
  checkVoterEligibility,
  fetchCandidates,
  castAnonymousVote,
  fetchAllMembers,
  fetchSystemSettings,
} from '../lib/supabase';

export const VotingPortal: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'vote' | 'results'>('vote');

  // Gateway & Voting State
  const [voterIdInput, setVoterIdInput] = useState('');
  const [checkingEligibility, setCheckingEligibility] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState<{
    eligible: boolean;
    member: Member | null;
    reason?: string;
  } | null>(null);

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loadingCandidates, setLoadingCandidates] = useState(false);
  const [selectedVotes, setSelectedVotes] = useState<Record<string, string>>({}); // position -> candidateId
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    receiptToken: string;
    votedAt: string;
  } | null>(null);
  const [systemSettings, setSystemSettings] = useState<SystemSettings>({
    allow_sub_admin_reg: true,
    is_voting_window_open: true,
    require_auth_codes: true,
  });

  // Results State
  const [totalMembers, setTotalMembers] = useState<number>(0);
  const [totalVerifiedMembers, setTotalVerifiedMembers] = useState<number>(0);
  const [selectedPositionFilter, setSelectedPositionFilter] = useState<string>('All');

  // Load candidates on mount
  useEffect(() => {
    loadCandidatesAndStats();
    fetchSystemSettings().then((s) => setSystemSettings(s));
  }, []);

  const loadCandidatesAndStats = async () => {
    setLoadingCandidates(true);
    const { candidates: cands } = await fetchCandidates();
    setCandidates(cands);

    const { members } = await fetchAllMembers();
    setTotalMembers(members.length);
    setTotalVerifiedMembers(members.filter((m) => m.payment_status === 'verified').length);
    setLoadingCandidates(false);
  };

  const handleVerifyEligibility = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!voterIdInput.trim()) return;

    setCheckingEligibility(true);
    setEligibilityResult(null);
    setSubmissionSuccess(null);
    setSelectedVotes({});

    const result = await checkVoterEligibility(voterIdInput);
    setEligibilityResult(result);
    setCheckingEligibility(false);
  };

  const handleSelectCandidate = (position: string, candidateId: string) => {
    setSelectedVotes((prev) => ({
      ...prev,
      [position]: candidateId,
    }));
  };

  const handleCastBallot = async () => {
    if (!systemSettings.is_voting_window_open) {
      alert('The voting window is currently closed by the Super-Admin. Votes cannot be submitted at this time.');
      return;
    }

    if (!eligibilityResult?.member || !voterIdInput) return;

    // Check if all positions have been voted on
    const positions: string[] = Array.from(new Set(candidates.map((c) => c.position_contested)));
    const missingPositions = positions.filter((pos) => !selectedVotes[pos]);

    if (missingPositions.length > 0) {
      alert(`Please select a candidate for all contested positions: ${missingPositions.join(', ')}`);
      return;
    }

    setIsSubmitting(true);
    const candidateIds: string[] = Object.values(selectedVotes);
    const result = await castAnonymousVote(voterIdInput, candidateIds);

    setIsSubmitting(false);

    if (result.success) {
      const receipt = `RC-VOTE-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setSubmissionSuccess({
        receiptToken: receipt,
        votedAt: new Date().toLocaleString(),
      });
      // Refresh candidates list for results
      loadCandidatesAndStats();
    } else {
      alert(`Failed to submit vote: ${result.error || 'Unknown error'}`);
    }
  };

  const handleResetForm = () => {
    setVoterIdInput('');
    setEligibilityResult(null);
    setSelectedVotes({});
    setSubmissionSuccess(null);
  };

  // Group candidates by position
  const positions: string[] = Array.from(new Set(candidates.map((c) => c.position_contested)));

  // Calculate election metrics
  const totalVotesCast = candidates.reduce((sum, c) => sum + (c.vote_count || 0), 0);
  const uniqueVoterEstimate = Math.max(
    ...positions.map((pos) =>
      candidates
        .filter((c) => c.position_contested === pos)
        .reduce((s, c) => s + (c.vote_count || 0), 0)
    ),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-800 rounded-2xl shadow-lg p-6 sm:p-8 text-white mb-8 border border-red-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="bg-red-950/60 text-red-100 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1.5 border border-red-500/30">
                <ShieldCheck className="w-3.5 h-3.5 text-red-300" />
                <span>Encrypted & Anonymous</span>
              </span>
              <span className="bg-emerald-500/20 text-emerald-100 text-xs font-semibold px-2.5 py-0.5 rounded border border-emerald-400/30">
                2026 Society Elections
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Restricted Anonymous Voting Portal
            </h1>
            <p className="mt-2 text-red-100 max-w-2xl text-sm sm:text-base leading-relaxed">
              Democratically cast your vote for executive council candidates. Individual voter identity is mathematically decoupled from candidate choices to guarantee total ballot secrecy.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-auto bg-red-950/40 p-1.5 rounded-xl border border-red-500/30">
            <button
              id="voting-subtab-ballot"
              onClick={() => setActiveSubTab('vote')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeSubTab === 'vote'
                  ? 'bg-white text-red-700 shadow-md'
                  : 'text-red-100 hover:text-white hover:bg-red-800/50'
              }`}
            >
              <Vote className="w-4 h-4" />
              <span>Cast Ballot</span>
            </button>
            <button
              id="voting-subtab-results"
              onClick={() => setActiveSubTab('results')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeSubTab === 'results'
                  ? 'bg-white text-red-700 shadow-md'
                  : 'text-red-100 hover:text-white hover:bg-red-800/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Live Results</span>
            </button>
          </div>
        </div>
      </div>

      {/* Voting Window Closed Banner */}
      {!systemSettings.is_voting_window_open && (
        <div className="mb-8 p-6 bg-amber-50 border-2 border-amber-400 rounded-2xl shadow-sm text-amber-950 flex items-start gap-4">
          <div className="p-3 bg-amber-200 text-amber-900 rounded-xl shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-amber-950">
              Voting Window Closed by Super-Admin Overlord
            </h3>
            <p className="text-sm text-amber-900 mt-1">
              Ballot submission is currently locked by system policy. You may browse live election results or candidate profiles, but new votes cannot be submitted at this time.
            </p>
          </div>
        </div>
      )}

      {activeSubTab === 'vote' ? (
        <div className="space-y-8">
          {/* STEP 1: ELIGIBILITY GATEWAY */}
          {!submissionSuccess && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-700 font-bold text-sm">
                    1
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Voter Verification Gateway
                  </h2>
                </div>
                <p className="text-sm text-slate-600 ml-11">
                  Enter your assigned Member ID (e.g., GRCS-2026-1001) to verify active dues status and single-entry eligibility.
                </p>

                <form onSubmit={handleVerifyEligibility} className="mt-6 ml-0 sm:ml-11 max-w-xl">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Search className="w-4 h-4" />
                      </div>
                      <input
                        id="voting-member-id-input"
                        type="text"
                        value={voterIdInput}
                        onChange={(e) => setVoterIdInput(e.target.value.toUpperCase())}
                        placeholder="e.g. GRCS-2026-1001"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl font-mono text-sm tracking-wide text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 uppercase"
                      />
                    </div>
                    <button
                      id="voting-verify-btn"
                      type="submit"
                      disabled={checkingEligibility || !voterIdInput.trim()}
                      className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center space-x-2 shadow-sm"
                    >
                      {checkingEligibility ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-4 h-4" />
                          <span>Verify Eligibility</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Eligibility Verification Feedback */}
                {eligibilityResult && (
                  <div className="mt-6 ml-0 sm:ml-11">
                    {eligibilityResult.eligible ? (
                      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-start space-x-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">
                            Verification Approved — Eligible to Vote
                          </p>
                          <p className="text-xs text-emerald-700 mt-1">
                            Welcome, <strong className="font-bold">{eligibilityResult.member?.full_name}</strong> ({eligibilityResult.member?.member_id}). Annual dues verified paid on{' '}
                            {eligibilityResult.member?.dues_paid_date || 'N/A'}. Proceed below to complete your secret ballot.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-900 flex items-start space-x-3">
                        <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-sm">Ineligible for Voting</p>
                          <p className="text-xs text-red-700 mt-1">
                            {eligibilityResult.reason}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: ANONYMOUS BALLOT FORM (ONLY SHOWN IF APPROVED) */}
          {eligibilityResult?.eligible && !submissionSuccess && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-8">
              <div className="flex items-center justify-between border-b border-slate-200 pb-5">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-700 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      Official Executive Ballot Selection
                    </h2>
                    <p className="text-xs text-slate-500">
                      Select your preferred candidate for each contested office.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
                  <Lock className="w-3.5 h-3.5 text-red-600" />
                  <span>Double-Blind Encryption Active</span>
                </div>
              </div>

              {loadingCandidates ? (
                <div className="py-12 text-center text-slate-500 flex flex-col items-center">
                  <RefreshCw className="w-6 h-6 animate-spin text-red-600 mb-2" />
                  <p className="text-sm">Loading official election candidates...</p>
                </div>
              ) : (
                <div className="space-y-10">
                  {positions.map((pos) => {
                    const posCandidates = candidates.filter((c) => c.position_contested === pos);
                    return (
                      <div key={pos} className="space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <h3 className="text-md font-bold text-slate-800 flex items-center space-x-2">
                            <Award className="w-4 h-4 text-red-600" />
                            <span>Office of {pos}</span>
                          </h3>
                          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                            Select 1 Candidate
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {posCandidates.map((candidate) => {
                            const isSelected = selectedVotes[pos] === candidate.id;
                            return (
                              <div
                                key={candidate.id}
                                onClick={() => handleSelectCandidate(pos, candidate.id)}
                                className={`cursor-pointer rounded-xl p-5 border-2 transition-all relative flex flex-col justify-between ${
                                  isSelected
                                    ? 'border-red-600 bg-red-50/30 shadow-md ring-2 ring-red-500/20'
                                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                                }`}
                              >
                                {isSelected && (
                                  <div className="absolute top-3 right-3 text-red-600 bg-white rounded-full p-0.5 shadow-sm">
                                    <CheckCircle2 className="w-5 h-5 fill-red-600 text-white" />
                                  </div>
                                )}

                                <div>
                                  <div className="flex items-center space-x-3.5 mb-3">
                                    <img
                                      src={
                                        candidate.profile_picture_url ||
                                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.full_name}`
                                      }
                                      alt={candidate.full_name}
                                      className="w-14 h-14 rounded-full object-cover border-2 border-slate-200 bg-slate-100"
                                    />
                                    <div>
                                      <h4 className="font-bold text-slate-900 text-base leading-tight">
                                        {candidate.full_name}
                                      </h4>
                                      <p className="text-xs font-medium text-red-600 mt-0.5">
                                        Candidate #{candidate.id.slice(-4)}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="mt-2 bg-slate-50 p-3 rounded-lg border border-slate-100">
                                    <p className="text-xs text-slate-600 italic leading-relaxed">
                                      "{candidate.manifesto_summary || 'Dedicated to advancing volunteer welfare and emergency response excellence across all regional chapters.'}"
                                    </p>
                                  </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                  <span>Contesting: {pos}</span>
                                  <span className={`font-semibold ${isSelected ? 'text-red-700' : 'text-slate-600'}`}>
                                    {isSelected ? 'Selected ✓' : 'Click to select'}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {/* SUBMISSION CONFIRMATION PANEL */}
                  <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-red-600 rounded-xl text-white">
                        <Lock className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">
                          Cryptographic Anonymity Notice
                        </h3>
                        <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                          By clicking "Submit Anonymous Ballot", your votes will be recorded directly to candidate tallies. Simultaneously, member <strong className="text-white font-mono">{voterIdInput}</strong> will be marked as having voted to prevent double-voting. The database structure ensures no linkage between your identity and candidate selection.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
                      <button
                        onClick={handleResetForm}
                        className="w-full sm:w-auto px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-sm transition-all"
                      >
                        Cancel & Change ID
                      </button>

                      <button
                        id="voting-submit-ballot-btn"
                        onClick={handleCastBallot}
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center space-x-2 shadow-lg shadow-red-900/50"
                      >
                        {isSubmitting ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Encrypting & Submitting...</span>
                          </>
                        ) : (
                          <>
                            <Vote className="w-4 h-4" />
                            <span>Submit Anonymous Ballot</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SUCCESS RECEIPT PANEL */}
          {submissionSuccess && (
            <div className="bg-white rounded-2xl shadow-md border border-emerald-200 overflow-hidden text-center p-8 sm:p-12 space-y-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                <BadgeCheck className="w-10 h-10" />
              </div>

              <div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Ballot Successfully Cast
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-3">
                  Your Secret Vote Has Been Recorded
                </h2>
                <p className="text-sm text-slate-600 max-w-lg mx-auto mt-2 leading-relaxed">
                  Thank you for exercising your democratic right in the 2026 Executive Council Elections. Your choices have been anonymized and added to live tallies.
                </p>
              </div>

              <div className="bg-slate-50 max-w-md mx-auto p-4 rounded-xl border border-slate-200 text-left space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Digital Receipt Token:</span>
                  <span className="font-mono font-bold text-slate-900">{submissionSuccess.receiptToken}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Timestamp:</span>
                  <span className="font-mono text-slate-700">{submissionSuccess.votedAt}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Status:</span>
                  <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified & Locked</span>
                  </span>
                </div>
              </div>

              <div className="flex justify-center space-x-4 pt-4">
                <button
                  onClick={handleResetForm}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition-all"
                >
                  Cast Another Ballot
                </button>
                <button
                  onClick={() => setActiveSubTab('results')}
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm transition-all flex items-center space-x-2 shadow-sm"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>View Live Election Analytics</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ELECTION ANALYTICS & LIVE RESULTS */
        <div className="space-y-8">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                <Vote className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                  Total Ballots Cast
                </p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {uniqueVoterEstimate}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Across all positions</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                  Eligible Voters
                </p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {totalVerifiedMembers}
                </h3>
                <p className="text-xs text-emerald-600 mt-0.5">Verified Dues Clearances</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                  Voter Turnout Rate
                </p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {totalVerifiedMembers > 0
                    ? `${Math.round((uniqueVoterEstimate / totalVerifiedMembers) * 100)}%`
                    : '0%'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Participating Members</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center space-x-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-slate-500 tracking-wider">
                  Contested Offices
                </p>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {positions.length}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">{candidates.length} Total Candidates</p>
              </div>
            </div>
          </div>

          {/* Position Filter Toggles */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-red-600" />
                  <span>Real-Time Candidate Vote Tallies</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Live election results calculated directly from encrypted database ballots.
                </p>
              </div>

              <div className="flex items-center space-x-2 overflow-x-auto pb-2 sm:pb-0">
                <button
                  onClick={() => setSelectedPositionFilter('All')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedPositionFilter === 'All'
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All Positions
                </button>
                {positions.map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setSelectedPositionFilter(pos)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                      selectedPositionFilter === pos
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>

            {/* Candidate Breakdown */}
            <div className="space-y-8">
              {positions
                .filter((p) => selectedPositionFilter === 'All' || selectedPositionFilter === p)
                .map((pos) => {
                  const posCandidates = candidates
                    .filter((c) => c.position_contested === pos)
                    .sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0));

                  const totalPosVotes = posCandidates.reduce(
                    (sum, c) => sum + (c.vote_count || 0),
                    0
                  );

                  const maxVote = Math.max(...posCandidates.map((c) => c.vote_count || 0), 1);

                  return (
                    <div key={pos} className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-slate-900 text-base flex items-center space-x-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
                          <span>{pos}</span>
                        </h3>
                        <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                          {totalPosVotes} Total Votes
                        </span>
                      </div>

                      <div className="space-y-4">
                        {posCandidates.map((candidate, idx) => {
                          const votes = candidate.vote_count || 0;
                          const pct = totalPosVotes > 0 ? Math.round((votes / totalPosVotes) * 100) : 0;
                          const isLeading = idx === 0 && votes > 0;

                          return (
                            <div key={candidate.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={
                                      candidate.profile_picture_url ||
                                      `https://api.dicebear.com/7.x/avataaars/svg?seed=${candidate.full_name}`
                                    }
                                    alt={candidate.full_name}
                                    className="w-10 h-10 rounded-full object-cover border border-slate-200 bg-slate-100"
                                  />
                                  <div>
                                    <div className="flex items-center space-x-2">
                                      <h4 className="font-bold text-slate-900 text-sm">
                                        {candidate.full_name}
                                      </h4>
                                      {isLeading && (
                                        <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300 flex items-center space-x-1">
                                          <Sparkles className="w-3 h-3 text-amber-600" />
                                          <span>Current Leader</span>
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-xs text-slate-500">
                                      {candidate.region} Region • Candidate ID #{candidate.id.slice(-4)}
                                    </p>
                                  </div>
                                </div>

                                <div className="text-right">
                                  <span className="text-lg font-black text-slate-900">
                                    {votes}
                                  </span>
                                  <span className="text-xs text-slate-500 block font-mono">
                                    ({pct}%)
                                  </span>
                                </div>
                              </div>

                              {/* TAILWIND METRIC BAR */}
                              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                                <div
                                  className={`h-full transition-all duration-700 ${
                                    isLeading ? 'bg-red-600' : 'bg-slate-400'
                                  }`}
                                  style={{ width: `${Math.max(pct, 2)}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
