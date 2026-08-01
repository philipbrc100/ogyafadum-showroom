import React, { useState, useEffect } from 'react';
import { Member, PaymentStatus, AdminRole, SystemRegCode, ActivityLog, CertificateRecord, SubAdminReport, ReportType } from '../types';
import { GHANA_REGIONS, INITIAL_MOCK_REG_CODES } from '../lib/constants';
import {
  fetchAllMembers,
  updateMemberPaymentStatus,
  updateMemberCertificate,
  deleteMemberRecord,
  insertNewMember,
  generateUniqueMemberId,
  generateNewRegCode,
  fetchActivityLogs,
  logActivity,
  fetchAllCertificates,
  uploadReportFile,
  insertSubAdminReport,
  fetchAllReports,
} from '../lib/supabase';
import {
  Lock,
  Unlock,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Plus,
  Trash2,
  Download,
  Printer,
  User,
  Mail,
  MapPin,
  TrendingUp,
  Users,
  CheckCircle,
  Clock,
  X,
  FileSpreadsheet,
  Award,
  Key,
  Crown,
  UserCheck,
  Copy,
  Check,
  Activity,
  Terminal,
  Smartphone,
  Laptop,
  FileText,
  ShieldAlert,
  Upload,
  FileUp,
  FileCheck,
  ExternalLink,
  FolderCheck,
  Building,
} from 'lucide-react';

interface AdminDashboardProps {
  isAdminLoggedIn: boolean;
  setIsAdminLoggedIn: (val: boolean) => void;
  onGoToCheckerWithId: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isAdminLoggedIn,
  setIsAdminLoggedIn,
  onGoToCheckerWithId,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Role State (Main Admin vs Sub-Admin)
  const [currentAdminRole, setCurrentAdminRole] = useState<AdminRole>('main_admin');

  // Registration Codes State
  const [regCodes, setRegCodes] = useState<SystemRegCode[]>(INITIAL_MOCK_REG_CODES);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [generatedCodeMsg, setGeneratedCodeMsg] = useState<string | null>(null);
  const [generatingCode, setGeneratingCode] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Directory Data & Filtering
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [isFromSupabase, setIsFromSupabase] = useState(false);

  // Manual Add Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRegion, setNewMemberRegion] = useState('Greater Accra');
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  // Print Card Modal State
  const [selectedCardMember, setSelectedCardMember] = useState<Member | null>(null);

  // Certificate Modal State
  const [certModalMember, setCertModalMember] = useState<Member | null>(null);
  const [certSerialInput, setCertSerialInput] = useState('');
  const [certDateInput, setCertDateInput] = useState('');
  const [certTypeInput, setCertTypeInput] = useState('Basic First Aid Practitioner');
  const [instructorNameInput, setInstructorNameInput] = useState('Dr. Ernest Boateng (Red Cross Master)');
  const [trainingRegionInput, setTrainingRegionInput] = useState('Greater Accra');
  const [certLoading, setCertLoading] = useState(false);
  const [certError, setCertError] = useState<string | null>(null);

  const openCertModal = (member: Member) => {
    setCertModalMember(member);
    setCertSerialInput(member.cert_serial_number || `FA-2026-${Math.floor(1000 + Math.random() * 9000)}`);
    setCertDateInput(member.cert_issue_date || new Date().toISOString().slice(0, 10));
    setCertTypeInput(member.cert_type || 'Basic First Aid Practitioner');
    setInstructorNameInput(member.instructor_name || 'Dr. Ernest Boateng (Red Cross Master)');
    setTrainingRegionInput(member.training_region || member.region || 'Greater Accra');
    setCertError(null);
  };

  const handleGenerateCode = async () => {
    setGeneratingCode(true);
    setGeneratedCodeMsg(null);

    const res = await generateNewRegCode();
    setGeneratingCode(false);
    if (res.code) {
      setRegCodes((prev) => [res.code!, ...prev]);
      setGeneratedCodeMsg(`Generated Code: ${res.code.auth_code}`);
    } else {
      alert(res.error || 'Failed to generate registration code.');
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(code);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };


  const handleCertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certModalMember) return;

    if (!certSerialInput.trim()) {
      setCertError('Please enter a Certificate Serial Number.');
      return;
    }
    if (!certDateInput) {
      setCertError('Please select a Training Issue Date.');
      return;
    }

    setCertLoading(true);
    setCertError(null);

    const result = await updateMemberCertificate(
      certModalMember.id,
      certSerialInput.trim(),
      certDateInput,
      certTypeInput.trim(),
      instructorNameInput.trim(),
      trainingRegionInput
    );

    setCertLoading(false);

    if (result.success) {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === certModalMember.id
            ? {
                ...m,
                cert_serial_number: certSerialInput.trim(),
                cert_issue_date: certDateInput,
                cert_type: certTypeInput.trim(),
                instructor_name: instructorNameInput.trim(),
                training_region: trainingRegionInput,
              }
            : m
        )
      );
      setCertModalMember(null);
    } else {
      setCertError(result.error || 'Failed to update certificate details.');
    }
  };

  // Directory, Certificates, Reports Vault & Audit Tabs State
  const [activeAdminTab, setActiveAdminTab] = useState<'directory' | 'certificates' | 'reports_vault' | 'audit_logs'>('directory');
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logSearchQuery, setLogSearchQuery] = useState('');
  
  const [certificatesList, setCertificatesList] = useState<CertificateRecord[]>([]);
  const [certsLoading, setCertsLoading] = useState(false);
  const [certSearchQuery, setCertSearchQuery] = useState('');

  // Reports Vault State
  const [reportsList, setReportsList] = useState<SubAdminReport[]>([]);
  const [reportsLoading, setReportsLoading] = useState(false);
  const [reportSearchQuery, setReportSearchQuery] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState<'ALL' | 'monthly' | 'quarterly'>('ALL');

  // Sub-Admin Report Upload Form State
  const [subAdminNameInput, setSubAdminNameInput] = useState('David Boateng (Sub-Admin)');
  const [reportRegionInput, setReportRegionInput] = useState('Ashanti');
  const [reportTypeInput, setReportTypeInput] = useState<ReportType>('monthly');
  const [reportFile, setReportFile] = useState<File | null>(null);
  const [reportUploading, setReportUploading] = useState(false);
  const [reportSuccessMsg, setReportSuccessMsg] = useState<string | null>(null);
  const [reportErrorMsg, setReportErrorMsg] = useState<string | null>(null);

  const loadMembers = async () => {
    setLoading(true);
    try {
      const res = await fetchAllMembers();
      setMembers(res.members);
      setIsFromSupabase(res.isFromSupabase);
    } catch (err) {
      console.error('Failed to load members:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadLogs = async () => {
    setLogsLoading(true);
    try {
      const logs = await fetchActivityLogs();
      setActivityLogs(logs);
    } catch (err) {
      console.error('Failed to load activity logs:', err);
    } finally {
      setLogsLoading(false);
    }
  };

  const loadCertificates = async () => {
    setCertsLoading(true);
    try {
      const certs = await fetchAllCertificates();
      setCertificatesList(certs);
    } catch (err) {
      console.error('Failed to load certificates:', err);
    } finally {
      setCertsLoading(false);
    }
  };

  const loadReports = async () => {
    setReportsLoading(true);
    try {
      const reports = await fetchAllReports();
      setReportsList(reports);
    } catch (err) {
      console.error('Failed to load reports:', err);
    } finally {
      setReportsLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) {
      loadMembers();
      loadLogs();
      loadCertificates();
      loadReports();
    }
  }, [isAdminLoggedIn]);

  const handleReportUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportFile) {
      setReportErrorMsg('Please select a report file (.pdf, .docx, or .xlsx).');
      return;
    }

    setReportUploading(true);
    setReportSuccessMsg(null);
    setReportErrorMsg(null);

    try {
      // 1. Upload to Supabase 'reports-vault' storage bucket
      const uploadRes = await uploadReportFile(reportFile);
      if (uploadRes.error || !uploadRes.url) {
        setReportErrorMsg(uploadRes.error || 'Failed to upload report file to storage vault.');
        setReportUploading(false);
        return;
      }

      // 2. Insert record in 'reports' table with active session info
      const insertRes = await insertSubAdminReport({
        sub_admin_name: subAdminNameInput.trim() || (currentAdminRole === 'sub_admin' ? 'Sub-Admin Operator' : 'Main Administrator'),
        origin_region: reportRegionInput,
        report_type: reportTypeInput,
        report_file_url: uploadRes.url,
        file_name: uploadRes.fileName,
        device_info: typeof navigator !== 'undefined' ? navigator.userAgent : 'Sub-Admin Station',
      });

      setReportUploading(false);

      if (insertRes.report) {
        setReportSuccessMsg(`Successfully uploaded ${reportTypeInput.toUpperCase()} operational report (${uploadRes.fileName}) to the Centralized Reports Vault!`);
        setReportsList((prev) => [insertRes.report!, ...prev]);
        setReportFile(null);
      } else {
        setReportErrorMsg(insertRes.error || 'Failed to submit report metadata to database.');
      }
    } catch (err: any) {
      setReportUploading(false);
      setReportErrorMsg(err.message || 'Error occurred uploading report.');
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === '1234' || pinInput.trim().toLowerCase() === 'admin' || pinInput.trim() !== '') {
      setIsAdminLoggedIn(true);
      setPinError(false);
      setPinInput('');
      logActivity(
        currentAdminRole === 'main_admin' ? 'Main Administrator' : 'Sub-Admin Operator',
        'ADMIN_AUTHENTICATED',
        `Successfully logged into Administrator Dashboard as ${currentAdminRole === 'main_admin' ? 'Main Admin' : 'Sub-Admin'}.`
      );
    } else {
      setPinError(true);
      logActivity(
        'Unknown Access Request',
        'AUTH_FAILED',
        `Failed PIN authentication attempt in Administrator Portal.`
      );
    }
  };

  const handleToggleStatus = async (member: Member) => {
    const nextStatus: PaymentStatus = member.payment_status === 'verified' ? 'not active' : 'verified';
    setUpdatingId(member.id);

    try {
      const res = await updateMemberPaymentStatus(member.id, nextStatus);
      if (res.success) {
        // Optimistic UI update
        setMembers((prev) =>
          prev.map((m) => (m.id === member.id ? { ...m, payment_status: nextStatus } : m))
        );
      } else {
        alert(`Failed to update status: ${res.error}`);
      }
    } catch (err: any) {
      alert(`Error updating status: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (member: Member) => {
    if (!window.confirm(`Are you sure you want to delete member ${member.full_name} (${member.member_id})?`)) {
      return;
    }
    setUpdatingId(member.id);
    try {
      const res = await deleteMemberRecord(member.id);
      if (res.success) {
        setMembers((prev) => prev.filter((m) => m.id !== member.id));
      } else {
        alert(`Delete failed: ${res.error}`);
      }
    } catch (err: any) {
      alert(`Delete error: ${err.message}`);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAddMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberEmail.trim()) {
      setAddError('All fields are required.');
      return;
    }

    setAddLoading(true);
    setAddError(null);

    const generatedId = generateUniqueMemberId();

    try {
      const res = await insertNewMember({
        full_name: newMemberName.trim(),
        email: newMemberEmail.trim(),
        region: newMemberRegion,
        member_id: generatedId,
      });

      if (res.error) {
        setAddError(res.error);
      } else if (res.member) {
        setMembers((prev) => [res.member!, ...prev]);
        setShowAddModal(false);
        setNewMemberName('');
        setNewMemberEmail('');
        setNewMemberRegion('Greater Accra');
      }
    } catch (err: any) {
      setAddError(err.message || 'Failed to add member.');
    } finally {
      setAddLoading(false);
    }
  };

  const handleExportCSV = () => {
    if (members.length === 0) return;
    const headers = ['Member ID', 'Full Name', 'Email', 'Region', 'Payment Status', 'Created At'];
    const rows = filteredMembers.map((m) => [
      m.member_id,
      `"${m.full_name.replace(/"/g, '""')}"`,
      m.email,
      `"${m.region}"`,
      m.payment_status,
      new Date(m.created_at).toISOString(),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Ghana_Red_Cross_Members_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter Logic
  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.member_id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion = selectedRegion === 'ALL' || m.region === selectedRegion;
    const matchesStatus = selectedStatus === 'ALL' || m.payment_status === selectedStatus;

    return matchesSearch && matchesRegion && matchesStatus;
  });

  // Analytics Stats according to specifications:
  // 1. Total Members
  const totalMembersCount = members.length;

  // 2. Active Dues (verified dues paid < 365 days)
  const activeDuesCount = members.filter((m) => {
    if (m.payment_status !== 'verified') return false;
    if (!m.dues_paid_date) return false;
    const paidTime = new Date(m.dues_paid_date).getTime();
    if (isNaN(paidTime)) return false;
    const diffDays = (Date.now() - paidTime) / (1000 * 60 * 60 * 24);
    return diffDays < 365;
  }).length;

  // 3. Total Certificates Issued
  const totalCertsCount = certificatesList.length;

  // 4. Expired Certificates (> 2 years or 730 days)
  const expiredCertsCount = certificatesList.filter((c) => {
    if (!c.cert_issue_date) return false;
    const issueTime = new Date(c.cert_issue_date).getTime();
    if (isNaN(issueTime)) return false;
    const diffDays = (Date.now() - issueTime) / (1000 * 60 * 60 * 24);
    return diffDays > 730;
  }).length;

  // LOGIN SCREEN (if not logged in)
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-red-100 overflow-hidden">
          <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-6 text-center">
            <div className="w-14 h-14 bg-white/10 rounded-2xl mx-auto flex items-center justify-center mb-2 backdrop-blur-sm border border-white/20">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold font-heading">Administrator Portal</h3>
            <p className="text-xs text-red-100 mt-1">
              Protected access to master dues directory
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="p-6 sm:p-8 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                Enter Admin Access PIN / Password
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (e.g. 1234)"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl font-mono text-center text-lg font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-600 transition-all"
              />
              {pinError && (
                <p className="text-xs text-red-600 font-bold mt-1">
                  Invalid PIN. (Tip: Enter 1234 or click Access below)
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-heading"
            >
              <Unlock className="w-4 h-4" />
              <span>Authenticate & Access Dashboard</span>
            </button>

            {/* Direct Quick Toggle for Prototype convenience */}
            <div className="pt-3 text-center border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsAdminLoggedIn(true)}
                className="text-xs text-red-600 hover:text-red-800 font-bold underline cursor-pointer"
              >
                ⚡ Quick Bypass (One-Click Prototype Admin Access)
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // DASHBOARD VIEW
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Admin Top Header & Role Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 no-print pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-md font-bold text-xs uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
              ADMINISTRATOR PORTAL
            </span>
            <span className="text-xs text-gray-500 font-mono">
              {isFromSupabase ? 'DB: Supabase Live' : 'DB: Local Prototype'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-gray-900">
            Master Directory & Dues Manager
          </h2>
        </div>

        {/* Role Toggle Selector */}
        <div className="bg-gray-100 p-1.5 rounded-xl border border-gray-300 flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCurrentAdminRole('main_admin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentAdminRole === 'main_admin'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Main Admin</span>
          </button>
          <button
            type="button"
            onClick={() => setCurrentAdminRole('sub_admin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              currentAdminRole === 'sub_admin'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Sub-Admin Mode</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {currentAdminRole === 'main_admin' && (
            <button
              onClick={() => setShowCodeModal(true)}
              className="px-3.5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
            >
              <Key className="w-4 h-4" />
              <span>Registration Codes ({regCodes.filter(c => !c.is_used).length} Active)</span>
            </button>
          )}

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Member</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-300 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={loadMembers}
            disabled={loading}
            className="p-2.5 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 rounded-xl cursor-pointer"
            title="Refresh Directory"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => setIsAdminLoggedIn(false)}
            className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl text-xs flex items-center gap-1 cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock Portal</span>
          </button>
        </div>
      </div>

      {/* Analytics Summary Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 no-print">
        <div className="bg-white p-5 rounded-2xl border-2 border-red-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              Total Members
            </span>
            <span className="text-3xl font-black text-gray-900 block font-heading mt-0.5">
              {totalMembersCount}
            </span>
          </div>
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-red-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              Active Dues (&lt; 365 Days)
            </span>
            <span className="text-3xl font-black text-emerald-600 block font-heading mt-0.5">
              {activeDuesCount}
            </span>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-red-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              Total Certificates
            </span>
            <span className="text-3xl font-black text-red-600 block font-heading mt-0.5">
              {totalCertsCount}
            </span>
          </div>
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-red-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">
              Expired Certs (&gt; 2 Yrs)
            </span>
            <span className="text-3xl font-black text-amber-600 block font-heading mt-0.5">
              {expiredCertsCount}
            </span>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <ShieldAlert className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Admin Section Navigation Tabs: Master Directory vs Certificates Registry vs System Audit Logs */}
      <div className="flex border-b border-gray-200 mb-6 no-print overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveAdminTab('directory')}
          className={`pb-3 px-6 text-sm font-extrabold flex items-center gap-2 border-b-2 cursor-pointer transition-all shrink-0 ${
            activeAdminTab === 'directory'
              ? 'border-red-600 text-red-600 font-black'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Master Member Directory</span>
          <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 font-mono">
            {filteredMembers.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveAdminTab('certificates');
            loadCertificates();
          }}
          className={`pb-3 px-6 text-sm font-extrabold flex items-center gap-2 border-b-2 cursor-pointer transition-all shrink-0 ${
            activeAdminTab === 'certificates'
              ? 'border-red-600 text-red-600 font-black'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Certificates Registry</span>
          <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 font-mono">
            {certificatesList.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveAdminTab('reports_vault');
            loadReports();
          }}
          className={`pb-3 px-6 text-sm font-extrabold flex items-center gap-2 border-b-2 cursor-pointer transition-all shrink-0 ${
            activeAdminTab === 'reports_vault'
              ? 'border-red-600 text-red-600 font-black'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <FolderCheck className="w-4 h-4 text-red-600" />
          <span>Centralized Reports Vault</span>
          <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-700 font-mono">
            {reportsList.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveAdminTab('audit_logs');
            loadLogs();
          }}
          className={`pb-3 px-6 text-sm font-extrabold flex items-center gap-2 border-b-2 cursor-pointer transition-all ${
            activeAdminTab === 'audit_logs'
              ? 'border-red-600 text-red-600 font-black'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Terminal className="w-4 h-4 text-gray-700" />
          <span>System Audit Logs Tab</span>
          <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-800 font-mono">
            {activityLogs.length}
          </span>
        </button>
      </div>

      {activeAdminTab === 'directory' ? (
        <>
          {/* Filter Toolbar Controls */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-md border border-gray-200 mb-6 no-print space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between sm:gap-4">
            {/* Search Field */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by Name, Email, or Member ID..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-2 border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-red-600 transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filters Grid */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase text-gray-500">Status:</span>
                <select
                  value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-gray-50 border-2 border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-red-600 cursor-pointer"
            >
              <option value="ALL">All Statuses ({totalMembersCount})</option>
              <option value="verified">Verified Only ({activeDuesCount})</option>
              <option value="not active">Not Active Only ({members.filter(m => m.payment_status === 'not active').length})</option>
            </select>
          </div>

          {/* Region Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase text-gray-500">Region:</span>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 bg-gray-50 border-2 border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:outline-none focus:border-red-600 cursor-pointer max-w-[180px]"
            >
              <option value="ALL">All 16 Regions</option>
              {GHANA_REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Master Directory Table Card */}
      <div className="bg-white rounded-2xl shadow-xl border-2 border-red-100 overflow-hidden">
        <div className="bg-gradient-to-r from-red-700 to-red-800 text-white px-6 py-3.5 flex items-center justify-between no-print">
          <span className="font-bold text-sm tracking-wider uppercase font-heading flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-red-200" />
            Master Directory Table ({filteredMembers.length} records found)
          </span>
          <span className="text-xs text-red-200 font-medium">
            Click toggle button to update Supabase payment_status
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-xs uppercase font-extrabold tracking-wider border-b border-gray-200">
                <th className="py-3.5 px-4 sm:px-6 text-center">Photo</th>
                <th className="py-3.5 px-4 sm:px-6">Member ID</th>
                <th className="py-3.5 px-4 sm:px-6">Full Name & Email</th>
                <th className="py-3.5 px-4 sm:px-6">Ghana Region</th>
                <th className="py-3.5 px-4 sm:px-6 text-center">Dues Status</th>
                <th className="py-3.5 px-4 sm:px-6">First Aid Cert Serial</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    <RefreshCw className="w-8 h-8 animate-spin mx-auto text-red-600 mb-2" />
                    <span>Loading directory records from database...</span>
                  </td>
                </tr>
              ) : filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    <XCircle className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="font-bold">No member records match your filters.</p>
                    <p className="text-xs text-gray-400 mt-1">Try clearing your search query or region filter.</p>
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-red-50/40 transition-colors">
                    {/* Dedicated Photo Thumbnail Column */}
                    <td className="py-4 px-4 sm:px-6 text-center whitespace-nowrap">
                      {member.profile_picture_url ? (
                        <img
                          src={member.profile_picture_url}
                          alt={member.full_name}
                          className="w-10 h-10 rounded-full object-cover border-2 border-red-600 shadow-xs mx-auto"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-red-100 border-2 border-red-600 flex items-center justify-center mx-auto text-red-600 shadow-xs">
                          <UserCheck className="w-5 h-5" />
                        </div>
                      )}
                    </td>

                    {/* Member ID */}
                    <td className="py-4 px-4 sm:px-6 font-mono font-bold text-red-700 whitespace-nowrap">
                      {member.member_id}
                    </td>

                    {/* Full Name & Email */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-bold text-gray-900">{member.full_name}</div>
                      <div className="text-xs text-gray-500 font-medium">{member.email}</div>
                    </td>

                    {/* Region */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-800 rounded-md text-xs font-semibold">
                        {member.region}
                      </span>
                    </td>

                    {/* Payment Status Badge */}
                    <td className="py-4 px-4 sm:px-6 text-center whitespace-nowrap">
                      {member.payment_status === 'verified' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-red-600 text-white shadow-sm">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          🔴 VERIFIED
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border border-gray-300">
                          <XCircle className="w-3.5 h-3.5 text-gray-500" />
                          ⚪ NOT ACTIVE
                        </span>
                      )}
                    </td>

                    {/* First Aid Cert Column */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      {member.cert_serial_number ? (
                        <div>
                          <span className="font-mono font-bold text-xs bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-md block w-max">
                            {member.cert_serial_number}
                          </span>
                          <span className="text-[11px] text-gray-500 block mt-0.5">
                            Issued: {member.cert_issue_date || 'N/A'}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic">No cert issued</span>
                      )}
                    </td>

                    {/* Administrative Actions */}
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-2">
                        {/* Status Toggle Button */}
                        <button
                          onClick={() => currentAdminRole === 'main_admin' && handleToggleStatus(member)}
                          disabled={updatingId === member.id || currentAdminRole === 'sub_admin'}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                            currentAdminRole === 'sub_admin'
                              ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-60'
                              : member.payment_status === 'verified'
                              ? 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 cursor-pointer'
                              : 'bg-red-600 text-white hover:bg-red-700 shadow-sm cursor-pointer'
                          }`}
                          title={
                            currentAdminRole === 'sub_admin'
                              ? 'Main Admin Privilege Only: Sub-Admins cannot toggle payment clearance'
                              : 'Click to instantly toggle payment_status in Supabase'
                          }
                        >
                          {updatingId === member.id ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          ) : member.payment_status === 'verified' ? (
                            <>
                              <span>Set Not Active</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Verify Dues</span>
                            </>
                          )}
                        </button>

                        {/* Add / Update Certificate Button */}
                        <button
                          onClick={() => currentAdminRole === 'main_admin' && openCertModal(member)}
                          disabled={currentAdminRole === 'sub_admin'}
                          className={`px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors ${
                            currentAdminRole === 'sub_admin'
                              ? 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed opacity-60'
                              : 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 cursor-pointer'
                          }`}
                          title={
                            currentAdminRole === 'sub_admin'
                              ? 'Main Admin Privilege Only: Sub-Admins cannot issue certificates'
                              : 'Add or update First Aid Certificate serial and training issue date'
                          }
                        >
                          <Award className="w-3.5 h-3.5 text-red-600" />
                          <span>{member.cert_serial_number ? 'Update Cert' : '+ Cert'}</span>
                        </button>

                        {/* Print Card Button */}
                        <button
                          onClick={() => setSelectedCardMember(member)}
                          className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs cursor-pointer"
                          title="View & Print Member Card"
                        >
                          <Printer className="w-4 h-4" />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => currentAdminRole === 'main_admin' && handleDelete(member)}
                          disabled={updatingId === member.id || currentAdminRole === 'sub_admin'}
                          className={`p-1.5 rounded-lg text-xs transition-colors ${
                            currentAdminRole === 'sub_admin'
                              ? 'bg-gray-100 text-gray-300 cursor-not-allowed opacity-40'
                              : 'bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer'
                          }`}
                          title={
                            currentAdminRole === 'sub_admin'
                              ? 'Main Admin Privilege Only'
                              : 'Delete member record'
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
        </>
      ) : activeAdminTab === 'certificates' ? (
        /* CERTIFICATES REGISTRY TAB VIEW */
        <div className="bg-white rounded-2xl shadow-xl border-2 border-red-100 overflow-hidden no-print">
          <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-5 h-5 text-red-200" />
                <span className="text-xs uppercase font-extrabold tracking-widest text-red-100">
                  OFFICIAL CERTIFICATE DATABASE
                </span>
              </div>
              <h3 className="text-xl font-extrabold font-heading">
                First Aid Certificate Registry (`certificates`)
              </h3>
              <p className="text-xs text-red-100 mt-0.5">
                Centralized registry of First Aid Practitioner qualifications for GRCS Members and Non-Member Trainees.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={loadCertificates}
                disabled={certsLoading}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-white/20"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${certsLoading ? 'animate-spin' : ''}`} />
                <span>Refresh Registry</span>
              </button>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md w-full">
              <input
                type="text"
                value={certSearchQuery}
                onChange={(e) => setCertSearchQuery(e.target.value)}
                placeholder="Search by serial number, practitioner name, instructor, or region..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl text-xs font-medium focus:outline-none focus:border-red-600"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {certSearchQuery && (
                <button
                  type="button"
                  onClick={() => setCertSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>

            <span className="text-xs font-bold text-gray-500 font-mono">
              Showing {certificatesList.filter(c => 
                !certSearchQuery || 
                c.cert_serial_number.toLowerCase().includes(certSearchQuery.toLowerCase()) ||
                c.full_name.toLowerCase().includes(certSearchQuery.toLowerCase()) ||
                (c.instructor_name && c.instructor_name.toLowerCase().includes(certSearchQuery.toLowerCase())) ||
                (c.training_region && c.training_region.toLowerCase().includes(certSearchQuery.toLowerCase()))
              ).length} certificates
            </span>
          </div>

          {/* Certificates Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200 text-[11px] font-black uppercase text-gray-600 tracking-wider">
                  <th className="py-3 px-4">Serial Number</th>
                  <th className="py-3 px-4">Practitioner</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Qualification</th>
                  <th className="py-3 px-4">Issue Date / Status</th>
                  <th className="py-3 px-4">Region & Instructor</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {certsLoading ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500">
                      <RefreshCw className="w-6 h-6 animate-spin text-red-600 mx-auto mb-2" />
                      Loading certificates database...
                    </td>
                  </tr>
                ) : certificatesList.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500">
                      No certificates registered in the system yet.
                    </td>
                  </tr>
                ) : (
                  certificatesList
                    .filter((c) => {
                      if (!certSearchQuery) return true;
                      const q = certSearchQuery.toLowerCase();
                      return (
                        c.cert_serial_number.toLowerCase().includes(q) ||
                        c.full_name.toLowerCase().includes(q) ||
                        (c.instructor_name && c.instructor_name.toLowerCase().includes(q)) ||
                        (c.training_region && c.training_region.toLowerCase().includes(q))
                      );
                    })
                    .map((cert) => {
                      const issueTime = cert.cert_issue_date ? new Date(cert.cert_issue_date).getTime() : Date.now();
                      const daysDiff = (Date.now() - issueTime) / (1000 * 60 * 60 * 24);
                      const isExpired = daysDiff > 730;

                      return (
                        <tr key={cert.cert_serial_number} className="hover:bg-red-50/30 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-xs font-black text-red-600 whitespace-nowrap">
                            {cert.cert_serial_number}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-gray-900 whitespace-nowrap">
                            <div className="flex items-center space-x-2.5">
                              <div className="w-8 h-8 rounded-full bg-red-100 border border-red-200 overflow-hidden shrink-0 flex items-center justify-center text-red-700 font-bold text-xs">
                                {cert.profile_picture_url ? (
                                  <img src={cert.profile_picture_url} alt={cert.full_name} className="w-full h-full object-cover" />
                                ) : (
                                  cert.full_name.charAt(0)
                                )}
                              </div>
                              <span className="font-bold text-gray-900">{cert.full_name}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase border ${
                              cert.profile_type === 'member'
                                ? 'bg-red-50 text-red-700 border-red-200'
                                : 'bg-slate-100 text-slate-800 border-slate-300'
                            }`}>
                              {cert.profile_type === 'member' ? '👥 Member' : '💼 Non-Member'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-gray-800 whitespace-nowrap">
                            {cert.cert_type || 'Basic First Aid Practitioner'}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <span className="font-mono text-gray-700">{cert.cert_issue_date || 'N/A'}</span>
                              <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full ${
                                isExpired ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
                              }`}>
                                {isExpired ? 'EXPIRED' : 'VALID'}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <div className="text-[11px]">
                              <p className="font-bold text-gray-800">{cert.training_region || 'Greater Accra'} Region</p>
                              <p className="text-gray-500 text-[10px]">{cert.instructor_name || 'Dr. Ernest Boateng'}</p>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => onGoToCheckerWithId(cert.cert_serial_number)}
                              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 font-extrabold rounded-lg border border-red-200 transition-colors text-xs cursor-pointer inline-flex items-center gap-1"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>Verify</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* SYSTEM AUDIT LOGS TAB VIEW */
        <div className="bg-white rounded-2xl shadow-xl border-2 border-red-100 overflow-hidden no-print">
          <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Terminal className="w-5 h-5 text-red-200" />
                <span className="text-xs uppercase font-extrabold tracking-widest text-red-100">
                  SECURITY & COMPLIANCE
                </span>
              </div>
              <h3 className="text-xl font-extrabold font-heading">
                System Audit Trail (`activity_logs`)
              </h3>
              <p className="text-xs text-red-100 mt-0.5">
                Real-time chronological log capturing actor name, action type, operational details, and browser footprint.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={loadLogs}
                disabled={logsLoading}
                className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-white/20"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${logsLoading ? 'animate-spin' : ''}`} />
                <span>Refresh Audit Logs</span>
              </button>
            </div>
          </div>

          {/* Log Search Filter */}
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md w-full">
              <input
                type="text"
                value={logSearchQuery}
                onChange={(e) => setLogSearchQuery(e.target.value)}
                placeholder="Search audit trail by actor, action type, or details..."
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl text-xs font-medium focus:outline-none focus:border-red-600"
              />
              <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {logSearchQuery && (
                <button
                  type="button"
                  onClick={() => setLogSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>

            <span className="text-xs font-bold text-gray-500 font-mono">
              Showing {activityLogs.filter(l => 
                !logSearchQuery || 
                l.actor_name.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
                l.action_type.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
                l.details.toLowerCase().includes(logSearchQuery.toLowerCase())
              ).length} records
            </span>
          </div>

          {/* Audit Logs Data Grid Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200 text-[11px] font-black uppercase text-gray-600 tracking-wider">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Action Type</th>
                  <th className="py-3 px-4">Operational Details</th>
                  <th className="py-3 px-4">Device & Browser Footprint</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {logsLoading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-500">
                      <RefreshCw className="w-6 h-6 animate-spin text-red-600 mx-auto mb-2" />
                      Loading system audit records...
                    </td>
                  </tr>
                ) : activityLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-500">
                      No activity logs captured yet. Perform system actions to generate audit entries.
                    </td>
                  </tr>
                ) : (
                  activityLogs
                    .filter((l) => {
                      if (!logSearchQuery) return true;
                      const q = logSearchQuery.toLowerCase();
                      return (
                        l.actor_name.toLowerCase().includes(q) ||
                        l.action_type.toLowerCase().includes(q) ||
                        l.details.toLowerCase().includes(q)
                      );
                    })
                    .map((log) => (
                      <tr key={log.id} className="hover:bg-red-50/30 transition-colors">
                        <td className="py-3.5 px-4 font-mono text-gray-600 whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          })}{' '}
                          <span className="text-gray-400 font-normal">
                            {new Date(log.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-gray-900 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5">
                            {log.actor_name.includes('Main') ? (
                              <Crown className="w-3.5 h-3.5 text-red-600" />
                            ) : (
                              <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                            )}
                            {log.actor_name}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span
                            className={`px-2.5 py-1 rounded-md font-mono text-[10px] font-extrabold uppercase border ${
                              log.action_type.includes('REGISTER')
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : log.action_type.includes('DUES')
                                ? 'bg-red-50 text-red-700 border-red-200'
                                : log.action_type.includes('CODE')
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : log.action_type.includes('AUTH')
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-gray-100 text-gray-800 border-gray-300'
                            }`}
                          >
                            {log.action_type}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-gray-800 max-w-md break-words">
                          {log.details}
                        </td>
                        <td className="py-3.5 px-4 text-gray-500 font-mono text-[11px] max-w-xs truncate" title={log.device_info}>
                          <span className="flex items-center gap-1">
                            <Laptop className="w-3 h-3 text-gray-400 shrink-0" />
                            <span className="truncate">{log.device_info}</span>
                          </span>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: CENTRALIZED REPORTS VAULT & SUB-ADMIN OPERATIONAL REPORTING PORTAL */}
      {activeAdminTab === 'reports_vault' && (
        <div className="space-y-8 no-print">
          {/* Sub-Admin Operational Reporting Module */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-red-200 overflow-hidden">
            <div className="bg-gradient-to-r from-red-700 via-red-800 to-red-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-white/10 rounded-xl">
                  <FileUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg tracking-wide font-heading">
                    Sub-Admin Operational Reporting Engine
                  </h3>
                  <p className="text-xs text-red-100">
                    Upload official Monthly or Quarterly branch performance reports (.pdf, .docx, .xlsx) directly to the secure Supabase storage vault.
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 bg-white/20 text-white font-mono text-xs font-bold rounded-full hidden sm:inline-block">
                Bucket: reports-vault
              </span>
            </div>

            <form onSubmit={handleReportUploadSubmit} className="p-6 space-y-4">
              {reportSuccessMsg && (
                <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-xl text-emerald-900 text-sm font-bold flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{reportSuccessMsg}</span>
                </div>
              )}

              {reportErrorMsg && (
                <div className="p-4 bg-red-50 border-2 border-red-300 rounded-xl text-red-900 text-sm font-bold flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
                  <span>{reportErrorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Sub-Admin Name */}
                <div>
                  <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1.5">
                    Sub-Admin Operator Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={subAdminNameInput}
                    onChange={(e) => setSubAdminNameInput(e.target.value)}
                    placeholder="e.g. David Boateng"
                    className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:border-red-600 transition-all"
                  />
                </div>

                {/* Origin Region */}
                <div>
                  <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1.5">
                    Region of Origin <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={reportRegionInput}
                    onChange={(e) => setReportRegionInput(e.target.value)}
                    className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:border-red-600 cursor-pointer"
                  >
                    {GHANA_REGIONS.map((r) => (
                      <option key={r} value={r}>
                        {r} Region
                      </option>
                    ))}
                  </select>
                </div>

                {/* Report Type Dropdown Toggle */}
                <div>
                  <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1.5">
                    Report Frequency Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={reportTypeInput}
                    onChange={(e) => setReportTypeInput(e.target.value as ReportType)}
                    className="w-full px-4 py-2.5 bg-gray-50 border-2 border-gray-300 rounded-xl text-sm font-extrabold text-red-700 focus:outline-none focus:border-red-600 cursor-pointer"
                  >
                    <option value="monthly">📅 Monthly Operational Report</option>
                    <option value="quarterly">📊 Quarterly Regional Report</option>
                  </select>
                </div>
              </div>

              {/* File Attachment Dropzone */}
              <div>
                <label className="block text-xs font-extrabold uppercase text-gray-700 mb-1.5">
                  Attach Official Document File (.PDF, .DOCX, .XLSX) <span className="text-red-600">*</span>
                </label>
                <div className="relative border-2 border-dashed border-gray-300 hover:border-red-500 rounded-2xl p-4 bg-gray-50/50 hover:bg-red-50/20 transition-all text-center">
                  <input
                    type="file"
                    accept=".pdf,.docx,.xlsx,.doc,.xls"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setReportFile(e.target.files[0]);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                    <Upload className="w-8 h-8 text-red-600" />
                    {reportFile ? (
                      <div className="text-sm font-extrabold text-red-700">
                        Selected File: <span className="underline">{reportFile.name}</span> ({(reportFile.size / 1024).toFixed(1)} KB)
                      </div>
                    ) : (
                      <div className="text-xs text-gray-600">
                        <span className="font-bold text-red-600">Click or drag & drop</span> your monthly or quarterly report document file here
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Action Row */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-gray-500 font-mono">
                  Device Footprint: <span className="text-gray-700 font-bold">{typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 40) + '...' : 'Sub-Admin Workstation'}</span>
                </span>

                <button
                  type="submit"
                  disabled={reportUploading || !reportFile}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl flex items-center gap-2 shadow-lg cursor-pointer transition-all"
                >
                  {reportUploading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Uploading to Storage Vault...</span>
                    </>
                  ) : (
                    <>
                      <FileUp className="w-4 h-4" />
                      <span>Submit & File Report</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Senior Administration Review Grid: Centralized Reports Vault */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-gray-200 bg-gray-50 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-2">
                <FolderCheck className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-gray-900 text-base">
                  Centralized Reports Vault Grid (Senior Administration Review)
                </h3>
              </div>

              {/* Vault Search & Filter Toolbar */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    value={reportSearchQuery}
                    onChange={(e) => setReportSearchQuery(e.target.value)}
                    placeholder="Search by Sub-Admin or Region..."
                    className="pl-9 pr-3 py-1.5 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:outline-none focus:border-red-600"
                  />
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <select
                  value={reportTypeFilter}
                  onChange={(e) => setReportTypeFilter(e.target.value as any)}
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-gray-800 cursor-pointer"
                >
                  <option value="ALL">All Report Types</option>
                  <option value="monthly">Monthly Reports</option>
                  <option value="quarterly">Quarterly Reports</option>
                </select>

                <button
                  type="button"
                  onClick={loadReports}
                  className="p-1.5 bg-white hover:bg-gray-100 border border-gray-300 rounded-xl cursor-pointer text-gray-600"
                  title="Reload Vault"
                >
                  <RefreshCw className={`w-4 h-4 ${reportsLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Reports Vault Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-xs uppercase font-extrabold tracking-wider border-b border-gray-200">
                    <th className="py-3.5 px-4 sm:px-6">Date Uploaded</th>
                    <th className="py-3.5 px-4 sm:px-6 text-center">Report Type</th>
                    <th className="py-3.5 px-4 sm:px-6">Sub-Admin Name</th>
                    <th className="py-3.5 px-4 sm:px-6">Region of Origin</th>
                    <th className="py-3.5 px-4 sm:px-6">Device / Browser Info</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Document Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-sm">
                  {reportsLoading ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-500">
                        <RefreshCw className="w-6 h-6 animate-spin text-red-600 mx-auto mb-2" />
                        Fetching submitted reports from storage vault...
                      </td>
                    </tr>
                  ) : reportsList.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-gray-500">
                        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        No operational reports filed yet. Sub-Admins can upload reports above.
                      </td>
                    </tr>
                  ) : (
                    reportsList
                      .filter((r) => {
                        if (reportTypeFilter !== 'ALL' && r.report_type !== reportTypeFilter) return false;
                        if (!reportSearchQuery) return true;
                        const q = reportSearchQuery.toLowerCase();
                        return (
                          r.sub_admin_name.toLowerCase().includes(q) ||
                          r.origin_region.toLowerCase().includes(q) ||
                          (r.file_name && r.file_name.toLowerCase().includes(q))
                        );
                      })
                      .map((report) => (
                        <tr key={report.id} className="hover:bg-red-50/30 transition-colors">
                          <td className="py-4 px-4 sm:px-6 whitespace-nowrap font-mono text-xs text-gray-600">
                            {new Date(report.uploaded_at).toLocaleDateString('en-GB', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            })}{' '}
                            <span className="text-gray-400">
                              {new Date(report.uploaded_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </td>

                          <td className="py-4 px-4 sm:px-6 text-center whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                                report.report_type === 'quarterly'
                                  ? 'bg-purple-100 text-purple-800 border border-purple-300'
                                  : 'bg-red-100 text-red-800 border border-red-300'
                              }`}
                            >
                              {report.report_type === 'quarterly' ? '📊 Quarterly' : '📅 Monthly'}
                            </span>
                          </td>

                          <td className="py-4 px-4 sm:px-6 font-bold text-gray-900 whitespace-nowrap">
                            <span className="flex items-center gap-1.5">
                              <UserCheck className="w-4 h-4 text-red-600 shrink-0" />
                              {report.sub_admin_name}
                            </span>
                          </td>

                          <td className="py-4 px-4 sm:px-6 whitespace-nowrap font-medium text-gray-800">
                            <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-800">
                              {report.origin_region} Region
                            </span>
                          </td>

                          <td className="py-4 px-4 sm:px-6 font-mono text-xs text-gray-500 max-w-xs truncate" title={report.device_info}>
                            <span className="flex items-center gap-1">
                              <Laptop className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                              <span className="truncate">{report.device_info}</span>
                            </span>
                          </td>

                          <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                            <a
                              href={report.report_file_url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>View / Download</span>
                              <ExternalLink className="w-3 h-3 opacity-80" />
                            </a>
                          </td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-red-600 max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold font-heading text-lg">Add New Member</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white hover:text-red-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMemberSubmit} className="p-6 space-y-4">
              {addError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                  {addError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="e.g. Ama Serwaa"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  placeholder="ama@school.edu.gh"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Ghana Region
                </label>
                <select
                  value={newMemberRegion}
                  onChange={(e) => setNewMemberRegion(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold"
                >
                  {GHANA_REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r} Region
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addLoading}
                  className="px-5 py-2 bg-red-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                >
                  {addLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                  <span>Save Member</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: FIRST AID CERTIFICATE MANAGEMENT */}
      {certModalMember && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-red-600 max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-r from-red-700 to-red-800 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-amber-300" />
                <h3 className="font-bold font-heading text-lg">Manage First Aid Certificate</h3>
              </div>
              <button
                onClick={() => setCertModalMember(null)}
                className="text-white hover:text-red-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCertSubmit} className="p-6 space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 text-xs text-red-900">
                <span className="font-bold block text-sm">{certModalMember.full_name}</span>
                <span className="text-gray-600">ID: {certModalMember.member_id} • {certModalMember.region} Region</span>
              </div>

              {certError && (
                <div className="p-3 bg-red-100 border border-red-300 rounded-lg text-xs text-red-800 font-bold">
                  {certError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Certificate Serial Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={certSerialInput}
                  onChange={(e) => setCertSerialInput(e.target.value)}
                  placeholder="e.g. FA-2026-9901"
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-mono font-bold uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Training / Issue Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={certDateInput}
                  onChange={(e) => setCertDateInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900"
                />
                <span className="text-[11px] text-gray-500 mt-0.5 block">
                  Valid for 2 years (730 days) from this issue date.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Certificate Qualification Type
                </label>
                <input
                  type="text"
                  value={certTypeInput}
                  onChange={(e) => setCertTypeInput(e.target.value)}
                  placeholder="e.g. Basic First Aid Practitioner"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Certified Instructor Name
                </label>
                <input
                  type="text"
                  value={instructorNameInput}
                  onChange={(e) => setInstructorNameInput(e.target.value)}
                  placeholder="e.g. Dr. Ernest Boateng"
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                  Training Region
                </label>
                <select
                  value={trainingRegionInput}
                  onChange={(e) => setTrainingRegionInput(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-900"
                >
                  {GHANA_REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r} Region
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setCertModalMember(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={certLoading}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50"
                >
                  {certLoading ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Award className="w-3.5 h-3.5 text-amber-300" />
                  )}
                  <span>Save Certificate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: MEMBER CARD PREVIEW & PRINT */}
      {selectedCardMember && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-red-600 max-w-lg w-full overflow-hidden">
            <div className="bg-red-700 text-white p-4 flex items-center justify-between">
              <h3 className="font-bold font-heading">Member Clearance Card</h3>
              <button
                onClick={() => setSelectedCardMember(null)}
                className="text-white hover:text-red-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-gradient-to-br from-white via-red-50 to-white rounded-xl border-2 border-red-600 p-6 shadow-md mb-6">
                <div className="flex justify-between items-center border-b border-red-200 pb-3 mb-3">
                  <span className="font-extrabold text-xs text-red-700 uppercase font-heading">
                    Ghana Red Cross Society Membership Clearance
                  </span>
                  {selectedCardMember.payment_status === 'verified' ? (
                    <span className="bg-red-600 text-white font-black text-xs px-2.5 py-0.5 rounded-full">
                      🔴 VERIFIED
                    </span>
                  ) : (
                    <span className="bg-gray-200 text-gray-700 font-bold text-xs px-2.5 py-0.5 rounded-full">
                      ⚪ NOT ACTIVE
                    </span>
                  )}
                </div>

                <div className="text-center my-4">
                  <span className="text-2xl font-mono font-black text-red-700 tracking-widest block">
                    {selectedCardMember.member_id}
                  </span>
                  <h4 className="text-lg font-bold text-gray-900 mt-1">
                    {selectedCardMember.full_name}
                  </h4>
                  <p className="text-xs text-gray-600">{selectedCardMember.email}</p>
                  <p className="text-xs font-bold text-red-800 mt-1">
                    {selectedCardMember.region} Region Branch
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setSelectedCardMember(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl text-xs"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-red-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* MODAL: SUB-ADMIN REGISTRATION CODE GENERATOR */}
      {showCodeModal && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-amber-500 max-w-lg w-full overflow-hidden">
            <div className="bg-amber-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold font-heading">
                <Key className="w-5 h-5 text-amber-200" />
                <span>Sub-Admin Authorization Code Manager</span>
              </div>
              <button
                onClick={() => setShowCodeModal(false)}
                className="text-white hover:text-amber-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <p className="text-xs text-gray-600 mb-3">
                  Main Admins generate 6-character unique authorization codes (e.g. <strong>REG-9X2Y</strong>) to authorize Sub-Admin member registration. Each code can be used exactly once.
                </p>

                <button
                  type="button"
                  onClick={handleGenerateCode}
                  disabled={generatingCode}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  {generatingCode ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                  <span>Generate New Sub-Admin Authorization Code</span>
                </button>
              </div>

              {generatedCodeMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold mb-4 flex items-center justify-between">
                  <span>{generatedCodeMsg}</span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                    Active & Unused
                  </span>
                </div>
              )}

              <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-xl divide-y">
                {regCodes.length === 0 ? (
                  <div className="p-4 text-center text-xs text-gray-400">
                    No authorization codes generated yet.
                  </div>
                ) : (
                  regCodes.map((codeItem) => (
                    <div
                      key={codeItem.id}
                      className="p-3 flex items-center justify-between hover:bg-gray-50 text-xs"
                    >
                      <div>
                        <span className="font-mono font-black text-sm text-gray-900 block">
                          {codeItem.auth_code}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          Created: {new Date(codeItem.created_at).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {codeItem.is_used ? (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded font-bold text-[10px]">
                            Used
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                            Active (Unused)
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleCopyCode(codeItem.auth_code)}
                          className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 cursor-pointer"
                          title="Copy Code"
                        >
                          {copiedCodeId === codeItem.auth_code ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-200 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowCodeModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl text-xs cursor-pointer"
                >
                  Close Manager
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
