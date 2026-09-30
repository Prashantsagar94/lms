import React from 'react';
import { useLMS } from '../context/LMSContext';
import {
  Building,
  Award,
  PhoneCall,
  Mail,
  MapPin,
  CheckCircle2,
  Users,
  Target,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  ArrowRight
} from 'lucide-react';
import { DIRECTOR_INFO, FRANCHISE_INFO } from '../data/coursesData';

interface AboutUsPageProps {
  onBrowseCourses: () => void;
  onOpenFranchise: () => void;
  onOpenVerifier: () => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({
  onBrowseCourses,
  onOpenFranchise,
  onOpenVerifier
}) => {
  const { websiteSettings } = useLMS();

  return (
    <div className="py-10 space-y-16 animate-fade-in text-slate-100">
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-[#0B101E] to-amber-950/30 border border-slate-800 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Building className="w-3.5 h-3.5" />
              <span>Institutional Governance · Barabanki Head Office</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
              Empowering India Through <span className="text-amber-400">Practical Livelihood Skills</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              HunarSetu Academy was founded to bridge the gap between rural/semi-urban creative craftsmanship and structured industrial employment. Under the visionary direction of Prashant Sagar, we provide rigorous vocational curriculum, hands-on masterclasses, and verified certifications designed to transform learners into self-sufficient professionals and entrepreneurs.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onBrowseCourses}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>View Vocational Programs</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenFranchise}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Building className="w-4 h-4 text-amber-400" />
                <span>Franchise Center Tie-Up</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Profile: Director Prashant Sagar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/80 border border-amber-500/30 rounded-3xl p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="space-y-4 lg:col-span-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>Director's Desk</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
              {websiteSettings.directorName}
            </h2>
            <div className="text-sm text-amber-400 font-medium">
              Director & Head of Vocational Skilling · Barabanki Head Office
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic border-l-2 border-amber-400 pl-4">
              "{websiteSettings.directorMessage}"
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Director Prashant Sagar has pioneered vocational curriculum standards across eastern Uttar Pradesh, establishing formalized apprenticeship pipelines for women tailors, zardozi masters, and salon cosmetologists. Every course, evaluation criteria, and institutional certificate is audited under his personal supervision to guarantee high employability.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
              <a
                href={`tel:${websiteSettings.helplinePhone}`}
                className="px-3.5 py-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white flex items-center gap-2 border border-slate-700 font-mono"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                <span>Helpline: {websiteSettings.helplinePhone}</span>
              </a>

              <a
                href={`mailto:${websiteSettings.helplineEmail}`}
                className="px-3.5 py-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white flex items-center gap-2 border border-slate-700 font-mono"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>{websiteSettings.helplineEmail}</span>
              </a>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-bold font-display text-3xl mx-auto flex items-center justify-center shadow-lg">
              PS
            </div>
            <div>
              <div className="text-base font-bold text-white font-display">
                Prashant Sagar
              </div>
              <div className="text-xs text-amber-300 font-medium mt-0.5">
                Executive Director
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-1">
                Barabanki Head Office, U.P.
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-left space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Certified Skill Assessor</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Apparel & Beauty Council Advisor</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Franchise Quality Regulator</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Our Core Principles
          </div>
          <h2 className="text-2xl font-bold font-display text-white">
            Why Learners Choose HunarSetu
          </h2>
          <p className="text-xs text-slate-400">
            A comprehensive learning ecosystem built for dignity, economic independence, and market excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: Target,
              title: 'Hands-On Mastery',
              description: 'Step-by-step video lessons recorded on real industrial machines, focusing on actual client garments and authentic techniques.'
            },
            {
              icon: ShieldCheck,
              title: 'Verifiable Certification',
              description: 'Every certificate is backed by cryptographic verification codes and signed by Director Prashant Sagar, accepted across industry units.'
            },
            {
              icon: Users,
              title: 'Franchise Network',
              description: 'Authorizing partner centers across Barabanki, Lucknow, and regional blocks with localized practical examination stations.'
            },
            {
              icon: Sparkles,
              title: 'Livelihood Placement',
              description: 'Active placement tie-ups with leading garment export houses, bridal boutiques, and wellness salon chains.'
            }
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3 hover:border-amber-500/40 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                <pillar.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-white font-display">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Head Office Location & Contact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Headquarters
              </div>
              <h2 className="text-2xl font-bold font-display text-white">
                HunarSetu Academy · Barabanki Head Office
              </h2>
              <div className="text-xs text-slate-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Barabanki Head Office, Uttar Pradesh - 225001, India</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="tel:7800897677"
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call: 7800897677</span>
              </a>

              <button
                onClick={onOpenVerifier}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>Registry Verification</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl space-y-1">
              <div className="text-slate-400">Institutional Email</div>
              <div className="font-mono text-white font-semibold">prashantsagarmepl@gmail.com</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl space-y-1">
              <div className="text-slate-400">Working Hours</div>
              <div className="text-white font-semibold">Mon - Sat: 9:00 AM - 7:00 PM</div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl space-y-1">
              <div className="text-slate-400">Affiliation Authority</div>
              <div className="text-amber-400 font-semibold">HunarSetu Vocational Council</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
