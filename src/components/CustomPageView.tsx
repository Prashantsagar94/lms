import React from 'react';
import { useLMS } from '../context/LMSContext';
import { CustomPage } from '../types';
import {
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Bookmark,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  GraduationCap
} from 'lucide-react';

interface CustomPageViewProps {
  page: CustomPage;
  onBack: () => void;
  onBrowseCourses: () => void;
  onOpenFranchise: () => void;
}

export const CustomPageView: React.FC<CustomPageViewProps> = ({
  page,
  onBack,
  onBrowseCourses,
  onOpenFranchise
}) => {
  const { websiteSettings } = useLMS();

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back navigation */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portal</span>
          </button>

          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            {page.category}
          </span>
        </div>

        {/* Hero Banner if available */}
        {page.bannerImageUrl && (
          <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-8 border border-slate-800 shadow-2xl relative">
            <img
              src={page.bannerImageUrl}
              alt={page.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-black/40 to-transparent"></div>
          </div>
        )}

        {/* Title & Metadata */}
        <div className="border-b border-slate-800 pb-6 mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
            {page.title}
          </h1>
          {page.hindiTitle && (
            <p className="text-xl text-amber-400 font-semibold mb-4">
              {page.hindiTitle}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Authored by: {page.author || websiteSettings.directorName}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Published: {page.createdAt}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Barabanki Head Office Approved</span>
            </span>
          </div>
        </div>

        {/* Page Content Rendering */}
        <div className="prose prose-invert prose-amber max-w-none text-slate-200 leading-relaxed text-sm sm:text-base space-y-4 bg-slate-900/40 p-6 sm:p-8 rounded-2xl border border-slate-800/80">
          {page.content.split('\n\n').map((paragraph, index) => {
            if (paragraph.startsWith('## ')) {
              return (
                <h2 key={index} className="text-xl sm:text-2xl font-bold text-white pt-4 pb-1 border-b border-slate-800">
                  {paragraph.replace('## ', '')}
                </h2>
              );
            }
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-lg font-bold text-amber-300 pt-3">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }
            if (paragraph.startsWith('- ') || paragraph.startsWith('1. ')) {
              return (
                <div key={index} className="pl-4 space-y-1 text-slate-300">
                  {paragraph.split('\n').map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-2">
                      <span className="text-amber-400 mt-1">•</span>
                      <span>{item.replace(/^[-*]|\d+\.\s*/, '').replace(/\*\*/g, '')}</span>
                    </div>
                  ))}
                </div>
              );
            }
            return (
              <p key={index} className="text-slate-300 leading-relaxed">
                {paragraph.replace(/\*\*/g, '')}
              </p>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-600/10 to-transparent border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-white text-base">Want to join our training batch?</h4>
            <p className="text-xs text-slate-400">
              Inquire directly with Barabanki Head Office or enroll online with instant verifiable certification.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onBrowseCourses}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Explore Courses</span>
            </button>
            <a
              href={`tel:${websiteSettings.helplinePhone}`}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
