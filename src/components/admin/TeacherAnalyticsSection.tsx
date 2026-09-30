import React, { useState } from 'react';
import { useLMS } from '../../context/LMSContext';
import { TeacherAnalyticsReport, User } from '../../types';
import { TeacherReportModal } from './TeacherReportModal';
import {
  Users,
  Award,
  TrendingUp,
  BarChart3,
  FileText,
  Printer,
  Trash2,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';

export const TeacherAnalyticsSection: React.FC = () => {
  const {
    registeredUsers,
    adminDeleteUser,
    generateTeacherAnalytics,
    adminEnrollTeacher,
    websiteSettings
  } = useLMS();

  const [selectedReportForModal, setSelectedReportForModal] = useState<TeacherAnalyticsReport | null>(null);
  const [teacherToDelete, setTeacherToDelete] = useState<User | null>(null);

  // New Teacher Modal
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [tchName, setTchName] = useState('');
  const [tchEmail, setTchEmail] = useState('');
  const [tchPhone, setTchPhone] = useState('');
  const [tchPassword, setTchPassword] = useState('teacher123');
  const [tchTrade, setTchTrade] = useState('Garment Making');
  const [successMsg, setSuccessMsg] = useState('');

  const reports = generateTeacherAnalytics();
  const teachers = registeredUsers.filter(u => u.role === 'teacher');

  // Overall aggregate statistics
  const avgEngagement = reports.length
    ? Math.round(reports.reduce((acc, r) => acc + r.studentEngagementScore, 0) / reports.length)
    : 92;
  const avgQuiz = reports.length
    ? Number((reports.reduce((acc, r) => acc + r.avgQuizScorePercent, 0) / reports.length).toFixed(1))
    : 89.5;
  const avgCompletion = reports.length
    ? Math.round(reports.reduce((acc, r) => acc + r.courseCompletionRatePercent, 0) / reports.length)
    : 78;

  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tchName.trim() || !tchEmail.trim()) return;

    adminEnrollTeacher({
      name: tchName.trim(),
      email: tchEmail.trim(),
      phone: tchPhone.trim() || '+91 98765 11111',
      password: tchPassword.trim() || 'teacher123',
      assignedTrade: tchTrade
    });

    setSuccessMsg(`Teacher "${tchName}" successfully enrolled with Trade: ${tchTrade}!`);
    setShowAddTeacherModal(false);
    setTchName('');
    setTchEmail('');
    setTchPhone('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleConfirmDelete = () => {
    if (!teacherToDelete) return;
    adminDeleteUser(teacherToDelete.id);
    setSuccessMsg(`Teacher "${teacherToDelete.name}" (${teacherToDelete.id}) removed from system.`);
    setTeacherToDelete(null);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
            <ShieldCheck className="w-4 h-4" />
            <span>AUTOMATED TEACHER PERFORMANCE MONITORING</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
            Teacher Analytics & Automated Performance Reports
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl mt-1">
            Continuously monitors student engagement levels, average quiz scores for assigned courses, and course completion rates per instructor with automated institutional audit generation.
          </p>
        </div>

        <button
          onClick={() => setShowAddTeacherModal(true)}
          className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Enroll New Teacher</span>
        </button>
      </div>

      {successMsg && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-3 rounded-xl text-xs flex items-center gap-2 shadow-sm animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Aggregate KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Evaluated Instructors</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black font-mono text-white">
            {teachers.length}
          </div>
          <div className="text-[11px] text-slate-400">
            Across 4 Vocational Sectors
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Student Engagement Level</span>
            <BarChart3 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black font-mono text-emerald-400">
            {avgEngagement}%
          </div>
          <div className="text-[11px] text-slate-400">
            Weighted Attendance & Participation
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Avg Quiz Score</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black font-mono text-amber-400">
            {avgQuiz}%
          </div>
          <div className="text-[11px] text-slate-400">
            Across All Assigned Course Tests
          </div>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Course Completion Rate</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black font-mono text-cyan-400">
            {avgCompletion}%
          </div>
          <div className="text-[11px] text-slate-400">
            Successfully Certified Cohort
          </div>
        </div>
      </div>

      {/* Per-Teacher Detailed Performance Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-display">
            Automated Performance Dossiers Per Teacher ({reports.length})
          </h3>
          <span className="text-xs text-slate-400">
            Real-time assessment calculation based on active student cohorts
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {reports.map(report => {
            const teacherUser = teachers.find(t => t.id === report.teacherId);
            return (
              <div
                key={report.teacherId}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 hover:border-amber-500/40 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  {/* Teacher Header */}
                  <div className="flex items-start justify-between gap-3 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-700/20 border border-amber-500/30 flex items-center justify-center text-amber-300 font-bold text-lg font-mono">
                        {report.teacherName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white">{report.teacherName}</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-500 text-slate-950 font-mono">
                            {report.performanceGrade}
                          </span>
                        </div>
                        <div className="text-xs text-amber-400 font-mono">{report.teacherId}</div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          Trade: <strong className="text-slate-300">{report.assignedTrade}</strong> · {report.assignedCourseTitle}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold text-amber-400 font-mono">
                        {report.ratingScore} / 5.0 ★
                      </div>
                      <div className="text-[10px] text-slate-400">Audit Grade</div>
                    </div>
                  </div>

                  {/* 3 Core Metrics Progress Bars */}
                  <div className="space-y-3 pt-4">
                    {/* Metric 1: Student Engagement */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Student Engagement Level:</span>
                        </span>
                        <span className="font-mono font-bold text-emerald-400">
                          {report.studentEngagementScore}% (Attendance: {report.attendanceRatePercent}%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                          style={{ width: `${report.studentEngagementScore}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Metric 2: Average Quiz Scores */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400 flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-amber-400" />
                          <span>Average Quiz Scores for Assigned Courses:</span>
                        </span>
                        <span className="font-mono font-bold text-amber-400">
                          {report.avgQuizScorePercent}% (Pass Req: 70%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                          style={{ width: `${report.avgQuizScorePercent}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Metric 3: Course Completion Rates */}
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-400 flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Course Completion Rate:</span>
                        </span>
                        <span className="font-mono font-bold text-cyan-400">
                          {report.courseCompletionRatePercent}% ({report.completedStudents}/{report.totalEnrolledStudents} Certified)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full"
                          style={{ width: `${report.courseCompletionRatePercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Summary Teaser */}
                  <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 leading-relaxed line-clamp-2">
                    {report.automatedSummary}
                  </div>
                </div>

                {/* Bottom Actions: Generate Report & Delete Teacher */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-400">
                    Cohort: <strong className="text-white">{report.totalEnrolledStudents} Students</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    {teacherUser && (
                      <button
                        onClick={() => setTeacherToDelete(teacherUser)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                        title="Delete Teacher Account"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedReportForModal(report)}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Generate Full Report</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Teacher Modal */}
      {showAddTeacherModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-amber-400" />
                <span>Enroll New Master Trainer</span>
              </h3>
              <button
                onClick={() => setShowAddTeacherModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTeacher} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Teacher Full Name *</label>
                <input
                  type="text"
                  required
                  value={tchName}
                  onChange={e => setTchName(e.target.value)}
                  placeholder="e.g. Master Tailor Ramesh Sharma"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Official Email *</label>
                <input
                  type="email"
                  required
                  value={tchEmail}
                  onChange={e => setTchEmail(e.target.value)}
                  placeholder="e.g. ramesh.trainer@hunarsetu.in"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={tchPhone}
                    onChange={e => setTchPhone(e.target.value)}
                    placeholder="+91 98765 11111"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Login Password</label>
                  <input
                    type="text"
                    value={tchPassword}
                    onChange={e => setTchPassword(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-400 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Assigned Vocational Trade</label>
                <select
                  value={tchTrade}
                  onChange={e => setTchTrade(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-amber-400"
                >
                  <option value="Garment Making">Garment Making & Tailoring</option>
                  <option value="Embroidery">Hand Embroidery & Zardozi</option>
                  <option value="Mehndi Art">Mehndi Art & Bridal Designing</option>
                  <option value="Beauty & Wellness">Beauty & Wellness</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddTeacherModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow"
                >
                  Generate Teacher ID
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Teacher Confirmation Modal */}
      {teacherToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-500/40 rounded-2xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-bold text-white text-base">Delete Teacher Account</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to remove <strong>{teacherToDelete.name}</strong> ({teacherToDelete.id})? This will revoke their instructor credentials.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setTeacherToDelete(null)}
                className="px-3.5 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-xs"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full Report Printable Modal */}
      <TeacherReportModal
        report={selectedReportForModal}
        onClose={() => setSelectedReportForModal(null)}
        directorName={websiteSettings.directorName}
        headOffice={websiteSettings.headOfficeAddress}
      />
    </div>
  );
};
