export type PaymentStatus = 'verified' | 'not active';

export type AdminRole = 'super_admin' | 'main_admin' | 'sub_admin';

export type ProfileType = 'member' | 'non-member';

export type EducationLevel = 'JHS' | 'SHS' | 'Diploma' | 'Degree' | 'Masters' | 'PhD';

export type Gender = 'Male' | 'Female';

export interface Member {
  id: string; // UUID
  member_id: string; // Format: MEM-2026-XXXX or GRCS-2026-XXXX
  full_name: string;
  email: string;
  region: string;
  profile_picture_url?: string | null;
  payment_status: PaymentStatus;
  dues_paid_date?: string | null; // YYYY-MM-DD
  cert_serial_number?: string | null; // First Aid Certificate Serial Number
  cert_issue_date?: string | null; // YYYY-MM-DD
  cert_type?: string | null; // e.g., 'Basic First Aid', 'Advanced CPR', 'Wilderness First Responder'
  instructor_name?: string | null; // Name of the instructor
  training_region?: string | null; // The region where training took place
  education_level?: EducationLevel | string | null;
  gender?: Gender | string | null;
  society_position?: string | null;
  profession?: string | null;
  date_joined?: string | null; // YYYY-MM-DD
  created_by_admin_id?: string | null;
  created_at: string; // Timestamp
}

export interface CertificateRecord {
  cert_serial_number: string; // Primary Key e.g. FA-2025-9901
  full_name: string;
  profile_type: ProfileType; // 'member' or 'non-member'
  associated_member_id?: string | null; // Nullable link to members.id
  profile_picture_url?: string | null;
  cert_type: string;
  cert_issue_date: string; // YYYY-MM-DD
  instructor_name?: string | null;
  training_region?: string | null;
  created_by_admin_id?: string | null;
  created_at?: string;
}

export interface Candidate {
  id: string; // UUID
  full_name: string;
  position_contested: string;
  profile_manifesto: string;
  picture_url?: string | null;
  vote_count: number;
  created_at?: string;
}

export interface VotingBallot {
  id: string;
  member_id: string;
  has_voted: boolean;
  voted_at: string;
}

export interface SystemRegCode {
  id: string;
  auth_code: string;
  is_used: boolean;
  created_at: string;
}

export interface SystemSettings {
  id?: string;
  allow_sub_admin_reg: boolean;
  is_voting_window_open: boolean;
  require_auth_codes: boolean;
}

export type ReportType = 'monthly' | 'quarterly';

export interface SubAdminReport {
  id: string;
  sub_admin_name: string;
  origin_region: string;
  report_type: ReportType;
  report_file_url: string;
  file_name?: string;
  device_info: string;
  uploaded_at: string;
}

export interface ActivityLog {
  id: string;
  actor_name: string;
  action_type: string;
  details: string;
  device_info: string;
  timestamp: string;
}

export type GhanaRegion =
  | 'Greater Accra'
  | 'Ashanti'
  | 'Western'
  | 'Eastern'
  | 'Central'
  | 'Volta'
  | 'Northern'
  | 'Upper East'
  | 'Upper West'
  | 'Bono'
  | 'Bono East'
  | 'Ahafo'
  | 'Savannah'
  | 'North East'
  | 'Oti'
  | 'Western North';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  isConnected: boolean;
  isMockFallback: boolean;
}

export type ActiveTab = 'checker' | 'cert-checker' | 'voting' | 'register' | 'cert-register' | 'admin' | 'sql';

