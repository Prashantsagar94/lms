import React, { useState } from 'react';
import {
  X,
  PhoneCall,
  CheckCircle,
  Building,
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { FRANCHISE_INFO, DIRECTOR_INFO } from '../data/coursesData';

interface FranchiseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FranchiseModal: React.FC<FranchiseModalProps> = ({ isOpen, onClose }) => {
  const [district, setDistrict] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Trigger WhatsApp directly with prefilled message
      const text = encodeURIComponent(
        `Hello Director Prashant Sagar Sir, I want to open a HunarSetu Franchise Center in District: ${district}, Name: ${partnerName}, Mobile: ${mobile}.`
      );
      window.open(`https://wa.me/917800897677?text=${text}`, '_blank');
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col my-auto max-h-[92vh]">
        {/* Header with warm Indian skilling amber banner */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg bg-black/20 hover:bg-black/40 text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-amber-200">
            <Building className="w-4 h-4" />
            <span>Official Training Center Affiliation</span>
          </div>
          <h3 className="text-xl font-bold font-display text-white mt-1">
            Become a HunarSetu Franchise Partner
          </h3>
          <p className="text-xs text-amber-100 mt-1">
            Director: Prashant Sagar · Barabanki Head Office (UP)
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Quick Call Box */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] text-amber-300 font-semibold uppercase">
                Direct Director Helpline
              </div>
              <div className="text-lg font-bold font-mono text-white">
                +91 7800897677
              </div>
              <div className="text-[10px] text-slate-400">
                Call / WhatsApp directly to Director Prashant Sagar
              </div>
            </div>

            <a
              href="tel:7800897677"
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition-colors shrink-0"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>

          {/* Key Franchise Benefits */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Franchise Partner Support:
            </div>
            <div className="space-y-1.5 text-xs text-slate-300">
              {FRANCHISE_INFO.benefits.map((b, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Application Form */}
          <form onSubmit={handleSubmit} className="space-y-3 pt-2 border-t border-slate-800 text-xs">
            <div className="text-xs font-bold text-white">
              Apply for Center Inspection & Authorization:
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Your Full Name</label>
              <input
                type="text"
                required
                value={partnerName}
                onChange={e => setPartnerName(e.target.value)}
                placeholder="e.g. Ramesh Chandra / Anita Mishra"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 block mb-1">Proposed District / Town</label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  placeholder="e.g. Barabanki, Lucknow, etc."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                  placeholder="e.g. 7800897677"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 shadow-sm"
            >
              {submitted ? (
                <span>Opening WhatsApp Connect with Director...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application to Director Prashant Sagar</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
