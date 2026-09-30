import React, { useState } from 'react';
import { useLMS } from '../context/LMSContext';
import {
  X,
  Search,
  CheckCircle2,
  AlertCircle,
  Award,
  ShieldCheck
} from 'lucide-react';
import { CertificateRecord } from '../types';

export const CertificateVerifier: React.FC = () => {
  const { isVerifierOpen, setIsVerifierOpen, verifyCertificateById, certificates, setViewingCertificate } = useLMS();
  const [searchId, setSearchId] = useState('');
  const [searchedRecord, setSearchedRecord] = useState<CertificateRecord | null | undefined>(undefined);

  if (!isVerifierOpen) return null;

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    const found = verifyCertificateById(searchId.trim());
    setSearchedRecord(found || null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#0F172A] border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold font-display text-white">
              Public Certificate Verification Registry
            </h3>
          </div>

          <button
            onClick={() => {
              setIsVerifierOpen(false);
              setSearchedRecord(undefined);
              setSearchId('');
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <p className="text-xs text-slate-300 leading-relaxed">
            Enter the Certificate ID or Verification Code printed on any HunarSetu credential to verify authenticity and course credentials.
          </p>

          <form onSubmit={handleVerify} className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchId}
                onChange={e => setSearchId(e.target.value)}
                placeholder="e.g. HS-CERT-2026-8820 or VER-..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-amber-500 uppercase"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Verify</span>
              </button>
            </div>
          </form>

          {/* Quick Select from existing if any */}
          {certificates.length > 0 && searchedRecord === undefined && (
            <div className="pt-2">
              <span className="text-[11px] text-slate-500 block mb-1.5">
                Recently Issued in Demo System:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {certificates.slice(0, 3).map(c => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setSearchId(c.id);
                      setSearchedRecord(c);
                    }}
                    className="text-[11px] font-mono px-2 py-1 rounded bg-slate-900 border border-slate-800 text-amber-300 hover:border-amber-500/50"
                  >
                    {c.id}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result view */}
          {searchedRecord && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-300">
                  VERIFIED OFFICIAL RECORD FOUND
                </span>
              </div>

              <div className="text-xs space-y-1 text-slate-200 divide-y divide-emerald-500/20 pt-1">
                <div className="pb-1">
                  <span className="text-slate-400">Student: </span>
                  <strong className="text-white">{searchedRecord.studentName}</strong>
                </div>
                <div className="py-1">
                  <span className="text-slate-400">Programme: </span>
                  <strong className="text-white">{searchedRecord.courseTitle}</strong>
                </div>
                <div className="py-1">
                  <span className="text-slate-400">Duration: </span>
                  <span className="font-mono text-white">{searchedRecord.durationDays} Days</span>
                </div>
                <div className="py-1">
                  <span className="text-slate-400">Issue Date: </span>
                  <span className="font-mono text-white">{searchedRecord.issueDate}</span>
                </div>
                <div className="pt-1">
                  <span className="text-slate-400">Evaluation Grade: </span>
                  <span className="font-mono font-bold text-amber-300">{searchedRecord.grade} (Distinction)</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setViewingCertificate(searchedRecord);
                  setIsVerifierOpen(false);
                }}
                className="w-full mt-2 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Open Full PDF Certificate</span>
              </button>
            </div>
          )}

          {searchedRecord === null && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-semibold">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span>Certificate Record Not Found</span>
              </div>
              <p className="text-[11px] text-slate-400">
                No active vocational certificate matches the ID "{searchId}". Please check the spelling or contact the HunarSetu Examination Board.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
