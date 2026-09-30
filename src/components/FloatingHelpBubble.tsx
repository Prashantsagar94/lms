import React, { useState } from 'react';
import { useLMS } from '../context/LMSContext';
import {
  HelpCircle,
  X,
  Search,
  ChevronDown,
  ChevronUp,
  PhoneCall,
  Award,
  BookOpen,
  Building,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { DIRECTOR_INFO } from '../data/coursesData';

interface FloatingHelpBubbleProps {
  onSelectTab: (tab: 'courses' | 'dashboard' | 'admin') => void;
  onOpenFranchise: () => void;
  onOpenVerifier: () => void;
  onOpenAuth?: () => void;
}

interface PredefinedFAQ {
  id: string;
  category: 'Enrollment' | 'Videos & DRM' | 'Certificates' | 'Quizzes' | 'Franchise' | 'Contact';
  question: string;
  answer: string;
  actionText?: string;
  actionType?: 'courses' | 'dashboard' | 'franchise' | 'verify' | 'call';
}

const PREDEFINED_FAQS: PredefinedFAQ[] = [
  {
    id: 'faq-1',
    category: 'Enrollment',
    question: 'How do I enroll in a course and pay with UPI QR code?',
    answer: 'Select your vocational trade on the Courses page and click "Enroll Now". Choose "Scan & Pay with UPI QR" to generate a secure dynamic payment QR code compatible with Google Pay, PhonePe, Paytm, or BHIM. After paying, submit your 12-digit UTR/UPI reference to instantly unlock all video modules and curriculum plans.',
    actionText: 'Browse Vocational Courses',
    actionType: 'courses'
  },
  {
    id: 'faq-2',
    category: 'Videos & DRM',
    question: 'Why can’t I download video lessons or save them offline?',
    answer: 'To protect intellectual property and vocational curriculum created under Director Prashant Sagar, video downloads and offline recordings are strictly restricted by encrypted DRM security with real-time student watermarking. All lessons remain accessible 24/7 on your dashboard for streaming across phone, tablet, and desktop.',
    actionText: 'Go to Dashboard',
    actionType: 'dashboard'
  },
  {
    id: 'faq-3',
    category: 'Certificates',
    question: 'When and how do I receive my verified PDF Certificate?',
    answer: 'Once you finish all video lessons and clear the module assessment quizzes with 70%+ score, your progress reaches 100%. An official government-recognized certificate signed by Director Prashant Sagar with an iconic gold seal and unique verification ID is issued automatically. You can view, download as PDF, and verify it on our public registry.',
    actionText: 'Verify a Certificate',
    actionType: 'verify'
  },
  {
    id: 'faq-4',
    category: 'Quizzes',
    question: 'How do interactive module quizzes and pass scores work?',
    answer: 'Each course module ends with a multiple-choice practical knowledge quiz designed by master trainers. The minimum passing score is 70%. You receive instant feedback and explanations for every question. Clearing quizzes triggers celebration confetti and moves you up on the statewide "Top Learners" Leaderboard.',
    actionText: 'Check Leaderboard',
    actionType: 'dashboard'
  },
  {
    id: 'faq-5',
    category: 'Franchise',
    question: 'How can I open a Franchise Center or partner in my district?',
    answer: 'Entrepreneurs, schools, and NGOs can open an authorized HunarSetu Vocational Skill Training Center in their block or district. We provide machinery guidance, syllabus kits, online examination modules, and official student certifications under Director Prashant Sagar. Contact Barabanki Head Office at 7800897677 or apply online.',
    actionText: 'Partner Enquiry Form',
    actionType: 'franchise'
  },
  {
    id: 'faq-6',
    category: 'Enrollment',
    question: 'What are the official courses, durations, and fee tiers?',
    answer: '• Silai Machine Operator (Garment Making): 30 Days — ₹1,799\n• Hand Embroidery & Zardozi Basics: 30 Days — ₹1,799\n• Mehndi Art & Bridal Designing: 30 Days — ₹1,499\n• Beauty & Wellness Professional: 40 Days — ₹2,999\n• Boutique Master Combo (Silai + Embroidery): 50 Days — ₹3,999\n• Bridal Studio Combo (Beauty + Mehndi): 50 Days — ₹3,999\nAll fees include full video streaming, practical training roadmaps, and official certificates.',
    actionText: 'View Fee Schedule',
    actionType: 'courses'
  },
  {
    id: 'faq-7',
    category: 'Contact',
    question: 'How do I contact Director Prashant Sagar & Barabanki Head Office?',
    answer: '• Institutional Leadership: Director Prashant Sagar\n• Head Office: Barabanki Head Office, Uttar Pradesh - 225001, India\n• Helpline & WhatsApp: 7800897677\n• Official Email: prashantsagarmepl@gmail.com\nSupport hours: 9:00 AM – 7:00 PM (Monday to Saturday).',
    actionText: 'Call Helpline: 7800897677',
    actionType: 'call'
  }
];

export const FloatingHelpBubble: React.FC<FloatingHelpBubbleProps> = ({
  onSelectTab,
  onOpenFranchise,
  onOpenVerifier,
  onOpenAuth
}) => {
  const { isLoggedIn } = useLMS();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  const categories = ['All', 'Enrollment', 'Videos & DRM', 'Certificates', 'Quizzes', 'Franchise', 'Contact'];

  const filteredFaqs = PREDEFINED_FAQS.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAction = (type?: 'courses' | 'dashboard' | 'franchise' | 'verify' | 'call') => {
    if (type === 'courses') {
      onSelectTab('courses');
      setIsOpen(false);
    } else if (type === 'dashboard') {
      if (isLoggedIn) {
        onSelectTab('dashboard');
      } else {
        onOpenAuth?.();
      }
      setIsOpen(false);
    } else if (type === 'franchise') {
      onOpenFranchise();
      setIsOpen(false);
    } else if (type === 'verify') {
      onOpenVerifier();
      setIsOpen(false);
    } else if (type === 'call') {
      window.location.href = 'tel:7800897677';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans print:hidden">
      {/* Expanded Help Desk Popover Card */}
      {isOpen && (
        <div className="mb-3 w-[360px] sm:w-[410px] max-w-[calc(100vw-2rem)] h-[540px] max-h-[82vh] bg-slate-900/98 backdrop-blur-xl border border-amber-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
                ?
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
                  <span>HunarSetu LMS Help Desk</span>
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-500/20 px-1.5 py-0.2 rounded border border-amber-400/30">
                    Pre-set
                  </span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Instant guidance · Director Prashant Sagar (7800897677)
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close Help Desk"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Search */}
          <div className="p-3 border-b border-slate-800/80 bg-slate-950/60">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search answers (certificate, video DRM, fees)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1 overflow-x-auto pt-2 pb-0.5 scrollbar-thin">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Questions & Responses */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-800/50">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <HelpCircle className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">
                  No preset answer matching "{searchQuery}"
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="text-xs text-amber-400 hover:underline font-semibold flex items-center justify-center gap-1 mx-auto"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset filters</span>
                </button>
              </div>
            ) : (
              filteredFaqs.map(faq => {
                const isExpanded = expandedFaqId === faq.id;

                return (
                  <div key={faq.id} className="pt-3 first:pt-0 space-y-2">
                    <button
                      onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                      className="w-full text-left flex items-start justify-between gap-3 text-xs font-semibold text-slate-200 hover:text-amber-300 transition-colors group cursor-pointer"
                    >
                      <span className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                        <span className="leading-snug">{faq.question}</span>
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-amber-400 shrink-0 mt-0.5" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-3.5 space-y-3 animate-fade-in text-xs text-slate-300 leading-relaxed ml-3.5">
                        <div className="whitespace-pre-line text-slate-300 text-[11px] sm:text-xs">
                          {faq.answer}
                        </div>

                        {faq.actionText && (
                          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                            <button
                              onClick={() => handleAction(faq.actionType)}
                              className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                            >
                              <span>{faq.actionText}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                            <span className="text-[10px] text-slate-500 font-mono">
                              Verified Guideline
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Calling Footer */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Barabanki H.O. Helpline</span>
            </span>

            <a
              href="tel:7800897677"
              className="flex items-center gap-1.5 font-mono font-bold text-amber-300 hover:text-white bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>7800897677</span>
            </a>
          </div>
        </div>
      )}

      {/* Primary Floating Trigger Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Need Help with LMS Features?"
        className={`rounded-full p-3.5 shadow-2xl flex items-center gap-2 transition-all duration-200 cursor-pointer ${
          isOpen
            ? 'bg-slate-800 text-white border border-slate-700 scale-95'
            : 'bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 hover:scale-105 shadow-amber-500/25 ring-2 ring-amber-400/40 animate-bounce-subtle'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-slate-300" />
        ) : (
          <>
            <HelpCircle className="w-6 h-6" />
            <span className="font-bold text-xs pr-1 hidden sm:inline font-sans">
              Help
            </span>
          </>
        )}
      </button>
    </div>
  );
};
