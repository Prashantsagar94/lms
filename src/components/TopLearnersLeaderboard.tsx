import React, { useState } from 'react';
import { useLMS } from '../context/LMSContext';
import { LeaderboardLearner } from '../types';
import { INITIAL_TOP_LEARNERS } from '../data/coursesData';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Award,
  Sparkles,
  Zap,
  Flame,
  CheckCircle2,
  Clock,
  ThumbsUp,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Star
} from 'lucide-react';

export const TopLearnersLeaderboard: React.FC = () => {
  const { currentUser, enrollments, courses } = useLMS();

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('All');
  const [learners, setLearners] = useState<LeaderboardLearner[]>(() => {
    // Check current student enrollments and inject current user into leaderboard
    const userEnrollment = enrollments.find(e => e.studentId === currentUser.id);
    const userCourse = userEnrollment ? courses.find(c => c.id === userEnrollment.courseId) : null;

    const totalCourseLessons = userCourse ? userCourse.modules.reduce((s, m) => s + m.lessons.length, 0) : 9;
    const completedLessons = userEnrollment ? userEnrollment.completedLessonIds.length : 2;
    const passedQuizzes = userEnrollment ? userEnrollment.passedQuizIds.length : 1;
    const totalQuizzes = userCourse ? userCourse.modules.filter(m => m.quiz).length : 2;

    const userQuizScore = totalQuizzes > 0 ? Math.round((passedQuizzes / totalQuizzes) * 96) : 90;
    const userDays = userEnrollment && userEnrollment.status === 'COMPLETED' ? 24 : 27;

    const currentUserLearner: LeaderboardLearner = {
      id: currentUser.id,
      rank: 4,
      name: currentUser.name || 'Pooja Verma',
      city: 'Barabanki, UP',
      avatarUrl: currentUser.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80',
      courseId: userCourse ? userCourse.id : 'silai-machine-operator',
      courseTitle: userCourse ? userCourse.title : 'Silai Machine Operator (Garment Making)',
      category: userCourse ? userCourse.category : 'Garment Making',
      completionDays: userDays,
      totalCourseDays: userCourse ? userCourse.durationDays : 30,
      quizScorePercent: Math.max(userQuizScore, 91),
      lessonsCompleted: completedLessons,
      totalLessons: totalCourseLessons,
      badge: 'Active Star Artisan 🌟',
      kudosCount: 48,
      isCurrentUser: true
    };

    // Merge and sort
    const all = [...INITIAL_TOP_LEARNERS];
    // Replace rank 4 with current user or insert appropriately
    const existingIndex = all.findIndex(l => l.name.toLowerCase() === currentUser.name.toLowerCase());
    if (existingIndex >= 0) {
      all[existingIndex] = { ...currentUserLearner, rank: existingIndex + 1 };
    } else {
      all.splice(3, 0, currentUserLearner);
    }

    // Re-index ranks
    return all.map((item, idx) => ({ ...item, rank: idx + 1 }));
  });

  const categories = [
    'All',
    'Garment Making',
    'Embroidery',
    'Mehndi Art',
    'Beauty & Wellness',
    'Combo Package'
  ];

  const filteredLearners = learners.filter(l =>
    activeCategoryFilter === 'All' ? true : l.category === activeCategoryFilter
  );

  const topThree = filteredLearners.slice(0, 3);
  const remainingLearners = filteredLearners.slice(3);

  const currentUserStanding = learners.find(l => l.isCurrentUser || l.name === currentUser.name);

  const handleGiveKudos = (learnerId: string, learnerName: string) => {
    setLearners(prev =>
      prev.map(l => (l.id === learnerId ? { ...l, kudosCount: l.kudosCount + 1 } : l))
    );

    try {
      confetti({
        particleCount: 30,
        spread: 45,
        origin: { y: 0.8 },
        colors: ['#F59E0B', '#10B981', '#F43F5E']
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="space-y-6">
      {/* Hunar Se Rozgar Tak — Animated Skill Bridge Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border border-amber-500/30 rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            {/* Animated Pill with Slogan */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-amber-500/20 border border-amber-400/40 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
              </span>
              <span className="text-sm sm:text-base font-bold text-amber-300 font-sans tracking-wide">
                हुनर से रोज़गार तक
              </span>
              <span className="text-amber-400/60" aria-hidden="true">·</span>
              <span className="text-xs text-amber-200 font-mono font-medium">
                HunarSetu · A Skill Bridge
              </span>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight flex items-center gap-2 flex-wrap">
                <span>Top Vocational Learners Leaderboard</span>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-amber-500/15 text-amber-300 border border-amber-500/30 rounded-lg">
                  Statewide Rank
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Celebrating outstanding trainees across Uttar Pradesh. Ranked live on <strong className="text-white">Curriculum Completion Speed</strong> and <strong className="text-amber-300">Interactive Quiz Mastery</strong>. Top achievers receive direct boutique placement recommendations under Director Prashant Sagar.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1 text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" /> Barabanki Head Office Verified
              </span>
              <span className="text-slate-600">·</span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" /> Updated Daily
              </span>
            </div>
          </div>

          {/* Animated Hunar Setu "A Skill Bridge" Graphic */}
          <div className="w-full lg:w-auto shrink-0 flex flex-col items-center">
            <div className="relative w-72 sm:w-80 h-32 bg-slate-950/80 rounded-2xl border border-amber-500/30 p-3 shadow-inner flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between text-[11px] font-bold font-mono px-2 z-10">
                <span className="text-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> हुनर (Skill)
                </span>
                <span className="text-emerald-400 flex items-center gap-1">
                  रोज़गार (Career) <Trophy className="w-3 h-3 text-emerald-400" />
                </span>
              </div>

              {/* Animated Bridge SVG */}
              <div className="relative h-14 w-full flex items-center justify-center">
                <svg viewBox="0 0 260 50" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="50%" stopColor="#FBBF24" />
                      <stop offset="100%" stopColor="#10B981" />
                    </linearGradient>
                    <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Bridge Main Arch Roadway */}
                  <path
                    d="M 15 42 Q 130 18 245 42"
                    fill="none"
                    stroke="url(#bridgeGradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Suspension Cable Ties */}
                  <line x1="60" y1="34" x2="60" y2="42" stroke="#F59E0B" strokeWidth="1.2" opacity="0.7" />
                  <line x1="95" y1="27" x2="95" y2="42" stroke="#FBBF24" strokeWidth="1.2" opacity="0.8" />
                  <line x1="130" y1="24" x2="130" y2="42" stroke="#FDE047" strokeWidth="1.5" opacity="0.9" />
                  <line x1="165" y1="27" x2="165" y2="42" stroke="#34D399" strokeWidth="1.2" opacity="0.8" />
                  <line x1="200" y1="34" x2="200" y2="42" stroke="#10B981" strokeWidth="1.2" opacity="0.7" />

                  {/* Bridge Pillars */}
                  <rect x="10" y="24" width="8" height="22" rx="2" fill="#D97706" />
                  <rect x="242" y="24" width="8" height="22" rx="2" fill="#059669" />

                  {/* Animated Light Pulse traveling across the bridge */}
                  <circle cx="15" cy="42" r="3.5" fill="#FFFFFF">
                    <animateMotion
                      path="M 15 42 Q 130 18 245 42"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <circle cx="15" cy="42" r="6" fill="#FDE047" opacity="0.5">
                    <animateMotion
                      path="M 15 42 Q 130 18 245 42"
                      dur="2.4s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </div>

              {/* Tagline Footer inside Bridge Card */}
              <div className="text-center text-[10px] text-amber-200/90 font-mono tracking-wider pt-0.5 border-t border-slate-800/80">
                HUNARSETU · A SKILL BRIDGE TO SELF-EMPLOYMENT
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-900 border border-slate-800 rounded-xl scrollbar-thin">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeCategoryFilter === cat
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Current Student's Quick Position Indicator */}
        {currentUserStanding && (
          <div className="bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-xl text-xs text-amber-300 flex items-center gap-2 font-mono">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>
              Your Rank: <strong className="text-white">#{currentUserStanding.rank}</strong> ({currentUserStanding.quizScorePercent}% Quiz Score)
            </span>
          </div>
        )}
      </div>

      {/* Top 3 Podium (Gold, Silver, Bronze) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {topThree.map(learner => {
          const isRank1 = learner.rank === 1;
          const isRank2 = learner.rank === 2;
          const isRank3 = learner.rank === 3;

          return (
            <div
              key={learner.id}
              className={`rounded-2xl p-6 relative overflow-hidden transition-all duration-200 border flex flex-col justify-between ${
                isRank1
                  ? 'bg-gradient-to-b from-amber-950/70 via-slate-900 to-slate-950 border-amber-400/50 shadow-amber-500/10 shadow-xl md:-translate-y-2'
                  : isRank2
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-slate-700/80 shadow-lg'
                  : 'bg-gradient-to-b from-amber-950/30 via-slate-900 to-slate-950 border-amber-700/40 shadow-lg'
              }`}
            >
              {/* Top Badge */}
              <div className="flex items-center justify-between">
                <div
                  className={`w-9 h-9 rounded-xl font-bold font-mono text-sm flex items-center justify-center shadow-md ${
                    isRank1
                      ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950'
                      : isRank2
                      ? 'bg-gradient-to-tr from-slate-300 to-slate-100 text-slate-950'
                      : 'bg-gradient-to-tr from-amber-700 to-amber-500 text-white'
                  }`}
                >
                  #{learner.rank}
                </div>

                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full border font-mono ${
                    isRank1
                      ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                      : isRank2
                      ? 'bg-slate-300/20 text-slate-200 border-slate-400/30'
                      : 'bg-amber-700/20 text-amber-300 border-amber-700/40'
                  }`}
                >
                  {isRank1 ? '🥇 Gold Champion' : isRank2 ? '🥈 Silver Achiever' : '🥉 Bronze Medalist'}
                </span>
              </div>

              {/* Student Identity */}
              <div className="flex items-center gap-3.5 my-4">
                <div className="relative">
                  <img
                    src={learner.avatarUrl}
                    alt={learner.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-400/40 shadow-md"
                  />
                  {isRank1 && (
                    <span className="absolute -top-2 -right-1 text-base">👑</span>
                  )}
                </div>

                <div className="space-y-0.5 truncate">
                  <h4 className="text-base font-bold font-display text-white truncate flex items-center gap-1.5">
                    <span>{learner.name}</span>
                    {learner.isCurrentUser && (
                      <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded font-mono font-bold">
                        YOU
                      </span>
                    )}
                  </h4>
                  <div className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{learner.city}</span>
                  </div>
                  <div className="text-[11px] text-amber-400/90 font-medium truncate">
                    {learner.courseTitle}
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5 bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">COMPLETION TIME</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{learner.completionDays} Days</span>
                    <span className="text-[10px] text-slate-500 font-normal">/{learner.totalCourseDays}D</span>
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">QUIZ PERFORMANCE</span>
                  <span className="font-bold text-amber-400 flex items-center gap-1 mt-0.5 font-mono">
                    <Zap className="w-3 h-3 text-amber-400" />
                    <span>{learner.quizScorePercent}% Accuracy</span>
                  </span>
                </div>
              </div>

              {/* Kudos & Distinction Badge */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-300 font-medium truncate max-w-[170px]">
                  {learner.badge}
                </span>

                <button
                  onClick={() => handleGiveKudos(learner.id, learner.name)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Applaud learner"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{learner.kudosCount}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard Table (Ranks 4+) */}
      {remainingLearners.length > 0 && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-lg space-y-4">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Vocational Honor Roll (Ranks 4 — {learners.length})</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Evaluated on Practical Speed & Quiz Marks
            </span>
          </div>

          <div className="divide-y divide-slate-800/60 overflow-x-auto">
            {remainingLearners.map(learner => (
              <div
                key={learner.id}
                className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                  learner.isCurrentUser
                    ? 'bg-amber-500/10 hover:bg-amber-500/15 border-l-4 border-l-amber-400'
                    : 'hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-[240px]">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    #{learner.rank}
                  </div>

                  <img
                    src={learner.avatarUrl}
                    alt={learner.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-700 shrink-0"
                  />

                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {learner.name}
                      </h4>
                      {learner.isCurrentUser && (
                        <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-1.5 py-0.2 rounded font-mono">
                          YOU
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      {learner.city} · <span className="text-amber-400">{learner.courseTitle}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 sm:gap-8 justify-between sm:justify-end text-xs">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 block font-mono">SPEED</span>
                    <span className="font-bold text-emerald-400 font-mono">
                      {learner.completionDays} Days <span className="text-slate-500 text-[10px]">/{learner.totalCourseDays}D</span>
                    </span>
                  </div>

                  <div className="text-left sm:text-right min-w-[85px]">
                    <span className="text-[10px] text-slate-400 block font-mono">QUIZ SCORE</span>
                    <span className="font-bold text-amber-300 font-mono flex items-center sm:justify-end gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {learner.quizScorePercent}%
                    </span>
                  </div>

                  <div className="shrink-0">
                    <button
                      onClick={() => handleGiveKudos(learner.id, learner.name)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{learner.kudosCount}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Motivational Bottom Callout */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-emerald-500/10 border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-sans">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
            PS
          </div>
          <div>
            <strong className="text-amber-300">Director's Encouragement · Prashant Sagar:</strong>
            <p className="text-slate-400 mt-0.5">
              "Master every practical seam and score 90%+ on quizzes to move up into the State Top 3. Your dedication builds the bridge from skill to financial freedom."
            </p>
          </div>
        </div>

        <div className="text-emerald-400 font-mono text-[11px] shrink-0 font-bold">
          7800897677 · Barabanki Head Office
        </div>
      </div>
    </div>
  );
};
