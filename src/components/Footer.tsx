import React from 'react';
import { useLMS } from '../context/LMSContext';
import { Award, BookOpen, PhoneCall, Building } from 'lucide-react';
import { DIRECTOR_INFO } from '../data/coursesData';

interface FooterProps {
  onSelectTab: (tab: 'courses' | 'dashboard' | 'admin') => void;
  onOpenVerifier: () => void;
  onOpenFranchise: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenVerifier,
  onOpenFranchise
}) => {
  const { websiteSettings, customPages, setActiveCustomPageSlug } = useLMS();

  const footerPages = customPages.filter(p => p.isPublished && p.showInFooter);

  return (
    <footer className="border-t border-slate-800 bg-[#080B12] text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-xs font-display">
                H
              </div>
              <span className="text-base font-bold text-white font-display">
                HunarSetu LMS
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              National Vocational Skilling & Entrepreneurship Academy. Providing practical training in garment tailoring, zardozi embroidery, bridal mehndi, and beauty wellness.
            </p>
            <div className="text-[11px] text-amber-300 font-medium pt-1">
              Director: {websiteSettings.directorName}
            </div>
          </div>

          {/* Col 2: Vocational Trades */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider font-display">
              Vocational Programmes
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('courses')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Silai Machine Operator (₹1,799)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('courses')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Hand Embroidery & Zardozi (₹1,799)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('courses')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Mehndi Art & Bridal Designing (₹1,499)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('courses')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Beauty & Wellness Professional (₹2,999)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('courses')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Boutique & Bridal Combos (₹3,999)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Student & Registry Services and Custom Pages */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider font-display">
              Certification & Resources
            </div>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={onOpenVerifier}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Verify Certificate ID</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFranchise}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 text-amber-300 font-semibold"
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Franchise Center Partner</span>
                </button>
              </li>
              {footerPages.map(page => (
                <li key={page.id}>
                  <button
                    onClick={() => setActiveCustomPageSlug(page.slug)}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {page.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Trust & Support Notice */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wider font-display">
              Head Office Contact
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>HunarSetu Academy Head Office</strong><br />
              {websiteSettings.headOfficeAddress}<br />
              Director: {websiteSettings.directorName}
            </p>
            <div className="pt-1">
              <a
                href={`tel:${websiteSettings.helplinePhone}`}
                className="text-xs font-mono font-bold text-amber-400 hover:underline flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Mobile: {websiteSettings.helplinePhone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar without written DRM words */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} HunarSetu Vocational Skill Academy · Barabanki Head Office. Director: {websiteSettings.directorName}.
          </div>
          <div className="flex items-center gap-4">
            <span>Accredited Vocational Curriculum</span>
            <span aria-hidden="true">·</span>
            <span>Helpline: {websiteSettings.helplinePhone}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
