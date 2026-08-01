import React, { useState, useEffect } from 'react';
import { AdminRole, CertificateRecord, Member, ProfileType } from '../types';
import { GHANA_REGIONS } from '../lib/constants';
import {
  fetchAllMembers,
  generateNewCertSerial,
  insertNewCertificate,
  uploadAvatarFile,
} from '../lib/supabase';
import {
  Award,
  CheckCircle2,
  AlertTriangle,
  Upload,
  User,
  ShieldCheck,
  Key,
  RefreshCw,
  UserCheck,
  Briefcase,
  FileCheck,
  Check,
} from 'lucide-react';

interface CertificateRegistrationProps {
  currentRole: AdminRole;
  onSuccess?: () => void;
}

export const CertificateRegistration: React.FC<CertificateRegistrationProps> = ({
  currentRole,
  onSuccess,
}) => {
  const [profileType, setProfileType] = useState<ProfileType>('member');
  
  // Members list for dropdown
  const [members, setMembers] = useState<Member[]>([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState('');

  // Form fields
  const [fullName, setFullName] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const [certSerialNumber, setCertSerialNumber] = useState('');
  const [certType, setCertType] = useState('Basic First Aid');
  const [certIssueDate, setCertIssueDate] = useState(new Date().toISOString().slice(0, 10));
  const [instructorName, setInstructorName] = useState('Dr. Ernest Boateng');
  const [trainingRegion, setTrainingRegion] = useState('Greater Accra');
  const [authCode, setAuthCode] = useState('');

  // File upload state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Form submitting state
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successCert, setSuccessCert] = useState<CertificateRecord | null>(null);

  // Generate initial serial number
  useEffect(() => {
    setCertSerialNumber(generateNewCertSerial());
  }, []);

  // Fetch registered members when component mounts
  useEffect(() => {
    loadMembersList();
  }, []);

  const loadMembersList = async () => {
    setLoadingMembers(true);
    const { members: memberList } = await fetchAllMembers();
    setMembers(memberList);
    setLoadingMembers(false);

    if (memberList && memberList.length > 0 && !selectedMemberId) {
      setSelectedMemberId(memberList[0].id);
      setFullName(memberList[0].full_name);
      setProfilePictureUrl(memberList[0].profile_picture_url || '');
      setTrainingRegion(memberList[0].region || 'Greater Accra');
    }
  };

  // When selected member changes in dropdown
  const handleMemberChange = (memberId: string) => {
    setSelectedMemberId(memberId);
    const found = members.find((m) => m.id === memberId || m.member_id === memberId);
    if (found) {
      setFullName(found.full_name);
      setProfilePictureUrl(found.profile_picture_url || '');
      setTrainingRegion(found.region || 'Greater Accra');
    }
  };

  // Image Upload Handler for Non-Member Profile Picture
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size exceeds 5MB limit.');
      return;
    }

    setUploadingImage(true);
    setUploadError(null);

    const { url, error } = await uploadAvatarFile(file);
    setUploadingImage(false);

    if (error || !url) {
      setUploadError(error || 'Failed to upload photo to avatars storage bucket.');
    } else {
      setProfilePictureUrl(url);
    }
  };

  const handleRegenerateSerial = () => {
    setCertSerialNumber(generateNewCertSerial());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessCert(null);

    // Validation
    if (!fullName.trim()) {
      setErrorMsg('Full Name is required for certificate issuance.');
      return;
    }

    if (!certSerialNumber.trim()) {
      setErrorMsg('Certificate Serial Number is required.');
      return;
    }

    if (currentRole === 'sub_admin' && !authCode.trim()) {
      setErrorMsg('Sub-Admins must provide a valid Authorization Code from system_reg_codes.');
      return;
    }

    setSubmitting(true);

    const selectedMember = profileType === 'member' 
      ? members.find(m => m.id === selectedMemberId || m.member_id === selectedMemberId) 
      : null;

    const certData: Partial<CertificateRecord> = {
      cert_serial_number: certSerialNumber.trim().toUpperCase(),
      full_name: fullName.trim(),
      profile_type: profileType,
      associated_member_id: selectedMember ? selectedMember.id : null,
      profile_picture_url: profilePictureUrl.trim() || null,
      cert_type: certType.trim(),
      cert_issue_date: certIssueDate,
      instructor_name: instructorName.trim(),
      training_region: trainingRegion,
    };

    const res = await insertNewCertificate(certData, authCode.trim(), currentRole);
    setSubmitting(false);

    if (res.error || !res.certificate) {
      setErrorMsg(res.error || 'Failed to register First Aid Certificate.');
    } else {
      setSuccessCert(res.certificate);
      if (onSuccess) onSuccess();
    }
  };

  const handleResetForm = () => {
    setSuccessCert(null);
    setErrorMsg(null);
    setAuthCode('');
    setCertSerialNumber(generateNewCertSerial());
    if (profileType === 'non-member') {
      setFullName('');
      setProfilePictureUrl('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Title Header */}
      <div className="bg-white rounded-2xl border-2 border-red-200 shadow-xl overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 sm:p-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-red-100">
              Official Certification Register
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-heading">
            Issue First Aid Qualification Certificate
          </h1>
          <p className="text-sm text-red-100 mt-1">
            Register new First Aid Practitioners (GRCS Members & Independent Trainees) into the official verification database.
          </p>
        </div>

        {/* Toggle Switch: Is Member vs Is Non-Member */}
        <div className="bg-red-50/70 p-4 border-b border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase text-gray-700 tracking-wider">
            Target Practitioner Profile Type:
          </span>
          <div className="inline-flex p-1 bg-gray-200 rounded-xl border border-gray-300">
            <button
              type="button"
              onClick={() => {
                setProfileType('member');
                if (members.length > 0) {
                  setSelectedMemberId(members[0].id);
                  setFullName(members[0].full_name);
                  setProfilePictureUrl(members[0].profile_picture_url || '');
                }
              }}
              className={`px-5 py-2 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                profileType === 'member'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>👥 GRCS Member</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setProfileType('non-member');
                setFullName('');
                setProfilePictureUrl('');
                setSelectedMemberId('');
              }}
              className={`px-5 py-2 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                profileType === 'non-member'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>💼 Non-Member Trainee</span>
            </button>
          </div>
        </div>

        {/* Form or Success State */}
        {successCert ? (
          <div className="p-8 text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-full uppercase tracking-wider inline-block mb-2">
                Certificate Issued Successfully
              </span>
              <h2 className="text-2xl font-black text-gray-900 font-heading">
                First Aid Certificate Registered!
              </h2>
              <p className="text-sm text-gray-600 mt-1 max-w-md mx-auto">
                Serial Number <span className="font-mono font-bold text-red-700">{successCert.cert_serial_number}</span> has been saved and is now searchable on the public portal.
              </p>
            </div>

            {/* Certificate Award Slip Box */}
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-left max-w-lg mx-auto space-y-4 shadow-md">
              <div className="flex items-center justify-between border-b border-red-200 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-red-600 uppercase">Serial Number</span>
                  <p className="font-mono font-extrabold text-lg text-red-700">{successCert.cert_serial_number}</p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${
                  successCert.profile_type === 'member' ? 'bg-red-100 text-red-800' : 'bg-slate-200 text-slate-800'
                }`}>
                  {successCert.profile_type === 'member' ? '👥 Member Cert' : '💼 Non-Member Cert'}
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-xl border-2 border-red-600 overflow-hidden bg-white shrink-0">
                  {successCert.profile_picture_url ? (
                    <img src={successCert.profile_picture_url} alt={successCert.full_name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-red-600 font-bold text-xl">
                      {successCert.full_name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-black text-lg text-gray-900 font-heading">{successCert.full_name}</h3>
                  <p className="text-xs text-gray-600">Qualification: <span className="font-bold text-gray-800">{successCert.cert_type}</span></p>
                  <p className="text-xs text-gray-600">Training Region: <span className="font-bold text-gray-800">{successCert.training_region}</span></p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-red-200">
                <div>
                  <span className="text-gray-500 block">Instructor</span>
                  <span className="font-bold text-gray-800">{successCert.instructor_name}</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Issue Date</span>
                  <span className="font-bold text-gray-800">{successCert.cert_issue_date}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleResetForm}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileCheck className="w-4 h-4" />
                <span>Issue Another Certificate</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {errorMsg && (
              <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 flex items-center space-x-3 text-red-800 text-sm">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Profile Selection / Manual Entry Section */}
            {profileType === 'member' ? (
              <div className="bg-red-50/50 p-5 rounded-2xl border border-red-100 space-y-4">
                <label className="block text-xs font-extrabold text-gray-800 uppercase tracking-wider">
                  Select Registered Member <span className="text-red-600">*</span>
                </label>
                {loadingMembers ? (
                  <div className="flex items-center space-x-2 text-sm text-gray-500 py-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-red-600" />
                    <span>Loading GRCS members database...</span>
                  </div>
                ) : (
                  <select
                    value={selectedMemberId}
                    onChange={(e) => handleMemberChange(e.target.value)}
                    className="w-full px-4 py-3 bg-white text-gray-900 border-2 border-gray-300 rounded-xl font-bold focus:outline-none focus:ring-4 focus:ring-red-500/20 focus:border-red-600 text-sm"
                  >
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.full_name} ({m.member_id}) — {m.region} Region
                      </option>
                    ))}
                  </select>
                )}

                {/* Selected Member Preview Card */}
                {fullName && (
                  <div className="flex items-center space-x-4 p-3 bg-white rounded-xl border border-red-200">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-red-400 bg-gray-100 shrink-0">
                      {profilePictureUrl ? (
                        <img src={profilePictureUrl} alt={fullName} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-red-600 font-bold">
                          {fullName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="text-xs text-red-600 font-bold uppercase block">Selected Practitioner</span>
                      <h4 className="font-extrabold text-gray-900 text-base">{fullName}</h4>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Non-Member Form Inputs */
              <div className="space-y-4 bg-gray-50 p-5 rounded-2xl border border-gray-200">
                <h3 className="text-xs font-extrabold uppercase text-gray-700 tracking-wider">
                  Non-Member Practitioner Profile
                </h3>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Elizabeth Appiah"
                    className="w-full px-4 py-3 bg-white text-gray-900 border border-gray-300 rounded-xl font-bold text-sm focus:outline-none focus:border-red-600"
                  />
                </div>

                {/* Profile Picture Upload for Non-Member */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Custom Profile Photo (Passport Photo)
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-xl border-2 border-dashed border-red-300 bg-red-50 overflow-hidden flex items-center justify-center shrink-0">
                      {profilePictureUrl ? (
                        <img src={profilePictureUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-6 h-6 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        disabled={uploadingImage}
                        className="text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-red-100 file:text-red-700 hover:file:bg-red-200 cursor-pointer"
                      />
                      {uploadingImage && <p className="text-xs text-red-600 mt-1 font-bold">Uploading photo to Supabase storage...</p>}
                      {uploadError && <p className="text-xs text-red-600 mt-1">{uploadError}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Certificate Details Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Certificate Serial Number <span className="text-red-600">*</span>
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    required
                    value={certSerialNumber}
                    onChange={(e) => setCertSerialNumber(e.target.value.toUpperCase())}
                    className="flex-1 px-4 py-2.5 bg-white text-gray-900 border-2 border-gray-300 rounded-xl font-mono text-sm font-black uppercase tracking-wider focus:outline-none focus:border-red-600"
                  />
                  <button
                    type="button"
                    onClick={handleRegenerateSerial}
                    title="Generate New Serial"
                    className="px-3 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Qualification / Cert Type <span className="text-red-600">*</span>
                </label>
                <select
                  value={certType}
                  onChange={(e) => setCertType(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white text-gray-900 border-2 border-gray-300 rounded-xl font-bold text-sm focus:outline-none focus:border-red-600"
                >
                  <option value="Basic First Aid">Basic First Aid Practitioner</option>
                  <option value="Advanced CPR & AED">Advanced CPR & AED Practitioner</option>
                  <option value="Wilderness First Responder">Wilderness First Responder</option>
                  <option value="Emergency Occupational First Aid">Emergency Occupational First Aid</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Issue Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={certIssueDate}
                  onChange={(e) => setCertIssueDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white text-gray-900 border-2 border-gray-300 rounded-xl font-bold text-sm focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Training Location / Region <span className="text-red-600">*</span>
                </label>
                <select
                  value={trainingRegion}
                  onChange={(e) => setTrainingRegion(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white text-gray-900 border-2 border-gray-300 rounded-xl font-bold text-sm focus:outline-none focus:border-red-600"
                >
                  {GHANA_REGIONS.map((r) => (
                    <option key={r} value={r}>
                      {r} Region
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Certified Instructor Name
                </label>
                <input
                  type="text"
                  value={instructorName}
                  onChange={(e) => setInstructorName(e.target.value)}
                  placeholder="e.g. Dr. Ernest Boateng"
                  className="w-full px-4 py-2.5 bg-white text-gray-900 border-2 border-gray-300 rounded-xl font-bold text-sm focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            {/* Sub-Admin Auth Code Field */}
            {currentRole === 'sub_admin' && (
              <div className="bg-red-50 p-4 rounded-xl border-2 border-red-300 space-y-2">
                <label className="block text-xs font-extrabold text-red-900 uppercase flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-red-600" />
                  <span>Sub-Admin Authorization Code Required <span className="text-red-600">*</span></span>
                </label>
                <p className="text-xs text-red-700">
                  Sub-Admins must consume a single-use authorization code from system_reg_codes to issue certificates.
                </p>
                <input
                  type="text"
                  required
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value.toUpperCase())}
                  placeholder="e.g. REG-9X2Y"
                  className="w-full px-4 py-2.5 bg-white text-red-900 border-2 border-red-300 rounded-xl font-mono text-sm font-extrabold uppercase tracking-wider focus:outline-none focus:border-red-600"
                />
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl shadow-xl hover:shadow-red-600/30 transition-all flex items-center justify-center gap-2 text-base cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Registering Certificate...</span>
                  </>
                ) : (
                  <>
                    <Award className="w-5 h-5" />
                    <span>Save & Register First Aid Certificate</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
