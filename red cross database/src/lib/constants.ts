import { GhanaRegion, Member, CertificateRecord, Candidate, VotingBallot } from '../types';

export const GHANA_REGIONS: GhanaRegion[] = [
  'Greater Accra',
  'Ashanti',
  'Western',
  'Eastern',
  'Central',
  'Volta',
  'Northern',
  'Upper East',
  'Upper West',
  'Bono',
  'Bono East',
  'Ahafo',
  'Savannah',
  'North East',
  'Oti',
  'Western North',
];

// Placeholder Supabase Credentials
export const DEFAULT_SUPABASE_URL = 'https://YOUR_SUPABASE_PROJECT_ID.supabase.co';
export const DEFAULT_SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';

export const INITIAL_MOCK_MEMBERS: Member[] = [
  {
    id: 'e10293ab-412f-4882-990a-112233445566',
    member_id: 'GRCS-2026-1042',
    full_name: 'Kwame Mensah',
    email: 'kwame.mensah@redcrossghana.org',
    region: 'Greater Accra',
    profile_picture_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    payment_status: 'verified',
    dues_paid_date: '2026-03-15', // Paid within 1 year
    cert_serial_number: 'FA-2025-9901',
    cert_issue_date: '2025-06-15',
    cert_type: 'Basic First Aid',
    instructor_name: 'Dr. Emmanuel Addo',
    training_region: 'Greater Accra',
    education_level: 'Degree',
    gender: 'Male',
    society_position: 'Senior First Aid Officer',
    date_joined: '2019-04-12', // 7 years served
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
  {
    id: 'f20384bc-5230-4993-a01b-223344556677',
    member_id: 'GRCS-2026-8819',
    full_name: 'Abena Osei',
    email: 'abena.osei@redcrossghana.org',
    region: 'Ashanti',
    profile_picture_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    payment_status: 'not active',
    dues_paid_date: '2024-05-10', // Expired dues (> 365 days ago)
    cert_serial_number: 'FA-2023-1102', // Expired cert (> 2 years ago)
    cert_issue_date: '2023-01-10',
    cert_type: 'Advanced CPR',
    instructor_name: 'Nurse Mary Ansah',
    training_region: 'Ashanti',
    education_level: 'Masters',
    gender: 'Female',
    society_position: 'Regional Youth Coordinator',
    date_joined: '2020-08-01', // 6 years served
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  {
    id: 'a30495cd-6341-5a04-b12c-334455667788',
    member_id: 'GRCS-2026-3021',
    full_name: 'Kofi Owusu',
    email: 'kofi.owusu@redcrossghana.org',
    region: 'Western',
    profile_picture_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    payment_status: 'verified',
    dues_paid_date: '2026-01-20',
    cert_serial_number: 'FA-2026-4420',
    cert_issue_date: '2026-02-01',
    cert_type: 'Wilderness First Responder',
    instructor_name: 'Capt. Isaac Quaye',
    training_region: 'Western',
    education_level: 'Diploma',
    gender: 'Male',
    society_position: 'Disaster Relief Volunteer',
    date_joined: '2021-02-14', // 5 years served
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: 'b40506de-7452-6b15-c23d-445566778899',
    member_id: 'GRCS-2026-5590',
    full_name: 'Ama Darko',
    email: 'ama.darko@redcrossghana.org',
    region: 'Eastern',
    profile_picture_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    payment_status: 'not active',
    dues_paid_date: null,
    cert_serial_number: null,
    cert_issue_date: null,
    cert_type: null,
    instructor_name: null,
    training_region: null,
    education_level: 'SHS',
    gender: 'Female',
    society_position: 'Community Volunteer',
    date_joined: '2023-11-10', // 3 years served
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: 'c50617ef-8563-7c26-d34e-556677889900',
    member_id: 'GRCS-2026-9104',
    full_name: 'Yao Boateng',
    email: 'yao.boateng@redcrossghana.org',
    region: 'Volta',
    profile_picture_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    payment_status: 'verified',
    dues_paid_date: '2025-11-20',
    cert_serial_number: 'FA-2025-7733',
    cert_issue_date: '2025-11-20',
    cert_type: 'Basic First Aid',
    instructor_name: 'Grace Kpodo',
    training_region: 'Volta',
    education_level: 'PhD',
    gender: 'Male',
    society_position: 'Sub-Regional Director',
    date_joined: '2015-06-01', // 11 years served
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
];

export const INITIAL_MOCK_CERTIFICATES: CertificateRecord[] = [
  {
    cert_serial_number: 'FA-2025-9901',
    full_name: 'Kwame Mensah',
    profile_type: 'member',
    associated_member_id: 'e10293ab-412f-4882-990a-112233445566',
    profile_picture_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    cert_type: 'Basic First Aid',
    cert_issue_date: '2025-06-15',
    instructor_name: 'Dr. Emmanuel Addo',
    training_region: 'Greater Accra',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
  },
  {
    cert_serial_number: 'FA-2023-1102',
    full_name: 'Abena Osei',
    profile_type: 'member',
    associated_member_id: 'f20384bc-5230-4993-a01b-223344556677',
    profile_picture_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    cert_type: 'Advanced CPR',
    cert_issue_date: '2023-01-10', // Expired (> 2 years)
    instructor_name: 'Nurse Mary Ansah',
    training_region: 'Ashanti',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
  },
  {
    cert_serial_number: 'FA-2026-4420',
    full_name: 'Kofi Owusu',
    profile_type: 'member',
    associated_member_id: 'a30495cd-6341-5a04-b12c-334455667788',
    profile_picture_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    cert_type: 'Wilderness First Responder',
    cert_issue_date: '2026-02-01',
    instructor_name: 'Capt. Isaac Quaye',
    training_region: 'Western',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    cert_serial_number: 'FA-2025-7733',
    full_name: 'Yao Boateng',
    profile_type: 'member',
    associated_member_id: 'c50617ef-8563-7c26-d34e-556677889900',
    profile_picture_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    cert_type: 'Basic First Aid',
    cert_issue_date: '2025-11-20',
    instructor_name: 'Grace Kpodo',
    training_region: 'Volta',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(),
  },
  {
    cert_serial_number: 'FA-2026-8800',
    full_name: 'Elizabeth Appiah',
    profile_type: 'non-member',
    associated_member_id: null,
    profile_picture_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    cert_type: 'Emergency Occupational First Aid',
    cert_issue_date: '2026-04-10',
    instructor_name: 'Dr. Ernest Boateng',
    training_region: 'Greater Accra',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    cert_serial_number: 'FA-2023-3321',
    full_name: 'Samuel Tetteh',
    profile_type: 'non-member',
    associated_member_id: null,
    profile_picture_url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400',
    cert_type: 'Basic First Aid Practitioner',
    cert_issue_date: '2023-03-01', // Expired non-member cert
    instructor_name: 'Dr. Ernest Boateng',
    training_region: 'Central',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
  },
];

export const INITIAL_MOCK_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    full_name: 'Dr. Rebecca Addison',
    position_contested: 'National President',
    profile_manifesto: 'To modernize emergency response infrastructure across all 16 regions with digital tracking and rapid logistics.',
    picture_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    vote_count: 24,
  },
  {
    id: 'cand-2',
    full_name: 'Major (Rtd.) Felix Mensah',
    position_contested: 'National President',
    profile_manifesto: 'Focusing on military-grade tactical first aid training, volunteer welfare, and disaster relief preparedness.',
    picture_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    vote_count: 18,
  },
  {
    id: 'cand-3',
    full_name: 'Nana Akua Owusu',
    position_contested: 'National Youth Coordinator',
    profile_manifesto: 'Expanding youth Red Cross clubs in SHS & Universities while providing accredited CPR certification.',
    picture_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    vote_count: 31,
  },
  {
    id: 'cand-4',
    full_name: 'Bright Ofori-Atta',
    position_contested: 'National Youth Coordinator',
    profile_manifesto: 'Pioneering mobile-app disaster dispatching and establishing regional youth emergency response units.',
    picture_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    vote_count: 15,
  },
  {
    id: 'cand-5',
    full_name: 'Cynthia Amankwah',
    position_contested: 'Treasurer General',
    profile_manifesto: 'Guaranteeing 100% transparent financial reporting, digital dues receipting, and audit accountability.',
    picture_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    vote_count: 38,
  },
];

export const INITIAL_MOCK_BALLOTS: VotingBallot[] = [
  {
    id: 'ballot-1',
    member_id: 'GRCS-2026-1042',
    has_voted: true,
    voted_at: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

export const INITIAL_MOCK_REG_CODES = [
  { id: 'code-1', auth_code: 'REG-9X2Y', is_used: false, created_at: new Date().toISOString() },
  { id: 'code-2', auth_code: 'REG-8402', is_used: false, created_at: new Date().toISOString() },
  { id: 'code-3', auth_code: 'REG-77A1', is_used: true, created_at: new Date(Date.now() - 86400000).toISOString() },
];

export const INITIAL_MOCK_LOGS = [
  {
    id: 'log-1',
    actor_name: 'Main Administrator',
    action_type: 'SYSTEM_BOOT',
    details: 'Initialized Membership Portal, First Aid Cert Audit & Anonymous Voting Module.',
    device_info: typeof navigator !== 'undefined' ? navigator.userAgent : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'log-2',
    actor_name: 'Main Administrator',
    action_type: 'REG_CODE_GENERATE',
    details: 'Generated Sub-Admin authorization code REG-9X2Y.',
    device_info: typeof navigator !== 'undefined' ? navigator.userAgent : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0',
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    id: 'log-3',
    actor_name: 'Sub-Admin Operator',
    action_type: 'MEMBER_REGISTER',
    details: 'Registered new member Yao Boateng (GRCS-2026-9104) with education and position details using code REG-77A1.',
    device_info: typeof navigator !== 'undefined' ? navigator.userAgent : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'log-4',
    actor_name: 'System Voter',
    action_type: 'ANONYMOUS_BALLOT_CAST',
    details: 'Verified member GRCS-2026-1042 successfully cast an anonymous ballot.',
    device_info: typeof navigator !== 'undefined' ? navigator.userAgent : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/122.0.0.0',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
];

export const SUPABASE_SQL_SCHEMA = `-- ==========================================
-- GHANA RED CROSS SOCIETY - SUPABASE SQL SETUP
-- Copy and paste this script directly into your 
-- Supabase SQL Editor (https://supabase.com/dashboard)
-- ==========================================

-- 1. Create the 'members' table with expanded fields
CREATE TABLE IF NOT EXISTS public.members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    region TEXT NOT NULL,
    profile_picture_url TEXT,
    payment_status TEXT NOT NULL DEFAULT 'not active' CHECK (payment_status IN ('verified', 'not active')),
    dues_paid_date DATE,
    cert_serial_number TEXT UNIQUE,
    cert_issue_date DATE,
    cert_type TEXT,
    instructor_name TEXT,
    training_region TEXT,
    education_level TEXT CHECK (education_level IN ('JHS', 'SHS', 'Diploma', 'Degree', 'Masters', 'PhD')),
    gender TEXT CHECK (gender IN ('Male', 'Female')),
    society_position TEXT,
    profession TEXT,
    date_joined DATE,
    created_by_admin_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create the 'certificates' table (Supports Member & Non-Member certificates)
CREATE TABLE IF NOT EXISTS public.certificates (
    cert_serial_number TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    profile_type TEXT NOT NULL CHECK (profile_type IN ('member', 'non-member')),
    associated_member_id UUID REFERENCES public.members(id) ON DELETE SET NULL,
    profile_picture_url TEXT,
    cert_type TEXT NOT NULL,
    cert_issue_date DATE NOT NULL,
    instructor_name TEXT,
    training_region TEXT,
    created_by_admin_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create the 'candidates' table for Anonymous Voting
CREATE TABLE IF NOT EXISTS public.candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    position_contested TEXT NOT NULL,
    profile_manifesto TEXT NOT NULL,
    picture_url TEXT,
    vote_count INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create the 'voting_ballots' table for Tracking Voter Participation (Untraceable to Candidate Choices)
CREATE TABLE IF NOT EXISTS public.voting_ballots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    member_id TEXT UNIQUE NOT NULL,
    has_voted BOOLEAN DEFAULT true NOT NULL,
    voted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create the 'system_reg_codes' table for Sub-Admin Registration Codes
CREATE TABLE IF NOT EXISTS public.system_reg_codes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_code TEXT UNIQUE NOT NULL,
    is_used BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Create the 'system_settings' table for Super-Admin Live Feature Toggles
CREATE TABLE IF NOT EXISTS public.system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    allow_sub_admin_reg BOOLEAN DEFAULT true NOT NULL,
    is_voting_window_open BOOLEAN DEFAULT true NOT NULL,
    require_auth_codes BOOLEAN DEFAULT true NOT NULL
);

-- 7. Create the 'activity_logs' table for System Audit Trail
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_name TEXT NOT NULL,
    action_type TEXT NOT NULL,
    details TEXT NOT NULL,
    device_info TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Create the 'reports' table for Sub-Admin Operational Reporting
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sub_admin_name TEXT NOT NULL,
    origin_region TEXT NOT NULL,
    report_type TEXT CHECK (report_type IN ('monthly', 'quarterly')) NOT NULL,
    report_file_url TEXT NOT NULL,
    file_name TEXT,
    device_info TEXT NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Create Storage Buckets 'avatars' and 'reports-vault'
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true), ('reports-vault', 'reports-vault', true)
ON CONFLICT (id) DO NOTHING;

-- 10. Create indexes for fast queries
CREATE INDEX IF NOT EXISTS idx_members_member_id ON public.members(member_id);
CREATE INDEX IF NOT EXISTS idx_members_cert_serial ON public.members(cert_serial_number);
CREATE INDEX IF NOT EXISTS idx_members_payment_status ON public.members(payment_status);
CREATE INDEX IF NOT EXISTS idx_members_region ON public.members(region);
CREATE INDEX IF NOT EXISTS idx_candidates_position ON public.candidates(position_contested);
CREATE INDEX IF NOT EXISTS idx_voting_ballots_member_id ON public.voting_ballots(member_id);
CREATE INDEX IF NOT EXISTS idx_reg_codes_auth_code ON public.system_reg_codes(auth_code);
CREATE INDEX IF NOT EXISTS idx_activity_logs_timestamp ON public.activity_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_reports_uploaded_at ON public.reports(uploaded_at DESC);

-- 11. Enable Row Level Security (RLS)
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voting_ballots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_reg_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- 12. Create public policies
CREATE POLICY "Allow public read access to members" ON public.members FOR SELECT USING (true);
CREATE POLICY "Allow public insert to members" ON public.members FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to members" ON public.members FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete to members" ON public.members FOR DELETE USING (true);

CREATE POLICY "Allow public read certificates" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Allow public insert certificates" ON public.certificates FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update certificates" ON public.certificates FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete certificates" ON public.certificates FOR DELETE USING (true);

CREATE POLICY "Allow public read candidates" ON public.candidates FOR SELECT USING (true);
CREATE POLICY "Allow public update candidates" ON public.candidates FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read voting_ballots" ON public.voting_ballots FOR SELECT USING (true);
CREATE POLICY "Allow public insert voting_ballots" ON public.voting_ballots FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read system_reg_codes" ON public.system_reg_codes FOR SELECT USING (true);
CREATE POLICY "Allow public insert system_reg_codes" ON public.system_reg_codes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update system_reg_codes" ON public.system_reg_codes FOR UPDATE USING (true) WITH CHECK (true);

CREATE POLICY "Allow public read activity_logs" ON public.activity_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert activity_logs" ON public.activity_logs FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read reports" ON public.reports FOR SELECT USING (true);
CREATE POLICY "Allow public insert reports" ON public.reports FOR INSERT WITH CHECK (true);

-- Storage bucket policies for public access
CREATE POLICY "Public Read Avatars" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "Public Insert Avatars" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars');
CREATE POLICY "Public Read Reports Vault" ON storage.objects FOR SELECT USING (bucket_id = 'reports-vault');
CREATE POLICY "Public Insert Reports Vault" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'reports-vault');

-- 11. Seed initial candidate & member data
INSERT INTO public.candidates (full_name, position_contested, profile_manifesto, picture_url, vote_count)
VALUES 
    ('Dr. Rebecca Addison', 'National President', 'To modernize emergency response infrastructure across all 16 regions with digital tracking.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', 24),
    ('Major (Rtd.) Felix Mensah', 'National President', 'Focusing on military-grade tactical first aid training and volunteer welfare.', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400', 18),
    ('Nana Akua Owusu', 'National Youth Coordinator', 'Expanding youth Red Cross clubs in SHS & Universities with accredited CPR certification.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400', 31),
    ('Bright Ofori-Atta', 'National Youth Coordinator', 'Pioneering mobile-app disaster dispatching and youth emergency units.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400', 15),
    ('Cynthia Amankwah', 'Treasurer General', 'Guaranteeing 100% transparent financial reporting and digital dues receipting.', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400', 38);
`;


