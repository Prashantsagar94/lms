import React from 'react';
import { useLMS } from '../context/LMSContext';
import {
  X,
  Clock,
  Award,
  CheckCircle,
  PlayCircle,
  QrCode,
  UserCheck,
  BookOpen
} from 'lucide-react';

export const CourseDetailModal: React.FC = () => {
  const {
    selectedCourseForDetails,
    setSelectedCourseForDetails,
    setPaymentModalCourse,
    getCourseEnrollment,
    setActivePlayerState,
    handleEnrollClick
  } = useLMS();

  if (!selectedCourseForDetails) return null;

  const course = selectedCourseForDetails;
  const enrollment = getCourseEnrollment(course.id);
  const isEnrolled = !!enrollment;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="space-y-0.5">
            <span className="text-xs text-amber-400 font-mono">
              {course.category} · {course.durationDays} Days Duration
            </span>
            <h3 className="text-lg font-bold font-display text-white">{course.title}</h3>
          </div>

          <button
            onClick={() => setSelectedCourseForDetails(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Course Banner Image & Overview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {course.imageUrl && (
              <div className="md:col-span-4 rounded-xl overflow-hidden border border-slate-800 aspect-video relative shadow-md">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-2 left-2 bg-slate-950/80 px-2 py-0.5 rounded text-[10px] font-mono text-amber-300 font-bold border border-amber-500/30">
                  {course.durationDays} Days Fieldwork
                </span>
              </div>
            )}
            <div className={course.imageUrl ? 'md:col-span-8 space-y-2' : 'col-span-12 space-y-2'}>
              <div className="text-xs text-amber-300 font-semibold">
                {course.hindiTitle}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {course.fullDescription}
              </p>
            </div>
          </div>

          {/* Trainer Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold text-lg font-display">
              {course.trainer.name.charAt(0)}
            </div>
            <div className="space-y-0.5">
              <div className="text-xs text-slate-400 font-medium">Chief Course Instructor</div>
              <h4 className="text-sm font-bold text-white">{course.trainer.name}</h4>
              <p className="text-xs text-slate-400">
                {course.trainer.designation} · {course.trainer.experience}
              </p>
            </div>
          </div>

          {/* Step-by-Step Practical Training Sequence Roadmap */}
          {course.trainingPlan && course.trainingPlan.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Structured Training Sequence & Milestones</span>
                </h4>
                <span className="text-[11px] text-amber-400 font-mono">
                  {course.durationDays} Days Curriculum
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.trainingPlan.map(phase => (
                  <div
                    key={phase.phaseNumber}
                    className="bg-slate-950 border border-slate-800/90 rounded-xl p-3.5 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Phase {phase.phaseNumber} · {phase.daysRange}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white">
                      {phase.title}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-snug">
                      <strong className="text-slate-300">Focus: </strong>{phase.focusArea}
                    </div>
                    <div className="pt-1.5 border-t border-slate-800/60 space-y-1">
                      {phase.sequenceSteps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                          <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Competencies & Learning Outcomes */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Competencies You Will Master
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {course.learningOutcomes.map((outcome, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 flex items-start gap-2 text-slate-300"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Syllabus Structure */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Full Curriculum & Video Lessons</span>
            </h4>

            <div className="space-y-3">
              {course.modules.map(mod => (
                <div key={mod.id} className="bg-slate-950 border border-slate-800 rounded-lg p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>{mod.title}</span>
                    <span className="text-slate-500 font-mono text-[11px]">{mod.lessons.length} Lessons</span>
                  </div>

                  <div className="divide-y divide-slate-800/50">
                    {mod.lessons.map(les => (
                      <div key={les.id} className="py-2 flex items-center justify-between text-xs text-slate-300">
                        <div className="flex items-center gap-2">
                          <PlayCircle className="w-3.5 h-3.5 text-slate-500" />
                          <span>{les.title}</span>
                          {les.isPreview && (
                            <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">
                              Free Preview
                            </span>
                          )}
                        </div>
                        <span className="text-slate-500 font-mono text-[11px]">{les.durationMinutes} min</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between">
          <div>
            <div className="text-xl font-bold font-mono text-white">
              ₹{course.fee.toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] text-slate-400">All modules, video stream & certificate included</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedCourseForDetails(null)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors"
            >
              Close
            </button>

            {isEnrolled ? (
              <button
                onClick={() => {
                  setSelectedCourseForDetails(null);
                  const firstMod = course.modules[0];
                  const firstLes = firstMod?.lessons[0];
                  if (firstMod && firstLes) {
                    setActivePlayerState({ course, module: firstMod, lesson: firstLes });
                  }
                }}
                className="px-5 py-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Go to Learning Player</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setSelectedCourseForDetails(null);
                  handleEnrollClick(course);
                }}
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
              >
                <QrCode className="w-4 h-4" />
                <span>Enroll via UPI QR (₹{course.fee.toLocaleString('en-IN')})</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
