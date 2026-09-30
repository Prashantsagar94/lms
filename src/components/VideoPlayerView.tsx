import React, { useState, useEffect } from 'react';
import { useLMS } from '../context/LMSContext';
import {
  ArrowLeft,
  CheckCircle,
  PlayCircle,
  ShieldAlert,
  Lock,
  List,
  ChevronRight,
  BookOpen,
  Award,
  AlertTriangle,
  QrCode
} from 'lucide-react';

export const VideoPlayerView: React.FC = () => {
  const {
    activePlayerState,
    setActivePlayerState,
    currentUser,
    getCourseEnrollment,
    markLessonComplete,
    setActiveQuizState,
    setViewingCertificate,
    certificates,
    setPaymentModalCourse
  } = useLMS();

  const [watermarkPos, setWatermarkPos] = useState({ top: 20, left: 30 });
  const [showWatermarkWarning, setShowWatermarkWarning] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Dynamic floating watermark position shift every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const top = Math.floor(15 + Math.random() * 65);
      const left = Math.floor(10 + Math.random() * 60);
      setWatermarkPos({ top, left });
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  if (!activePlayerState) return null;

  const { course, module: currentModule, lesson: currentLesson } = activePlayerState;
  const enrollment = getCourseEnrollment(course.id);
  const isLessonCompleted = enrollment?.completedLessonIds.includes(currentLesson.id);

  // If student has not paid for the course and this is not a free preview lesson
  if (!enrollment && !currentLesson.isPreview) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in font-sans">
        <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
              Payment Required
            </span>
            <h3 className="text-xl font-bold font-display text-white mt-2">
              Unlock {course.title}
            </h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              To start learning all practical modules, submit assessments, and earn your certificate, please complete your subsidized course fee payment (₹{course.fee.toLocaleString('en-IN')}) via official UPI QR.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <button
              onClick={() => {
                setActivePlayerState(null);
                setPaymentModalCourse(course);
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              <span>Pay Fee via UPI QR (₹{course.fee.toLocaleString('en-IN')})</span>
            </button>
            <button
              onClick={() => setActivePlayerState(null)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-xl transition-all cursor-pointer"
            >
              Browse Other Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Anti-download right click prevention
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowWatermarkWarning(true);
    setTimeout(() => setShowWatermarkWarning(false), 3000);
    return false;
  };

  // Prevent Ctrl+S / Save Page
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U')) {
      e.preventDefault();
      setShowWatermarkWarning(true);
      setTimeout(() => setShowWatermarkWarning(false), 3000);
    }
  };

  // Find next lesson
  const allLessonsWithModules: { mod: typeof course.modules[0]; les: typeof course.modules[0]['lessons'][0] }[] = [];
  course.modules.forEach(m => {
    m.lessons.forEach(l => {
      allLessonsWithModules.push({ mod: m, les: l });
    });
  });

  const currentIndex = allLessonsWithModules.findIndex(item => item.les.id === currentLesson.id);
  const nextItem = currentIndex !== -1 && currentIndex < allLessonsWithModules.length - 1
    ? allLessonsWithModules[currentIndex + 1]
    : null;

  const handleMarkAndNext = () => {
    markLessonComplete(course.id, currentLesson.id);
    if (nextItem) {
      setActivePlayerState({
        course,
        module: nextItem.mod,
        lesson: nextItem.les
      });
    }
  };

  const handleSelectLesson = (mod: typeof currentModule, les: typeof currentLesson) => {
    setActivePlayerState({
      course,
      module: mod,
      lesson: les
    });
  };

  const courseCertificate = certificates.find(c => c.enrollmentId === enrollment?.id);

  // Format video embed URL
  const formatEmbedUrl = (rawUrl: string) => {
    if (!rawUrl) return '';
    if (rawUrl.includes('youtube.com/watch?v=')) {
      const videoId = rawUrl.split('watch?v=')[1]?.split('&')[0];
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&controls=1`;
    }
    if (rawUrl.includes('youtu.be/')) {
      const videoId = rawUrl.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&controls=1`;
    }
    if (rawUrl.includes('/embed/')) {
      return `${rawUrl}?autoplay=1&modestbranding=1&rel=0`;
    }
    return rawUrl;
  };

  const videoSrc = formatEmbedUrl(currentLesson.videoUrl);

  return (
    <div
      onKeyDown={handleKeyDown}
      className="min-h-screen bg-[#070A11] text-slate-100 flex flex-col"
    >
      {/* Top Bar for Learning Session */}
      <div className="bg-[#0B0F19] border-b border-slate-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePlayerState(null)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Dashboard</span>
          </button>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          <div className="truncate max-w-md">
            <span className="text-[11px] text-amber-400 font-mono block">
              {course.title} · {currentModule.title}
            </span>
            <h2 className="text-xs sm:text-sm font-semibold text-white truncate">
              {currentLesson.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Learning Stream Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
            <Lock className="w-3 h-3" />
            <span>Active Student Session</span>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1 text-xs"
          >
            <List className="w-4 h-4" />
            <span className="hidden md:inline">{sidebarOpen ? 'Hide Syllabus' : 'Show Syllabus'}</span>
          </button>
        </div>
      </div>

      {/* Main Learning Interface */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Video Stage & Lesson Notes */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Protected Video Canvas Container */}
          <div
            onContextMenu={handleContextMenu}
            className="relative bg-black aspect-video w-full max-h-[65vh] flex items-center justify-center overflow-hidden protected-media select-none shadow-2xl"
          >
            {videoSrc ? (
              <iframe
                src={videoSrc}
                title={currentLesson.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="text-center p-8 text-slate-400 space-y-2">
                <PlayCircle className="w-12 h-12 mx-auto text-slate-600" />
                <p className="text-sm font-medium">Video Stream is being configured by instructor</p>
                <p className="text-xs text-slate-500">Contact admin or review lesson notes below.</p>
              </div>
            )}

            {/* Dynamic Watermark Floating Overlay */}
            <div
              className="absolute pointer-events-none select-none z-30 opacity-25 font-mono text-[11px] text-amber-200 transition-all duration-1000 ease-in-out p-1 bg-black/40 rounded border border-amber-300/30"
              style={{
                top: `${watermarkPos.top}%`,
                left: `${watermarkPos.left}%`
              }}
            >
              🔒 {currentUser.name} · {currentUser.id} · HunarSetu LMS
            </div>

            {/* Warning Popup when user attempts Right-Click / Download */}
            {showWatermarkWarning && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 border border-amber-500 text-amber-200 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-2xl">
                <span>Course Content Protected · Barabanki Head Office</span>
              </div>
            )}
          </div>

          {/* Action Bar below video */}
          <div className="p-4 sm:p-6 bg-slate-900/60 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-amber-400 font-medium">
                  Lesson {currentIndex + 1} of {allLessonsWithModules.length}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400 font-mono">
                  {currentLesson.durationMinutes} Minutes Duration
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold font-display text-white">
                {currentLesson.title}
              </h1>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleMarkAndNext}
                className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm focus:outline-none ${
                  isLessonCompleted
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                }`}
              >
                <CheckCircle className="w-4 h-4" />
                <span>
                  {isLessonCompleted ? 'Completed (Next Lesson)' : 'Mark Complete & Continue'}
                </span>
                {nextItem && <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Practical Lesson Notes & Technical Breakdown */}
          <div className="p-6 space-y-6 max-w-4xl">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Practical Demonstration Notes & Master Instructions</span>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                {currentLesson.keyNotes && currentLesson.keyNotes.length > 0 ? (
                  currentLesson.keyNotes.map((note, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {note}
                    </li>
                  ))
                ) : (
                  <li>Follow the video guidelines carefully for precision tool handling and seam work.</li>
                )}
              </ul>
            </div>

            {/* Assessment Trigger If Module has Quiz */}
            {currentModule.quiz && (
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>Module Practical Assessment Ready</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Test your understanding for {currentModule.title}. Passing score: ≥
                    {currentModule.quiz.passingScorePercent}%.
                  </p>
                </div>

                <button
                  onClick={() =>
                    setActiveQuizState({
                      course,
                      module: currentModule,
                      quiz: currentModule.quiz!
                    })
                  }
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors whitespace-nowrap"
                >
                  Launch Module Quiz
                </button>
              </div>
            )}

            {/* Content Security Statement */}
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800/80 text-[11px] text-slate-400 flex items-center gap-2">
              <span className="font-mono text-amber-400">❖</span>
              <span>
                Authorized Learning Stream · Barabanki Head Office · Director: Prashant Sagar · Helpline: 7800897677
              </span>
            </div>
          </div>
        </div>

        {/* Right: Course Syllabus Playlist Sidebar */}
        {sidebarOpen && (
          <div className="w-full lg:w-96 bg-[#0B0F19] border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col max-h-[50vh] lg:max-h-full">
            <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Course Syllabus & Lessons
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {enrollment?.completedLessonIds.length || 0} of {allLessonsWithModules.length} Lessons Finished
                </p>
              </div>

              {courseCertificate && (
                <button
                  onClick={() => setViewingCertificate(courseCertificate)}
                  title="View Certificate"
                  className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30"
                >
                  <Award className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60 p-2">
              {course.modules.map(mod => (
                <div key={mod.id} className="py-2">
                  <div className="px-2 py-1 text-[11px] font-bold text-amber-400 font-mono">
                    {mod.title}
                  </div>

                  <div className="mt-1 space-y-1">
                    {mod.lessons.map(les => {
                      const isCurrent = les.id === currentLesson.id;
                      const isDone = enrollment?.completedLessonIds.includes(les.id);

                      return (
                        <button
                          key={les.id}
                          onClick={() => handleSelectLesson(mod, les)}
                          className={`w-full p-2.5 rounded-lg text-left text-xs transition-colors flex items-center justify-between group focus:outline-none ${
                            isCurrent
                              ? 'bg-amber-500/15 border border-amber-500/30 text-white font-medium'
                              : 'hover:bg-slate-800/60 text-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            {isDone ? (
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            ) : (
                              <PlayCircle
                                className={`w-3.5 h-3.5 shrink-0 ${
                                  isCurrent ? 'text-amber-400' : 'text-slate-500 group-hover:text-slate-300'
                                }`}
                              />
                            )}
                            <span className="truncate">{les.title}</span>
                          </div>

                          <span className="text-[10px] text-slate-500 font-mono shrink-0">
                            {les.durationMinutes}m
                          </span>
                        </button>
                      );
                    })}

                    {mod.quiz && (
                      <button
                        onClick={() =>
                          setActiveQuizState({
                            course,
                            module: mod,
                            quiz: mod.quiz!
                          })
                        }
                        className={`w-full p-2 rounded-lg text-left text-xs transition-colors flex items-center justify-between ${
                          enrollment?.passedQuizIds.includes(mod.quiz.id)
                            ? 'text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10'
                            : 'text-amber-300 bg-amber-500/5 hover:bg-amber-500/10'
                        }`}
                      >
                        <span className="flex items-center gap-1.5 text-[11px] font-medium truncate">
                          <Award className="w-3.5 h-3.5" />
                          <span>{mod.quiz.title}</span>
                        </span>
                        <span className="text-[10px] font-mono uppercase">
                          {enrollment?.passedQuizIds.includes(mod.quiz.id) ? 'Passed' : 'Quiz'}
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
