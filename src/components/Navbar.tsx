import React from 'react';
import { useLMS } from '../context/LMSContext';
import {
  BookOpen,
  Award,
  PhoneCall,
  User,
  ShieldCheck,
  Briefcase,
  LogOut,
  Clock,
  Building,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'courses' | 'about' | 'placement' | 'dashboard' | 'admin';
  setCurrentTab: (tab: 'courses' | 'about' | 'placement' | 'dashboard' | 'admin') => void;
  onOpenAuth: () => void;
  onOpenFranchise: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenAuth,
  onOpenFranchise
}) => {
  const {
    currentUser,
    isLoggedIn,
    activeRole,
    enrollments,
    setIsVerifierOpen,
    logoutUser,
    websiteSettings,
    customPages,
    activeCustomPageSlug,
    setActiveCustomPageSlug
  } = useLMS();

  const activeEnrollmentsCount = enrollments.filter(e => e.studentId === currentUser.id).length;
  const isAdmin = currentUser.role === 'admin' || activeRole === 'admin';
  const isTeacher = currentUser.role === 'teacher' || activeRole === 'teacher';

  const headerPages = customPages.filter(p => p.isPublished && p.showInHeader);

  return (
    <header className="sticky top-0 z-40 bg-[#0B0F19]/95 backdrop-blur-md border-b border-slate-800">
      {/* Top Bar Announcement: Live Ticker & Helpline */}
      {websiteSettings.bannerAlertActive && (
        <div className="bg-gradient-to-r from-amber-600/90 via-orange-600/90 to-amber-700/90 px-4 py-1.5 text-xs text-white flex items-center justify-between font-sans shadow-inner">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3 text-[11px] sm:text-xs">
            <div className="flex items-center gap-2 truncate">
              <span className="font-bold bg-black/30 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider shrink-0">
                Notice
              </span>
              <span className="truncate font-medium">
                {websiteSettings.announcementTicker}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={`tel:${websiteSettings.helplinePhone}`}
                className="flex items-center gap-1 font-mono font-bold hover:underline bg-white/10 px-2 py-0.5 rounded"
              >
                <PhoneCall className="w-3 h-3" />
                <span>{websiteSettings.helplinePhone}</span>
              </a>
              <button
                onClick={onOpenFranchise}
                className="hidden sm:inline-block font-semibold underline text-amber-100 hover:text-white cursor-pointer"
              >
                Franchise Center
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element Brand Wordmark with Hindi Slogan */}
          <button
            onClick={() => setCurrentTab('courses')}
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center text-slate-950 font-bold font-display text-xl shadow-md shrink-0">
              H
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white font-display">
                  HunarSetu
                </span>
                {!isLoggedIn && (
                  <span className="text-[10px] bg-amber-400/20 text-amber-300 font-mono font-bold px-1.5 py-0.2 rounded border border-amber-400/30">
                    A Skill Bridge
                  </span>
                )}
              </div>
              <div className="text-[10px] text-amber-300 font-semibold tracking-wide leading-none pt-0.5">
                हुनर से रोज़गार तक
              </div>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => setCurrentTab('courses')}
              className={`transition-colors relative py-1 focus:outline-none cursor-pointer ${
                currentTab === 'courses' ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Courses & Fees
              {currentTab === 'courses' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setCurrentTab('about')}
              className={`transition-colors relative py-1 focus:outline-none cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'about' ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>About Us</span>
              {currentTab === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setCurrentTab('placement')}
              className={`transition-colors relative py-1 focus:outline-none cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'placement' ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-slate-400" />
              <span>Placements</span>
              {currentTab === 'placement' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
              )}
            </button>

            <a
              href="#training-plan"
              onClick={() => {
                if (currentTab !== 'courses') setCurrentTab('courses');
              }}
              className="text-slate-300 hover:text-white transition-colors py-1 flex items-center gap-1.5 cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Training Plan</span>
            </a>

            <button
              onClick={() => setIsVerifierOpen(true)}
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 py-1 focus:outline-none cursor-pointer"
            >
              <Award className="w-4 h-4 text-slate-400" />
              <span>Verify Certificate</span>
            </button>

            {/* Dynamic Custom Pages published by Admin */}
            {headerPages.map(page => (
              <button
                key={page.id}
                onClick={() => setActiveCustomPageSlug(page.slug)}
                className={`transition-colors relative py-1 focus:outline-none cursor-pointer ${
                  activeCustomPageSlug === page.slug ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>{page.title.split(' ')[0]} {page.title.split(' ')[1] || ''}</span>
                {activeCustomPageSlug === page.slug && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            ))}

            {/* Dashboard / Teacher Portal Tab (Only visible when logged in) */}
            {isLoggedIn && !isAdmin && (
              <button
                onClick={() => setCurrentTab('dashboard')}
                className={`transition-colors relative py-1 focus:outline-none flex items-center gap-1.5 cursor-pointer ${
                  currentTab === 'dashboard' ? 'text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                {isTeacher ? (
                  <>
                    <GraduationCap className="w-4 h-4 text-amber-400" />
                    <span>Teacher Portal</span>
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4" />
                    <span>Dashboard</span>
                    {activeEnrollmentsCount > 0 && (
                      <span className="text-xs bg-amber-500/20 text-amber-300 font-mono px-1.5 py-0.2 rounded-full border border-amber-500/30">
                        {activeEnrollmentsCount}
                      </span>
                    )}
                  </>
                )}
                {currentTab === 'dashboard' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            )}

            {/* Admin Management tab only visible to authenticated Admin */}
            {isAdmin && (
              <button
                onClick={() => setCurrentTab('admin')}
                className={`transition-colors relative py-1 focus:outline-none flex items-center gap-1.5 text-amber-300 cursor-pointer ${
                  currentTab === 'admin' ? 'text-amber-400 font-semibold' : 'hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Admin Management</span>
                {currentTab === 'admin' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            )}
          </nav>

          {/* Zone 3: Primary Actions (Authentication only, no theme switcher) */}
          <div className="flex items-center gap-2.5">
            {/* Quick About & Placement links for medium screens */}
            <div className="flex lg:hidden items-center gap-1.5 text-xs">
              <button
                onClick={() => setCurrentTab('about')}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  currentTab === 'about' ? 'text-amber-400 font-bold' : 'text-slate-300'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setCurrentTab('placement')}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  currentTab === 'placement' ? 'text-amber-400 font-bold' : 'text-slate-300'
                }`}
              >
                Placement
              </button>
              {isLoggedIn && (
                <button
                  onClick={() => setCurrentTab(isAdmin ? 'admin' : 'dashboard')}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    currentTab === 'dashboard' || currentTab === 'admin' ? 'text-amber-400 font-bold' : 'text-slate-300'
                  }`}
                >
                  {isAdmin ? 'Admin' : isTeacher ? 'Teacher' : 'Dashboard'}
                </button>
              )}
            </div>

            {/* Authentication: Only Login when logged out, Identity Badge + Logout when logged in */}
            {!isLoggedIn ? (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                {/* User Identity Badge */}
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300">
                  <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-[10px] font-bold shrink-0">
                    {currentUser.name ? currentUser.name[0] : 'U'}
                  </div>
                  <span className="max-w-[110px] truncate hidden sm:inline">
                    {currentUser.name ? currentUser.name.split(' ')[0] : 'User'}
                  </span>
                  <span className="text-[9px] uppercase px-1 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono hidden md:inline">
                    {isAdmin ? 'Admin' : isTeacher ? 'Teacher' : 'Student'}
                  </span>
                  {!isAdmin && !isTeacher && currentUser.id && (
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/30 hidden sm:inline">
                      {currentUser.id}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => {
                    logoutUser();
                    setCurrentTab('courses');
                  }}
                  title="Logout from Account"
                  className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-800 hover:border-red-500/30 transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-400" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
