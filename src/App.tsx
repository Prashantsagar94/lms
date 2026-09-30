import React, { useState, useEffect } from 'react';
import { LMSProvider, useLMS } from './context/LMSContext';
import { Navbar } from './components/Navbar';
import { CourseCatalog } from './components/CourseCatalog';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminPanel } from './components/AdminPanel';
import { AboutUsPage } from './components/AboutUsPage';
import { PlacementPage } from './components/PlacementPage';
import { VideoPlayerView } from './components/VideoPlayerView';
import { CourseDetailModal } from './components/CourseDetailModal';
import { PaymentModal } from './components/PaymentModal';
import { AssessmentModal } from './components/AssessmentModal';
import { CertificateModal } from './components/CertificateModal';
import { CertificateVerifier } from './components/CertificateVerifier';
import { AuthModal } from './components/AuthModal';
import { StudentRegistrationModal } from './components/StudentRegistrationModal';
import { EmailLogsModal } from './components/EmailLogsModal';
import { FranchiseModal } from './components/FranchiseModal';
import { InteractiveAIBot } from './components/InteractiveAIBot';
import { CustomPageView } from './components/CustomPageView';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const {
    activePlayerState,
    setIsVerifierOpen,
    isLoggedIn,
    currentUser,
    activeRole,
    customPages,
    activeCustomPageSlug,
    setActiveCustomPageSlug
  } = useLMS();
  const [currentTab, setCurrentTab] = useState<'courses' | 'about' | 'placement' | 'dashboard' | 'admin'>('courses');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isFranchiseOpen, setIsFranchiseOpen] = useState(false);

  // When student, teacher, or admin logs out, convert immediately to website courses view
  useEffect(() => {
    if (!isLoggedIn && (currentTab === 'dashboard' || currentTab === 'admin')) {
      setCurrentTab('courses');
    }
  }, [isLoggedIn, currentTab]);

  const isTeacher = currentUser.role === 'teacher' || activeRole === 'teacher';

  const activeCustomPage = activeCustomPageSlug
    ? customPages.find(p => p.slug === activeCustomPageSlug)
    : null;

  // If student is inside the Video Player view, render it full screen for an immersive focused learning experience
  if (activePlayerState) {
    return (
      <div className="min-h-screen bg-[#070A11] flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-200">
        <VideoPlayerView />
        <AssessmentModal />
        <CertificateModal />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-200">
      {/* Top Bar matching Top Bar Contract */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setActiveCustomPageSlug(null);
          setCurrentTab(tab);
        }}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenFranchise={() => setIsFranchiseOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeCustomPage ? (
          <CustomPageView
            page={activeCustomPage}
            onBack={() => setActiveCustomPageSlug(null)}
            onBrowseCourses={() => {
              setActiveCustomPageSlug(null);
              setCurrentTab('courses');
            }}
            onOpenFranchise={() => setIsFranchiseOpen(true)}
          />
        ) : (
          <>
            {currentTab === 'courses' && (
              <CourseCatalog
                onOpenDashboard={() => (isLoggedIn ? setCurrentTab('dashboard') : setIsAuthOpen(true))}
                onOpenFranchise={() => setIsFranchiseOpen(true)}
              />
            )}

            {currentTab === 'about' && (
              <AboutUsPage
                onBrowseCourses={() => setCurrentTab('courses')}
                onOpenFranchise={() => setIsFranchiseOpen(true)}
                onOpenVerifier={() => setIsVerifierOpen(true)}
              />
            )}

            {currentTab === 'placement' && (
              <PlacementPage
                onBrowseCourses={() => setCurrentTab('courses')}
                onOpenFranchise={() => setIsFranchiseOpen(true)}
              />
            )}

            {currentTab === 'dashboard' && (
              isTeacher ? (
                <TeacherDashboard />
              ) : (
                <StudentDashboard onBrowseCourses={() => setCurrentTab('courses')} />
              )
            )}

            {currentTab === 'admin' && <AdminPanel />}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setActiveCustomPageSlug(null);
          setCurrentTab(tab);
        }}
        onOpenVerifier={() => setIsVerifierOpen(true)}
        onOpenFranchise={() => setIsFranchiseOpen(true)}
      />

      {/* Interactive AI Counselor & Leads Generator Bot */}
      <InteractiveAIBot
        onSelectTab={(tab) => {
          setActiveCustomPageSlug(null);
          setCurrentTab(tab);
        }}
        onOpenFranchise={() => setIsFranchiseOpen(true)}
        onOpenVerifier={() => setIsVerifierOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Modals & Overlays */}
      <CourseDetailModal />
      <StudentRegistrationModal onOpenAuth={() => setIsAuthOpen(true)} />
      <PaymentModal />
      <AssessmentModal />
      <CertificateModal />
      <CertificateVerifier />
      <EmailLogsModal />
      <FranchiseModal
        isOpen={isFranchiseOpen}
        onClose={() => setIsFranchiseOpen(false)}
      />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={role => {
          if (role === 'admin') {
            setCurrentTab('admin');
          } else {
            setCurrentTab('dashboard');
          }
        }}
      />
    </div>
  );
};

export default function App() {
  return (
    <LMSProvider>
      <AppContent />
    </LMSProvider>
  );
}
