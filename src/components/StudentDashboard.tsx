import React, { useEffect, useState } from 'react';
import { useLMS } from '../context/LMSContext';
import confetti from 'canvas-confetti';
import { TopLearnersLeaderboard } from './TopLearnersLeaderboard';
import {
  BookOpen,
  Award,
  PlayCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShieldAlert,
  FileText,
  Sparkles,
  LogOut,
  Trophy,
  Calendar,
  CalendarCheck
} from 'lucide-react';

interface StudentDashboardProps {
  onBrowseCourses: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onBrowseCourses }) => {
  const {
    currentUser,
    courses,
    enrollments,
    certificates,
    attendance,
    markStudentSelfAttendance,
    getStudentAttendanceStats,
    setActivePlayerState,
    setActiveQuizState,
    setViewingCertificate,
    setPaymentModalCourse,
    logoutUser
  } = useLMS();

  const userEnrollments = enrollments.filter(e => e.studentId === currentUser.id);

  // Calculate statistics
  const totalCompletedLessons = userEnrollments.reduce(
    (acc, curr) => acc + curr.completedLessonIds.length,
    0
  );

  const userCertificates = certificates.filter(
    c => c.studentEmail.toLowerCase() === currentUser.email.toLowerCase()
  );

  const attendanceStats = getStudentAttendanceStats(currentUser.id);
  const todayStr = new Date().toISOString().split('T')[0];
  const todayAttendance = attendance.find(
    a => a.studentId === currentUser.id && a.date === todayStr
  );
  const [attendanceMsg, setAttendanceMsg] = useState('');

  const handleMarkMyAttendance = () => {
    const res = markStudentSelfAttendance();
    setAttendanceMsg(res.message);
    setTimeout(() => setAttendanceMsg(''), 5000);
  };

  const triggerCelebrationConfetti = () => {
    try {
      // First burst from center
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6']
      });

      // Second cannon burst from left & right
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#F59E0B', '#FDE047', '#10B981']
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#F59E0B', '#FDE047', '#10B981']
        });
      }, 250);
    } catch {
      // ignore
    }
  };

  const hasCompletedCourse = userEnrollments.some(e => {
    const course = courses.find(c => c.id === e.courseId);
    if (!course) return false;
    const totalLessons = course.modules.reduce((s, m) => s + m.lessons.length, 0);
    return totalLessons > 0 && e.completedLessonIds.length >= totalLessons;
  });

  // Check if any enrollment is 100% on mount and trigger celebratory confetti once
  useEffect(() => {
    if (hasCompletedCourse) {
      const timer = setTimeout(() => {
        triggerCelebrationConfetti();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [hasCompletedCourse]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 100% Course Completion Celebratory Banner */}
      {hasCompletedCourse && (
        <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900 to-amber-950/80 border-2 border-emerald-500/50 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-2xl relative overflow-hidden animate-fade-in">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center font-bold text-2xl shadow-lg shrink-0">
              🏆
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Curriculum Completed!
                </span>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full font-semibold">
                  Official Distinction
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-display text-white">
                Shabash, {currentUser.name}! You Reached 100% Course Completion!
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                You have finished all required video lessons and cleared your practical skill modules. Your government-recognized vocational certificate signed by Director Prashant Sagar is issued and cryptographically verified.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto relative z-10">
            <button
              onClick={() => triggerCelebrationConfetti()}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Celebrate 🎊</span>
            </button>

            {userCertificates[0] && (
              <button
                onClick={() => setViewingCertificate(userCertificates[0])}
                className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>View Certificate</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Student Welcome Header & Personalized Learning Path */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/30 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <span>Personalized Vocational Pathway</span>
              <span aria-hidden="true">·</span>
              <span>Batch 2026</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-emerald-400 font-bold">Student ID: {currentUser.id}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Namaste, {currentUser.name}!
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Welcome to your personalized skill development dashboard. Continue mastering your practical craftsmanship, complete the interactive module assessments, and unlock your downloadable government-recognized PDF certification.
            </p>
          </div>

          {/* Logout Feature */}
          <div className="flex items-center gap-2 shrink-0 z-10">
            <button
              onClick={() => {
                logoutUser();
                onBrowseCourses();
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-950/90 hover:bg-red-500/20 text-slate-300 hover:text-red-300 border border-slate-700/80 hover:border-red-500/40 text-xs font-bold flex items-center gap-2 transition-all shadow-sm cursor-pointer"
              title="Logout from session"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Grid with Leaderboard Standing */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Enrolled Courses</span>
            <span className="text-2xl font-bold font-mono text-white mt-1 block">
              {userEnrollments.length}
            </span>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Lessons Completed</span>
            <span className="text-2xl font-bold font-mono text-amber-400 mt-1 block">
              {totalCompletedLessons}
            </span>
          </div>

          <a
            href="#top-learners-leaderboard"
            className="bg-slate-950/60 hover:bg-amber-500/10 p-3.5 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-colors group cursor-pointer block"
          >
            <span className="text-[11px] text-amber-400 block flex items-center justify-between font-mono">
              <span>Statewide Rank</span>
              <Trophy className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            </span>
            <span className="text-2xl font-bold font-mono text-amber-300 mt-1 block">
              #4 <span className="text-xs text-slate-400 font-normal">in UP</span>
            </span>
          </a>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block">Certificates Earned</span>
            <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
              {userCertificates.length}
            </span>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-[11px] text-slate-400 block">Affiliated Center</span>
            <span className="text-xs font-semibold text-emerald-400 mt-2 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Barabanki H.O.
            </span>
          </div>
        </div>
      </div>

      {/* Leadership & Support Advisory */}
      <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
          PS
        </div>
        <div className="text-xs space-y-1">
          <div className="font-semibold text-amber-300">
            Institutional Guidance · Director: Prashant Sagar (Barabanki Head Office)
          </div>
          <p className="text-slate-300 leading-relaxed">
            Welcome to your digital training portal. Follow the step-by-step video lessons and submit each module assessment to achieve high practical proficiency. For academic or certificate assistance, contact head office helpline: <strong className="text-white font-mono">7800897677</strong>.
          </p>
        </div>
      </div>

      {/* Daily Attendance Self-Checkin Feature */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white font-display">
                  Daily Attendance Check-in
                </h3>
                <span className="text-[10px] bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded">
                  {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Mark your daily workshop attendance to maintain 75%+ eligibility for government-recognized certification.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {todayAttendance ? (
              <div className="px-3.5 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-2 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Marked {todayAttendance.status} Today</span>
              </div>
            ) : (
              <button
                onClick={handleMarkMyAttendance}
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer hover:scale-102"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Mark My Attendance Today</span>
              </button>
            )}
          </div>
        </div>

        {attendanceMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium animate-fade-in flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{attendanceMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80 text-xs">
          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
            <span className="text-slate-400 text-[10px] block">Attendance Score</span>
            <span className="text-base font-bold font-mono text-emerald-400">
              {attendanceStats.percentage}%
            </span>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
            <span className="text-slate-400 text-[10px] block">Days Present</span>
            <span className="text-base font-bold font-mono text-white">
              {attendanceStats.presentDays} Days
            </span>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
            <span className="text-slate-400 text-[10px] block">Total Class Days</span>
            <span className="text-base font-bold font-mono text-slate-300">
              {attendanceStats.totalDays} Days
            </span>
          </div>

          <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
            <span className="text-slate-400 text-[10px] block">Minimum Required</span>
            <span className="text-base font-bold font-mono text-amber-300">
              70% (Eligible)
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-display text-white">
              My Active Training Programmes
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Resume your practical lessons and track daily module milestones.
            </p>
          </div>

          {userEnrollments.length > 0 && (
            <button
              onClick={onBrowseCourses}
              className="text-xs text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-medium"
            >
              <span>Explore More Trades</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {userEnrollments.length === 0 ? (
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">No active course enrollments yet</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                Choose a vocational skilling course (Silai, Embroidery, Mehndi, Beauty, or Combos) to start learning today.
              </p>
            </div>
            <button
              onClick={onBrowseCourses}
              className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors shadow-sm"
            >
              Browse Vocational Courses
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {userEnrollments.map(enrollment => {
              const course = courses.find(c => c.id === enrollment.courseId);
              if (!course) return null;

              const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
              const completedCount = enrollment.completedLessonIds.length;
              const progressPct = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
              const isCourseCompleted = progressPct === 100;

              // Find next uncompleted lesson
              let nextLesson: { module: typeof course.modules[0]; lesson: typeof course.modules[0]['lessons'][0] } | null = null;
              for (const mod of course.modules) {
                for (const les of mod.lessons) {
                  if (!enrollment.completedLessonIds.includes(les.id)) {
                    nextLesson = { module: mod, lesson: les };
                    break;
                  }
                }
                if (nextLesson) break;
              }

              // Check if certificate exists
              const cert = certificates.find(c => c.enrollmentId === enrollment.id);

              return (
                <div
                  key={enrollment.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-xl p-6 space-y-6 hover:border-slate-700 transition-colors"
                >
                  {/* Course Banner Info */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
                        <span>{course.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{course.durationDays} Days Programme</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-slate-400">Txn: {enrollment.transactionRef}</span>
                      </div>
                      <h3 className="text-lg font-bold font-display text-white">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-400">{course.hindiTitle}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      {cert ? (
                        <button
                          onClick={() => setViewingCertificate(cert)}
                          className="px-4 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 text-xs font-semibold flex items-center gap-2 transition-colors"
                        >
                          <Award className="w-4 h-4 text-emerald-400" />
                          <span>View PDF Certificate</span>
                        </button>
                      ) : null}

                      {nextLesson ? (
                        <button
                          onClick={() =>
                            setActivePlayerState({
                              course,
                              module: nextLesson!.module,
                              lesson: nextLesson!.lesson
                            })
                          }
                          className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
                        >
                          <PlayCircle className="w-4 h-4" />
                          <span>Resume Lesson</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            const firstMod = course.modules[0];
                            const firstLes = firstMod?.lessons[0];
                            if (firstMod && firstLes) {
                              setActivePlayerState({
                                course,
                                module: firstMod,
                                lesson: firstLes
                              });
                            }
                          }}
                          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-2"
                        >
                          <PlayCircle className="w-4 h-4" />
                          <span>Review Lessons</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Prominent Visual Progress Bar & Completion Indicator */}
                  <div className="bg-gradient-to-br from-slate-950/90 via-slate-950/70 to-amber-950/20 p-5 rounded-xl border border-slate-800/90 space-y-3.5 shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                            Learning Progress Tracker
                          </span>
                          <span className="text-slate-600">·</span>
                          <span className="text-xs text-slate-400 font-mono">
                            {completedCount} of {totalLessons} Lessons Finished
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          {isCourseCompleted
                            ? '🎉 Curriculum 100% complete! Your verified PDF certificate has been issued.'
                            : progressPct >= 50
                            ? `⭐ Excellent momentum! You are ${progressPct}% through your ${course.durationDays}-day course.`
                            : `🔥 Keep learning! Complete ${totalLessons - completedCount} more lessons to unlock your certificate.`}
                        </p>
                      </div>

                      {/* Prominent Percentage Pill & Confetti Celebration Button */}
                      <div className="flex items-center gap-2 shrink-0">
                        {isCourseCompleted && (
                          <button
                            onClick={() => triggerCelebrationConfetti()}
                            title="Replay Celebration Confetti"
                            className="px-2.5 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            <span>Celebrate 🎊</span>
                          </button>
                        )}

                        <div
                          className={`px-3 py-1.5 rounded-lg border font-mono font-bold text-sm sm:text-base flex items-center gap-1.5 shadow-sm ${
                            isCourseCompleted
                              ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                              : progressPct >= 50
                              ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                              : 'bg-slate-900 border-slate-700 text-slate-200'
                          }`}
                        >
                          {isCourseCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                          )}
                          <span>{progressPct}% Completed</span>
                        </div>
                      </div>
                    </div>

                    {/* Thick Glowing Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="w-full h-3.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800 shadow-inner">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ease-out shadow-sm ${
                            isCourseCompleted
                              ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300'
                              : 'bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300'
                          }`}
                          style={{ width: `${Math.max(progressPct, 4)}%` }}
                        />
                      </div>

                      {/* Milestone Sub-Metrics */}
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-0.5">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            {completedCount}/{totalLessons} Lessons Done
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            {enrollment.passedQuizIds.length}/{course.modules.filter(m => m.quiz).length} Quizzes Cleared
                          </span>
                        </div>
                        <span className="text-slate-500 hidden sm:inline">
                          Recommended Pace: 1 Lesson / Day
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Modular Syllabus Breakdown & Interactive Assessment List */}
                  <div className="space-y-4">
                    <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Course Modules & Assessments
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.modules.map(mod => {
                        const moduleCompletedCount = mod.lessons.filter(l =>
                          enrollment.completedLessonIds.includes(l.id)
                        ).length;
                        const isQuizPassed = mod.quiz
                          ? enrollment.passedQuizIds.includes(mod.quiz.id)
                          : true;

                        return (
                          <div
                            key={mod.id}
                            className="bg-slate-950/80 border border-slate-800 rounded-lg p-4 space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold text-white line-clamp-1">
                                {mod.title}
                              </h4>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {moduleCompletedCount}/{mod.lessons.length} Done
                              </span>
                            </div>

                            {/* Lesson Quick Links */}
                            <div className="space-y-1.5 divide-y divide-slate-800/40">
                              {mod.lessons.map(les => {
                                const isDone = enrollment.completedLessonIds.includes(les.id);
                                return (
                                  <button
                                    key={les.id}
                                    onClick={() =>
                                      setActivePlayerState({
                                        course,
                                        module: mod,
                                        lesson: les
                                      })
                                    }
                                    className="w-full pt-1.5 flex items-center justify-between text-left group text-xs text-slate-300 hover:text-white"
                                  >
                                    <div className="flex items-center gap-2 truncate pr-2">
                                      {isDone ? (
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                      ) : (
                                        <PlayCircle className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 shrink-0" />
                                      )}
                                      <span className="truncate group-hover:text-amber-300 transition-colors">
                                        {les.title}
                                      </span>
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-mono shrink-0">
                                      {les.durationMinutes}m
                                    </span>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Module Assessment */}
                            {mod.quiz && (
                              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                                  <span>{mod.quiz.title}</span>
                                </span>

                                {isQuizPassed ? (
                                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> Passed (≥70%)
                                  </span>
                                ) : (
                                  <button
                                    onClick={() =>
                                      setActiveQuizState({
                                        course,
                                        module: mod,
                                        quiz: mod.quiz!
                                      })
                                    }
                                    className="px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-semibold transition-colors"
                                  >
                                    Take Assessment
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Top Learners Leaderboard with Hindi Slogan & Animated Skill Bridge */}
      <div id="top-learners-leaderboard" className="pt-4 scroll-mt-20">
        <TopLearnersLeaderboard />
      </div>

      {/* Issued Certificates Showcase */}
      {userCertificates.length > 0 && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold font-display text-white">
                Earned National Skill Certifications
              </h3>
            </div>
            <span className="text-xs text-emerald-400 font-mono">
              {userCertificates.length} Verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {userCertificates.map(c => (
              <div
                key={c.id}
                className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] text-amber-400 font-mono uppercase">
                    ID: {c.id}
                  </div>
                  <h4 className="text-xs font-bold text-white mt-1">{c.courseTitle}</h4>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Issued: {c.issueDate} · Grade: {c.grade}
                  </div>
                </div>

                <button
                  onClick={() => setViewingCertificate(c)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Download PDF Certificate</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
