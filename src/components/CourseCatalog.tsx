import React, { useState } from 'react';
import { useLMS } from '../context/LMSContext';
import {
  Sparkles,
  PhoneCall,
  Check,
  PlayCircle,
  Clock,
  ArrowRight,
  Search,
  BookOpen,
  Briefcase,
  Star,
  Building,
  GraduationCap,
  Award,
  Users,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import {
  JOB_ROLES,
  STUDENT_TESTIMONIALS,
  FRANCHISE_INFO,
  DIRECTOR_INFO
} from '../data/coursesData';

interface CourseCatalogProps {
  onOpenDashboard: () => void;
  onOpenFranchise: () => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({
  onOpenDashboard,
  onOpenFranchise
}) => {
  const {
    courses,
    setSelectedCourseForDetails,
    setPaymentModalCourse,
    getCourseEnrollment,
    setActivePlayerState,
    websiteSettings,
    handleEnrollClick
  } = useLMS();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoadmapCourseId, setSelectedRoadmapCourseId] = useState<string>(courses[0]?.id || 'silai-machine-operator');
  const [openFaqId, setOpenFaqId] = useState<number | null>(0);

  const categories = [
    'All',
    'Garment Making',
    'Embroidery',
    'Mehndi Art',
    'Beauty & Wellness',
    'Combo Package'
  ];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCourseThematicVisual = (courseId: string) => {
    switch (courseId) {
      case 'silai-machine-operator':
        return {
          gradient: 'from-amber-900/60 via-amber-800/40 to-slate-900',
          accent: 'text-amber-400',
          tagBg: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
          glyph: '✂️'
        };
      case 'hand-embroidery-zardozi':
        return {
          gradient: 'from-emerald-950/60 via-teal-900/40 to-slate-900',
          accent: 'text-emerald-400',
          tagBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
          glyph: '🪡'
        };
      case 'mehndi-art-bridal-designing':
        return {
          gradient: 'from-orange-950/60 via-amber-900/40 to-slate-900',
          accent: 'text-orange-400',
          tagBg: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
          glyph: '🌿'
        };
      case 'beauty-wellness-professional':
        return {
          gradient: 'from-rose-950/60 via-pink-900/40 to-slate-900',
          accent: 'text-rose-400',
          tagBg: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
          glyph: '✨'
        };
      case 'boutique-master-combo':
        return {
          gradient: 'from-indigo-950/60 via-purple-900/40 to-slate-900',
          accent: 'text-indigo-400',
          tagBg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
          glyph: '👗'
        };
      case 'bridal-studio-combo':
        return {
          gradient: 'from-red-950/60 via-amber-900/40 to-slate-900',
          accent: 'text-amber-400',
          tagBg: 'bg-red-500/10 text-amber-300 border-red-500/20',
          glyph: '👑'
        };
      default:
        return {
          gradient: 'from-slate-800 to-slate-900',
          accent: 'text-amber-400',
          tagBg: 'bg-slate-700 text-slate-300 border-slate-600',
          glyph: '🎓'
        };
    }
  };

  return (
    <div className="space-y-16 pb-16 font-sans">
      {/* Hero Section with Bright Warm Indian Aesthetics */}
      <section className="relative overflow-hidden pt-10 pb-16 border-b border-slate-800 bg-gradient-to-b from-[#131929] via-[#0D121F] to-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              {/* Clean unboxed metadata kicker */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-amber-400 font-medium tracking-wide">
                <span>National Vocational Skilling Mission</span>
                <span aria-hidden="true">·</span>
                <span>Barabanki Head Office</span>
                <span aria-hidden="true">·</span>
                <span>Director: {websiteSettings.directorName}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white leading-tight">
                {websiteSettings.heroHeadline || 'Skill Development & Vocational Training Programme'}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-sans">
                {websiteSettings.heroSubheadline || 'Comprehensive training in Garment Making, Zardozi Embroidery, Bridal Mehndi, and Beauty Wellness. Learn directly from certified master instructors with video lessons, practical assessments, and verified certifications.'}
              </p>

              {/* Core Quality highlights with live stats from manual feeding */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-slate-200 bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/80">
                  <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Practical Craft Curriculum</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200 bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/80">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{websiteSettings.statsSkillCertificates.toLocaleString('en-IN')}+ Certificates Issued</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200 bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/80">
                  <Users className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{websiteSettings.statsTrainedStudents.toLocaleString('en-IN')}+ Enrolled Students</span>
                </div>
              </div>
            </div>

            {/* Quick Pricing Summary Card */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-amber-950/20 border border-slate-800 rounded-xl p-6 shadow-2xl relative backdrop-blur-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-base font-semibold text-white font-display">
                      Official Training Programme Fees
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Subsidized vocational course fee schedule
                    </p>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded">
                    Batch 2026-27
                  </span>
                </div>

                <div className="mt-4 divide-y divide-slate-800/60 text-xs">
                  {courses.slice(0, 6).map((c) => {
                    const isCombo = c.category === 'Combo Package';
                    return (
                      <div
                        key={c.id}
                        className={`py-2.5 flex items-center justify-between ${
                          isCombo ? 'bg-amber-500/10 -mx-2 px-2 rounded' : ''
                        }`}
                      >
                        <div className="pr-2 min-w-0">
                          <span className={`font-medium truncate block ${isCombo ? 'text-amber-200' : 'text-slate-200'}`}>
                            {c.title}
                          </span>
                          <div className="text-[11px] text-slate-400 font-mono">
                            {c.durationDays} Days Duration {isCombo ? '· High-Earner Track' : ''}
                          </div>
                        </div>
                        <span className={`text-sm font-semibold font-mono shrink-0 ${isCombo ? 'text-amber-300' : 'text-amber-400'}`}>
                          ₹{c.fee.toLocaleString('en-IN')}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Barabanki Head Office · Director: Prashant Sagar</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <Check className="w-3.5 h-3.5" /> Direct Enrollment
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Franchise Partner Banner Section with Mobile 7800897677 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-amber-400/30">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-200">
              <Building className="w-4 h-4" />
              <span>Franchise Opportunity · Barabanki Head Office</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display leading-snug">
              Become a HunarSetu Franchise / Training Center Partner
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
              Launch a certified vocational training center in your district or tehsil. Full curriculum support, machinery guidance, exams, and government-aligned certifications provided under Director Prashant Sagar.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="tel:7800897677"
              className="px-5 py-3 bg-slate-950 hover:bg-slate-900 text-amber-300 font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors border border-amber-500/40"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-sm">Call 7800897677</span>
            </a>

            <button
              onClick={onOpenFranchise}
              className="px-5 py-3 bg-white text-slate-950 hover:bg-amber-100 font-bold text-xs rounded-xl transition-colors shadow-lg flex items-center justify-center gap-1.5"
            >
              <span>Partner Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Course Showcase & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-display text-white">
              Vocational Training Courses
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Select your skill trade to enroll, study step-by-step videos, and earn accredited certification.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search course or skill..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-lg border border-slate-800 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap focus:outline-none ${
                activeCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => {
            const visual = getCourseThematicVisual(course.id);
            const enrollment = getCourseEnrollment(course.id);
            const isEnrolled = !!enrollment;

            return (
              <div
                key={course.id}
                className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all duration-200 group"
              >
                {/* Visual Header Banner */}
                <div
                  className={`h-40 bg-gradient-to-br ${visual.gradient} p-5 flex flex-col justify-between relative border-b border-slate-800/80`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{visual.glyph}</span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-300 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-700/60">
                      {course.category}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] text-amber-300 font-medium block truncate">
                      {course.hindiTitle}
                    </span>
                    <h3 className="text-lg font-bold font-display text-white group-hover:text-amber-300 transition-colors leading-snug line-clamp-2">
                      {course.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  {/* Metadata */}
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      <strong className="text-slate-200 font-mono">{course.durationDays} Days</strong>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{course.modules.length} Modules</span>
                    <span aria-hidden="true">·</span>
                    <span>{course.level}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {course.shortDescription}
                  </p>

                  {/* Syllabus Highlights */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Practical Curriculum Highlights
                    </div>
                    {course.learningOutcomes.slice(0, 2).map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{outcome}</span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold font-mono text-white">
                          ₹{course.fee.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-500 line-through font-mono">
                          ₹{course.originalFee.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-medium">
                        {Math.round(((course.originalFee - course.fee) / course.originalFee) * 100)}% Subsidized
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedCourseForDetails(course)}
                        title="View Full Syllabus"
                        className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors focus:outline-none"
                      >
                        Syllabus
                      </button>

                      {isEnrolled ? (
                        <button
                          onClick={() => {
                            const firstMod = course.modules[0];
                            const firstLesson = firstMod?.lessons[0];
                            if (firstMod && firstLesson) {
                              setActivePlayerState({
                                course,
                                module: firstMod,
                                lesson: firstLesson
                              });
                            } else {
                              onOpenDashboard();
                            }
                          }}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center gap-1.5 focus:outline-none"
                        >
                          <PlayCircle className="w-3.5 h-3.5" />
                          <span>Learn Now</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEnrollClick(course)}
                          className="px-4 py-1.5 rounded-lg text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center gap-1.5 focus:outline-none shadow-sm cursor-pointer"
                        >
                          <span>Enroll Now</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Structured Training Sequence & Training Plan Roadmap Section */}
      <section id="training-plan" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Vocational Training Sequence & Practical Roadmap</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
              Curriculum Training Sequence & Training Plan
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Step-by-step practical training roadmap designed by Director Prashant Sagar. Follow the hands-on sequence from machine setup to client fitting trials and licensing examinations.
            </p>
          </div>

          <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5 self-start md:self-auto shrink-0">
            <Check className="w-3.5 h-3.5" /> Barabanki Head Office Certified Plan
          </span>
        </div>

        {/* Trade Selection Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {courses.map(c => {
            const isSelected = c.id === selectedRoadmapCourseId;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedRoadmapCourseId(c.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-amber-400/20 shadow-md'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{c.title.split('(')[0].trim()}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-black/20 text-slate-900' : 'bg-slate-800 text-amber-400'
                  }`}
                >
                  {c.durationDays}D
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Selected Course Roadmap Showcase */}
        {(() => {
          const currentRoadmap = courses.find(c => c.id === selectedRoadmapCourseId) || courses[0];
          if (!currentRoadmap) return null;
          const planPhases = currentRoadmap.trainingPlan || [];

          return (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl space-y-6">
              {/* Course Top Highlight Banner with Image */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/30 border-b border-slate-800">
                <div className="lg:col-span-4 rounded-xl overflow-hidden border border-slate-800 shadow-md aspect-video sm:aspect-4/3 relative group">
                  <img
                    src={currentRoadmap.imageUrl || 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80'}
                    alt={currentRoadmap.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded text-amber-300 font-mono font-bold border border-amber-500/30">
                      {currentRoadmap.durationDays} Days Training
                    </span>
                    <span className="bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded text-emerald-400 font-mono font-bold border border-emerald-500/30">
                      ₹{currentRoadmap.fee.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-amber-400 font-mono font-semibold uppercase tracking-wider">
                        {currentRoadmap.category}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-400 font-mono">{currentRoadmap.modules.length} Modules</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-emerald-400 font-medium">Placement & Self-Employment Track</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                      {currentRoadmap.title}
                    </h3>
                    <p className="text-xs text-amber-300 font-medium">
                      {currentRoadmap.hindiTitle}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                      {currentRoadmap.fullDescription}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
                    <div className="text-xs text-slate-400">
                      <span>Training Director: </span>
                      <strong className="text-white">Prashant Sagar (Barabanki Head Office)</strong>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedCourseForDetails(currentRoadmap)}
                        className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Detailed Syllabus
                      </button>

                      <button
                        onClick={() => handleEnrollClick(currentRoadmap)}
                        className="px-5 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Enroll Now (₹{currentRoadmap.fee})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4-Phase Step-by-Step Training Sequence Breakdown */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span>Four-Phase Practical Training Sequence & Sequence Steps</span>
                  </h4>
                  <span className="text-xs text-slate-400 font-mono">
                    Total Duration: {currentRoadmap.durationDays} Days Practical Fieldwork
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {planPhases.map(phase => (
                    <div
                      key={phase.phaseNumber}
                      className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3.5 hover:border-slate-700 transition-colors relative"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold font-mono flex items-center justify-center border border-amber-400/30">
                              {phase.phaseNumber}
                            </span>
                            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                              {phase.daysRange}
                            </span>
                          </div>
                          <h5 className="text-sm font-bold text-white font-display pt-1">
                            {phase.title}
                          </h5>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-xs text-slate-300">
                        <span className="font-semibold text-slate-400 block text-[10px] uppercase">
                          Workshop Focus:
                        </span>
                        <p className="mt-0.5 text-slate-200">{phase.focusArea}</p>
                      </div>

                      <div className="space-y-2 pt-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Training Sequence Milestones:
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {phase.sequenceSteps.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5 font-bold">
                                {idx + 1}
                              </span>
                              <span className="leading-snug">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </section>

      {/* Career & High-Earning Job Roles Section */}
      <section id="career-roles" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">
              <Briefcase className="w-4 h-4" />
              <span>Employment & Self-Employment Opportunities</span>
            </div>
            <h2 className="text-2xl font-bold font-display text-white mt-1">
              Career Pathways & Expected Monthly Earnings
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Equipping youth and women with marketable hands-on skills for industrial manufacturing, bridal salons, and self-owned boutiques.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {JOB_ROLES.map(role => (
            <div
              key={role.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4 hover:border-amber-500/50 transition-colors shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{role.icon}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
                  Demand: {role.demandLevel}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-amber-400 font-medium">
                  {role.category}
                </span>
                <h3 className="text-base font-bold font-display text-white mt-0.5">
                  {role.roleTitle}
                </h3>
              </div>

              {/* Salary Highlight */}
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase">Estimated Earning Potential</div>
                <div className="text-base font-bold font-mono text-amber-400 mt-0.5">
                  {role.salaryRange}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {role.description}
              </p>

              <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
                <div className="font-semibold text-slate-300 text-[11px]">Hiring Ecosystem:</div>
                <div className="text-[11px] text-slate-400 font-sans">{role.hiringPartners}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Student Pictures Testimonials Section */}
      <section id="student-testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>Success Stories from Uttar Pradesh & Across India</span>
          </div>
          <h2 className="text-2xl font-bold font-display text-white mt-1">
            What Our Certified Students Say
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real stories of financial independence and boutique businesses launched by our alumni.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STUDENT_TESTIMONIALS.map(t => (
            <div
              key={t.id}
              className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between hover:border-slate-700 transition-colors shadow-lg"
            >
              <div className="space-y-3">
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              {/* Student Profile with photo */}
              <div className="pt-3 border-t border-slate-800 flex items-center gap-3">
                <img
                  src={t.avatarUrl}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-500/40 shrink-0"
                />
                <div className="truncate">
                  <h4 className="text-xs font-bold text-white truncate">{t.name}</h4>
                  <div className="text-[10px] text-slate-400 truncate">{t.city}</div>
                  <div className="text-[10px] font-semibold text-emerald-400 font-mono mt-0.5 truncate">
                    {t.incomeImpact}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions Section (Enrollment & Certification) */}
      <section id="faq-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Clear guidelines on enrollment, payment with UPI QR, digital classroom access, assessments, and government-recognized certifications.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-3">
          {[
            {
              question: 'How do I enroll in a course and what payment options are accepted?',
              answer: 'Choose your desired vocational program from the catalog and click "Enroll Now". You can pay securely using our instant Dynamic UPI QR code (compatible with PhonePe, Google Pay, Paytm, BHIM) or enter your UPI ID. Once the payment is completed, submit your 12-digit UTR/UPI reference number to immediately unlock all video lessons and curriculum modules.'
            },
            {
              question: 'How will I receive my login ID and password if enrolled by admin or a franchise center?',
              answer: 'When the academy administrator or your local franchise training center registers your admission, a permanent Student ID (e.g. STU-2026-01) and temporary password are generated. You can log in using either your Student ID or your registered email address on the unified Login portal to start your lessons immediately.'
            },
            {
              question: 'Can I watch video lessons at any time, and why is downloading disabled?',
              answer: 'Yes! All video masterclasses are available 24/7 on your student dashboard across smartphones, tablets, and laptops. To safeguard the proprietary craftsmanship curriculum developed under Director Prashant Sagar, video downloading and offline screen recording are restricted with real-time dynamic watermarking.'
            },
            {
              question: 'How do practical module quizzes and assessment passing marks work?',
              answer: 'Each phase in your training plan contains an interactive module assessment covering technical stitch measurements, needle sizing, fabric handling, and client styling. The passing score is 70%. You receive instant feedback with explanations and can reattempt quizzes to achieve distinction on the statewide Top Learners Leaderboard.'
            },
            {
              question: 'When and how do I receive my official PDF Certificate signed by Director Prashant Sagar?',
              answer: 'Upon finishing all curriculum lessons and clearing the module assessment quizzes (reaching 100% course progress), your official certificate is automatically generated! It bears the signature of Director Prashant Sagar, an embossed holographic gold seal, and an encrypted QR verification code. You can download the high-resolution PDF certificate immediately.'
            },
            {
              question: 'How can employers or institutions verify my certificate?',
              answer: 'Anyone can verify your certificate instantly by clicking "Verify Certificate" on our website navbar or entering your Certificate ID (e.g. HS-CERT-2026-XXXX) into our online registry. The system displays student name, trade category, grade, issue date, and authentic institutional accreditation.'
            },
            {
              question: 'Does HunarSetu provide job placement assistance or salon/boutique tie-ups?',
              answer: 'Yes! Our dedicated Placement Cell partners with regional garment export units, designer boutiques, bridal studios, and wellness centers across Uttar Pradesh and neighboring states. High-performing students receive direct interview recommendations and micro-enterprise guidance to establish independent tailoring and beauty studios.'
            },
            {
              question: 'Can students attend offline practical workshops at the Barabanki Head Office?',
              answer: 'Enrolled students are welcome to participate in weekend hands-on machinery workshops and masterclass demonstrations at the HunarSetu Academy Barabanki Head Office (Uttar Pradesh - 225001). Direct assistance is available through our dedicated student helpline at 7800897677.'
            }
          ].map((faq, idx) => {
            const isOpen = openFaqId === idx;
            return (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 text-sm font-semibold text-slate-200 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center text-xs font-mono shrink-0">
                      {idx + 1}
                    </span>
                    <span>{faq.question}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 bg-slate-950/40">
                    <p className="ml-9">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Director & Head Office Verification Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Leadership & Institutional Governance
            </div>
            <h3 className="text-lg font-bold font-display text-white">
              HunarSetu Academy · Barabanki Head Office
            </h3>
            <p className="text-xs text-slate-400 max-w-xl">
              Under the direct leadership of Director Prashant Sagar, providing vocational skills, industrial apprentice connections, and verified certifications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:7800897677"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center gap-2 transition-colors border border-slate-700"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Contact: 7800897677</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
