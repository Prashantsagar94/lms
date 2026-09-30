import React, { useState } from 'react';
import {
  Briefcase,
  Building,
  CheckCircle2,
  PhoneCall,
  Users,
  Award,
  ArrowRight,
  TrendingUp,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Mail,
  GraduationCap
} from 'lucide-react';
import { DIRECTOR_INFO } from '../data/coursesData';

interface PlacementPageProps {
  onBrowseCourses: () => void;
  onOpenFranchise: () => void;
}

export const PlacementPage: React.FC<PlacementPageProps> = ({
  onBrowseCourses,
  onOpenFranchise
}) => {
  const [recruiterName, setRecruiterName] = useState('');
  const [recruiterCompany, setRecruiterCompany] = useState('');
  const [recruiterPhone, setRecruiterPhone] = useState('');
  const [tradeNeeded, setTradeNeeded] = useState('Garment Making & Tailoring');
  const [openingsCount, setOpeningsCount] = useState('5');
  const [submitted, setSubmitted] = useState(false);

  const stats = [
    { label: 'Placement Rate', value: '92%', detail: 'Of certified graduates placed within 60 days' },
    { label: 'Avg Monthly Salary', value: '₹18,500 - ₹32,000', detail: 'Entry to master artisan scale' },
    { label: 'Hiring Partners', value: '55+', detail: 'Export houses, boutiques & bridal studios' },
    { label: 'Self-Employed Boutiques', value: '340+', detail: 'Micro-enterprises launched by alumni' }
  ];

  const placementDrives = [
    {
      role: 'Master Cutting & Tailoring Operator',
      company: 'Awadh Heritage Garments Ltd.',
      location: 'Barabanki Industrial Area / Lucknow',
      stipend: '₹22,000 - ₹28,000 / month',
      openings: 12,
      trade: 'Garment Making',
      skills: 'Overlock, pattern drafting, collar piping, speed stitching'
    },
    {
      role: 'Hand Zardozi & Aari Artisan',
      company: 'Noor-e-Zardozi Haute Couture',
      location: 'Lucknow / Chowk Cluster',
      stipend: '₹20,000 - ₹26,000 / month',
      openings: 8,
      trade: 'Embroidery',
      skills: 'Dabka, sequins, velvet framing, bridal lehenga motif transfer'
    },
    {
      role: 'Lead Bridal Mehndi Designer',
      company: 'Shringaar Bridal Lounge',
      location: 'Kanpur / Ayodhya Road',
      stipend: '₹25,000 - ₹35,000 / month + Booking incentives',
      openings: 6,
      trade: 'Mehndi Art',
      skills: 'Arabic shading, Rajasthani figure art, cone consistency'
    },
    {
      role: 'Beauty & Skin Aesthetics Specialist',
      company: 'Kaya Roop Wellness Studio',
      location: 'Barabanki City Center',
      stipend: '₹18,000 - ₹24,000 / month',
      openings: 10,
      trade: 'Beauty & Wellness',
      skills: 'Facial therapy, client skin diagnosis, bridal makeup, salon hygiene'
    }
  ];

  const alumniSuccess = [
    {
      name: 'Pooja Verma',
      trade: 'Silai Machine Operator',
      role: 'Quality Tailor Supervisor',
      company: 'Vardhman Apparel Cluster',
      salary: '₹24,500/mo',
      batch: 'Batch 2025',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
      story: 'Completed the 30-day course with Director Prashant Sagar. Secured direct placement in the cluster unit within 2 weeks of certificate verification.'
    },
    {
      name: 'Ritu Srivastava',
      trade: 'Hand Embroidery & Zardozi',
      role: 'Proprietor, Ritu Designer Boutique',
      company: 'Self-Employed Micro Studio',
      salary: '₹35,000+/mo (Revenue)',
      batch: 'Batch 2025',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      story: 'Mastered authentic Zardozi framing and took freelance bridal orders. Now employing 3 fellow HunarSetu graduates in her boutique.'
    },
    {
      name: 'Sunita Devi',
      trade: 'Beauty & Wellness Professional',
      role: 'Senior Aesthetician',
      company: 'VLCC Associate Salon',
      salary: '₹22,000/mo',
      batch: 'Batch 2025',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      story: 'Transformed her home parlor into a certified wellness station after completing client skin anatomy and facial hygiene modules.'
    }
  ];

  const handleRecruiterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-10 space-y-16 animate-fade-in text-slate-100">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-[#0E1526] to-amber-950/40 border border-slate-800 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Career & Placement Wing · हुनर से रोज़गार तक</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
              Connecting Skilled Artisans with <span className="text-amber-400">Industry Careers</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              HunarSetu LMS does not stop at video lessons. Under the institutional direction of Prashant Sagar, our placement division partners with textile mills, fashion houses, bridal studios, and wellness chains across Barabanki, Lucknow, and national clusters.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onBrowseCourses}
                className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>Explore Certified Courses</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#recruiter-form"
                className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
              >
                <Building className="w-4 h-4 text-amber-400" />
                <span>Hire Our Graduates</span>
              </a>

              <a
                href="tel:7800897677"
                className="px-4 py-3 rounded-xl bg-slate-950/80 text-amber-300 border border-amber-500/30 font-mono text-xs flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Placement Helpline: 7800897677</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-1.5 hover:border-amber-500/40 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">
                {s.value}
              </div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                {s.label}
              </div>
              <div className="text-[11px] text-slate-400 leading-snug">
                {s.detail}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Active Placement Opportunities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Recruitment Drives
            </div>
            <h2 className="text-2xl font-bold font-display text-white mt-1">
              Active Job Roles & Openings
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Current vacancies reserved for HunarSetu certified candidates with 70%+ assessment scores.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>36 Verified Positions Open</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {placementDrives.map((d, idx) => (
            <div
              key={idx}
              className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-2xl p-6 space-y-4 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold">
                    {d.trade}
                  </span>
                  <h3 className="text-base font-bold text-white leading-snug">
                    {d.role}
                  </h3>
                  <div className="text-xs text-slate-300 flex items-center gap-1.5 font-medium">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{d.company}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-emerald-400 font-mono">
                    {d.stipend}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {d.openings} open positions
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs text-slate-300">
                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{d.location}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  <strong className="text-slate-200">Required Skills:</strong> {d.skills}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={onBrowseCourses}
                  className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Qualify Through Course</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] text-slate-500 font-mono">
                  Verified Barabanki Registry
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Alumni Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Real Transformations
          </div>
          <h2 className="text-2xl font-bold font-display text-white">
            From Learner to Earner
          </h2>
          <p className="text-xs text-slate-400">
            Graduates who turned practical vocational training into steady livelihood and business autonomy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {alumniSuccess.map((a, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={a.image}
                    alt={a.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-400/40 shrink-0"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{a.name}</h4>
                    <div className="text-[11px] text-amber-300">{a.role}</div>
                    <div className="text-[10px] text-slate-400">{a.company}</div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{a.story}"
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-400 font-bold">{a.salary}</span>
                <span className="text-[10px] text-slate-400 font-mono">{a.batch}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recruiter / Employer Hiring Request Form */}
      <section id="recruiter-form" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Building className="w-3.5 h-3.5" />
              <span>For Employers & Boutiques</span>
            </div>
            <h2 className="text-2xl font-bold font-display text-white">
              Hire Certified Vocational Talent
            </h2>
            <p className="text-xs text-slate-400">
              Need skilled machine operators, master tailors, zardozi embroiderers, or beauty therapists? Submit your recruitment requirement directly to our Barabanki Head Office.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">
                Hiring Request Received!
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Thank you, <strong>{recruiterName}</strong> ({recruiterCompany}). Our Placement Coordinator will contact you within 24 hours at <strong>{recruiterPhone}</strong> with shortlisted verified candidate profiles.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-amber-400 hover:underline font-semibold"
              >
                Submit another vacancy
              </button>
            </div>
          ) : (
            <form onSubmit={handleRecruiterSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={recruiterName}
                    onChange={e => setRecruiterName(e.target.value)}
                    placeholder="e.g. Rajesh Mehra"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Boutique / Export Firm Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={recruiterCompany}
                    onChange={e => setRecruiterCompany(e.target.value)}
                    placeholder="e.g. Lucknow Fashion Apparels"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mobile Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={recruiterPhone}
                    onChange={e => setRecruiterPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Trade / Skill Requirement
                  </label>
                  <select
                    value={tradeNeeded}
                    onChange={e => setTradeNeeded(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Garment Making & Tailoring">Silai Machine Operator / Tailoring</option>
                    <option value="Hand Embroidery & Zardozi">Hand Embroidery & Zardozi</option>
                    <option value="Mehndi Art & Designing">Mehndi Art & Bridal Designing</option>
                    <option value="Beauty & Wellness">Beauty & Wellness Aesthetician</option>
                    <option value="Multiple Trades">Multiple Trades / Bulk Batch Hiring</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Number of Openings
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={openingsCount}
                    onChange={e => setOpeningsCount(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Hiring Requirement to Barabanki Placement Cell</span>
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Direct Placement Supervision: Director Prashant Sagar</span>
            </span>
            <a
              href="tel:7800897677"
              className="text-amber-400 font-mono font-bold hover:underline"
            >
              Direct Call: 7800897677
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
