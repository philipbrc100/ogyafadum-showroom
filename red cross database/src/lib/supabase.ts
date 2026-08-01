import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ActivityLog, Member, PaymentStatus, SystemRegCode, CertificateRecord, AdminRole, Candidate, VotingBallot, SystemSettings, SubAdminReport, ReportType } from '../types';
import {
  DEFAULT_SUPABASE_ANON_KEY,
  DEFAULT_SUPABASE_URL,
  INITIAL_MOCK_LOGS,
  INITIAL_MOCK_MEMBERS,
  INITIAL_MOCK_REG_CODES,
  INITIAL_MOCK_CERTIFICATES,
  INITIAL_MOCK_CANDIDATES,
  INITIAL_MOCK_BALLOTS,
} from './constants';

const STORAGE_KEY_URL = 'school_portal_supabase_url';
const STORAGE_KEY_ANON = 'school_portal_supabase_anon_key';
const STORAGE_KEY_MOCK_DATA = 'school_portal_mock_members';
const STORAGE_KEY_REG_CODES = 'school_portal_reg_codes';
const STORAGE_KEY_LOGS = 'school_portal_activity_logs';
const STORAGE_KEY_CERTIFICATES = 'school_portal_certificates';
const STORAGE_KEY_CANDIDATES = 'school_portal_candidates';
const STORAGE_KEY_BALLOTS = 'school_portal_voting_ballots';
const STORAGE_KEY_SETTINGS = 'school_portal_system_settings';
const STORAGE_KEY_REPORTS = 'school_portal_sub_admin_reports';

const INITIAL_MOCK_REPORTS: SubAdminReport[] = [
  {
    id: 'rep-2026-001',
    sub_admin_name: 'David Boateng (Ashanti Sub-Admin)',
    origin_region: 'Ashanti',
    report_type: 'monthly',
    report_file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    file_name: 'Ashanti_First_Aid_Volunteers_July_2026.pdf',
    device_info: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
    uploaded_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: 'rep-2026-002',
    sub_admin_name: 'Grace Mensah (Greater Accra Sub-Admin)',
    origin_region: 'Greater Accra',
    report_type: 'quarterly',
    report_file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    file_name: 'GreaterAccra_Q2_Certification_Log.pdf',
    device_info: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    uploaded_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
];

const DEFAULT_SYSTEM_SETTINGS: SystemSettings = {
  allow_sub_admin_reg: true,
  is_voting_window_open: true,
  require_auth_codes: true,
};

// Get current credentials from LocalStorage, Vite env, or default constants
export function getSavedCredentials(): { url: string; anonKey: string } {
  const metaEnv = (import.meta as any).env || {};
  const urlFromEnv = metaEnv.VITE_SUPABASE_URL || '';
  const keyFromEnv = metaEnv.VITE_SUPABASE_ANON_KEY || '';

  const savedUrl = localStorage.getItem(STORAGE_KEY_URL) || urlFromEnv || DEFAULT_SUPABASE_URL;
  const savedKey = localStorage.getItem(STORAGE_KEY_ANON) || keyFromEnv || DEFAULT_SUPABASE_ANON_KEY;

  return { url: savedUrl, anonKey: savedKey };
}

export function saveCredentials(url: string, anonKey: string): void {
  localStorage.setItem(STORAGE_KEY_URL, url.trim());
  localStorage.setItem(STORAGE_KEY_ANON, anonKey.trim());
}

export function isRealSupabaseConfigured(url: string, key: string): boolean {
  if (!url || !key) return false;
  if (url.includes('YOUR_SUPABASE') || key.includes('YOUR_SUPABASE')) return false;
  if (!url.startsWith('http://') && !url.startsWith('https://')) return false;
  return true;
}

// Singleton Supabase Client creator
let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const { url, anonKey } = getSavedCredentials();

  if (!isRealSupabaseConfigured(url, anonKey)) {
    return null;
  }

  try {
    if (!supabaseInstance) {
      supabaseInstance = createClient(url, anonKey, {
        auth: { persistSession: false },
      });
    }
    return supabaseInstance;
  } catch (err) {
    console.error('Failed to create Supabase client:', err);
    return null;
  }
}

export function resetSupabaseClient(): void {
  supabaseInstance = null;
}

// LocalStorage Fallback database helpers
function getLocalMembers(): Member[] {
  const raw = localStorage.getItem(STORAGE_KEY_MOCK_DATA);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY_MOCK_DATA, JSON.stringify(INITIAL_MOCK_MEMBERS));
    return INITIAL_MOCK_MEMBERS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return INITIAL_MOCK_MEMBERS;
  }
}

function saveLocalMembers(members: Member[]): void {
  localStorage.setItem(STORAGE_KEY_MOCK_DATA, JSON.stringify(members));
}

function getLocalRegCodes(): SystemRegCode[] {
  const raw = localStorage.getItem(STORAGE_KEY_REG_CODES);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY_REG_CODES, JSON.stringify(INITIAL_MOCK_REG_CODES));
    return INITIAL_MOCK_REG_CODES;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return INITIAL_MOCK_REG_CODES;
  }
}

function saveLocalRegCodes(codes: SystemRegCode[]): void {
  localStorage.setItem(STORAGE_KEY_REG_CODES, JSON.stringify(codes));
}

function getLocalCertificates(): CertificateRecord[] {
  const raw = localStorage.getItem(STORAGE_KEY_CERTIFICATES);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY_CERTIFICATES, JSON.stringify(INITIAL_MOCK_CERTIFICATES));
    return INITIAL_MOCK_CERTIFICATES;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return INITIAL_MOCK_CERTIFICATES;
  }
}

function saveLocalCertificates(certs: CertificateRecord[]): void {
  localStorage.setItem(STORAGE_KEY_CERTIFICATES, JSON.stringify(certs));
}

function getLocalCandidates(): Candidate[] {
  const raw = localStorage.getItem(STORAGE_KEY_CANDIDATES);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY_CANDIDATES, JSON.stringify(INITIAL_MOCK_CANDIDATES));
    return INITIAL_MOCK_CANDIDATES;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return INITIAL_MOCK_CANDIDATES;
  }
}

function saveLocalCandidates(cands: Candidate[]): void {
  localStorage.setItem(STORAGE_KEY_CANDIDATES, JSON.stringify(cands));
}

function getLocalBallots(): VotingBallot[] {
  const raw = localStorage.getItem(STORAGE_KEY_BALLOTS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY_BALLOTS, JSON.stringify(INITIAL_MOCK_BALLOTS));
    return INITIAL_MOCK_BALLOTS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return INITIAL_MOCK_BALLOTS;
  }
}

function saveLocalBallots(ballots: VotingBallot[]): void {
  localStorage.setItem(STORAGE_KEY_BALLOTS, JSON.stringify(ballots));
}

export function generateNewCertSerial(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `FA-${year}-${rand}`;
}

// =========================================================================
// UNIFIED DATA SERVICE (SUPABASE PRIMARY WITH INSTANT FALLBACK)
// =========================================================================

export async function fetchMemberByMemberId(memberIdRaw: string): Promise<{
  member: Member | null;
  error: string | null;
  isFromSupabase: boolean;
}> {
  const cleanId = memberIdRaw.trim().toUpperCase();
  const client = getSupabaseClient();

  if (client) {
    try {
      const { data, error } = await client
        .from('members')
        .select('*')
        .ilike('member_id', cleanId)
        .maybeSingle();

      if (error) {
        console.warn('Supabase query error, falling back:', error.message);
      } else if (data) {
        return { member: data as Member, error: null, isFromSupabase: true };
      } else {
        // Not found in Supabase
        return { member: null, error: null, isFromSupabase: true };
      }
    } catch (err: any) {
      console.warn('Supabase exception:', err);
    }
  }

  // Fallback to Local Storage / Mock
  const localMembers = getLocalMembers();
  const found = localMembers.find((m) => m.member_id.toUpperCase() === cleanId);
  return { member: found || null, error: null, isFromSupabase: false };
}

export async function fetchAllMembers(): Promise<{
  members: Member[];
  error: string | null;
  isFromSupabase: boolean;
}> {
  const client = getSupabaseClient();

  if (client) {
    try {
      const { data, error } = await client
        .from('members')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch all error:', error.message);
      } else if (data) {
        return { members: data as Member[], error: null, isFromSupabase: true };
      }
    } catch (err: any) {
      console.warn('Supabase fetch all exception:', err);
    }
  }

  const localMembers = getLocalMembers();
  // Sort descending by created_at
  const sorted = [...localMembers].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return { members: sorted, error: null, isFromSupabase: false };
}

export async function uploadAvatarFile(file: File): Promise<{ url: string | null; error: string | null }> {
  const client = getSupabaseClient();
  const fileExt = file.name.split('.').pop() || 'jpg';
  const fileName = `avatar-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

  if (client) {
    try {
      const { data, error } = await client.storage
        .from('avatars')
        .upload(fileName, file, { cacheControl: '3600', upsert: true });

      if (error) {
        console.warn('Supabase avatar storage upload error, using local fallback:', error.message);
      } else {
        const { data: publicUrlData } = client.storage
          .from('avatars')
          .getPublicUrl(fileName);

        if (publicUrlData && publicUrlData.publicUrl) {
          return { url: publicUrlData.publicUrl, error: null };
        }
      }
    } catch (err: any) {
      console.warn('Supabase storage exception, falling back to data URL:', err);
    }
  }

  // Local Data URL fallback for prototype or when storage bucket is unconfigured
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({ url: reader.result as string, error: null });
    };
    reader.onerror = () => {
      resolve({ url: null, error: 'Failed to process uploaded image file.' });
    };
    reader.readAsDataURL(file);
  });
}

export async function insertNewMember(memberData: {
  full_name: string;
  email: string;
  region: string;
  member_id: string;
  profile_picture_url?: string | null;
  education_level?: string | null;
  gender?: string | null;
  society_position?: string | null;
  profession?: string | null;
  date_joined?: string | null;
  created_by_admin_id?: string | null;
}): Promise<{ member: Member | null; error: string | null; isFromSupabase: boolean }> {
  const client = getSupabaseClient();
  const newMemberObj: Member = {
    id: crypto.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
    member_id: memberData.member_id,
    full_name: memberData.full_name.trim(),
    email: memberData.email.trim().toLowerCase(),
    region: memberData.region,
    profile_picture_url: memberData.profile_picture_url || null,
    payment_status: 'not active',
    dues_paid_date: null,
    education_level: memberData.education_level || 'Degree',
    gender: memberData.gender || 'Male',
    society_position: memberData.society_position || memberData.profession || 'Member',
    profession: memberData.profession || memberData.society_position || 'Volunteer',
    date_joined: memberData.date_joined || new Date().toISOString().slice(0, 10),
    created_by_admin_id: memberData.created_by_admin_id || null,
    created_at: new Date().toISOString(),
  };

  if (client) {
    try {
      const { data, error } = await client
        .from('members')
        .insert([
          {
            member_id: newMemberObj.member_id,
            full_name: newMemberObj.full_name,
            email: newMemberObj.email,
            region: newMemberObj.region,
            profile_picture_url: newMemberObj.profile_picture_url,
            payment_status: 'not active',
            dues_paid_date: null,
            education_level: newMemberObj.education_level,
            gender: newMemberObj.gender,
            society_position: newMemberObj.society_position,
            profession: newMemberObj.profession,
            date_joined: newMemberObj.date_joined,
            created_by_admin_id: memberData.created_by_admin_id || null,
          },
        ])
        .select()
        .single();

      if (error) {
        logActivity(
          memberData.created_by_admin_id === 'main_admin' ? 'Main Administrator' : 'Sub-Admin Operator',
          'MEMBER_REGISTER_ERROR',
          `Failed to register member ${newMemberObj.full_name}: ${error.message}`
        );
        return { member: null, error: error.message, isFromSupabase: true };
      }
      logActivity(
        memberData.created_by_admin_id === 'main_admin' ? 'Main Administrator' : 'Sub-Admin Operator',
        'MEMBER_REGISTER',
        `Registered member ${newMemberObj.full_name} (${newMemberObj.member_id}) in ${newMemberObj.region} Region.`
      );
      return { member: data as Member, error: null, isFromSupabase: true };
    } catch (err: any) {
      logActivity(
        memberData.created_by_admin_id === 'main_admin' ? 'Main Administrator' : 'Sub-Admin Operator',
        'MEMBER_REGISTER_EXCEPTION',
        `Exception registering ${newMemberObj.full_name}: ${err.message}`
      );
      return { member: null, error: err.message || 'Database connection error', isFromSupabase: true };
    }
  }

  // Fallback insertion
  const localMembers = getLocalMembers();
  const duplicateEmail = localMembers.find(
    (m) => m.email.toLowerCase() === newMemberObj.email.toLowerCase()
  );
  if (duplicateEmail) {
    logActivity(
      memberData.created_by_admin_id === 'main_admin' ? 'Main Administrator' : 'Sub-Admin Operator',
      'MEMBER_REGISTER_DUPLICATE',
      `Attempted registration with duplicate email ${newMemberObj.email}.`
    );
    return { member: null, error: 'A member with this email address already exists.', isFromSupabase: false };
  }

  localMembers.unshift(newMemberObj);
  saveLocalMembers(localMembers);
  logActivity(
    memberData.created_by_admin_id === 'main_admin' ? 'Main Administrator' : 'Sub-Admin Operator',
    'MEMBER_REGISTER',
    `Registered member ${newMemberObj.full_name} (${newMemberObj.member_id}) in ${newMemberObj.region} Region [Local Storage].`
  );
  return { member: newMemberObj, error: null, isFromSupabase: false };
}

// =========================================================================
// ANONYMOUS VOTING & ELECTION SERVICE
// =========================================================================

export async function fetchCandidates(): Promise<{ candidates: Candidate[]; isFromSupabase: boolean }> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('candidates')
        .select('*')
        .order('position_contested', { ascending: true })
        .order('vote_count', { ascending: false });

      if (!error && data && data.length > 0) {
        return { candidates: data as Candidate[], isFromSupabase: true };
      }
    } catch (err) {
      console.warn('Supabase candidates fetch error:', err);
    }
  }

  return { candidates: getLocalCandidates(), isFromSupabase: false };
}

export async function checkVoterEligibility(memberIdRaw: string): Promise<{
  eligible: boolean;
  member: Member | null;
  reason?: string;
  isFromSupabase: boolean;
}> {
  const cleanId = memberIdRaw.trim().toUpperCase();
  if (!cleanId) {
    return { eligible: false, member: null, reason: 'Please enter a valid Member ID.', isFromSupabase: false };
  }

  // Fetch member
  const { member, error, isFromSupabase } = await fetchMemberByMemberId(cleanId);
  if (error || !member) {
    return { eligible: false, member: null, reason: 'No registered member found with this ID.', isFromSupabase };
  }

  // Check dues status (verified AND dues paid within 365 days)
  if (member.payment_status !== 'verified' || !member.dues_paid_date) {
    return {
      eligible: false,
      member,
      reason: 'Voting is restricted to active members with verified annual dues clearance.',
      isFromSupabase,
    };
  }

  const duesPaid = new Date(member.dues_paid_date);
  const diffDays = (new Date().getTime() - duesPaid.getTime()) / (1000 * 3600 * 24);
  if (diffDays > 365) {
    return {
      eligible: false,
      member,
      reason: 'Your annual dues clearance has expired (> 365 days). Please renew dues to unlock voting.',
      isFromSupabase,
    };
  }

  // Check if member has already voted in voting_ballots table
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data: ballot } = await client
        .from('voting_ballots')
        .select('*')
        .ilike('member_id', cleanId)
        .maybeSingle();

      if (ballot) {
        return {
          eligible: false,
          member,
          reason: `Member ${cleanId} has already cast a ballot on ${new Date(ballot.voted_at).toLocaleDateString()}. Voting is single-entry only.`,
          isFromSupabase: true,
        };
      }
    } catch (err) {
      console.warn('Voting ballot lookup exception:', err);
    }
  }

  // Local storage ballot check
  const localBallots = getLocalBallots();
  const existingBallot = localBallots.find((b) => b.member_id.toUpperCase() === cleanId);
  if (existingBallot) {
    return {
      eligible: false,
      member,
      reason: `Member ${cleanId} has already cast a ballot. Voting is strictly limited to one submission per member.`,
      isFromSupabase: false,
    };
  }

  return { eligible: true, member, isFromSupabase };
}

export async function castAnonymousVote(
  memberIdRaw: string,
  selectedCandidateIds: string[]
): Promise<{ success: boolean; error: string | null; isFromSupabase: boolean }> {
  const cleanId = memberIdRaw.trim().toUpperCase();
  const client = getSupabaseClient();

  if (client) {
    try {
      // 1. Step A: Increment vote count for each selected candidate independently
      for (const candidateId of selectedCandidateIds) {
        // Fetch current vote count to increment
        const { data: cand } = await client
          .from('candidates')
          .select('vote_count')
          .eq('id', candidateId)
          .single();

        const currentCount = cand ? cand.vote_count || 0 : 0;
        await client
          .from('candidates')
          .update({ vote_count: currentCount + 1 })
          .eq('id', candidateId);
      }

      // 2. Step B: Log voter in voting_ballots to block future double-voting (separate untraceable process)
      await client.from('voting_ballots').insert([
        {
          member_id: cleanId,
          has_voted: true,
          voted_at: new Date().toISOString(),
        },
      ]);

      logActivity(
        'Anonymous Voter',
        'ANONYMOUS_BALLOT_CAST',
        `Member ${cleanId} successfully executed anonymized electronic ballot submission.`
      );

      return { success: true, error: null, isFromSupabase: true };
    } catch (err: any) {
      console.warn('Supabase voting transaction error, falling back to local storage:', err);
    }
  }

  // Local storage fallback
  const localCandidates = getLocalCandidates();
  for (const candId of selectedCandidateIds) {
    const idx = localCandidates.findIndex((c) => c.id === candId);
    if (idx !== -1) {
      localCandidates[idx].vote_count = (localCandidates[idx].vote_count || 0) + 1;
    }
  }
  saveLocalCandidates(localCandidates);

  const localBallots = getLocalBallots();
  localBallots.push({
    id: `ballot-${Date.now()}`,
    member_id: cleanId,
    has_voted: true,
    voted_at: new Date().toISOString(),
  });
  saveLocalBallots(localBallots);

  logActivity(
    'Anonymous Voter',
    'ANONYMOUS_BALLOT_CAST',
    `Member ${cleanId} successfully submitted an anonymous ballot [Local Storage].`
  );

  return { success: true, error: null, isFromSupabase: false };
}

export async function updateMemberPaymentStatus(
  memberId: string, // UUID or internal id
  newStatus: PaymentStatus,
  customDuesPaidDate?: string | null
): Promise<{ success: boolean; error: string | null; isFromSupabase: boolean }> {
  const client = getSupabaseClient();
  const todayStr = new Date().toISOString().slice(0, 10);
  const duesPaidDate = newStatus === 'verified' ? (customDuesPaidDate || todayStr) : null;

  if (client) {
    try {
      const { error } = await client
        .from('members')
        .update({
          payment_status: newStatus,
          dues_paid_date: duesPaidDate,
        })
        .eq('id', memberId);

      if (error) {
        logActivity('Admin Portal', 'DUES_UPDATE_ERROR', `Failed to update dues for member ID ${memberId}: ${error.message}`);
        return { success: false, error: error.message, isFromSupabase: true };
      }
      logActivity('Admin Portal', 'DUES_CLEARANCE_UPDATE', `Updated dues status to "${newStatus}" (Paid Date: ${duesPaidDate || 'N/A'}) for member ID ${memberId}.`);
      return { success: true, error: null, isFromSupabase: true };
    } catch (err: any) {
      logActivity('Admin Portal', 'DUES_UPDATE_EXCEPTION', `Exception updating dues for ${memberId}: ${err.message}`);
      return { success: false, error: err.message, isFromSupabase: true };
    }
  }

  // Fallback
  const localMembers = getLocalMembers();
  const index = localMembers.findIndex((m) => m.id === memberId || m.member_id === memberId);
  if (index !== -1) {
    localMembers[index].payment_status = newStatus;
    localMembers[index].dues_paid_date = duesPaidDate;
    saveLocalMembers(localMembers);
    logActivity('Admin Portal', 'DUES_CLEARANCE_UPDATE', `Updated dues status to "${newStatus}" for ${localMembers[index].full_name} (${localMembers[index].member_id}).`);
    return { success: true, error: null, isFromSupabase: false };
  }
  return { success: false, error: 'Member not found', isFromSupabase: false };
}

export async function deleteMemberRecord(
  memberId: string
): Promise<{ success: boolean; error: string | null; isFromSupabase: boolean }> {
  const client = getSupabaseClient();

  if (client) {
    try {
      const { error } = await client.from('members').delete().eq('id', memberId);
      if (error) {
        return { success: false, error: error.message, isFromSupabase: true };
      }
      return { success: true, error: null, isFromSupabase: true };
    } catch (err: any) {
      return { success: false, error: err.message, isFromSupabase: true };
    }
  }

  const localMembers = getLocalMembers();
  const filtered = localMembers.filter((m) => m.id !== memberId && m.member_id !== memberId);
  saveLocalMembers(filtered);
  return { success: true, error: null, isFromSupabase: false };
}

export async function fetchCertificateBySerial(
  serialNumber: string
): Promise<{ certificate: CertificateRecord | null; error: string | null; isFromSupabase: boolean }> {
  const client = getSupabaseClient();
  const cleanSerial = serialNumber.trim();

  if (!cleanSerial) {
    return { certificate: null, error: 'Please enter a valid certificate serial number.', isFromSupabase: false };
  }

  if (client) {
    try {
      const { data, error } = await client
        .from('certificates')
        .select('*')
        .ilike('cert_serial_number', cleanSerial)
        .maybeSingle();

      if (!error && data) {
        return { certificate: data as CertificateRecord, error: null, isFromSupabase: true };
      }
    } catch (err: any) {
      console.warn('Supabase cert fetch exception:', err);
    }
  }

  // Fallback check from getLocalCertificates()
  const localCerts = getLocalCertificates();
  const foundCert = localCerts.find(
    (c) => c.cert_serial_number && c.cert_serial_number.trim().toLowerCase() === cleanSerial.toLowerCase()
  );

  if (foundCert) {
    return { certificate: foundCert, error: null, isFromSupabase: false };
  }

  // Secondary check in local members table
  const localMembers = getLocalMembers();
  const foundMember = localMembers.find(
    (m) => m.cert_serial_number && m.cert_serial_number.trim().toLowerCase() === cleanSerial.toLowerCase()
  );

  if (foundMember) {
    const certFromMember: CertificateRecord = {
      cert_serial_number: foundMember.cert_serial_number!,
      full_name: foundMember.full_name,
      profile_type: 'member',
      associated_member_id: foundMember.id,
      profile_picture_url: foundMember.profile_picture_url,
      cert_type: foundMember.cert_type || 'Basic First Aid',
      cert_issue_date: foundMember.cert_issue_date || new Date().toISOString().slice(0, 10),
      instructor_name: foundMember.instructor_name || 'Red Cross Master Instructor',
      training_region: foundMember.training_region || foundMember.region,
    };
    return { certificate: certFromMember, error: null, isFromSupabase: false };
  }

  return { certificate: null, error: 'No certificate record found with this serial number.', isFromSupabase: false };
}

export async function fetchMemberByCertSerial(
  serialNumber: string
): Promise<{ member: Member | null; error: string | null; isFromSupabase: boolean }> {
  const result = await fetchCertificateBySerial(serialNumber);
  if (result.certificate) {
    const memberObj: Member = {
      id: result.certificate.associated_member_id || result.certificate.cert_serial_number,
      member_id: result.certificate.associated_member_id || result.certificate.cert_serial_number,
      full_name: result.certificate.full_name,
      email: `${result.certificate.full_name.toLowerCase().replace(/\s+/g, '.')}@redcrossghana.org`,
      region: result.certificate.training_region || 'Greater Accra',
      profile_picture_url: result.certificate.profile_picture_url,
      payment_status: 'verified',
      cert_serial_number: result.certificate.cert_serial_number,
      cert_issue_date: result.certificate.cert_issue_date,
      cert_type: result.certificate.cert_type,
      instructor_name: result.certificate.instructor_name,
      training_region: result.certificate.training_region,
      created_at: result.certificate.created_at || new Date().toISOString(),
    };
    return { member: memberObj, error: null, isFromSupabase: result.isFromSupabase };
  }
  return { member: null, error: result.error, isFromSupabase: result.isFromSupabase };
}

export async function fetchAllCertificates(): Promise<CertificateRecord[]> {
  const client = getSupabaseClient();

  if (client) {
    try {
      const { data, error } = await client
        .from('certificates')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data as CertificateRecord[];
      }
    } catch (err) {
      console.warn('Failed to fetch certificates from Supabase:', err);
    }
  }

  return getLocalCertificates();
}

export async function insertNewCertificate(
  certData: Partial<CertificateRecord>,
  regCodeInput?: string,
  role: AdminRole = 'main_admin'
): Promise<{ certificate: CertificateRecord | null; error: string | null; isFromSupabase: boolean }> {
  if (role === 'sub_admin') {
    if (!regCodeInput) {
      return { certificate: null, error: 'Sub-Admins strictly require a Registration Authorization Code.', isFromSupabase: false };
    }
    const verifyRes = await verifyAndUseRegCode(regCodeInput);
    if (!verifyRes.valid) {
      return { certificate: null, error: verifyRes.error || 'Invalid or already used registration code.', isFromSupabase: false };
    }
  }

  const newCert: CertificateRecord = {
    cert_serial_number: certData.cert_serial_number || generateNewCertSerial(),
    full_name: certData.full_name || 'Anonymous Practitioner',
    profile_type: certData.profile_type || 'member',
    associated_member_id: certData.associated_member_id || null,
    profile_picture_url: certData.profile_picture_url || null,
    cert_type: certData.cert_type || 'Basic First Aid',
    cert_issue_date: certData.cert_issue_date || new Date().toISOString().slice(0, 10),
    instructor_name: certData.instructor_name || 'Dr. Ernest Boateng',
    training_region: certData.training_region || 'Greater Accra',
    created_by_admin_id: role,
    created_at: new Date().toISOString(),
  };

  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('certificates')
        .insert([newCert])
        .select()
        .single();

      if (error) {
        logActivity(
          role === 'main_admin' ? 'Main Administrator' : 'Sub-Admin Operator',
          'CERT_REGISTER_ERROR',
          `Failed to register certificate ${newCert.cert_serial_number}: ${error.message}`
        );
        return { certificate: null, error: error.message, isFromSupabase: true };
      }

      if (newCert.associated_member_id) {
        await client.from('members').update({
          cert_serial_number: newCert.cert_serial_number,
          cert_issue_date: newCert.cert_issue_date,
          cert_type: newCert.cert_type,
          instructor_name: newCert.instructor_name,
          training_region: newCert.training_region,
        }).eq('id', newCert.associated_member_id);
      }

      logActivity(
        role === 'main_admin' ? 'Main Administrator' : 'Sub-Admin Operator',
        'CERT_REGISTER',
        `Registered First Aid Certificate ${newCert.cert_serial_number} for ${newCert.full_name} (${newCert.profile_type.toUpperCase()}).`
      );

      return { certificate: data as CertificateRecord, error: null, isFromSupabase: true };
    } catch (err: any) {
      console.warn('Exception inserting certificate into Supabase:', err);
    }
  }

  const localCerts = getLocalCertificates();
  localCerts.unshift(newCert);
  saveLocalCertificates(localCerts);

  if (newCert.associated_member_id) {
    const localMembers = getLocalMembers();
    const idx = localMembers.findIndex(m => m.id === newCert.associated_member_id || m.member_id === newCert.associated_member_id);
    if (idx !== -1) {
      localMembers[idx].cert_serial_number = newCert.cert_serial_number;
      localMembers[idx].cert_issue_date = newCert.cert_issue_date;
      localMembers[idx].cert_type = newCert.cert_type;
      localMembers[idx].instructor_name = newCert.instructor_name;
      localMembers[idx].training_region = newCert.training_region;
      saveLocalMembers(localMembers);
    }
  }

  logActivity(
    role === 'main_admin' ? 'Main Administrator' : 'Sub-Admin Operator',
    'CERT_REGISTER',
    `Registered First Aid Certificate ${newCert.cert_serial_number} for ${newCert.full_name} (${newCert.profile_type.toUpperCase()}) [Local Storage].`
  );

  return { certificate: newCert, error: null, isFromSupabase: false };
}

export async function updateMemberCertificate(
  memberId: string,
  certSerial: string,
  certIssueDate: string,
  certType?: string | null,
  instructorName?: string | null,
  trainingRegion?: string | null
): Promise<{ success: boolean; error: string | null; isFromSupabase: boolean }> {
  const client = getSupabaseClient();
  const cleanSerial = certSerial.trim();
  const cleanDate = certIssueDate.trim();

  if (client) {
    try {
      const { error } = await client
        .from('members')
        .update({
          cert_serial_number: cleanSerial || null,
          cert_issue_date: cleanDate || null,
          cert_type: certType || null,
          instructor_name: instructorName || null,
          training_region: trainingRegion || null,
        })
        .eq('id', memberId);

      if (error) {
        logActivity('Admin Portal', 'CERT_UPDATE_ERROR', `Failed to update certificate for member ${memberId}: ${error.message}`);
        return { success: false, error: error.message, isFromSupabase: true };
      }
      logActivity('Admin Portal', 'CERT_ISSUED_UPDATED', `Issued/updated certificate serial ${cleanSerial} (${certType || 'Basic First Aid'}) for member ID ${memberId}.`);
      return { success: true, error: null, isFromSupabase: true };
    } catch (err: any) {
      logActivity('Admin Portal', 'CERT_UPDATE_EXCEPTION', `Exception updating certificate for member ${memberId}: ${err.message}`);
      return { success: false, error: err.message, isFromSupabase: true };
    }
  }

  const localMembers = getLocalMembers();
  const index = localMembers.findIndex((m) => m.id === memberId || m.member_id === memberId);
  if (index !== -1) {
    localMembers[index].cert_serial_number = cleanSerial || null;
    localMembers[index].cert_issue_date = cleanDate || null;
    localMembers[index].cert_type = certType || null;
    localMembers[index].instructor_name = instructorName || null;
    localMembers[index].training_region = trainingRegion || null;
    saveLocalMembers(localMembers);
    logActivity('Admin Portal', 'CERT_ISSUED_UPDATED', `Issued/updated certificate serial ${cleanSerial} for ${localMembers[index].full_name}.`);
    return { success: true, error: null, isFromSupabase: false };
  }
  return { success: false, error: 'Member record not found', isFromSupabase: false };
}

export function generateUniqueMemberId(): string {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `GRCS-${year}-${randomNum}`;
}

export async function fetchAllRegCodes(): Promise<SystemRegCode[]> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('system_reg_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        return data as SystemRegCode[];
      }
    } catch (err) {
      console.warn('Fetch reg codes error:', err);
    }
  }
  return getLocalRegCodes();
}

export async function generateNewRegCode(): Promise<{ code: SystemRegCode | null; error: string | null }> {
  const client = getSupabaseClient();
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  const newCodeStr = `REG-${randomSuffix}`;

  const newCodeObj: SystemRegCode = {
    id: crypto.randomUUID ? crypto.randomUUID() : `code-${Date.now()}`,
    auth_code: newCodeStr,
    is_used: false,
    created_at: new Date().toISOString(),
  };

  if (client) {
    try {
      const { data, error } = await client
        .from('system_reg_codes')
        .insert([{ auth_code: newCodeStr, is_used: false }])
        .select()
        .single();

      if (error) {
        logActivity('Main Administrator', 'REG_CODE_GEN_ERROR', `Failed to generate reg code: ${error.message}`);
        return { code: null, error: error.message };
      }
      logActivity('Main Administrator', 'REG_CODE_GENERATE', `Generated new authorization code: ${newCodeStr}`);
      return { code: data as SystemRegCode, error: null };
    } catch (err: any) {
      logActivity('Main Administrator', 'REG_CODE_GEN_EXCEPTION', `Exception generating code: ${err.message}`);
      return { code: null, error: err.message || 'Database error' };
    }
  }

  const localCodes = getLocalRegCodes();
  localCodes.unshift(newCodeObj);
  saveLocalRegCodes(localCodes);
  logActivity('Main Administrator', 'REG_CODE_GENERATE', `Generated new authorization code: ${newCodeStr} [Local Storage]`);
  return { code: newCodeObj, error: null };
}

export async function verifyAndUseRegCode(authCodeRaw: string): Promise<{
  valid: boolean;
  error: string | null;
}> {
  const cleanCode = authCodeRaw.trim().toUpperCase();
  if (!cleanCode) {
    return { valid: false, error: 'Registration Authorization Code is required.' };
  }

  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('system_reg_codes')
        .select('*')
        .ilike('auth_code', cleanCode)
        .maybeSingle();

      if (error) {
        return { valid: false, error: `Code check failed: ${error.message}` };
      }
      if (!data) {
        return { valid: false, error: 'Invalid Authorization Code. Please request a valid code from the Main Administrator.' };
      }
      if (data.is_used) {
        return { valid: false, error: 'This Authorization Code has already been used and cannot be recycled.' };
      }

      const { error: updateErr } = await client
        .from('system_reg_codes')
        .update({ is_used: true })
        .eq('id', data.id);

      if (updateErr) {
        logActivity('Sub-Admin Operator', 'REG_CODE_USE_ERROR', `Failed to mark authorization code ${cleanCode} as used: ${updateErr.message}`);
        return { valid: false, error: `Failed to consume code: ${updateErr.message}` };
      }

      logActivity('Sub-Admin Operator', 'REG_CODE_USED', `Validated and consumed authorization code: ${cleanCode}`);
      return { valid: true, error: null };
    } catch (err: any) {
      logActivity('Sub-Admin Operator', 'REG_CODE_USE_EXCEPTION', `Error verifying authorization code ${cleanCode}: ${err.message}`);
      return { valid: false, error: err.message || 'Error verifying code' };
    }
  }

  const localCodes = getLocalRegCodes();
  const matchIndex = localCodes.findIndex((c) => c.auth_code.toUpperCase() === cleanCode);

  if (matchIndex === -1) {
    logActivity('Sub-Admin Operator', 'REG_CODE_INVALID', `Attempted registration with non-existent authorization code ${cleanCode}`);
    return { valid: false, error: 'Invalid Authorization Code. Please request a valid code from the Main Administrator.' };
  }

  if (localCodes[matchIndex].is_used) {
    logActivity('Sub-Admin Operator', 'REG_CODE_RECYCLED', `Attempted to re-use consumed code ${cleanCode}`);
    return { valid: false, error: 'This Authorization Code has already been used and cannot be recycled.' };
  }

  localCodes[matchIndex].is_used = true;
  saveLocalRegCodes(localCodes);
  logActivity('Sub-Admin Operator', 'REG_CODE_USED', `Validated and consumed authorization code: ${cleanCode} [Local Storage]`);
  return { valid: true, error: null };
}

function getLocalLogs(): ActivityLog[] {
  const raw = localStorage.getItem(STORAGE_KEY_LOGS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(INITIAL_MOCK_LOGS));
    return INITIAL_MOCK_LOGS as ActivityLog[];
  }
  try {
    return JSON.parse(raw);
  } catch {
    return INITIAL_MOCK_LOGS as ActivityLog[];
  }
}

function saveLocalLogs(logs: ActivityLog[]): void {
  localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(logs));
}

export async function logActivity(
  actorName: string,
  actionType: string,
  details: string
): Promise<void> {
  const deviceInfo = typeof navigator !== 'undefined' ? (navigator.userAgent || 'Unknown Device') : 'Server/Unknown';
  const timestamp = new Date().toISOString();
  const logId = crypto.randomUUID ? crypto.randomUUID() : `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

  const logObj: ActivityLog = {
    id: logId,
    actor_name: actorName,
    action_type: actionType,
    details,
    device_info: deviceInfo,
    timestamp,
  };

  const client = getSupabaseClient();
  if (client) {
    try {
      await client.from('activity_logs').insert([
        {
          actor_name: actorName,
          action_type: actionType,
          details,
          device_info: deviceInfo,
          timestamp,
        },
      ]);
    } catch (err) {
      console.warn('Failed to insert activity log to Supabase, logging locally:', err);
    }
  }

  const localLogs = getLocalLogs();
  localLogs.unshift(logObj);
  saveLocalLogs(localLogs);
}

export async function fetchActivityLogs(): Promise<ActivityLog[]> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('activity_logs')
        .select('*')
        .order('timestamp', { ascending: false });

      if (!error && data) {
        return data as ActivityLog[];
      }
    } catch (err) {
      console.warn('Failed to fetch activity logs from Supabase, falling back:', err);
    }
  }

  return getLocalLogs();
}

export async function fetchSystemSettings(): Promise<SystemSettings> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('system_settings')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (!error && data) {
        return data as SystemSettings;
      }
    } catch (err) {
      console.warn('Supabase system_settings query error:', err);
    }
  }

  const raw = localStorage.getItem(STORAGE_KEY_SETTINGS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(DEFAULT_SYSTEM_SETTINGS));
    return DEFAULT_SYSTEM_SETTINGS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return DEFAULT_SYSTEM_SETTINGS;
  }
}

export async function updateSystemSettings(settings: Partial<SystemSettings>): Promise<SystemSettings> {
  const current = await fetchSystemSettings();
  const updated: SystemSettings = { ...current, ...settings };

  const client = getSupabaseClient();
  if (client) {
    try {
      if (current.id) {
        await client.from('system_settings').update(updated).eq('id', current.id);
      } else {
        const { data } = await client.from('system_settings').insert([updated]).select().single();
        if (data && data.id) updated.id = data.id;
      }
    } catch (err) {
      console.warn('Supabase system_settings update error:', err);
    }
  }

  localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(updated));
  logActivity('Super-Admin Overlord', 'SYSTEM_SETTINGS_UPDATE', `Updated settings: allow_sub_admin_reg=${updated.allow_sub_admin_reg}, is_voting_window_open=${updated.is_voting_window_open}, require_auth_codes=${updated.require_auth_codes}`);
  return updated;
}

// =========================================================================
// SUB-ADMIN OPERATIONAL REPORTING SERVICE & VAULT
// =========================================================================

function getLocalReports(): SubAdminReport[] {
  const raw = localStorage.getItem(STORAGE_KEY_REPORTS);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(INITIAL_MOCK_REPORTS));
    return INITIAL_MOCK_REPORTS;
  }
  try {
    return JSON.parse(raw);
  } catch {
    return INITIAL_MOCK_REPORTS;
  }
}

function saveLocalReports(reports: SubAdminReport[]): void {
  localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(reports));
}

export async function uploadReportFile(file: File): Promise<{ url: string | null; fileName: string; error: string | null }> {
  const client = getSupabaseClient();
  const cleanOriginalName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const pathName = `report-${Date.now()}-${cleanOriginalName}`;

  if (client) {
    try {
      const { data, error } = await client.storage
        .from('reports-vault')
        .upload(pathName, file, { cacheControl: '3600', upsert: true });

      if (error) {
        console.warn('Supabase reports-vault upload error, falling back to data URL:', error.message);
      } else {
        const { data: publicUrlData } = client.storage
          .from('reports-vault')
          .getPublicUrl(pathName);

        if (publicUrlData && publicUrlData.publicUrl) {
          return { url: publicUrlData.publicUrl, fileName: file.name, error: null };
        }
      }
    } catch (err: any) {
      console.warn('Supabase reports-vault storage exception, using fallback:', err);
    }
  }

  // Local Data URL fallback for prototype/offline
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({ url: reader.result as string, fileName: file.name, error: null });
    };
    reader.onerror = () => {
      resolve({ url: null, fileName: file.name, error: 'Failed to process document file.' });
    };
    reader.readAsDataURL(file);
  });
}

export async function fetchAllReports(): Promise<SubAdminReport[]> {
  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('reports')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (!error && data) {
        return data as SubAdminReport[];
      }
    } catch (err) {
      console.warn('Supabase fetch reports error:', err);
    }
  }
  return getLocalReports();
}

export async function insertSubAdminReport(reportData: {
  sub_admin_name: string;
  origin_region: string;
  report_type: ReportType;
  report_file_url: string;
  file_name?: string;
  device_info?: string;
}): Promise<{ report: SubAdminReport | null; error: string | null; isFromSupabase: boolean }> {
  const deviceInfo = reportData.device_info || (typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown Device');
  const newReportObj: SubAdminReport = {
    id: crypto.randomUUID ? crypto.randomUUID() : `rep-${Date.now()}`,
    sub_admin_name: reportData.sub_admin_name,
    origin_region: reportData.origin_region,
    report_type: reportData.report_type,
    report_file_url: reportData.report_file_url,
    file_name: reportData.file_name || `${reportData.origin_region}_${reportData.report_type}_Report.pdf`,
    device_info: deviceInfo,
    uploaded_at: new Date().toISOString(),
  };

  const client = getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('reports')
        .insert([
          {
            sub_admin_name: newReportObj.sub_admin_name,
            origin_region: newReportObj.origin_region,
            report_type: newReportObj.report_type,
            report_file_url: newReportObj.report_file_url,
            file_name: newReportObj.file_name,
            device_info: newReportObj.device_info,
            uploaded_at: newReportObj.uploaded_at,
          },
        ])
        .select()
        .single();

      if (error) {
        console.warn('Supabase insert report error, saving locally:', error.message);
      } else if (data) {
        logActivity(
          reportData.sub_admin_name,
          'SUB_ADMIN_REPORT_SUBMITTED',
          `Submitted ${reportData.report_type.toUpperCase()} operational report for ${reportData.origin_region} region.`
        );
        return { report: data as SubAdminReport, error: null, isFromSupabase: true };
      }
    } catch (err: any) {
      console.warn('Supabase report insert exception:', err);
    }
  }

  const localReports = getLocalReports();
  localReports.unshift(newReportObj);
  saveLocalReports(localReports);

  logActivity(
    reportData.sub_admin_name,
    'SUB_ADMIN_REPORT_SUBMITTED',
    `Submitted ${reportData.report_type.toUpperCase()} operational report for ${reportData.origin_region} region [Local Storage].`
  );

  return { report: newReportObj, error: null, isFromSupabase: false };
}



