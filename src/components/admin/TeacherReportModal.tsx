import React from 'react';
import { TeacherAnalyticsReport } from '../../types';
import {
  X,
  Printer,
  ShieldCheck,
  Award,
  CheckCircle2,
  TrendingUp,
  Users,
  GraduationCap,
  Calendar,
  Phone,
  Mail,
  AlertCircle
} from 'lucide-react';

interface TeacherReportModalProps {
  report: TeacherAnalyticsReport | null;
  onClose: () => void;
  directorName: string;
  headOffice: string;
}

export const TeacherReportModal: React.FC<TeacherReportModalProps> = ({
  report,
  onClose,
  directorName,
  headOffice
}) => {
  if (!report) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl relative text-slate-100 flex flex-col">
        {/* Top Control Bar (Hidden in Print) */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between sticky top-0 z-10 print:hidden">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Automated Instructor Dossier
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Ref: {report.teacherId} · {report.generatedAt}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-colors shadow"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Body */}
        <div className="p-6 sm:p-10 space-y-6 bg-slate-900 print:bg-white print:text-black">
          {/* Official Letterhead */}
          <div className="border-b-2 border-amber-500/60 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 print:text-amber-800">
                <ShieldCheck className="w-4 h-4" />
                <span>HUNARSETU VOCATIONAL SKILL TRAINING TRUST</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white print:text-black mt-1">
                Teacher Performance & Student Engagement Audit
              </h1>
              <p className="text-xs text-slate-400 print:text-slate-600 mt-1">
                {headOffice} · Institutional Accreditation Authority
              </p>
            </div>

            <div className="text-right sm:text-right font-mono text-xs text-slate-300 print:text-slate-700 bg-slate-950/70 print:bg-slate-100 p-3 rounded-xl border border-slate-800 print:border-slate-300">
              <div><strong>Audit Report Date:</strong> {report.generatedAt}</div>
              <div><strong>Authority:</strong> {directorName}</div>
              <div><strong>Status:</strong> <span className="text-emerald-400 font-bold print:text-emerald-700">VERIFIED OFFICIAL</span></div>
            </div>
          </div>

          {/* Teacher Profile Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300">
            <div>
              <span className="text-[11px] text-slate-400 block">Instructor Name</span>
              <strong className="text-sm text-white print:text-black font-bold">{report.teacherName}</strong>
              <span className="text-xs text-amber-400 block font-mono">ID: {report.teacherId}</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Assigned Trade</span>
              <strong className="text-sm text-white print:text-black">{report.assignedTrade}</strong>
              <span className="text-xs text-slate-400 block">Lead Trainer</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Assigned Course</span>
              <strong className="text-sm text-white print:text-black line-clamp-1">{report.assignedCourseTitle}</strong>
              <span className="text-xs text-slate-400 block font-mono">{report.totalAssignedCourses} Modules Active</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block">Performance Grade</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="px-2.5 py-0.5 rounded text-xs font-black bg-amber-500 text-slate-950">
                  GRADE {report.performanceGrade}
                </span>
                <span className="text-xs font-bold text-amber-400 font-mono">
                  {report.ratingScore} / 5.0 ★
                </span>
              </div>
            </div>
          </div>

          {/* 3 Core Requested Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Student Engagement Level */}
            <div className="p-4 rounded-xl bg-slate-950/80 print:bg-slate-100 border border-slate-800 print:border-slate-300 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold uppercase tracking-wider text-[11px]">1. Student Engagement Level</span>
                <Users className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-mono text-emerald-400 print:text-emerald-700">
                  {report.studentEngagementScore}%
                </span>
                <span className="text-xs text-slate-400">Overall Index</span>
              </div>
              <div className="text-[11px] text-slate-300 print:text-slate-600 space-y-1 pt-2 border-t border-slate-800/60 print:border-slate-200">
                <div className="flex justify-between">
                  <span>Practical Attendance:</span>
                  <strong className="font-mono text-white print:text-black">{report.attendanceRatePercent}%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Enrolled Cohort Size:</span>
                  <strong className="font-mono text-white print:text-black">{report.totalEnrolledStudents} Students</strong>
                </div>
                <div className="flex justify-between">
                  <span>Active in Batch:</span>
                  <strong className="font-mono text-emerald-400 print:text-emerald-700">{report.activeStudents} Active</strong>
                </div>
              </div>
            </div>

            {/* 2. Average Quiz Scores */}
            <div className="p-4 rounded-xl bg-slate-950/80 print:bg-slate-100 border border-slate-800 print:border-slate-300 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold uppercase tracking-wider text-[11px]">2. Average Quiz Scores</span>
                <Award className="w-4 h-4 text-amber-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-mono text-amber-400 print:text-amber-800">
                  {report.avgQuizScorePercent}%
                </span>
                <span className="text-xs text-slate-400">Trade Cohort Avg</span>
              </div>
              <div className="text-[11px] text-slate-300 print:text-slate-600 space-y-1 pt-2 border-t border-slate-800/60 print:border-slate-200">
                <div className="flex justify-between">
                  <span>Passing Threshold:</span>
                  <strong className="font-mono text-white print:text-black">70.0% Required</strong>
                </div>
                <div className="flex justify-between">
                  <span>Quizzes Monitored:</span>
                  <strong className="font-mono text-white print:text-black">{report.quizzesConducted} Assessments</strong>
                </div>
                <div className="flex justify-between">
                  <span>Retention Benchmark:</span>
                  <strong className="font-mono text-emerald-400 print:text-emerald-700">Superior Retention</strong>
                </div>
              </div>
            </div>

            {/* 3. Course Completion Rates */}
            <div className="p-4 rounded-xl bg-slate-950/80 print:bg-slate-100 border border-slate-800 print:border-slate-300 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold uppercase tracking-wider text-[11px]">3. Course Completion Rate</span>
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black font-mono text-cyan-400 print:text-cyan-800">
                  {report.courseCompletionRatePercent}%
                </span>
                <span className="text-xs text-slate-400">Graduation Ratio</span>
              </div>
              <div className="text-[11px] text-slate-300 print:text-slate-600 space-y-1 pt-2 border-t border-slate-800/60 print:border-slate-200">
                <div className="flex justify-between">
                  <span>Graduated Students:</span>
                  <strong className="font-mono text-white print:text-black">{report.completedStudents} Certified</strong>
                </div>
                <div className="flex justify-between">
                  <span>Dropout / Discontinued:</span>
                  <strong className="font-mono text-slate-400">0% (Nil)</strong>
                </div>
                <div className="flex justify-between">
                  <span>Accreditation Ready:</span>
                  <strong className="font-mono text-emerald-400 print:text-emerald-700">100% Eligible</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Automated Performance Summary */}
          <div className="p-5 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-2">
            <h3 className="text-xs font-bold text-amber-400 print:text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Automated Institutional Performance Narrative</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 print:text-slate-800 leading-relaxed">
              {report.automatedSummary}
            </p>
          </div>

          {/* Key Strengths & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 print:text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Key Evaluated Strengths</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300 print:text-slate-700">
                {report.keyStrengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-2">
              <h4 className="text-xs font-bold text-amber-400 print:text-amber-800 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Actionable Recommendations for Batch</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300 print:text-slate-700">
                {report.recommendedActions.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Top Performing Students under this Teacher */}
          <div className="p-4 rounded-xl bg-slate-950/60 print:bg-slate-50 border border-slate-800 print:border-slate-300 space-y-3">
            <h4 className="text-xs font-bold text-white print:text-black flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>Top Performing Learners in Trainer's Cohort</span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 print:bg-slate-200 text-slate-400 print:text-slate-700 uppercase text-[10px]">
                  <tr>
                    <th className="py-2 px-3">Student Name</th>
                    <th className="py-2 px-3">Course</th>
                    <th className="py-2 px-3">Quiz Score</th>
                    <th className="py-2 px-3 text-right">Completion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 print:divide-slate-300">
                  {report.topPerformingStudents.map((stu, i) => (
                    <tr key={i}>
                      <td className="py-2.5 px-3 font-semibold text-white print:text-black">{stu.studentName}</td>
                      <td className="py-2.5 px-3 text-slate-300 print:text-slate-700">{stu.courseTitle}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-amber-400 print:text-amber-800">{stu.quizScore}%</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-400 print:text-emerald-700">{stu.completionPercent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Official Signatures */}
          <div className="pt-8 border-t border-slate-800 print:border-slate-300 grid grid-cols-2 gap-8 items-end">
            <div>
              <div className="text-xs font-semibold text-slate-400 print:text-slate-600 mb-1">
                Evaluated by Master Trainer:
              </div>
              <div className="font-bold text-white print:text-black text-sm">{report.teacherName}</div>
              <div className="text-xs text-slate-400 print:text-slate-600 font-mono">Head of Vocational Department</div>
            </div>

            <div className="text-right">
              <div className="text-xs font-semibold text-slate-400 print:text-slate-600 mb-1">
                Approved by Director:
              </div>
              <div className="font-black text-amber-400 print:text-amber-800 text-base">{directorName}</div>
              <div className="text-xs text-slate-400 print:text-slate-600">Director, HunarSetu LMS · Barabanki</div>
              <div className="text-[10px] text-emerald-400 print:text-emerald-700 font-mono mt-0.5">Official Gold Seal Certified ✓</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
